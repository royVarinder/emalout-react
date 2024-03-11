import React, { useEffect, useState } from "react";
import {
  EM_ADD_YOUR_GIG,
  EM_ADMIN_LOGIN,
  EM_PLACE_ADMIN,
  EM_PLACE_BUSCONTACT,
  EM_PLACE_BUSNAME,
  EM_PLACE_CITY,
  EM_PLACE_DIST,
  EM_PLACE_EMAILADDRESS,
  EM_PLACE_PASSWORD,
  EM_PLACE_YOURCONTACT,
  EM_PLACE_YOURNAME,
  EM_SELECT_CATEGORY,
  EM_UPLOAD_IMAGES,
} from "../Config/emLabel";
import Button from "../Elements/Button";
import TextBox from "../Elements/InputControl";
import jQuery from "jquery";
import $ from "jquery";
import jqueryValidate from "jquery-validation";
import axios from "axios";
import {
  EM_ERR_EXCLAMATION_MARK,
  EM_ERR_VALID_EMAIL,
} from "../Config/emMessages";
import {
  EM_CANCEL,
  EM_CLOSE_ICON,
  EM_LOGIN,
  EM_SUBMIT,
  TYPE_BUTTON,
  TYPE_SUBMIT,
} from "../Config/emButton";
import {
  EM_TYPE_CHECKBOX,
  EM_TYPE_EMAIL,
  EM_TYPE_NUMBER,
  EM_TYPE_PASSWORD,
  EM_TYPE_TEXT,
  EM_TYPE_TEXTAREA,
} from "../Config/Input";
import Select from "../Elements/Select";
import { EM_DEFAULT_CITY, EM_DEFAULT_DIST, NAV_ADMIN } from "../Config/emSiteConfig";
import CheckRadio from "../Elements/Checkbox";
import DragDropFileUpload from "../Elements/DragDropFileUpload";
import {
  EM_ADMIN_DETAILS,
  EM_CATEGORIES,
  EM_CHANNEL_DETAILS,
  EM_FEATURES,
  EM_WEEKOFDAYS,
} from "../Config/Config";
import { emPostData, getCallData, setSessionData } from "../Util";
import { em_procedur_id } from "../Config/procedureIds";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminLogin = props => {
  const { showAdminPopup, setShowAdminPopup } = props;
  const [allChannels, setallChannels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    $("#adminLogin").validate({
      rules: {
        adminUsername: { required: true },
        adminPassword: { required: true },
      },
      messages: {
        adminUsername: EM_ERR_EXCLAMATION_MARK,
        adminPassword: EM_ERR_EXCLAMATION_MARK,
      },

      submitHandler: function (formData, event) {
        try {
          event.preventDefault();
          let serilizeFromData = $("#adminLogin").serialize();
          const _formData = new FormData(formData);
          let jsonObject = {};
          for (const [key, value] of _formData.entries()) {
            jsonObject[key] = value;
          }
          emPostData(em_procedur_id?.emalout_validate_admin_user, jsonObject)
            .then((res) => {
              if (res.success === 1) {
                handleCloseForm();
                setSessionData(EM_ADMIN_DETAILS, res?.data);
                if(res?.channel){
                  setSessionData(EM_CHANNEL_DETAILS, res?.channel);
                }
                navigate(NAV_ADMIN);
                return;
              }
              toast.error(res?.message);
            });
        } catch (error) {
          console.log("error :>> ", error);
        }
      },
    });
  }, []);

  const handleCloseForm = () => {
    setShowAdminPopup(false);
  };

  return (
    <>
      <div className="emModal">
        <div className="AdminLoginModal padding-2 em-border-radius">
          <div className="add_header em-flex em-horizontal-align-between em-vertical-align-middle em-border-bottom padding-1">
            <h4>{EM_ADMIN_LOGIN}</h4>
            <Button
              title={EM_CLOSE_ICON}
              id="em_add_bussiness_modal"
              className="em-button-default marginRight-2 em-button-small"
              onClick={() => {
                handleCloseForm();
              }}
            />
          </div>
          <form
            id="adminLogin"
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <div className="adminloginBody">
              <TextBox
                type={EM_TYPE_TEXT}
                id="adminUsernameId"
                inputClass="inputClass padding-1 marginTop-1"
                className="form-control "
                name="admin_username"
                placeholder={EM_PLACE_ADMIN}
              />

              <TextBox
                type={EM_TYPE_PASSWORD}
                id="adminPasswordId"
                inputClass="inputClass padding-1 marginTop-1"
                className="form-control "
                name="admin_password"
                placeholder={EM_PLACE_PASSWORD}
              />
            </div>
            <div className="add_footer em-text-right paddingTop-2">
              <Button
                title={EM_CANCEL}
                id="cancel"
                type={TYPE_BUTTON}
                className="em-button-cancel marginRight-2"
                onClick={() => {
                  handleCloseForm();
                }}
              />
              <Button
                title={EM_LOGIN}
                id="submit"
                type={TYPE_SUBMIT}
                className="em-button-default marginRight-2"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default AdminLogin;
