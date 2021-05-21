import { useEffect, useState } from 'react';
import { useAppSelector } from './app.hook';

export const useAuth = () => {
  const state = useAppSelector((state) => state.user);
  const [auth, setAuth] = useState<boolean | null>();
  useEffect(() => {
    ['nick', 'user', 'loginTime'].forEach((item) => {
      if (sessionStorage.getItem(item) == null) {
        setAuth(false);
      } else {
        // todo: make an api call to validate the token
        setAuth(true);
      }
    });
  }, []);

  useEffect(() => {
    if (state.user && state.nick && state.loginTime) {
      setAuth(true);
    }
  }, [state]);

  return auth;
};
