import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {persistor, store} from "./app/store";
import {PersistGate} from "redux-persist/integration/react";
import {addInterceptors} from "./axiosApi";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {GOOGLE_CLIENT_ID} from "./utils/constants";
import {LanguageProvider} from "./i18n/LanguageContext";

addInterceptors(store);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID} >
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <LanguageProvider>
          <BrowserRouter future={{ v7_startTransition: true }}>
            <App/>
          </BrowserRouter>
        </LanguageProvider>
      </PersistGate>
    </Provider>
    </GoogleOAuthProvider>
  </>
);

