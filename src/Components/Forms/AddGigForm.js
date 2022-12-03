import React, { useEffect, useState } from "react";
import {
  EM_ADD_YOUR_GIG,
  EM_LOCATION,
  EM_OPENING_DAYS,
  EM_PLACE_ADDRESS,
  EM_PLACE_BUSCONTACT,
  EM_PLACE_BUSNAME,
  EM_PLACE_CITY,
  EM_PLACE_DIST,
  EM_PLACE_EMAILADDRESS,
  EM_PLACE_YOURCONTACT,
  EM_PLACE_YOURNAME,
  EM_SELECT_CATEGORY,
  EM_UPLOAD_IMAGES,
} from "../Config/EmLabel";
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
  EM_SUBMIT,
  TYPE_BUTTON,
  TYPE_SUBMIT,
} from "../Config/emButton";
import {
  EM_TYPE_CHECKBOX,
  EM_TYPE_EMAIL,
  EM_TYPE_NUMBER,
  EM_TYPE_TEXT,
  EM_TYPE_TEXTAREA,
} from "../Config/Input";
import Select from "../Elements/Select";
import { EM_DEFAULT_CITY, EM_DEFAULT_DIST } from "../Config/emSiteConfig";
import CheckRadio from "../Elements/Checkbox";
import DragDropFileUpload from "../Elements/DragDropFileUpload";
import { EM_CATEGORIES, EM_FEATURES, EM_WEEKOFDAYS } from "../Config/Config";
import { emPostData, getCallData } from "../Util";
import { em_procedur_id } from "../Config/procedureIds";
import { toast } from "react-toastify";

