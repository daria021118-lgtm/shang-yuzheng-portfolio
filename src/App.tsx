import { useEffect, useRef, useState } from "react";
import AsciiVisualTitle from "./AsciiVisualTitle";
import BgmControl from "./BgmControl";
import CardSwap, { SwapCard } from "./CardSwap";
import FallingAboutTitle from "./FallingAboutTitle";
import FluidGlassNav from "./FluidGlassNav";
import HeroDecryptedPressure from "./HeroDecryptedPressure";
import LanyardCard from "./LanyardCard";
import OrbitGallery from "./OrbitGallery";
import { PixelBlast } from "./PixelBlast";
import TrueFocusTitle from "./TrueFocusTitle";

type ProjectSection = {
  label: string;
  content: string;
};

type Project = {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  image?: string;
  video?: string;
  sections: ProjectSection[];
  metrics?: string[];
  evidence?: { src: string; alt: string }[];
  promptSystem?: string;
  storyboard?: { shot: string; title: string; scene: string }[];
  proofVideos?: { src: string; title: string; note: string }[];
};

type VisualItem = {
  src: string;
  title: string;
  alt: string;
  ratio: "landscape" | "portrait" | "square";
};

const projects: Project[] = [
  {
    id: "furever-dock",
    number: "01",
    label: "OVERSEAS GROWTH · INSTAGRAM",
    title: "Furever Dock 海外内容增长",
    description: "从海外趋势研究、创意原型到爆款复盘，搭建桌面宠物产品的内容测试闭环。",
    video: "/furever-dock/tutorial.mp4",
    metrics: ["700K 浏览", "57.7K 点赞", "1万+ 当日新增"],
    sections: [
      {
        label: "背景",
        content:
          "2026 年 7—9 月在上海洛拉帕路扎科技有限公司参与 Furever Dock 海外内容营销体系搭建。产品以桌面宠物为核心，需要在 TikTok、Instagram 上快速验证可传播的使用场景。",
      },
      {
        label: "目标",
        content:
          "建立从热点与竞品研究、场景策划、内容制作到数据复盘的日常工作流，用低成本内容测试识别高潜场景，并支持后续 KOL 合作与产品判断。",
      },
      {
        label: "行动",
        content:
          "独立策划并制作产品教程；围绕 Hook、BGM、壁纸、宠物形象和标题等变量批量测试。复盘爆款结构后沉淀可复用模板，并应用于后续 KOL 内容 brief。使用 GPT、AI 视频生成工具与 CapCut 快速完成创意原型和成片。",
      },
      {
        label: "结果",
        content:
          "教程 Reels 获 700K 浏览、57.7K 点赞，带动当日软件新增用户 1 万+；“桌面清洁助手”Reels 获 717K 浏览、61.1K 点赞。数据均按现有发布记录更新。",
      },
      {
        label: "复盘",
        content:
          "教程内容验证了“低理解成本 Hook＋真实桌面场景＋明确操作路径”的转化价值；清洁助手则说明用户会对宠物陪伴之外的功能想象主动反馈。下一步应保留发布后台截图，并统一记录播放、分享、收藏、主页访问与新增用户的时间窗口。",
      },
    ],
    evidence: [
      { src: "/furever-dock/tutorial-proof.png", alt: "Furever Dock 教程 Reels 发布截图与点赞证明" },
      { src: "/furever-dock/cleanup-proof.png", alt: "桌面清洁助手 Reels 发布截图与点赞证明" },
    ],
    proofVideos: [
      {
        src: "/furever-dock/tutorial.mp4",
        title: "爆款教程",
        note: "700K 浏览 · 57.7K 点赞 · 当日新增1万+",
      },
      {
        src: "/furever-dock/cleanup.mp4",
        title: "桌面清洁助手",
        note: "717K 浏览 · 61.1K 点赞",
      },
    ],
  },
  {
    id: "ai-film",
    number: "02",
    label: "AI FILM · KLING",
    title: "AI 影像实验",
    description: "使用可灵完成的角色影像创作，把静态人物设定推进为具有叙事感的动态画面。",
    video: "/ai-film.mp4",
    sections: [
      {
        label: "背景",
        content:
          "围绕一只穿蓝色背带裤、系浅黄色围巾的橘白猫，策划具有东京生活 vlog 气质的治愈系角色短片。",
      },
      {
        label: "目标",
        content:
          "在起床、通勤、咖啡店、街头散步和回家五个生活场景中保持角色形象统一，并形成完整的一日叙事。",
      },
      {
        label: "行动",
        content:
          "先整理可复用的固定角色关键词，再生成角色定妆照；随后为五个镜头分别补充场景、动作、光线和氛围描述。脚本中使用即梦关键词组织画面，现有视频由可灵制作。",
      },
      {
        label: "结果",
        content:
          "已完成可播放的竖屏 AI 角色视频与五镜头脚本，并发布至 Instagram Reels。现有资料未提供发布后的传播或互动数据。",
      },
      {
        label: "复盘",
        content:
          "固定角色词承担跨镜头的一致性约束，场景描述只改变空间、动作与情绪。后续可继续补充实际生成轮次、失败样例及镜头衔接调整记录。",
      },
    ],
    promptSystem:
      "一只可爱的橘白短毛猫，圆脸，大眼睛，小粉鼻子，毛发柔软干净，体型小巧，表情呆萌、温柔、略微认真，穿蓝色小背带裤，系浅黄色围巾，拟人化但仍然明显是猫，不要变成人；日系治愈风、东京生活 vlog 感、真实细腻毛发、暖色调、柔和自然光、画面干净、构图清晰、细节丰富、角色形象统一、竖屏 9:16。",
    storyboard: [
      {
        shot: "01",
        title: "起床",
        scene:
          "东京小公寓的清晨。猫咪坐在床上刚睡醒，神情迷糊，阳光从窗外照入，作为生活 vlog 的开场。",
      },
      {
        shot: "02",
        title: "地铁通勤",
        scene:
          "猫咪站在整洁的东京地铁车厢中轻扶吊环，表情认真又可爱，呈现轻松幽默的日常通勤。",
      },
      {
        shot: "03",
        title: "咖啡店",
        scene:
          "坐在东京街角咖啡店的窗边，桌上有拿铁和吐司；阳光与窗外街景共同形成温暖安静的生活方式画面。",
      },
      {
        shot: "04",
        title: "东京街头散步",
        scene:
          "背着小斜挎包走过便利店、日文招牌与路人之间，画面明亮清爽，强化东京都市旅行 vlog 氛围。",
      },
      {
        shot: "05",
        title: "回家休息",
        scene:
          "回到温馨小公寓，在沙发或书桌前放松；小台灯和简单摆件构成安静、治愈的一日结尾。",
      },
    ],
  },
  {
    id: "heytea",
    number: "03",
    label: "CONTENT STRATEGY",
    title: "喜茶「喜帖」热点内容",
    description: "从产品创新点和用户社交分享需求切入，完成选题、素材拍摄、体验展示与发布。",
    image: "/heytea-result.png",
    metrics: ["26.4万 浏览", "1.1万 点赞", "606 收藏"],
    sections: [
      { label: "背景", content: "喜茶上线“喜帖”个性化杯贴功能，产品具有鲜明视觉特色，也贴合年轻用户表达个性、分享创意的需求。" },
      { label: "目标", content: "快速完成热点内容策划，让用户直观看到定制过程与成品，并验证产品创新点的传播潜力。" },
      { label: "行动", content: "独立完成选题判断、素材拍摄与内容发布；以产品特写呈现杯贴细节，结合用户体验展示定制结果。" },
      { label: "结果", content: "单条视频获得约 26.4 万浏览、1.1 万点赞、606 次收藏及 191 条评论，数据来自现有发布截图。" },
      { label: "复盘", content: "用户反馈集中在个性化设计、品牌创意与分享属性。“产品创新点＋视觉展示＋品牌热点”具有较强传播潜力。" },
    ],
    evidence: [
      { src: "/heytea-work-1.png", alt: "喜茶定制杯贴实物画面" },
      { src: "/heytea-work-2.png", alt: "喜帖定制页面与个人创作" },
    ],
  },
  {
    id: "coze",
    number: "04",
    label: "AI PRODUCT",
    title: "Coze 品牌导购智能体",
    description: "搭建商品知识库、多平台话术工作流与历史价格对比能力。",
    image: "/coze-workflow.png",
    sections: [
      { label: "背景", content: "不同内容平台的受众与表达方式存在差异；大促期间，用户也需要快速判断商品价格是否合适。" },
      { label: "目标", content: "搭建能够识别品牌、受众与平台，生成差异化话术并辅助价格判断的智能体。" },
      { label: "行动", content: "整理品牌资料、商品卖点与历史价格并导入知识库；将任务路由到不同平台的话术节点。" },
      { label: "结果", content: "完成可展示的智能体方案与多平台工作流；现有材料未提供上线后的业务转化数据。" },
      { label: "复盘", content: "后续需要加入内容长度、信息密度、卖点顺序与平台规范，并建立测试集验证准确性。" },
    ],
  },
  {
    id: "volcano",
    number: "05",
    label: "PRODUCT CONCEPT",
    title: "食堂美食文案推荐器",
    description: "围绕校园餐饮消费场景，完成需求拆解、推荐逻辑、功能流程与文案展示。",
    image: "/volcano-cup.png",
    sections: [
      { label: "背景", content: "校园食堂菜品需要更贴近学生消费场景的推广表达，不同平台也存在文案风格差异。" },
      { label: "目标", content: "根据菜品需求，生成结合商品特点、消费场景和平台风格的推荐文案。" },
      { label: "行动", content: "完成需求拆解、功能流程、推荐逻辑与展示；围绕口味、分量、价格和场景提炼卖点。" },
      { label: "结果", content: "完成智能体配置与调试展示；现有材料未提供比赛名次或实际使用数据。" },
      { label: "复盘", content: "后续可加入位置、供应时段、真实价格和用户反馈字段，提高内容准确性。" },
    ],
  },
];

