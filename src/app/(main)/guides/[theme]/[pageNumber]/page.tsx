import GuidePage from "@/components/guides/MainGuidePage";

const VALID_THEMES = ['adc', 'support', 'jungle', 'all', 'mid', 'top'] as const;
type ThemeType = typeof VALID_THEMES[number];

export async function generateStaticParams() {
    return VALID_THEMES.flatMap(theme => {
        const pageCount = theme === 'jungle' ? 4 : 3;
        return Array.from({ length: pageCount }, (_, i) => ({
            theme: theme,
            pageNumber: (i + 1).toString(),
        }));
    });
}

export const dynamicParams = false;

export default async function Page({
                                 params,
                             }: {
    params: Promise<{ theme: string; pageNumber: string }>
}) {

    const pageNumber = parseInt((await params).pageNumber);
    const themeAw = (await params).theme;
    return <GuidePage
        theme={themeAw as ThemeType}
        pageNumber={pageNumber}
    />;
}

