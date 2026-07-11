# 尚雨正｜运营作品集

面向商品运营、电商运营和产品运营岗位的中文个人简历与作品集网站。网站采用响应式单页结构，重点呈现内容运营、数据分析、商品策划和项目执行能力。

## 技术栈

- Next.js 16（App Router）
- React 19
- TypeScript
- Tailwind CSS 3
- pnpm

网站为纯静态内容展示，不包含登录、数据库、后台或服务端业务接口。

## 页面内容

- 个人简介与求职方向
- 代表性成果摘要
- 项目案例卡片
- “背景—目标—行动—结果—复盘”案例详情
- 实习、校园和教育经历
- 能力与工具
- 邮箱、电话和简历下载

## 项目结构

```text
.
├── app/
│   ├── globals.css        # 全局样式和响应式规则
│   ├── layout.tsx         # 页面元信息与根布局
│   └── page.tsx           # 首页入口
├── components/
│   └── Portfolio.tsx      # 作品集内容、项目数据和案例交互
├── public/
│   ├── profile.jpg        # 个人照片
│   ├── resume.pdf         # 下载版简历
│   └── *.png              # 项目案例图片
├── package.json
├── pnpm-lock.yaml
├── tailwind.config.ts
└── tsconfig.json
```

根目录中的原始简历和项目素材用于内容整理，不参与网站运行，并已通过 `.gitignore` 排除。网站实际使用的公开资源均位于 `public/`。

## 本地运行

建议使用 Node.js 20.9 或更高版本，并安装 pnpm。

```bash
pnpm install
pnpm dev
```

开发服务器启动后访问：

```text
http://localhost:3000
```

## 生产环境测试

```bash
pnpm build
pnpm start
```

`pnpm build` 会执行生产编译和 TypeScript 类型检查。构建成功后，`pnpm start` 默认在 `http://localhost:3000` 提供生产版本。

## 部署到 Vercel

1. 将项目上传至 GitHub。
2. 登录 [Vercel](https://vercel.com)，选择 **Add New → Project**。
3. 导入对应的 GitHub 仓库。
4. Framework Preset 保持为 **Next.js**。
5. Install Command 使用 `pnpm install`，Build Command 使用 `pnpm build`。
6. 当前项目不需要配置环境变量。
7. 点击 **Deploy**。以后推送到主分支时，Vercel 会自动重新部署。

## 上线前隐私提醒

公开网站当前会展示求职联系邮箱和手机号码；`public/resume.pdf` 还包含出生年月。它们均来自现有简历资料，没有测试账号、API 密钥或虚构数据。正式公开前，请再次确认是否接受这些信息被搜索引擎和访客访问；如需降低公开范围，可替换为专用求职邮箱、隐藏手机号，并上传删除出生年月后的简历版本。

## 内容维护

- 修改个人信息、项目文字或案例数据：编辑 `components/Portfolio.tsx`。
- 修改颜色、排版或响应式布局：编辑 `app/globals.css`。
- 更新简历：用新文件覆盖 `public/resume.pdf`，保持文件名不变。
- 更新图片：替换 `public/` 中对应文件，并保持引用路径一致。

所有项目业绩和数据都应以可验证资料为依据，不应添加未经证实的经历或结果。
