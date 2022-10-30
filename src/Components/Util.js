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

export const emPostData = (processId, data) => {
    try {
        let PROCESS_ID_URL = processIdURL;
        return axios.post(PROCESS_ID_URL +"/"+processId+"/", data);
    } catch (error) {
        console.log('emPostData :>> ', error);
        return {};
    }
  
}


export const setSessionData = (key, value)=> {
    try {
        let jsonValue = JSON.stringify(value);
        sessionStorage.setItem(key, jsonValue);
    } catch (error) {
        console.error(error);
    }
}

export const getSessionData =(key) =>{
    try {
        if(key!==""){
            let sessionData =  sessionStorage.getItem(key);
            return JSON.parse(sessionData);
        }else {
            return "";
        }
    } catch (error) {
        console.error(error);
    }
 
}


export const removeFromSession =(key)=>{
    try {
        sessionStorage.removeItem(key);
    } catch (error) {
        console.error(error);
    }
}
