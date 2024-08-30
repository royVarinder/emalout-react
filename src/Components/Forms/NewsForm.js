import React, { useEffect } from "react";
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

  // ContextProvider 
} from "@chakra-ui/react";
import { Formik, Field, Form, useFormik } from "formik";
import * as Yup from "yup";
import { newsFormValidation } from "../ValidationSchema";

const News = ({ activePop, setActive }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { values, errors, handleChange, handleBlur, resetForm, setValues, touched, setFieldValue, handleSubmit } = useFormik({
    initialValues: {},
    validationSchema: newsFormValidation , //no validation created yet.
    onSubmit: values => {
      console.log('onSubmit :>> ', values);
      //call api to save data in database
    }
  })

  useEffect(() => {
    //to check values in form
    console.log('values :>> ', values);
  }, [values])


  useEffect(() => {

    if (activePop) {
      onOpen();
      setValues({
        title: "",
        description: "",
        author_name: "",
        images: [],
        videos: {},
        channel_id: "",
      })
      return;
    }
    onClose();
    setActive(false)
    setValues({});
  }, [activePop])


  return (
    <Drawer
      isOpen={isOpen}
      placement='right'
      size={"lg"}
      onClose={() => {
        onClose();
        setActive(false)

      }}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          Add News
        </DrawerHeader>
        <DrawerBody>
          {/* <ContextProvider> */}

          <form>
            <VStack spacing={4}>
              <FormControl isRequired isInvalid={!!errors.title && !!touched.title}>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  value={values?.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter title"
                />
                {!!errors.title && !!touched.title && <FormErrorMessage>{errors?.title}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.description && !!touched?.description}>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Input
                  id="description"
                  name="description"
                  placeholder="Enter description"
                  value={values?.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {!!errors.description && !!touched?.description && <FormErrorMessage>{errors?.description}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired isInvalid={!!errors?.author_name && !!touched?.author_name}>
                <FormLabel htmlFor="author_name">Author Name</FormLabel>
                <Input
                  id="author_name"
                  name="author_name"
                  type="text"
                  placeholder="Enter author name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {!!errors?.author_name && !!touched?.author_name && <FormErrorMessage>{errors.author_name}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.images && !!touched.images}>
                <FormLabel htmlFor="images">Images</FormLabel>
                <Input
                  id="images"
                  name="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onBlur={handleBlur}
                  onChange={(event) => {
                    setFieldValue("images", event.currentTarget.files);
                  }}
                />
                {!!errors.images && !!touched.images && <FormErrorMessage>{errors.images}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.videos && !!touched.videos}>
                <FormLabel htmlFor="videos">Videos</FormLabel>
                <Input
                  id="videos"
                  name="videos"
                  type="file"
                  accept="video/*"
                  onBlur={handleBlur}
                  onChange={(event) => {

                    setFieldValue("videos", event.currentTarget.files[0]);
                  }}
                />
                {!!errors.videos && !!touched.videos && <FormErrorMessage>{errors.videos}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.tags && !!touched.tags}>
                <FormLabel htmlFor="tags">Tags</FormLabel>
                <Input
                  id="tags"
                  name="tags"
                  type="text"
                  // accept="video/*"
                  onBlur={handleBlur}
                  placeholder="Example: tag1,tag2,tag3,tag4"
                  onChange={handleChange}
                />
                {!!errors.videos && !!touched.videos && <FormErrorMessage>{errors.videos}</FormErrorMessage>}
              </FormControl>
            </VStack>
          </form>


        </DrawerBody>
        <DrawerFooter gap={2}>
          <Button
            type="button"
            colorScheme="teal"
            // isLoading
            width="full"
            onClick={() => setActive(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            colorScheme="teal"
            // isLoading
            width="full"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </DrawerFooter>
      </DrawerContent>

      {/* </ContextProvider> */}
    </Drawer>
  );
};

export default News;
