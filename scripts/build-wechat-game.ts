import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp from 'sharp';
import { minify } from 'terser';
import {
  NATIVE_EMOJI_GLYPHS,
  nativeEmojiAssetCode,
} from '../src/wechat-game/ui/nativeEmoji';

const root = process.cwd();
const sourceRoot = resolve(root, 'src/wechat-game');
const outDir = resolve(root, 'dist/wechat-game');
const wechatZodRuntime = resolve(sourceRoot, 'runtime/zod.ts');
const wechatRuntimePlugins: Bun.BunPlugin[] = [
  {
    name: 'wechat-zod-runtime',
    setup(build) {
      build.onResolve({ filter: /^zod$/ }, () => ({ path: wechatZodRuntime }));
    },
  },
];
const corePackageDir = resolve(outDir, 'game-core');
const sectRuntimePackageDir = resolve(outDir, 'game-sect-runtime');
const trainingRuntimePackageDir = resolve(outDir, 'game-training-runtime');
const arenaRuntimePackageDir = resolve(outDir, 'game-arena-runtime');
const spiritFieldRuntimePackageDir = resolve(
  outDir,
  'game-spirit-field-runtime',
);
const meritAssetsPackageDir = resolve(outDir, 'merit-assets');
const assetPackageDir = resolve(outDir, 'official-assets');
const uiPackageDir = resolve(outDir, 'official-ui');

const transcodeWechatImage = async (
  source: string,
  destinationWithoutExtension: string,
): Promise<void> => {
  const metadata = await sharp(source).metadata();
  if (metadata.hasAlpha) {
    await sharp(source)
      .png({ compressionLevel: 9, palette: true, quality: 88, colours: 256 })
      .toFile(`${destinationWithoutExtension}.png`);
    return;
  }
  await sharp(source)
    .jpeg({ quality: 90, progressive: false, mozjpeg: false })
    .toFile(`${destinationWithoutExtension}.jpg`);
};

await mkdir(outDir, { recursive: true });
await Promise.all([
  rm(resolve(outDir, 'assets'), { recursive: true, force: true }),
  rm(resolve(outDir, 'workers'), { recursive: true, force: true }),
  rm(corePackageDir, { recursive: true, force: true }),
  rm(sectRuntimePackageDir, { recursive: true, force: true }),
  rm(trainingRuntimePackageDir, { recursive: true, force: true }),
  rm(arenaRuntimePackageDir, { recursive: true, force: true }),
  rm(spiritFieldRuntimePackageDir, { recursive: true, force: true }),
  rm(meritAssetsPackageDir, { recursive: true, force: true }),
  rm(assetPackageDir, { recursive: true, force: true }),
  rm(uiPackageDir, { recursive: true, force: true }),
  rm(resolve(outDir, 'game.js'), { force: true }),
  rm(resolve(outDir, 'game.js.map'), { force: true }),
  rm(resolve(outDir, 'BUILD_INFO.txt'), { force: true }),
]);
// Keep the entry configuration present while DevTools watches the output.
// Removing the whole output directory makes DevTools report a transient
// "game.json not found" error during every rebuild.
await copyFile(
  resolve(sourceRoot, 'static/game.json'),
  resolve(outDir, 'game.json'),
);
await mkdir(resolve(outDir, 'assets'), { recursive: true });
await mkdir(resolve(outDir, 'assets/fonts'), { recursive: true });
await mkdir(resolve(outDir, 'workers'), { recursive: true });
await mkdir(corePackageDir, { recursive: true });
await mkdir(sectRuntimePackageDir, { recursive: true });
await mkdir(trainingRuntimePackageDir, { recursive: true });
await mkdir(arenaRuntimePackageDir, { recursive: true });
await mkdir(spiritFieldRuntimePackageDir, { recursive: true });
await mkdir(resolve(meritAssetsPackageDir, 'assets/sponsors'), {
  recursive: true,
});
await mkdir(resolve(uiPackageDir, 'assets/fonts'), { recursive: true });
await mkdir(resolve(uiPackageDir, 'assets/emoji'), { recursive: true });
await mkdir(resolve(assetPackageDir, 'assets/sect'), { recursive: true });
await mkdir(resolve(assetPackageDir, 'assets/sect/onboarding'), {
  recursive: true,
});
await mkdir(resolve(assetPackageDir, 'assets/sect/mining'), {
  recursive: true,
});
await mkdir(resolve(assetPackageDir, 'assets/sect/sweep'), { recursive: true });
await mkdir(resolve(assetPackageDir, 'assets/game-controls'), {
  recursive: true,
});

