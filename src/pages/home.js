import { useEffect, useMemo, useState } from 'react';
import '../style/home.css';
import ScrollImgeList from '../component/ScrollImgeList';
import anime from 'animejs';

export default function Home() {
  // const [imgList, setImgList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
  const imgList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
  const [imgCount, setImgCount] = useState(0);
  const [isAddAnime, setIsAddAnime] = useState(false);
  useEffect(() => {
    setIsAddAnime(true);
  }, []);
  return (
    <div className='home_content' style={{
      backgroundColor: !isAddAnime ? '#F2EFE6' : ''
    }}>
      <div className='home_left'>
        <ScrollImgeList list1={[1, 2, 3, 4, 5, 6, 7, 8, 9]} list2={[10, 11, 12, 13, 14, 15, 16, 17, 18]} />
      </div>
      <div className='home_right'>
        <div className='right_title'>
          <div className='title-1'>
            ARCHITECTURE & INTERIORS
          </div>
          <div>
            FILM  
          </div>
          <div style={{paddingLeft: '40px'}}>
            ANIMALS
          </div>
          <div>
            TRAVEL
          </div>
        </div>
        <div className={`right_describe ${isAddAnime && 'opacity_anime_class'}`}>
          Discover hidden wonders and inspiring destinations around the world from the comfort of your own home.
        </div>
        <div className={`right_lp ${isAddAnime && 'opacity_anime_class'}`}>
          location 114.352482,36.103442
          postalcode 455000
        </div>
      </div>
    </div>
  )
}
