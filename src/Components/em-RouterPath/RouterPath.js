import HomePage from "../HomePage/HomePage";
import { Route, Routes } from "react-router-dom";
import EmNews from "../em-news/EmNews";
import AboutUs from "../em-About-us/About-us";
import ContactUs from "../em-Contact-us/Contact-us";
import Buss from "../em-buss/Buss";
import AdminPortal from "../Admin/AdminPortal";
import { NAV_ADMIN } from "../Config/emSiteConfig";

const  RouterPath=()=> {

  return (
    <div className="emRouterPath landingPage">
      <div className="main-content marginLeftRight-2">
        <div className="content-card padding-0">
          <Routes>
            <Route exact path="/" element={<HomePage/>} />
            <Route exact path="/em-news" element={<EmNews/>} />
            <Route exact path="/about-us" element={<AboutUs/>} />
            <Route exact path="/contact-us" element={<ContactUs/>} />
            <Route exact path="/buss" element={<Buss/>} />
            <Route exact path={NAV_ADMIN} element={<AdminPortal/>} />
          </Routes >
        </div>
      </div>
    </div>
  );
}
export default RouterPath; 
