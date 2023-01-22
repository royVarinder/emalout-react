import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { em_procedur_id } from "../Config/procedureIds";
import DtService from "../TransferDataService";
import { getCallData, getDataById } from "../Util";
import Slider from "react-slick";
import { settings } from "../Config/Config";
import CheckRadio from "../Elements/Checkbox";
import { EM_TYPE_CHECKBOX } from "../Config/Input";

const BussPage = props => {
  const [bussId, setBussId] = useState("");
  const [searchparams] = useSearchParams();
  const [bussData, setBussData] = useState([]);
  const [bussImages, setBussImages] = useState([]);
  const [features, setFeatures] = useState([]);
  const [weekDays, setWeekDays] = useState([]);

  useEffect(() => {
    try {
      getDataById(
        em_procedur_id?.em_node_buss_manage_api,
        searchparams.get("id")
      ).then(res => {
        console.log("res :>> ", res?.data?.message[0]);
        if (res?.data?.success === 1) {
          setBussData(res?.data?.message[0]);
        } else {
          setBussData([]);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }, [searchparams]);

  useEffect(() => {
    try {
      if (
        bussData?.buss_images !== undefined &&
        bussData?.buss_images.length !== 0 &&
        bussData?.buss_images !== ""
      ) {
        setBussImages(bussData?.buss_images.split(","));
      } else {
        setBussImages([]);
      }
      if (
        bussData?.features !== undefined &&
        bussData?.features !== null &&
        bussData?.features !== ""
      ) {
        let featuresArray = bussData?.features.split(",");
        let updatedFeatureArray = featuresArray.map((items, index)=>{
            return {id : index, name : items}
        })
        setFeatures(updatedFeatureArray);
      } else {
        setFeatures([]);
      }
      if (
        bussData?.weekdays !== undefined &&
        bussData?.weekdays !== null &&
        bussData?.weekdays !== ""
      ) {
        setWeekDays(bussData?.weekdays.split(","));
      } else {
        setWeekDays([]);
      }
    } catch (error) {
      console.error(error);
    }
  }, [bussData]);

  return (
    <div className="buss-page em-flex">
      <div className="buss-images" style={{ width: "50%" }}>
        <Slider {...settings}>
          {bussImages !== undefined &&
            bussImages.length !== 0 &&
            bussImages.map(items => {
              return <img src={items} />;
            })}
        </Slider>
      </div>
      <div className="buss-details" style={{ width: "50%" }}>
        <div className="bussHeader em-flex padding-2 em-horizontal-align-between">
          <div className="heading-left em-text-left">
            <h3 className="marginBottom-2">{bussData?.buss_name}</h3>
            <p className="margin-0">{bussData?.create_time_stamp}</p>
          </div>
          <div className="heading-left em-text-right">
            <h4 className="marginBottom-2">{bussData?.user_name}</h4>
            <p className="margin-0">{bussData?.user_contact} ({})</p>
          </div>
        </div>

        <div className="bussFeatures em-flex padding-2 em-horizontal-align-between">
          <div className="heading-left em-text-left">
            <h3 className="marginBottom-2">{"Features"}</h3>
            <div className="buss-features">
              <CheckRadio className="emFeatures margin-1"
               type={EM_TYPE_CHECKBOX} 
               data={features}
               checked = {true}
               readOnly = {true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BussPage;

// { bussImages!== undefined && bussImages.length !== 0 && bussImages.map((items)=>{
//     return <img src={items} />
// })}