const structuredCloneBanner = `
if (typeof globalThis.structuredClone !== 'function') {
  globalThis.structuredClone = (value) => {
    if (value === undefined || value === null) return value;
    return JSON.parse(JSON.stringify(value));
  };
}
`;

const startupBuild = await Bun.build({
  entrypoints: [resolve(sourceRoot, 'startup.ts')],
  outdir: outDir,
  naming: 'game.js',
  target: 'browser',
  sourcemap: 'none',
  minify: true,
  plugins: wechatRuntimePlugins,
});

const coreBuild = await Bun.build({
  entrypoints: [resolve(sourceRoot, 'game.ts')],
  outdir: corePackageDir,
  naming: 'game.js',
  target: 'browser',
  banner: structuredCloneBanner,
  sourcemap: 'none',
  minify: true,
  plugins: wechatRuntimePlugins,
});

const sectRuntimeBuild = await Bun.build({
  entrypoints: [resolve(sourceRoot, 'features/sectRuntime.ts')],
  outdir: sectRuntimePackageDir,
  naming: 'game.js',
  target: 'browser',
  banner: structuredCloneBanner,
  sourcemap: 'none',
  minify: { identifiers: true, syntax: true, whitespace: false },
  plugins: wechatRuntimePlugins,
});

const trainingRuntimeBuild = await Bun.build({
  entrypoints: [resolve(sourceRoot, 'features/trainingRuntime.ts')],
  outdir: trainingRuntimePackageDir,
  naming: 'game.js',
  target: 'browser',
  banner: structuredCloneBanner,
  sourcemap: 'none',
  minify: { identifiers: true, syntax: true, whitespace: false },
  plugins: wechatRuntimePlugins,
});

const arenaRuntimeBuild = await Bun.build({
  entrypoints: [resolve(sourceRoot, 'features/arenaRuntime.ts')],
  outdir: arenaRuntimePackageDir,
  naming: 'game.js',
  target: 'browser',
  sourcemap: 'none',
  minify: true,
  plugins: wechatRuntimePlugins,
});

const spiritFieldRuntimeBuild = await Bun.build({
  entrypoints: [resolve(sourceRoot, 'features/spiritFieldRuntime.ts')],
  outdir: spiritFieldRuntimePackageDir,
  naming: 'game.js',
  target: 'browser',
  sourcemap: 'none',
  minify: { identifiers: true, syntax: true, whitespace: false },
  plugins: wechatRuntimePlugins,
});

const meritAssetsBuild = await Bun.build({
  entrypoints: [resolve(sourceRoot, 'features/meritAssetsRuntime.ts')],
  outdir: meritAssetsPackageDir,
  naming: 'game.js',
  target: 'browser',
  sourcemap: 'none',
  minify: true,
  plugins: wechatRuntimePlugins,
});

const officialAssetsBuild = await Bun.build({
  entrypoints: [resolve(sourceRoot, 'features/officialAssetsRuntime.ts')],
  outdir: assetPackageDir,
  naming: 'game.js',
  target: 'browser',
  sourcemap: 'none',
  minify: true,
  plugins: wechatRuntimePlugins,
});

const officialUiAssetsBuild = await Bun.build({
  entrypoints: [resolve(sourceRoot, 'features/officialUiAssetsRuntime.ts')],
  outdir: uiPackageDir,
  naming: 'game.js',
  target: 'browser',
  sourcemap: 'none',
  minify: true,
  plugins: wechatRuntimePlugins,
});

for (const result of [
  startupBuild,
  coreBuild,
  sectRuntimeBuild,
  trainingRuntimeBuild,
  arenaRuntimeBuild,
  spiritFieldRuntimeBuild,
  meritAssetsBuild,
  officialAssetsBuild,
  officialUiAssetsBuild,
]) {
  if (result.success) continue;
  for (const log of result.logs) {
    console.error(log);
  }
  process.exit(1);
}

