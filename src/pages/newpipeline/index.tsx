import { Container, Panel, Button, Sidebar, Content, Nav, Breadcrumb } from 'rsuite';
import GearIcon from '@rsuite/icons/Gear';
import { IoTimeOutline } from "react-icons/io5";
import { FaGitAlt } from "react-icons/fa";
import { FiGitPullRequest } from "react-icons/fi";
import { BsFiletypeYml } from "react-icons/bs";
import General from './general';
import Steps from './steps';
import Schedules from './schedules';
import Environment from './environment';

import { useState } from 'react';
const iconStyle = { marginRight: 10, verticalAlign: "-0.15em" }

export default function HomePage() {
    const [selected, setSelected] = useState("general")
    const showFormPanel = (panel: string) => {
        if (selected === panel) {
            return {disply: 'block', minHeight: 200 };
        }
        return { display: 'none'}
    }
    return <>
        <Breadcrumb>
            <Breadcrumb.Item href="/components">Deployment</Breadcrumb.Item>
            <Breadcrumb.Item active>New Pipeline</Breadcrumb.Item>
        </Breadcrumb>
        <Container>
            <Sidebar style={{ paddingRight: 10 }}>
                <Panel header={<div style={{ fontWeight: 'bold' }}>Pipeline Settings</div>} bordered>
                    <Nav appearance="subtle" vertical activeKey={selected} onSelect={key => setSelected(key)}>
                        <Nav.Item eventKey="general" icon={<GearIcon style={iconStyle} />}>General</Nav.Item>
                        <Nav.Item eventKey="steps" icon={<FiGitPullRequest style={iconStyle} />}>Steps</Nav.Item>
                        <Nav.Item eventKey="environment" icon={<BsFiletypeYml style={iconStyle} />}>Environments</Nav.Item>
                        <Nav.Item eventKey="schedules" icon={<IoTimeOutline style={iconStyle} />}>Schedules</Nav.Item>
                    </Nav>
                </Panel>
            </Sidebar>
            <Content style={{margin: 0, padding: 0}}>
                <Panel header={<div style={{ fontWeight: 'bold', fontSize: 20}}><FaGitAlt style={{ marginRight: 10, verticalAlign: "-0.15em" }} />New Pipeline</div>} bordered>
                    <div style={showFormPanel('general')}>
                        <General></General>
                    </div>
                    <div style={showFormPanel('steps')}>
                        <Steps></Steps>
                    </div>
                    <div style={showFormPanel('environment')}>
                        <Environment></Environment>
                    </div>
                    <div style={showFormPanel('schedules')}>
                        <Schedules></Schedules>
                    </div>
                </Panel>
            </Content>
        </Container>
    </>
}
