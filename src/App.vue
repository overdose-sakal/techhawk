<template>
  <div id="app">
    <!-- Particle Background -->
    <ParticleBackground />

    <!-- Conditionally show Header (hide on ad pages) -->
    <Header v-if="!$route.meta.hideHeader"/>

    <!-- Main content -->
    <main class="relative z-10">
      <router-view></router-view>
    </main>

    <!-- Conditionally show Footer (hide on ad pages) -->
    <footer v-if="!$route.meta.hideHeader" class="app-footer relative z-10">
      <p>&copy; {{ new Date().getFullYear() }} Tech Hawk. All rights reserved.</p>
      <div class="footer-links">
        <router-link to="/terms">Terms of Service</router-link> |
        <router-link to="/policy">Privacy Policy</router-link>
      </div>
    </footer>
  </div>
</template>

<script>
import Header from './Header.vue'
import ParticleBackground from './ParticleBackground.vue'

export default {
  name: 'App',
  components: {
    Header,
    ParticleBackground,
  },
}
</script>

<style>
:root {
  --color-bg-primary: #0d1117;
  --color-bg-secondary: #161b22;
  --color-text-light: #c9d1d9;
  --color-accent: #58a6ff;
  --color-border: #30363d;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  background-color: var(--color-bg-primary);
  color: var(--color-text-light);
  min-height: 100vh;
}

#app {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: background-color 0.3s, color 0.3s;
}

main {
  flex-grow: 1;
  padding: 20px 10px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.app-footer {
  background-color: var(--color-bg-secondary);
  color: var(--color-text-light);
  text-align: center;
  padding: 20px;
  border-top: 1px solid var(--color-border);
  font-size: 14px;
}

.footer-links a {
  color: var(--color-accent);
  text-decoration: none;
  margin: 0 10px;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: var(--color-text-light);
}

a {
  color: var(--color-accent);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

button, .read-more-btn {
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid var(--color-accent);
  background-color: transparent;
  color: var(--color-accent);
  font-size: 16px;
}

button:hover, .read-more-btn:hover {
  background-color: var(--color-accent);
  color: var(--color-bg-primary);
  box-shadow: 0 6px 20px rgba(88, 166, 255, 0.4);
  transform: translateY(-2px);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: transparent !important;
  color: var(--color-accent) !important;
  box-shadow: none !important;
  transform: none;
}

input:not([type="checkbox"], [type="radio"], [type="submit"], [type="button"]), textarea {
  padding: 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-bg-secondary);
  color: var(--color-text-light);
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
  width: 100%;
  box-sizing: border-box;
}

input:focus, textarea:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.2);
}

textarea {
  resize: vertical;
  min-height: 150px;
}

.error, .msg {
  padding: 10px;
  border-radius: 6px;
  text-align: center;
}

.error {
  color: #f85149;
  background-color: rgba(248, 81, 73, 0.1);
}

.msg {
  color: #3fb950;
  background-color: rgba(63, 185, 80, 0.1);
}
</style>