import React from "react";
// import Logo from "../../Assets/img/emalout-logo.png"
import Logo2 from "../../Assets/img/emalout-logo2.png";
import { EM_ADD, EM_ADMIN, EM_SEARCH } from "../Config/emButton";
import Button from "../Elements/Button";

const Header = () => {
  const menuItems = [
    {
      menu_id: 1,
      menuName: "Home",
    },
    {
      menu_id: 2,
      menuName: "About-us",
    },
    {
      menu_id: 3,
      menuName: "eM-News",
    },
    {
      menu_id: 4,
      menuName: "Contact Us",
    },
  ];

  return (
    <div className="em_header em-flex em-horizontal-align-between em-vertical-align-middle em-header-default">
      <div className="siteLogo">
        <img src={Logo2} alt="" />
      </div>
      <div className="siteMenu">
        <div className="menuItems">
          <ul className="menuListed em-flex">
            {menuItems.map((items) => {
              return (
                <li
                  key={items.menu_id}
                  className="menuListing padding-2 paddingLeftRight-3 em-cursorPointer"
                >
                  {items.menuName}
                </li>
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
        />
        <Button
          title={EM_ADMIN}
          id="em_admin_login"
          className="em-button-default marginRight-2"
        />
      </div>
    </div>
  );
};

export default Header;
