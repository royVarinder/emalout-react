import { useEffect, useState } from "react";
import DtService from "../TransferDataService";
import AddUpdateNews from "../Forms/AddUpdateNews";

const Popups = ()=>{
    const [addUpdateNews,setAddUpdateNews] = useState({
        data : {},
        show : false,
    });
    useEffect(()=>{
            DtService.onMessage().subscribe((m)=>{
                console.log('m :>> ', m);
            })
    },[])

    return (
        addUpdateNews?.show && <AddUpdateNews />
    )
}
export default Popups;