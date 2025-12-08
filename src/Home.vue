<template>
  <div class="home-container">

    <div class="ad-container">
      <div class="ad-placeholder">Ad Space: 970x90</div>
    </div>

    <div style="position: absolute; z-index: 99999">
      <input autocomplete="off" type="checkbox" id="aadsstickymix27ut4" hidden />
      <div style="padding-top: 0; padding-bottom: auto;">
        <div style="width:100%;height:auto;position:fixed;text-align:center;font-size:0;bottom:0;left:0;right:0;margin:auto">
          <label for="aadsstickymix27ut4" style="top: 50%;transform: translateY(-50%);right:24px;; position: absolute;border-radius: 4px; background: rgba(248, 248, 249, 0.70); padding: 4px;z-index: 99999;cursor:pointer">
            <svg fill="#000000" height="16px" width="16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 490">
              <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337 "/>
            </svg>
          </label>
          <div id="frame" style="width: 100%;margin: auto;position: relative; z-index: 99998;"><iframe data-aa=2419949 src="//acceptable.a-ads.com/2419949/?size=Adaptive" style='border:0; padding:0; width:70%; height:auto; overflow:hidden; margin: auto'></iframe></div>
        </div>

    </div>
  </div>

    <section class="section">
      <h2 class="section-title">✨ Latest Blogs</h2>

      <transition-group name="post-slide" tag="div" class="post-grid">
        <router-link 
          v-for="b in paginatedBlogs" 
          :key="b.id" 
          :to="{ name: 'BlogDetail', params: { id: b.id } }"
          class="post-card"
        >
          <img :src="b.thumbnail" class="post-img" alt="Blog thumbnail" />
          <div class="post-info">
            <h3>{{ b.title }}</h3>
            <p v-html="b.safeContentPreview"></p>
          </div>
        </router-link>
      </transition-group>

      <div class="carousel-pagination">
        <button 
          :disabled="blogPage === 1" 
          @click="blogPage--"
          class="nav-arrow left-arrow"
        >
          &lt;
        </button>
        <span 
          v-for="page in totalBlogPages" 
          :key="'blog-page-' + page"
          :class="{ 'dot': true, 'active': blogPage === page }"
          @click="blogPage = page"
        >
        </span>
        <button 
          :disabled="blogPage === totalBlogPages" 
          @click="blogPage++"
          class="nav-arrow right-arrow"
        >
          &gt;
        </button>
      </div>

    </section>

    <div class="ad-container">
      <div class="ad-placeholder">Ad Space: 728x90</div>
    </div>

    <section class="section">
      <h2 class="section-title">📰 Latest News</h2>

      <transition-group name="post-slide" tag="div" class="post-grid">
        <router-link 
          v-for="n in paginatedNews" 
          :key="n.id" 
          :to="{ name: 'NewsDetail', params: { id: n.id } }"
          class="post-card"
        >
          <img :src="n.thumbnail" class="post-img" alt="News thumbnail" />
          <div class="post-info">
            <h3>{{ n.title }}</h3>
            <p v-html="n.safeContentPreview"></p>
          </div>
        </router-link>
      </transition-group>

      <div class="carousel-pagination">
        <button 
          :disabled="newsPage === 1" 
          @click="newsPage--"
          class="nav-arrow left-arrow"
        >
          &lt;
        </button>
        <span 
          v-for="page in totalNewsPages" 
          :key="'news-page-' + page"
          :class="{ 'dot': true, 'active': newsPage === page }"
          @click="newsPage = page"
        >
        </span>
        <button 
          :disabled="newsPage === totalNewsPages" 
          @click="newsPage++"
          class="nav-arrow right-arrow"
        >
          &gt;
        </button>
      </div>

    </section>

  </div>
</template>

<script>
// NOTE: Ensure your local environment has the correct path to supabase.js
import { supabase } from "./supabase";
import DOMPurify from 'dompurify';

export default {
  data() {
    return {
      blogs: [],
      news: [],

      // Pagination/Carousel State
      blogPage: 1,
      newsPage: 1,
      // Fixed to 3 for the 'latest 3' carousel request
      perPage: 3, 
    };
  },

  computed: {
    // Combines pagination and content sanitation for blogs
    paginatedBlogs() {
      // Logic for displaying only the current "slide" (3 items)
      const start = (this.blogPage - 1) * this.perPage;
      // Slice the array, then map/sanitize the content
      return this.blogs.slice(start, start + this.perPage).map(b => ({
        ...b,
        // Sanitize the substring content before rendering
        safeContentPreview: DOMPurify.sanitize(b.content.substring(0, 80) + '...')
      }));
    },
    // Combines pagination and content sanitation for news
    paginatedNews() {
      // Logic for displaying only the current "slide" (3 items)
      const start = (this.newsPage - 1) * this.perPage;
      // Slice the array, then map/sanitize the content
      return this.news.slice(start, start + this.perPage).map(n => ({
        ...n,
        // Sanitize the substring content before rendering
        safeContentPreview: DOMPurify.sanitize(n.content.substring(0, 80) + '...')
      }));
    },
    totalBlogPages() {
      return Math.ceil(this.blogs.length / this.perPage);
    },
    totalNewsPages() {
      return Math.ceil(this.news.length / this.perPage);
    },
  },

  async mounted() {
    // Fetch blogs
    const { data: blogs } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    // Fetch news
    const { data: news } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    this.blogs = blogs || [];
    this.news = news || [];
  },
};
</script>

<style>
/* 1. Base & Layout
*/
      #aadsstickymix27ut4:checked + div {
        display: none;
      }

