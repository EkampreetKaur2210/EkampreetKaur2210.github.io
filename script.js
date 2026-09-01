document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const menu = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav-links");
  if (menu && nav) {
    menu.addEventListener("click", () => nav.classList.toggle("open"));
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
  }

  // Floating particles
  const particles = document.createElement("div");
  particles.id = "particles";
  document.body.prepend(particles);

  const count = window.innerWidth < 700 ? 28 : 55;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "%";
    p.style.top = (70 + Math.random() * 35) + "%";
    p.style.animationDuration = (7 + Math.random() * 12) + "s";
    p.style.animationDelay = (-Math.random() * 15) + "s";
    p.style.setProperty("--dx", ((Math.random() - .5) * 220) + "px");
    p.style.transform = `scale(${.5 + Math.random() * 1.6})`;
    particles.appendChild(p);
  }

  // Scroll reveal
  const targets = document.querySelectorAll(
    ".section-heading,.about-grid,.skill-card,.timeline-item,.project-card,.credential,.contact-inner"
  );
  targets.forEach(el => el.classList.add("reveal"));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });

  targets.forEach(el => observer.observe(el));

  // Mouse-follow glow
  document.addEventListener("mousemove", e => {
    document.documentElement.style.setProperty("--mx", e.clientX + "px");
    document.documentElement.style.setProperty("--my", e.clientY + "px");
  });

  // Active navigation based on visible section
  const links = [...document.querySelectorAll(".nav-links a")];
  const sections = [...document.querySelectorAll("section[id]")];

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + entry.target.id
      ));
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach(section => sectionObserver.observe(section));

  // Small typing animation for terminal text, if a code block exists.
  const code = document.querySelector(".hero-card pre");
  if (code) {
    code.style.opacity = "0";
    code.style.transform = "translateY(8px)";
    setTimeout(() => {
      code.style.transition = "opacity .7s ease, transform .7s ease";
      code.style.opacity = "1";
      code.style.transform = "none";
    }, 500);
  }
});
