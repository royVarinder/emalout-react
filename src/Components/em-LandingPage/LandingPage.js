import React from "react";
import { ToastContainer } from "react-toastify";
import Header from "../em-Header/Header";
import RouterPath from "../em-RouterPath/RouterPath";
import 'react-toastify/dist/ReactToastify.css';
import Popups from "../Popups";



const LandingPage =()=>{
    return (
        <>
        
        <Header />
        <div className="landingPage">
            <RouterPath />
            <ToastContainer />
            <Popups /> 
        </div>
        </>
    )
    
}
export default LandingPage;