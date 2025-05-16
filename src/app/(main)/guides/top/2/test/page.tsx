import {Test} from '@/components/guides/test/Test';
import testData from '@/data/json/topTest.json';

const TestPage = () => {


    return (
        <Test theme="top" page={2} testData={testData} nextPage="/guides/top/3/"/>
    );
};

export default TestPage;