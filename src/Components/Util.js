import axios from "axios";
import React, { useState } from "react";
import { EM_NODE_API_URL, processIdURL } from "./Config/emSiteConfig";


// export const getCallData = (processId) => {
//     try {
//         let PROCESS_ID_URL = EM_NODE_API_URL+processId;
//         return axios.get(PROCESS_ID_URL);
//     } catch (error) {
//         console.log('getCallData :>> ', error);
//         return {};
//     }
// }

export const emPostData = (processId, data) => {
    try {
        let PROCESS_ID_URL = EM_NODE_API_URL;
        let url = PROCESS_ID_URL + processId
        return axios.post(url, data).then(res => res?.data);
    } catch (error) {
        console.log('emPostData :>> ', error);
        return {};
    }

}


export const setSessionData = (key, value) => {
    try {
        let jsonValue = JSON.stringify(value);
        sessionStorage.setItem(key, jsonValue);
    } catch (error) {
        console.error(error);
    }
}

export const getSessionData = (key) => {
    try {
        if (key !== "") {
            let sessionData = sessionStorage.getItem(key);
            return JSON.parse(sessionData);
        } else {
            return "";
        }
    } catch (error) {
        console.error(error);
    }

}


export const removeFromSession = (key) => {
    try {
        sessionStorage.removeItem(key);
    } catch (error) {
        console.error(error);
    }
}


// ///NODE JS API FUNCTION

export const emNodePostData = (processId, postData) => {
    try {
        let PROCESS_ID_URL = EM_NODE_API_URL + processId;
        return axios.post(PROCESS_ID_URL, postData).then(res => res?.data);
    } catch (error) {
        console.log('emPostData :>> ', error);
        return {};
    }

}

export const getCallData = (processId) => {
    try {
        let PROCESS_ID_URL = EM_NODE_API_URL + processId;
        return axios.get(PROCESS_ID_URL);
    } catch (error) {
        console.log('getCallData :>> ', error);
        return {};
    }
}

export const getDataById = (processId, id) => {
    try {
        let PROCESS_ID_URL = EM_NODE_API_URL + processId;
        return axios.get(PROCESS_ID_URL + "/" + id);
    } catch (error) {
        console.log('getCallData :>> ', error);
        return {};
    }
}

// Function to fetch keys only
export const fetchKeys = (data) => {
    const keys = [];
    if (data.length > 0) {
        // Extracting keys from the first object
        for (const key in data[0]) {
            keys.push(key);
        }
    }
    return keys;
}

export const capitalize = (str) => {
    try {
        if (typeof str !== 'string') return ''; // Check if input is a string
        return str.charAt(0).toUpperCase() + str.slice(1);
    } catch (error) {
        console.error(error);
    }
}