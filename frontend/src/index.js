import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import App from "./App";

//setup store and provider
import store from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

//persist store
const persistedStore = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <PersistGate loading={<div>Loading...</div>} persistor={persistedStore}>
        <App />
      </PersistGate>
    </React.StrictMode>
  </Provider>
);
