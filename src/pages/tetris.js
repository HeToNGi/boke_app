import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import '../style/tetris.css'
export default function tetris() {
  const [score, setScore] = useState(0);
  const [resData, setResData] = useState(() => JSON.parse('[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]]'));
  const [intervalId, setIntervalId] = useState(null);
  const [current1i, setCurrent1i] = useState(0);
  const [isRestStart, setIsRestStart] = useState(false);
  const [po1s, setPo1s] = useState(0);
  const [backupsData, setBackupsData] = useState([]);
  const [backupsTargetData, setBackupsTargetData] = useState([]);
  let step = 3; // 左右移动的时候可以的步数;
  let WIDTH = 9;
  let randomBlocksMap = [[[1, 1, 1], [0, 1, 0], [0, 1, 0]], [[0, 1, 0], [0, 1, 0], [0, 1, 0]], [[1, 0, 0], [1, 0, 0], [1, 1, 1]]]
  const startGame = () => {
    const randomInt0_2 = Math.floor(Math.random() * 3);
    oneExecutionUnit(getRandomIntPos(getTargetWidth(randomBlocksMap[randomInt0_2])), 0, false, randomBlocksMap[randomInt0_2]);
  }
  // 创建一个执行单元
  const oneExecutionUnit = (pos, currenti, data, target) => {
    setPo1s(pos)
    clearInterval(intervalId);
    const copyData = JSON.parse(JSON.stringify(data || resData));
    setBackupsData(() => copyData);
    setBackupsTargetData(() => target);
    setIntervalId(setInterval(()=> {
      if (currenti >= 18) {
        // 重置一个执行单元
        resetExecutionUnit();
        setIsRestStart(true);
        setResData(resData => calculateScore(resData));
        return;
      };
      setResData(resData => {
        const current = JSON.parse(JSON.stringify(copyData));
        for (var i = 0; i <= 2; i++) {
          if (
              (current[currenti][pos + i] && target[2][i]) ||
              (current[currenti - 1] && current[currenti - 1][pos + i] && target[1][i]) ||
              (current[currenti - 2] && current[currenti - 2][pos + i] && target[0][i])
            ) {
            if (currenti === 0) {
              alert('游戏失败了');
              return current;
            }
            // 重置一个执行单元
            resetExecutionUnit();
            setIsRestStart(true);
            return resData;
          }
          target[2][i] ? current[currenti][pos + i] = target[2][i] : '';
          current[currenti - 1] && target[1][i] ? current[currenti - 1][pos + i] = target[1][i] : '';
          current[currenti - 2] && target[0][i] ? current[currenti - 2][pos + i] = target[0][i] : '';
        }
        currenti++;
        setCurrent1i(currenti);
        return current;
      });
    }, 100))
  }
  useEffect(() => {
    if (isRestStart) {
      const randomInt0_2 = Math.floor(Math.random() * 3);
      oneExecutionUnit(getRandomIntPos(getTargetWidth(randomBlocksMap[randomInt0_2])), 0, false, randomBlocksMap[randomInt0_2]);
    }
    setIsRestStart(false);
  }, [isRestStart])
  // 重置一个执行单元
  const resetExecutionUnit = () => {
    clearInterval(intervalId);
    setCurrent1i(0);
  }
  // 计算分数 消除全行
  const calculateScore = (data) => {
    const res = data.filter(i => {
      return !i.every(e => e === 1);
    });
    for (var i = 0; i < 18 - res.length; i++) {
      setScore(s => s + 10)
      res.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
    return res;
  }

  const getTargetWidth = (arr) => {
    let maxOnes = 0;
    for (let i = 0; i < arr.length; i++) {
      let rowOnes = 0;
      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === 1) {
          rowOnes++;
        }
      }
      if (rowOnes > maxOnes) {
        maxOnes = rowOnes;
      }
    }
    return maxOnes;
  }

  const getRandomIntPos = (width) => {
    return Math.floor(Math.random() * (WIDTH - width))
  }
  const toLeft = useCallback(() => {
    clearInterval(intervalId);
    oneExecutionUnit(po1s === 0 ? 0 : po1s - 1, current1i, backupsData, backupsTargetData);
  }, [po1s, intervalId, current1i, backupsData, backupsTargetData])
  const toRight = useCallback(() => {
    clearInterval(intervalId);
    oneExecutionUnit(po1s === 6 ? 6 : po1s + 1, current1i, backupsData, backupsTargetData);
  }, [po1s, intervalId, current1i, backupsData, backupsTargetData])
  return (
    <div className='body'>
      <button onClick={() => {startGame()}}>开始: 总分数{score}</button>
      <button onClick={() => {toLeft()}}>左移</button>
      <button onClick={() => {toRight(1)}}>右移</button>
      {useMemo(() => {
        return (<Fragment>
          {resData.map((ele, index) => {
            return (
              <div key={index} className='col'>{ele.map((e, i) => {
                return <div key={i} className={`item-e ${e ? 'item-t': ''}`}></div>
              })}</div>
            )
          })}
        </Fragment>)
      }, [resData])}
    </div>
  )
}
