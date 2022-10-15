(() => {
  let x = 0;
  setInterval(() => {
    x += 10;
    window.scrollTo(0, x);
  }, 100);
})();

// give links ids from 1 to 10
// need to use localstorage to deal with refreshs!

((x) => {
  function elementClick(event) {
    console.log('in elementClick...');
    event.preventDefault();
  }

  const elements = [];
  for (let i = 0; i < x; i++) {
    const el = document.getElementById(i);
    el.addEventListener('click', elementClick, false);
    elements[i] = el;
  }

  for (let i = 0; i < x; i++) {
    setTimeout(() => {
      elements[i].click();
      setInterval(() => {
        window.scrollBy(0, Math.floor(Math.random() * 20));
      }, 500);
    }, 5000 * i); // 1000s
  }
})(3);
