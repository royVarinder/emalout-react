import { Alert, AlertDescription, AlertIcon, AlertTitle, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { EM_DELETE, EM_EDIT, EM_VIEW } from "../Config/emButton";
import Button from "../Elements/Button";
import { capitalize } from "../Util";
import moment from "moment";
import { EM_NODE_API_URL } from "../Config/emSiteConfig";

const TableList = ({ data = [], onDelete, onEdit, onView }) => {
    console.log('data :>> ', data);
    // Function to render table headers
    const renderTableHeader = () => {
        try {
            if (data.length === 0) return null;
            return (
                <tr>
                    {Object.keys(data[0]).map((key) => (
                        <th key={key}>{key === 'id' ? "Sr No." : capitalize(key.replace("_", " "))}</th>
                    ))}
                    <th>{"Action"}</th>
                </tr>
            );
        } catch (error) {
            console.error(error);
        }
    };

    // Function to render table rows
    const renderTableRows = () => {
        try {
            return data.map((item, _index) => {
                return <tr key={_index}>
                    {Object.entries(item).map((value, index) => {
                        if (value[0] === 'id') {
                            return <td key={index}>{value[0] === 'id' ? _index + 1 : value[1]}</td>
                        } else if (value[0] === 'files') {
                            // console.log('value :>> ', value);
                            const files = value[1].split("|")
                            return <td key={index}>{
                                files.map((file) => {
                                    const ext = file.split(".")[1]
                                    return <img width={"100px"} alt={ext} src={`${EM_NODE_API_URL}/${file}`} />
                                })
                            }</td>

                        }
                        else {
                            return <td key={index}>{value[1]}</td>

                        }
                    })}
                    <td>
                        <Button
                            title={EM_VIEW}
                            className="em-button-default em-button-small  marginRight-2"
                            onClick={() => onView(item)}
                        />
                        <Button
                            title={EM_EDIT}
                            className="em-button-default em-button-small  marginRight-2"
                            onClick={() => onEdit(item)}
                        />
                        <Button
                            title={EM_DELETE}
                            className="em-button-default em-button-small em-button-cancel marginRight-2"
                            onClick={() => onDelete(item)}
                        />
                    </td>
                </tr>
            });
        } catch (error) {
            console.error(error);
        }

    };

    return (
        <table className="smooth-table">
            <thead>{renderTableHeader()}</thead>
            <tbody>{renderTableRows()}</tbody>
        </table>
    );
}
export default TableList;