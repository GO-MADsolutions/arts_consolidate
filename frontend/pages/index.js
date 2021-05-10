import Router from 'next/router';
import { useEffect } from 'react';
export default function Home() {
  useEffect(() => {
    Router.push('/posts');
  },[]);
  return (
    <div>
    
    </div>
  )
}
