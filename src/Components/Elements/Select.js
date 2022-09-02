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
      {data.map((items) => {
        return <option key={items.id} value={items?.value} >{items?.name}</option>;
      })}
    </select>
    </div>
  );
};
export default Select;