// 微信开发者工具会直接忽略超过 2000KB 的单个 JavaScript 文件。Bun 的
// 保留空白模式会让核心包超过该限制，而完全压缩又会产生数十万字符的单行，
// 导致开发者工具编译停顿。Terser 在完整压缩后按语法边界安全换行，同时满足
// 文件尺寸与编译器行长两项约束。
const coreBundlePath = resolve(corePackageDir, 'game.js');
const compactedCore = await minify(await readFile(coreBundlePath, 'utf8'), {
  // Bun has already completed the broad semantic compression and identifier
  // mangling. Keep Terser on a deliberately narrow, runtime-safe pass: remove
  // production console calls and fold conditional expressions, then wrap long
  // lines for DevTools. Do not enable the default compression suite because it
  // changes battle-definition initialization in the WeChat runtime.
  compress: {
    arrows: true,
    defaults: false,
    passes: 2,
    booleans: true,
    collapse_vars: true,
    comparisons: true,
    conditionals: true,
    dead_code: true,
    drop_console: true,
    evaluate: true,
    if_return: true,
    join_vars: true,
    keep_fargs: false,
    lhs_constants: true,
    loops: true,
    properties: true,
    reduce_vars: true,
    sequences: true,
    side_effects: true,
    unused: true,
  },
  toplevel: true,
  mangle: false,
  format: {
    comments: false,
    max_line_len: 8_000,
  },
});
if (!compactedCore.code) {
  throw new Error('Unable to compact WeChat game-core bundle');
}
await writeFile(coreBundlePath, compactedCore.code, 'utf8');

// Derive the production font subset from the bundles that WeChat will
// actually execute. Scanning the entire source tree also includes server,
// browser-only, test and documentation text, adding several MiB of glyphs
// that can never appear in the mini game.
const fontSubset = Bun.spawnSync([
  'python',
  resolve(root, 'scripts/subset-wechat-fonts.py'),
  '--runtime-root',
  outDir,
]);
if (!fontSubset.success) {
  console.error(fontSubset.stdout.toString());
  console.error(fontSubset.stderr.toString());
  throw new Error('Unable to generate WeChat runtime font subsets');
}
console.log(fontSubset.stdout.toString().trim());

await Promise.all([
  copyFile(
    resolve(sourceRoot, 'static/workers/index.js'),
    resolve(outDir, 'workers/index.js'),
  ),
  sharp(resolve(root, 'public/assets/paper.webp'))
    .png({ compressionLevel: 9, palette: true, quality: 88, colours: 256 })
    .toFile(resolve(outDir, 'assets/paper.png')),
  sharp(resolve(root, 'public/assets/daoyou_logo.webp'))
    .png({ compressionLevel: 9 })
    .toFile(resolve(outDir, 'assets/daoyou_logo.png')),
  copyFile(
    resolve(root, 'public/assets/wechat-login.png'),
    resolve(outDir, 'assets/wechat-login.png'),
  ),
  copyFile(
    resolve(sourceRoot, 'static/assets/fonts/LXGWWenKaiLite-Startup.ttf'),
    resolve(outDir, 'assets/fonts/LXGWWenKaiLite-Startup.ttf'),
  ),
  copyFile(
    resolve(sourceRoot, 'static/assets/fonts/MaShanZheng-Startup.ttf'),
    resolve(outDir, 'assets/fonts/MaShanZheng-Startup.ttf'),
  ),
  copyFile(
    resolve(
      sourceRoot,
      'static/assets/fonts/LXGWWenKaiLite-Regular.subset.ttf',
    ),
    resolve(uiPackageDir, 'assets/fonts/LXGWWenKaiLite-Regular.ttf'),
  ),
  copyFile(
    resolve(sourceRoot, 'static/assets/fonts/MaShanZheng-Regular.subset.ttf'),
    resolve(uiPackageDir, 'assets/fonts/MaShanZheng-Regular.ttf'),
  ),
  ...['lingxiao', 'wuxiang', 'tianyan', 'youdu', 'jiujie'].map((sectId) =>
    sharp(resolve(root, `public/assets/sect/${sectId}-map.webp`))
      .png({ compressionLevel: 9, palette: true, quality: 88, colours: 128 })
      .toFile(resolve(assetPackageDir, `assets/sect/${sectId}-map.png`)),
  ),
  ...['lingxiao', 'wuxiang', 'tianyan', 'youdu', 'jiujie'].map((sectId) =>
    transcodeWechatImage(
      resolve(root, `public/assets/sect/onboarding/${sectId}.webp`),
      resolve(assetPackageDir, `assets/sect/onboarding/${sectId}`),
    ),
  ),
  ...[
    'spirit-vein-cavern.webp',
    'rope-cultivator.webp',
    'spirit-hook.webp',
    'spirit-crystal.webp',
    'copper-ore.webp',
    'dark-iron.webp',
    'earth-essence.webp',
    'explosive-barrel.webp',
  ].map((file) =>
    transcodeWechatImage(
      resolve(root, `public/assets/sect/mining/${file}`),
      resolve(
        assetPackageDir,
        `assets/sect/mining/${file.replace(/\.webp$/, '')}`,
      ),
    ),
  ),
  ...[
    'cloud-stair-courtyard.webp',
    'sweep-atlas.webp',
    'sweep-obstacles.webp',
  ].map((file) =>
    transcodeWechatImage(
      resolve(root, `public/assets/sect/sweep/${file}`),
      resolve(
        assetPackageDir,
        `assets/sect/sweep/${file.replace(/\.webp$/, '')}`,
      ),
    ),
  ),
  ...['virtual-joystick-base.webp', 'virtual-joystick-thumb.webp'].map((file) =>
    transcodeWechatImage(
      resolve(root, `public/assets/game-controls/${file}`),
      resolve(
        assetPackageDir,
        `assets/game-controls/${file.replace(/\.webp$/, '')}`,
      ),
    ),
  ),
  ...[
    'yidengweiguang.webp',
    'shanshuitongcheng.webp',
    'changyehudao.webp',
    'gongzhengchangsheng.webp',
  ].map((file) =>
    transcodeWechatImage(
      resolve(root, `public/assets/sponsors/${file}`),
      resolve(
        meritAssetsPackageDir,
        `assets/sponsors/${file.replace(/\.webp$/, '')}`,
      ),
    ),
  ),
]);

