<template>
  <div class="form-wrapper">
    <div class="form-container">
      <h2 class="form-title">📰 Add New News Article</h2>

      <input 
        v-model="title" 
        placeholder="Title of the News Article" 
        class="input-field"
      />
      
      <!-- Quill Editor for Rich Content Editing -->
      <QuillEditor 
        v-model:content="content" 
        contentType="html" 
        placeholder="Write your main article content here..." 
        theme="snow" 
        class="quill-editor-custom"
        :toolbar="[
          ['bold', 'italic', 'underline', 'strike'], 
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'color': [] }, { 'background': [] }],
          ['link', 'image']
        ]"
      />
      
      <input 
        v-model="thumbnail" 
        placeholder="Thumbnail Image URL (e.g., https://placehold.co/800x400)"
        class="input-field"
      />

      <button @click="submitNews" class="publish-btn" :disabled="!title || !content || !thumbnail">
        {{ isSubmitting ? 'Publishing...' : 'Publish News' }}
      </button>

      <p v-if="msg" :class="['message', msgType]">{{ msg }}</p>
      
      <!-- Back Link -->
      <router-link to="/admin" class="back-link">
        &larr; Back to Dashboard
      </router-link>
    </div>
  </div>
</template>

<script>
// 1. IMPORT QuillEditor and its default 'snow' theme CSS
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { supabase } from "./supabase";

export default {
  // 2. REGISTER the component
  components: {
    QuillEditor,
  },
  data() {
    return {
      title: "",
      content: "", 
      thumbnail: "",
      msg: "",
      msgType: 'success',
      isSubmitting: false,
    };
  },
  methods: {
    async submitNews() {
      if (!this.title || !this.content || !this.thumbnail) {
        this.msg = "Please fill in all fields.";
        this.msgType = 'error';
        return;
      }
      
      this.isSubmitting = true;
      this.msg = '';

      try {
        const { error } = await supabase.from("news").insert({
          title: this.title,
          content: this.content,
          thumbnail: this.thumbnail,
          author: "Admin"
        });

        if (error) {
          this.msg = error.message;
          this.msgType = 'error';
          console.error("Supabase error:", error.message);
        } else {
          this.msg = "News Published successfully! Redirecting...";
          this.msgType = 'success';
          // Clear form after success
          this.title = "";
          this.content = "";
          this.thumbnail = "";
          
          setTimeout(() => {
            this.$router.push("/admin");
          }, 1500);
        }
      } catch (e) {
        this.msg = "An unexpected error occurred.";
        this.msgType = 'error';
        console.error("Submission error:", e);
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
</script>

<style scoped>
.form-wrapper {
  padding: 30px;
  min-height: 80vh;
  background-color: #0d1117; /* Dark background */
}

.form-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px;
  background: #161b22; /* Slightly lighter dark card background */
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-title {
  color: #58a6ff; /* Accent blue */
  font-size: 2em;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #30363d;
}

/* INPUT FIELD STYLING */
.input-field {
  padding: 12px 15px;
  border: 1px solid #30363d;
  border-radius: 8px;
  background-color: #0d1117; /* Dark input background */
  color: #c9d1d9; /* Light text color */
  font-size: 1em;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.input-field:focus {
  outline: none;
  border-color: #58a6ff;
  box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.3);
}

/* QUILL EDITOR CUSTOM STYLES */
/* Ensure the editor itself has some height and uses a dark background */
.quill-editor-custom {
    min-height: 300px; /* Give it a good editing height */
    margin-bottom: 15px;
}

/* Target the actual editing area and toolbar within the 'snow' theme */
/* Light text on dark background for the editor content area */
:deep(.ql-container.ql-snow) {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border: 1px solid #30363d;
    background-color: #0d1117; /* Very dark background for content area */
}
:deep(.ql-editor) {
    color: #c9d1d9; /* Light text color for content */
    min-height: 300px;
}

/* Style the toolbar area for better visibility in dark mode */
:deep(.ql-toolbar.ql-snow) {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border: 1px solid #30363d;
    border-bottom: none;
    background-color: #161b22; /* Toolbar background */
}

/* Adjust toolbar button colors for dark mode visibility */
:deep(.ql-snow .ql-stroke) {
    stroke: #c9d1d9; /* Light icon color */
}
:deep(.ql-snow .ql-fill) {
    fill: #c9d1d9; /* Light icon color */
}
:deep(.ql-snow.ql-toolbar button:hover .ql-stroke) {
    stroke: #58a6ff; /* Accent color on hover */
}
:deep(.ql-snow.ql-toolbar button:hover .ql-fill) {
    fill: #58a6ff; /* Accent color on hover */
}
/* Ensure dropdown texts are visible */
:deep(.ql-snow .ql-picker) {
    color: #c9d1d9;
}
:deep(.ql-snow .ql-picker-label) {
    color: #c9d1d9;
}
:deep(.ql-snow .ql-picker-options) {
    background: #161b22; /* Dark dropdown options background */
}

/* PUBLISH BUTTON STYLING */
.publish-btn {
  background: #28a745; /* Green for publish/success */
  color: #fff;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1em;
  font-weight: bold;
  transition: background 0.3s, transform 0.1s;
  box-shadow: 0 4px 10px rgba(40, 167, 69, 0.4);
}

.publish-btn:hover:not(:disabled) {
  background: #218838;
  transform: translateY(-1px);
}

.publish-btn:disabled {
  background: #30363d;
  cursor: not-allowed;
  opacity: 0.6;
  box-shadow: none;
}

/* MESSAGE BOX */
.message {
  padding: 15px;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
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

.back-link {
  color: #58a6ff;
  text-decoration: none;
  font-weight: 500;
  margin-top: 10px;
  transition: color 0.3s;
}

.back-link:hover {
  color: #79b8ff;
  text-decoration: underline;
}

/* RESPONSIVENESS */
@media (max-width: 600px) {
  .form-wrapper {
    padding: 15px;
  }
  .form-container {
    padding: 20px;
  }
  .form-title {
    font-size: 1.5em;
  }
  .publish-btn {
    padding: 10px 20px;
    font-size: 1em;
  }
}
</style>