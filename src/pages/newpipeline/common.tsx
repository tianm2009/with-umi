import { Divider, Input, InputPicker, CheckPicker, Form } from "rsuite"
import React from "react";

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