await Promise.all(
  NATIVE_EMOJI_GLYPHS.map(async (glyph) => {
    const outputCode = nativeEmojiAssetCode(glyph);
    const exactCode = Array.from(glyph)
      .map((character) => {
        const codePoint = character.codePointAt(0);
        return codePoint === undefined
          ? ''
          : codePoint.toString(16).padStart(4, '0');
      })
      .filter(Boolean)
      .join('-');
    const sourceRoot = resolve(
      root,
      'node_modules/emoji-datasource-twitter/img/twitter/64',
    );
    const candidates = Array.from(
      new Set([exactCode, outputCode, `${outputCode}-fe0f`]),
    ).map((code) => resolve(sourceRoot, `${code}.png`));
    const source = (
      await Promise.all(
        candidates.map(async (candidate) =>
          (await Bun.file(candidate).exists()) ? candidate : '',
        ),
      )
    ).find(Boolean);
    if (!source) {
      throw new Error(
        `Unable to resolve bundled Twemoji ${glyph} (${outputCode})`,
      );
    }
    await copyFile(
      source,
      resolve(uiPackageDir, `assets/emoji/${outputCode}.png`),
    );
  }),
);
await Promise.all([
  copyFile(
    resolve(root, 'node_modules/twemoji/LICENSE-GRAPHICS'),
    resolve(uiPackageDir, 'TWEMOJI-LICENSE.txt'),
  ),
  copyFile(
    resolve(root, 'node_modules/emoji-datasource-twitter/LICENSE'),
    resolve(uiPackageDir, 'EMOJI-DATASOURCE-LICENSE.txt'),
  ),
]);

const officialWorldMap = await fetch(
  'https://lxd-waimao.oss-cn-hangzhou.aliyuncs.com/daoyou/map/map.webp',
);
if (!officialWorldMap.ok) {
  throw new Error(
    `Unable to fetch official world map: HTTP ${officialWorldMap.status}`,
  );
}
await sharp(new Uint8Array(await officialWorldMap.arrayBuffer()))
  .resize({ width: 2048, withoutEnlargement: true })
  .png({ compressionLevel: 9, palette: true, quality: 88, colours: 128 })
  .toFile(resolve(assetPackageDir, 'assets/world-map.png'));
