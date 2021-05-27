import { CSSProperties } from 'react';
import { Route, Switch } from 'react-router';

const PAGE_HEADER: { path: string; title: string; subtitle: string }[] = [
  {
    path: '/home',
    title: 'Explore Files',
    subtitle: 'Make sure you set the correct folder in server',
  },
  {
    path: '/manage-links',
    title: 'Browse & Manage links',
    subtitle: 'Enable or disable links here',
  },
  {
    path: '/stats',
    title: 'Track the download StatisTics',
    subtitle: 'Currently sorting data is based on all time data.',
  },
  {
    path: '/download-logs',
    title: 'Track the Download log',
    subtitle: 'Logs are sorted in reverse Order, (i.e) most recent downloads are shown first.',
  },
];

const PageHeaderRouter = () => {
  return (
    <Switch>
      {PAGE_HEADER.map(({ path, title, subtitle }, index) => {
        return (
          <Route
            key={index}
            children={
              <>
                <h1>{title}</h1>
                <h3>{subtitle}</h3>
              </>
            }
            path={path}
          />
        );
      })}
    </Switch>
  );
};

export default PageHeaderRouter;
