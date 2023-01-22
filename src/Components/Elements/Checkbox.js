import React from "react";

const CheckRadio = (props) => {
  // const { loading = false, action, title, children, data } = props; // for backu
  const { data, values } = props;

  return (
    <>
      {data.map((items) => {
        // return
        return (
          <label
          className={props?.className}
          key={items.id}
          >
            <input
              type={props?.type}
              value={items.value}
              id={items.id}
              key={items.id}
              name={props?.name + []}
              checked={props?.checked}
              onChange={props?.onChange}
              readOnly = {props?.readOnly}
            />
            {items.name}
          </label>
        );
      })}
    </>
  );
};

export default CheckRadio;
