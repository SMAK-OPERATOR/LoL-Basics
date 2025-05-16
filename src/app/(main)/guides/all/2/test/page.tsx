import {Test} from '@/components/guides/test/Test';
import testData from '@/data/json/allTest.json';

const TestPage = () => {


    return (
        <Test theme="all" page={2} testData={testData} nextPage="/guides/all/3/"/>
    );
};

export default TestPage;