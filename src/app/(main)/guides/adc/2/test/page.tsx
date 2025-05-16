import {Test} from '@/components/guides/test/Test';
import testData from '@/data/json/adcTest.json';

const TestPage = () => {


    return (
        <Test theme="adc" page={2} testData={testData} nextPage="/guides/adc/3/"/>
    );
};

export default TestPage;