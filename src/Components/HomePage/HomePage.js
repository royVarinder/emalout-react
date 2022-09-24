import React, { useEffect, useState } from "react";
import { em_procedur_id } from "../Config/procedureIds";
import { getCallData } from "../Util";

const HomePage = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [allBussiness, setAllBussiness] = useState([]);

  useEffect(() => {
    try {
      //CALLING ALL CATEGORIES ======================>
      getCallData(em_procedur_id?.all_categories).then((res) => {
        setAllCategories(res?.data);
      });

      //CALLING ALL BUSSINESSES ======================>
      getCallData(em_procedur_id?.all_bussiness).then((res) => {
        setAllBussiness(res?.data);
      });
    } catch (error) {
      console.log("error :>> ", error);
    }
    // CALLING DATA ONE BY ONE BY CATEGORY =======================>
  }, []);

  useEffect(() => {
    try {
      if (allCategories !== undefined) {
        console.log("allCategories :>> ", allCategories);
        setAllCategories(allCategories);
      }
      if (allBussiness !== undefined) {
        console.log("allBussiness :>> ", allBussiness);
        setAllBussiness(allBussiness);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  }, [allCategories, allBussiness]);

  return (
    <>
      <div className="allCategoryCardsRow em-flex em-flex-wrap em-horizontal-align-center">
        {allCategories.map((items, index) => {
          let bussCategory = items?.buss_category;
          let category_id = items?.cat_id;
          return (
            <div
              key={index}
              className="categoryCard column-2 marginLeft-1 marginTopBottom-1 padding-0 em-border-radius"
            >
              <div className="categoryHeading">
                <h5>{bussCategory}</h5>
              </div>
              <div className="cateogryBody">
                {allBussiness.map((items, index) => {
                  let cat_id = items?.cat_id;
                  let buss_name = items?.buss_name;
                  if (cat_id === category_id) {
                    return index < 7 && <p key = {index}>{buss_name}</p>;
                  }
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default HomePage;
