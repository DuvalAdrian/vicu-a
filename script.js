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

// Desvanecer texto al hacer scroll
const heroText = document.querySelector(".hero-text");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const triggerHeight = window.innerHeight * 0.6; // hasta dónde dura el fade

  // calculamos progreso entre 0 y 1
  let progress = scrollY / triggerHeight;
  if (progress > 1) progress = 1;
  if (progress < 0) progress = 0;

  // aplicamos opacidad y blur dinámico
  heroText.style.opacity = 1 - progress;
  heroText.style.filter = `blur(${progress * 8}px)`; // hasta 8px de blur
});



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

// ===================== traductor =====================

const translations = {
  es: {
    heroTitle: "Bienvenidos a ACOMACASA",
    heroText: "Desde el corazón de los Andes de Arequipa, compartimos con el mundo la esencia de la fibra de vicuña, la más fina y apreciada del planeta.",
    slogan: "Vístete de origen, viste historia. Fibra de vicuña desde el corazón de los Andes."
  },
  en: {
    heroTitle: "Welcome to ACOMACASA",
    heroText: "From the heart of the Andes in Arequipa, we share with the world the essence of vicuña fiber, the finest and most valued in the planet.",
    slogan: "Dress with origin, wear history. Vicuña fiber from the heart of the Andes."
  },
  fr: {
    heroTitle: "Bienvenue à ACOMACASA",
    heroText: "Depuis le cœur des Andes d'Arequipa, nous partageons avec le monde l'essence de la fibre de vigogne, la plus fine et la plus précieuse au monde.",
    slogan: "Habillez-vous d'origine, portez l'histoire. Fibre de vigogne du cœur des Andes."
  },
  de: {
    heroTitle: "Willkommen bei ACOMACASA",
    heroText: "Aus dem Herzen der Anden in Arequipa teilen wir mit der Welt das Wesen der Vikunjafaser, die feinste und geschätzteste der Welt.",
    slogan: "Kleiden Sie sich mit Ursprung, tragen Sie Geschichte. Vikunjafaser aus dem Herzen der Anden."
  },
  it: {
    heroTitle: "Benvenuti in ACOMACASA",
    heroText: "Dal cuore delle Ande di Arequipa, condividiamo con il mondo l'essenza della fibra di vigogna, la più fine e preziosa del pianeta.",
    slogan: "Vestiti di origine, indossa la storia. Fibra di vigogna dal cuore delle Ande."
  }
};

document.getElementById("lang-select").addEventListener("change", (e) => {
  const lang = e.target.value;
  document.querySelector(".hero-text h1").textContent = translations[lang].heroTitle;
  document.querySelector(".hero-text p").textContent = translations[lang].heroText;
  document.querySelector(".hero-text .slogan").textContent = translations[lang].slogan;
});














// ================== SCRIPT PRINCIPAL ==================
// ================== SCRIPT PRINCIPAL ==================
        // ================== SCRIPT PRINCIPAL ==================
