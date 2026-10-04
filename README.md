# 万界道友生产移动端逐页移植

源代码：`wechat-port/`。构建输出：工作区的 `wechat-minigame-faithful/`，微信开发者工具以“小游戏”导入。

分包入口：`src/bootstrap.ts` → 主包 `game.js`；`src/main.ts` → `runtime/game.js`，运行时使用分包前的完整主 bundle；通过 `wx.loadSubpackage` 加载，微信自动执行分包入口。主包不创建 Canvas，避免占用游戏画布。地图、字体与各场景图片保留原有资源分包。每次构建自动生成工作区 `migration-reference/package-size-audit.json` 并检查包体预算。启动校验使用 `bun tests/bundle-init-check.ts`，覆盖页面初始化及分包加载失败重试，不访问生产账号。

生产后端固定使用 https://yzdoc.cn；不包含账号密码或服务器密钥。当前是逐页实现中的开发构建，不能作为全功能交付。

原始资料：`production-frontend/`；页面核对：`migration-reference/`；截图：`output/playwright/reference/`。HUD 数值计算、洞府导航、主题色从生产源码生成，字体及图片来自生产原文件。五张 PNG 使用尺寸、RGBA 像素、sRGB 意图及 EXIF 元数据均经校验的无损 WebP。Canvas 布局对应生产移动端样式；微信顶部胶囊及底部安全区额外避让。

构建：`bun install`，`bun run build`。不编译或部署后端。完整移植覆盖、布局差异、未实现入口和真机验证结果以工作区状态文档为准。

图片缓存：`assets/lossless/manifest.json` 记录原文件、无损缓存及解码像素的 SHA-256。构建校验原图与缓存哈希，失配时停止，不会悄悄使用旧图。需更新缓存时，用 Python + Pillow 10.4.0 执行 `python scripts/lossless-artwork.py`，随后 `python scripts/lossless-artwork.py --verify`；普通 Bun 构建不依赖 Python。包体文件统计：`bun tests/audit-package.ts`，实际上传体积以微信开发者工具为准。

包体统计同时记录原始文件字节和 ZIP/Deflate 估算。开发者工具可能采用不同的压缩及计量规则，上传前必须在微信开发者工具确认主包与总包大小。

小游戏启动参数 `route` 可指定已接入的 `/game/...` 路径，支持直接路径或 URI 编码值；登录完成后进入该页。玩家路径分发清单见 `migration-reference/player-route-dispatch-audit.json`。分发覆盖不等于页面功能/视觉一比一验收；现状及尚待用户真机验证的内容见工作区根目录 `MIGRATION-STATUS.md`。例：`route=%2Fgame%2Fbody-cultivation%2Fbreakthrough`。
