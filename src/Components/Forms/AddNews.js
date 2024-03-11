// import { EM_ADD_NEWS } from "../Config/emLabel";
import Button from "../Elements/Button";
import {
  EM_CANCEL,
  EM_CLOSE_ICON,
  EM_SUBMIT,
  TYPE_BUTTON,
  TYPE_SUBMIT,
} from "../Config/emButton";
import DragDropFileUpload from "../Elements/DragDropFileUpload";
import $ from "jquery";
import { useEffect } from "react";
import TextBox from "../Elements/InputControl";
import { EM_ADD_NEWS } from "../Config/emLabel";

const AddNews = props => {
  const { openAddNewsFrom, setOpenAddNewsFrom } = props;

  const handleCloseForm = () => {
    setOpenAddNewsFrom(false);
  };

  useEffect(() => {
    $("#manageNews").validate({
      rules: {},
      messages: {},
      submitHandler: function (formData, event) {
        let serielizeData = $("#manageNews").serialize();
        console.log('serielizeData :>> ', serielizeData, formData);
      },
    });
  }, []);
  return (
    <>
      <div className="emModal">
        <div className="AddNewsModal padding-2 em-border-radius">
          <div className="add_header em-flex em-horizontal-align-between em-vertical-align-middle em-border-bottom padding-1">
            <h4>{EM_ADD_NEWS}</h4>
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
            id="manageNews"
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <div className="addNewNewsBody">
              <DragDropFileUpload multiple name="newsImages" />
              <TextBox className="form-control" placeholder="News Title" name="newstitle" />
            </div>
            <div className="add_footer em-text-right paddingTop-2">
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
                title={EM_SUBMIT}
                id="submit"
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
export default AddNews;
