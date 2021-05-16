import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { Route } from './Route';
import { store } from './Store/';
function App() {
  return (
    <>
      <Provider store={store}>
        <Route />
      </Provider>
    </>
  );
}

export default App;
