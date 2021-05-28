import React, { useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route as RRoute, Switch } from 'react-router-dom';
import Sidebar from '../Component/Sidebar/Sidebar';

import { Download } from '../Containers/';
import { Login } from '../Containers/Login';
import { useAppDispatch } from '../Hooks/app.hook';
import { useAuth } from '../Hooks/authentication.hook';
import { hideLoaderAction } from '../Store/loader.store';

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
        <RRoute path="/home">
          <Sidebar />
        </RRoute>
        <RRoute path="/download/:fileid">
          <Download />
        </RRoute>
        <Redirect from="*" to="/home" />
      </Switch>
    </Router>
  );
};
