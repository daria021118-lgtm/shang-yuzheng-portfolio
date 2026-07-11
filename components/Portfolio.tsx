"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Project = {
  id: string;
  index: string;
  type: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  metrics?: { value: string; label: string }[];
  sections: { label: string; content: string }[];
  evidence?: { src: string; alt: string }[];
};

const projects: Project[] = [
  {
    id: "heytea",
    index: "01",
    type: "热点内容策划 · 独立完成",
    title: "喜茶“喜帖”功能热点内容策划",
    intro: "从产品创新点和年轻用户社交分享需求切入，完成选题、素材拍摄、体验展示与内容发布。",
    image: "/heytea-result.png",
    imageAlt: "喜茶喜帖内容发布数据截图",
    metrics: [
      { value: "26.4万", label: "视频浏览" },
      { value: "1.1万", label: "点赞" },
      { value: "606", label: "收藏" },
      { value: "191", label: "评论" },
    ],
    sections: [
      { label: "背景", content: "喜茶上线“喜帖”个性化杯贴功能，产品本身具有鲜明的视觉特色，也贴合年轻用户表达个性、分享创意的社交需求。" },
      { label: "目标", content: "围绕新功能快速完成热点内容策划，让用户直观看到定制过程与实际成品，并通过内容互动验证产品创新点的传播潜力。" },
      { label: "行动", content: "独立完成选题判断、素材拍摄与内容发布。以产品特写呈现杯贴细节，结合用户体验展示定制结果，并通过评论区互动强化内容记忆点。" },
      { label: "结果", content: "单条视频获得约26.4万浏览、1.1万点赞、606次收藏及191条评论。以上数据均来自所提供的发布页面截图。" },
      { label: "复盘", content: "评论反馈显示，用户关注个性化设计、品牌创意和社交分享属性。“产品创新点＋视觉展示＋品牌热点”的组合对这类新品内容具有较强传播潜力。" },
    ],
    evidence: [
      { src: "/heytea-work-1.png", alt: "喜茶定制杯贴实物画面" },
      { src: "/heytea-work-2.png", alt: "喜帖定制页面与个人创作" },
    ],
  },
  {
    id: "huatu",
    index: "02",
    type: "实习经历 · 内容运营",
    title: "湖北华图教育新媒体内容运营",
    intro: "参与3个小红书账号及微信公众号运营，用周度数据对比支持选题、内容结构与卖点表达优化。",
    image: "/profile.jpg",
    imageAlt: "尚雨正个人照片",
    metrics: [
      { value: "3个", label: "参与运营账号" },
      { value: "1.1万→1.6万", label: "参与期间账号粉丝" },
      { value: "700+", label: "部分内容点赞收藏" },
    ],
    sections: [
      { label: "背景", content: "在湖北华图教育担任新媒体内容运营实习生，参与3个小红书账号及微信公众号的日常运营，内容围绕考公考编热点与用户需求展开。" },
      { label: "目标", content: "稳定完成内容生产与排期，同时通过传播和销售后台数据识别有效选题与内容形式，为后续优化提供依据。" },
      { label: "行动", content: "参与选题策划、图文撰写、标题优化及发布排期；跟踪点赞、收藏、评论及销售后台数据，使用Excel完成周度汇总，并对比不同选题和内容形式的传播及转化表现。" },
      { label: "结果", content: "实习期间单篇内容日常点赞收藏约200，部分内容达到700+；所参与账号粉丝量由约1.1万增长至1.6万，账号累计获赞与收藏20.7万。账号整体增长为团队运营结果。" },
      { label: "复盘", content: "内容生产需要形成“发布—跟踪—对比—调整”的闭环。通过数据表现与用户反馈，可以持续优化选题方向、内容结构及产品卖点表达。" },
    ],
  },
  {
    id: "coze",
    index: "03",
    type: "AI商品运营 · 工作流设计",
    title: "Coze品牌导购与比价智能体",
    intro: "面向消费品购买决策，搭建商品知识库与多平台话术工作流，并加入双十一历史价格对比能力。",
    image: "/coze-workflow.png",
    imageAlt: "Coze多平台内容生成工作流",
    sections: [
      { label: "背景", content: "直播带货需要根据抖音、小红书、淘宝直播、快手等不同平台受众调整表达风格；双十一期间，用户也需要快速判断商品价格是否合适。" },
      { label: "目标", content: "搭建一个能够识别品牌、受众与投放平台，生成差异化直播或推广话术，并辅助完成大促价格判断的智能体。" },
      { label: "行动", content: "整理品牌资料、商品卖点和近三年双十一价格表格并导入知识库；设计平台选择器，将任务分别路由到抖音、小红书、淘宝直播和快手话术知识库与生成节点；接入图片理解及价格查询能力。" },
      { label: "结果", content: "完成可展示的智能体方案和多平台工作流，支持根据用户输入的品牌、受众与平台生成对应内容，并以知识库辅助历史价格对比。现有材料未提供上线后的业务转化数据。" },
      { label: "复盘", content: "平台差异不应只体现在语气，还需要继续加入内容长度、信息密度、卖点顺序与平台规范等约束。后续应建立标准测试集，检查推荐准确性和价格信息时效性。" },
    ],
  },
  {
    id: "volcano",
    index: "04",
    type: "产品策划 · AI内容应用",
    title: "“火山杯”食堂美食文案推荐器",
    intro: "围绕校园餐饮消费场景，完成需求拆解、功能流程、推荐逻辑与文案输出展示。",
    image: "/volcano-cup.png",
    imageAlt: "食堂美食推荐文案生成器界面",
    sections: [
      { label: "背景", content: "校园食堂菜品需要更贴近学生消费场景的推广表达，不同平台也存在文案风格差异。项目参加武汉大学“火山杯”AI智能体创新设计大赛。" },
      { label: "目标", content: "设计“食堂美食文案推荐器”，让用户输入菜品需求后，获得结合商品特点、消费场景与平台风格的推荐文案。" },
      { label: "行动", content: "完成用户需求拆解、功能流程设计、推荐逻辑及项目展示；设置抖音与小红书等平台文案风格，围绕口味、分量、价格与消费场景提炼菜品卖点。" },
      { label: "结果", content: "完成智能体编辑配置与调试展示。现有截图展示了以“食堂牛肉面的小红书美食推荐文案”为例的完整输出，材料未提供比赛名次或实际使用数据。" },
      { label: "复盘", content: "AI生成内容仍需结构化商品信息作为基础。后续可增加用户反馈、食堂位置、供应时段和真实价格等字段，提升推荐的准确性与可执行性。" },
    ],
  },
];