await writeFile(
  resolve(outDir, 'BUILD_INFO.txt'),
  [
    'Wanjie Daoyou WeChat Mini Game',
    `builtAt=${new Date().toISOString()}`,
    'source=src/wechat-game',
    'defaultApiBase=https://yzdoc.cn',
    'openWith=WeChat DevTools using the repository root project.config.json',
    '',
  ].join('\n'),
  'utf8',
);

const mainPackageFiles = [
  'game.js',
  'game.json',
  'BUILD_INFO.txt',
  'assets/paper.png',
  'assets/daoyou_logo.png',
  'assets/wechat-login.png',
  'assets/fonts/LXGWWenKaiLite-Startup.ttf',
  'assets/fonts/MaShanZheng-Startup.ttf',
];
const resourcePackageFiles = [
  'game-core/game.js',
  'game-sect-runtime/game.js',
  'game-training-runtime/game.js',
  'game-arena-runtime/game.js',
  'game-spirit-field-runtime/game.js',
  'merit-assets/game.js',
  'official-assets/game.js',
  'official-ui/game.js',
  'official-ui/TWEMOJI-LICENSE.txt',
  'official-ui/EMOJI-DATASOURCE-LICENSE.txt',
  'official-ui/assets/fonts/LXGWWenKaiLite-Regular.ttf',
  'official-ui/assets/fonts/MaShanZheng-Regular.ttf',
  ...NATIVE_EMOJI_GLYPHS.map(
    (glyph) => `official-ui/assets/emoji/${nativeEmojiAssetCode(glyph)}.png`,
  ),
  'official-assets/assets/world-map.png',
  ...['lingxiao', 'wuxiang', 'tianyan', 'youdu', 'jiujie'].map(
    (sectId) => `official-assets/assets/sect/${sectId}-map.png`,
  ),
  ...['lingxiao', 'wuxiang', 'tianyan', 'youdu', 'jiujie'].map(
    (sectId) => `official-assets/assets/sect/onboarding/${sectId}.jpg`,
  ),
  ...[
    'spirit-vein-cavern.jpg',
    'rope-cultivator.png',
    'spirit-hook.png',
    'spirit-crystal.png',
    'copper-ore.png',
    'dark-iron.png',
    'earth-essence.png',
    'explosive-barrel.png',
  ].map((file) => `official-assets/assets/sect/mining/${file}`),
  ...[
    'cloud-stair-courtyard.jpg',
    'sweep-atlas.png',
    'sweep-obstacles.png',
  ].map((file) => `official-assets/assets/sect/sweep/${file}`),
  ...['virtual-joystick-base.png', 'virtual-joystick-thumb.png'].map(
    (file) => `official-assets/assets/game-controls/${file}`,
  ),
  ...[
    'yidengweiguang.png',
    'shanshuitongcheng.png',
    'changyehudao.png',
    'gongzhengchangsheng.png',
  ].map((file) => `merit-assets/assets/sponsors/${file}`),
];
const bytesOf = (paths: string[]) =>
  paths.reduce(
    (total, path) => total + Bun.file(resolve(outDir, path)).size,
    0,
  );
