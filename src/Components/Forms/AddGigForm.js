import React, { createRef, useEffect, useRef, useState } from "react";
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
} from "../Config/emLabel.js";
import Button from "../Elements/Button";
import TextBox from "../Elements/InputControl";
import {
  EM_BACK,
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
  bussImagesURL,
  EM_DEFAULT_CITY,
  EM_DEFAULT_DIST,
  EM_NODE_API_URL,
} from "../Config/emSiteConfig";
import CheckRadio from "../Elements/Checkbox";
import DragDropFileUpload from "../Elements/DragDropFileUpload";
import { EM_FEATURES, EM_WEEKOFDAYS } from "../Config/Config";
import { emNodePostData, emPostData, getCallData } from "../Util";
import { em_procedur_id } from "../Config/procedureIds";
import { useFormInputValidation } from "react-form-input-validation";
import { async } from "react-advanced-form";
import { useForm } from "react-hook-form";
import { useFormik } from "formik";
import { AddBussFormSchema } from "../ValidationSchema";
import e from "cors";
import axios from "axios";
import { EM_ERR_EXCLAMATION_MARK } from "../Config/emMessages";

const initialValues = {
  name: "",
  yourContact: "",
  bussinessName: "",
  bussinessContact: "",
  emailAddress: "",
  selectCategory: "",
  selectFeature: [],
  selectWeekDays: [],
  address: "",
  city: EM_DEFAULT_CITY,
  district: EM_DEFAULT_DIST,
};

