document.addEventListener("DOMContentLoaded", () => {
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
      ? "#0a1929"
      : "#ffffff";
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

  projectCards.forEach((card) => {
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
  });
});
