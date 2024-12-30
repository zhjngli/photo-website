import Link from 'next/link';

import InstaLink from '../components/instalink';

export default function About() {
  return (
    <main>
      <p>
        Hello! After picking up a camera, I quickly gravitated towards photography characterized by hard light and
        shadows, anonymity and abstraction. I&apos;m still developing my vision, finding my style, and enjoying the
        process.
      </p>
      <p>
        Thanks for following along. Feel free to <Link href="/contact">leave a note</Link> or check out my{' '}
        <InstaLink text={'latest adventures'} />.
      </p>
    </main>
  );
}
