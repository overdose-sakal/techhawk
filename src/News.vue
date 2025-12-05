<template>
  <div class="page-container">

    <div class="ad-container">
      <div class="ad-placeholder">Ad Space: 970x90</div>
    </div>

    <h1 class="page-title">📢 Latest News</h1>

    <div class="post-grid">
      <router-link
        v-for="n in news" 
        :key="n.id" 
        :to="{ name: 'NewsDetail', params: { id: n.id } }"
        class="post-card"
      >
        <img :src="n.thumbnail" class="post-img" alt="News thumbnail" />
        <div class="post-info">
          <h2>{{ n.title }}</h2>
          <p>{{ n.content.substring(0, 150) }}...</p>
          <router-link :to="{ name: 'NewsDetail', params: { id: n.id } }" class="read-more-btn">
            Read More
          </router-link>
        </div>
      </router-link>
    </div>

  </div>
</template>

<script>
import { supabase } from "./supabase";

export default {
  data() {
    return { news: [] };
  },
  async mounted() {
    const { data } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    this.news = data || [];
  }
};
</script>

<style scoped>
/* Scoped styles ensure these only apply to the News page */
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