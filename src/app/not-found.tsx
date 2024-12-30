import Link from 'next/link';

export default function NotFound() {
  return (
    <main>
      <p>
        Sorry, content not found! Go to <Link href="/">home</Link>.
      </p>
    </main>
  );
}
