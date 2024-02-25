import { EM_DELETE, EM_EDIT, EM_VIEW } from "../Config/emButton";
import Button from "../Elements/Button";
import { capitalize } from "../Util";

const TableList = ({ data = [], onDelete, onEdit, onView }) => {
    // Function to render table headers
    const renderTableHeader = () => {
        if (data.length === 0) return null;
        return (
            <tr>
                {Object.keys(data[0]).map((key) => (
                    <th key={key}>{key === 'id' ? "Sr No." : capitalize(key.replace("_", " "))}</th>
                ))}
                <th>{"Action"}</th>
            </tr>
        );
    };

    // Function to render table rows
    const renderTableRows = () => {
        return data.map((item, _index) => {
            return <tr key={_index}>
                {Object.entries(item).map((value, index) => (
                    <td key={index}>{ value[0] === 'id' ? _index +1 : value[1]}</td>
                )
                )}
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
    };

    return (
        <table className="smooth-table">
            <thead>{renderTableHeader()}</thead>
            <tbody>{renderTableRows()}</tbody>
        </table>
    );
}
export default TableList;