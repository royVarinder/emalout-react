import axios from 'axios';
import './App.css';
import './Assets/css/em-branding.css'
import './Assets/css/em-custom.css'
import './Assets/css/em-main.css'
import './Assets/css/animations.css'
import LandingPage from './Components/em-LandingPage/LandingPage';
// import * as express from 'express';
// import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';
// import { createProxyMiddleware } from 'http-proxy-middleware/dist';


function App() {
  


  return (
    <div className="App">
        <LandingPage  />
    </div>
  );
}

export default App;
