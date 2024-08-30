import React from "react";
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
  ChakraProvider
  // ContextProvider 
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  author_name: Yup.string().required("Author name is required"),
  images: Yup.mixed().required("Image is required"),
  videos: Yup.mixed(),
  channel_id: Yup.number().required("Channel ID is required"),
  author_id: Yup.number().required("Author ID is required"),
  city_id: Yup.number().required("City ID is required"),
});

const News = () => {
  return (
    <ChakraProvider>
      {/* <ContextProvider> */}
        <Box p={4} maxW="lg" mx="auto" mt={10}>
      <Heading mb={6} textAlign="center">
        Form with Multiple Fields
      </Heading>
      <Formik
        initialValues={{
          title: "",
          description: "",
          author_name: "",
          images: null,
          videos: null,
          channel_id: "",
          author_id: "",
          city_id: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            console.log("Form data: ", values);
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(formik) => (
          <Form>
            <VStack spacing={4}>
              <FormControl isInvalid={formik.errors.title && formik.touched.title}>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Field
                  as={Input}
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter title"
                />
                <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={formik.errors.description && formik.touched.description}>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Field
                  as={Textarea}
                  id="description"
                  name="description"
                  placeholder="Enter description"
                />
                <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={formik.errors.author_name && formik.touched.author_name}>
                <FormLabel htmlFor="author_name">Author Name</FormLabel>
                <Field
                  as={Input}
                  id="author_name"
                  name="author_name"
                  type="text"
                  placeholder="Enter author name"
                />
                <FormErrorMessage>{formik.errors.author_name}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={formik.errors.images && formik.touched.images}>
                <FormLabel htmlFor="images">Images</FormLabel>
                <Input
                  id="images"
                  name="images"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    formik.setFieldValue("images", event.currentTarget.files[0]);
                  }}
                />
                <FormErrorMessage>{formik.errors.images}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={formik.errors.videos && formik.touched.videos}>
                <FormLabel htmlFor="videos">Videos</FormLabel>
                <Input
                  id="videos"
                  name="videos"
                  type="file"
                  accept="video/*"
                  onChange={(event) => {
                    formik.setFieldValue("videos", event.currentTarget.files[0]);
                  }}
                />
                <FormErrorMessage>{formik.errors.videos}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={formik.errors.channel_id && formik.touched.channel_id}>
                <FormLabel htmlFor="channel_id">Channel ID</FormLabel>
                <Field
                  as={Input}
                  id="channel_id"
                  name="channel_id"
                  type="number"
                  placeholder="Enter channel ID"
                />
                <FormErrorMessage>{formik.errors.channel_id}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={formik.errors.author_id && formik.touched.author_id}>
                <FormLabel htmlFor="author_id">Author ID</FormLabel>
                <Field
                  as={Input}
                  id="author_id"
                  name="author_id"
                  type="number"
                  placeholder="Enter author ID"
                />
                <FormErrorMessage>{formik.errors.author_id}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={formik.errors.city_id && formik.touched.city_id}>
                <FormLabel htmlFor="city_id">City ID</FormLabel>
                <Field
                  as={Input}
                  id="city_id"
                  name="city_id"
                  type="number"
                  placeholder="Enter city ID"
                />
                <FormErrorMessage>{formik.errors.city_id}</FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                colorScheme="teal"
                isLoading={formik.isSubmitting}
                width="full"
              >
                Submit
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
         </Box>
      {/* </ContextProvider> */}
  </ChakraProvider>
  );
};

export default News;
