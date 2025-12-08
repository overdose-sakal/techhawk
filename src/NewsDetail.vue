<template>
  <div class="detail-container">
    <div class="ad-container">
      <div class="ad-placeholder">Ad Space: 970x90 (Top)</div>
    </div>

    <div v-if="isLoading" class="loading-state">
      <p>Loading news article content...</p>
    </div>

    <div v-else-if="post" class="post-content-wrapper">
      <h1 class="post-title">📰 {{ post.title }}</h1>
      <div class="post-meta">
        By: {{ post.author || 'N/A' }} | Published on: {{ formattedDate(post.created_at) }}
      </div>
      
      <img :src="post.thumbnail" class="post-image" :alt="post.title" onerror="this.onerror=null;this.src='https://placehold.co/900x450/161b22/c9d1d9?text=Image+Not+Found'" />
      
      <div class="post-body">
        <div v-html="sanitizedContent"></div>
      </div>

      <div class="ad-container middle-ad">
        <div class="ad-placeholder">Ad Space: 728x90 (Middle)</div>
      </div>

      <router-link to="/news" class="back-link">
        &larr; Back to All News
      </router-link>
    </div>

    <div v-else class="error-state">
      <p>⚠️ {{ error || 'News article not found. Please check the URL.' }}</p>
      <router-link to="/news" class="back-link">
        &larr; Back to All News
      </router-link>
    </div>

    <div class="ad-container">
      <div class="ad-placeholder">Ad Space: 970x250 (Bottom)</div>
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
      post: null,
      isLoading: true,
      error: null,
    };
  },
  
  // 2. Computed property for sanitized content
  computed: {
    sanitizedContent() {
      if (this.post && this.post.content) {
        return DOMPurify.sanitize(this.post.content);
      }
      return '';
    },
  },

  methods: {
    formattedDate(dateString) {
      if (!dateString) return 'N/A';
      return new Date(dateString).toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    async fetchPost() {
      this.isLoading = true;
      try {
        const postId = this.$route.params.id;
        const { data, error } = await supabase
          .from("news")
          .select("*")
          .eq("id", postId)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 is 'no rows found'
            throw error;
        }
        
        this.post = data;
        this.error = null;

      } catch (e) {
        console.error('Error fetching news article:', e);
        this.error = e.message || 'An unknown error occurred.';
        this.post = null;
      } finally {
        this.isLoading = false;
      }
    },
  },
  async mounted() {
    this.fetchPost();
  },
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