const mainPackageBytes = bytesOf(mainPackageFiles);
const startupCodeBytes = Bun.file(resolve(outDir, 'game.js')).size;
const corePackageBytes = Bun.file(resolve(corePackageDir, 'game.js')).size;
const sectRuntimePackageBytes = Bun.file(
  resolve(sectRuntimePackageDir, 'game.js'),
).size;
const trainingRuntimePackageBytes = Bun.file(
  resolve(trainingRuntimePackageDir, 'game.js'),
).size;
const arenaRuntimePackageBytes = Bun.file(
  resolve(arenaRuntimePackageDir, 'game.js'),
).size;
const spiritFieldRuntimePackageBytes = Bun.file(
  resolve(spiritFieldRuntimePackageDir, 'game.js'),
).size;
const meritAssetsPackageBytes = bytesOf([
  'merit-assets/game.js',
  'merit-assets/assets/sponsors/yidengweiguang.webp',
  'merit-assets/assets/sponsors/shanshuitongcheng.webp',
  'merit-assets/assets/sponsors/changyehudao.webp',
  'merit-assets/assets/sponsors/gongzhengchangsheng.webp',
]);
const totalPackageBytes = mainPackageBytes + bytesOf(resourcePackageFiles);
const excludedWechatImages = Array.from(
  new Bun.Glob('**/*.webp').scanSync({ cwd: outDir, onlyFiles: true }),
);
if (excludedWechatImages.length > 0) {
  throw new Error(
    `WeChat output contains upload-excluded WebP assets: ${excludedWechatImages.join(', ')}`,
  );
}
if (startupCodeBytes > 256 * 1024) {
  throw new Error(
    `WeChat startup shell exceeds 256 KiB: ${startupCodeBytes} bytes`,
  );
}
if (mainPackageBytes > 512 * 1024) {
  throw new Error(
    `WeChat startup package exceeds 512 KiB: ${mainPackageBytes} bytes`,
  );
}
const codePackages = [
  ['game-core', resolve(corePackageDir, 'game.js'), corePackageBytes],
  [
    'game-sect-runtime',
    resolve(sectRuntimePackageDir, 'game.js'),
    sectRuntimePackageBytes,
  ],
  [
    'game-training-runtime',
    resolve(trainingRuntimePackageDir, 'game.js'),
    trainingRuntimePackageBytes,
  ],
  [
    'game-arena-runtime',
    resolve(arenaRuntimePackageDir, 'game.js'),
    arenaRuntimePackageBytes,
  ],
  [
    'game-spirit-field-runtime',
    resolve(spiritFieldRuntimePackageDir, 'game.js'),
    spiritFieldRuntimePackageBytes,
  ],
  [
    'merit-assets',
    resolve(meritAssetsPackageDir, 'game.js'),
    Bun.file(resolve(meritAssetsPackageDir, 'game.js')).size,
  ],
] as const;
const WECHAT_MAX_COMPILED_JS_BYTES = 2_000_000;
const WECHAT_CODE_BUDGETS: Readonly<Record<string, number>> = {
  'game-core': 1_600_000,
  'game-sect-runtime': 1_750_000,
  'game-training-runtime': 1_650_000,
};
for (const [name, path, bytes] of codePackages) {
  if (bytes > WECHAT_MAX_COMPILED_JS_BYTES) {
    throw new Error(
      `WeChat JavaScript file ${name}/game.js exceeds the DevTools 2000KB compiler limit: ${bytes} bytes`,
    );
  }
  const budget = WECHAT_CODE_BUDGETS[name];
  if (budget !== undefined && bytes > budget) {
    throw new Error(
      `WeChat JavaScript file ${name}/game.js exceeds its architecture budget: ${bytes} > ${budget} bytes. Move feature code/data behind a runtime bridge; see docs/wechat-package-architecture.md.`,
    );
  }
  const maxLineLength = (await Bun.file(path).text())
    .split('\n')
    .reduce((max, line) => Math.max(max, line.length), 0);
  if (maxLineLength > 8 * 1024) {
    throw new Error(
      `WeChat subpackage ${name} contains an oversized compiled line: ${maxLineLength} chars`,
    );
  }
}
const WECHAT_TOTAL_BUDGET_BYTES = 19 * 1024 * 1024;
const WECHAT_TOTAL_HARD_LIMIT_BYTES = 20 * 1024 * 1024;
if (totalPackageBytes > WECHAT_TOTAL_HARD_LIMIT_BYTES) {
  throw new Error(
    `WeChat total package exceeds 20 MiB: ${totalPackageBytes} bytes`,
  );
}
if (totalPackageBytes > WECHAT_TOTAL_BUDGET_BYTES) {
  throw new Error(
    `WeChat total package exceeds its 19 MiB architecture budget: ${totalPackageBytes} bytes. Reduce bundled assets or duplicate runtime dependencies; see docs/wechat-package-architecture.md.`,
  );
}

console.info(
  `[wechat-game] built: ${outDir} (startup-js=${startupCodeBytes} main=${mainPackageBytes} core=${corePackageBytes} sect-runtime=${sectRuntimePackageBytes} training-runtime=${trainingRuntimePackageBytes} arena-runtime=${arenaRuntimePackageBytes} spirit-field-runtime=${spiritFieldRuntimePackageBytes} merit-assets=${meritAssetsPackageBytes} total=${totalPackageBytes})`,
);
