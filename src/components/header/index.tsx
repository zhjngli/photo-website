import React from "react";
import { NavLink } from "react-router-dom";
import style from './style.module.scss';

class Header extends React.Component {
  render() {
    return (
      <div className={style.container}>
        <NavLink to="/" className={style.title}>
          zhijiang li
        </NavLink>
        <div className={style.navbar}>
          <NavLink to="/about" className={style.links} activeClassName={style.activeNavLink}>
            about
          </NavLink>
          <NavLink to="/contact" className={style.links} activeClassName={style.activeNavLink}>
            contact
          </NavLink>
          <a href="https://www.instagram.com/zhjngli/" target="_blank" rel="noreferrer noopener" className={style.links}>
            instagram
          </a>
        </div>
      </div>
    );
  }
}

export default Header;
