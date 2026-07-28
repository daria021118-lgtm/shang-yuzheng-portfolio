import { type PointerEvent } from "react";

export default function FluidGlassNav() {
  const moveGlass = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    event.currentTarget.style.setProperty("--glass-x", `${x}%`);
    event.currentTarget.style.setProperty("--glass-y", `${y}%`);
  };

  const resetGlass = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--glass-x", "50%");
    event.currentTarget.style.setProperty("--glass-y", "50%");
  };

  return (
    <header
      className="site-nav fluid-glass-nav"
      onPointerMove={moveGlass}
      onPointerLeave={resetGlass}
    >
      <span className="fluid-nav-refraction" aria-hidden="true" />
      <span className="fluid-nav-shine" aria-hidden="true" />

      <a href="#home" className="brand" aria-label="返回首页">
        DARIA<span>’S SPACE</span>
      </a>
      <nav aria-label="主导航">
        <a href="#about">角色介绍</a>
        <a href="#work">作品案例</a>
        <a href="#accounts">账号运营</a>
        <a href="#visuals">图片作品</a>
        <a href="#playground">技能工具</a>
        <a href="#contact">联系方式</a>
      </nav>
      <a className="nav-status" href="#contact">
        <i />
        AVAILABLE
      </a>
    </header>
  );
}
