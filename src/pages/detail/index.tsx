import { Container, FlexboxGrid, Content, PanelGroup, Sidebar, Stack, Panel, Nav, Input, InputGroup, ButtonGroup, Button } from 'rsuite';
import { IoMdTime } from "react-icons/io";
import SearchIcon from '@rsuite/icons/Search';
import { useState } from 'react';
import PlusIcon from '@rsuite/icons/Plus';
import { CiSun } from "react-icons/ci";
import GearIcon from '@rsuite/icons/Gear';

const Detail = () => {
    const iconStyle = { marginRight: 5, verticalAlign: "-0.15em" };
    const buildHistory = [
        {
            id: "#10", name: "OIS-5017", createAt: "Jan 11 2024 8:28 AM", steps: [
                { title: "Checkstyle & Unit test", description: "xxxxxxxxxxxxxxxxxxx" },
                { title: "SCAN", description: "xxxxxxxxxxxxxxxxxxx" },
                { title: "Docker build & push", description: "xxxxxxxxxxxxxxxxxxx" },
                { title: "Deploy DIT", description: "xxxxxxxxxxxxxxxxxxx" }
            ]
        },
        {
            id: "#9", name: "OIS-5016", createAt: "Jan 11 2024 8:28 AM", steps: [
                { title: "Checkstyle & Unit test", description: "xxxxxxxxxxxxxxxxxxx" },
                { title: "SCAN", description: "xxxxxxxxxxxxxxxxxxx" },
                { title: "Docker build & push", description: "xxxxxxxxxxxxxxxxxxx" },
                { title: "Deploy DIT", description: "xxxxxxxxxxxxxxxxxxx" }
            ]
        },
        {
            id: "#8", name: "OIS-5014", createAt: "Jan 11 2024 8:28 AM", steps: [
                { title: "Checkstyle & Unit test", description: "xxxxxxxxxxxxxxxxxxx" },
                { title: "SCAN", description: "xxxxxxxxxxxxxxxxxxx" },
                { title: "Docker build & push", description: "xxxxxxxxxxxxxxxxxxx" },
                { title: "Deploy DIT", description: "xxxxxxxxxxxxxxxxxxx" }
            ]
        },
        {
            id: "#7", name: "OIS-5017", createAt: "Jan 11 2024 8:28 AM", steps: [
                { title: "Checkstyle & Unit test", description: "xxxxxxxxxxxxxxxxxxx" },
                { title: "SCAN", description: "xxxxxxxxxxxxxxxxxxx" },
                { title: "Docker build & push", description: "xxxxxxxxxxxxxxxxxxx" },
                { title: "Deploy DIT", description: "xxxxxxxxxxxxxxxxxxx" }
            ]
        }
    ]
    const [filterKey, setFilterKey] = useState("");
    const [selectedBuild, setSelectedBuild]: any = useState(buildHistory[0]);

    const filterBuilds = buildHistory.filter(build => build.id.indexOf(filterKey) > -1 || build.name.indexOf(filterKey) > -1);

    const onFilterChange = (value: any) => {
        setFilterKey(value);
    }

    const onSelectBuild = (buildId: string) => {
        const build = buildHistory.find(build => build.id === buildId);
        if (build) {
            setSelectedBuild(build)
        }
    }
    const showBuildDetail = () => {
        if (selectedBuild) {
            return <PanelGroup accordion defaultActiveKey={1}>
                {
                    selectedBuild.steps.map((step: any) => (
                        <Panel header={showStepTitle(step)} eventKey={1} id="panel1">
                            {step.description}
                        </Panel>
                    ))
                }
            </PanelGroup>
        }
    }
    const showStepTitle = (step: any) => {
        return  <FlexboxGrid>
                    <FlexboxGrid.Item colspan={16} style={{fontWeight: 'bold'}}>
                        {step.title}
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={4} >
                        {step.title}
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={4} >
                        {step.title}
                    </FlexboxGrid.Item>
                </FlexboxGrid>
    }
    return <>
        <Container>
            <Sidebar style={{ marginRight: 20 }}>
                <Panel bordered style={{ marginBottom: 10 }}>
                    <Nav vertical style={{ width: "100%" }}>
                        <Nav.Item> <PlusIcon style={iconStyle} />New Build </Nav.Item>
                        <Nav.Item> <GearIcon style={iconStyle} /> Pipeline Settings </Nav.Item>
                    </Nav>
                </Panel>
                <Panel header={<><CiSun style={iconStyle}/>Build History</>} bordered>
                    <InputGroup inside style={{marginBottom: 20}}>
                        <InputGroup.Addon>
                            <SearchIcon />
                        </InputGroup.Addon>
                        <Input value={filterKey} onChange={onFilterChange} placeholder='Filter Builds...' />
                    </InputGroup>
                    <Nav vertical style={{ width: "100%" }} activeKey={selectedBuild ? selectedBuild.id : ""} onSelect={onSelectBuild}>
                        {
                            filterBuilds.map(build => (
                                <Nav.Item eventKey={build.id}>
                                    <div style={{ fontSize: 13 }}><IoMdTime style={iconStyle} />{build.id} - {build.name}</div>
                                    <div style={{ fontSize: 12, color: 'lightgray' }}>{build.createAt}</div>
                                </Nav.Item>
                            ))
                        }
                    </Nav>
                </Panel>
            </Sidebar>

            <Content>
                <Panel header={<Stack justifyContent="space-between">
                                    <span>Build Detail</span>
                                    <ButtonGroup>
                                    <Button active>Rebuild</Button>
                                    </ButtonGroup>
                                </Stack>} bordered>
                    { showBuildDetail() }
                </Panel>
            </Content>

        </Container>
    </>
}
export default Detail;