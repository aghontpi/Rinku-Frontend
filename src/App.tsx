import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './App.css';
import { Loader } from './Component/Loading';
import { Route } from './Route';
import { store } from './Store';

const history = createBrowserHistory();
function App() {
  return (
    <>
      <Router history={history}>
        <Provider store={store}>
          <Loader />
          <Route />
        </Provider>
      </Router>
    </>
  );
}

export default App;
