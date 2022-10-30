import { useEffect, useState } from "react";
import { EM_ADMIN_DETAILS } from "../Config/Config";
import { em_procedur_id } from "../Config/procedureIds";
import { emPostData, getSessionData } from "../Util";

const AdminPortal = () => {
  const [channelDetails, setallChannelsDetails] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
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
  return isAdmin === true ? (
    <div className="admin">{channelDetails?.value}</div>
  ) : (
    <div className="channel">{channelDetails?.value}</div>
  );
};
export default AdminPortal;
