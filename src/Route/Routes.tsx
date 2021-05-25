import React, { ReactNode, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route as RRoute, Switch } from 'react-router-dom';
import { DownloadLog } from '../Components/DownloadLog/DownloadLog';
import Home from '../Components/Home/Home';
import ManageLinks from '../Components/ManageLinks/ManageLinks';
import { Stats } from '../Components/Stats';
import { Download } from '../Containers/';
import { Login } from '../Containers/Login';
import { useAppDispatch } from '../Hooks/app.hook';
import { useAuth } from '../Hooks/authentication.hook';
import { hideLoaderAction } from '../Store/loader.store';

interface RouteConfig {
  path: string;
  component: ReactNode;
}

const ROUTE_PATHS: RouteConfig[] = [
  { path: '/home', component: Home },
  {
    path: '/manage-links',
    component: <ManageLinks />,
  },
  { path: '/stats', component: <Stats /> },
  { path: '/download-logs', component: <DownloadLog /> },
];

export const Route = () => {
  const auth = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(hideLoaderAction());
  }, []);

  // if auth is null, it is in loading state
  if (auth === null) {
    return <span>loading...</span>;
  }

  return <>{auth ? <PostAuth /> : <PreAuth />}</>;
};

const PreAuth = () => {
  return (
    <Router>
      <Switch>
        <RRoute exact path="/login" component={Login} />
        <RRoute path="/download/:fileid">
          <Download />
        </RRoute>
        <Redirect from="*" to="login" />
      </Switch>
    </Router>
  );
};

const PostAuth = () => {
  return (
    <Router>
      <Switch>
        {ROUTE_PATHS.map(({ component, path }, index) => (
          <RRoute exact {...{ path }} component={component as any}></RRoute>
        ))}
        <RRoute path="/download/:fileid">
          <Download />
        </RRoute>

        <Redirect from="*" to="/home" />
      </Switch>
    </Router>
  );
};
