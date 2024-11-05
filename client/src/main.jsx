import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react'
import config from "./config.json"

ReactDOM.createRoot(document.getElementById('root')).render(

  <Auth0Provider
    domain={config.Auth0_Domain}
    clientId={config.Auth_ClientID}
    redirectUri={window.location.origin}> 
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>
)
