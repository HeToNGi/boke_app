import { useEffect, useMemo, useState,Fragment } from 'react';
import '../style/contact.css';
import anime from 'animejs';
import ScrollImgeList from '../component/ScrollImgeList';

export default function Contact() {
  const [show, setShow] = useState(false);
  const [contactMethodList, setContactMethodList] = useState([{
    method: 'WEIX',
    specific: 'DuYao_FUXIA',
  }, {
    method: 'PHONE',
    specific: '+86(0)15581740744',
  }, {
    method: 'EM-AIL',
    specific: 'ihetongi@163.com',
  }, {
    method: 'NAME',
    specific: 'HeToNG',
  }])
  useEffect(() => {
    setShow(true);
  }, [])
  return (
    <div style={{
      overflow: 'hidden',
      height: '100%',
      position: 'relative'
    }}>
      <div style={{
        width: '50%',
        height: '100%',
      }}>
        {show ? <ScrollImgeList list1={[19, 20, 21, 22]} list2={[23, 24, 25]}  /> : ''}
      </div>
      <div
        className='abs_class'
        style={{
          top: '20%',
          right: '29%',
          fontSize: '40px'
        }}
      >
        Get in touch
      </div>
      <div
        className='abs_class'
        style={{
          top: '30%',
          right: '32%'
        }}
      >
        {contactMethodList.map((m) => {
          return (
            <Fragment key={m.method}>
              <div className='c_method_class'>{m.method}</div>
              <div className='c_specific_class'>{m.specific}</div>
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
