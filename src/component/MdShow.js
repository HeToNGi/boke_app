import React, { useState, useEffect } from 'react';
// import Editor from 'for-editor';
import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('for-editor'), { ssr: false });

export default function MdShow({content}) {
  const [forEditorLoaded, setForEditorLoaded] = useState(false);

  useEffect(() => {
    setForEditorLoaded(true);
  }, []);
  const toolbar = {
    h1: false, // h1
    h2: false, // h2
    h3: false, // h3
    h4: false, // h4
    img: false, // 图片
    link: false, // 链接
    code: false, // 代码块
    preview: false, // 预览
    expand: false, // 全屏
    /* v0.0.9 */
    undo: false, // 撤销
    redo: false, // 重做
    save: false, // 保存
    /* v0.2.3 */
    subfield: false, // 单双栏模式
  }
  return (
    <div style={{width: '100%', overflow: 'scroll'}}>
      {forEditorLoaded && content ? <Editor style={{overflow: 'scroll', position: 'relative'}} value={content} expand preview toolbar={toolbar}/> : ''}
    </div>
  );
}

