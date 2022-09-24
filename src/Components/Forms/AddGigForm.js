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
  EM_UPLOAD_IMAGES
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
import {
  
  EM_DEFAULT_CITY,
  EM_DEFAULT_DIST,
} from "../Config/emSiteConfig";
import CheckRadio from "../Elements/Checkbox";
import DragDropFileUpload from "../Elements/DragDropFileUpload"
import { EM_CATEGORIES, EM_FEATURES, EM_WEEKOFDAYS,  } from "../Config/Config";
import { emPostData, getCallData } from "../Util";
import { em_procedur_id } from "../Config/procedureIds";

const AddGigForm = (props) => {
  const { showAddGig, setShowGigForm } = props;
  const [imagesFiles, setImagesFiles] = useState([]);
  const formData = new FormData();
  let imagesComma = "";
  const [allCategories, setAllCategories] = useState([]);




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
        city : {required : true},
        district : {required : true},
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
        address : EM_ERR_EXCLAMATION_MARK,
        city : EM_ERR_EXCLAMATION_MARK,
        district : EM_ERR_EXCLAMATION_MARK,
        selectCategory : EM_ERR_EXCLAMATION_MARK
      },

      submitHandler: function (formData, event) {
        event.preventDefault();
        //getting features from the checkbox values checkbox values
        let features = $("input[name='selectFeature']:checked")
          .map(function () {
            return this.value;
          })
          .get()
          .join(",");
        //getting week days from the checkbox values
        let WeekDays = $("input[name='selectWeekDays']:checked")
          .map(function () {
            return this.value;
          })
          .get()
          .join(",");

        handleSubmitGig(formData, event, features, WeekDays);
      },
    });
      //CALLING CATEGORIES TO UPDATE IN DROP DOWN ============================>
      getCallData(em_procedur_id?.all_categories).then((res) => {
        setAllCategories(res?.data);
      });
  }, []);

  const onFileUpload = (e)=>{
    try {
      const updatedList = "";
    const newFile = e.target.files[0];
    if(newFile) {
      const updatedList = [...imagesFiles, newFile.name]
      setImagesFiles(updatedList)
    }
    return updatedList
    } catch (error) {
      console.log('error :>> ', error);
    }
  }
  useEffect(()=>{
    try {
      imagesComma =imagesFiles.toString()
       console.log('imagesComma :>> ', imagesComma);
      
    } catch (error) {
      console.log('error :>> ', error);
      
    }

  },[imagesFiles])

  const handleCloseForm = () => {
    setShowGigForm(false);
  };

  const handleSubmitGig = (formData, event, features, WeekDays) => {
    try {
       let name = formData.yourName.value;
    let contact = formData.yourContact.value;
    let bussinessName = formData.bussinessName.value;
    let bussinessContact = formData.bussinessContact.value;
    let selectCategory = formData.selectCategory.value;
    let address = formData.address.value;
    let city = formData.city.value;
    let district = formData.district.value;
    let imageFiles = imagesFiles.toString();
    let addGigFormData = 
      {
        name : name,
        contact : contact,
        bussinessName : bussinessName,
        bussinessContact : bussinessContact,
        selectCategory : selectCategory,
        features :features,
        WeekDays : WeekDays,
        address : address,
        city : city,
        district : district,
       };
      console.log("addGigFormData", addGigFormData, imagesFiles);
       emPostData(em_procedur_id?.uploadBuss, addGigFormData).then((res)=>{
        console.log('res :>> ', res);
       })

    } catch (error) {
      console.log('error :>> ', error);
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
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitGig();
            }}
          >
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
                  <h5>{EM_UPLOAD_IMAGES}</h5>
                </div>
                <DragDropFileUpload
                
                  className="form-select"
                  inputClass="inputClass padding-1 marginTop-1"
                  name="DropImages"
                  multiple = {true}
                  onChange = {onFileUpload}
                />
              </div>
              <div className="allInputs em-text-left marginTop-3 margin-1">
                <div className="Heading">
                  <h5>Features</h5>
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
                    disabled
                  />
                  <TextBox
                  inputClass="inputClass padding-1 marginTop-1"
                  type={EM_TYPE_TEXT}
                    id=""
                    name="district"
                    className="form-control "
                    placeholder={EM_PLACE_DIST}
                    defaultValue={EM_DEFAULT_DIST}
                    disabled
                    
                    
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
