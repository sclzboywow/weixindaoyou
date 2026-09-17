# 万界道友 · 微信小游戏源码

本仓库是微信小游戏客户端源码，不是构建产物，也不是完整服务端。

## 目录

- `src/wechat-game/`：微信小游戏主源码
- `src/shared/`：战斗、宗门、数值等共享逻辑
- `src/react-app/`：微信端复用的少量展示辅助函数（不是完整网页前端）
- `src/server/utils/breakthroughCalculator.ts`：突破概率计算（微信端会引用）
- `scripts/build-wechat-game.ts`：生成微信开发者工具使用的 `dist/wechat-game`

## 构建

```bash
bun install
bun run wechat:generate-native-data
bun run wechat:build
```

构建完成后，用微信开发者工具打开本仓库根目录（`project.config.json` 的 `miniprogramRoot` 指向 `dist/wechat-game/`）。

默认接口：`https://yzdoc.cn`