const lenses = [
  {
    key: "operations",
    index: "01",
    title: "运营策划",
    english: "OPERATIONS",
    text: "具备选题策划、图文撰写、标题优化与发布排期能力，可围绕商品卖点、用户反馈和活动节点推进内容执行。",
    tags: "内容运营 · 商品卖点提炼 · 活动执行 · 用户反馈整理",
  },
  {
    key: "data",
    index: "02",
    title: "数据分析",
    english: "DATA",
    text: "可使用 Excel 完成数据整理、数据透视表、常用函数、销售数据汇总、商品表现对比与运营周报制作。",
    tags: "Excel · 数据透视表 · 常用函数 · SQL 基础查询 · Python 基础",
  },
  {
    key: "ai",
    index: "03",
    title: "AI 工具",
    english: "AI TOOLS",
    text: "可使用 GPT 辅助热点研究、创意发散与内容脚本搭建，并结合 AI 视频生成工具和 CapCut 快速完成创意原型、视频制作与多方向内容测试。",
    tags: "GPT · AI 视频生成 · CapCut · 创意原型 · 内容测试",
  },
  {
    key: "visual",
    index: "04",
    title: "视觉制作",
    english: "VISUAL",
    text: "能够根据运营主题完成推广图片与内容素材制作，让信息、商品卖点和视觉风格保持一致。",
    tags: "Canva · 稿定设计 · Photoshop",
  },
  {
    key: "office",
    index: "05",
    title: "办公与表达",
    english: "OFFICE",
    text: "具备运营方案撰写、数据复盘和项目汇报能力，可完成信息梳理、结构搭建与跨团队表达。",
    tags: "Word · Excel · PowerPoint · XMind · CET-6 · 普通话二级甲等",
  },
];

