import React from "react";
import { NavLink } from "react-router-dom";
import InstaLink from '../instaLink';
import style from './style.module.scss';

class Header extends React.Component {
  render() {
    return (
      <div className={style.container}>
        <NavLink to="/" className={style.title}>
          ƶhijiang li
        </NavLink>
        <div className={style.navbar}>
          <NavLink to="/about" className={style.links} activeClassName={style.activeNavLink}>
            about
          </NavLink>
          <NavLink to="/contact" className={style.links} activeClassName={style.activeNavLink}>
            contact
          </NavLink>
          <InstaLink style={style.links} />
        </div>
      </div>
    );
  }
}

export default Header;
