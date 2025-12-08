<template>
  <div class="page-container">

    <div class="ad-container">
      <div class="ad-placeholder">Ad Space: 970x90</div>
    </div>

    <h1 class="page-title">📚 All Blogs</h1>

    <div class="post-grid">
      <router-link
        v-for="b in sanitizedBlogs" 
        :key="b.id" 
        :to="{ name: 'BlogDetail', params: { id: b.id } }"
        class="post-card"
      >
        <img :src="b.thumbnail" class="post-img" alt="Blog thumbnail" />
        <div class="post-info">
          <h2>{{ b.title }}</h2>
          <p v-html="b.safeContentPreview"></p> 
          <router-link :to="{ name: 'BlogDetail', params: { id: b.id } }" class="read-more-btn">
            Read More
          </router-link>
        </div>
      </router-link>
    </div>

  </div>
</template>

<script>
import { supabase } from "./supabase";
// Import DOMPurify
import DOMPurify from 'dompurify';

export default {
  data() {
    return { blogs: [] };
  },
  computed: {
    // Create computed property to sanitize content previews
    sanitizedBlogs() {
      // Map over the blogs to sanitize the substring and add a new safeContentPreview property
      return this.blogs.map(b => ({
        ...b,
        safeContentPreview: DOMPurify.sanitize(b.content.substring(0, 150) + '...')
      }));
    }
  },
  async mounted() {
    const { data } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    this.blogs = data || [];
  }
};
</script>


<style scoped>
/* Scoped styles ensure these only apply to the Blog page */
@import url('./common-styles.css');

/* Add style for the router-link wrapping the card */
.post-card {
  text-decoration: none; /* Remove underline */
  color: inherit; /* Inherit text color */
  /* Ensure the existing post-card styles (from Home.vue) are applied */
}

/* Style the 'Read More' link to look like a button */
.read-more-btn {
  display: inline-block;
  background-color: #58a6ff;
  color: #0d1117;
  padding: 8px 15px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.read-more-btn:hover {
  background-color: #79c0ff;
}
</style>