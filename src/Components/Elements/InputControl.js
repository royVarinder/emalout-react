import React from "react";


const TextBox = (props) => {
    // const { loading = false, action, title, children, data } = props; // for backu
    const { loading = false, title, data } = props;


    return (
        <div className={props?.inputClass}>
            <input
                id={props?.id}
                className={props?.className}
                style={loading ? { ...props?.style, opacity: '0.8' } : props?.style}
                onClick={props?.onClick}
                type={props?.type}
                disabled={props?.disabled}
                data={data}
                placeholder={props?.placeholder}
                name={props?.name}
                multiple={props?.multiple}
                rows={props?.rows}
                defaultValue={props?.defaultValue}
                required={props?.required}
                onChange={props?.onChange}
                onBlur={props?.onBlur}
                value={props?.value}
                autoFocus
            />
        </div>
    )

}
export default TextBox;