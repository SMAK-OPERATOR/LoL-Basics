import {Test} from '@/components/guides/test/Test';
import testData from '@/data/json/allTest.json';

const TestPage = () => {


    return (
        <Test theme="all" page={1} testData={testData} nextPage="/guides/all/2/"/>
    );
};

export default TestPage;