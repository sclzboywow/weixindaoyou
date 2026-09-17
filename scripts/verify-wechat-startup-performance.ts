import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const read = (path: string) => readFile(resolve(root, path), 'utf8');
const [
  startup,
  coreEntry,
  app,
  gameJsonSource,
  playerRouter,
  buildScript,
  officialAssetsRuntime,
  officialUiAssetsRuntime,
  projectConfigSource,
] = await Promise.all([
  read('src/wechat-game/startup.ts'),
  read('src/wechat-game/game.ts'),
  read('src/wechat-game/ui/nativeApp.ts'),
  read('src/wechat-game/static/game.json'),
  read('src/server/routes/player.router.ts'),
  read('scripts/build-wechat-game.ts'),
  read('src/wechat-game/features/officialAssetsRuntime.ts'),
  read('src/wechat-game/features/officialUiAssetsRuntime.ts'),
  read('project.config.json'),
]);

const failures: string[] = [];
const expect = (condition: boolean, message: string) => {
  if (!condition) failures.push(message);
};

expect(
  startup.includes(
    "const packageNames = ['game-core', 'game-sect-runtime'] as const",
  ),
  '首包未并行加载 game-core 与属性/宗门运行时',
);
expect(startup.includes('onProgressUpdate'), '启动页未展示真实分包加载进度');
expect(
  startup.includes('this.loadStartupFonts();') &&
    startup.includes("'assets/fonts/LXGWWenKaiLite-Startup.ttf'") &&
    startup.includes("'assets/fonts/MaShanZheng-Startup.ttf'"),
  '启动首帧没有在绘制文字前同步注册本地主体与标题字体',
);
expect(
  startup.includes('getShellFont: (name) =>') &&
    coreEntry.includes("bodyFont: startup?.getShellFont('body')") &&
    coreEntry.includes("headingFont: startup?.getShellFont('heading')"),
  '启动字体没有随 Canvas 交接给核心界面，交接时仍会发生字体漂移',
);
expect(
  startup.includes("'WANJIE DAOYOU'") &&
    startup.includes("'正在准备你的道途'") &&
    startup.includes('MAX_CORE_ENTRY_ATTEMPTS') &&
    startup.includes('this.retryRect'),
  '启动首帧缺少品牌壳、准备文案与失败重试热区',
);
expect(
  startup.includes('const barY = y(458)') &&
    startup.includes('barWidth * (this.progress / 100)'),
  '真实分包进度没有绘制在启动壳内',
);
expect(
  startup.includes('核心卷宗初始化超时'),
  '核心分包缺少初始化超时与重试反馈',
);
expect(
  startup.includes('installWechatStartupBridge'),
  '启动页没有建立 Canvas 交接桥',
);
expect(
  /getShellAsset:\s*\(name\)\s*=>\s*\(?name === 'paper'\s*\?\s*this\.paper\s*:\s*this\.logo\)?/.test(
    startup,
  ),
  '核心包没有复用首包已加载的真机壳资源',
);
expect(
  startup.includes('this.shellAssetsPending > 0') &&
    startup.includes('this.scheduleCoreLaunch();'),
  '核心包交接没有等待首包头像与宣纸资源完成加载',
);
expect(
  coreEntry.includes('startup.handoff(startCore)'),
  '核心包没有等待启动页展示 100% 后交接',
);
expect(
  coreEntry.includes("logo: startup?.getShellAsset('logo')"),
  '核心应用没有接收首包徽标资源',
);
expect(startup.includes('this.progress = 100'), '启动页没有绘制完成进度');
expect(
  startup.includes('this.scheduleCoreLaunch()'),
  '启动页缺少分包成功与核心执行的双向握手',
);
expect(
  startup.includes('核心卷宗启封失败'),
  '核心应用初始化异常仍会无提示冻结在 100%',
);
expect(
  buildScript.includes("import { minify } from 'terser';"),
  '核心包缺少语法安全的二次压缩与换行',
);
expect(
  buildScript.includes('max_line_len: 8_000'),
  '核心包没有限制生成代码行长',
);
expect(
  buildScript.includes("'assets/fonts/LXGWWenKaiLite-Startup.ttf'") &&
    buildScript.includes("'assets/fonts/MaShanZheng-Startup.ttf'"),
  '微信主包没有携带启动首帧专用的小型字体子集',
);
expect(
  buildScript.includes('defaults: false') &&
    buildScript.includes('collapse_vars: true') &&
    buildScript.includes('comparisons: true') &&
    buildScript.includes('conditionals: true') &&
    buildScript.includes('drop_console: true') &&
    buildScript.includes('join_vars: true') &&
    buildScript.includes('reduce_vars: true') &&
    buildScript.includes('unused: true'),
  'Terser 只能执行已逐项启用的安全压缩，不得启用默认语义压缩套件',
);
expect(
  buildScript.includes('mangle: false'),
  'Terser 不得再次改写核心包标识符',
);
expect(
  buildScript.includes('WECHAT_MAX_COMPILED_JS_BYTES = 2_000_000'),
  '构建门禁未采用开发者工具 2000KB 单文件上限',
);

