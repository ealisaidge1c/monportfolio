(function () {
  const items = Array.from(document.querySelectorAll('.js-lightbox-item'));
  if (!items.length) {
    // même script utilisé sur toutes les pages, mais certaines n'ont pas de galerie
    document.getElementById('year').textContent = new Date().getFullYear();
    return;
  }

  const lightbox = document.getElementById('lightbox-js');
  const img = lightbox.querySelector('.lightbox-js__img');
  const btnClose = lightbox.querySelector('.lightbox-js__close');
  const btnPrev = lightbox.querySelector('.lightbox-js__prev');
  const btnNext = lightbox.querySelector('.lightbox-js__next');
  const overlay = lightbox.querySelector('.lightbox-js__overlay');

  let currentIndex = 0;

  function updateImage() {
    const el = items[currentIndex];
    img.src = el.src;
    img.alt = el.alt || '';
  }

  function openLightbox(index) {
    currentIndex = index;
    updateImage();
    lightbox.classList.add('lightbox-js--open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('lightbox-js--open');
    document.body.style.overflow = '';
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % items.length;
    updateImage();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateImage();
  }

  items.forEach((el, index) => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => openLightbox(index));
  });

  btnClose.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', closeLightbox);
  btnNext.addEventListener('click', showNext);
  btnPrev.addEventListener('click', showPrev);

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('lightbox-js--open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });

  // année du footer
  document.getElementById('year').textContent = new Date().getFullYear();
})();
