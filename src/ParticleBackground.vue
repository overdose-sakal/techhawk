<template>
  <canvas id="global-particle-canvas"></canvas>
</template>

<script>
export default {
  name: 'ParticleBackground',
  data() {
    return {
      canvas: null,
      ctx: null,
      particles: [],
      animationFrame: null,
    };
  },
  mounted() {
    this.initParticles();
    window.addEventListener('resize', this.resizeCanvas);
  },
  beforeUnmount() {
    // Clean up the animation and listener when the component is destroyed
    cancelAnimationFrame(this.animationFrame);
    window.removeEventListener('resize', this.resizeCanvas);
  },
  methods: {
    initParticles() {
      this.canvas = document.getElementById('global-particle-canvas');
      this.ctx = this.canvas.getContext('2d');
      this.resizeCanvas();

      const numParticles = 80;
      this.particles = [];

      for (let i = 0; i < numParticles; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          vx: Math.random() * 0.5 - 0.25,
          vy: Math.random() * 0.5 - 0.25,
        });
      }

      this.animateParticles();
    },

    resizeCanvas() {
      if (this.canvas) {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
      }
    },

    drawParticles() {
      if (!this.ctx || !this.canvas) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = 'rgba(88, 166, 255, 0.5)';

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];

        // 1. Update position
        p.x += p.vx;
        p.y += p.vy;

        // Keep particles within bounds by wrapping them
        if (p.x < 0 || p.x > this.canvas.width) p.x = p.x < 0 ? this.canvas.width : 0;
        if (p.y < 0 || p.y > this.canvas.height) p.x = p.y < 0 ? this.canvas.height : 0;

        // 2. Draw particle
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        this.ctx.fill();

        // 3. Draw lines to nearby particles
        for (let j = i + 1; j < this.particles.length; j++) {
          const p2 = this.particles[j];
          const distance = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));

          if (distance < 100) {
            const opacity = 1 - (distance / 100);
            this.ctx.strokeStyle = `rgba(88, 166, 255, ${opacity * 0.2})`;
            this.ctx.lineWidth = 0.5;
            this.ctx.beginPath();
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.stroke();
          }
        }
      }
    },

    animateParticles() {
      this.drawParticles();
      this.animationFrame = requestAnimationFrame(this.animateParticles);
    }
  },
};
</script>

<style scoped>
#global-particle-canvas {
  position: fixed; /* Ensures canvas covers the whole viewport */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* Keep it in the absolute background */
  pointer-events: none;
}
</style>