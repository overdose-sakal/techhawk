<template>
  <div class="policy-page container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">

        <h1 class="display-5 fw-bold mb-4 text-center page-title-blue">Privacy Policy</h1>
        <p class="lead text-center mb-5 text-light-subtle">Effective Date: December 2, 2025</p>

        <div class="card p-4 shadow-lg policy-card">
          
          <h2 class="h4 fw-bold text-white mt-3">Who we are</h2>
          <p class="text-light-body">Our website address is: https://techhawk.online, which now operates as Tech Hawk.</p>

          <hr class="my-4 text-light-subtle">

          <h2 class="h4 fw-bold text-white">Comments</h2>
          <p class="text-light-body">When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help spam detection.</p>
          <p class="text-light-body">An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here: <a href="https://automattic.com/privacy/" target="_blank" class="text-accent-blue-link">https://automattic.com/privacy/</a>. After approval of your comment, your profile picture is visible to the public in the context of your comment.</p>

          <hr class="my-4 text-light-subtle">

          <h2 class="h4 fw-bold text-white">Media</h2>
          <p class="text-light-body">If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.</p>

          <hr class="my-4 text-light-subtle">

          <h2 class="h4 fw-bold text-white">Cookies</h2>
          <p class="text-light-body">If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.</p>
          <p class="text-light-body">When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select "Remember Me", your login will persist for two weeks. If you log out of your account, the login cookies will be removed.</p>

          <hr class="my-4 text-light-subtle">

          <h2 class="h4 fw-bold text-white">Embedded content from other websites</h2>
          <p class="text-light-body">Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.</p>
          <p class="text-light-body">These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.</p>

          <hr class="my-4 text-light-subtle">

          <h2 class="h4 fw-bold text-white">How long we retain your data</h2>
          <p class="text-light-body">If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.</p>
          <p class="text-light-body">For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.</p>

          <hr class="my-4 text-light-subtle">

          <h2 class="h4 fw-bold text-white">What rights you have over your data</h2>
          <p class="text-light-body">If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.</p>

          <hr class="my-4 text-light-subtle">

          <h2 class="h4 fw-bold text-white">Where your data is sent</h2>
          <p class="text-light-body">Visitor comments may be checked through an automated spam detection service.</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Policy',
}
</script>

<style scoped>
/* Global Dark Theme Settings (repeated for scope) */
body {
    background-color: #0d1117; 
    color: #c9d1d9; 
}

.policy-page {
    min-height: 80vh;
}

/* Custom Dark Theme Styles */
.page-title-blue {
    color: #58a6ff !important;
}
.text-light-subtle {
    color: #8b949e !important;
}
.text-light-body {
    color: #c9d1d9 !important;
    font-size: 1.05rem; /* Slightly larger text for readability */
    line-height: 1.8;
}
.text-accent-blue-link {
    color: #58a6ff !important;
}

/* Card Styling */
.card {
    background-color: #161b22;
    border: 1px solid #30363d;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
}
.policy-card {
    /* Top border now uses the blue accent color */
    border-top: 5px solid #58a6ff; 
}
</style>