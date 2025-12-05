<template>
  <div id="app">
    <!-- 1. Particle Background must be placed first to ensure it's at the lowest layer (z-index: 0) -->
    <ParticleBackground />

    <!-- 2. The rest of the content is placed on top of the particles -->
    <Header/>

    <!-- The router-view renders the component for the current route (Home, Blog, Admin, etc.) -->
    <main class="relative z-10">
      <router-view></router-view>
    </main>

    <!-- Simple Footer (Inline for now, could be its own component) -->
    <footer class="app-footer relative z-10">
      <p>&copy; {{ new Date().getFullYear() }} Tech Hawk. All rights reserved.</p>
      <div class="footer-links">
        <router-link to="/terms">Terms of Service</router-link> |
        <router-link to="/policy">Privacy Policy</router-link>
      </div>
    </footer>
  </div>
</template>

<script>
// Assuming Header.vue exists and handles the navigation bar
import Header from './Header.vue'
// Import the new ParticleBackground component
import ParticleBackground from './ParticleBackground.vue'

export default {
  name: 'App',
  components: {
    Header,
    ParticleBackground, // Register the component
  },
}
</script>

<style>
/* Global Styles (NON-SCOPED) 
  These styles define the overall look and feel, colors, and base elements 
  for the entire application, matching the dark theme established in other files.
*/

/* 1. CSS Variables for easy theme management */
:root {
  --color-bg-primary: #0d1117; /* Dark background (GitHub Dark) */
  --color-bg-secondary: #161b22; /* Slightly lighter background for elements */
  --color-text-light: #c9d1d9; /* Light gray text */
  --color-accent: #58a6ff; /* Blue accent */
  --color-border: #30363d; /* Border/separator color */
}

/* 2. Body and App container setup for full height dark theme */
body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  background-color: var(--color-bg-primary);
  color: var(--color-text-light);
  min-height: 100vh;
}

#app {
  /* IMPORTANT: Add position: relative to establish a stacking context 
     for children elements (like main and footer) to ensure they stack above the fixed canvas. */
  position: relative; 
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* Smooth transition for theme elements */
  transition: background-color 0.3s, color 0.3s;
}

/* Ensure the main content and footer have a z-index > 0 so they appear above the z-index: 0 canvas.
   I've added z-10 classes directly in the template for consistency.
*/
main {
  flex-grow: 1; /* Ensures content area takes up remaining space above the footer */
  padding: 20px 10px;
  max-width: 1200px; /* Limit main content width for readability */
  width: 100%;
  margin: 0 auto; /* Center the main content */
}

/* 3. Footer Styling */
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

/* 4. Base Link Styling */
a {
  color: var(--color-accent);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* 5. Common Button Style (matching styles found in Admin/Login/Blog) */
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

/* 6. Common Form Element Styles (For Admin/Login) */
input:not([type="checkbox"], [type="radio"], [type="submit"], [type="button"]), textarea {
  padding: 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-bg-secondary);
  color: var(--color-text-light);
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
  width: 100%; /* Full width in container */
  box-sizing: border-box; /* Include padding in width calculation */
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

/* 7. Error/Message Styling */
.error, .msg {
  padding: 10px;
  border-radius: 6px;
  text-align: center;
}

.error {
  color: #f85149; /* Red */
  background-color: rgba(248, 81, 73, 0.1);
}

.msg {
  color: #3fb950; /* Green */
  background-color: rgba(63, 185, 80, 0.1);
}
</style>