document.addEventListener("DOMContentLoaded", () => {
  // Custom Cursor
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  document.body.appendChild(cursor);

  const cursorBlur = document.createElement("div");
  cursorBlur.className = "custom-cursor-blur";
  document.body.appendChild(cursorBlur);

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    
    cursorBlur.style.left = `${e.clientX}px`;
    cursorBlur.style.top = `${e.clientY}px`;

    // Move blobs slightly based on mouse
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    const blobs = document.querySelectorAll(".blob");
    blobs.forEach((blob, index) => {
      const factor = (index + 1) * 0.5;
      blob.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
    });
  });

  document.addEventListener("mousedown", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(0.8)";
  });

  document.addEventListener("mouseup", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
  });

  // Cursor Active State
  const interactiveElements = document.querySelectorAll("a, button, .experience-card, .project-card, .tech-item");
  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("active");
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("active");
    });
  });

  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
    cursorBlur.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
    cursorBlur.style.opacity = "0.5";
  });

  // Preloader
  const preloader = document.getElementById("preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.style.opacity = "0";
      preloader.style.visibility = "hidden";

      // Inicializar animaciones de skills después de que cargue la página
      initSkillsAnimation();
    });
  }

  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const themeIcon = themeToggle.querySelector("i");

  const savedTheme = localStorage.getItem("theme") || "dark";
  body.classList.add(savedTheme + "-mode");
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener("click", () => {
    if (body.classList.contains("dark-mode")) {
      body.classList.replace("dark-mode", "light-mode");
      localStorage.setItem("theme", "light");
      updateThemeIcon("light");
      animateThemeChange();
    } else {
      body.classList.replace("light-mode", "dark-mode");
      localStorage.setItem("theme", "dark");
      updateThemeIcon("dark");
      animateThemeChange();
    }
  });

  function updateThemeIcon(theme) {
    themeIcon.style.transform = "scale(0) rotate(180deg)";
    themeIcon.style.opacity = "0";

    setTimeout(() => {
      if (theme === "dark") {
        themeIcon.className = "fas fa-moon";
      } else {
        themeIcon.className = "fas fa-sun";
      }

      themeIcon.style.transform = "scale(1) rotate(0deg)";
      themeIcon.style.opacity = "1";
    }, 200);
  }

  // Animate theme change
  function animateThemeChange() {
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = body.classList.contains("dark-mode")
      ? "#24273a" /* Macchiato Base */
      : "#eff1f5"; /* Latte Base */
    overlay.style.zIndex = "9999";
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";
    overlay.style.transition = "opacity 0.5s ease";

    document.body.appendChild(overlay);

    setTimeout(() => {
      overlay.style.opacity = "0.3";

      setTimeout(() => {
        overlay.style.opacity = "0";

        setTimeout(() => {
          document.body.removeChild(overlay);
        }, 500);
      }, 300);
    }, 0);
  }

  // Add smooth scroll behavior for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Add animation to sections when they come into view
  const sections = document.querySelectorAll("section");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });

  // Animate profile image on hover
  const profileImage = document.querySelector(".profile-image");
  if (profileImage) {
    profileImage.addEventListener("mouseover", () => {
      profileImage.style.animation = "pulse 1.5s infinite";
    });

    profileImage.addEventListener("mouseout", () => {
      profileImage.style.animation = "";
    });
  }

  // Se eliminó la animación de escritura del párrafo "Sobre mí"
  // Add parallax effect to project cards
  const projectCards = document.querySelectorAll(".project-card");
  const isMobile = window.innerWidth < 768;

  projectCards.forEach((card) => {
    // En móviles, desactivamos el efecto parallax para mejor rendimiento
    if (!isMobile) {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPercent = x / rect.width - 0.5;
        const yPercent = y / rect.height - 0.5;

        card.style.transform = `perspective(1000px) rotateY(${
          xPercent * 5
        }deg) rotateX(${yPercent * -5}deg) translateZ(10px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform =
          "perspective(1000px) rotateY(0) rotateX(0) translateZ(0)";
        setTimeout(() => {
          card.style.transform = "";
        }, 300);
      });
    } else {
      // En móviles, simplemente añadimos un efecto de elevación más simple
      card.addEventListener("touchstart", () => {
        card.style.transform = "translateY(-5px)";
        card.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.2)";
      });

      card.addEventListener("touchend", () => {
        setTimeout(() => {
          card.style.transform = "";
          card.style.boxShadow = "";
        }, 300);
      });
    }
  });

  // Add floating animation to badges
  const badge = document.querySelector(".badge");
  if (badge) {
    setInterval(() => {
      badge.style.transform = "translateY(-3px)";
      setTimeout(() => {
        badge.style.transform = "translateY(0)";
      }, 500);
    }, 3000);
  }

  // Add animated underline to links on hover
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      link.style.color = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--accent-color");
    });
    link.addEventListener("mouseleave", () => {
      link.style.color = "";
    });
  }); // Mobile menu toggle
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const nav = document.getElementById("mobile-nav");
  const mobileNavOverlay = document.querySelector(".mobile-nav-overlay");
  if (mobileMenuToggle && nav) {
    console.log("Mobile menu toggle found:", mobileMenuToggle);
    console.log("Nav element found:", nav);

    mobileMenuToggle.addEventListener("click", function (e) {
      e.stopPropagation(); // Prevenir propagación del evento
      console.log("Mobile menu toggle clicked!");
      const isExpanded = nav.classList.contains("active");
      nav.classList.toggle("active");
      console.log("Nav classes after toggle:", nav.classList);

      // Toggle overlay
      if (mobileNavOverlay) {
        mobileNavOverlay.classList.toggle("active");
      }

      // Actualizar atributos ARIA
      mobileMenuToggle.setAttribute(
        "aria-expanded",
        nav.classList.contains("active") ? "true" : "false"
      );

      // Change icon
      const icon = mobileMenuToggle.querySelector("i");
      if (nav.classList.contains("active")) {
        icon.className = "fas fa-times";
        // Prevenir scroll cuando el menú está abierto
        document.body.style.overflow = "hidden";
        mobileMenuToggle.setAttribute("aria-label", "Cerrar menú");
      } else {
        icon.className = "fas fa-bars";
        // Restaurar scroll cuando el menú está cerrado
        document.body.style.overflow = "";
        mobileMenuToggle.setAttribute("aria-label", "Abrir menú");
      }
    });

    // Cerrar el menú al hacer clic fuera de él
    document.addEventListener("click", (e) => {
      // Solo cerramos si el menú está activo y se hizo clic fuera de él
      if (
        nav &&
        nav.classList.contains("active") &&
        !nav.contains(e.target) &&
        e.target !== mobileMenuToggle &&
        !mobileMenuToggle.contains(e.target)
      ) {
        nav.classList.remove("active");
        if (mobileNavOverlay) {
          mobileNavOverlay.classList.remove("active");
        }
        mobileMenuToggle.querySelector("i").className = "fas fa-bars";
        document.body.style.overflow = "";
        mobileMenuToggle.setAttribute("aria-expanded", "false");
        mobileMenuToggle.setAttribute("aria-label", "Abrir menú");
      }
    });
  } // Close mobile menu when clicking on a link
  document.querySelectorAll("#mobile-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      if (nav && nav.classList.contains("active")) {
        nav.classList.remove("active");
        if (mobileNavOverlay) {
          mobileNavOverlay.classList.remove("active");
        }
        document.body.style.overflow = "";
        if (mobileMenuToggle) {
          mobileMenuToggle.querySelector("i").className = "fas fa-bars";
          mobileMenuToggle.setAttribute("aria-expanded", "false");
          mobileMenuToggle.setAttribute("aria-label", "Abrir menú");
        }
      }
    });
  });
  // Scroll to top button
  const scrollTopBtn = document.getElementById("scroll-top");

  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Inicializar animaciones de skills
  function initSkillsAnimation() {
    const progressBars = document.querySelectorAll(".progress");

    progressBars.forEach((bar) => {
      const width = bar.style.width;
      bar.style.width = "0";
      bar.style.setProperty("--width", width);
    });
  }

  // Ajustar comportamiento responsive en cambio de orientación o redimensionamiento
  window.addEventListener("resize", () => {
    const newIsMobile = window.innerWidth < 768;

    // Si cambia el estado de móvil/escritorio, recargamos para aplicar los comportamientos correctos
    if (newIsMobile !== isMobile && document.readyState === "complete") {
      if (nav.classList.contains("active")) {
        nav.classList.remove("active");
        document.body.style.overflow = "";
        if (mobileMenuToggle) {
          mobileMenuToggle.querySelector("i").className = "fas fa-bars";
        }
      }
    }
  });
});

// Eliminar el efecto preloader cuando todas las imágenes y recursos estén cargados
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    }, 800);
  }
});
