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
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useFormik } from "formik";
import { addAdminUserSchema } from "../ValidationSchema";

const AdminLogin = props => {
  const { showAdminPopup, setShowAdminPopup } = props;

  const [allChannels, setallChannels] = useState([]);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()



  const { values, resetForm, errors, handleChange, handleBlur, handleSubmit, touched } = useFormik({
    initialValues: {
      admin_username: '',
      admin_password: '',
    },
    validationSchema: addAdminUserSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        emPostData(em_procedur_id?.emalout_validate_admin_user, values)
          .then((res) => {
            const { data, success, message } = res;
            if (!!success) {
              setSessionData(EM_ADMIN_DETAILS, data);
              navigate(NAV_ADMIN);
              handleCloseForm();
              onClose();
              return;
            }
            toast.error(res?.message);
          });
      } catch (error) {
        console.error(error);
      }
    }
  })


  useEffect(() => {
    if (!!showAdminPopup) {
      onOpen();
      return;
    } else {
      onClose();
      setShowAdminPopup(false)
    }
  }, [showAdminPopup])

  // useEffect(() => {
  //   $("#adminLogin").validate({
  //     rules: {
  //       adminUsername: { required: true },
  //       adminPassword: { required: true },
  //     },
  //     messages: {
  //       adminUsername: EM_ERR_EXCLAMATION_MARK,
  //       adminPassword: EM_ERR_EXCLAMATION_MARK,
  //     },

  //     submitHandler: function (formData, event) {
  //       try {
  //         event.preventDefault();
  //         let serilizeFromData = $("#adminLogin").serialize();
  //         const _formData = new FormData(formData);
  //         let jsonObject = {};
  //         for (const [key, value] of _formData.entries()) {
  //           jsonObject[key] = value;
  //         }
  //         emPostData(em_procedur_id?.emalout_validate_admin_user, jsonObject)
  //           .then((res) => {
  //             const { data, success, message } = res;
  //             if (!!success) {
  //               setSessionData(EM_ADMIN_DETAILS, data);
  //               navigate(NAV_ADMIN);
  //               handleCloseForm();
  //               onClose();
  //             }
  //             // if (!!res.success) {
  //             //   setSessionData(EM_ADMIN_DETAILS, res?.data);
  //             //   if (res?.channel) {
  //             //     setSessionData(EM_CHANNEL_DETAILS, res?.channel);
  //             //   }
  //             //   return;
  //             // }
  //             // toast.error(res?.message);
  //           });
  //       } catch (error) {
  //         console.log("error :>> ", error);
  //       }
  //     },
  //   });
  // }, []);

  const handleCloseForm = () => {
    setShowAdminPopup(false);
    onClose();
  };

  return (
    <>
      <Modal onClose={() => {
        onClose();
        setShowAdminPopup(false);

      }} size={"lg"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{EM_ADMIN_LOGIN}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <div className="adminloginBody">
                <TextBox
                  type={EM_TYPE_TEXT}
                  id="adminUsernameId"
                  inputClass="inputClass padding-1 marginTop-1"
                  className="form-control "
                  name="admin_username"
                  placeholder={EM_PLACE_ADMIN}
                  values={values?.admin_username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {!!errors.admin_username && !!touched?.admin_password && <p>{errors?.admin_username}</p>}

                <TextBox
                  type={EM_TYPE_PASSWORD}
                  id="adminPasswordId"
                  inputClass="inputClass padding-1 marginTop-1"
                  className="form-control "
                  name="admin_password"
                  placeholder={EM_PLACE_PASSWORD}
                  values={values?.admin_password}
                  onChange={handleChange}
                  onBlur={handleBlur}

                />
              </div>
              <div className="add_footer em-text-right paddingTop-2">

              </div>
            </form>
          </ModalBody>
          <ModalFooter>
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
              onClick={handleSubmit}
            />
          </ModalFooter>
        </ModalContent>
      </Modal >
    </>
  );
};
export default AdminLogin;
