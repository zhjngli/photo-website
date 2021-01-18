import React from 'react';
import { NavLink } from 'react-router-dom';
import { AboutPageDefinitions } from '../content/about';
import { ContactPageDefinitions } from '../content/contact';
import { HomePageDefinitions } from '../gallery';
import InstaLink from '../instaLink';
import style from './style.module.scss';

type HeaderProps = {
  homeClick: () => void;
};

class Header extends React.Component<HeaderProps> {
  render(): React.ReactNode {
    return (
      <div className={style.container}>
        <NavLink to={HomePageDefinitions.pagePath} className={style.title} onClick={this.props.homeClick}>
          ƶhijiang li
        </NavLink>
        <div className={style.navbar}>
          <NavLink to={AboutPageDefinitions.pagePath} className={style.links} activeClassName={style.activeNavLink}>
            about
          </NavLink>
          <NavLink to={ContactPageDefinitions.pagePath} className={style.links} activeClassName={style.activeNavLink}>
            contact
          </NavLink>
          <InstaLink style={style.links} />
        </div>
      </div>
    );
  }
}

export default Header;
