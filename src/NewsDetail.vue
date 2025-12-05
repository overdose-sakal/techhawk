<template>
  <div class="detail-container">
    <!-- Ad Banner Space 1 (Above Content) -->
    <div class="ad-container">
      <div class="ad-placeholder">Ad Space: 970x90 (Top)</div>
    </div>

    <div v-if="isLoading" class="loading-state">
      <!-- FIXED: Changed 'blog' to 'news' -->
      <p>Loading news article content...</p>
    </div>

    <div v-else-if="post" class="post-content-wrapper">
      <!-- FIXED: Changed icon from '📚' to '📰' (News) -->
      <h1 class="post-title">📰 {{ post.title }}</h1>
      <div class="post-meta">
        By: {{ post.author || 'N/A' }} | Published on: {{ formattedDate(post.created_at) }}
      </div>
      
      <img :src="post.thumbnail" class="post-image" :alt="post.title" onerror="this.onerror=null;this.src='https://placehold.co/900x450/161b22/c9d1d9?text=Image+Not+Found'" />
      
      <!-- Full Content Display -->
      <div class="post-body">
        <!-- For rich HTML content, we use v-html instead of just displaying text content -->
        <div v-html="post.content"></div>
      </div>

      <!-- FIXED: Changed link destination to '/news' -->
      <router-link to="/news" class="back-link">
        &larr; Back to All News
      </router-link>
    </div>

    <div v-else class="error-state">
      <!-- FIXED: Changed 'Blog post' to 'News article' -->
      <p>⚠️ {{ error || 'News article not found. Please check the URL.' }}</p>
      <!-- FIXED: Changed link destination to '/news' -->
      <router-link to="/news" class="back-link">
        Go to News Page
      </router-link>
    </div>

    <!-- Ad Banner Space 2 (Below Content) -->
    <div class="ad-container">
      <div class="ad-placeholder">Ad Space: 970x90 (Bottom)</div>
    </div>
  </div>
</template>

<script>
import { supabase } from "./supabase"; // Assuming supabase is accessible from here

export default {
  // Accepts the 'id' parameter from the route
  props: ['id'], 
  data() {
    return {
      post: null,
      isLoading: true,
      error: null,
    };
  },
  methods: {
    formattedDate(dateString) {
      if (!dateString) return 'N/A';
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    async fetchPost() {
      this.isLoading = true;
      this.error = null;
      this.post = null; // Clear previous post

      try {
        const { data, error } = await supabase
          // CRITICAL FIX: Query the 'news' table, not 'blogs'
          .from("news")
          .select("*")
          .eq("id", this.id)
          .single(); // Use single() for one record

        if (error) {
          throw error;
        }

        this.post = data;
      } catch (err) {
        // FIXED: Updated error message for console and state
        console.error("Error fetching news article:", err);
        this.error = "Could not load news article. It might not exist or the network failed.";
      } finally {
        this.isLoading = false;
      }
    },
  },
  // Fetch data immediately when the component is mounted
  mounted() {
    this.fetchPost();
  },
  // Watch for route changes (e.g., navigating from /full-news/1 to /full-news/2)
  watch: {
    '$route.params.id': 'fetchPost'
  }
};
</script>

<style scoped>
/* Scoped styles for the detail page - Dark Theme */
.detail-container {
  padding: 20px;
  max-width: 900px;
  margin: auto;
  min-height: 80vh;
  color: #c9d1d9; /* Light text color */
  background-color: #0d1117; /* Dark background */
}

.post-content-wrapper {
  background: #161b22;
  border-radius: 12px;
  padding: 30px;
  border: 1px solid #30363d;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
}

.post-title {
  font-size: 36px;
  color: #58a6ff; /* Accent color */
  margin-bottom: 10px;
  padding-bottom: 15px;
  border-bottom: 2px solid #21262d;
  word-break: break-word;
}

.post-meta {
  font-size: 14px;
  color: #8b949e;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px dashed #21262d;
}

.post-image {
  width: 100%;
  max-height: 450px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 25px;
  border: 1px solid #30363d;
}

.post-body {
  font-size: 18px;
  line-height: 1.8;
  color: #c9d1d9;
  /* Allows HTML content (from Quill Editor) to be rendered */
}

.post-body :deep(p) {
  margin-bottom: 20px;
}

.loading-state, .error-state {
  text-align: center;
  padding: 50px;
  font-size: 1.2em;
  color: #8b949e;
  background: #161b22;
  border-radius: 12px;
  border: 1px solid #30363d;
}

.back-link {
  display: inline-block;
  margin-top: 30px;
  padding: 10px 15px;
  background: #58a6ff;
  color: #0d1117;
  text-decoration: none;
  border-radius: 6px;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s;
}

.back-link:hover {
  background: #4695f7;
  transform: translateY(-2px);
}

@import url('./common-styles.css');
</style>