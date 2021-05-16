import React, { ReactNode } from 'react';
import { BrowserRouter as Router, Redirect, Route as RRoute, Switch } from 'react-router-dom';
import Home from '../Components/Home/Home';
import { Download } from '../Containers/';
import { Login } from '../Containers/Login';
import { useAuth } from '../Hooks/authentication';

interface RouteConfig {
  path: string;
  component: ReactNode;
}

const ROUTE_PATHS: RouteConfig[] = [{ path: '/Home', component: Home }];

export const Route = () => {
  const auth = useAuth();

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
