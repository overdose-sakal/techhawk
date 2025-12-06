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

    <div v-else-if="!isValidSession" class="error-overlay">
      <div class="error-box">
        <h2>⚠️ Invalid Session</h2>
        <p>Please start the download process from the beginning.</p>
        <a href="https://bollyfun.onrender.com" class="back-btn">Go Back to BollyFun</a>
      </div>
    </div>

    <div v-else class="content-wrapper">
      
      <div class="progress-indicator">
        <div class="step completed">✓</div>
        <div class="step-line completed"></div>
        <div class="step active">2</div>
        <div class="step-line"></div>
        <div class="step">3</div>
      </div>

      <h1 class="page-title">🎬 Almost There!</h1>

      <div class="ad-container top-ad">
        <div class="ad-placeholder banner-ad-placeholder">
          <div id="container-banner-top"></div>
        </div>
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

      <div v-if="step1Completed && latestNews" class="full-article-section">
        <article class="article-content">

          <h2 class="article-title">📰 {{ latestNews.title }}</h2>

          <div class="article-meta" v-if="latestNews.created_at">
            <span>{{ formattedDate(latestNews.created_at) }}</span>
          </div>

          <img 
            v-if="latestNews.thumbnail"
            :src="latestNews.thumbnail" 
            class="article-image" 
            :alt="latestNews.title"
            onerror="this.onerror=null;this.src='https://placehold.co/900x400/161b22/c9d1d9?text=No+Image'"
          />

          <div class="article-body" v-html="latestNews.content"></div>
        </article>
      </div>

      <div v-else-if="step1Completed && !latestNews && !isLoadingNews" class="no-content-section">
        <p>📰 No news available yet. Check back soon!</p>
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

          <p class="countdown-text">Generating download link...</p>
        </div>

        <button 
          v-else
          @click="goToDownload"
          class="continue-btn pulse"
          :disabled="!canContinue"
        >
          Continue
        </button>
      </div>

      <div v-if="step1Completed" class="ad-container bottom-ad">
        <div class="ad-placeholder">
          <div id="lower-ad-holder"></div>
        </div>
      </div>

      <div class="ad-container bottomest-ad">
        <div class="ad-placeholder native-ad-placeholder">
          <div id="container-d3e5f275b234c1684bbd1dd364aced62"></div>
        </div>
      </div>

      <div class="security-notice">
        <p>🔒 Secure Download | ⏱️ Link expires in {{ remainingMinutes }} minutes</p>
        <p class="small-notice">Your file will be sent via Telegram bot</p>
      </div>

    </div>
  </div>
</template>

<script>
import { supabase } from "./supabase";

/* Removed Load NEW TOP Banner Ad, ORIGINAL Native Adsterra, and HighPerformanceFormat Banner functions */

