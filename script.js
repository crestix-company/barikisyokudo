// ==========================================
// 1. ヘッダーのスクロール追従制御
// ==========================================
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    // 50px以上スクロールされたらヘッダーにクラスを付与
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ==========================================
// 2. ヒーローエリアのスライドショー
// ==========================================
const heroSlides = document.querySelectorAll('.hero-slideshow .hero-bg');
if (heroSlides.length > 1) {
  // アニメーションを減らす設定（OS側の設定）を尊重
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let currentHeroSlide = 0;

  const showHeroSlide = (index) => {
    heroSlides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === index);
    });
  };

  // 初期スライドの表示
  showHeroSlide(currentHeroSlide);

  // アニメーションが許可されている場合のみ自動切り替えを実行
  if (!prefersReducedMotion) {
    window.setInterval(() => {
      currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
      showHeroSlide(currentHeroSlide);
    }, 5000);
  }
}

// ==========================================
// 3. ハンバーガーメニュー制御（モバイル対応）
// ==========================================
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
if (hamburger && nav && header) {
  // ハンバーガーボタンクリック時のメニュー開閉
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    nav.classList.toggle('active', isOpen);
    header.classList.toggle('nav-open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // メニュー内のリンククリック時にメニューを閉じる
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      nav.classList.remove('active');
      header.classList.remove('nav-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// ==========================================
// 4. スクロール時の要素フェードイン（Reveal効果）
// ==========================================
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => revealObserver.observe(el));

// ==========================================
// 5. 店舗・料理ギャラリーのスライダー
// ==========================================
const track = document.getElementById('galleryTrack');
const dotsContainer = document.getElementById('galleryDots');
const prevBtn = document.getElementById('galleryPrev');
const nextBtn = document.getElementById('galleryNext');

if (track) {
  const slides = track.querySelectorAll('.slide');
  let current = 0;
  
  // 画面幅に応じて一度に表示するスライド数を決定
  const getVisibleCount = () => window.innerWidth <= 768 ? 1 : 3;
  let visible = getVisibleCount();
  let maxIndex = Math.max(0, slides.length - visible);
  let dots = [];

  // ページネーション（ドット）の構築
  function buildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    dots = [];
    visible = getVisibleCount();
    maxIndex = Math.max(0, slides.length - visible);
    
    const numDots = maxIndex + 1;
    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement('button');
      dot.classList.add('gallery-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
      dots.push(dot);
    }
  }

  // 指定インデックスのスライドへ移動
  function goToSlide(index) {
    current = Math.max(0, Math.min(index, maxIndex));
    const slideWidth = slides[0] ? slides[0].offsetWidth : 0;
    track.style.transform = `translateX(-${current * slideWidth}px)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }

  // 初期化とナビゲーションのイベント登録
  buildDots();
  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToSlide(current - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => goToSlide(current + 1));
  }
  
  // ウィンドウリサイズ時に再計算
  window.addEventListener('resize', () => {
    buildDots();
    goToSlide(0); // リサイズ時は最初の位置にリセット
  });
}

// ==========================================
// 6. おすすめ料理内の造り盛り合わせスライドショー
// ==========================================
const menuCardSlides = document.querySelectorAll('.menu-card-slideshow .menu-slide');
if (menuCardSlides.length > 1) {
  let currentMenuCardSlide = 0;
  window.setInterval(() => {
    menuCardSlides[currentMenuCardSlide].classList.remove('is-active');
    currentMenuCardSlide = (currentMenuCardSlide + 1) % menuCardSlides.length;
    menuCardSlides[currentMenuCardSlide].classList.add('is-active');
  }, 5000);
}
