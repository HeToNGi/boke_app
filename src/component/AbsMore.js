import { useEffect, useState, Fragment } from "react";
import { EllipsisOutlined  } from '@ant-design/icons';
import { Button, Popover } from 'antd';
export default function AbsCatalogue({ onClick }) {
  const [open, setOpen] = useState(false);

  const hide = (type) => {
    setOpen(false);
    onClick(type);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const buttons = () => {
    return (
      <Fragment>
        <Button type="text" onClick={() => hide('editor')} block>编辑</Button>
        <Button type="text" onClick={() => hide('delete')} danger block>删除</Button>
      </Fragment>
    )
  }
  return (
    <div className="abs_more">
      <Popover
        placement="rightTop"
        content={buttons()}
        title=""
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <Button type="primary" icon={<EllipsisOutlined />} />
      </Popover>
    </div>
  )
}
