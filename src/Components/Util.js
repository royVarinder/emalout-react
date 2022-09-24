import axios from "axios";
import React, { useState } from "react";
import { processIdURL } from "./Config/emSiteConfig";


export const getCallData = (processId) => {
    try {
        let PROCESS_ID_URL = processIdURL;
        return axios.get(PROCESS_ID_URL +"/"+processId+"/");
    } catch (error) {
        console.log('getCallData :>> ', error);
        return {};
    }
  
}

export const emPostData = (processId, dataJson) => {
    try {
        let PROCESS_ID_URL = processIdURL;
        return axios.post(PROCESS_ID_URL +"/"+processId+"/", JSON.stringify(dataJson));
    } catch (error) {
        console.log('emPostData :>> ', error);
        return {};
    }
  
}


//       axios.post("api/uploadfile", formData);
