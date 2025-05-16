import {Test} from '@/components/guides/test/Test';
import testData from '@/data/json/adcTest.json';

const TestPage = () => {


    return (
        <Test theme="adc" page={1} testData={testData} nextPage="/guides/adc/2/"/>
    );
};

export default TestPage;