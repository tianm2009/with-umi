
import { InputItem } from './common';
import { Form } from 'rsuite';
const General = () => {
    return <>
        <Form fluid>
            <InputItem title="Git Repository URL" required placeholder="git@github.com:your/repo.git" description="The Repository your agents will use to checkout your code"></InputItem>
            <InputItem title="Name" required description="The name for the pipeline"></InputItem>
            <InputItem title="Description" description="The description for the pipeline"></InputItem>
        </Form>
    </>
}
export default General;