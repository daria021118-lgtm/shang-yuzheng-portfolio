# Daria's space

尚雨正的中文创意运营作品集。网站以东京夜景、霓虹灯牌和克制的赛博朋克视觉为方向，用深夜色、霓虹粉、紫色和青色呈现内容运营、商品运营、产品运营与 AI 创意实践。

## 技术栈

- React 19
- Vite 7
- TypeScript
- GSAP（Card Swap 动画）
- Decrypted Text × Text Pressure 首屏组合标题
- 原生 CSS（定制响应式视觉系统）
- pnpm

网站为静态单页，不包含登录、数据库或后台。

## 页面结构

- 全屏 Hero：品牌名称、角色定位、作品入口与影片舞台
- 角色介绍：可拖动、随页面滚动轻微弹跳并回弹的 Lanyard 胸像证件牌
- 作品案例：基于 React Bits Card Swap 的堆叠案例卡片与弹窗详情
- PixelBlast 背景：从角色介绍开始覆盖页面，首屏视频保持纯净；点击或拖动可产生像素涟漪
- 互动体验：内容、数据、AI 三种能力视角
- 联系方式：邮箱与电话
- 全站循环 BGM：默认 30% 音量，支持播放、暂停与弹性音量调节

案例详情按“背景—目标—行动—结果—复盘”组织。未获得依据的信息均使用明确占位文案，没有补写虚构数据。

## 项目结构

```text
.
├── public/              # 公开图片、简历及后续视频
├── src/
│   ├── App.tsx          # 页面内容、项目数据和交互
│   ├── main.tsx         # React 入口
│   ├── styles.css       # 视觉与响应式样式
│   └── vite-env.d.ts    # Vite 类型声明
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 本地运行

建议使用 Node.js 20.19+ 和 pnpm。

```bash
pnpm install
pnpm dev
```

浏览器访问终端显示的地址，默认是 `http://localhost:5173`。

## 主题人物与视频

- `public/daria-character-cutout.png`：透明背景的网站主题动漫人物
- `public/character-intro.mp4`：首屏角色登场背景视频
- `public/ai-film.mp4`：AI 影像实验案例视频
- `public/daria-bgm.mp3`：网站循环背景音乐

## 生产构建与预览

```bash
pnpm build
pnpm preview
```

构建产物输出到 `dist/`。

## 部署

Vercel 导入 GitHub 仓库后应自动识别 Vite：

- Build Command：`pnpm build`
- Output Directory：`dist`
- Install Command：`pnpm install`

## 内容维护

- 修改文字、项目数据与交互：`src/App.tsx`
- 修改视觉与移动端布局：`src/styles.css`
- 更新简历：覆盖 `public/resume.pdf`
- 更新案例图片：替换 `public/` 中对应文件并保持引用路径

公开网站包含求职邮箱、手机号码和可下载简历。正式上线前请再次确认这些信息的公开范围。
