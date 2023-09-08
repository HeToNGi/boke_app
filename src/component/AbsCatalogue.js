import { useEffect, useState } from "react";
import { Menu } from 'antd';

export default function AbsCatalogue({ items, onSelect }) {
  // console.log(items, 'itemsitemsitems')
  // const [menuItem, setMenuItem] = useState(items);
  const [selectedKey, setSelectedKey] = useState('');
  useEffect(() => {
    setSelectedKey(items[0]?.key);
  }, [items]);

  const onSelect1 = (e) => {
    setSelectedKey(e.key);
    onSelect(e.key)
  }

  return (
    <div className="abs_catalogue">
      <Menu
        onSelect={onSelect1}
        selectedKeys={[selectedKey]}
        items={items}
        style={{border: 'none'}}
      />
    </div>
  )
}
