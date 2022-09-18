import axios from "axios";
import React from "react";
import { processIdURL } from "./Config/emSiteConfig";


export const getCallData = (processId) => {

    let PROCESS_ID_URL = processIdURL;
    console.log('getCallData', PROCESS_ID_URL +"/"+processId);

    return axios.get(PROCESS_ID_URL +"/"+processId);
    // return responseData;
    // .then((res)=>{
    // console.log("response", res.data, PROCESS_ID_URL +"/"+processId);
    // responseData = res.data;
    // });
    // return responseData;

}