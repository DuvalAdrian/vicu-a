// =======================
// NAVBAR SCROLL + DIRECCIÓN (tu lógica original, sin cambios)
// =======================
let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  const current = window.pageYOffset || document.documentElement.scrollTop;

  if (current > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  if (current > lastScrollY && current > 80) {
    // Bajando -> ocultar
    navbar.classList.add("hidden");
  } else {
    // Subiendo -> mostrar
    navbar.classList.remove("hidden");
  }

  lastScrollY = current <= 0 ? 0 : current;
});


// =======================
// GSAP + SCROLLTRIGGER (asegúrate de haber incluido ScrollTrigger.min.js)
// =======================
if (typeof gsap !== "undefined") {
  gsap.registerPlugin(window.ScrollTrigger || ScrollTrigger);
} else {
  console.warn("GSAP no está cargado. Comprueba que gsap.min.js esté incluido.");
}

// --- ANIMACIONES para .exclusive (antes .about) ---
if (typeof gsap !== "undefined") {
  gsap.from(".exclusive .tag", {
    opacity: 0,
    y: -18,
    duration: 0.9,
    ease: "power2.out",
    scrollTrigger: { trigger: ".exclusive", start: "top 82%" }
  });

  gsap.from(".exclusive .title", {
    opacity: 0,
    y: 28,
    duration: 1,
    delay: 0.12,
    ease: "power3.out",
    scrollTrigger: { trigger: ".exclusive", start: "top 82%" }
  });

  gsap.from(".exclusive .description", {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 0.28,
    ease: "power3.out",
    scrollTrigger: { trigger: ".exclusive", start: "top 82%" }
  });

  gsap.from(".exclusive .avatars img", {
    opacity: 0,
    y: 18,
    duration: 0.9,
    stagger: 0.08,
    delay: 0.5,
    ease: "power2.out",
    scrollTrigger: { trigger: ".exclusive", start: "top 82%" }
  });

  gsap.from(".exclusive .buttons .btn", {
    opacity: 0,
    y: 18,
    duration: 0.9,
    stagger: 0.12,
    delay: 0.7,
    ease: "power2.out",
    scrollTrigger: { trigger: ".exclusive", start: "top 82%" }
  });

  // imagen-section (si existe)
  gsap.from(".image-section .image-content img", {
    opacity: 0, scale: 1.06, duration: 1.1, ease: "power2.out",
    scrollTrigger: { trigger: ".image-section", start: "top 82%" }
  });
  gsap.from(".image-section .text-box", {
    opacity: 0, x: 40, duration: 1.05, delay: 0.12, ease: "power2.out",
    scrollTrigger: { trigger: ".image-section", start: "top 82%" }
  });

  // nuevas-llegadas grid
  gsap.from(".nuevas-llegadas h2", {
    opacity: 0, y: -30, duration: 0.9, ease: "power2.out",
    scrollTrigger: { trigger: ".nuevas-llegadas", start: "top 80%" }
  });

  gsap.from(".nuevas-llegadas .card", {
    opacity: 0, y: 36, duration: 0.95, stagger: 0.14, ease: "power2.out",
    scrollTrigger: { trigger: ".nuevas-llegadas", start: "top 80%" }
  });
}


// =======================
// MODAL DE PRODUCTO (usa #product-modal - recomendado)
// =======================
(function () {
  const productModal = document.getElementById("product-modal");
  if (!productModal) return; // no hay modal, evitar errores

  const modalContent = productModal.querySelector(".modal-content");
  const modalImg = productModal.querySelector("#modal-img");
  const modalTitle = productModal.querySelector("#modal-title");
  const modalDescription = productModal.querySelector("#modal-description");
  const modalClose = productModal.querySelector(".close");

  // datos por id (opcional, puedes completarlos)
  const productInfo = {
    1: { title: "Sombrero de Vicuña Clásico", desc: "Un diseño atemporal tejido con lana de vicuña, perfecto para otoño elegante.", img: "img/producto1.jpg" },
    2: { title: "Bufanda de Vicuña Exclusiva", desc: "Suavidad y lujo en una bufanda premium hecha a mano.", img: "img/producto2.jpg" },
    3: { title: "Chaleco de Vicuña Premium", desc: "Prenda sofisticada y ligera para eventos exclusivos.", img: "img/producto3.jpg" },
    // añade los demás si quieres...
  };

  // abrir modal al click en .card o .product-card (soporta data-product)
  document.querySelectorAll(".card, .product-card").forEach(card => {
    card.addEventListener("click", (e) => {
      // no abrir si clic en boton (ej: Comprar) — evita conflicto
      if (e.target.closest("button")) return;

      const id = card.getAttribute("data-product") || card.dataset.product || card.getAttribute("data-id");
      const info = id && productInfo[id] ? productInfo[id] : null;

      if (info) {
        if (modalImg) modalImg.src = info.img;
        if (modalTitle) modalTitle.textContent = info.title;
        if (modalDescription) modalDescription.textContent = info.desc;
      } else {
        // fallback: coger datos desde la propia card
        const imgEl = card.querySelector("img");
        const titleEl = card.querySelector("h3");
        if (modalImg && imgEl) modalImg.src = imgEl.src;
        if (modalTitle && titleEl) modalTitle.textContent = titleEl.innerText;
        if (modalDescription) modalDescription.textContent = card.querySelector(".precio") ? `Precio: ${card.querySelector(".precio").innerText}` : "";
      }

      productModal.style.display = "flex";
      // anim modal
      if (typeof gsap !== "undefined") {
        gsap.fromTo(modalContent, { scale: 0.86, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: "power3.out" });
      } else {
        modalContent.style.opacity = 1;
        modalContent.style.transform = "none";
      }
    });
  });

  // cerrar
  if (modalClose) {
    modalClose.addEventListener("click", () => {
      if (typeof gsap !== "undefined") {
        gsap.to(modalContent, { scale: 0.86, opacity: 0, duration: 0.35, ease: "power3.in", onComplete: () => productModal.style.display = "none" });
      } else {
        productModal.style.display = "none";
      }
    });
  }

  // cerrar al click fuera
  window.addEventListener("click", (e) => {
    if (e.target === productModal) {
      if (typeof gsap !== "undefined") {
        gsap.to(modalContent, { scale: 0.86, opacity: 0, duration: 0.35, ease: "power3.in", onComplete: () => productModal.style.display = "none" });
      } else {
        productModal.style.display = "none";
      }
    }
  });
})();

// ===================== JS: reveal on scroll =====================
(function(){
  const items = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window) || !items.length) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  },{ threshold: 0.12 });

  items.forEach(el=>io.observe(el));
})();


// ===================== La Artesanía Exquisita de la Fibra de Vicuña =====================


document.querySelectorAll(".btn-outline").forEach(btn => {
  btn.addEventListener("click", () => {
    const modalId = btn.getAttribute("data-modal");
    document.getElementById(modalId).style.display = "flex";
  });
});

document.querySelectorAll(".close").forEach(closeBtn => {
  closeBtn.addEventListener("click", () => {
    closeBtn.closest(".modal").style.display = "none";
  });
});

window.addEventListener("click", e => {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
});
