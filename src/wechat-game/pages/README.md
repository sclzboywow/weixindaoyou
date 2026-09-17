# 微信小游戏页面拆分说明

`nativeApp.ts` 仍承担 Canvas 主循环与场景调度。新增或修改页面时按域渐进拆分：

- `services/`：复用官方 `/api/*` 调用
  - `playerService.ts` — 兑换码、反馈
  - `inventoryService.ts` — 储物袋分页拉取
  - `auctionService.ts` — 拍卖寄售选品库存
  - `sectService.ts` — 欺天台转宗
- `ui/inventoryPagination.ts` — 解析 inventory 分页元数据（纯函数）
- `pages/`：后续可迁入独立 `render*` 逻辑（需传入绘制上下文接口）
- `scenes/`：场景 dispatch 注册表（可选）

禁止一次性全量重构；仅在与当前任务相关的页面触碰时拆分。
