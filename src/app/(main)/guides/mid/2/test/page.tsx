import {Test} from '@/components/guides/test/Test';
import testData from '@/data/json/midTest.json';

const TestPage = () => {


    return (
        <Test theme="mid" page={2} testData={testData} nextPage="/guides/mid/3/"/>
    );
};

export default TestPage;