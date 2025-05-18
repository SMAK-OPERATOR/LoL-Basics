// app/layout.tsx
import type { Metadata } from 'next'
import { Montserrat, Roboto } from 'next/font/google'
import '../../styles/globals.scss' // Путь до глобальных стилей

// Конфигурация шрифтов
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
    title: 'LoL Basisc'
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${montserratMedium.variable} ${montserratRegular.variable} ${robotoRegular.variable}`}>
        <body>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />{children}</body>
        </html>
    )
}