export default {
  data() {
    return {
      token: "",
      countdown1: 10,
      countdown2: 10,
      step1Completed: false,
      canContinue: false,
      adblockDetected: false,
      isValidSession: true,
      latestNews: null,
      isLoadingNews: true,
      intervalId1: null,
      intervalId2: null,
      elapsedIntervalId: null,
      elapsedMinutes: 0,
      startTime: Date.now(),
      totalTime: 10
    };
  },

  computed: {
    circleOffset1() {
      return 2 * Math.PI * 45 * (this.countdown1 / this.totalTime);
    },
    circleOffset2() {
      return 2 * Math.PI * 45 * (this.countdown2 / this.totalTime);
    },
    remainingMinutes() {
      const remaining = 60 - this.elapsedMinutes;
      return remaining > 0 ? remaining : 0;
    }
  },

  mounted() {
    // Removed all ad script loading logic from mounted hook
    

    const params = new URLSearchParams(window.location.search);
    this.token = params.get("token");

    if (!this.token) {
      this.isValidSession = false;
      return;
    }

    if (!sessionStorage.getItem("ad_page_1_completed")) {
      this.isValidSession = false;
      return;
    }

    sessionStorage.removeItem("ad_page_2_completed");

    this.fetchLatestNews();
    this.startCountdown1();
    this.trackElapsedTime();

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", this.preventBack);
  },

  beforeUnmount() {
    if (this.intervalId1) clearInterval(this.intervalId1);
    if (this.intervalId2) clearInterval(this.intervalId2);
    if (this.elapsedIntervalId) clearInterval(this.elapsedIntervalId);
    window.removeEventListener("popstate", this.preventBack);
  },

  methods: {
    async fetchLatestNews() {
      this.isLoadingNews = true;
      try {
        const { data } = await supabase
          .from("news")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        this.latestNews = data;
      } catch {
        this.latestNews = null;
      } finally {
        this.isLoadingNews = false;
      }
    },

  completeStep1() {
  this.step1Completed = true;
  this.$nextTick(() => {
    // loadBottomBanner(); // Ad loading function call removed
    this.startCountdown2();
  });
},

    formattedDate(date) {
      if (!date) return "";
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    },

    startCountdown1() {
      this.intervalId1 = setInterval(() => {
        if (this.countdown1 > 0) this.countdown1--;
        else clearInterval(this.intervalId1);
      }, 1000);
    },



    startCountdown2() {
      this.intervalId2 = setInterval(() => {
        if (this.countdown2 > 0) this.countdown2--;
        else {
          clearInterval(this.intervalId2);
          this.canContinue = true;
        }
      }, 1000);
    },

    trackElapsedTime() {
      this.elapsedIntervalId = setInterval(() => {
        this.elapsedMinutes = Math.floor((Date.now() - this.startTime) / 60000);
      }, 10000);
    },

    goToDownload() {
      if (!this.canContinue) return;

      sessionStorage.setItem("ad_page_2_completed", "true");
      window.location.href = `https://bollyfun.onrender.com/dl/${this.token}/`;
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
/* ... (Styles remain the same) ... */
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

.step.completed {
  background: #3fb950;
  color: #fff;
  font-size: 24px;
}

.step-line {
  width: 60px;
  height: 2px;
  background: #30363d;
  transition: all 0.3s;
}

.step-line.completed {
  background: #3fb950;
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

.ad-placeholder.banner-ad-placeholder {
  /* For the new 728x90 banner */
  min-height: 90px;
}

.ad-placeholder.native-ad-placeholder {
  /* Making the new bottomest ad section big */
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
  stroke: #3fb950;
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
  color: #3fb950;
}

.countdown-text {
  color: #8b949e;
  font-size: 16px;
}

.continue-btn {
  padding: 18px 50px;
  font-size: 20px;
  font-weight: bold;
  background: linear-gradient(135deg, #3fb950 0%, #2ea043 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(63, 185, 80, 0.3);
}

.continue-btn.pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 4px 15px rgba(63, 185, 80, 0.3);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 6px 25px rgba(63, 185, 80, 0.6);
  }
}

.continue-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(63, 185, 80, 0.5);
}

.continue-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  animation: none;
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
  color: #3fb950;
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
}

.article-body :deep(p) {
  margin-bottom: 20px;
}

.article-body :deep(h1),
.article-body :deep(h2),
.article-body :deep(h3) {
  color: #3fb950;
  margin-top: 30px;
  margin-bottom: 15px;
}

.article-body :deep(a) {
  color: #58a6ff;
  text-decoration: none;
}

.article-body :deep(a:hover) {
  text-decoration: underline;
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
  padding: 20px;
  background: #161b22;
  border-radius: 8px;
  border: 1px solid #30363d;
}

.security-notice p {
  margin: 5px 0;
  color: #8b949e;
  font-size: 14px;
}

.small-notice {
  font-size: 12px;
  color: #6e7681;
}

.error-overlay {
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

.error-box {
  background: #161b22;
  padding: 40px;
  border-radius: 12px;
  border: 2px solid #ff3864;
  text-align: center;
  max-width: 500px;
}

.error-box h2 {
  color: #ff3864;
  margin-bottom: 20px;
}

.back-btn {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 30px;
  background: #58a6ff;
  color: #fff;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  transition: all 0.3s;
}

.back-btn:hover {
  background: #4695f7;
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

  .continue-btn {
    padding: 15px 35px;
    font-size: 18px;
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