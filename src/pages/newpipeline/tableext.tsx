import { Table, Button, SelectPicker } from "rsuite";
const { Column, HeaderCell, Cell } = Table;

const EditableCell = ({ rowData, dataKey, onChange, editorType = [], ...props }: any) => {
    const editing = rowData.status === 'EDIT';

    const editor = () => {
        const { type = "input", options = []} = editorType;
        if (type === "select") {
            return <SelectPicker data={options} style={{width: "100%" }} size="sm" defaultValue={rowData[dataKey]}
                    onSelect={selectValue => {
                        onChange && onChange(rowData.id, dataKey, selectValue);
                    }}></SelectPicker>
        }

        return <input className="rs-input" style={{ height: 30 }} defaultValue={rowData[dataKey]}
            onChange={event => {
                onChange && onChange(rowData.id, dataKey, event.target.value);
            }}
        />
    }
    return (
        <Cell {...props} className={editing ? 'table-content-editing' : ''}>
            {editing ? editor() : <span className="table-content-edit-span">{rowData[dataKey]}</span>}
        </Cell>
    );
};

const ActionCell = ({ rowData, dataKey, onClick, onRemove, ...props }: any) => {
    return (
        <Cell {...props}>
            <Button appearance="link" onClick={() => onClick(rowData.id)}>
                {rowData.status === 'EDIT' ? 'Save' : 'Edit'}
            </Button>
            <Button appearance="link" onClick={() => onRemove(rowData.id)}>
                Remove
            </Button>
        </Cell>
    );
};
export const addRow = (paramRow: any, { data, setData }: any) => {
    const param: any = [];
    data.forEach((value: any, index: number) => {
        param.push({ ...value, id: index })
    });
    paramRow.id = data.length;
    setData([...param, paramRow])
}
export const removeRow = (id: any, { data, setData }: any) => {
    const params = data.filter((item: any) => item.id != id);
    params.forEach((value: any, index: number) => {
        value.id = index;
    });
    setData([...params]);
}

export const rowValueChange = (id: any, key: any, value: any, { data, setData }: any) => {
    const nextData: any = Object.assign([], data);
    if (nextData) {
        nextData.find((item: any) => item.id === id)[key] = value;
        setData(nextData);
    }
};
export const saveRow = (id: any, { data, setData }: any) => {
    const nextData = Object.assign([], data);
    const activeItem: any = nextData.find((item: any) => item.id === id);
    if (activeItem) {
        activeItem.status = activeItem.status ? null : 'EDIT';
        setData(nextData);
    }
};
export const TableExt = ({ data, setData, columns }: any) => {
    return <Table data={data} rowHeight={50}>
        {
            columns.map(({ title, dataKey, width, flexGrow, editorType }: any) => {
                return <Column width={width} flexGrow={flexGrow}>
                    <HeaderCell>{title}</HeaderCell>
                    <EditableCell dataKey={dataKey} editorType={editorType} onChange={(id: any, key: any, value: any) => rowValueChange(id, key, value, { data, setData })} />
                </Column>
            })
        }
        <Column width={180} fixed="right">
            <HeaderCell>...</HeaderCell>
            <ActionCell style={{ padding: '6px' }} dataKey="id"
                onClick={(id: any) => saveRow(id, { data, setData })}
                onRemove={(id: any) => removeRow(id, { data, setData })} />
        </Column>
    </Table>
}