const adVisuals: VisualItem[] = [
  {
    src: "/visual-works/ad-social-frame.jpg",
    title: "社交媒体场景框",
    alt: "橘猫站在花田社交媒体相框中的 AI 广告概念图",
    ratio: "landscape",
  },
  {
    src: "/visual-works/ad-malt-paste.jpg",
    title: "宠物营养产品主视觉",
    alt: "橘猫抱着宠物营养膏的 AI 广告概念图",
    ratio: "portrait",
  },
  {
    src: "/visual-works/ad-black-friday.jpg",
    title: "Black Friday 活动海报",
    alt: "蓝色背景的宠物用品 Black Friday AI 海报",
    ratio: "portrait",
  },
  {
    src: "/visual-works/ad-purple-campaign.jpg",
    title: "紫色品牌氛围海报",
    alt: "紫色背景橘猫和宠物食品包装的 AI 广告概念图",
    ratio: "portrait",
  },
  {
    src: "/visual-works/ad-product-shot.jpg",
    title: "单品静物视觉",
    alt: "橘猫与紫色宠物食品包装的 AI 静物广告图",
    ratio: "portrait",
  },
  {
    src: "/visual-works/ad-smart-bed.jpg",
    title: "智能宠物窝概念页",
    alt: "橘猫躺在智能宠物窝中的 AI 产品概念图",
    ratio: "landscape",
  },
];

