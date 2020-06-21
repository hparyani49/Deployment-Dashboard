import React from 'react';
import { Provider } from 'react-redux';
import Routes from './client/routes';
import { BrowserRouter } from "react-router-dom";
import createStore from './client/reducer/createStore';
import './App.css';

const store = createStore();

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
