import { Divider, Input, InputPicker, CheckPicker, Form, Table, Button } from "rsuite"
import React from "react";
const { Cell } = Table;
const Textarea = React.forwardRef((props: any, ref: any) => <Input {...props} as="textarea" ref={ref} />);

const titleRender = ({ title, required }: any) => {
    return <>
        <span style={{ fontWeight: 'bold' }}>{title}</span>
        <span>{required ? " - Required" : ""}</span>
    </>;
}
export const TextItem = ({ title, name, required = false, description, dividered = true }: any) => {
    return <>
        <Form.Group style={{ margin: 0 }} controlId={name}>
            <Form.ControlLabel>{titleRender({ title, required })}</Form.ControlLabel>
            <Form.Control rows={5} name={name} accepter={Textarea} />
            <Form.HelpText>{description}</Form.HelpText>
        </Form.Group>
        {dividered ? <Divider style={{ margin: '10px 0px' }} /> : <div></div>}

    </>
}
export const InputItem = ({ title, name, required = false, description, dividered = true, placeholder = "", onChange }: any) => {
    return <>
        <Form.Group style={{ margin: 0 }} controlId={name}>
            <Form.ControlLabel>{titleRender({ title, required })}</Form.ControlLabel>
            <Form.Control name={name} placeholder={placeholder} />
            <Form.HelpText>{description}</Form.HelpText>
        </Form.Group>
        {dividered ? <Divider style={{ margin: '10px 0px' }} /> : <div></div>}
    </>
}
export const SelectItem = ({ title, name, data = [], required = false, description, dividered = true, placeholder = "" }: any) => {
    return <>
        <Form.Group style={{ margin: 0 }} controlId={name}>
            <Form.ControlLabel>{titleRender({ title, required })}</Form.ControlLabel>
            <Form.Control name={name} data={data} placeholder={placeholder} accepter={InputPicker} />
            <Form.HelpText>{description}</Form.HelpText>
        </Form.Group>
        {dividered ? <Divider style={{ margin: '10px 0px' }} /> : <div></div>}
    </>
}
export const CheckPickerItem = ({ title, name, data = [], required = false, description, dividered = true, placeholder = "" }: any) => {
    return <>
        <Form.Group style={{ margin: 0 }} controlId={name}>
            <Form.ControlLabel>{titleRender({ title, required })}</Form.ControlLabel>
            <Form.Control name={name} data={data} placeholder={placeholder} accepter={CheckPicker} />
            <Form.HelpText>{description}</Form.HelpText>
        </Form.Group>
        {dividered ? <Divider style={{ margin: '10px 0px' }} /> : <div></div>}
    </>
}


export const EditableCell = ({ rowData, dataKey, onChange, ...props }: any) => {
    const editing = rowData.status === 'EDIT';
    return (
        <Cell {...props} className={editing ? 'table-content-editing' : ''}>
            {editing ? (
                <input className="rs-input" style={{ height: 30 }} defaultValue={rowData[dataKey]}
                    onChange={event => {
                        onChange && onChange(rowData.id, dataKey, event.target.value);
                    }}
                />
            ) : (
                <span className="table-content-edit-span">{rowData[dataKey]}</span>
            )}
        </Cell>
    );
};

export const ActionCell = ({ rowData, dataKey, onClick, onRemove, ...props }: any) => {
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
export const addRow = (paramRow: any, {data, setData}: any) => {
    const param: any = [];
    data.forEach((value: any, index: number) => {
        param.push({...value, id: index})
    });
    paramRow.id = data.length;
    setData([...param, paramRow])
}
export const removeRow = (id: any, {data, setData}: any) => {
    const params = data.filter((item: any) => item.id != id);
    params.forEach((value: any, index: number) => {
        value.id = index;
    });
    setData([...params]);
}

export const rowValueChange = (id: any, key: any, value: any, {data, setData}: any) => {
    const nextData: any = Object.assign([], data);
    if (nextData) {
        nextData.find((item: any) => item.id === id)[key] = value;
        setData(nextData);
    }
};
export const saveRow = (id: any, {data, setData}: any) => {
    const nextData = Object.assign([], data);
    const activeItem: any = nextData.find((item: any) => item.id === id);
    if (activeItem) {
        activeItem.status = activeItem.status ? null : 'EDIT';
        setData(nextData);
    }
};
