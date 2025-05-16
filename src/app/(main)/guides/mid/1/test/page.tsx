import {Test} from '@/components/guides/test/Test';
import testData from '@/data/json/midTest.json';

const TestPage = () => {


    return (
        <Test theme="mid" page={1} testData={testData} nextPage="/guides/mid/2/"/>
    );
};

export default TestPage;