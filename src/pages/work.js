import { useEffect, useMemo, useState } from 'react';
// import '../style/work.css';
import anime from 'animejs';
import ScrollImgeList from '../component/ScrollImgeList';

export default function Work() {
  const [show, setShow] = useState(false);
  const imgList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
  useEffect(() => {
    setShow(true);
  }, [])
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: "space-between"
    }}>
    <div style={{
      width: '49%',
      height: '100%',
    }}>
      <ScrollImgeList id={1} list1={[1, 3, 5, 7, 9, 19, 21]} list2={[11, 13, 15, 17, 23, 25]}  />
    </div>
    <div style={{
      width: '49%',
      height: '100%',
    }}>
      <ScrollImgeList id={2} list1={[2, 4, 6, 8, 20, 22]} list2={[10, 12, 14, 16, 18, 24]}  />
    </div>
    </div>
  )
}
