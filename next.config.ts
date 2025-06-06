// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        })

        return config
    },
    images: {
        domains: ['ddragon.leagueoflegends.com']
    }
}

export default nextConfig