import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Logo from "../../Assets/img/emalout-logo.png"
import Logo2 from "../../Assets/img/emalout-logo2.png";
import { EM_ADMIN_DETAILS, MENU_ITEMS } from "../Config/Config";
import { EM_ADD, EM_ADMIN, EM_LOGOUT, EM_MOBILE_MENU_ICON, EM_SEARCH } from "../Config/emButton";
import { FLAG_ADD_BTN, FLAG_ADMIN_BTN, FLAG_SEARCH_BTN } from "../Config/emSiteConfig";
import Button from "../Elements/Button";
import AddGigForm from "../Forms/AddGigForm";
import AdminLogin from "../Forms/Admin";
import { getSessionData, removeFromSession } from "../Util";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [showAddGig, setShowGigForm] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [menuItems, setMenuItems] = useState(MENU_ITEMS);
  const [showAdminPopup, setShowAdminPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionFlag , setSessionFlag] = useState(false);
  const navigate = useNavigate();
useEffect(()=>{
  try {
    if(getSessionData(EM_ADMIN_DETAILS)) {
      setIsLoggedIn(true);
    }else {
      setIsLoggedIn(false);
    }
  } catch (error) {
    console.error(error);
  }
},[getSessionData(EM_ADMIN_DETAILS), sessionFlag]);


  const handleShowAddGig =()=>{
    try {
      setShowGigForm(!showAddGig);
    } catch (error) {
      console.error(error);
    }
  }

  const handleOpenMobileMenu=()=>{
    try {
    setMobileMenu(!mobileMenu);
    } catch (error) {
      console.error(error);
      
    }
  }

  const handleOpenAdminPopup=()=>{
    try {
      setShowAdminPopup(!showAdminPopup);
    } catch (error) {
      console.error(error);
      
    }
  }

  const handleAdminLogout=()=>{
    try {
      removeFromSession(EM_ADMIN_DETAILS);
      setIsLoggedIn(false);
      navigate("/")
    } catch (error) {
      console.error(error);
      
    }
  }


  return (
    <>
    <div className="em_header  em-shadow-bottom em-flex em-horizontal-align-between em-vertical-align-middle em-header-default">
      <div className="siteLogo em-horizontal-align-left em-text-left">
        <img src={Logo2} alt="" />
      </div>
    <div className="siteMenuDesktop">
        <div className="menuItems">
          <ul className="menuListed em-flex">
            {menuItems.map((items) => {
              return (
                <Link to = {items.url} key={items.menu_id}><li
                  key={items.menu_id}
                  className="menuListing padding-2 paddingLeftRight-4 marginLeftRight-2 em-cursorPointer em-border-radius em-shadow">
                  {items.menuName}
                </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="siteActions em-flex">
        {FLAG_SEARCH_BTN === "Y" ?       
          <Button
          title={EM_SEARCH}
          id="em_search_button"
          className="em-button-default marginRight-2"
        /> : ""}

        {FLAG_ADD_BTN ==="Y" ?  
        <Button
          title={EM_ADD}
          id="em_add_bussiness"
          className="em-button-default marginRight-2"
          onClick={()=>{
            handleShowAddGig();
          }}
        /> : ""}
       {FLAG_ADMIN_BTN === "Y" ?   
        <Button
          title={isLoggedIn === true ? EM_LOGOUT : EM_ADMIN}
          id="em_admin_login"
          className="em-button-default marginRight-2"
          onClick={()=>{
            if(isLoggedIn === true){
              handleAdminLogout();
            }else {
              handleOpenAdminPopup();
            }
          }}
        /> : ""}
      
        <Button
          title={EM_MOBILE_MENU_ICON}
          id="em_mobile_menu"
          className="em-button-default marginRight-2 em_mobile_menu_button"
          onClick={()=>{
            handleOpenMobileMenu();
          }}
        />
      </div>
      
    </div>
    {showAddGig &&<AddGigForm 
    showAddGig = {showAddGig}
    setShowGigForm = {setShowGigForm}/>} 
    
    {mobileMenu && <MobileMenu 
    mobileMenu={mobileMenu}
    setMobileMenu={setMobileMenu}
    />}

    {showAdminPopup && <AdminLogin 
    showAdminPopup  ={showAdminPopup}
    setShowAdminPopup ={setShowAdminPopup}
    />}
    </>
  );
};

export default Header;
