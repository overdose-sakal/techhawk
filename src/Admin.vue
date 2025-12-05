<template>
  <div class="admin-container">

    <div class="dashboard-header">
      <h1 class="page-title">⚙️ Admin Dashboard</h1>
      <button @click="logout" class="logout-btn">Logout</button>
    </div>

    <div class="quick-links">
      <router-link to="/admin/add-blog" class="link-card blog-link">
        <span class="link-icon">✍️</span>
        <h3>Add New Blog</h3>
      </router-link>
      <router-link to="/admin/add-news" class="link-card news-link">
        <span class="link-icon">📰</span>
        <h3>Add News Article</h3>
      </router-link>
    </div>

    <!-- Confirmation Modal/Overlay (Custom replacement for confirm()) -->
    <div v-if="showConfirm" class="confirmation-overlay">
      <div class="confirmation-box">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this {{ deleteType }}?</p>
        <div class="confirm-actions">
          <button @click="showConfirm = false" class="cancel-btn">Cancel</button>
          <button @click="executeDelete" class="delete-btn">Confirm Delete</button>
        </div>
      </div>
    </div>

    <!-- Success/Error Message (Custom replacement for alert()) -->
    <p v-if="msg" :class="['message', msgType]">{{ msg }}</p>

    <!-- Content Management Sections -->
    <section class="content-section">
      <h2 class="section-title">Latest Blogs ({{ blogs.length }})</h2>
      <ul class="content-list">
        <li v-for="b in blogs" :key="b.id" class="list-item">
          <span class="item-title">{{ b.title }}</span>
          <!-- Using custom confirmation flow -->
          <button @click="showDeleteConfirm(b.id, 'blog')" class="action-delete-btn">Delete</button>
        </li>
      </ul>
    </section>

    <section class="content-section">
      <h2 class="section-title">Latest News ({{ news.length }})</h2>
      <ul class="content-list">
        <li v-for="n in news" :key="n.id" class="list-item">
          <span class="item-title">{{ n.title }}</span>
          <!-- Using custom confirmation flow -->
          <button @click="showDeleteConfirm(n.id, 'news')" class="action-delete-btn">Delete</button>
        </li>
      </ul>
    </section>

  </div>
</template>

<script>
import { supabase } from "./supabase";

export default {
  data() {
    return {
      blogs: [],
      news: [],
      // Confirmation state
      showConfirm: false,
      itemToDelete: null,
      deleteType: '', // 'blog' or 'news'
      // Messaging state
      msg: '',
      msgType: 'success' // 'success' or 'error'
    };
  },
  async mounted() {
    await this.fetchContent();
  },
  methods: {
    // Helper to display messages for a short time
    displayMessage(message, type = 'success') {
      this.msg = message;
      this.msgType = type;
      setTimeout(() => {
        this.msg = '';
      }, 3000);
    },

    async fetchContent() {
      try {
        const { data: blogsData, error: blogError } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
        if (blogError) throw blogError;
        this.blogs = blogsData || [];
        
        const { data: newsData, error: newsError } = await supabase.from("news").select("*").order("created_at", { ascending: false });
        if (newsError) throw newsError;
        this.news = newsData || [];
      } catch (e) {
        console.error("Error fetching content:", e.message);
        this.displayMessage(`Error loading content: ${e.message}`, 'error');
      }
    },

    showDeleteConfirm(id, type) {
      this.itemToDelete = id;
      this.deleteType = type;
      this.showConfirm = true;
    },

    async executeDelete() {
      this.showConfirm = false; // Close the confirmation box
      const id = this.itemToDelete;
      const type = this.deleteType;
      
      let error = null;
      
      if (type === 'blog') {
        ({ error } = await supabase.from("blogs").delete().eq("id", id));
        if (!error) {
          this.blogs = this.blogs.filter(b => b.id !== id);
          this.displayMessage("Blog deleted successfully!");
        }
      } else if (type === 'news') {
        ({ error } = await supabase.from("news").delete().eq("id", id));
        if (!error) {
          this.news = this.news.filter(n => n.id !== id);
          this.displayMessage("News deleted successfully!");
        }
      }

      if (error) {
        console.error("Deletion error:", error.message);
        this.displayMessage(`Error deleting ${type}: ${error.message}`, 'error');
      }

      // Reset state regardless of success/failure
      this.itemToDelete = null;
      this.deleteType = '';
    },

    async logout() {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        this.$router.push("/login");
      } catch (e) {
        console.error("Logout error:", e.message);
      }
    }
  },
};
</script>

