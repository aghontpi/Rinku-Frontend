import { Provider } from 'react-redux';
import './App.css';
import { Loader } from './Component/Loading';
import { Route } from './Route';
import { store } from './Store';
function App() {
  return (
    <>
      <Provider store={store}>
        <Loader />
        <Route />
      </Provider>
    </>
  );
}

export default App;
