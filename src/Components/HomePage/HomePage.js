import React, { useEffect, useState } from "react";
import { em_procedur_id } from "../Config/procedureIds";
import Button from "../Elements/Button";
import { getCallData, getSessionData } from "../Util";
import { useNavigate } from "react-router";
import { EM_ADMIN_DETAILS } from "../Config/Config";

const HomePage = () => {
 
  const [allCategories, setAllCategories] = useState([]);
  const [allBussiness, setAllBussiness] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    try {
      //CALLING ALL CATEGORIES ======================>
      getCallData(em_procedur_id?.all_categories).then((res) => {
        if(res?.data !== undefined && res?.data !== null){
          setAllCategories(res?.data);
        }
      });

      //CALLING ALL BUSSINESSES ======================>
      getCallData(em_procedur_id?.all_bussiness).then((res) => {
        if(res?.data !== undefined && res?.data !== null ) {
          setAllBussiness(res?.data);
        }
      });
    } catch (error) {
      console.error("error :>> ", error);
    }
    // CALLING DATA ONE BY ONE BY CATEGORY =======================>
  }, []);



  return (
    <>
      <div className="allCategoryCardsRow em-flex em-flex-wrap em-horizontal-align-center">
        {allCategories.map((catItems, catIndx) => {
          let bussCategory = catItems?.value;
          let category_id = catItems?.id;
          return (
            <div
              key={catIndx}
              className="categoryCard margin-1 marginTopBottom-2 padding-0 em-border-radius">
              <div className="categoryHeading">
                <h5>{bussCategory}</h5>
              </div>
              <div className="cateogryBody">
                {allBussiness !== undefined &&  allBussiness.map((items, index) => {
                  let cat_id = items?.category_id;
                  let buss_name = items?.buss_name;
                    if (cat_id === category_id) {
                        return  (
                          <div key = {index} className="bussList" onClick={()=>{
                            navigate(`/buss/${items?.id}`)
                          }}>
                          <p >{buss_name}</p>
                            </div>
                          )
                      }
                })}
              </div>
            </div>
          );
        })
      }
      </div>
    </>
  );
};
export default HomePage;
