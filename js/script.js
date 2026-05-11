/**
 * 3D Luxury Button Bar - Interactions
 * Features: Background particles, liquid fill animation, and mouse-following glow.
 */

document.addEventListener("DOMContentLoaded", () => {
  initParticles();
  initLiquidButtons();
  initMouseGlow();
});

/**
 * Background Particles (Soft Bokeh Orbs)
 */
function initParticles() {
  const canvas = document.getElementById("particle-canvas");
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 5 + 1;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (
        this.x < 0 ||
        this.x > canvas.width ||
        this.y < 0 ||
        this.y > canvas.height
      ) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 160, 23, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

/**
 * Liquid Fill Animation for Buttons
 */
function initLiquidButtons() {
  const buttons = document.querySelectorAll(".luxury-btn");

  buttons.forEach((btn) => {
    const canvas = btn.querySelector(".liquid-canvas");
    const ctx = canvas.getContext("2d");
    let width, height;
    let progress = 0;
    let isHovered = false;
    let animationId;

    function resize() {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    }

    resize();
    window.addEventListener("resize", resize);

    function drawLiquid() {
      ctx.clearRect(0, 0, width, height);

      if (progress <= 0 && !isHovered) return;

      // Liquid color (Gold gradient)
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#d4a017");
      gradient.addColorStop(0.5, "#f7e08a");
      gradient.addColorStop(1, "#8e6d10");

      ctx.fillStyle = gradient;

      // Wave calculation
      const waveHeight = 10;
      const waveSpeed = 0.1;
      const time = Date.now() * waveSpeed;

      ctx.beginPath();
      ctx.moveTo(0, height);

      const fillLevel = height - height * progress;

      for (let x = 0; x <= width; x++) {
        const y =
          fillLevel +
          Math.sin(x * 0.05 + time * 0.1) * waveHeight * (1 - progress);
        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // Update progress
      if (isHovered) {
        progress += (1 - progress) * 0.1;
      } else {
        progress *= 0.9;
      }

      animationId = requestAnimationFrame(drawLiquid);
    }

    btn.addEventListener("mouseenter", () => {
      isHovered = true;
      if (!animationId) drawLiquid();
    });

    btn.addEventListener("mouseleave", () => {
      isHovered = false;
    });
  });
}

/**
 * Mouse Following Glow Effect
 */
function initMouseGlow() {
  const wrapper = document.querySelector(".button-bar-wrapper");
  const glow = document.getElementById("mouse-glow");

  wrapper.addEventListener("mousemove", (e) => {
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;
  });
}
