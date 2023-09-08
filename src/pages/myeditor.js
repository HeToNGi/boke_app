import '../style/editor.css'
import React, { useState } from 'react';

import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('for-editor'), { ssr: false });

export default function myeditor() {
  const [value, setValue] = useState('')
  const [forEditorLoaded, setForEditorLoaded] = useState(false);

  useEffect(() => {
    setForEditorLoaded(true);
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
    console.log(e);
  }
  return (
    <div className='editor_outer'>
      {forEditorLoaded ? <Editor style={{marginTop: '46px', height: '100%', overflow: 'scroll'}} value={value} expand preview subfield toolbar={toolbar} onSave={onSave} onChange={(e) => handleEditorChange(e)} /> : ''}
    </div>
  );
}
