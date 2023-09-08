import { useEffect, useState } from "react"

export default function backendservices() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setCount(count + 1);
    }, 1000)
  }, [])
  const fun = function() {
    setCount(count + 1)
  }
  // setCount(3);
  // setCount(4);
  // setCount(5);
  // setCount(6);
  return  <div><button onClick={fun}>点击</button>{count}</div>
}
