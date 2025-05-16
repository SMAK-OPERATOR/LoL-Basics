import {Test} from '@/components/guides/test/Test';
import testData from '@/data/json/jungleTest.json';

const TestPage = () => {


    return (
        <Test theme="jungle" page={1} testData={testData} nextPage="/guides/jungle/2/"/>
    );
};

export default TestPage;