const catVisuals: VisualItem[] = [
  {
    src: "/visual-works/cat-character-sheet.jpg",
    title: "角色设定表",
    alt: "橘猫 IP 的多视角、表情与配色角色设定表",
    ratio: "portrait",
  },
  {
    src: "/visual-works/cat-portrait.jpg",
    title: "角色形象照",
    alt: "穿蓝色背带裤和黄色围巾的橘猫 IP 形象照",
    ratio: "portrait",
  },
  {
    src: "/visual-works/cat-home.jpg",
    title: "清晨居家",
    alt: "橘猫 IP 在日式房间中的生活场景",
    ratio: "landscape",
  },
  {
    src: "/visual-works/cat-station.jpg",
    title: "地铁站候车",
    alt: "橘猫 IP 在东京地铁站候车的场景",
    ratio: "landscape",
  },
  {
    src: "/visual-works/cat-train.jpg",
    title: "通勤车厢",
    alt: "橘猫 IP 在地铁车厢扶吊环的通勤场景",
    ratio: "landscape",
  },
  {
    src: "/visual-works/cat-cafe.jpg",
    title: "咖啡店停留",
    alt: "橘猫 IP 在东京咖啡店喝咖啡的场景",
    ratio: "landscape",
  },
  {
    src: "/visual-works/cat-street.jpg",
    title: "东京街头",
    alt: "橘猫 IP 在东京街头散步的场景",
    ratio: "landscape",
  },
  {
    src: "/visual-works/cat-return.jpg",
    title: "回家休息",
    alt: "橘猫 IP 回到温馨房间休息的场景",
    ratio: "landscape",
  },
];

const workAccountVisuals: VisualItem[] = [
  {
    src: "/account-media/work-profile.jpg",
    title: "账号主页与粉丝规模",
    alt: "考公小红书工作账号主页截图",
    ratio: "square",
  },
  {
    src: "/account-media/work-posts-b.jpg",
    title: "热点选题内容",
    alt: "考公面试热点内容及点赞数据截图",
    ratio: "portrait",
  },
  {
    src: "/account-media/work-posts-c.jpg",
    title: "稳定更新矩阵",
    alt: "考公面试热点内容矩阵截图",
    ratio: "portrait",
  },
];

