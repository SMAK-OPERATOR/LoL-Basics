import {Test} from '@/components/guides/test/Test';
import testData from '@/data/json/jungleTest.json';

const TestPage = () => {


    return (
        <Test theme="jungle" page={3} testData={testData} nextPage="/guides/jungle/4/"/>
    );
};

export default TestPage;