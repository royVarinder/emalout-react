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
// import Button from "../Elements/Button";
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
  processIdURL,
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
import { toast } from "react-toastify";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Box,
  Heading,
  FormErrorMessage,
  Textarea,
  ChakraProvider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure
} from "@chakra-ui/react";


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
  const [shopImages, setShopImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState({});
  const [sImages, setImages] = useState([]);
const { isOpen, onOpen, onClose } = useDisclosure();
  const formRef = useRef();
  const serialize = require("form-serialize");
  const imagesArrayforDb = [];
  const formData = new FormData();
  let bussImages;
  const img = new Image();
  const [sImagesFiles, setImagesFiles] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);


  const { values, errors, handleBlur, touched, handleChange, handleSubmit,setValues } = useFormik({
    initialValues: initialValues,
    validationSchema: AddBussFormSchema,
    onSubmit: async (shopData) => {
      console.log("shopData :>>",shopData);
      shopImages.forEach((image) => {
        //use to add state shopImages in formData
        formData.append('shopImages', image);
      })
      const imageUrl = await emNodePostData(em_procedur_id?.em_post_images_api, formData);
      const dataToSubmit = {
        buss_images: !!imageUrl?.bussImageURL ? imageUrl?.bussImageURL.join("~") : "",
        buss_contact: shopData?.bussinessContact || '',
        buss_name: shopData?.bussinessName || '',
        buss_city: shopData?.city || '',
        buss_district: shopData?.district || '',
        user_email: shopData?.emailAddress || '',
        features: !!shopData?.selectFeature ? shopData?.selectFeature.join("~") : "",
        weekdays: !!shopData?.selectWeekDays ? shopData?.selectWeekDays.join("~") : "",
        user_contact: shopData?.yourContact || '',
        buss_address: shopData?.address || '',
        user_name: shopData?.name || '',
        category: shopData?.selectCategory || '',
      }
      console.log('dataToSubmit :>> ', dataToSubmit);

      emNodePostData(em_procedur_id?.em_create_business, dataToSubmit)
        .then((res) => {
          if (!!res?.success) {
            setShowGigForm(false);
            return
          }
          toast.error(res?.message)
        })
    },
  });

  useEffect(() => {
    console.log('values :>> ', values);
  }, [values])

  useEffect(() => {
    console.log('errors :>> ', errors);
  }, [errors])

  useEffect(() => {
    if (showAddGig) {
      onOpen();
      // setValues({
      //   title: "",
      //   description: "",
      //   author_name: "",
      //   images: [],
      //   videos: {},
      //   channel_id: "3",
      // })
      // return;
    }
    // onClose();
    // setShowGigForm(false)
    // setValues({});
  }, [showAddGig])



  useEffect(() => {
    //CALLING CATEGORIES TO UPDATE IN DROP DOWN ============================>
    emPostData(em_procedur_id?.em_node_buss_categories, {}).then(res => {
      if(res?.success===1){
        if(!!res?.data){
          const newArray = res?.data.map(item => ({
            id: item?.id,
            value: item?.category_name
            }));
            console.log('newArray :>> ', newArray);
          setAllCategories(newArray);
        }
      }
    });
  }, []);






  const testSubmit = (e) => {
    try {
      // let updatedFormData = {
      //   buss_address: formData.address,
      //   bussinessContact: formData.bussinessContact,
      //   bussinessName: formData.bussinessName,
      //   buss_city: formData.city,
      //   buss_district: formData.district,
      //   emailAddress: formData.emailAddress,
      //   yourName: formData.name,
      //   selectCategory_id: formData.selectCategory,
      //   selectFeature: formData.selectFeature.toString(),
      //   selectWeekDays: formData.selectWeekDays.toString(),
      //   yourContact: formData.yourContact,
      //   bussImages: uploadedImages.toString(),
      //   images:sImagesFiles.toString(),
      // };

      // let updatedFormData = {
      //   buss_address: formData.address || '',
      //   bussinessContact: formData.bussinessContact || '',
      //   bussinessName: formData.bussinessName || '',
      //   buss_city: formData.city || '',
      //   buss_district: formData.district || '',
      //   emailAddress: formData.emailAddress || '',
      //   yourName: formData.name || '',
      //   selectCategory_id: formData.selectCategory || '',
      //   selectFeature: (formData.selectFeature || []).toString(),
      //   selectWeekDays: (formData.selectWeekDays || []).toString(),
      //   yourContact: formData.yourContact || '',
      //   bussImages: (uploadedImages || []).toString(),
      //   images: (sImagesFiles || []).toString(),
      // };


      // console.log('formData :>> ', formData);
      // console.log('updatedFormData :>> ', updatedFormData);
      // emNodePostData(
      //   em_procedur_id?.em_node_buss_manage_api,
      //   updatedFormData
      // ).then(res => {
      //   console.log("res :>> ", res);
      //   if(res?.success){
      //     handleCloseForm();
      //   }
      // });
    } catch (error) {
      console.error(error);
    }
    // setNowUploadImages(false);
  }


  const handleCloseForm = () => {
    setShowGigForm(false);
  };


  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setShopImages([...shopImages, ...files])
    const imagePromises = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then(images => {
      setSelectedImages(prevImages => [...prevImages, ...images]);
    });
  };

  const handleImageRemove = (index) => {
    setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));
    setShopImages(prevImages => prevImages.filter((_, i) => i !== index));
  };


  const handleSetImages = e => {
    try {
      let images = e.target.files;
      setImagesFiles(e.target.files);
      console.log("images 1:>>", images)
      if (images.length > 5) {
      } else {
        Array.from(images).map((items, index) => {
          imagesArrayforDb.push(items.name);
        });
        // setShopimages(images);
        const files = Array.from(images);
        files.forEach(element => {

          const url = URL.createObjectURL(element);
          console.log('url :>> ', url);
          console.log('formData :>> ', formData);
          // formData.append("profile", element, element?.name);
        });
        // setImages((prev) => [...prev, url]);
        // emNodePostData(em_procedur_id?.em_post_images_api, formData).then(
        //   res => {
        //     if (res?.success) {
        //           setUploadedImages(res?.bussImageURL);
        //     } else {
        //       setUploadedImages({});
        //     }
        //   }
        // );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
   
    // <>
    //   <div className="emModal">
    //     <div className="AddGigFormModal padding-2 em-border-radius">
    //       <div className="add_header em-flex em-horizontal-align-between em-vertical-align-middle em-border-bottom padding-1">
    //         <h4>{EM_ADD_YOUR_GIG}</h4>
    //         <Button
    //           title={EM_CLOSE_ICON}
    //           id="em_add_bussiness_modal"
    //           className="em-button-default marginRight-2 em-button-small"
    //           onClick={() => {
    //             handleCloseForm();
    //           }}
    //         />
    //       </div>
    //       <form id="addGigForm" onSubmit={handleSubmit}>
    //         <div className="add_body em-border-bottom paddingBottom-2">
    //           <div className="addDetailsSection">
    //             <div className="allInputs paddingTop-2 em-flex ">
    //               <div className="inputClass padding-1 marginTop-1">
    //                 {/* <TextBox
    //                   type={EM_TYPE_TEXT}

    //                   className="form-control"
    //                   name="name"
    //                   placeholder={EM_PLACE_YOURNAME}
    //                   onChange={handleChange}
    //                   onBlur={handleBlur}
    //                   value={values?.name}
    //                 /> */}
    //                 {errors?.name && touched.name && (
    //                   <label className="error">
    //                     <div
    //                       dangerouslySetInnerHTML={{ __html: errors.name }}
    //                     />
    //                   </label>
    //                 )}
    //               </div>
    //               <div className="inputClass padding-1 marginTop-1">
    //                 {/* <TextBox
    //                   type={EM_TYPE_NUMBER}
    //                   name="yourContact"

    //                   inputClass="inputClass padding-1 marginTop-1"
    //                   className="form-control "
    //                   placeholder={EM_PLACE_YOURCONTACT}
    //                   onChange={handleChange}
    //                   onBlur={handleBlur}
    //                   value={values?.yourContact}
    //                 /> */}
    //                 {errors?.yourContact && touched.yourContact && (
    //                   <label className="error">
    //                     <div
    //                       dangerouslySetInnerHTML={{
    //                         __html: errors.yourContact,
    //                       }}
    //                     />
    //                   </label>
    //                 )}
    //               </div>
    //             </div>
    //             <div className="allInputs em-flex em-horizontal-align-between">
    //               <div className="inputClass padding-1 marginTop-1">
    //                 {/* <TextBox
    //                   type={EM_TYPE_TEXT}
    //                   inputClass="inputClass padding-1 marginTop-1"

    //                   name="bussinessName"
    //                   className="form-control"
    //                   placeholder={EM_PLACE_BUSNAME}
    //                   onChange={handleChange}
    //                   onBlur={handleBlur}
    //                   value={values?.bussinessName}
    //                 /> */}
    //                 {errors?.bussinessName && touched.bussinessName && (
    //                   <label className="error">
    //                     <div
    //                       dangerouslySetInnerHTML={{
    //                         __html: errors.bussinessName,
    //                       }}
    //                     />
    //                   </label>
    //                 )}
    //               </div>
    //               <div className="inputClass padding-1 marginTop-1">
    //                 {/* <TextBox
    //                   type={EM_TYPE_NUMBER}
    //                   name="bussinessContact"

    //                   inputClass="inputClass padding-1 marginTop-1"
    //                   className="form-control "
    //                   placeholder={EM_PLACE_BUSCONTACT}
    //                   onChange={handleChange}
    //                   onBlur={handleBlur}
    //                   value={values?.bussinessContact}
    //                 /> */}
    //                 {errors?.bussinessContact && touched.bussinessContact && (
    //                   <label className="error">
    //                     <div
    //                       dangerouslySetInnerHTML={{
    //                         __html: errors.bussinessContact,
    //                       }}
    //                     />
    //                   </label>
    //                 )}
    //               </div>
    //             </div>
    //             <div className="allInputs ">
    //               <div className="inputClass padding-1 marginTop-1">
    //                 {/* <TextBox
    //                   type={EM_TYPE_EMAIL}

    //                   inputClass="inputClass padding-1 marginTop-1"
    //                   name="emailAddress"
    //                   className="form-control "
    //                   placeholder={EM_PLACE_EMAILADDRESS}
    //                   onChange={handleChange}
    //                   onBlur={handleBlur}
    //                   value={values?.emailAddress}
    //                 /> */}
    //                 {errors?.emailAddress && touched.emailAddress && (
    //                   <label className="error">
    //                     <div
    //                       dangerouslySetInnerHTML={{
    //                         __html: errors.emailAddress,
    //                       }}
    //                     />
    //                   </label>
    //                 )}
    //               </div>
    //             </div>

    //             <div className="allInputs em-text-left marginTop-3 margin-1">
    //               <div className="Heading">
    //                 <h5>{EM_SELECT_CATEGORY}</h5>
    //               </div>
    //               <div className="inputClass padding-1 marginTop-1">
    //                 {/* <Select
    //                   className="form-select"
    //                   inputClass="inputClass padding-1 marginTop-1"
    //                   data={allCategories}
    //                   name="selectCategory"
    //                   onChange={handleChange}
    //                   onBlur={handleBlur}
    //                   value={values?.selectCategory}
    //                 /> */}
    //                 {errors?.selectCategory && touched.selectCategory && (
    //                   <label className="error">
    //                     <div
    //                       dangerouslySetInnerHTML={{
    //                         __html: errors.selectCategory,
    //                       }}
    //                     />
    //                   </label>
    //                 )}
    //               </div>
    //             </div>
    //             <div className="uploadShowImages add_body marginTop-3">
    //               <div className="Heading em-text-left">
    //                 <h5>{EM_UPLOAD_IMAGES}</h5>
    //               </div>
    //               <div className="optionsValues">
    //                 {/* <DragDropFileUpload
    //                   multiple={true}
    //                   onChange={(e) => {
    //                     handleImageChange(e);
    //                   }}
    //                   accept="image/png, image/gif, image/jpeg"
    //                   name="bussImages"
    //                 /> */}
    //               </div>
    //               <div className="showImages paddingTopBottom-2 em-flex em-flex-wrap">
    //                 {selectedImages.map((items, index) => {
    //                   return (
    //                     <div className="uploadingImageContainer">
    //                       <img
    //                         className="padding-1"
    //                         // width={100}
    //                         height={100}
    //                         src={items}
    //                       />
    //                       <span onClick={() => {
    //                         handleImageRemove(index)
    //                       }} className="removeButton" >X</span>
    //                     </div>

    //                   );
    //                 })}
    //               </div>
    //             </div>
    //             <div className="allInputs em-text-left marginTop-3 margin-1">
    //               <div className="Heading">
    //                 <h5>{"Features"}</h5>
    //               </div>
    //               <div className="optionsValues">
    //                 {/* <CheckRadio
    //                   data={EM_FEATURES}
    //                   name="selectFeature"
    //                   type={EM_TYPE_CHECKBOX}
    //                   className="emFeatures margin-1"
    //                   onChange={handleChange}
    //                   onBlur={handleBlur}
    //                   value={values?.selectFeature}
    //                 /> */}
    //                 {errors?.selectFeature && touched.selectFeature && (
    //                   <label className="error">
    //                     <div
    //                       dangerouslySetInnerHTML={{
    //                         __html: errors.selectFeature,
    //                       }}
    //                     />
    //                   </label>
    //                 )}
    //               </div>
    //             </div>

    //             <div className="allInputs em-text-left marginTop-3 margin-1">
    //               <div className="Heading">
    //                 <h5>{EM_OPENING_DAYS}</h5>
    //               </div>
    //               <div className="optionsValues">
    //                 {/* <CheckRadio
    //                   data={EM_WEEKOFDAYS}
    //                   name="selectWeekDays"
    //                   type={EM_TYPE_CHECKBOX}
    //                   className="emOpeningDays margin-1"
    //                   onChange={handleChange}
    //                   onBlur={handleBlur}
    //                   value={values?.selectWeekDays}
    //                 /> */}
    //                 {errors?.selectWeekDays && touched.selectWeekDays && (
    //                   <label className="error">
    //                     <div
    //                       dangerouslySetInnerHTML={{
    //                         __html: errors.selectWeekDays,
    //                       }}
    //                     />
    //                   </label>
    //                 )}
    //               </div>
    //             </div>

    //             <div className="allInputs margin-1 em-text-left marginTop-3 ">
    //               <div className="Heading">
    //                 <h5>{EM_LOCATION}</h5>
    //               </div>
    //               <div className="inputClass padding-1 marginTop-1">
    //                 {/* <TextBox
    //                   type={EM_TYPE_TEXTAREA}

    //                   name="address"
    //                   inputClass="inputClass marginTop-1"
    //                   className="form-control "
    //                   placeholder={EM_PLACE_ADDRESS}
    //                   rows={6}
    //                   onChange={handleChange}
    //                   onBlur={handleBlur}
    //                   value={values?.address}
    //                 /> */}
    //                 {errors?.address && touched.address && (
    //                   <label className="error">
    //                     <div
    //                       dangerouslySetInnerHTML={{ __html: errors.address }}
    //                     />
    //                   </label>
    //                 )}
    //               </div>
    //             </div>
    //             <div className="allInputs ">
    //               <div className="em-flex">
    //                 <div className="inputClass padding-1 marginTop-1">
    //                   {/* <TextBox
    //                     type={EM_TYPE_TEXT}

    //                     inputClass="inputClass padding-1 marginTop-1"
    //                     name="city"
    //                     className="form-control "
    //                     placeholder={EM_PLACE_CITY}
    //                     onChange={handleChange}
    //                     onBlur={handleBlur}
    //                     defaultValue={EM_DEFAULT_CITY}
    //                     value={values?.city}
    //                   /> */}
    //                   {errors?.city && touched.city && (
    //                     <label className="error">
    //                       <div
    //                         dangerouslySetInnerHTML={{ __html: errors.city }}
    //                       />
    //                     </label>
    //                   )}
    //                 </div>
    //                 <div className="inputClass padding-1 marginTop-1">
    //                   {/* <TextBox
    //                     inputClass="inputClass padding-1 marginTop-1"

    //                     type={EM_TYPE_TEXT}
    //                     name="district"
    //                     className="form-control "
    //                     placeholder={EM_PLACE_DIST}
    //                     onChange={handleChange}
    //                     onBlur={handleBlur}
    //                     defaultValue={EM_DEFAULT_DIST}
    //                     value={values?.district}
    //                   /> */}
    //                   {errors?.district && touched.district && (
    //                     <label className="error">
    //                       <div
    //                         dangerouslySetInnerHTML={{
    //                           __html: errors.district,
    //                         }}
    //                       />
    //                     </label>
    //                   )}
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="add_footer em-text-right paddingTop-2">
    //           {/* <Button
    //             title={EM_CANCEL}

    //             type={TYPE_BUTTON}
    //             className="em-button-cancel marginRight-2"
    //             onClick={() => {
    //               handleCloseForm();
    //             }}
    //           />
    //           <Button
    //             title={EM_SUBMIT}

    //             type={TYPE_SUBMIT}
    //             className="em-button-default marginRight-2"
    //             onClick={() => { }}
    //           /> */}
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </>
    <>
    <Drawer
      isOpen={isOpen}
      placement='right'
      size={"lg"}
      onClose={() => {
        onClose();
        setShowGigForm(false)

      }}
    >
       <DrawerOverlay />
       <DrawerContent>
        <DrawerCloseButton />
         <DrawerHeader>
          Add Gig Form
        </DrawerHeader>
        <DrawerBody>
          <form>
            <VStack spacing={4}>

               <FormControl isRequired isInvalid={!!errors.name && !!touched.name}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={values?.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter name"
                />
                {!!errors.name && !!touched.name && <FormErrorMessage>{errors?.name}</FormErrorMessage>}
              </FormControl>
              
                <FormControl isRequired isInvalid={!!errors.yourContact && !!touched.yourContact}>
                <FormLabel htmlFor="yourContact">Contact</FormLabel>
                <Input
                  id="yourContact"
                  name="yourContact"
                  type="text"
                  value={values?.yourContact}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Contact"
                />
                {!!errors.yourContact && !!touched.yourContact && <FormErrorMessage>{errors?.yourContact}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.bussinessName && !!touched.bussinessName}>
                <FormLabel htmlFor="bussinessName">Business Name</FormLabel>
                <Input
                  id="bussinessName"
                  name="bussinessName"
                  type="text"
                  value={values?.bussinessName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Business Name"
                />
                {!!errors.bussinessName && !!touched.bussinessName && <FormErrorMessage>{errors?.bussinessName}</FormErrorMessage>}
              </FormControl>

               <FormControl isRequired isInvalid={!!errors.bussinessContact && !!touched.bussinessContact}>
                <FormLabel htmlFor="bussinessContact">Business Contact</FormLabel>
                <Input
                  id="bussinessContact"
                  name="bussinessContact"
                  type="text"
                  value={values?.bussinessContact}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Business Contact"
                />
                {!!errors.bussinessContact && !!touched.bussinessContact && <FormErrorMessage>{errors?.bussinessContact}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.emailAddress && !!touched.emailAddress}>
                <FormLabel htmlFor="emailAddress">Email</FormLabel>
                <Input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  value={values?.emailAddress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Email"
                />
                {!!errors.emailAddress && !!touched.emailAddress && <FormErrorMessage>{errors?.emailAddress}</FormErrorMessage>}
              </FormControl>


              <FormControl isRequired isInvalid={!!errors.selectCategory && !!touched.selectCategory}>
                <FormLabel htmlFor="selectCategory">Select Category</FormLabel>
               
                     <Select
                      className="form-select"
                      inputClass="inputClass padding-1 marginTop-1"
                      data={allCategories}
                      name="selectCategory"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.selectCategory}
                    />
                {!!errors.selectCategory && !!touched.selectCategory && <FormErrorMessage>{errors?.selectCategory}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.bussImages && !!touched.bussImages}>
                <FormLabel htmlFor="bussImages">Business Images</FormLabel>
                    <DragDropFileUpload
                      multiple={true}
                      onChange={(e) => {
                        handleImageChange(e);
                      }}
                      accept="image/png, image/gif, image/jpeg"
                      name="bussImages"
                    />
                {!!errors.bussImages && !!touched.bussImages && <FormErrorMessage>{errors?.bussImages}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.selectFeature && !!touched.selectFeature}>
                <FormLabel htmlFor="selectFeature">Select Feature</FormLabel>
                   <CheckRadio
                      data={EM_FEATURES}
                      name="selectFeature"
                      type={EM_TYPE_CHECKBOX}
                      className="emFeatures margin-1"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.selectFeature}
                    />
                {!!errors.selectFeature && !!touched.selectFeature && <FormErrorMessage>{errors?.selectFeature}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.selectWeekDays && !!touched.selectWeekDays}>
                <FormLabel htmlFor="selectWeekDays">Select WeekDays</FormLabel>
                    <CheckRadio
                      data={EM_WEEKOFDAYS}
                      name="selectWeekDays"
                      type={EM_TYPE_CHECKBOX}
                      className="emOpeningDays margin-1"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.selectWeekDays}
                    />
                {!!errors.selectWeekDays && !!touched.selectWeekDays && <FormErrorMessage>{errors?.selectWeekDays}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.address && !!touched.address}>
                <FormLabel htmlFor="address">Address</FormLabel>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  value={values?.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Address"
                />
                {!!errors.address && !!touched.address && <FormErrorMessage>{errors?.address}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.city && !!touched.city}>
                <FormLabel htmlFor="city">City</FormLabel>
                <Input
                  id="city"
                  name="city"
                  type="text"
                  value={values?.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter City"
                />
                {!!errors.city && !!touched.city && <FormErrorMessage>{errors?.city}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.district && !!touched.district}>
                <FormLabel htmlFor="district">District</FormLabel>
                <Input
                  id="district"
                  name="district"
                  type="text"
                  value={values?.district}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter District"
                />
                {!!errors.district && !!touched.district && <FormErrorMessage>{errors?.district}</FormErrorMessage>}
              </FormControl>

            </VStack>
          </form>
        </DrawerBody>


        <DrawerFooter gap={2}>
         <Button
                type="button"
                colorScheme="teal"
                variant={"outline"}
                onClick={() => {
                  handleCloseForm();
                }}
              > {EM_CANCEL}
          </Button>
              <Button
                  type="button"
                colorScheme="teal"
                variant={"outline"}
                onClick={handleSubmit}
              > {EM_SUBMIT}
          </Button>
        </DrawerFooter>
       </DrawerContent>
    </Drawer>
    </>
  );
};
export default AddGigForm;
