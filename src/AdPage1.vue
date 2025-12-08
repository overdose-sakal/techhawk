<template>
  <div class="ad-page-container">
    
    <div v-if="adblockDetected" class="adblock-overlay">
      <div class="adblock-warning">
        <h2>⚠️ Ad Blocker Detected</h2>
        <p>Please disable your ad blocker to continue downloading.</p>
        <p class="small-text">This helps us keep the service free!</p>
        <button @click="recheckAdblock" class="retry-btn">I've Disabled It</button>
      </div>
    </div>

    <div v-else class="content-wrapper">
      
      <div class="progress-indicator">
        <div class="step active">1</div>
        <div class="step-line"></div>
        <div class="step">2</div>
        <div class="step-line"></div>
        <div class="step">3</div>
      </div>

      <h1 class="page-title">🎬 Preparing Your Download</h1>

      <div class="ad-container top-ad">
        <iframe src="//a.magsrv.com/iframe.php?idzone=5792822&size=900x250" width="900" height="250" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>
      </div>

      <div class="ad-container banner-two">
        <iframe src="//a.magsrv.com/iframe.php?idzone=5792828&size=300x250" width="300" height="250" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>
      </div>

      <div class="timer-section">
        <div v-if="countdown1 > 0" class="countdown-display">

          <div class="countdown-circle">
            <svg class="countdown-svg" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" class="countdown-bg"></circle>
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                class="countdown-progress"
                :style="{ strokeDashoffset: circleOffset1 }"
              ></circle>
            </svg>
            <div class="countdown-number">{{ countdown1 }}</div>
          </div>

          <p class="countdown-text">Please wait...</p>
        </div>

        <button 
          v-else-if="!step1Completed"
          @click="completeStep1"
          class="continue-btn"
        >
          Verify as a Human
        </button>
      </div>

      <div v-if="step1Completed" class="article-ad-sidebar-layout">
        
        <div v-if="latestBlog" class="ad-container vertical-ad left-ad">
          <iframe src="//a.magsrv.com/iframe.php?idzone=5792832&size=160x600" width="160" height="600" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>
        </div>
        
        <div v-if="latestBlog" class="full-article-section">
          <article class="article-content">
            <h2 class="article-title">📚 {{ latestBlog.title }}</h2>

            <div class="article-meta" v-if="latestBlog.created_at">
              <span>{{ formattedDate(latestBlog.created_at) }}</span>
            </div>

            <img 
              v-if="latestBlog.thumbnail"
              :src="latestBlog.thumbnail" 
              class="article-image" 
              :alt="latestBlog.title"
              onerror="this.onerror=null;this.src='https://placehold.co/900x400/161b22/c9d1d9?text=No+Image'"
            />

            <div class="article-body">
              <div v-html="sanitizedBlogContent"></div>
            </div>
          </article>
        </div>

        <div v-else-if="!latestBlog && !isLoadingBlog" class="no-content-section">
          <p>📜 No blogs available yet. Check back soon!</p>
        </div>
        <div v-if="latestBlog" class="ad-container vertical-ad right-ad">
          <iframe src="//a.magsrv.com/iframe.php?idzone=5792834&size=160x600" width="160" height="600" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>
        </div>

      </div>
      <div v-if="step1Completed" class="ad-container banner-three">
        <iframe src="//a.magsrv.com/iframe.php?idzone=5792830&size=300x500" width="300" height="500" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>
      </div>
      
      <div v-if="step1Completed" class="timer-section">
        <div v-if="countdown2 > 0" class="countdown-display">

          <div class="countdown-circle">
            <svg class="countdown-svg" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" class="countdown-bg"></circle>
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                class="countdown-progress"
                :style="{ strokeDashoffset: circleOffset2 }"
              ></circle>
            </svg>
            <div class="countdown-number">{{ countdown2 }}</div>
          </div>

          <p class="countdown-text">Almost ready...</p>
        </div>
        
        <button 
          v-else
          @click="goToNextPage"
          class="continue-btn"
          :disabled="!canContinue"
        >
          Continue
        </button>
      </div>

      <div v-if="step1Completed" class="ad-container bottom-ad">
        <div class="ad-placeholder">
          <div id="my-ad-slot"></div>
        </div>
      </div>
      
      <div class="ad-container bottomest-ad">
        <div class="ad-placeholder native-ad-placeholder">
          <div id="container-d3e5f275b234c1684bbd1dd364aced62"></div>
        </div>
      </div>

      <div class="security-notice">
        <p>🔒 Secure Download | ⏳ Link expires in 60 minutes</p>
      </div>

    </div>
  </div>
</template>

<script>
import { supabase } from "./supabase";
// 1. Import DOMPurify
import DOMPurify from 'dompurify';

