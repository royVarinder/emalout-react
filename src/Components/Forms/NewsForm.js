import React, { useEffect, useState } from "react";
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
  useDisclosure,
  Img

  // ContextProvider 
} from "@chakra-ui/react";
import { Formik, Field, Form, useFormik } from "formik";
import * as Yup from "yup";
import { newsFormValidation } from "../ValidationSchema";
import { em_procedur_id } from "../Config/procedureIds";
import { emNodePostData } from "../Util";
import { toast } from "react-toastify";

const News = ({ activePop, setActive, newsId }) => {
  console.log('newsData :>> ', newsId);
  const [showFiles, setShowFiles] = useState({
    images: [],
    videos: []
  });
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { values, errors, handleChange, handleBlur, resetForm, setValues, touched, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      author_name: "",
      channel_id: "2"
    },
    validationSchema: newsFormValidation, //no validation created yet.
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        //map this object with key & values
        Array.from(values?.images)
          .forEach(image => {
            formData.append("files", image)
          });
        formData.append("files", values.videos)
        delete values.images; delete values.videos
        const formDataArray = Object.entries(values);
        formDataArray.forEach((items) => {
          //add all items to form data using append
          formData.append(items[0], items[1]);
        })
        //call api to save data in database
        const response = await emNodePostData(em_procedur_id?.add_news, formData)
        const { success } = response;
        if (!!success) {
          onClose();
          resetForm();
          toast.success("News posted successfully")
          return;

        }
        alert("Failed to add news")
      } catch (error) {
        console.error(error);
        alert("Failed to add news")

      }

    }
  })


  useEffect(() => {
    console.log('showFiles :>> ', showFiles);
  }, [showFiles])




  useEffect(() => {

    if (activePop) {
      onOpen();
      setValues({
        title: "",
        description: "",
        author_name: "",
        images: [],
        videos: {},
        channel_id: "3",
      })
      return;
    }
    onClose();
    setActive(false)
    setValues({});
  }, [activePop])



  const handleShowVideo = (e) => {
    try {
      const files = Array.from(e.target.files);
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

      Promise.all(imagePromises).then(videos => {
        setShowFiles(prevVideo => ({ ...prevVideo, videos: [...prevVideo.videos, ...videos] }));
      });
    } catch (error) {
      console.error(error);
    }
  }

  const handleShowImages = (e) => {
    try {
      const files = Array.from(e.target.files);
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
        setShowFiles(prevImages => ({ ...prevImages, images: [...prevImages.images, ...images] }));
      });
    } catch (error) {
      console.error(error);
    }
  }

  const handleRemoveFile = (file, type) => {
    try {
      if (type === 'video') {
        setShowFiles(prevVideo => ({
          ...prevVideo, videos: prevVideo.videos.filter(video => video !== file)
        }));
        setFieldValue('videos', {})
        return
      }
      if (type === 'image') {
        setShowFiles(prevImages => ({
          ...prevImages, images: prevImages.images.filter(image =>
            image !== file
          )
        }));
        setFieldValue('images', [])

      }
    } catch (error) {
      console.error(error);
    }
  }


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
                <Textarea
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
                  placeholder="Enter Author name"
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
                    setFieldValue("images", event.target.files);
                    handleShowImages(event);
                  }}
                  values={values?.images}
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
                    handleShowVideo(event);
                    setFieldValue("videos", event.target.files[0]);
                  }}
                  values={values?.videos}
                />
                {!!errors.videos && !!touched.videos && <FormErrorMessage>{errors.videos}</FormErrorMessage>}
                <Box pos="relative">
                  {showFiles.videos?.map((video, index) => {
                    return (
                      <>
                        <video className="margin-1" controls>
                          <source src={video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        <Box
                          pos={'absolute'}
                          right={"-5px"}
                          top={"0"}
                          p={"10px"}
                          bg={"#ffffff"}
                          cursor={'pointer'}
                          onClick={() => { handleRemoveFile(video, 'video') }}
                        >X</Box>
                      </>

                    )
                  })}

                </Box>
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
            variant={"outline"}
            // isLoading
            // width="full"
            onClick={() => setActive(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            colorScheme="teal"
            // isLoading
            // width="full"
            onClick={handleSubmit}
          >
            {!!newsId ? "Update News" : "Post News"}
          </Button>
        </DrawerFooter>
      </DrawerContent>

      {/* </ContextProvider> */}
    </Drawer>
  );
};

export default News;
