import { useEffect, useState, Fragment } from "react";
import '../style/scrollImageList.css'
export default function ScrollImgeList({list1, list2, id}) {
  const [isAddAnime, setIsAddAnime] = useState(false);
  let windowHeight = 0
  let leftTranslateY = 0;
  let rightTranslateY = 0;
  let leftImgList = null;
  let rightImgList = null;
  let leftImgListHeight = [];
  let rightImgListHeight = [];
  let speed = 1;
  let leftMin = 5000;
  let rightMin = 5000;
  let t = null;
  let noComput = 0;
  useEffect(() => {
    setIsAddAnime(true);
    leftImgList = document.querySelectorAll(`.imglist_left_${id} img`);
    rightImgList = document.querySelectorAll(`.imglist_right_${id} img`);
    leftImgListHeight = new Array(leftImgList.length)
    rightImgListHeight = new Array(rightImgList.length)
    leftImgListHeight.fill(0, 0)
    rightImgListHeight.fill(0, 0)
    windowHeight = window.innerHeight;
    setTimeout(() => {
      requestAnimationFunction();
    }, 100)
    window.addEventListener('wheel', function(e) {
      const isDown = e.deltaY > 0;
      if (isDown) {
        speed = 50;
      } else {
        speed = -50;
      }
      if (t) {
        clearTimeout(t);
        t = null;
      }
      t = setTimeout(() => {
        speed = 1;
      }, 50);
    })
  }, []);
  const requestAnimationFunction = () => {
    requestAnimationFrame(requestAnimationFunction);
    if (noComput !== 2) {
      if (leftImgListHeight.every(i => i)) {
        leftMin = 0;
        leftImgListHeight.forEach(i => {
          leftMin += (i + 10)
        });
        leftMin -= window.innerHeight;
        noComput++;
      } else {
        leftImgList.forEach((e, i) => {
          leftImgListHeight[i] = e.height;
        });
      }
      if (rightImgListHeight.every(i => i)) {
        rightMin = 0;
        rightImgListHeight.forEach(i => {
          rightMin += (i + 10)
        });
        rightMin -= window.innerHeight;
        noComput++;
      } else {
        rightImgList.forEach((e, i) => {
          rightImgListHeight[i] = e.height;
        });
      }
    }
    leftImgList.forEach(e => {
      if (leftTranslateY < -leftMin || leftTranslateY > 0) return;
      e.style.transform = `translateY(${leftTranslateY}px)`;
    })
    rightImgList.forEach(e => {
      if (rightTranslateY < -rightMin || rightTranslateY > 0) return;
      e.style.transform = `translateY(${rightTranslateY}px)`;
    })
    if (speed < 0) {
      leftTranslateY = leftTranslateY >= 0 ? 0 : leftTranslateY - 0.5 * speed;
      rightTranslateY = rightTranslateY >= 0 ? 0 : rightTranslateY - 0.5 * speed;
    } else {
      leftTranslateY = leftTranslateY <= -leftMin ? -leftMin : leftTranslateY - 0.5 * speed;
      rightTranslateY = rightTranslateY <= -rightMin ? -rightMin : rightTranslateY - 0.5 * speed;
    }
  }
  return (
    <div style={{
      height: '100%',
      width: '100%'
    }} className="imglist_content">
      <div
        id='imglist_left'
        className={`imglist_left imglist_left_${id} ${isAddAnime && 'imganime_class_left'}`}
      >
        {list1.map((m, i) => {
          return <img key={m} style={{marginTop: i === 0 ? '0px' : '10px'}} className={`img-${m}`}src={`/img/${m}.jpg`} />
        })}
      </div>
      <div id='imglist_right' className={`imglist_right imglist_right_${id} ${isAddAnime && 'imganime_class_right'}`}>
        {list2.map((m, i) => {
          return <img key={m} style={{marginTop: i === 0 ? '0px' : '10px'}} className={`img-${m}`} src={`/img/${m}.jpg`} />
        })}
      </div>
    </div>
  )
}
