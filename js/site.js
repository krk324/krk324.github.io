(function () {
  'use strict';

  function toggleFragment(btn) {
    var detail = btn.nextElementSibling;
    var isOpen = btn.classList.toggle('is-open');
    detail.classList.toggle('is-open', isOpen);
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }
  window.toggleFragment = toggleFragment;

  function observeVisible(selector, threshold) {
    document.querySelectorAll(selector).forEach(function (el) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { el.classList.add('is-visible'); obs.disconnect(); }
        });
      }, { threshold: threshold });
      obs.observe(el);
    });
  }

  observeVisible('.fragment', 0.12);
  observeVisible('.zone', 0.14);
  observeVisible('.chapter', 0.2);
  observeVisible('.cluster', 0.12);
  observeVisible('.name-block', 0.3);
  observeVisible('.tagline', 0.3);
  observeVisible('.breath', 0.28);

  var indicator = document.getElementById('scroll-indicator');
  var arrow = document.getElementById('scroll-arrow');
  var scrolled = false;

  if (indicator) {
    setTimeout(function () {
      if (!scrolled) {
        indicator.style.transition = 'opacity 1s ease 5s';
        indicator.style.opacity = '1';
      }
    }, 400);

    setTimeout(function () {
      if (!scrolled && arrow) {
        arrow.style.animation = 'scrollHint 2s ease-in-out infinite';
      }
    }, 6000);

    window.addEventListener('scroll', function () {
      if (window.scrollY > 80 && !scrolled) {
        scrolled = true;
        indicator.style.transition = 'opacity 0.4s ease';
        indicator.style.opacity = '0';
        if (arrow) arrow.style.animation = 'none';
      }
    }, { passive: true });
  }

  // Scroll-linked progress for browsers without animation-timeline: scroll()
  if (!CSS.supports('animation-timeline: scroll()')) {
    var progress = document.querySelector('.progress-line');
    if (progress) {
      var ticking = false;
      function updateProgress() {
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        var scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        var pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        progress.style.setProperty('--progress', pct + '%');
        ticking = false;
      }
      window.addEventListener('scroll', function () {
        if (!ticking) {
          window.requestAnimationFrame(updateProgress);
          ticking = true;
        }
      }, { passive: true });
      updateProgress();
    }
  }
})();
