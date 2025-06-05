import { Test } from '@/components/guides/test/Test';
import { supabase } from '@/lib/supabaseClient';
const VALID_THEMES = ['adc', 'support', 'jungle', 'all', 'mid', 'top'] as const;

export async function generateStaticParams() {
    return VALID_THEMES.flatMap(theme => {
        const pageCount = theme === 'jungle' ? 4 : 3;
        return Array.from({ length: pageCount }, (_, i) => ({
            theme,
            pageNumber: (i + 1).toString(),
        }));
    });
}

export default async function TestPage({
                                           params,
                                       }: {
    params: Promise<{ theme: string; pageNumber: string }>;
}) {
    const themeAw = (await params).theme;
    const pageNumber = parseInt((await params).pageNumber);
    const maxPages = themeAw === 'jungle' ? 4 : 3;

    const { data, error } = await supabase
        .from('tests')
        .select('content')
        .eq('slug', `${themeAw}`)
        .single();

    if (error) {
        console.error("Error loading test data:", error);
        throw new Error('Failed to load test data');
    }
    const testData = data.content;
    const isLastPage = pageNumber === maxPages;
    const nextPage = isLastPage
        ? `/guides/${themeAw}/${maxPages}`
        : `/guides/${themeAw}/${pageNumber + 1}`;

    return (
        <Test
            theme={themeAw as typeof VALID_THEMES[number]}
            page={pageNumber}
            testData={testData}
            nextPage={nextPage}
        />
    );
}