<style scoped>
/* GENERAL ADMIN DASHBOARD STYLES */
.admin-container {
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 80vh;
  color: #c9d1d9; /* Light text */
  background-color: #0d1117; /* Dark background */
}

/* HEADER AND LOGOUT */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 2px solid #21262d;
  padding-bottom: 15px;
}

.page-title {
  font-size: 2.5em;
  color: #58a6ff; /* Accent blue */
}

.logout-btn {
  background: #ff3864; /* Warning/Danger color */
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s, transform 0.1s;
  box-shadow: 0 4px 10px rgba(255, 56, 100, 0.4);
}

.logout-btn:hover {
  background: #e32b55;
  transform: translateY(-1px);
}

/* QUICK LINKS */
.quick-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.link-card {
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 12px;
  text-decoration: none;
  color: #c9d1d9;
  background: #161b22;
  border: 1px solid #30363d;
  transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.link-card:hover {
  transform: translateY(-3px);
  border-color: #58a6ff;
  box-shadow: 0 6px 15px rgba(88, 166, 255, 0.2);
}

.link-icon {
  font-size: 2em;
  margin-right: 15px;
}

.link-card h3 {
  margin: 0;
  font-size: 1.2em;
}

/* CONTENT SECTIONS */
.content-section {
  margin-bottom: 40px;
  background: #161b22;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #30363d;
}

.section-title {
  font-size: 1.8em;
  color: #58a6ff;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px dashed #30363d;
}

.content-list {
  list-style: none;
  padding: 0;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #21262d;
}

.list-item:last-child {
  border-bottom: none;
}

.item-title {
  font-size: 1.1em;
  font-weight: 500;
  flex-grow: 1;
  word-break: break-word;
}

.action-delete-btn {
  background: #ff3864;
  color: #fff;
  border: none;
  padding: 8px 15px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9em;
  margin-left: 15px;
  transition: background 0.3s;
}

.action-delete-btn:hover {
  background: #e32b55;
}

/* CONFIRMATION OVERLAY (Custom Modal) */
.confirmation-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.confirmation-box {
  background: #161b22;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  border: 1px solid #58a6ff;
  box-shadow: 0 8px 25px rgba(88, 166, 255, 0.4);
}

.confirmation-box h3 {
  color: #ff3864;
  margin-bottom: 15px;
}

.confirm-actions {
  display: flex;
  justify-content: space-around;
  margin-top: 25px;
}

.cancel-btn {
  background: #30363d;
  color: #c9d1d9;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}
.cancel-btn:hover {
  background: #444c56;
}

.delete-btn {
  background: #ff3864;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}
.delete-btn:hover {
  background: #e32b55;
}

/* MESSAGE BOX */
.message {
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;
  animation: fadeInOut 3s forwards;
}

.success {
  background-color: #1f6f1f; /* Dark green */
  color: #d4edda; /* Light green text */
  border: 1px solid #28a745;
}

.error {
  background-color: #8b0000; /* Dark red */
  color: #f8d7da; /* Light red text */
  border: 1px solid #dc3545;
}

@keyframes fadeInOut {
  0% { opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { opacity: 0; }
}

/* RESPONSIVENESS */
@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .logout-btn {
    margin-top: 15px;
  }
  .quick-links {
    grid-template-columns: 1fr;
  }
  .list-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  .action-delete-btn {
    align-self: flex-end;
    margin-left: 0;
  }
}
</style>