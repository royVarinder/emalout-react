import React from "react";

const Select = (props) => {
  // const { loading = false, action, title, children, data } = props; // for backu
  const { data, values } = props;
if(data !== undefined && data !== null && data !== "") {
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
      <option value={""} >{"--Select--"}</option>
      {data.map((items, index) => {
        return <option key={index} value={items?.id} >{items?.value}</option>;
      })}
    </select>
    </div>
  );
}

};
export default Select;
