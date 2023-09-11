import { useEffect, useState } from 'react'
import AbsCatalogue from '../component/AbsCatalogue'
import MdShow from '@/component/MdShow';
import { getFrontendTechnologyCatalog, getFrontendTechnologyContentForKey } from '@/util/request';
export default function frontendTechnology() {
  const [items, setItems] = useState([]);
  const [content, setContent] = useState('');
  const [key, setKey] = useState('');

  useEffect(() => {
    getFrontendTechnologyCatalog().then((res) => {
      setItems(res.data.data);
    })
  }, []);

  useEffect(() => {
    if (items.length) {
      getFrontendTechnologyContentForKey(items[0].key).then(res => {
        setContent(() => res.data.data.content);
      })
    }
  }, [items]);
  
  useEffect(() => {
    if (key) {
      getFrontendTechnologyContentForKey(key).then(res => {
        setContent(() => res.data.data.content);
      })
    }
  }, [key]);

  const onSelect = (k) => {
    setKey(k);
  }
  return (
    <div className='content'>
      <AbsCatalogue items={items} onSelect={onSelect} />
      <MdShow content={content} />
    </div>
  )
}
