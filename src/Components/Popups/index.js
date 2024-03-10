import { useEffect, useState } from "react";
import DtService from "../TransferDataService";
import AddUpdateNews from "../Forms/AddUpdateNews";

const Popups = ()=>{
    const [addUpdateNews,setAddUpdateNews] = useState({
        show : false,
        newsId : '',
    });
    useEffect(()=>{
            DtService.onMessage().subscribe((m)=>{
                if(m.senderId === "newsManagement" && m.target === "popups"){
                    setAddUpdateNews({
                        show : m.text.param,
                        newsId : m.text.newsId,
                    })
                }
            })
    },[])

    return (
        addUpdateNews?.show && <AddUpdateNews newsId = {addUpdateNews?.newsId} />
    )
}
export default Popups;