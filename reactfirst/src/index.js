import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Импорт Redux Provider
import { Provider } from 'react-redux';
import store from './redux/store'; // Импорт Redux store

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Обертываем приложение в Provider */}
      <App />
    </Provider>
  </React.StrictMode>
);

// Если хочешь измерить производительность, используй reportWebVitals
reportWebVitals();

