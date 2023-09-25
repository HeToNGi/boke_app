import { useEffect } from 'react';
import * as THREE from 'three';
import '../style/index.css'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import Stats from 'three/addons/libs/stats.module.js';


export default function Home() {
  let t = null;
  let currentState = 0;
  let animateArray = [];
  let isNext = false;
  let mouseWheelStatus = 0; // 鼠标滚动状态
  let camera, scene, renderer, composer, stats, stars, sun, sunLight;
  let planetMap = {
    mercury: null,
    venus: null,
    earth: null,
  }
  let planetMapParam = {
    mercury: {
      radius: 0.383,
      distance: 3,
      baseSpeed: 3,
      color: 0xA6A6A6,
    },
    venus: {
      radius: 0.949,
      distance: 6,
      baseSpeed: 4,
      color: 0xFCCC0A,
    },
    earth: {
      radius: 1,
      distance: 10,
      baseSpeed: 5,
      color: 0x0072C3,
    }
  }
  const params = {
    threshold: 0,
    strength: 0.2,
    radius: 0,
    exposure: 1
  };
  useEffect(() => {
    initThree();
    window.addEventListener('mousewheel', onMouseWheel)
  }, []);
  const initThree = () => {
    // 获取容器元素
    const container = document.getElementById('three_container');
    stats = new Stats();
    // 创建一个场景
    scene = new THREE.Scene();
    
    // 创建一个透视摄像机
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    // camera.position.set(  -1.4100312384075084,  12.228298101294783,  21.246563140050036 );
    camera.position.set(  0, 25, 0 );
	  camera.lookAt( 0, 0, 0 );
    window.camera = camera;
    // 创建一个渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    
    // const controls = new OrbitControls( camera, renderer.domElement );
    // controls.maxPolarAngle = Math.PI * 0.5;
    // controls.minDistance = 0;
    // controls.maxDistance = 100;
    
    postEffects();

    creatSun();
    creatPlanet();
    const [starsGeometry, starsMaterial, s] = creatStars();
    stars = s;
    const animate = () => {
      requestAnimationFrame(animate);
      transitionAnimation();
      stats.update();
			composer.render();
      // renderer.render(scene, camera);
    };
    animate();
    window.addEventListener( 'resize', onWindowResize );
  }
  // 后期力量
  const postEffects = () => {
    scene.add( new THREE.AmbientLight( 0x404040 ) );

    const pointLight = new THREE.PointLight( 0xffffff, 100 );
    camera.add( pointLight );

    const renderScene = new RenderPass( scene, camera );

    const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
    bloomPass.threshold = params.threshold;
    bloomPass.strength = params.strength;
    bloomPass.radius = params.radius;
    const outputPass = new OutputPass();

    composer = new EffectComposer( renderer );
    composer.addPass( renderScene );
    composer.addPass( bloomPass );
    composer.addPass( outputPass );
  }
  // 获取随机的位置
  const getRandomSpherePosition = () => {
    // 随机生成极角（0到π之间的随机角度）
    const polarAngle = Math.random() * Math.PI;

    // 随机生成方位角（0到2π之间的随机角度）
    const azimuthalAngle = Math.random() * Math.PI * 2;

    // 将球坐标转换为笛卡尔坐标
    const radius = 20;
    const x = radius * Math.sin(polarAngle) * Math.cos(azimuthalAngle);
    const y = radius * Math.cos(polarAngle);
    const z = radius * Math.sin(polarAngle) * Math.sin(azimuthalAngle);
    return [x, y, z]
  }
  // 创建背景星空
  function creatStars() {
    const starCount = 5000;
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.02, transparent: true });
    const starsVertices = [];
    for (let i = 0; i < starCount; i++) {
      const [x, y, z] = getRandomSpherePosition()
      starsVertices.push(x, y, z);
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    window.stars = stars;
    scene.add(stars)
    return [starsGeometry, starsMaterial, stars]
  }
  // 创建太阳
  function creatSun() {
    const geometry = new THREE.SphereGeometry( 2, 64, 32 );
		const material = new THREE.MeshBasicMaterial( { color: 16776960, transparent: true } );
		const sun1 = new THREE.Mesh( geometry, material );
    const light = new THREE.PointLight( 16776960, 10, 100 );
    light.position.set( 0, 0, 0 );
    scene.add( light );
    sun = sun1;
    sunLight = light;
    window.sunLight = sunLight;
		scene.add( sun1 );
    return sun1;
  }
  function onWindowResize() {

    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize( width, height );
    composer.setSize( width, height );

  }

  function creatPlanet() {
    for (var key in planetMap) {
      const geometry = new THREE.SphereGeometry( planetMapParam[key].radius, 32, 16 );
      const material = new THREE.MeshPhongMaterial( { color: planetMapParam[key].color, transparent: true } );
      const obj = new THREE.Mesh( geometry, material );
      obj.position.set(planetMapParam[key].distance, 0, 0)
      scene.add( obj );
      planetMap[key] = obj;
    }
    window.planetMap = planetMap;
  }

  function onMouseWheel(e) {
    const { deltaY } = e
    mouseWheelStatus = deltaY < 0 ? 2 : 1;
    if (t) {
      clearTimeout(t);
      t = null;
    }
    t = setTimeout(() => {
      mouseWheelStatus = 0;
    }, 100)
  }
  const transitionAnimation = () => {
    switch(currentState) {
      case 0:
        // 使地球围绕太阳旋转
        // 获取当前时间
        const time = Date.now() * 0.0005;

        // 让地球绕太阳旋转
        for (var key in planetMap) {
          planetMap[key].position.x = Math.cos(time * planetMapParam[key].baseSpeed) * planetMapParam[key].distance;
          planetMap[key].position.z = Math.sin(time * planetMapParam[key].baseSpeed) * planetMapParam[key].distance;
          planetMap[key].rotation.x += 0.1;
        }
        // 星空移动
        stars.rotation.x += 0.001;
        stars.rotation.y += 0.001;
        if (mouseWheelStatus === 1) {
          if (sun.material.opacity > 0) {
            sun.visible = true;
            sun.material.opacity -= 0.01
          } else {
            sun.visible = false;
          }
          for (var key in planetMap) {
            if (planetMap[key].material.opacity > 0) {
              planetMap[key].visible = true;
              planetMap[key].material.opacity -= 0.01
            } else {
              planetMap[key].visible = false;
            }
          }
          if (stars.material.opacity > 0) {
            stars.visible = true;
            stars.material.opacity -= 0.01;
          } else {
            stars.visible = false;
          }
        }
        if (mouseWheelStatus === 2) {
          if (sun.material.opacity < 1) {
            sun.visible = true;
            sun.material.opacity += 0.01;
          }
          for (var key in planetMap) {
            if (planetMap[key].material.opacity < 1) {
              planetMap[key].visible = true;
              planetMap[key].material.opacity += 0.01;
            }
          }
          if (stars.material.opacity < 1) {
            stars.visible = true;
            stars.material.opacity += 0.01;
          }
        }
        break;
        default:
          break;
    }
  }
  return (
    <div>
      <div id="three_container"></div>
    </div>
  )
}