const AddGigForm = props => {
  const { showAddGig, setShowGigForm } = props;
  const [allCategories, setAllCategories] = useState([]);
  const [Shopimages, setImages] = useState([]);
  const [serielizeData, setSerielizeData] = useState();

  useEffect(() => {
    console.log("images :>> ", serielizeData);
  }, [serielizeData]);

  useEffect(() => {
    $("#addGigForm").validate({
      rules: {
        yourName: { required: true },
        yourContact: { required: true },
        bussinessName: { required: true },
        bussinessContact: { required: true },
        selectCategory: { required: true },
        emailAddress: { required: true, email: true },
        address: { required: true },
        city: { required: true },
        district: { required: true },
        selectFeature: { required: true },
        selectWeekDays: { required: true },
      },
      messages: {
        yourName: EM_ERR_EXCLAMATION_MARK,
        yourContact: EM_ERR_EXCLAMATION_MARK,
        bussinessName: EM_ERR_EXCLAMATION_MARK,
        bussinessContact: EM_ERR_EXCLAMATION_MARK,
        emailAddress: {
          required: EM_ERR_EXCLAMATION_MARK,
          email: EM_ERR_VALID_EMAIL,
        },
        address: EM_ERR_EXCLAMATION_MARK,
        city: EM_ERR_EXCLAMATION_MARK,
        district: EM_ERR_EXCLAMATION_MARK,
        selectCategory: EM_ERR_EXCLAMATION_MARK,
        selectWeekDays: EM_ERR_EXCLAMATION_MARK,
        selectFeature: EM_ERR_EXCLAMATION_MARK,
      },

      submitHandler: function (formData, event) {
        try {
          event.preventDefault();
          //getting features from the checkbox values checkbox values =======================>
          let features = $("input[name='selectFeature']:checked")
            .map(function () {
              return this.value;
            })
            .get()
            .join(",");
          //getting week days from the checkbox values =====================>
          let weekdays = $("input[name='selectWeekDays']:checked")
            .map(function () {
              return this.value;
            })
            .get()
            .join(",");
          ///serializing data to update in data base=================>

          let serilizeFromData = $("#addGigForm").serialize()+"&features=" + features + "&openingDays=" + weekdays;
          setSerielizeData(serilizeFromData);

          return false;
          emPostData(em_procedur_id?.uploadBuss, serilizeFromData).then(res => {
            if (res?.status !== 200) {
              alert("Somthing went wrong");
            } else {
              alert("Your bussiness is uploaded successfully!");
            }
          });
          // handleSubmitGig(formData, event, features, WeekDays);
        } catch (error) {
          console.log("error :>> ", error);
        }
      },
    });
 
    //CALLING CATEGORIES TO UPDATE IN DROP DOWN ============================>
    getCallData(em_procedur_id?.all_categories).then(res => {
      setAllCategories(res?.data);
    });
  }, []);

  const handleCloseForm = () => {
    setShowGigForm(false);
  };

  const handleSetImages = e => {
    try {
      let images = e.target.files;
      if(images.length > 5) {
        alert("Allowed only 5 images");
      }else {
        setImages(images);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="emModal">
        <div className="AddGigFormModal padding-2 em-border-radius">
          <div className="add_header em-flex em-horizontal-align-between em-vertical-align-middle em-border-bottom padding-1">
            <h4>{EM_ADD_YOUR_GIG}</h4>
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
            id="addGigForm"
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <div className="uploadShowImages add_body">
                  <div className="optionsValues">
                    <DragDropFileUpload
                      multiple
                      onChange={e => {
                        handleSetImages(e);
                      }}
                      accept="image/png, image/gif, image/jpeg"
                    />
                  </div>
                  <div className="showImages paddingTopBottom-2 em-flex em-flex-wrap">
                    {Array.from(Shopimages).map(items => {
                      return (
                        <img
                        className="padding-1"
                          // width={100}
                          height={100}
                          src={items ? URL.createObjectURL(items) : null}
                        />
                      );
                    })}
                  </div>
                </div>
            <div className="add_body em-border-bottom paddingBottom-2">
              <div className="allInputs paddingTop-2 em-flex ">
                <TextBox
                  type={EM_TYPE_TEXT}
                  id=""
                  inputClass="inputClass padding-1 marginTop-1"
                  className="form-control "
                  name="yourName"
                  placeholder={EM_PLACE_YOURNAME}
                />
                <TextBox
                  type={EM_TYPE_NUMBER}
                  name="yourContact"
                  id=""
                  inputClass="inputClass padding-1 marginTop-1"
                  className="form-control "
                  placeholder={EM_PLACE_YOURCONTACT}
                />
              </div>
              <div className="allInputs em-flex em-horizontal-align-between">
                <TextBox
                  type={EM_TYPE_TEXT}
                  inputClass="inputClass padding-1 marginTop-1"
                  id=""
                  name="bussinessName"
                  className="form-control"
                  placeholder={EM_PLACE_BUSNAME}
                />
                <TextBox
                  type={EM_TYPE_NUMBER}
                  name="bussinessContact"
                  id=""
                  inputClass="inputClass padding-1 marginTop-1"
                  className="form-control "
                  placeholder={EM_PLACE_BUSCONTACT}
                />
              </div>
              <div className="allInputs ">
                <TextBox
                  type={EM_TYPE_EMAIL}
                  id=""
                  inputClass="inputClass padding-1 marginTop-1"
                  name="emailAddress"
                  className="form-control "
                  placeholder={EM_PLACE_EMAILADDRESS}
                />
              </div>

              <div className="allInputs em-text-left marginTop-3 margin-1">
                <div className="Heading">
                  <h5>{EM_SELECT_CATEGORY}</h5>
                </div>
                <Select
                  className="form-select"
                  inputClass="inputClass padding-1 marginTop-1"
                  data={allCategories}
                  name="selectCategory"
                />
              </div>
              <div className="allInputs em-text-left marginTop-3 margin-1">
                <div className="Heading">
                  <h5>{"Features"}</h5>
                </div>
                <div className="optionsValues">
                  <CheckRadio
                    data={EM_FEATURES}
                    name="selectFeature"
                    type={EM_TYPE_CHECKBOX}
                    className="emFeatures margin-1"
                  />
                </div>
              </div>
              <div className="allInputs em-text-left marginTop-3 margin-1">
                <div className="Heading">
                  <h5>{"Upload Images"}</h5>
                </div>
              </div>
              <div className="allInputs em-text-left marginTop-3 margin-1">
                <div className="Heading">
                  <h5>{EM_OPENING_DAYS}</h5>
                </div>
                <div className="optionsValues">
                  <CheckRadio
                    data={EM_WEEKOFDAYS}
                    name="selectWeekDays"
                    type={EM_TYPE_CHECKBOX}
                    className="emOpeningDays margin-1"
                  />
                </div>
              </div>

              <div className="allInputs margin-1 em-text-left marginTop-3 ">
                <div className="Heading">
                  <h5>{EM_LOCATION}</h5>
                </div>
                <TextBox
                  type={EM_TYPE_TEXTAREA}
                  id=""
                  name="address"
                  inputClass="inputClass marginTop-1"
                  className="form-control "
                  placeholder={EM_PLACE_ADDRESS}
                  rows={6}
                />
              </div>
              <div className="allInputs ">
                <div className="em-flex">
                  <TextBox
                    type={EM_TYPE_TEXT}
                    id=""
                    inputClass="inputClass padding-1 marginTop-1"
                    name="city"
                    className="form-control "
                    placeholder={EM_PLACE_CITY}
                    defaultValue={EM_DEFAULT_CITY}
                  />
                  <TextBox
                    inputClass="inputClass padding-1 marginTop-1"
                    id=""
                    type={EM_TYPE_TEXT}
                    name="district"
                    className="form-control "
                    placeholder={EM_PLACE_DIST}
                    defaultValue={EM_DEFAULT_DIST}
                  />
                </div>
              </div>
            </div>
            <div className="add_footer em-text-right paddingTop-2">
              <Button
                title={EM_CANCEL}
                id=""
                type={TYPE_BUTTON}
                className="em-button-cancel marginRight-2"
                onClick={() => {
                  handleCloseForm();
                }}
              />
              <Button
                title={EM_SUBMIT}
                id=""
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
export default AddGigForm;
