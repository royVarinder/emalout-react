import { useEffect, useState } from "react";
import { EM_ADMIN_DETAILS, EM_CHANNEL_DETAILS } from "../Config/Config";
import { EM_ADD } from "../Config/emButton";
import { em_procedur_id } from "../Config/procedureIds";
import Button from "../Elements/Button";
import AddNews from "../Forms/AddNews";
import { emPostData, getSessionData } from "../Util";
import { toast } from "react-toastify";
import AdminComponents from "./AdminComponents";
import { useNavigate } from "react-router-dom";

const AdminPortal = () => {


  const navigate = useNavigate();
  const [newsList, setNewsList] = useState([]);
  const [channelMenuList, setChannelMenuList] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState('');
  let channel_id = '';
  let channelName = '';
  let channelLogo = '';
  const adminAdminDetails = getSessionData(EM_ADMIN_DETAILS);
  if(!!!adminAdminDetails){
    navigate("/")
  }
  const adminChannelDetails = getSessionData(EM_CHANNEL_DETAILS);
  //getting channel id 

  try {
    if (!!adminChannelDetails) {
      const { channel_admin_id, channel_name, channel_logo } = adminChannelDetails[0];
      channel_id = channel_admin_id;
      channelName = channel_name;
      channelLogo = channel_logo;
    }
    if (adminAdminDetails) {

    }
  } catch (error) {
    console.error(error);
  }


  // useEffect(() => {
  //   try {
  //     if (getSessionData(EM_ADMIN_DETAILS)) {
  //       let adminId = getSessionData(EM_ADMIN_DETAILS).admin_channel;
  //       let serielizeData = `adminChannelId=${adminId}`;
  //       emPostData(em_procedur_id?.get_admin_details, serielizeData).then(
  //         res => {
  //           if (res?.data !== "") {
  //             setallChannelsDetails(res?.data);
  //             let admin = res?.data?.value;
  //             if (admin === "Admin") {
  //               setIsAdmin(true);
  //             } else {
  //               setIsAdmin(false);
  //             }
  //           }
  //         }
  //       );
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);


  useEffect(() => {
    getNewsList();
    getChannelMenuList();
  }, [])


  const getNewsList = () => {
    try {
      if (!!channel_id) {
        emPostData(em_procedur_id?.em_get_channel_news, {
          channel_id: channel_id,
        }).then((res) => {
          const { data, success, message } = res;
          if (success === 1) {
            setNewsList(data);
          } else {
            toast.error(message);
          }
        })
      }
    } catch (error) {
      console.error(error);
    }
  }

  const getChannelMenuList = () => {
    try {
      emPostData(em_procedur_id?.em_get_channel_menu_list, {})
        .then((res) => {
          const { success, message, data } = res;
          if (success === 1) {
            //set data in state
            setChannelMenuList(data);
            setSelectedMenu(data[0]?.json_tag);
          } else {
            toast.error(message)
          }
        })
    } catch (error) {
      console.error(error);
    }
  }

  const handleSelectMenu = (menuObject) => {
    try {
      setSelectedMenu(menuObject?.json_tag)
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <>
      <div className="channelContainer">
        <div className="channelHeader em-flex em-horizontal-align-between padding-1 paddingLeftRight-2 em-vertical-align-middle">
          <div className="channelName">
            <h3>{channelName}</h3>
          </div>
          <div className="channelLogo">
            {channelLogo && <img src={channelLogo}></img>}
          </div>
        </div>
        <div className="channelBody">
          <div className="bodyContainer em-flex">
            <div className="leftContainer ">
              <ul className="menuList">
                {channelMenuList.map((items, idx) => {
                  const isDisabled = items?.is_disabled === '1';
                  return <li key={idx} className={`menuItem padding-2 ${isDisabled ? 'menuItemIsDisabled' : ''} ${items?.json_tag === selectedMenu ? 'menuItemActive' : '' }`}
                    onClick={() => !isDisabled && handleSelectMenu(items)}s
                  >
                    <p>{items?.title}<span>{" > "}</span></p>
                  </li>
                })}
              </ul>
            </div>
            <div className="rightContainer">
              <AdminComponents selectedMenu={selectedMenu} channelId = {channel_id} />
            </div>
          </div>
        </div>
        <div className="channelFooter">

        </div>
      </div>
    </>
  );
};
export default AdminPortal;
