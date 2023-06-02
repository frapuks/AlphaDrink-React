import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { store } from './Store';
import App from './App/App';
//& API Provider
import { ApiProvider } from '@reduxjs/toolkit/query/react';
// import { apiSlice } from './Store/Api';

//& Imports SCSS
import './Assets/sass/index.scss';

const root = createRoot(document.getElementById('root'));

root.render(
    <StrictMode>
      <BrowserRouter>
        {/* <ApiProvider api={apiSlice}> */}
          {/* <Provider store={store}> */}
            <App />
          {/* </Provider> */}
        {/* </ApiProvider> */}
      </BrowserRouter>
    </StrictMode>
  );