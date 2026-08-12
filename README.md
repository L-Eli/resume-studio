# Resume Studio

一個可即時編輯、即時預覽、直接列印成 A4 PDF 的個人履歷編輯器。所有資料只存在瀏覽器
本機（localStorage），也可以匯出／匯入 JSON 帶到別台裝置繼續編輯。

線上版本：<https://l-eli.github.io/resume-studio/>

## 技術

- Next.js App Router，跑在 [vinext](https://github.com/cloudflare/vinext)（Vite）之上
- React 19 + Tailwind CSS 4 + shadcn/ui
- `output: "export"` 靜態輸出，由 GitHub Actions 部署到 GitHub Pages

## 開發

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build      # 靜態輸出到 dist/client
```

## 部署

推上 `main` 就會觸發 `.github/workflows/deploy-pages.yml`，建置後發佈到 GitHub Pages。

建置時會帶 `GITHUB_PAGES=true`，讓 `next.config.mjs` 把 `assetPrefix` 設成
`/resume-studio`；workflow 接著把 `dist/client/resume-studio/_next` 搬回
`dist/client/_next`，並補上 `.nojekyll`，這樣子路徑下的資源才抓得到。

> 這裡刻意沒有使用 `basePath`：vinext 1.0.0-beta.2 的靜態匯出預渲染器不會套用
> `basePath`，會讓 `/` 的 RSC handler 回 404 而建置失敗。本站只有單一路由，
> 只用 `assetPrefix` 就足夠。