const skills = [
  { title: "数据分析", items: "Excel数据整理、数据透视表、常用函数、销售数据汇总、商品表现对比、运营周报；SQL与Python基础" },
  { title: "内容运营", items: "选题策划、图文撰写、标题优化、发布排期、内容数据跟踪与复盘" },
  { title: "商品运营", items: "商品卖点提炼、商品链接配置、销售数据跟踪、用户反馈整理、活动节点执行" },
  { title: "策划与表达", items: "Word、Excel、PPT、XMind；Canva、稿定设计、Photoshop" },
  { title: "AI工具", items: "ChatGPT、Claude、Gemini、Coze，用于资料整理、竞品汇总、营销文案与运营报告" },
  { title: "语言能力", items: "CET-6；普通话二级甲等" },
];

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    document.body.style.overflow = activeProject ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeProject]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setActiveProject(null);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="返回首页">SYZ<span> / Portfolio</span></a>
        <nav aria-label="主导航">
          <a href="#projects">项目案例</a>
          <a href="#experience">经历</a>
          <a href="#skills">能力</a>
          <a href="#contact">联系我</a>
        </nav>
      </header>

      <section className="hero section-shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow">商品运营 · 电商运营 · 产品运营</p>
          <h1>尚雨正</h1>
          <p className="hero-lead">从用户需求与数据反馈出发，<br />把内容想法转化为可执行的运营动作。</p>
          <p className="hero-note">武汉大学信息管理学院出版专业硕士在读。具备内容策划、数据复盘、商品卖点提炼与项目执行经验，关注AI工具在商品和内容运营中的实际应用。</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">查看项目 <span>↓</span></a>
            <a className="button button-secondary" href="/resume.pdf" download>下载简历 <span>↗</span></a>
          </div>
        </div>
        <div className="portrait-wrap">
          <div className="portrait-frame">
            <Image src="/profile.jpg" alt="尚雨正个人照片" fill priority loading="eager" sizes="(max-width: 768px) 72vw, 380px" />
          </div>
          <p><span>求职方向</span> 商品 / 电商 / 产品运营</p>
          <p><span>教育背景</span> 武汉大学 · 硕士在读</p>
        </div>
      </section>

      <section className="metrics-strip" aria-label="代表性成果">
        <div><strong>26.4万</strong><span>热点内容浏览</span></div>
        <div><strong>1.1万</strong><span>单条内容点赞</span></div>
        <div><strong>3个</strong><span>参与运营账号</span></div>
        <div><strong>500+</strong><span>活动执行规模</span></div>
      </section>

      <section className="section-shell section-block" id="projects">
        <div className="section-heading">
          <div><p className="eyebrow">Selected work</p><h2>项目案例</h2></div>
          <p>从内容传播到商品决策，呈现我如何理解问题、推进执行并复盘结果。</p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className={`project-card project-${project.id}`} key={project.id}>
              <button onClick={() => setActiveProject(project)} aria-label={`查看${project.title}完整案例`}>
                <div className="project-image">
                  <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 768px) 100vw, 50vw" />
                  <span className="project-index">{project.index}</span>
                </div>
                <div className="project-body">
                  <p className="project-type">{project.type}</p>
                  <h3>{project.title}</h3>
                  <p>{project.intro}</p>
                  {project.metrics && <div className="mini-metrics">{project.metrics.slice(0, 3).map(metric => <span key={metric.label}><strong>{metric.value}</strong>{metric.label}</span>)}</div>}
                  <span className="view-case">查看完整案例 <b>↗</b></span>
                </div>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="experience-section section-block" id="experience">
        <div className="section-shell">
          <div className="section-heading light">
            <div><p className="eyebrow">Experience</p><h2>经历与教育</h2></div>
            <p>内容运营训练、商业分析基础与信息管理视角，共同构成我的运营方法。</p>
          </div>
          <div className="timeline">
            <article><time>2025.12 — 2026.02</time><div><p>实习经历</p><h3>湖北华图教育</h3><h4>新媒体内容运营实习生</h4><p>参与小红书及微信公众号运营，负责选题、内容、排期与数据汇总，并根据表现优化选题和卖点表达。</p></div></article>
            <article><time>2025.09 — 2027.06</time><div><p>硕士在读</p><h3>武汉大学 · 信息管理学院</h3><h4>出版专业｜GPA 3.59</h4><p>研究数字平台环境下的图书推荐、用户采纳与社交阅读行为转化机制。</p></div></article>
            <article><time>2021.09 — 2025.06</time><div><p>本科</p><h3>济南大学 · 商学院</h3><h4>投资学｜一等奖学金、优秀学生</h4><p>学习统计学、计量经济学、数据库原理与应用、Python基础等课程。</p></div></article>
            <article><time>2022.06 — 2023.09</time><div><p>校园经历</p><h3>济南大学融媒体中心</h3><h4>微信部部长</h4><p>统筹内容策划、审核与排期，多篇稿件阅读量达10,000+；参与组织500人以上院级迎新晚会。</p></div></article>
          </div>
        </div>
      </section>

      <section className="section-shell section-block" id="skills">
        <div className="section-heading">
          <div><p className="eyebrow">Capabilities</p><h2>能力与工具</h2></div>
          <p>工具服务于具体工作场景，不用抽象的熟练度百分比代替真实经验。</p>
        </div>
        <div className="skills-grid">
          {skills.map((skill, index) => <article key={skill.title}><span>0{index + 1}</span><h3>{skill.title}</h3><p>{skill.items}</p></article>)}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="section-shell contact-inner">
          <p className="eyebrow">Contact</p>
          <h2>期待把想法，<br />落地成可见的结果。</h2>
          <div className="contact-links">
            <a href="mailto:syz20021118@163.com"><span>邮箱</span>syz20021118@163.com <b>↗</b></a>
            <a href="tel:15666197878"><span>电话</span>156 6619 7878 <b>↗</b></a>
          </div>
          <p className="copyright">© 2026 尚雨正 · 运营作品集</p>
        </div>
      </section>

      {activeProject && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && setActiveProject(null)}>
          <article className="case-modal" role="dialog" aria-modal="true" aria-labelledby="case-title">
            <button className="modal-close" onClick={() => setActiveProject(null)} aria-label="关闭案例">×</button>
            <div className="case-hero">
              <div><p className="project-type">{activeProject.type}</p><h2 id="case-title">{activeProject.title}</h2><p>{activeProject.intro}</p></div>
              <span>{activeProject.index}</span>
            </div>
            {activeProject.metrics && <div className="case-metrics">{activeProject.metrics.map(metric => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div>}
            <div className="case-cover"><Image src={activeProject.image} alt={activeProject.imageAlt} fill sizes="(max-width: 768px) 100vw, 900px" /></div>
            <div className="case-sections">
              {activeProject.sections.map((section, index) => <section key={section.label}><span>0{index + 1}</span><div><h3>{section.label}</h3><p>{section.content}</p></div></section>)}
            </div>
            {activeProject.evidence && <div className="evidence-grid">{activeProject.evidence.map(item => <figure key={item.src}><Image src={item.src} alt={item.alt} fill sizes="(max-width: 768px) 80vw, 360px" /></figure>)}</div>}
            <button className="case-end" onClick={() => setActiveProject(null)}>返回项目列表</button>
          </article>
        </div>
      )}
    </main>
  );
}
