import '../style/editor.css'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Modal, Input } from 'antd';
import { saveContent, getFrontendTechnologyContentForKey } from '@/util/request';
import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('for-editor'), { ssr: false });

export default function myeditor() {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [forEditorLoaded, setForEditorLoaded] = useState(false);

  useEffect(() => {
    setForEditorLoaded(true);
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id')
    if (id) {
      getFrontendTechnologyContentForKey(id).then(res => {
        setValue(res.data.data.content);
        setTitle(res.data.data.title);
      })
    }
  }, []);
  const handleEditorChange = (value) => {
    setValue(value);
  };

  const toolbar = {
    h1: true, // h1
    h2: true, // h2
    h3: true, // h3
    h4: true, // h4
    img: true, // 图片
    link: true, // 链接
    code: true, // 代码块
    preview: false, // 预览
    expand: false, // 全屏
    /* v0.0.9 */
    undo: true, // 撤销
    redo: true, // 重做
    save: true, // 保存
    /* v0.2.3 */
    subfield: false, // 单双栏模式
  }
  const onSave = (e) => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id')
    saveContent({
      id,
      title,
      content: e,
      type: 'front',
    }).then(res => {
      router.push(`/myeditor?id=${res.data.data.id}`);
      console.log(res, 'saveContentsaveContentsaveContent')
    });
  }

  // article
  return (
    <div className='editor_outer'>
     <div className='content_title'>
      <Input value={title} onChange={(e) => {setTitle(e.target.value)}} style={{height: '100%'}} placeholder='请输入标题' />
     </div>
     {forEditorLoaded ? <Editor style={{marginTop: '96px', height: '100%', overflow: 'scroll'}} value={value} expand preview subfield toolbar={toolbar} onSave={onSave} onChange={(e) => handleEditorChange(e)} /> : ''}
    </div>
  );
}
