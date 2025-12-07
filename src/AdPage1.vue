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

      <div v-if="step1Completed && latestBlog" class="full-article-section">
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
            <p>{{ latestBlog.content }}</p>
          </div>
        </article>
      </div>

      <div v-else-if="step1Completed && !latestBlog && !isLoadingBlog" class="no-content-section">
        <p>📜 No blogs available yet. Check back soon!</p>
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
          <div id="lower-ad-holder"></div>
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
// NOTE: Assuming 'supabase' is a correctly imported module.
import { supabase } from "./supabase";

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
    // Restored the ad script loading function call from the original file, as it seems essential for ad code inclusion:
    if (typeof this.loadAdScript === 'function') {
        this.loadAdScript();
    }
    
    // This call will now correctly inject the ad and won't throw an error.
    this.loadHilTopAd();
    
    const params = new URLSearchParams(window.location.search);
    this.token = params.get("token");

    if (!this.token) {
      alert("Invalid download link.");
      return;
    }

    sessionStorage.removeItem("ad_page_1_completed");
    sessionStorage.removeItem("ad_page_2_completed");

    this.fetchLatestBlog();
    // Countdown will now start correctly as there's no JS error before it.
    this.startCountdown1(); 
    
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", this.preventBack);
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

    /**
     * Corrected function to inject the ad script into the 'container-banner-top' div.
     */
    loadHilTopAd() {
        // The ad script content
        const adScriptContent = `
(function(uhc){
var d = document,
    s = d.createElement('script'),
    l = d.scripts[d.scripts.length - 1];
s.settings = uhc || {};
s.src = "//emotional-orange.com/b.XwVhsEdsGGl/0RYuWwcp/Oezm/9cuNZ/U/l/krP/TLYr3jMrjJE/1CNujsgOtENojPc_y/MOTwU-2/OGQq";
s.async = true;
s.referrerPolicy = 'no-referrer-when-downgrade';
l.parentNode.insertBefore(s, l);
})({})
        `;

        // 1. Create the <script> tag
        const scriptElement = document.createElement("script");
        scriptElement.type = "text/javascript";
        
        // 2. Set the script's content to your ad code
        scriptElement.text = adScriptContent;

        // 3. Find the target placeholder (your first ad holder: container-banner-top)
        const targetElement = document.getElementById("container-banner-top");

        // 4. Inject the script element into the placeholder
        if (targetElement) {
            targetElement.appendChild(scriptElement);
        } else {
            console.error("Ad holder 'container-banner-top' not found.");
            // Fallback: Append to body if the placeholder is somehow missing
            document.body.appendChild(scriptElement);
        }
    },

    completeStep1() {
      this.step1Completed = true;
      this.$nextTick(() => {
        // loadBottomBanner(); // Ad loading function call remains REMOVED
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

    // *** COUNTDOWN FUNCTIONS ***
    startCountdown1() {
      if (this.intervalId1) clearInterval(this.intervalId1); // Clear any existing interval
      this.intervalId1 = setInterval(() => {
        if (this.countdown1 > 0) this.countdown1--;
        else clearInterval(this.intervalId1);
      }, 1000);
    },

    startCountdown2() {
      if (this.intervalId2) clearInterval(this.intervalId2); // Clear any existing interval
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
      // Re-start the first countdown upon recheck
      this.startCountdown1();
    }
  }
};
</script>

<style scoped>
/* All styles remain the same, ensuring compatibility with the new component structure */
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

/* FIX: Add positional context and overflow clipping to try and contain the fixed ad */
.ad-container.top-ad {
  position: relative;
  overflow: hidden;
  max-height: 90px; 
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