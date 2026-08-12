// GitHub Pages 部署在 https://l-eli.github.io/resume-studio/ 之下，
// CI 會設定 GITHUB_PAGES=true，讓所有靜態資源改用 /resume-studio 前綴。
//
// 注意：這裡刻意「不」設定 basePath。vinext 1.0.0-beta.2 的 static export
// 預渲染器不會套用 basePath，會讓 RSC handler 對 "/" 回 404 而建置失敗。
// 本站只有單一路由，因此只用 assetPrefix 就足夠了。
const assetPrefix = process.env.GITHUB_PAGES === "true" ? "/resume-studio" : undefined

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  assetPrefix,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
