import anime from "animejs";
import { useEffect, useState } from "react"
import '../style/about.css';

export default function About() {
  const [imgList, setImgList] = useState([10, 12, 15, 19, 20])
  const [about_img_top_height, setabout_img_top_height] = useState(940 + 283);
  const [about_img_bottmo_height, setabout_img_bottom_height] = useState(940 + 400);
  const [about_img_list_bottmo_height, setabout_img_list_bottmo_height] = useState(940);
  const [bottom_list_one_width , setbottom_list_one_width] = useState(0);
  const [isTextShow, setIsTextShow] = useState(false);
  useEffect(() => {
    const aboutImgTop = document.getElementById('about_img_top');
    const aboutImgBottom = document.getElementById('about_img_bottom');
    const aboutImgBottomText = document.getElementById('about_img_bottom_text');
    const aboutImgBottomList = document.getElementById('about_img_bottom_list');
    const imgTopListElementes = document.querySelectorAll('.about_img_top_item');
    const bottomImageStartTime = window.innerHeight * 0.9;
    const img_bottom_mask = document.getElementById('img_bottom_mask');
    const bottom_list_one = document.getElementById('bottom_list_one');
    const bottom_list_two = document.getElementById('bottom_list_two');
    const bottom_list_three = document.getElementById('bottom_list_three');
    // console.log(bottom_list_one.width)
    // setbottom_list_one_width(bottom_list_one.width);
    bottom_list_two.style.transform = `translateX(${bottom_list_one.width * 2 + 20}px) translateY(105%)`;
    bottom_list_three.style.transform = `translateX(${bottom_list_one.width * 2 + 20}px) translateY(0)`;
    setabout_img_top_height(window.innerHeight + 283);
    setabout_img_bottom_height(window.innerHeight + 400);
    setabout_img_list_bottmo_height(window.innerHeight * 0.9);
    document.addEventListener('wheel', function(e) {
      let aboutImgToptop = aboutImgTop.getBoundingClientRect().top;
      if (aboutImgToptop <= 0 && aboutImgToptop >= -238) {
        imgTopListElementes.forEach(e => {
          e.style.transform = `translateX(${aboutImgToptop}px)`;
        })
      }
      let aboutImgBottomtop = aboutImgBottom.getBoundingClientRect().top;
      
      if (aboutImgBottomtop < bottomImageStartTime) {
        const c = bottomImageStartTime - aboutImgBottomtop;
        // console.log(aboutImgBottomtop);
        if (aboutImgBottomtop < bottomImageStartTime && aboutImgBottomtop >= 0) {
          img_bottom_mask.style.height = aboutImgBottomtop + 'px'
          img_bottom_mask.style.width = '100%'
        }
        if (aboutImgBottomtop <= 0) {
          img_bottom_mask.style.height = 0;
        }
        if (aboutImgBottomtop <= 0 && aboutImgBottomtop >= -500) {
          bottom_list_one.style.transform = `translateY(${50 + aboutImgBottomtop/10}%) translateX(95%) scale(${2 + aboutImgBottomtop * 0.002 })`
          bottom_list_two.style.transform = `translateY(${100 + aboutImgBottomtop/5}%) translateX(${bottom_list_one.width * (2 + aboutImgBottomtop * 0.002) + 20}px)`
          bottom_list_two.style.opacity = -aboutImgBottomtop/500;
          setIsTextShow(e.deltaY >= 0);
          bottom_list_three.style.display = 'none';
        }
        if (aboutImgBottomtop < -500) {
          bottom_list_one.style.transform = `translateY(0) translateX(95%) scale(1)`
          bottom_list_two.style.transform = `translateY(0) translateX(${bottom_list_one.width + 20}px)`
          bottom_list_two.style.opacity = '1';
          bottom_list_three.style.display = 'inline';
        }
        if (aboutImgBottomtop <= -500 && aboutImgBottomtop >= -(500 + bottom_list_one.width * 0.95 - 20)) {
          const x = -500 - aboutImgBottomtop;
          bottom_list_one.style.transform = `translateY(0) translateX(${bottom_list_one.width * 0.95 - x}px) scale(1)`
          bottom_list_two.style.transform = `translateY(0) translateX(${bottom_list_one.width * 0.95 - x + 20}px) scale(1)`
          bottom_list_three.style.transform = `translateY(0) translateX(${bottom_list_one.width * 0.95 - x + 40}px) scale(1)`
        }
        if (aboutImgBottomtop <= -(500 + bottom_list_one.width * 0.95 - 20)) {
          bottom_list_one.style.transform = `translateY(0) translateX(20px) scale(1)`
          bottom_list_two.style.transform = `translateY(0) translateX(40px) scale(1)`
          bottom_list_three.style.transform = `translateY(0) translateX(60px) scale(1)`
        }
      }
      // if (aboutImgBottomtop <= 200 && aboutImgBottomtop >= 0) {
      //   const p = 200 - aboutImgBottomtop;
      //   aboutImgBottomText.style.display = 'block';
      //   aboutImgBottomText.style.opacity = p * 0.005 + '';
      //   aboutImgBottomText.style.top = 500 - p + 'px';
      //   aboutImgBottomList.style.opacity = p * 0.005 + '';
      // }
      // if (aboutImgBottomtop >= 200) {
      //   aboutImgBottomText.style.display = 'none';
      //   aboutImgBottomList.style.opacity = '0';
      // }
      // if (aboutImgBottomtop < 0 && aboutImgBottomtop > -200 ) {
      //   const p = 200 + aboutImgBottomtop;
      //   aboutImgBottomText.style.opacity = p * 0.005 + '';
      //   aboutImgBottomText.style.display = 'block';
      //   aboutImgBottomList.style.transform = `translateX(${p}px)`;
      // }
      // if (aboutImgBottomtop <= -200 ) {
      //   aboutImgBottomText.style.display = 'none';
      //   aboutImgBottomList.style.opacity = 1;
      //   aboutImgBottomList.style.transform = `translateX(${0}px)`;
      // }
    });
  }, []);
  useEffect(() => {
    anime({
      targets: '#about_img_bottom_text',
      translateY: isTextShow ? 0 : 200,
      opacity: isTextShow ? 1 : 0,
      duration: 1000,
      easing: 'easeInOutQuad'
    }).play();
  }, [isTextShow])
  return (
    <div style={{
      width: '100%',
      height: '100%',
      overflow: 'scroll',
    }}>
      <div className="about_title about-text">
        You do not see the water of the Yellow River coming from the sky, rushing to the sea and never coming back.
      </div>
      <div id="about_img_top" style={{height: about_img_top_height + 'px' }} className="about_img_top">
        <div className="about_img_top_list">
          {imgList.map(m => {
            return (
              <img key={m} src={`/img/${m}.jpg`} className="about_img_top_item" style={{height: '100%', marginRight: '20px'}} />
            )
          })}
        </div>
      </div>
      <div style={{padding: '10px 100px', background: '#F2EFE6', marginBottom: '100px'}} className="about-text">
        <div style={{fontSize: '25px'}}>Marching list</div>
        he first emperor entrepreneurship is not half and the middle die, today under three points, Yizhou fatigue, this is a crisis of survival of the autumn also. However, the minister of the guard is unremitting in the inside, and the man of the faithful will forget his body outside, covering the special situation of the former emperor, and I want to report it to your Majesty. Chengyi open holy listen, to light the first emperor left virtue, grand spirit of gas, should not be vain, metaphor lost righteousness, to plug the road of loyalty remonstrance.
        Palace in the house, all as one, Zhi punishment zang no, should not be similarities and differences. If there are those who have committed crimes and are loyal and good, it is appropriate to pay their punishment and reward in order to demonstrate your Majesty's understanding, and it is not appropriate to be biased and make internal and external laws different.
        In the service, servant Guo Yuzhi, Fei Yi, Dong Yun, etc., this is good and real, will care about loyalty and pure, is the first emperor Jane to leave your Majesty. Fools think that things in the palace, not big or small, learn to consult them, and then implement, will be able to fill the gaps, have wide benefits.
        General to the pet, Shu shu, Xiaochang military, trial in the past, the first emperor called the day can, is to raise the pet for the governor. Fools think that if they learn about the things in the camp, they will make the battle harmonious, and the good and the bad will be equal.
        Pro Xian minister, far villain, the first Han so prosperous also; Pro-villain, far Xian minister, since then the Han so fall also. When the former Emperor was in power, every time he discussed this matter with his ministers, he never sighed and hated Huan and Ling. Serving in, Shangshu, long history, army, this know the Zhen good death of the minister, may your Majesty's letter, then the Han room of the long, can be counted and wait for also.
        Minister this cloth, the cultivation in Nanyang, the whole life in the troubled times, do not seek to hear in the princes. The first emperor does not mean to ministers, infaithfulness, three gu ministers in the cottage, counselors to the world, by gratitude, then Xu emperor to drive. After the collapse of the value, received the defeat of the army, ordered between the crisis, you have been twenty-one years.
        The first emperor knows minister cautious, so the collapse to send minister to the event. Since the mandate, day and night sorrow, fear entrust to the effect, to hurt the emperor's Ming, so the May ferry filter, deep. This south has been set, armor has been enough, when the award rate of the three armies, the north of the Central Plains, Shu Shu dull, bustling with criminals, Xing Fu Han chamber, also in the old capital. This minister therefore submits to the former emperor and serves his Majesty. As for the consideration of profit and loss, into the full advice, then you, Yi, allow the responsibility also.
        May your Majesty entrust the minister to the effect of the revival of the thief, if not, the sin of the minister, to the spirit of the emperor. If there is no word of Xingde, then blame Yu, Yi, allow and so on slow, in order to clear its fault; Your Majesty should also help yourself, to Suwa good way, to look into the wisdom of the words, to follow the legacy of the emperor, I am indebted to you.
        Today, when away, face tears, do not know what to say.
      </div>
      <div id="about_img_bottom" style={{height: 3000 + 'px', position: 'relative'}}>
      <div className="about_img_bottom_list" style={{height: about_img_list_bottmo_height + 'px' }}>
          <div id="img_bottom_mask"></div>
          <img id="bottom_list_one" src="/img/1.jpg"></img>
          <img id="bottom_list_two" src="/img/15.jpg"></img>
          <img id="bottom_list_three" src="/img/18.jpg"></img>
          <div id="about_img_bottom_text">
            You do not see the water of the Yellow River coming from the sky, rushing to the sea and never coming back
          </div>
        </div>
      </div>
    </div>
  )
}
