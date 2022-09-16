import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Logo from "../../Assets/img/emalout-logo.png"
import Logo2 from "../../Assets/img/emalout-logo2.png";
import { EM_ADD, EM_ADMIN, EM_SEARCH } from "../Config/emButton";
import Button from "../Elements/Button";
import AddGigForm from "../Forms/AddGigForm";

const Header = () => {
  const [showAddGig, setShowGigForm] = useState(false);
  const menuItems = [
    {
      menu_id: 1,
      menuName: "Home",
      url : "/"
    },
    {
      menu_id: 2,
      menuName: "About-us",
      url : "/about-us"
    },
    {
      menu_id: 3,
      menuName: "eM-News",
      url : "/em-news"
    },
    {
      menu_id: 4,
      menuName: "Contact Us",
      url : "/contact-us"
    },
  ];

  const handleShowAddGig =()=>{
    setShowGigForm(!showAddGig);
  }



  return (
    <>
    <div className="em_header  em-shadow-bottom em-flex em-horizontal-align-between em-vertical-align-middle em-header-default">
      <div className="siteLogo">
        <img src={Logo2} alt="" />
      </div>
      <div className="siteMenu">
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
        <Button
          title={EM_SEARCH}
          id="em_search_button"
          className="em-button-default marginRight-2"
        />
        <Button
          title={EM_ADD}
          id="em_add_bussiness"
          className="em-button-default marginRight-2"
          onClick={()=>{
            handleShowAddGig();
          }}
        />
        <Button
          title={EM_ADMIN}
          id="em_admin_login"
          className="em-button-default marginRight-2"
        />
      </div>
    </div>
    {showAddGig &&<AddGigForm 
    showAddGig = {showAddGig}
    setShowGigForm = {setShowGigForm}/>} 
    </>
  );
};

export default Header;
