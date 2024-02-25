import { useState } from "react";
import { Link } from "react-router-dom";
import { MENU_ITEMS } from "../Config/Config";
import { EM_CLOSE_ICON, EM_MOBILE_MENU_ICON } from "../Config/emButton";
import { EM_MOBILE_MENU } from "../Config/EmLabel";

import Button from "../Elements/Button";

const MobileMenu = (props) => {
  try {
    const [menuItems, setMenuItems] = useState(MENU_ITEMS);

    const { mobileMenu, setMobileMenu } = props;
    const handleCloseMobileMenu = () => {
      try {
        setMobileMenu(false);
      } catch (error) {
        console.error(error);
      }
    }
    return (
      <div className="emModal">
        <div className="mobileMenuModal padding-2 em-border-radius fadeIn">
          <div className="add_header em-flex em-horizontal-align-between em-vertical-align-middle em-border-bottom padding-1">
            <h4>{EM_MOBILE_MENU}</h4>
            <Button
              title={EM_MOBILE_MENU_ICON}
              id="em_add_bussiness_modal"
              className="em-button-default marginRight-2"
              onClick={() => {
                handleCloseMobileMenu();
              }}
            />
          </div>
          <div className="add_body paddingTopBottom-2">
            <div className="menuItems mobileMenu">
              <ul className="menuListed">
                {menuItems.map((items) => {
                  return (
                    <div className="paddingTopBottom-2">
                      <Link to={items.url} key={items.menu_id}
                        onClick={() => {
                          handleCloseMobileMenu();
                        }}
                      ><li
                        key={items.menu_id}
                        className="menuListing padding-2 paddingLeftRight-4 marginLeftRight-2 em-cursorPointer em-border-radius em-shadow">
                          {items.menuName}
                        </li>
                      </Link>
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="add_footer em-text-right paddingTop-2">
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error(error);
  }
}

export default MobileMenu;