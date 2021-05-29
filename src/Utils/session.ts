import { UserDetails } from '../Store/user.store';

type HydrateSession = UserDetails;

const hydrateSession = ({ loginTime, nick, user }: HydrateSession) => {
  localStorage.setItem('nick', nick);
  localStorage.setItem('user', user);
  localStorage.setItem('loginTime', loginTime);
};

const dehydrateSession = () => {
  localStorage.removeItem('nick');
  localStorage.removeItem('user');
  localStorage.removeItem('loginTime');
};

export { hydrateSession, dehydrateSession };
