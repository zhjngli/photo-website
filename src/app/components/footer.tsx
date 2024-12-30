// import style from './footer-style.module.scss';

export default function Footer() {
  const year = new Date().getFullYear();
  return <footer>&copy; {year}.</footer>;
}
