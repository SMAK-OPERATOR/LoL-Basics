import type {Metadata} from 'next'
import {Montserrat, Roboto} from 'next/font/google'
import '../../styles/globals.scss' // Путь до глобальных стилей

const montserratMedium = Montserrat({
    weight: '500',
    subsets: ['latin', 'cyrillic'],
    variable: '--font-primary',
    display: 'swap',
})

const montserratRegular = Montserrat({
    weight: '400',
    subsets: ['latin', 'cyrillic'],
    variable: '--font-secondary',
    display: 'swap',
})

const robotoRegular = Roboto({
    weight: '400',
    subsets: ['latin', 'cyrillic'],
    variable: '--font-text',
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'LoL Basisc',
    icons: {
        icon: [
            {
                url: '/icons/faviconnew.svg',
                type: 'image/svg+xml',
                sizes: 'any' // или конкретные размеры '48x48'
            },
        ]
    }
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en"
              className={`${montserratMedium.variable} ${montserratRegular.variable} ${robotoRegular.variable}`}>
        <head>
            <link
                rel="icon"
                href="/icons/faviconnew.svg"
                type="image/svg+xml"
            />
        </head>
        <body>{children}</body>
        </html>
    )
}