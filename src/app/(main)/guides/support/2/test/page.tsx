import {Test} from '@/components/guides/test/Test';
import testData from '@/data/json/supportTest.json';

const TestPage = () => {


    return (
        <Test theme="support" page={2} testData={testData} nextPage="/guides/support/3/"/>
    );
};

export default TestPage;