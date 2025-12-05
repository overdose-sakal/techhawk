<template>
  <div class="login-page-wrapper">
    
    <!-- Canvas for the Particle Background -->
    <canvas id="particle-canvas"></canvas>

    <!-- Login Card Container -->
    <div 
      :class="{ 'login-container': true, 'shake': isError }"
      @animationend="isError = false"
    >
      <h2 class="title">🔐 Admin Access</h2>

      <div class="input-group">
        <label for="email">Email</label>
        <input 
          id="email"
          v-model="email" 
          placeholder="admin@example.com" 
          type="email"
          :disabled="isLoading"
        />
      </div>

      <div class="input-group">
        <label for="password">Password</label>
        <input 
          id="password"
          v-model="password" 
          placeholder="••••••••" 
          type="password"
          :disabled="isLoading"
          @keyup.enter="login"
        />
      </div>

      <button @click="login" :disabled="isLoading" class="login-btn">
        <span v-if="isLoading" class="spinner"></span>
        {{ isLoading ? 'Logging in...' : 'Login' }}
      </button>

      <p v-if="error" class="error-message">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script>
import { supabase } from "./supabase";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
      isLoading: false,
      isError: false,
      // Variables for the particle effect
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
    cancelAnimationFrame(this.animationFrame);
    window.removeEventListener('resize', this.resizeCanvas);
  },
  methods: {
    // --- Login Logic (Kept from previous version) ---
    async login() {
      if (this.isLoading) return; 
      
      this.error = "";
      this.isError = false;
      this.isLoading = true;

      const { error } = await supabase.auth.signInWithPassword({
        email: this.email,
        password: this.password,
      });

      this.isLoading = false;

      if (error) {
        this.error = error.message;
        this.isError = true; 
      } else {
        this.email = "";
        this.password = "";
        this.$router.push("/admin");
      }
    },

    // --- Particle Field Logic ---
    initParticles() {
      this.canvas = document.getElementById('particle-canvas');
      this.ctx = this.canvas.getContext('2d');
      this.resizeCanvas();

      const numParticles = 80; // Total number of particles
      this.particles = [];

      for (let i = 0; i < numParticles; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          radius: Math.random() * 1.5 + 0.5, // Particle size
          vx: Math.random() * 0.5 - 0.25,   // Velocity X
          vy: Math.random() * 0.5 - 0.25,   // Velocity Y
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
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = 'rgba(88, 166, 255, 0.5)'; // Light blue for particles

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];

        // 1. Update position
        p.x += p.vx;
        p.y += p.vy;

        // Keep particles within bounds by wrapping them
        if (p.x < 0 || p.x > this.canvas.width) p.x = p.x < 0 ? this.canvas.width : 0;
        if (p.y < 0 || p.y > this.canvas.height) p.y = p.y < 0 ? this.canvas.height : 0;

        // 2. Draw particle
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        this.ctx.fill();

        // 3. Draw lines to nearby particles
        for (let j = i + 1; j < this.particles.length; j++) {
          const p2 = this.particles[j];
          const distance = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));

          // Only connect if they are close (max distance 100px)
          if (distance < 100) {
            const opacity = 1 - (distance / 100);
            this.ctx.strokeStyle = `rgba(88, 166, 255, ${opacity * 0.2})`; // Faint blue line
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
/*
|--------------------------------------------------
| 1. GLOBAL STYLES (Background & Canvas)
|--------------------------------------------------
*/
.login-page-wrapper {
  min-height: 100vh;
  /* Centering logic removed from wrapper to apply directly to form */
  background-color: #0d1117; 
  padding: 20px;
  position: relative; 
  overflow: hidden;
}

#particle-canvas {
  position: fixed; /* Ensures canvas covers the whole viewport */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* Keep it in the background */
}

/*
|--------------------------------------------------
| 2. LOGIN CARD STYLING (Floating above canvas)
|--------------------------------------------------
*/
.login-container {
  z-index: 1; /* Ensure card is above the canvas */
  width: 100%;
  max-width: 400px;
  
  /* --- FIX: Use absolute center positioning to prevent shifting --- */
  position: absolute; 
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* ---------------------------------------------------------------- */

  background: rgba(22, 27, 34, 0.95); /* Semi-transparent background for card */
  backdrop-filter: blur(5px); /* Creative: Blur effect for background depth */
  border-radius: 12px;
  padding: 40px;
  border: 1px solid #30363d;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: all 0.3s ease;
}

.title {
  color: #c9d1d9; 
  font-size: 24px;
  font-weight: 600;
  border-bottom: 2px solid #21262d;
  padding-bottom: 15px;
  margin-bottom: 10px;
  text-align: center;
}

/*
|--------------------------------------------------
| 3. FORM ELEMENTS
|--------------------------------------------------
*/
.input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.input-group label {
  color: #8b949e; 
  font-size: 14px;
}

input {
  padding: 12px;
  border: 1px solid #30363d;
  border-radius: 6px;
  background-color: #0d1117; 
  color: #c9d1d9;
  font-size: 16px;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
}

input:focus {
  border-color: #58a6ff; 
  box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.25);
}

/*
|--------------------------------------------------
| 4. BUTTON & MESSAGES
|--------------------------------------------------
*/
.login-btn {
  padding: 12px 20px;
  background-color: #58a6ff; 
  color: #0d1117;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s, opacity 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.login-btn:hover:not(:disabled) {
  background-color: #79b8ff;
}

.login-btn:active:not(:disabled) {
  transform: translateY(1px);
}

.login-btn:disabled {
  background-color: #30363d;
  cursor: not-allowed;
  opacity: 0.7;
}

.error-message {
  color: #f85149; 
  background-color: #210d0d;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #f8514933;
  text-align: center;
  font-size: 14px;
}

/*
|--------------------------------------------------
| 5. INTERACTIVITY CSS (Shake & Spinner)
|--------------------------------------------------
*/
@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(+2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(+4px, 0, 0); }
}

.shake {
  /* Note: We keep the shake animation, but the centering transform is defined separately in .login-container */
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
  backface-visibility: hidden;
  perspective: 1000px;
}

.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #fff;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>