const gameJson = JSON.parse(gameJsonSource) as {
  workers?: string | { path?: string };
  subpackages?: Array<{ name?: string }>;
};
const projectConfig = JSON.parse(projectConfigSource) as {
  setting?: { ignoreUploadUnusedFiles?: boolean };
  packOptions?: { include?: Array<{ value?: string; type?: string }> };
};
expect(
  projectConfig.setting?.ignoreUploadUnusedFiles === false,
  '微信上传配置会裁剪动态引用的图片资源',
);
const workerPath =
  typeof gameJson.workers === 'string'
    ? gameJson.workers
    : gameJson.workers?.path;
expect(workerPath === 'workers', 'game.json 必须声明有效的 workers 目录');
const forcedPackageFolders = new Set(
  (projectConfig.packOptions?.include ?? [])
    .filter((entry) => entry.type === 'folder')
    .map((entry) => entry.value),
);
for (const folder of [
  'assets',
  'official-assets/assets',
  'merit-assets/assets',
  'official-ui/assets',
]) {
  expect(forcedPackageFolders.has(folder), `微信预览包未强制包含 ${folder}`);
}
const packages = new Set((gameJson.subpackages ?? []).map((item) => item.name));
for (const required of [
  'game-core',
  'game-sect-runtime',
  'game-training-runtime',
  'official-assets',
]) {
  expect(packages.has(required), `game.json 缺少分包 ${required}`);
}

expect(
  !app.includes("from '../../shared/engine/sect/content/runtime'"),
  '核心包仍静态引入宗门重运行时',
);
expect(
  !app.includes("from '../../shared/lib/battle/simulateBattleV5'"),
  '核心包仍静态引入训练战斗模拟器',
);
expect(
  !app.includes(
    "from '../../shared/engine/battle-v5/setup/BattleStateStrategy'",
  ),
  '核心包仍静态引入训练战斗初始化器',
);
expect(
  app.includes("ensureFeaturePackage('game-sect-runtime')"),
  '宗门页面没有按需加载运行时',
);
expect(
  app.includes("ensureFeaturePackage('game-training-runtime')"),
  '练功房没有按需加载运行时',
);
expect(
  !/async bootstrap\([^)]*\)[\s\S]{0,500}api\.health\(/.test(app),
  '启动仍被 health 请求串行阻塞',
);
expect(app.includes('void this.loadAuthAnnouncement()'), '登录公告未异步加载');
expect(app.includes('void this.bootstrap()'), '核心界面未并行启动会话恢复');
expect(
  app.includes('this.preloadOfficialAssets();'),
  '首屏完成后未预取官方字体与地图资源',
);
expect(
  /ensureWorldMapImage\(\): void[\s\S]{0,500}loadOfficialAssetImage\('assets\/world-map\.webp'\)/.test(
    app,
  ),
  '大世界舆图没有通过 official-assets 分包入口加载',
);
expect(
  /ensureSectMapImage\(sectId: string\): void[\s\S]{0,600}loadOfficialAssetImage\(`assets\/sect\/\$\{sectId\}-map\.webp`\)/.test(
    app,
  ),
  '宗门舆图没有通过 official-assets 分包入口加载',
);
expect(
  officialAssetsRuntime.includes('resolveBundledImagePath(path)') &&
    officialAssetsRuntime.includes(
      'image.src = `official-assets/${resolveBundledImagePath(path)}`',
    ) &&
    officialAssetsRuntime.includes("return 'assets/world-map.png'") &&
    officialAssetsRuntime.includes("normalized.startsWith('assets/')"),
  'official-assets 分包没有在自身代码包内创建并加载图像',
);
expect(
  buildScript.includes('features/officialAssetsRuntime.ts'),
  '构建没有把官方图片运行时写入 official-assets/game.js',
);
expect(
  officialUiAssetsRuntime.includes('installWechatOfficialUiAssetsBridge') &&
    officialUiAssetsRuntime.includes('image.src = `official-ui/${path}`') &&
    buildScript.includes('features/officialUiAssetsRuntime.ts'),
  '官方图标没有在 official-ui 分包内部加载',
);
expect(
  /openOfficialScene\([\s\S]{0,700}key === 'map'[\s\S]{0,700}await this\.ensureFeaturePackage\('official-assets'\)/.test(
    app,
  ),
  '舆图场景切换没有在渲染前等待 official-assets 分包',
);
expect(
  !/start\(\): void[\s\S]{0,1200}loadSubpackage\(\{\s*name:\s*'official-assets'/.test(
    app,
  ),
  '官方资源仍与首屏请求争抢带宽',
);
expect(
  playerRouter.includes("router.get('/bootstrap', requireUser()"),
  '服务端缺少受保护的聚合启动接口',
);
expect(
  app.includes('bootstrapEndpointUnavailable = true'),
  '旧服务端 404 回退没有避免重复探测',
);
expect(
  app.includes('private bootstrapEndpointUnavailable = true;'),
  '真机仍可能请求线上未部署并跳转外域的聚合启动接口',
);
expect(
  !/private async bootstrap\(\)[\s\S]{0,900}api\.bootstrap\(/.test(app),
  '真机启动仍在调用会跳转 client.daoyou.org 的聚合接口',
);
expect(
  app.includes('const session = asRecord(await this.api.session());'),
  '未登录时 get-session 返回 null，真机启动仍会直接解引用空会话',
);

if (failures.length > 0) {
  console.error('[wechat-startup-performance] FAIL');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.info(
  '[wechat-startup-performance] PASS: startup shell, lazy runtimes, aggregate bootstrap and source gates verified',
);