function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeLens, setActiveLens] = useState(lenses[0]);
  const [activeVisual, setActiveVisual] = useState<VisualItem | null>(null);
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = activeProject || activeVisual ? "hidden" : "";
    if (activeProject) dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject, activeVisual]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProject(null);
        setActiveVisual(null);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <main>
      <div className="global-pixel-layer">
        <PixelBlast />
      </div>
      <div className="site-noise" aria-hidden="true" />
      <BgmControl />

      <section className="hero" id="home">
        <div className="hero-media" aria-hidden="true">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/daria-character.png"
            onCanPlay={() => setHeroVideoReady(true)}
          >
            <source src="/character-intro.mp4" type="video/mp4" />
          </video>
          {!heroVideoReady && <img src="/daria-character.png" alt="" />}
          <div className="hero-vignette" />
          <div className="scanlines" />
        </div>

        <FluidGlassNav />

        <div className="hero-copy">
          <p className="hero-kicker">CREATIVE OPERATIONS · AI EXPERIMENTS</p>
          <HeroDecryptedPressure />
          <p className="hero-intro">
            内容、数据与 AI 的交叉地带。
            <br />
            把模糊的想法，推进成可以被看见的结果。
          </p>
        </div>

        <a className="hero-scroll" href="#about">
          <span>ENTER SPACE</span>
          <b>↓</b>
        </a>
      </section>

      <section className="about section-shell" id="about">
        <div className="about-hero-row">
          <div className="section-heading">
            <span>01 / CHARACTER</span>
            <FallingAboutTitle />
          </div>

          <div className="character-stage">
            <span className="character-code">DARIA_UNIT_01</span>
            <span className="character-side">CONTENT / DATA / AI</span>
            <LanyardCard />
          </div>
        </div>

        <div className="about-layout about-details-layout">
          <article className="about-card motion-about-card">
            <div className="profile-orbit" aria-label="个人兴趣与偏好">
              <div className="profile-orbit-item orbit-personality">
                <span>PERSONALITY</span>
                <b>ENTJ</b>
                <p>新兴事物探索</p>
              </div>
              <div className="profile-orbit-item orbit-artist">
                <span>FAVORITE ARTIST</span>
                <b>ARIANA</b>
                <p>GRANDE</p>
              </div>
              <div className="profile-orbit-item orbit-culture">
                <span>CULTURE</span>
                <b>欧美 · 韩流</b>
                <p>文化观察</p>
              </div>
              <div className="profile-orbit-item orbit-games">
                <span>GAMES</span>
                <b>策略 · 经营</b>
                <p>金铲铲 · 星露谷</p>
              </div>
              <div className="profile-orbit-item orbit-life">
                <span>OFF SCREEN</span>
                <b>音乐 · 户外</b>
                <p>旅行</p>
              </div>
              <div className="profile-orbit-item orbit-visual">
                <span>VISUAL TASTE</span>
                <b>CYBER</b>
                <p>复古 · 亚文化</p>
              </div>
            </div>

            <div className="motion-about-center">
              <p className="eyebrow">PROFILE / 尚雨正 · DARIA</p>
              <h3>ABOUT ME</h3>
              <h4>对新事物保持好奇，也享受把想法推进到底。</h4>
              <p>
                武汉大学信息管理学院出版专业硕士在读。关注内容、产品与用户之间的连接，
                具备国内内容运营与海外社交平台实战经验，也会从音乐、游戏、户外活动和旅行中持续收集新的观察与灵感。
              </p>
              <a href="/resume.pdf" download>
                DOWNLOAD RESUME <b>↗</b>
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="experience-strip section-shell" aria-labelledby="latest-experience-title">
        <div className="experience-strip-index">LATEST EXPERIENCE / 2026.07—2026.09</div>
        <div className="experience-strip-main">
          <p>上海洛拉帕路扎科技有限公司</p>
          <h2 id="latest-experience-title">海外内容运营 / 海外市场运营</h2>
          <span>参与 Furever Dock 海外内容营销体系搭建</span>
        </div>
        <div className="experience-strip-tags" aria-label="工作内容">
          <span>TikTok / Instagram 趋势研究</span>
          <span>短视频策划与制作</span>
          <span>爆款复盘与变量测试</span>
          <span>KOL Content Brief</span>
          <span>GPT / AI Video / CapCut</span>
        </div>
      </section>

      <section className="work section-shell" id="work">
        <div className="work-card-stage">
          <div className="work-stage-copy">
            <span>02 / PROJECT FILES</span>
            <h3>
              Cases in
              <br />
              constant motion.
            </h3>
            <p>
              卡片会自动交换位置；悬停可暂停，点击最前方卡片查看完整案例。
            </p>
          </div>

          <CardSwap
            width={560}
            height={580}
            cardDistance={52}
            verticalDistance={58}
            delay={4600}
            pauseOnHover
            skewAmount={4}
          >
            {projects.map((project) => (
              <SwapCard
                className="project-swap-card"
                key={project.id}
                role="button"
                tabIndex={0}
                onClick={() => setActiveProject(project)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveProject(project);
                  }
                }}
              >
                <div className="project-swap-header">
                  <span>{project.number}</span>
                  {project.label}
                  <b>↗</b>
                </div>
                <div className="project-swap-media">
                  {project.video ? (
                    <video autoPlay muted loop playsInline preload="metadata">
                      <source src={project.video} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={project.image} alt="" />
                  )}
                </div>
                <div className="project-swap-info">
                  <span>{project.number}</span>
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    {project.metrics && (
                      <div className="project-metrics">
                        {project.metrics.map((metric) => (
                          <b key={metric}>{metric}</b>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </SwapCard>
            ))}
          </CardSwap>
          <p className="swap-hint">AUTO SWAP · HOVER TO PAUSE · CLICK TO OPEN</p>
        </div>
      </section>

      <section className="account-operations section-shell" id="accounts">
        <div className="new-section-heading">
          <span>03 / ACCOUNT OPERATIONS</span>
          <h2>
            Channels under
            <br />
            <em>operation.</em>
          </h2>
          <p>从工作账号的稳定执行，到个人账号的兴趣表达与平台试验。</p>
        </div>

        <article className="furever-account-case">
          <div className="account-case-topline">
            <span>01 / LATEST WORK ACCOUNT</span>
            <b>FUREVER DOCK · INSTAGRAM / TIKTOK</b>
          </div>
          <div className="furever-case-layout">
            <div className="furever-case-copy">
              <p className="account-platform">OVERSEAS CONTENT / 2026.07—2026.09</p>
              <TrueFocusTitle
                className="furever-focus-title"
                phrases={["把桌面宠物功能，", "转译成全球用户", "愿意观看和讨论的内容。"]}
              />
              <p className="account-summary">
                持续研究 TikTok、Instagram 热点、用户偏好与竞品内容，围绕桌面宠物功能策划可传播场景；
                独立完成教程与“桌面清洁助手”内容，并把爆款结构沉淀为后续测试模板和 KOL brief。
              </p>
              <div className="account-metrics furever-metrics">
                <div><strong>700K</strong><span>教程 Reels 浏览</span></div>
                <div><strong>57.7K</strong><span>教程 Reels 点赞</span></div>
                <div><strong>1万+</strong><span>发布当日软件新增用户</span></div>
                <div><strong>717K / 61.1K</strong><span>清洁助手浏览 / 点赞</span></div>
              </div>
              <div className="account-responsibilities">
                <span>海外趋势研究</span><span>场景策划</span><span>Hook 测试</span>
                <span>CapCut 剪辑</span><span>数据复盘</span><span>KOL Brief</span>
              </div>
            </div>
            <div className="furever-video-grid">
              <article>
                <video muted loop playsInline controls preload="metadata" poster="/furever-dock/tutorial-proof.png">
                  <source src="/furever-dock/tutorial.mp4" type="video/mp4" />
                </video>
                <div><span>01 / TUTORIAL</span><b>爆款产品教程</b><small>700K 浏览 · 57.7K 点赞</small></div>
              </article>
              <article>
                <video muted loop playsInline controls preload="metadata" poster="/furever-dock/cleanup-proof.png">
                  <source src="/furever-dock/cleanup.mp4" type="video/mp4" />
                </video>
                <div><span>02 / FEATURE CONCEPT</span><b>桌面清洁助手</b><small>717K 浏览 · 61.1K 点赞</small></div>
              </article>
            </div>
          </div>
        </article>

        <article className="work-account-case">
          <div className="account-case-topline">
            <span>02 / WORK ACCOUNT</span>
            <b>湖北华图教育 · 小红书内容运营</b>
          </div>

          <div className="work-account-layout">
            <div className="work-account-copy">
              <p className="account-platform">XIAOHONGSHU / 2025.12—2026.02</p>
              <TrueFocusTitle />
              <p className="account-summary">
                实习期间参与 3 个小红书账号及微信公众号运营。此处展示其中一个考公内容账号，
                工作重点是结合考公考编热点和用户需求，完成选题、图文撰写、标题优化与发布排期。
              </p>

              <div className="account-metrics">
                <div>
                  <strong>约 1.1万 → 1.6万</strong>
                  <span>所参与账号粉丝增长</span>
                </div>
                <div>
                  <strong>20.8万</strong>
                  <span>截图所示获赞与收藏</span>
                </div>
                <div>
                  <strong>200 / 700+</strong>
                  <span>日常单篇互动 / 部分内容</span>
                </div>
              </div>

              <div className="account-responsibilities">
                <span>选题策划</span>
                <span>图文撰写</span>
                <span>标题优化</span>
                <span>发布排期</span>
                <span>Excel 周报</span>
                <span>数据复盘</span>
              </div>

              <p className="account-boundary">
                ROLE NOTE / 本案例重点呈现内容判断、执行与数据反馈；现有视觉模板不作为个人原创设计成果申报。
              </p>
            </div>

            <OrbitGallery
              items={workAccountVisuals}
              eyebrow="WORK ACCOUNT / 01"
              title="CONTENT OUTPUT"
              label="XIAOHONGSHU"
              duration={26}
              className="work-account-orbit"
              onSelect={setActiveVisual}
            />
          </div>
        </article>

        <div className="personal-account-heading">
          <div>
            <span>03 / PERSONAL CHANNELS</span>
            <h3>兴趣表达，也是小型内容实验。</h3>
          </div>
          <p>
            两个平台均为个人日常账号，并非完整商业运营项目。这里保留真实的兴趣属性，
            重点观察不同内容在不同平台上的反馈，以及为目标岗位主动进行的内容适配。
          </p>
        </div>

        <div className="personal-platform-grid">
          <article className="platform-card platform-xhs">
            <div className="platform-card-media">
              <img
                src="/account-media/xhs-highlight-a.jpg"
                alt="个人小红书爱豆安利内容数据截图"
              />
              <img
                src="/account-media/xhs-profile.jpg"
                alt="个人小红书主页数据截图"
              />
              <span>XIAOHONGSHU</span>
            </div>
            <div className="platform-card-copy">
              <div className="platform-card-title">
                <span>01</span>
                <h4>小红书｜兴趣内容</h4>
              </div>
              <p>
                以爱豆安利、手作和生活兴趣为主。部分爱豆内容获得较高自然反馈，
                体现了对粉丝兴趣点、图片选择和话题表达的直觉。
              </p>
              <div className="platform-stats">
                <span><b>6519</b>主页获赞与收藏</span>
                <span><b>1.3万</b>代表内容浏览</span>
                <span><b>839</b>代表内容点赞</span>
              </div>
            </div>
          </article>

          <article className="platform-card platform-douyin">
            <div className="platform-card-media">
              <img
                src="/account-media/douyin-highlight.jpg"
                alt="个人抖音日常内容浏览与互动数据截图"
              />
              <img
                src="/account-media/douyin-profile.jpg"
                alt="个人抖音主页数据截图"
              />
              <span>DOUYIN</span>
            </div>
            <div className="platform-card-copy">
              <div className="platform-card-title">
                <span>02</span>
                <h4>抖音｜日常记录</h4>
              </div>
              <p>
                账号以个人日常为主，曾出现两条高反馈内容：喜茶“喜帖”热点视频，
                以及手工作品展示。两者分别验证了热点产品表达与生活兴趣内容的传播潜力。
              </p>
              <div className="platform-stats">
                <span><b>2.4万</b>主页获赞</span>
                <span><b>26.4万</b>喜帖视频播放</span>
                <span><b>8.4万</b>手作内容浏览</span>
              </div>
            </div>
          </article>

        </div>
      </section>

      <section className="visual-works section-shell" id="visuals">
        <div className="new-section-heading visual-section-heading">
          <span>04 / IMAGE WORKS</span>
          <AsciiVisualTitle />
          <p>从商品广告概念到角色 IP 场景，用生成式图像推进视觉表达与内容原型。</p>
        </div>

        <article className="visual-collection">
          <header className="visual-collection-heading">
            <div>
              <span>COLLECTION 01 / AI COMMERCIAL VISUALS</span>
              <h3>AI 商品广告概念图</h3>
            </div>
            <p>
              围绕宠物用品与橘猫角色进行商品主视觉、促销海报和社交媒体场景探索。
              以下均为 AI 概念练习，非商业委托；画面中的品牌、包装和文字不代表真实产品信息。
            </p>
          </header>

          <OrbitGallery
            items={adVisuals}
            eyebrow="COLLECTION 01"
            title="AI COMMERCIAL"
            label="AI CONCEPT"
            duration={32}
            onSelect={setActiveVisual}
          />
        </article>

        <article className="visual-collection visual-cat-collection">
          <header className="visual-collection-heading">
            <div>
              <span>COLLECTION 02 / ORANGE CAT IP</span>
              <h3>橘猫 IP｜东京生活叙事</h3>
            </div>
            <p>
              以蓝色背带裤、浅黄色围巾和橘白短毛为固定识别元素，
              从角色设定延伸到居家、通勤、咖啡店、街头与回家等连续生活场景。
            </p>
          </header>

          <OrbitGallery
            items={catVisuals}
            eyebrow="COLLECTION 02"
            title="ORANGE CAT IP"
            label="CHARACTER WORLD"
            duration={40}
            reverse
            onSelect={setActiveVisual}
          />
        </article>
      </section>

      <section className="playground" id="playground">
        <div className="section-shell playground-inner">
          <p className="skill-section-index">05 / SKILLS &amp; TOOLS</p>
          <div className="signal-console">
            <div className="signal-tabs" role="tablist" aria-label="选择技能类别">
              {lenses.map((lens) => (
                <button
                  key={lens.key}
                  role="tab"
                  aria-selected={activeLens.key === lens.key}
                  className={activeLens.key === lens.key ? "active" : ""}
                  onClick={() => setActiveLens(lens)}
                >
                  <span>{lens.index}</span>
                  {lens.title}
                </button>
              ))}
            </div>
            <div className={`signal-screen signal-${activeLens.key}`} aria-live="polite">
              <div className="signal-orb">
                <span>{activeLens.english}</span>
              </div>
              <div className="signal-text">
                <span>ACTIVE SKILL</span>
                <h3>{activeLens.title}</h3>
                <p>{activeLens.text}</p>
                <b>{activeLens.tags}</b>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="contact" id="contact">
        <div className="contact-character" aria-hidden="true">
          <img src="/daria-character-cutout.png" alt="" />
        </div>
        <div className="section-shell contact-inner">
          <span>06 / CONTACT</span>
          <p className="contact-status"><i /> CHANNEL OPEN</p>
          <h2>
            Let’s make
            <br />
            something <em>visible.</em>
          </h2>
          <div className="contact-links">
            <a href="mailto:syz20021118@163.com">
              <span>EMAIL</span>
              syz20021118@163.com
              <b>↗</b>
            </a>
            <a href="tel:15666197878">
              <span>PHONE</span>
              156 6619 7878
              <b>↗</b>
            </a>
          </div>
          <div className="footer-line">
            <span>DARIA’S SPACE © 2026</span>
            <span>CREATIVE OPERATIONS / AI LAB</span>
          </div>
        </div>
      </footer>

      {activeProject && (
        <div
          className="case-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveProject(null);
          }}
        >
          <div
            className="case-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-title"
            tabIndex={-1}
            ref={dialogRef}
          >
            <button
              className="case-close"
              onClick={() => setActiveProject(null)}
              aria-label="关闭案例"
            >
              ×
            </button>
            <div className="case-media">
              {activeProject.video ? (
                <video autoPlay muted loop playsInline controls>
                  <source src={activeProject.video} type="video/mp4" />
                </video>
              ) : (
                <img src={activeProject.image} alt={activeProject.title} />
              )}
              <span>{activeProject.label}</span>
            </div>
            <div className="case-content">
              <p>{activeProject.number} / CASE FILE</p>
              <h2 id="case-title">{activeProject.title}</h2>
              <div className="case-sections">
                {activeProject.sections.map((section, index) => (
                  <section key={section.label}>
                    <span>0{index + 1}</span>
                    <div>
                      <h3>{section.label}</h3>
                      <p>{section.content}</p>
                    </div>
                  </section>
                ))}
              </div>
              {activeProject.promptSystem && (
                <div className="prompt-system">
                  <div className="prompt-system-heading">
                    <span>PROMPT SYSTEM</span>
                    <h3>角色一致性与分镜脚本</h3>
                  </div>
                  <div className="fixed-prompt">
                    <span>FIXED CHARACTER / 固定角色词</span>
                    <p>{activeProject.promptSystem}</p>
                  </div>
                  {activeProject.storyboard && (
                    <div className="storyboard-list">
                      {activeProject.storyboard.map((item) => (
                        <article key={item.shot}>
                          <span>{item.shot}</span>
                          <div>
                            <h4>{item.title}</h4>
                            <p>{item.scene}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {activeProject.proofVideos && (
                <div className="case-proof-block">
                  <div className="prompt-system-heading">
                    <span>CONTENT PROOF</span>
                    <h3>实习产出与发布结果</h3>
                  </div>
                  <div className="case-proof-videos">
                    {activeProject.proofVideos.map((item) => (
                      <article key={item.src}>
                        <video muted loop playsInline controls preload="metadata">
                          <source src={item.src} type="video/mp4" />
                        </video>
                        <div>
                          <b>{item.title}</b>
                          <span>{item.note}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}
              {activeProject.evidence && (
                <div className="case-evidence">
                  {activeProject.evidence.map((item) => (
                    <img key={item.src} src={item.src} alt={item.alt} />
                  ))}
                </div>
              )}
              <button className="case-end" onClick={() => setActiveProject(null)}>
                CLOSE CASE
              </button>
            </div>
          </div>
        </div>
      )}

      {activeVisual && (
        <div
          className="visual-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeVisual.title}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveVisual(null);
          }}
        >
          <button
            className="visual-lightbox-close"
            onClick={() => setActiveVisual(null)}
            aria-label="关闭图片"
          >
            ×
          </button>
          <figure>
            <img src={activeVisual.src} alt={activeVisual.alt} />
            <figcaption>
              <span>IMAGE WORK / 04</span>
              <b>{activeVisual.title}</b>
            </figcaption>
          </figure>
        </div>
      )}
    </main>
  );
}

export default App;
