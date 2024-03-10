import { useEffect, useState } from "react";
import { EM_ADD_NEWS, EM_PLACE_AUTHOR_NAME, EM_PLACE_NEWS_DESCRIPTION, EM_PLACE_NEWS_TITLE, EM_UPDATE_NEWS } from "../Config/EmLabel";
import { EM_ADD, EM_CANCEL, EM_CLOSE_ICON, EM_SUBMIT, EM_UPDATE, TYPE_BUTTON, TYPE_SUBMIT } from "../Config/emButton";
import Button from "../Elements/Button";
import DtService from "../TransferDataService";
import { emNodePostData, emPostData, getSessionData } from "../Util";
import { toast } from "react-toastify";
import { em_procedur_id } from "../Config/procedureIds";
import TextBox from "../Elements/InputControl";
import { EM_TYPE_TEXT, EM_TYPE_TEXTAREA } from "../Config/Input";
import DragDropFileUpload from "../Elements/DragDropFileUpload";

const AddUpdateNews = (props) => {
    const { newsId } = props;
    const [newsDetails, setNewsDetails] = useState({});
    const [images, setImages] = useState([]);
    const [uploadingImages, setUploadingImages] = useState([])
    const channelDetails = getSessionData('adminChannelDetails');
    const { id } = channelDetails[0];
    const getNewsDetails = () => {
        try {
            emPostData(em_procedur_id?.em_get_channel_news_details, {
                newsId: newsId
            }).then((res) => {
                if (res?.success === 1) {
                    setNewsDetails(res?.data[0])
                    setImages(res?.data[0].images.split(","))
                } else {
                    toast.error(res?.message)
                }
            })
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        try {
            !!newsId && getNewsDetails();
        } catch (error) {
            console.error(error);
        }
    }, [])

    const handleCloseForm = () => {
        try {
            DtService.sendMessage('newsManagement', { param: false, newsId: "" }, 'popups');
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteNews = (_idx) => {
        try {
            setImages(images.filter((item, idx) => idx !== _idx))
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e) => {
        try {
            setNewsDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        } catch (error) {
            console.error(error);
        }
    }


    const handleUploadImages = (e) => {
        try {
            const images = e.target.files;
            if (images.length > 4) {
                return toast.error("Only 4 items allowed!")
            }
            setUploadingImages(images);
        } catch (error) {
            console.error(error);
        }
    }


    const handleDeleteNewsUploading = (index) => {
        try {
            setUploadingImages(Array.from(uploadingImages).filter((item, idx) => idx !== index));
        } catch (error) {
            console.error(error);
        }
    }

    const formData = new FormData();

    const handleSubmitNews = async (e) => {
        try {
            e.preventDefault();
            Array.from(uploadingImages).forEach(element => {
                formData.append("profile", element, element?.name);
            });
            const imagesResponse = await emPostData(em_procedur_id?.em_post_images_api, formData)

            if(imagesResponse?.success){
                imagesResponse?.bussImageURL.map((items)=>{
                    images.push(items);
                })
            }
            const postData = {
                ...newsDetails,
                images: !!images ? images.join(",") : '',
                channel_id: id,
                newsId: !!newsId ? newsId : ''
            }
            emPostData(em_procedur_id?.em_admin_add_update_news, postData).then((res) => {
                if (res?.success === 1) {
                    DtService.sendMessage('addUpdateNews', {}, 'newsList');
                    DtService.sendMessage('newsManagement', { param: false, newsId: "" }, 'popups');
                    return
                }
                toast.error(res?.message)

            })
        } catch (error) {
            console.error(error);
        }
    }

    return <div className="modalContainer emModal">
        <div className="modalWrapper rightPanelModal padding-2 em-border-radius">
            <div className="addUpdateNewsHeader em-flex em-horizontal-align-between em-vertical-align-middle em-border-bottom padding-1">
                <h4>{!!newsId ? EM_UPDATE_NEWS : EM_ADD_NEWS}</h4>
                <Button
                    title={EM_CLOSE_ICON}
                    id="em_close"
                    className="em-button-default marginRight-2 em-button-small"
                    onClick={() => {
                        handleCloseForm();
                    }}
                />
            </div>
            <form id="addUpdateNews" onSubmit={handleSubmitNews}>
                <div className="addUpdateNewsBody em-border-bottom paddingBottom-2">
                    <div className="createdAtDiv">
                        <h5>{newsDetails?.createdAt}</h5>
                    </div>
                    <DragDropFileUpload
                        multiple
                        onChange={handleUploadImages}
                        accept="image/png, image/gif, image/jpeg, video/mp4"
                        name="bussImages"
                    />
                    <div className="newsImages">

                        {!!images ? images.map((items, index) => {
                            const fileExtension = items?.split(".")[1];

                            return (
                                <span key={index} className="imageContainer">
                                    {fileExtension === 'mp4' ?
                                        <video controls>
                                            <source src={items} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video> : <img src={items} />}
                                    <input type="hidden" value={items} />
                                    <span className="newsImagesCloseIcon">
                                        <Button
                                            title={EM_CLOSE_ICON}
                                            id={`uploaded_em_remove_close${index}`}
                                            className="em-button-default marginRight-2 em-button-small em-button-cancel"
                                            onClick={() => {
                                                handleDeleteNews(index);
                                            }}
                                            type="button"
                                        />
                                    </span>
                                </span>
                            )
                        }) : ''}

                        {!!uploadingImages && Array.from(uploadingImages).map((items, index) => {
                            const fileExtension = items?.name.split(".")[1];
                            return (
                                <span key={index} className="imageContainer">
                                    {fileExtension === 'mp4' ?
                                        <video controls>
                                            <source src={items ? URL.createObjectURL(items) : null} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                        : <img
                                            src={items ? URL.createObjectURL(items) : null}
                                        />}
                                    <span className="newsImagesCloseIcon">
                                        <Button
                                            title={EM_CLOSE_ICON}
                                            id={`uploading_em_remove_close${index}`}
                                            className="em-button-default marginRight-2 em-button-small em-button-cancel"
                                            onClick={() => {
                                                handleDeleteNewsUploading(index);
                                            }}
                                            type="button"
                                        />
                                    </span>
                                </span>
                            );
                        })}
                    </div>
                    <div className="newsDetails">
                        {<TextBox
                            type={EM_TYPE_TEXT}
                            name="title"
                            id="newsTitleId"
                            inputClass="inputClass padding-1 marginTop-1"
                            className="form-control "
                            placeholder={EM_PLACE_NEWS_TITLE}
                            onChange={handleChange}
                            //   onBlur={handleBlur}
                            value={newsDetails?.title}
                        />}

                        {/* <TextBox
                            type={EM_TYPE_TEXTAREA}
                            id="newsDescription"
                            name="description"
                            inputClass="inputClass marginTop-1"
                            className="form-control "
                            placeholder={EM_PLACE_NEWS_DESCRIPTION}
                            rows={4}
                            onChange={handleChange}
                            // onBlur={handleBlur}
                            defaultValue={newsDetails.description}
                        /> */}
                        <textarea
                            row={10}
                            className="form-control"
                            placeholder={EM_PLACE_NEWS_DESCRIPTION}
                            onChange={handleChange}
                            value={newsDetails?.description}
                            name="description"
                        >

                        </textarea>

                        <TextBox
                            type={EM_TYPE_TEXT}
                            id="authorNameId"
                            name="author_name"
                            inputClass="inputClass marginTop-1"
                            className="form-control "
                            placeholder={EM_PLACE_AUTHOR_NAME}
                            onChange={handleChange}
                            // onBlur={handleBlur}
                            value={newsDetails?.author_name}
                        />
                    </div>
                </div>
                <div className="addUpdateNewsFooter em-text-right paddingTop-2">
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
                        title={!!newsId ? EM_UPDATE : EM_ADD}
                        id=""
                        loading={false}
                        type={TYPE_SUBMIT}
                        className="em-button-default marginRight-2"
                        onClick={() => { }}
                    />

                </div>
            </form>

        </div>
    </div>
}

export default AddUpdateNews;