import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Logo from "../../Assets/img/emalout-logo.png"
import Logo2 from "../../Assets/img/emalout-logo2.png";
import { MENU_ITEMS } from "../Config/Config";
import { EM_ADD, EM_ADMIN, EM_MOBILE_MENU_ICON, EM_SEARCH } from "../Config/emButton";
import { FLAG_ADD_BTN, FLAG_ADMIN_BTN, FLAG_SEARCH_BTN } from "../Config/emSiteConfig";
import Button from "../Elements/Button";
import AddGigForm from "../Forms/AddGigForm";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [showAddGig, setShowGigForm] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [menuItems, setMenuItems] = useState(MENU_ITEMS);


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
          title={EM_ADMIN}
          id="em_admin_login"
          className="em-button-default marginRight-2"
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
    </>
  );
};

export default Header;
