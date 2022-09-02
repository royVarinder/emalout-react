import HomePage from "../HomePage/HomePage";
import { Route, Routes } from "react-router-dom";
import EmNews from "../em-news/EmNews";
import AboutUs from "../em-About-us/About-us";
import ContactUs from "../em-Contact-us/Contact-us";
const  RouterPath=(props)=> {
 
  return (
    <div className="emRouterPath landingPage">
      <div className="main-content marginLeftRight-2">
        <div className="content-card padding-0">
          <Routes>
            <Route exact path="/" element={<HomePage/>} />
            <Route exact path="/em-news" element={<EmNews/>} />
            <Route exact path="/about-us" element={<AboutUs/>} />
            <Route exact path="/contact-us" element={<ContactUs/>} />
          </Routes >
        </div>
      </div>
    </div>
  );
}
export default RouterPath; 
