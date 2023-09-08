import { useEffect, useState, useMemo, Fragment } from "react"
import { FrownOutlined  } from '@ant-design/icons';
import '../style/mineClearance.css'
export default function mineClearance() {
  const [data, setData] = useState([]);
  const initDaat = () => {
    const d = [];
    for (let i = 0; i <= 16; i++) {
      d[i] = [];
      for (let k = 0; k <= 20; k++) {
        d[i][k] = {
          isMineClearance: 0,
          state: 0, // 0 待挖掘 1被挖掘 2被标记
          nums: 0,
        }
      }
    }
    for (var n = 0; n < 50; n++) {
      const i1 = Math.floor(Math.random() * 17);
      const k1 = Math.floor(Math.random() * 21);
      d[i1][k1].isMineClearance = 1;
      for (var j = -1; j <= 1; j++) {
        for (var k = -1; k <= 1; k++) {
          if (d[i1+j] && d[i1+j][k1+k] && !d[i1+j][k1+k].isMineClearance) {
            d[i1+j][k1+k].nums+=1;
          }
        }
      }
    }
    return d
  }
  useEffect(() => {
    setData(initDaat);
  }, []);
  const onClick = (e) => {
    if (!e.target.getAttribute('data')) return;
    const [i1, k1] = e.target.getAttribute('data').split('_').map(e => parseInt(e));
    const d = JSON.parse(JSON.stringify(data));
    if (d[i1][k1].state) return;
    d[i1][k1].state = 1;
    for (var j = -1; j <= 1; j++) {
      for (var k = -1; k <= 1; k++) {
        if (d[i1+j] && d[i1+j][k1+k]) {
          handleData(d[i1+j][k1+k], d, i1+j, k1+k)
        }
      }
    }
    setData(() => d);
  };
  const handleData = (item, d, i1, k1) => {
    if (item.state === 1 || item.state === 2 || item.isMineClearance) return;
    item.state = 1;
    if (item.nums) return;
    for (var j = -1; j <= 1; j++) {
      for (var k = -1; k <= 1; k++) {
        if (d[i1+j] && d[i1+j][k1+k]) {
          handleData(d[i1+j][k1+k], d, i1+j, k1+k)
        }
      }
    }
  }
  return (
    <div onClick={onClick} style={{overflow: 'hidden', height: 'calc(100% - 50px)'}} className="content">
      {useMemo(() => {
        return (<Fragment>
          {data.map((ele, index) => {
            return (
              <div key={index} className='col'>{ele.map((e, i) => {
                return <div key={i} data={index + '_' + i} className={`item-e item-${e.state}`}>
                  {e.state === 1 && e.nums ? e.nums : ''}
                  {e.state === 1 && e.isMineClearance ? <FrownOutlined/> : ''}
                </div>
              })}</div>
            )
          })}
        </Fragment>)
      }, [data])}
    </div>
  )
}