body {
  margin: 0;
  background-color: #0d1117; /* Dark background */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.home-container {
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  color: #c9d1d9; /* Light text color */
}

/* 2. Section Titles
*/
.section-title {
  margin: 40px 0 20px;
  font-size: 28px;
  border-bottom: 2px solid #21262d;
  padding-bottom: 8px;
  color: #58a6ff; /* Accent color for title */
  font-weight: 700;
}

/* 3. Grid / Carousel View
*/
.post-grid {
  display: grid;
  /* Always show 3 columns on desktop, 1 on mobile */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
  gap: 20px;
  min-height: 400px; /* Prevent layout shift while loading */
}

/* 4. Card Styles
*/
.post-card {
  background: #161b22; /* Slightly darker than background */
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #30363d;
  transition: all 0.3s ease;
  cursor: pointer;
  /* Add this to remove default router-link underline/color */
  text-decoration: none;
  color: inherit;
}

.post-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border-color: #58a6ff;
}

/* Image */
.post-img {
  width: 100%;
  height: 200px; /* Taller image for better impact */
  object-fit: cover;
  border-bottom: 1px solid #30363d;
}

/* Info */
.post-info {
  padding: 15px;
}

.post-info h3 {
  margin-bottom: 8px;
  font-size: 18px;
  color: #58a6ff;
  line-height: 1.4;
}

.post-info p {
  opacity: 0.8;
  font-size: 14px;
  color: #c9d1d9;
}

/* 5. Carousel Pagination (Dots and Arrows)
*/
.carousel-pagination {
  margin: 40px 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.dot {
  width: 10px;
  height: 10px;
  background: #30363d;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
}

.dot:hover {
  background: #58a6ff;
}

.dot.active {
  background: #58a6ff;
  transform: scale(1.2);
}

.nav-arrow {
  background: transparent;
  border: 1px solid #30363d;
  color: #c9d1d9;
  font-size: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.nav-arrow:hover {
  background: #58a6ff;
  color: #0d1117;
  border-color: #58a6ff;
}

.nav-arrow:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  background: transparent;
  color: #c9d1d9;
}

/* 6. Ad placeholders
*/
.ad-container {
  margin: 30px 0;
  text-align: center;
}

.ad-placeholder {
  width: 100%;
  max-width: 970px;
  height: 90px;
  margin: auto;
  background: #1b1b22;
  border: 2px dashed #30363d;
  color: #777;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-size: 14px;
}

/* 7. Transition (Optional: for a small slide effect)
*/
.post-slide-enter-active, .post-slide-leave-active {
  transition: all 0.5s ease;
}
.post-slide-enter-from, .post-slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.post-slide-leave-active {
  position: absolute; /* Allows for smooth element removal */
}
</style>

<!-- <style>
/* 1. Base & Layout
*/
body {
  margin: 0;
  background-color: #0d1117; /* Dark background */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.home-container {
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  color: #c9d1d9; /* Light text color */
}

/* 2. Section Titles
*/
.section-title {
  margin: 40px 0 20px;
  font-size: 28px;
  border-bottom: 2px solid #21262d;
  padding-bottom: 8px;
  color: #58a6ff; /* Accent color for title */
  font-weight: 700;
}

/* 3. Grid / Carousel View
*/
.post-grid {
  display: grid;
  /* Always show 3 columns on desktop, 1 on mobile */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
  gap: 20px;
  min-height: 400px; /* Prevent layout shift while loading */
}

/* 4. Card Styles
*/
.post-card {
  background: #161b22; /* Slightly darker than background */
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #30363d;
  transition: all 0.3s ease;
  cursor: pointer;
  /* Add this to remove default router-link underline/color */
  text-decoration: none;
  color: inherit;
}

.post-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border-color: #58a6ff;
}

/* Image */
.post-img {
  width: 100%;
  height: 200px; /* Taller image for better impact */
  object-fit: cover;
  border-bottom: 1px solid #30363d;
}

/* Info */
.post-info {
  padding: 15px;
}

.post-info h3 {
  margin-bottom: 8px;
  font-size: 18px;
  color: #58a6ff;
  line-height: 1.4;
}

.post-info p {
  opacity: 0.8;
  font-size: 14px;
  color: #c9d1d9;
}

/* 5. Carousel Pagination (Dots and Arrows)
*/
.carousel-pagination {
  margin: 40px 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.dot {
  width: 10px;
  height: 10px;
  background: #30363d;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
}

.dot:hover {
  background: #58a6ff;
}

.dot.active {
  background: #58a6ff;
  transform: scale(1.2);
}

.nav-arrow {
  background: transparent;
  border: 1px solid #30363d;
  color: #c9d1d9;
  font-size: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.nav-arrow:hover {
  background: #58a6ff;
  color: #0d1117;
  border-color: #58a6ff;
}

.nav-arrow:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  background: transparent;
  color: #c9d1d9;
}

/* 6. Ad placeholders
*/
.ad-container {
  margin: 30px 0;
  text-align: center;
}

.ad-placeholder {
  width: 100%;
  max-width: 970px;
  height: 90px;
  margin: auto;
  background: #1b1b22;
  border: 2px dashed #30363d;
  color: #777;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-size: 14px;
}

/* 7. Transition (Optional: for a small slide effect)
*/
.post-slide-enter-active, .post-slide-leave-active {
  transition: all 0.5s ease;
}
.post-slide-enter-from, .post-slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.post-slide-leave-active {
  position: absolute; /* Allows for smooth element removal */
}
</style> -->