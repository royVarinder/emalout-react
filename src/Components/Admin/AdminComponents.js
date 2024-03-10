import { useEffect, useState } from "react";
import { em_procedur_id } from "../Config/procedureIds";
import { emPostData, fetchKeys } from "../Util";
import { toast } from "react-toastify";
import TableList from "../Common/TableList";
import DtService from "../TransferDataService";
import Button from "../Elements/Button";
import { EM_ADD, TYPE_BUTTON } from "../Config/emButton";

const AdminComponents = (props) => {
    const { selectedMenu, channelId } = props;
    const [responseData, setResponseData] = useState([]);
    let reqData = {};
    let processId = '';



    const getNewsList = () => {
        try {
            //call news api
            emPostData(em_procedur_id?.em_get_channel_news, {
                channel_id: channelId
            }).then((res) => {
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
        try {
            DtService.onMessage().subscribe((m) => {
                if (m.senderId === 'addUpdateNews' && m.target === 'newsList') {
                    getNewsList();
                }
            })
        } catch (error) {
            console.error(error);
        }

    }, [])


    useEffect(() => {
        if (selectedMenu === "news_management") {
            getNewsList();
        }
    }, [selectedMenu])


    const handleView = (rowObject) => {
        console.log('rowObject  handleView:>> ', rowObject);
    }

    const handleEdit = (rowObject) => {
        DtService.sendMessage('newsManagement', { param: true, newsId: rowObject?.id }, 'popups')
    }

    const handleDelete = (rowObject) => {
        console.log('rowObject handleDelete :>> ', rowObject);
    }


    const handleAddNewNews = () => {
        try {
            DtService.sendMessage('newsManagement', { param: true, newsId: '' }, 'popups')

        } catch (error) {
            console.error(error);
        }
    }

    return (<div className="newsManagementWrapper">
        <div className="newsManagementHeader margin-2">
            <Button
                title={EM_ADD}
                id="addNews"
                type={TYPE_BUTTON}
                className="em-button-cancel marginRight-2"
                onClick={handleAddNewNews}
            />
        </div>
        <TableList data={responseData} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
    </div>)

    //api management Will here
}
export default AdminComponents;