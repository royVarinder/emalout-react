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
  user_name: "",
  user_contact: "",
  buss_name: "",
  buss_contact: "",
  user_email: "",
  category_id: "",
  features: [],
  weekdays: [],
  buss_address: "",
  buss_city: EM_DEFAULT_CITY,
  buss_district: EM_DEFAULT_DIST,
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


  const { values, errors, handleBlur, touched, handleChange, handleSubmit, setValues, setFieldValue , resetForm} = useFormik({
    initialValues: initialValues,
    validationSchema: AddBussFormSchema,
    onSubmit: async (shopData) => {
      try {
        // return;
        shopData.features = !!shopData.features ? shopData.features.join("|") : ""
        shopData.weekdays = !!shopData.weekdays ? shopData.weekdays.join("|") : ""
        Object.entries(shopData).forEach((data) => {
          formData.append(data[0], data[1]);
        })
        shopImages.forEach((image) => {
          formData.append('shopImages', image);
        })
        emPostData(em_procedur_id?.em_create_business, formData)
          .then((res) => {
            console.log('res :>> ', res);
            if (!!res?.success) {
              setShowGigForm(false);
              onClose();
              resetForm();
              return
            }
            toast.error(res?.message)
          })
      } catch (error) {
        console.error(error);
      }
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


  const fetchCategories = () => {
    try {
      emPostData(em_procedur_id?.em_node_buss_categories, {}).then(res => {
        console.log('res :>> ', res);
        if (res?.success) {
          if (!!res?.data) {
            const newArray = res?.data.map(item => ({
              id: item?.id,
              value: item?.category_name
            }));
            console.log('newArray :>> ', newArray);
            setAllCategories(newArray);
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    //CALLING CATEGORIES TO UPDATE IN DROP DOWN ============================>
    fetchCategories();
  }, [isOpen]);







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




  const handleChangeField = (e) => {
    try {
      const { value, name } = e.target;
      setFieldValue(name, value);
    } catch (error) {
      console.error(error);
    }
  }

  return (

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

                <FormControl isRequired isInvalid={!!errors.user_name && !!touched.user_name}>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    id="name"
                    name="user_name"
                    type="text"
                    value={values?.user_name}
                    onChange={handleChangeField}
                    onBlur={handleBlur}
                    placeholder="Enter name"
                  />
                  {!!errors.user_name && !!touched.user_name && <FormErrorMessage>{errors?.user_name}</FormErrorMessage>}
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.user_contact && !!touched.user_contact}>
                  <FormLabel htmlFor="yourContact">Contact</FormLabel>
                  <Input
                    id="yourContact"
                    name="user_contact"
                    type="text"
                    value={values?.user_contact}
                    onChange={handleChangeField}
                    onBlur={handleBlur}
                    placeholder="Enter Contact"
                  />
                  {!!errors.user_contact && !!touched.user_contact && <FormErrorMessage>{errors?.user_contact}</FormErrorMessage>}
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.buss_name && !!touched.buss_name}>
                  <FormLabel htmlFor="bussinessName">Business Name</FormLabel>
                  <Input
                    id="bussinessName"
                    name="buss_name"
                    type="text"
                    value={values?.buss_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter Business Name"
                  />
                  {!!errors.buss_name && !!touched.buss_name && <FormErrorMessage>{errors?.buss_name}</FormErrorMessage>}
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.buss_contact && !!touched.buss_contact}>
                  <FormLabel htmlFor="bussinessContact">Business Contact</FormLabel>
                  <Input
                    id="bussinessContact"
                    name="buss_contact"
                    type="text"
                    value={values?.buss_contact}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter Business Contact"
                  />
                  {!!errors.buss_contact && !!touched.buss_contact && <FormErrorMessage>{errors?.buss_contact}</FormErrorMessage>}
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.user_email && !!touched.user_email}>
                  <FormLabel htmlFor="emailAddress">Email</FormLabel>
                  <Input
                    id="emailAddress"
                    name="user_email"
                    type="text"
                    value={values?.user_email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter Email"
                  />
                  {!!errors.user_email && !!touched.user_email && <FormErrorMessage>{errors?.user_email}</FormErrorMessage>}
                </FormControl>


                <FormControl isRequired isInvalid={!!errors.category_id && !!touched.category_id}>
                  <FormLabel htmlFor="selectCategory">Select Category</FormLabel>
                  <Select
                    className="form-select"
                    inputClass="inputClass padding-1 marginTop-1"
                    data={allCategories}
                    name="category_id"
                    onChange={(e) => {
                      setFieldValue('category_id', e.target.value)
                    }}
                    onBlur={handleBlur}
                    value={values?.category_id}
                  />
                  {!!errors.category_id && !!touched.category_id && <FormErrorMessage>{errors?.category_id}</FormErrorMessage>}


                </FormControl>

                <FormControl isRequired isInvalid={!!errors.buss_images && !!touched.buss_images}>
                  <FormLabel >Business Images</FormLabel>
                  <DragDropFileUpload
                    multiple={true}
                    onChange={(e) => {
                      handleImageChange(e);
                    }}
                    accept="image/png, image/gif, image/jpeg"
                    name="buss_images"
                  />
                  {!!errors.buss_images && !!touched.buss_images && <FormErrorMessage>{errors?.buss_images}</FormErrorMessage>}
                  <div className="showImages paddingTopBottom-2 em-flex em-flex-wrap">
                    {selectedImages.map((items, index) => {
                      return (
                        <div className="uploadingImageContainer">
                          <img
                            className="padding-1"
                            width={100}
                            height={100}
                            src={items}
                          />
                          <span onClick={() => {
                            handleImageRemove(index)
                          }} className="removeButton" >X</span>
                        </div>

                      );
                    })}
                  </div>
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.features && !!touched.features}>
                  <FormLabel htmlFor="selectFeature">Select Feature</FormLabel>
                  <CheckRadio
                    data={EM_FEATURES}
                    name="features"
                    type={EM_TYPE_CHECKBOX}
                    className="emFeatures margin-1"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.features}
                  />
                  {!!errors.features && !!touched.features && <FormErrorMessage>{errors?.features}</FormErrorMessage>}
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.weekdays && !!touched.weekdays}>
                  <FormLabel htmlFor="selectWeekDays">Select WeekDays</FormLabel>
                  <CheckRadio
                    data={EM_WEEKOFDAYS}
                    name="weekdays"
                    type={EM_TYPE_CHECKBOX}
                    className="emOpeningDays margin-1"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.weekdays}
                  />
                  {!!errors.weekdays && !!touched.weekdays && <FormErrorMessage>{errors?.weekdays}</FormErrorMessage>}
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.buss_address && !!touched.buss_address}>
                  <FormLabel htmlFor="address">Address</FormLabel>
                  <Input
                    id="address"
                    name="buss_address"
                    type="text"
                    value={values?.buss_address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter Address"
                  />
                  {!!errors.buss_address && !!touched.buss_address && <FormErrorMessage>{errors?.buss_address}</FormErrorMessage>}
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.buss_city && !!touched.buss_city}>
                  <FormLabel htmlFor="city">City</FormLabel>
                  <Input
                    id="city"
                    name="buss_city"
                    type="text"
                    value={values?.buss_city}
                    onChange={handleChange}
                    readOnly
                    onBlur={handleBlur}
                    placeholder="Enter City"
                  />
                  {!!errors.buss_city && !!touched.buss_city && <FormErrorMessage>{errors?.buss_city}</FormErrorMessage>}
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.buss_district && !!touched.buss_district}>
                  <FormLabel htmlFor="district">District</FormLabel>
                  <Input
                    id="district"
                    name="buss_district"
                    type="text"
                    value={values?.buss_district}
                    readOnly
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter District"
                  />
                  {!!errors.buss_district && !!touched.buss_district && <FormErrorMessage>{errors?.buss_district}</FormErrorMessage>}
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
              // variant={"outline"}
              onClick={handleSubmit}
            > {EM_SUBMIT}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer >
    </>
  );
};
export default AddGigForm;
