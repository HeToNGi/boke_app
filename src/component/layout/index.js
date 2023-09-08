import '@/app/globals.css';
import '../../style/layout.css';
import { Menu, ConfigProvider, Button } from 'antd';
import { ThunderboltFilled  } from '@ant-design/icons';

import react, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
export default function RootLayout({ children }) {
  return (
    <div style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
    }}>
      <div>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#000000',
            },
          }}
        >
        <TopMenu />
      </ConfigProvider>
      </div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#a8515e',
          },
        }}
      >
        {children}
      </ConfigProvider>
    </div>
  )
}
