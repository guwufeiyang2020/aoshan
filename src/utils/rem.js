function setRem() {
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  let htmlDom = document.getElementsByTagName('html')[0];
  htmlDom.style.fontSize = `${htmlWidth / 20}px`;
}

// 初始化
setRem();
// 改变窗口大小时重新设置 rem
let tid;
window.addEventListener(
  'resize',
  () => {
    clearTimeout(tid);
    tid = setTimeout(setRem, 300);
  },
  false
);
