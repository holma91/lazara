(() => {
  let x = 0;
  setInterval(() => {
    x += 10;
    window.scrollTo(0, x);
  }, 100);
})();
