'use client';

import { useEffect } from 'react';
import Footer from '../components/footer';
import { shopURL } from './data';

export default function Shop() {
  useEffect(() => {
    window.location.replace(shopURL);
  }, []);

  return (
    <main>
      <p>Thanks for dropping by! Redirecting to my shop...</p>
      <Footer />
    </main>
  );
}
