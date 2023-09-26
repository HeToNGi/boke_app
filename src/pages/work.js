import { useEffect, useMemo, useState } from 'react';
import '../style/work.css';
import anime from 'animejs';
import ScrollImgeList from '../component/ScrollImgeList';

export default function Work() {
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
    <div className='middle_class'>MiddlePosition</div>
    <div style={{
      width: '49%',
      height: '100%',
    }}>
      <ScrollImgeList id={2} list1={[2, 4, 6, 8, 20, 22]} list2={[10, 12, 14, 16, 18, 24]}  />
    </div>
    </div>
  )
}
