import { Button, Dropdown, Panel, IconButton, Form, Tag, Stack } from 'rsuite';
import { InputItem, SelectItem, CheckPickerItem } from './common';
import { TableExt, addRow } from './tableext';
import { useState } from 'react';
import { FaLock } from "react-icons/fa6";
import CloseIcon from '@rsuite/icons/Close';

const RunJenkins = ({data, setData}: any) => {
    const [options, setOptions] = useState([
        { id: 1, label: "instance1", value: "instance1" },
        { id: 2, label: "instance2", value: "instance2" }
    ]);
    return <>
        <SelectItem title='Instance' data={options} name="instance"></SelectItem>
        <InputItem title='Job'  name="job"></InputItem>
        <Button onClick={e => addRow({name: "param", value: "value", valueType: "string"}, {data, setData})}>新增参数</Button>
        <TableExt  data={data} setData={setData} rowHeight={50} columns={[
            { title: "参数名", dataKey: "name", width: 200},
            { title: "参数名", dataKey: "value", flexGrow: 2},
            { title: "值类型", dataKey: "valueType", flexGrow: 2, editorType: {
                type: "select", options: [
                    { label: "数字", value: "number" },
                    { label: "字符", value: "string" }
                ]
            }}
        ]}>
        </TableExt>
       
    </>
}

const RunApi = ({data, setData}: any) => {
    return <>
        <InputItem title='Url'></InputItem>
        <Button onClick={e => addRow({name: "param", value: "value"}, {data: data, setData })}>新增参数</Button>
        <TableExt  data={data} setData={setData} rowHeight={50} columns={[
            { title: "参数名", dataKey: "name", width: 200},
            { title: "参数名", dataKey: "value", flexGrow: 2}
        ]}>
        </TableExt>
    </>
}

const RunBlock = () => {
    const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
        item => ({ label: item, value: item })
    );
    return <>
        <CheckPickerItem title="Approval" data={data}></CheckPickerItem>
    </>
}
const stepTypes = [
    { type: 'jenkins', name: 'Run jenkins step' },
    { type: 'api', name: 'Run api step' },
    { type: 'block', name: 'Run block step' }
]
const Steps = () => {
    const selected = { padding: '8px 10px 8px 10px', cursor: 'pointer', color: 'green' }
    const unselected = { padding: '8px 10px 8px 10px', cursor: 'pointer' }

    const [steps, setSteps]: any = useState([{ type: "jenkins", name: 'Run jenkins step' }]);
    const [selectStep, setSelectStep]: any = useState({ index: -1, step: {} });
    const [apiParams, setApiParams]: any = useState([]);
    const [paramData, setParamData]: any = useState([]);


    const addStep = (eventKey: string) => {
        setSteps([...steps, { ...stepTypes.find(step => step.type === eventKey) }])
    }
    const removeStep = (closeIndex: number) => {
        const newSteps = steps.filter((item: any, index: number) => index !== closeIndex);
        setSteps(newSteps);
        setSelectStep({ index: -1, step: {} })
    };
    const showStepPanel = () => {
        if (selectStep?.step?.type === 'jenkins') {
            return <RunJenkins data={paramData} setData={setParamData} />
        } else if (selectStep?.step?.type === 'api') {
            return <RunApi  data={apiParams} setData={setApiParams} />
        } else if (selectStep?.step?.type === 'block') {
            return <RunBlock />
        }
    }
    const showBlockIcon = (step: any) => {
        if (step.type === 'block') {
            return <IconButton style={{ marginLeft: 10 }} icon={<FaLock style={{ width: 36, height: 36, left: 0, padding: 10, position: 'absolute', top: 0 }} />}>Continue</IconButton>
        }
    }
    const showAddButton = () => {
        return <Dropdown onSelect={addStep} style={{ marginLeft: 10, display: 'inline' }} title='Add'>
            {stepTypes.map(step => <Dropdown.Item eventKey={step.type}>{step.name}</Dropdown.Item>)}
        </Dropdown>
    }
    const renderSteps = () => {
        if (steps.length > 0) {
            return steps.map((step: any, index: number) => {
                return <Stack style={{ marginBottom: 5 }}>
                    <Tag style={index === selectStep.index ? selected : unselected}
                        size='lg'
                        onClick={(e: any) => setSelectStep({ index, step })}>
                        {step.name} {index === selectStep.index ? <CloseIcon onClick={e => {removeStep(index); e.stopPropagation()}}/> : <></> }
                    </Tag>
                    {showBlockIcon(step)}
                    {index == steps.length - 1 ? showAddButton() : <></>}
                </Stack>;
            })
        } else {
            return showAddButton();
        }

    }
    return <>
        <div>
            <span style={{ fontWeight: 'bold' }}>Steps</span>
        </div>
        <div style={{ margin: '10px 0px' }}>
            {renderSteps()}
        </div>
        <Form fluid formValue={selectStep.step} onChange={formValue => {
            setSelectStep({ ...selectStep, step: formValue })
            steps[selectStep.index] = formValue;
            setSteps([...steps])
        }}>
            <Panel bordered style={{ borderColor: 'green', display: selectStep.index != -1 ? 'block' : 'none' }}>
                <InputItem title="Name" name="name" description="run step name"></InputItem>
                {showStepPanel()}
            </Panel>
        </Form>
    </>
}
export default Steps;