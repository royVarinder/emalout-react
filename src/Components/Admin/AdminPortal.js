import { useEffect, useState } from "react";
import { EM_ADMIN_DETAILS } from "../Config/Config";
import { EM_ADD } from "../Config/emButton";
import { em_procedur_id } from "../Config/procedureIds";
import Button from "../Elements/Button";
import AddNews from "../Forms/AddNews";
import { emPostData, getSessionData } from "../Util";

const AdminPortal = () => {
  const [channelDetails, setallChannelsDetails] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [openAddNewsFrom, setOpenAddNewsFrom]= useState(false);
  useEffect(() => {
    try {
      if (getSessionData(EM_ADMIN_DETAILS)) {
        let adminId = getSessionData(EM_ADMIN_DETAILS).admin_channel;
        let serielizeData = `adminChannelId=${adminId}`;
        emPostData(em_procedur_id?.get_admin_details, serielizeData).then(
          res => {
            if (res?.data !== "") {
              setallChannelsDetails(res?.data);
              let admin = res?.data?.value;
              if (admin === "Admin") {
                setIsAdmin(true);
              } else {
                setIsAdmin(false);
              }
            }
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleOpenAddNewsForm =()=>{
    setOpenAddNewsFrom(true)
  }


  return isAdmin === true ? (
    <div className="admin">{channelDetails?.value}</div>
  ) : (
  <>
    <div className="channel">{channelDetails?.value}</div>
      <Button
      title={EM_ADD}
      id="em_add_bussiness_modal"
      className="em-button-default marginRight-2 em-button-small"
      onClick={() => {
        handleOpenAddNewsForm();
      }}
    />
   
   {openAddNewsFrom && <AddNews 
   setOpenAddNewsFrom = {setOpenAddNewsFrom}
   openAddNewsFrom = {openAddNewsFrom}
   />}
  </>

  );
};
export default AdminPortal;