export default {
  data() {
    return {
      token: "",
      countdown1: 10,
      countdown2: 10,
      step1Completed: false,
      canContinue: false,
      adblockDetected: false,
      latestBlog: null,
      isLoadingBlog: true,
      intervalId1: null,
      intervalId2: null,
      totalTime: 10
    };
  },

  computed: {
    // 2. Computed property for sanitizing the blog content
    sanitizedBlogContent() {
      if (this.latestBlog && this.latestBlog.content) {
        return DOMPurify.sanitize(this.latestBlog.content);
      }
      return '';
    },
    circleOffset1() {
      const circ = 2 * Math.PI * 45;
      return circ * (this.countdown1 / this.totalTime);
    },
    circleOffset2() {
      const circ = 2 * Math.PI * 45;
      return circ * (this.countdown2 / this.totalTime);
    }
  },

  mounted() {
    if (typeof this.loadAdScript === 'function') {
        this.loadAdScript();
    }
    
    // Call the new sticky ad loader
    this.loadStickyAd();
    
    const params = new URLSearchParams(window.location.search);
    this.token = params.get("token");

    if (!this.token) {
      alert("Invalid download link.");
      return;
    }

    sessionStorage.removeItem("ad_page_1_completed");
    sessionStorage.removeItem("ad_page_2_completed");

    this.fetchLatestBlog();
    this.startCountdown1(); 
    
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", this.preventBack);


          const container = document.getElementById("my-ad-slot");
  const script = document.createElement("script");

  script.src = "//emotional-orange.com/biX.V/sgdDGrlH0sY/WKcw/SenmG9BuaZRU/l_kLPQTIYi3OMvjZEY2ENXD-IltLNojAc/ysMVTaYi0tMrwX";
  script.async = true;
  script.referrerPolicy = "no-referrer-when-downgrade";

  container.appendChild(script);
  },

  beforeUnmount() {
    if (this.intervalId1) clearInterval(this.intervalId1);
    if (this.intervalId2) clearInterval(this.intervalId2);
    window.removeEventListener("popstate", this.preventBack);
  },

  methods: {
    async fetchLatestBlog() {
      this.isLoadingBlog = true;
      try {
        const { data } = await supabase
          .from("blogs")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        this.latestBlog = data;
      } catch (error) {
        console.error("Blog fetch failed:", error);
      } finally {
        this.isLoadingBlog = false;
      }
    },

    // New method to load the sticky banner script and HTML
    loadStickyAd() {
      // 1. Create the async script tag (ad-provider.js)
      const script1 = document.createElement("script");
      script1.async = true;
      script1.type = "application/javascript";
      script1.src = "https://a.magsrv.com/ad-provider.js";
      document.body.appendChild(script1);

      // 2. Create the ins tag for the ad slot
      const insTag = document.createElement("ins");
      insTag.className = "eas6a97888e17";
      insTag.setAttribute("data-zoneid", "5792836");
      document.body.appendChild(insTag);

      // 3. Create the inline serving script
      const script2 = document.createElement("script");
      script2.innerHTML = '(AdProvider = window.AdProvider || []).push({"serve": {}});';
      document.body.appendChild(script2);
    },

    // loadHilTopAd function removed as the top ad is now an iframe
    
    completeStep1() {
      this.step1Completed = true;
      this.$nextTick(() => {
        this.startCountdown2();
      });
    },
// ... (rest of methods remain the same)

    formattedDate(date) {
      if (!date) return "";
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    },

    startCountdown1() {
      if (this.intervalId1) clearInterval(this.intervalId1);
      this.intervalId1 = setInterval(() => {
        if (this.countdown1 > 0) this.countdown1--;
        else clearInterval(this.intervalId1);
      }, 1000);
    },

    startCountdown2() {
      if (this.intervalId2) clearInterval(this.intervalId2);
      this.intervalId2 = setInterval(() => {
        if (this.countdown2 > 0) this.countdown2--;
        else {
          clearInterval(this.intervalId2);
          this.canContinue = true;
        }
      }, 1000);
    },

    goToNextPage() {
      if (!this.canContinue) return;

      sessionStorage.setItem("ad_page_1_completed", "true");

      const params = new URLSearchParams(window.location.search);
      window.location.href = `/ad-page-2?token=${this.token}&title=${params.get(
        "title"
      )}&quality=${params.get("quality")}`;
    },

    preventBack() {
      window.history.pushState(null, "", window.location.href);
    },

    recheckAdblock() {
      this.adblockDetected = false;
      this.startCountdown1();
    }
  }
};
</script>

<style scoped>

  .article-ad-sidebar-layout {
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Aligns items to the top */
  max-width: 1280px; /* Adjust as needed */
  margin: 50px auto;
  gap: 20px; /* Space between ads and article */
}

/* Ensure the article section takes the remaining space in the center */
.article-ad-sidebar-layout .full-article-section,
.article-ad-sidebar-layout .no-content-section {
    flex-grow: 1;
    max-width: 900px; /* Max width of the article */
}

/* Ensure vertical ads don't take up too much space when not visible or on small screens */
.ad-container.vertical-ad {
  flex-shrink: 0;
  width: 160px;
  height: 600px;
}
/*
 * *** FIX: AGGRESSIVE CSS CONTAINMENT ***
 * These styles force the banner size and use position: relative/overflow: hidden
 * to prevent the fixed ad script from escaping to the bottom of the page.
*/
.ad-container.top-ad {
  position: relative; /* Essential for containing fixed children */
  overflow: hidden; /* Essential for clipping out-of-bounds fixed content */
  margin: 30px auto; /* Center the whole block */
  display: flex;
  justify-content: center;
  
  /* EXPLICIT SIZE MATCHING 728x90 BANNER */
height: 250px; /* Increased from 90px to match iframe */
  max-height: 250px;
  width: 100%;
  max-width: 900px;
  z-index: 10; /* Make sure it stacks above most elements */
}

