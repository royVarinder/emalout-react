import React from "react";


const DragDropFileUpload =(props)=>{

        return (
            <div className={props?.inputClass}>
                <div className="DragAndDrop">
            <input
            id={props?.id}
            className={props?.className}
            style={props?.style}
            onClick={props?.onClick}
            type="file"
            disabled={props?.disabled}
            placeholder = {props?.placeholder}
            name = {props?.name}
            multiple = {props?.multiple}
            defaultValue= {props?.defaultValue}
            onDrop = {props?.onDrop}
            onChange ={props?.onChange}
        />
        <p>
        Drag & Drop 

        </p>
        </div>
        </div>
        )

}
export default DragDropFileUpload;