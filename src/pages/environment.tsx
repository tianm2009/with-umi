import { Tag, Form } from 'rsuite';
import { TextItem } from "./common"
const Environment = () => {
    return <Form fluid>
        <TextItem title="Environment Variables"
            description={<div>Separate eache variable with a new line, in the format<Tag>FOO=bar</Tag></div>}>
        </TextItem>
    </Form>
}
export default Environment;