.ad-placeholder.banner-ad-placeholder {
  /* EXPLICIT SIZE MATCHING 728x90 BANNER */
  height: 90px;
  min-height: 90px;
  max-width: 728px;
}

/* Base styles (kept for completeness) */
.ad-page-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0d1117 0%, #161b22 100%);
  color: #c9d1d9;
  padding: 20px;
}

.content-wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px 20px;
}

.progress-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  gap: 10px;
}

.step {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #30363d;
  color: #8b949e;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  transition: all 0.3s;
}

.step.active {
  background: #58a6ff;
  color: #0d1117;
  box-shadow: 0 0 20px rgba(88, 166, 255, 0.5);
}

.step-line {
  width: 60px;
  height: 2px;
  background: #30363d;
}

.page-title {
  text-align: center;
  font-size: 32px;
  color: #58a6ff;
  margin-bottom: 40px;
}

.ad-container {
  margin: 30px 0;
  display: flex;
  justify-content: center;
}

.ad-placeholder {
  min-height: 90px;
  width: 100%;
  max-width: 728px;
  background: #161b22;
  border: 2px dashed #30363d;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ad-placeholder.native-ad-placeholder {
  min-height: 250px; 
  max-width: 900px;
}

.placeholder-text {
  color: #8b949e;
  font-size: 14px;
}

.timer-section {
  margin: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.countdown-display {
  text-align: center;
}

.countdown-circle {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto 20px;
}

.countdown-svg {
  transform: rotate(-90deg);
  width: 100%;
  height: 100%;
}

.countdown-bg {
  fill: none;
  stroke: #30363d;
  stroke-width: 8;
}

.countdown-progress {
  fill: none;
  stroke: #58a6ff;
  stroke-width: 8;
  stroke-dasharray: 283;
  transition: stroke-dashoffset 1s linear;
  stroke-linecap: round;
}

.countdown-number {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 48px;
  font-weight: bold;
  color: #58a6ff;
}

.countdown-text {
  color: #8b949e;
  font-size: 16px;
}

.continue-btn {
  padding: 15px 40px;
  font-size: 18px;
  font-weight: bold;
  background: linear-gradient(135deg, #58a6ff 0%, #4695f7 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(88, 166, 255, 0.3);
}

.continue-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(88, 166, 255, 0.5);
}

.continue-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* Full Article Section */
.full-article-section {
  margin: 50px 0;
}

.article-content {
  background: #161b22;
  border-radius: 12px;
  padding: 40px;
  border: 1px solid #30363d;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.article-title {
  font-size: 36px;
  color: #58a6ff;
  margin: 0 0 15px 0;
  padding-bottom: 15px;
  border-bottom: 2px solid #21262d;
  line-height: 1.4;
}

.article-meta {
  font-size: 14px;
  color: #8b949e;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px dashed #21262d;
}

.article-image {
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 30px;
  border: 1px solid #30363d;
}

.article-body {
  font-size: 18px;
  line-height: 1.8;
  color: #c9d1d9;
  white-space: pre-wrap;
}

.article-body p {
  margin-bottom: 20px;
}

.no-content-section {
  text-align: center;
  padding: 40px;
  margin: 50px 0;
  background: #161b22;
  border-radius: 12px;
  border: 1px solid #30363d;
}

.no-content-section p {
  color: #8b949e;
  font-size: 18px;
  margin: 0;
}

.security-notice {
  text-align: center;
  margin-top: 40px;
  padding: 15px;
  background: #161b22;
  border-radius: 8px;
  border: 1px solid #30363d;
}

.security-notice p {
  margin: 0;
  color: #8b949e;
  font-size: 14px;
}

.adblock-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(13, 17, 23, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.adblock-warning {
  background: #161b22;
  padding: 40px;
  border-radius: 12px;
  border: 2px solid #ff3864;
  text-align: center;
  max-width: 500px;
}

.adblock-warning h2 {
  color: #ff3864;
  margin-bottom: 20px;
}

.adblock-warning p {
  margin-bottom: 15px;
}

.small-text {
  font-size: 14px;
  color: #8b949e;
}

.retry-btn {
  margin-top: 20px;
  padding: 12px 30px;
  background: #58a6ff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.retry-btn:hover {
  background: #4695f7;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 24px;
  }
  
  .ad-placeholder {
    max-width: 100%;
    min-height: 60px;
  }
  
  .step-line {
    width: 30px;
  }

  .article-content {
    padding: 25px;
  }

  .article-title {
    font-size: 28px;
  }

  .article-body {
    font-size: 16px;
  }

  .article-image {
    max-height: 300px;
  }

  .ad-placeholder.native-ad-placeholder {
    min-height: 150px;
  }
}
</style>