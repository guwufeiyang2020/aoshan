(() => {
  const docElement = document.documentElement;
  // 当DOM加载后执行
  docElement.addEventListener('DOMContentLoaded', resize, false);
  window.addEventListener('resize', resize, false);
  resize();
  function resize() {
    docElement.style.fontSize = `${docElement.clientWidth / 19.2}px`; // 19.2 为 1920/100 计算得出 目前需要在1920*1080下 100px=1rem
  }
})();