const AddGigForm = props => {
  const { showAddGig, setShowGigForm } = props;
  const [allCategories, setAllCategories] = useState([]);
  const [Shopimages, setImages] = useState([]);
  const [serielizeData, setSerielizeData] = useState({});
  const [uploadedImages, setUploadedImages] = useState({});
  const formRef = useRef();
  const serialize = require("form-serialize");
  const imagesArrayforDb = [];
  const formData = new FormData();
  let bussImages;
  const img = new Image();

  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: AddBussFormSchema,
      onSubmit: formData => {
        try {
          let updatedFormData = {
            buss_address: formData.address,
            bussinessContact: formData.bussinessContact,
            bussinessName: formData.bussinessName,
            buss_city: formData.city,
            buss_district: formData.district,
            emailAddress: formData.emailAddress,
            yourName: formData.name,
            selectCategory_id: formData.selectCategory,
            selectFeature: formData.selectFeature.toString(),
            selectWeekDays: formData.selectWeekDays.toString(),
            yourContact: formData.yourContact,
            bussImages: uploadedImages.toString(),
          };
          emNodePostData(
            em_procedur_id?.em_node_buss_manage_api,
            updatedFormData
          ).then(res => {
            console.log("res :>> ", res);
            if(res?.success){
              handleCloseForm();
            }
          });
        } catch (error) {
          console.error(error);
        }
        // setNowUploadImages(false);
      },
    });
  useEffect(() => {
    //CALLING CATEGORIES TO UPDATE IN DROP DOWN ============================>
    getCallData(em_procedur_id?.em_node_buss_categories).then(res => {
      setAllCategories(res?.data?.message);
    });
  }, []);

  const handleCloseForm = () => {
    setShowGigForm(false);
  };

  const handleSetImages = e => {
    try {
      let images = e.target.files;
      if (images.length > 5) {
      } else {
        Array.from(images).map((items, index) => {
          imagesArrayforDb.push(items.name);
        });
        setImages(images);
        const files = Array.from(images);
        files.forEach(element => {
          formData.append("profile", element, element?.name);
        });
        emNodePostData(em_procedur_id?.em_post_images_api, formData).then(
          res => {
            if (res?.success) {
                  setUploadedImages(res?.bussImageURL);
            } else {
              setUploadedImages({});
            }
          }
        );
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
          <form id="addGigForm" onSubmit={handleSubmit}>
            <div className="add_body em-border-bottom paddingBottom-2">
              <div className="addDetailsSection">
                <div className="allInputs paddingTop-2 em-flex ">
                  <div className="inputClass padding-1 marginTop-1">
                    <TextBox
                      type={EM_TYPE_TEXT}
                      id=""
                      className="form-control"
                      name="name"
                      placeholder={EM_PLACE_YOURNAME}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.name}
                    />
                    {errors?.name && touched.name && (
                      <label className="error">
                        <div
                          dangerouslySetInnerHTML={{ __html: errors.name }}
                        />
                      </label>
                    )}
                  </div>
                  <div className="inputClass padding-1 marginTop-1">
                    <TextBox
                      type={EM_TYPE_NUMBER}
                      name="yourContact"
                      id=""
                      inputClass="inputClass padding-1 marginTop-1"
                      className="form-control "
                      placeholder={EM_PLACE_YOURCONTACT}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.yourContact}
                    />
                    {errors?.yourContact && touched.yourContact && (
                      <label className="error">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: errors.yourContact,
                          }}
                        />
                      </label>
                    )}
                  </div>
                </div>
                <div className="allInputs em-flex em-horizontal-align-between">
                  <div className="inputClass padding-1 marginTop-1">
                    <TextBox
                      type={EM_TYPE_TEXT}
                      inputClass="inputClass padding-1 marginTop-1"
                      id=""
                      name="bussinessName"
                      className="form-control"
                      placeholder={EM_PLACE_BUSNAME}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.bussinessName}
                    />
                    {errors?.bussinessName && touched.bussinessName && (
                      <label className="error">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: errors.bussinessName,
                          }}
                        />
                      </label>
                    )}
                  </div>
                  <div className="inputClass padding-1 marginTop-1">
                    <TextBox
                      type={EM_TYPE_NUMBER}
                      name="bussinessContact"
                      id=""
                      inputClass="inputClass padding-1 marginTop-1"
                      className="form-control "
                      placeholder={EM_PLACE_BUSCONTACT}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.bussinessContact}
                    />
                    {errors?.bussinessContact && touched.bussinessContact && (
                      <label className="error">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: errors.bussinessContact,
                          }}
                        />
                      </label>
                    )}
                  </div>
                </div>
                <div className="allInputs ">
                  <div className="inputClass padding-1 marginTop-1">
                    <TextBox
                      type={EM_TYPE_EMAIL}
                      id=""
                      inputClass="inputClass padding-1 marginTop-1"
                      name="emailAddress"
                      className="form-control "
                      placeholder={EM_PLACE_EMAILADDRESS}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.emailAddress}
                    />
                    {errors?.emailAddress && touched.emailAddress && (
                      <label className="error">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: errors.emailAddress,
                          }}
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="allInputs em-text-left marginTop-3 margin-1">
                  <div className="Heading">
                    <h5>{EM_SELECT_CATEGORY}</h5>
                  </div>
                  <div className="inputClass padding-1 marginTop-1">
                    <Select
                      className="form-select"
                      inputClass="inputClass padding-1 marginTop-1"
                      data={allCategories}
                      name="selectCategory"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.selectCategory}
                    />
                    {errors?.selectCategory && touched.selectCategory && (
                      <label className="error">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: errors.selectCategory,
                          }}
                        />
                      </label>
                    )}
                  </div>
                </div>
                <div className="uploadShowImages add_body marginTop-3">
                  <div className="Heading em-text-left">
                    <h5>{EM_UPLOAD_IMAGES}</h5>
                  </div>
                  <div className="optionsValues">
                    <DragDropFileUpload
                      multiple
                      onChange={e => {
                        handleSetImages(e);
                      }}
                      accept="image/png, image/gif, image/jpeg"
                      name="bussImages"
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
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.selectFeature}
                    />
                    {errors?.selectFeature && touched.selectFeature && (
                      <label className="error">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: errors.selectFeature,
                          }}
                        />
                      </label>
                    )}
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
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.selectWeekDays}
                    />
                    {errors?.selectWeekDays && touched.selectWeekDays && (
                      <label className="error">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: errors.selectWeekDays,
                          }}
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="allInputs margin-1 em-text-left marginTop-3 ">
                  <div className="Heading">
                    <h5>{EM_LOCATION}</h5>
                  </div>
                  <div className="inputClass padding-1 marginTop-1">
                    <TextBox
                      type={EM_TYPE_TEXTAREA}
                      id=""
                      name="address"
                      inputClass="inputClass marginTop-1"
                      className="form-control "
                      placeholder={EM_PLACE_ADDRESS}
                      rows={6}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.address}
                    />
                    {errors?.address && touched.address && (
                      <label className="error">
                        <div
                          dangerouslySetInnerHTML={{ __html: errors.address }}
                        />
                      </label>
                    )}
                  </div>
                </div>
                <div className="allInputs ">
                  <div className="em-flex">
                    <div className="inputClass padding-1 marginTop-1">
                      <TextBox
                        type={EM_TYPE_TEXT}
                        id=""
                        inputClass="inputClass padding-1 marginTop-1"
                        name="city"
                        className="form-control "
                        placeholder={EM_PLACE_CITY}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        defaultValue={EM_DEFAULT_CITY}
                        value={values?.city}
                      />
                      {errors?.city && touched.city && (
                        <label className="error">
                          <div
                            dangerouslySetInnerHTML={{ __html: errors.city }}
                          />
                        </label>
                      )}
                    </div>
                    <div className="inputClass padding-1 marginTop-1">
                      <TextBox
                        inputClass="inputClass padding-1 marginTop-1"
                        id=""
                        type={EM_TYPE_TEXT}
                        name="district"
                        className="form-control "
                        placeholder={EM_PLACE_DIST}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        defaultValue={EM_DEFAULT_DIST}
                        value={values?.district}
                      />
                      {errors?.district && touched.district && (
                        <label className="error">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: errors.district,
                            }}
                          />
                        </label>
                      )}
                    </div>
                  </div>
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
                onClick={() => {}}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddGigForm;
