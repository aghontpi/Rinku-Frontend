import { UserDetails } from '../Store/user.store';

type HydrateSession = UserDetails;

const hydrateSession = ({ loginTime, nick, user }: HydrateSession) => {
  localStorage.setItem('nick', nick);
  localStorage.setItem('user', user);
  localStorage.setItem('loginTime', loginTime);
};

export { hydrateSession };
