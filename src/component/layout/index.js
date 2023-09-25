import '@/app/globals.css';
import '../../style/layout.css';
import { Menu, ConfigProvider, Button } from 'antd';
import { ThunderboltFilled  } from '@ant-design/icons';

import react, { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import anime from 'animejs';

function TopMenu() {
  const router = useRouter()
  const [current, setCurrent] = useState(router.route.replace('/', ''));
  const onClick = (e) => {
    setCurrent(e.key);
  };
  const style = {
    position: 'absolute',
    right: '300px',
    background: 'rgba(255, 255, 255, 0)',
    color: '#ffffff',
  }
  const bodyStyle = {
    width: "100%",
    height: "46px",
    background: "rgb(168, 81, 94)",
    position: "absolute",
  }
  const toIndex = () => {
    router.push('/');
    setCurrent('')
  }
  return (
    <div style={bodyStyle}>
      {current ?  <Button className='index_button' onClick={toIndex} icon={<ThunderboltFilled />} ghost></Button> : ''}
      <Menu onClick={onClick} type="primary" style={style} selectedKeys={[current]} mode="horizontal" items={[
        {
          label: (<Link href="/frontendTechnology">前端技术</Link>),
          key: 'frontendTechnology',
        },
        {
          label: (<Link href="/backendservices">后端服务</Link>),
          key: 'backendservices',
        },
        {
          label: (<Link href="/algorithm">算法</Link>),
          key: 'algorithm',
        },
        {
          label: (<Link href="/tetris">俄罗斯方块</Link>),
          key: 'tetris',
        },
        {
          label: (<Link href="/mineClearance">扫雷</Link>),
          key: 'mineClearance',
        },
        {
          label: (<Link href="/leaveamessage">留言</Link>),
          key: 'leaveamessage',
        },
        {
          label: (<Link href="/myeditor">编辑</Link>),
          key: 'myeditor',
        },
      ]} />
    </div>
  ) 
}
function MenuList({onSelect}) {
  const router = useRouter()
  const [menu, setMenu] = useState([
    {
      title: 'Lucy100k',
      path: '/',
      imageSrc: '/img/luck.jpg',
    }, {
      title: 'HOME',
      path: '/home',
      imageSrc: '/img/home.jpg',
    }, {
      title: 'WORK',
      path: '/work',
      imageSrc: '/img/work.jpg',
    }, {
      title: 'ABOUT',
      imageSrc: '/img/home.jpg',
    }, {
      title: 'CONTACT',
      path: '/contact',
      imageSrc: '/img/contact.jpg',
    }])
  const [currentSelect, setCurrentSelect] = useState('HOME');
  const onMenuClick = (m) => {
    setCurrentSelect(m.title);
    onSelect();
    router.push(m.path || '/')
  }
  return (
    <Fragment>
      {menu.map((m, i) => {
        return (
          <div key={i} onClick={() => {onMenuClick(m)}} className='menu_item'>
            <div className='menu_title'>
              {currentSelect === m.title ? <span className='tag_class' /> : ''}
              {m.title}
            </div>
            <div className='menu_img'>
              <img
                src={m.imageSrc}
                style={{
                  width: '100%',
                  display: 'block'
                }}
              />
            </div>
          </div>
        )
      })}
    </Fragment>
  )
}
export default function RootLayout({ children }) {
  const [isMenuon, setIsMenuon] = useState(false);
  const openMenu = () => {
    setIsMenuon(i => !i);
    anime({
      targets: '.main_content',
      translateY: isMenuon ? 0 : -450,
      duration: 500,
      easing: 'easeInOutQuad'
    }).play();
    anime({
      targets: '.menu_content',
      translateY: isMenuon ? 0 : -40,
      width: isMenuon ? '95%' : '100%',
      duration: 100,
      delay: isMenuon ? 100 : 200,
      easing: 'easeInOutQuad'
    }).play();
    anime({
      targets: '.menu_btn',
      backgroundColor: isMenuon ? 'rgb(196, 133, 60)' : 'rgb(69, 59, 195)',
      duration: 1000,
      easing: 'easeInOutQuad'
    }).play();
  }
  return (
    <div style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: '#000'
    }}>
      <div className='menu_content'>
        <MenuList onSelect={openMenu} />
      </div>
      <div className='main_content'>
        <span className='main_icon'>
          HeT.
        </span>
        {children}
      </div>
      <div
        onClick={openMenu}
        className='menu_btn'
      >
        <svg
          className='menu_icon'
          t="1695259926167"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5380" id="mx_n_1695259926168"
          width="48" height="48">
          <path
            d="M473.744 541.92a16 16 0 0 1 16 16v249.728a16 16 0 0 1-16 16H224a16 16 0 0 1-16-16V557.92a16 16 0 0 1 16-16h249.744z m322.784 0a16 16 0 0 1 16 16v249.728a16 16 0 0 1-16 16h-249.76a16 16 0 0 1-16-16V557.92a16 16 0 0 1 16-16h249.76z m-354.784 48H256v185.728h185.744V589.92z m322.784 0h-185.76v185.728h185.76V589.92zM676.528 208a152 152 0 1 1 0 304 152 152 0 0 1 0-304z m-202.784 11.136a16 16 0 0 1 16 16v249.728a16 16 0 0 1-16 16H224a16 16 0 0 1-16-16V235.136a16 16 0 0 1 16-16h249.744zM676.528 256a104 104 0 1 0 0 208 104 104 0 0 0 0-208z m-234.784 11.136H256v185.728h185.744V267.136z"
            fill={isMenuon ? "#C4853C" : "#453BC3"}
            p-id="5381"
          >
          </path>
        </svg>
      </div>
    </div>
  )
}
