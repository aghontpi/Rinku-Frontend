import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { testAuthentication } from '../Saga/network';
import { receiveUserAction } from '../Store/user.store';
import { useAppDispatch, useAppSelector } from './app.hook';

export const useAuth = () => {
  const state = useAppSelector((state) => state.user);
  const [auth, setAuth] = useState<boolean | null>(null);
  const dispath = useAppDispatch();
  const location = useLocation();
  const keys = ['nick', 'user', 'loginTime'];

  useEffect(() => {
    // async function to wait for testing authentication
    async function _auth() {
      for (let i = 0; i < keys.length - 1; i++) {
        const item = keys[i];
        if (localStorage.getItem(item) == null) {
          setAuth(false);
          break;
        } else {
          // if item exists, test the login
          if (await testLogin()) {
            // auth success, set all use variables, this is a hack,
            // since I didnot create an api endpoint for validating the token
            const loginTime = localStorage.getItem('loginTime');
            const user = localStorage.getItem('user');
            const nick = localStorage.getItem('nick');
            if (loginTime && user && nick) {
              dispath(receiveUserAction({ user, nick, loginTime }));
              break;
            }
          } else {
            setAuth(false);
          }
          break;
        }
      }
    }
    // if path is download, setauth is false
    if (location.pathname.includes('download')) {
      setAuth(false);
    } else {
      _auth();
    }
  }, []);

  useEffect(() => {
    if (state.user && state.nick && state.loginTime) {
      setTimeout(() => {
        setAuth(true);
      }, 1000);
    }
  }, [state]);

  return auth;
};

const testLogin = async (): Promise<boolean> => {
  const response: Response = await testAuthentication();
  return response.status === 200;
};
