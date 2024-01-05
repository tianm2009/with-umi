import { Button, Dropdown, Panel, Divider, IconButton, Table, Form, Tag, Stack } from 'rsuite';
import { InputItem, SelectItem, CheckPickerItem, EditableCell, ActionCell } from './common'
import { useState } from 'react';
import { FaLock } from "react-icons/fa6";
const { Column, HeaderCell, Cell } = Table;


const RunJenkins = () => {
    const [data, setData] = useState([
        {id: 1, label: "instance1", value: "instance1"},
        {id: 2, label: "instance2", value: "instance2"}
    ]);
    const [paramData, setParamData] = useState([
        {id: 1, name: "param", value: "xxxxx"}
    ]);
    
    const handleChange = (id: any, key: any, value: any) => {  
        const nextData: any = Object.assign([], paramData);
        if (nextData) {
            nextData.find((item: any) => item.id === id)[key] = value;
            setParamData(nextData);   
        }
    };
    const handleEditState = (id: any) => {
        const nextData = Object.assign([], paramData);
        const activeItem: any = nextData.find((item: any) => item.id === id);
        if (activeItem) {
            activeItem.status = activeItem.status ? null : 'EDIT';
            setParamData(nextData);
        }
    };
    return <>
        <SelectItem title='Instance' data={data}></SelectItem>
        <InputItem title='Job'></InputItem>
        <Table data={paramData} rowHeight={50}>
            <Column width={200}>
                <HeaderCell>参数名</HeaderCell>
                <EditableCell dataKey="name" onChange={handleChange} />
            </Column>
            <Column flexGrow={2}>
                <HeaderCell>参数值</HeaderCell>
                <EditableCell dataKey="value" onChange={handleChange} />
            </Column>
            <Column width={80} fixed="right">
                <HeaderCell>...</HeaderCell>
                <ActionCell style={{ padding: '6px' }} dataKey="id" onClick={handleEditState}/>
            </Column>
        </Table>

    </>
}

const RunApi = () => {
    return <>
        <InputItem title='Url'></InputItem>
        <Table height={100} data={[{ name: "param", value: "xxxxx" }]}>
            <Column width={200}>
                <HeaderCell>参数名</HeaderCell>
                <Cell dataKey="name" />
            </Column>
            <Column flexGrow={2}>
                <HeaderCell>参数值</HeaderCell>
                <Cell dataKey="value" />
            </Column>
            <Column width={80} fixed="right">
                <HeaderCell>...</HeaderCell>
                <Cell style={{ padding: '6px' }}>
                    {rowData => (
                        <Button appearance="link" onClick={() => alert(`id:${rowData.id}`)}>
                            Edit
                        </Button>
                    )}
                </Cell>
            </Column>
        </Table>
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
    const selected = { padding: '8px 30px 8px 10px', cursor: 'pointer', color: 'green' }
    const unselected = { padding: '8px 30px 8px 10px', cursor: 'pointer' }

    const [steps, setSteps]: any = useState([{ type: "jenkins", name: 'Run jenkins step' }]);
    const [selectStep, setSelectStep]: any = useState({ index: -1, step: {} });
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
            return <RunJenkins />
        } else if (selectStep?.step?.type === 'api') {
            return <RunApi />
        } else if (selectStep?.step?.type === 'block') {
            return <RunBlock />
        }
    }
    const showBlockIcon = (step: any) => {
        if (step.type === 'block') {
            return <IconButton style={{ marginLeft: 10 }} icon={<FaLock style={{ width: 36, height: 36, left: 0, padding: 10, position: 'absolute', top: 0 }} />}>Continue</IconButton>
        }
    }
    const showAddButton = (index: any) => {
        if (index == steps.length - 1) {
            return <Dropdown onSelect={addStep} style={{ marginLeft: 10, display: 'inline' }} title='Add'>
                {stepTypes.map(step => <Dropdown.Item eventKey={step.type}>{step.name}</Dropdown.Item>)}
            </Dropdown>
        }
    }
    const renderSteps = () => {
        return steps.map((step: any, index: number) => {
            return <Stack style={{ marginBottom: 5 }}>
                <Tag style={index === selectStep.index ? selected : unselected}
                    size='lg'
                    onClose={() => removeStep(index)}
                    closable={index === selectStep.index}
                    onClick={() => setSelectStep({ index, step })}>
                    {step.name}
                </Tag>
                {showBlockIcon(step)}
                {showAddButton(index)}
            </Stack>;
        })
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