import React from 'react';
import { NavLink } from 'react-router-dom';

import { AboutPageDefinitions } from '../content/about';
import { ContactPageDefinitions } from '../content/contact';
import { HomePageDefinitions } from '../gallery';
import InstaLink from '../instaLink';
import style from './style.module.scss';

class Header extends React.Component {
  render(): React.ReactNode {
    return (
      <header className={style.container}>
        <NavLink to={HomePageDefinitions.pagePath} className={style.title}>
          ƶhijiang li
        </NavLink>
        <nav className={style.navbar}>
          <NavLink to={AboutPageDefinitions.pagePath} className={style.links} activeClassName={style.activeNavLink}>
            about
          </NavLink>
          <NavLink to={ContactPageDefinitions.pagePath} className={style.links} activeClassName={style.activeNavLink}>
            contact
          </NavLink>
          <InstaLink style={style.links} text={'instagram'} />
        </nav>
      </header>
    );
  }
}

export default Header;