document.addEventListener("DOMContentLoaded", () => {
  // 📞 Número de WhatsApp (formato internacional sin + ni espacios)
  // 🚨 ¡CORRECCIÓN AQUÍ! Usa el código de país (51 para Perú)
  const whatsappNumber = "51950731990"; // <-- NÚMERO ACTUALIZADO

  // ... el resto de tu código JavaScript

            // ================== ELEMENTOS DEL MODAL ==================
            // Al estar el script al final del body y después del modal, estos selectores funcionan.
            const cards = document.querySelectorAll(".card");
            const modal = document.getElementById("product-modal");
            const modalImg = document.getElementById("modal-img");
            const modalTitle = document.getElementById("modal-title");
            const modalDesc = document.getElementById("modal-description");
            const modalPrice = document.getElementById("modal-price");
            const closeBtn = document.querySelector(".close");
            const buyBtn = document.querySelector(".buy-btn"); // ¡Ahora este elemento existe!

            // ================== ANIMACIÓN DEL MODAL (GSAP) ==================
            // Asegúrate de que la librería GSAP esté cargada en el <head> para que esto funcione
            const modalTimeline = gsap.timeline({ paused: true });
            modalTimeline
                .set(".modal", { display: "flex" })
                .fromTo(".modal", { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" })
                .fromTo(".modal-content", { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" }, "-=0.1");

            // ================== FUNCIONES AUXILIARES ==================

            // 📤 Enviar mensaje a WhatsApp (detecta automáticamente si abrir WhatsApp Web o App)
            const openWhatsApp = (message) => {
                const encodedMessage = encodeURIComponent(message);
                // 🚀 Usa el enlace correcto (wa.me para móvil/app, web.whatsapp.com para PC/Web)
                const whatsappURL = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
                    ? `https://wa.me/${whatsappNumber}?text=${encodedMessage}` // Móvil
                    : `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`; // PC (Web)

                window.open(whatsappURL, "_blank");
            };

            // 💫 Efecto visual del botón
            const animateButton = (button) => {
                gsap.fromTo(button, { scale: 1 }, { scale: 0.9, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out" });
            };

            // ================== INTERACCIÓN CON LAS TARJETAS ==================
            cards.forEach((card) => {
                const buyButton = card.querySelector(".btn-outline");

                // 🖼️ Abrir modal al hacer clic en la tarjeta (excepto el botón)
                card.addEventListener("click", (e) => {
                    if (e.target.classList.contains("btn-outline")) return;
                    modalImg.src = card.dataset.img;
                    modalTitle.textContent = card.dataset.title;
                    modalDesc.textContent = card.dataset.description;
                    modalPrice.textContent = card.dataset.price;
                    modalTimeline.play(0);
                });

                // 🟢 Botón "Comprar ahora" desde la tarjeta (Funciona correctamente)
                buyButton.addEventListener("click", (e) => {
                    e.stopPropagation();
                    const title = card.dataset.title || "Producto";
                    const price = card.dataset.price || "";
                    const message = `Hola 👋, estoy interesado en el producto "${title}" con un precio de ${price}. ¿Podrías darme más información?`;

                    animateButton(buyButton);
                    setTimeout(() => openWhatsApp(message), 250);
                });
            });

            // 🟢 Botón "Comprar ahora" del modal (¡Ahora funciona!)
            buyBtn.addEventListener("click", () => {
                const title = modalTitle.textContent || "Producto";
                const price = modalPrice.textContent || "";
                const message = `Hola 👋, deseo comprar el producto "${title}" que cuesta ${price}.`;

                animateButton(buyBtn);
                setTimeout(() => openWhatsApp(message), 250);
            });

            // ❌ Cerrar modal
            closeBtn.addEventListener("click", () => {
                gsap.to(".modal-content", { scale: 0.9, opacity: 0, duration: 0.25, ease: "power2.in" });
                gsap.to(".modal", {
                    opacity: 0,
                    duration: 0.25,
                    delay: 0.2,
                    onComplete: () => (modal.style.display = "none"),
                });
            });

            // ❌ Cerrar modal al hacer clic fuera del contenido
            modal.addEventListener("click", (e) => {
                if (e.target === modal) closeBtn.click();
            });
        });








        document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".elegant-navbar");
  const toggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  const desktopLangBtn = document.querySelector(".desktop-lang .lang-btn");
  const desktopLangMenu = document.querySelector(".desktop-lang .lang-menu");
  const mobileLangBtn = document.querySelector(".mobile-lang .lang-btn");
  const mobileLangMenu = document.querySelector(".mobile-lang .lang-menu");

  // Aparece el navbar con animación al cargar
  gsap.from(navbar, { y: -80, opacity: 0, duration: 1, ease: "power4.out" });

  // Cambia estilo al hacer scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Timeline para menú móvil
  const tl = gsap.timeline({ paused: true });
  tl.to(mobileMenu, { right: 0, duration: 0.6, ease: "power3.out" })
    .from(mobileMenu.querySelectorAll("a, .lang-dropdown"), {
      opacity: 0,
      x: 30,
      stagger: 0.1,
      duration: 0.4,
      ease: "power2.out",
    }, "-=0.3");

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    if (toggle.classList.contains("active")) {
      tl.play();
    } else {
      tl.reverse();
    }
  });

  // Dropdown idiomas desktop
  desktopLangBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    desktopLangMenu.classList.toggle("show");
  });

  // Dropdown idiomas móvil
  mobileLangBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileLangMenu.classList.toggle("show");
  });

  // Cerrar menus al hacer click afuera
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".lang-dropdown")) {
      if (desktopLangMenu) desktopLangMenu.classList.remove("show");
      if (mobileLangMenu) mobileLangMenu.classList.remove("show");
    }
  });
});













