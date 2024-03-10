import React from "react";


const Button = (props) => {
    // const { loading = false, action, title, children, data } = props; // for backu
    const { loading = false, title, data } = props;

    return (
        <button
            id={props?.id}
            className={props?.className}
            style={loading ? { ...props?.style, opacity: '0.8' } : props?.style}
            onClick={props?.onClick}
            type={props?.type}
            disabled={loading}
            data={data}
        >
            {title}
        </button>
    )

}
export default Button;