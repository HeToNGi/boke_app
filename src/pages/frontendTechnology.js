import { useEffect, useState } from 'react'
import AbsCatalogue from '../component/AbsCatalogue'
import AbsMore from '../component/AbsMore'
import MdShow from '@/component/MdShow';
import { getFrontendTechnologyCatalog, getFrontendTechnologyContentForKey, deleteContent } from '@/util/request';
import { useRouter } from 'next/router';
export default function frontendTechnology() {
  const [items, setItems] = useState([]);
  const [content, setContent] = useState('');
  const [key, setKey] = useState('');
  const router = useRouter();
  const init = () => {
    getFrontendTechnologyCatalog().then((res) => {
      if (JSON.stringify(res.data.data) === JSON.stringify(items)) return;
      setItems(res.data.data);
    });
    if (items.length) {
      setKey(items[0].key);
      getFrontendTechnologyContentForKey(items[0].key).then(res => {
        setContent(() => res.data.data.content);
      })
    } else {
      setKey('');
    }
  }


  useEffect(() => {
    init();
  }, [items]);
  
  useEffect(() => {
    if (key) {
      getFrontendTechnologyContentForKey(key).then(res => {
        setContent(() => res.data.data.content);
      })
    }
  }, [key]);

  const onMoreClick = (t) => {
    if (t === 'editor') {
      router.push('/myeditor?id='+key);
    } else {
      deleteContent({
        id: key,
      }).then(res => {
        init();
      })
    }
  }
  const onSelect = (k) => {
    setKey(k);
  }
  return (
    <div className='content'>
      <AbsCatalogue items={items} onSelect={onSelect} />
      <MdShow content={content} />
      <AbsMore onClick={onMoreClick} />
    </div>
  )
}
