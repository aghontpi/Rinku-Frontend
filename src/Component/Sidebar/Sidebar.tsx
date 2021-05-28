import React, { ReactNode, useState } from 'react';
import FadeIn from 'react-fade-in';
import { Filter, Compass, BarChart2, Archive } from 'react-feather';
import { FileManager, ManageLinks, Stats, DownloadLog } from '../../Containers/';
import { useAppSelector } from '../../Hooks/app.hook';
import { Menu, MenuItem, Sidebar as SemanticSidebar } from 'semantic-ui-react';
import style from './sidebar.module.css';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import { PageHeader } from '../PageHeader';

const SIDE_BAR = [
  {
    path: '/home',
    exact: true,
    children: () => FadeWrapper(<FileManager />),
    name: 'Explorer',
    icon: <Compass className={style['navIcon']} />,
  },
  {
    path: '/manage-links',
    exact: true,
    children: () => FadeWrapper(<ManageLinks />),
    name: 'Manage Links',
    icon: <Filter className={style['navIcon']} />,
  },
  {
    path: '/stats',
    exact: true,
    children: () => FadeWrapper(<Stats />),
    name: 'Stats',
    icon: <BarChart2 className={style['navIcon']} />,
  },
  {
    path: '/download-logs',
    exact: true,
    children: () => FadeWrapper(<DownloadLog />),
    name: 'Download Log',
    icon: <Archive className={style['navIcon']} />,
  },
] as const;

const Sidebar = () => {
  const { nick } = useAppSelector((state) => state.user);
  // react router dom navLink was not working, workaround
  const [activeMenu, setActiveMenu] = useState<number>(0);

  return (
    <>
      <BrowserRouter>
        <SemanticSidebar
          as={Menu}
          animation="push"
          width="thin"
          direction="left"
          vertical
          visible
          inverted
          className={style['main-sidebar']}
        >
          <div className={style['user-title']}>
            <FadeIn>
              <h4>Hi {nick}!</h4>
              {/* <Logout /> */}
            </FadeIn>
          </div>
          <div className={style['user-content']}>
            {SIDE_BAR.map(({ name, icon, path }, key) => {
              return (
                <div>
                  <NavLink to={path} exact activeClassName={style['active']} onClick={() => setActiveMenu(key)}>
                    <FadeIn>
                      <MenuItem
                        name="home"
                        key={key}
                        className={`${style['menu-item']} ${key === activeMenu && style['active']}`}
                      >
                        {icon}
                        <label>{name}</label>
                      </MenuItem>
                    </FadeIn>
                  </NavLink>
                </div>
              );
            })}
          </div>
        </SemanticSidebar>
        <div className={style['page-holder']}>
          <PageHeader />
          <div className={style['actual-page']}>
            <FadeIn delay={100} transitionDuration={800}>
              <div className={style['page-render-area']}>
                <Switch>
                  {SIDE_BAR.map(({ path, exact, children }, key) => {
                    return <Route {...{ path, exact, children, key }} />;
                  })}
                </Switch>
              </div>
            </FadeIn>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

const FadeWrapper = (component: ReactNode) => {
  return <FadeIn>{component}</FadeIn>;
};

export default Sidebar;
