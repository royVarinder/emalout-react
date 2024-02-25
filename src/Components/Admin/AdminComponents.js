import { useEffect, useState } from "react";
import { em_procedur_id } from "../Config/procedureIds";
import { emPostData, fetchKeys } from "../Util";
import { toast } from "react-toastify";
import TableList from "../Common/TableList";
import DtService from "../TransferDataService";

const AdminComponents = (props) => {
    const { selectedMenu, channelId } = props;
    const [responseData, setResponseData] = useState([]);
    const [tableHeader, setTableHeader] = useState([]);
    const [tableRows, setTableRows] = useState([]);
    let reqData = {};
    let processId = '';



    const getNewsList = () => {
        try {
            //call news api
            emPostData(em_procedur_id?.em_get_channel_news, {
                channel_id: channelId
            }).then((res) => {
                // console.log('res :>> ', res);
                const { message, success, data } = res;
                if (!!success) {
                    let updatedData = data.map((items) => {
                        delete items?.channel_id;
                        delete items?.createdAt;
                        delete items?.status;
                        delete items?.updatedAt;
                        delete items?.images;
                        return items;
                    })
                    setResponseData(updatedData);
                } else {
                    toast.error(message)
                }
            })
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        if (selectedMenu === "news_management") {
            getNewsList();
        }
    }, [selectedMenu])

    useEffect(() => {
        //making header & row of table & pass to table 
        try {
            console.log('responseData :>> ', responseData);
            setTableHeader(fetchKeys(responseData));
        } catch (error) {
            console.error(error);
        }
    }, [responseData])


    const handleView = (rowObject)=>{
        console.log('rowObject  handleView:>> ', rowObject);
    }

    const handleEdit = (rowObject)=>{
        DtService.sendMessage('newsManagement', {param : true, data : rowObject}, 'popups')
    }

    const handleDelete = (rowObject)=>{
        console.log('rowObject handleDelete :>> ', rowObject);
    }

    return (<TableList data={responseData} onView={handleView} onEdit = {handleEdit} onDelete={handleDelete} />)

    //api management Will here
}
export default AdminComponents;