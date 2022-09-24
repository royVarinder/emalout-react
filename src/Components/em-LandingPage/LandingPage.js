import React from "react";
import Header from "../em-Header/Header";
import RouterPath from "../em-RouterPath/RouterPath";



const LandingPage =()=>{
    return (
        <>
        
        <Header />
        <div className="landingPage">
            <RouterPath />
        </div>
        </>
    )
    
}
export default LandingPage;