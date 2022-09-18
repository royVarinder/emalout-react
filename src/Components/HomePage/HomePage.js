
import axios from "axios";
import React from "react";
import { em_procedur_id } from "../Config/procedureIds";
import { getCallData } from "../Util";

const HomePage =()=>{
    // getCallData(/getgigs)
    // axios.get(`http://localhost/testingapi/getgigs/`)
    // .then((res)=>{
    // console.log("response", res.data);
    // });
    
    getCallData(em_procedur_id.em_get_shops).then(res=>console.log(res.data))

    return (
        <>
        <p>Homepage</p>
        </>
    )
}
export default HomePage;