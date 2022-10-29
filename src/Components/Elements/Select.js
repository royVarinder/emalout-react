import React from "react";

const Select = (props) => {
  // const { loading = false, action, title, children, data } = props; // for backu
  const { data, values } = props;

  return (
    <div className={props?.inputClass}>
    <select
      id={props?.id}
      className={props?.className}
      onChange={props?.onChange}
      data={data}
      multiple = {props.multiple}
      name ={props?.name}
      defaultValue ={props?.defaultValue}
    >
      {data.map((items, index) => {
        return <option key={index} value={items?.cat_id} >{items?.em_category_name}</option>;
      })}
    </select>
    </div>
  );
};
export default Select;
