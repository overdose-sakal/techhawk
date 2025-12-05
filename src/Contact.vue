<template>
  <div class="contact-page container py-5">
    <div class="row g-5">
      
      <div class="col-lg-8">
        <h1 class="fw-bold mb-4 page-title-blue border-bottom pb-2">Get In Touch</h1>
        <p class="lead mb-4 text-light-subtle">We're eager to hear from you! Whether you have a question, partnership proposal, or feedback, our team is ready to listen.</p>

        <form @submit.prevent="submitForm" class="contact-form p-4 shadow-lg rounded">
          
          <div class="mb-3">
            <label for="name" class="form-label fw-bold">Your Name</label>
            <input type="text" class="form-control" id="name" placeholder="John Doe" required>
          </div>
          
          <div class="mb-3">
            <label for="email" class="form-label fw-bold">Email Address</label>
            <input type="email" class="form-control" id="email" placeholder="name@example.com" required>
          </div>

          <div class="mb-3">
            <label for="subject" class="form-label fw-bold">Subject</label>
            <input type="text" class="form-control" id="subject" placeholder="Blog Submission / General Inquiry" required>
          </div>
          
          <div class="mb-4">
            <label for="message" class="form-label fw-bold">Message</label>
            <textarea class="form-control" id="message" rows="5" required></textarea>
          </div>
          
          <button type="submit" class="btn btn-primary-blue btn-lg w-100">Send Message &rarr;</button>
        </form>
      </div>

      <div class="col-lg-4">
        <div class="p-4 rounded-3 contact-info sticky-top">
          <h2 class="h4 fw-bold mb-3 text-white">Connect with Tech Hawk</h2>
          <p class="text-light-subtle">
            Need a quicker response or looking for a specific department? Check out these options:
          </p>

          <div class="mb-4">
            <h5 class="text-white">Editorial Team</h5>
            <p class="text-light-subtle mb-1">For content submissions & corrections:</p>
            <strong class="text-accent-blue">editor@techhawk.com</strong>
          </div>
          
          <div class="mb-4">
            <h5 class="text-white">Partnerships & Advertising</h5>
            <p class="text-light-subtle mb-1">For business inquiries:</p>
            <strong class="text-accent-blue">bizdev@techhawk.com</strong>
          </div>
          
          <hr class="text-light">
          
          <p class="text-light-subtle mt-3">Follow us on social media!</p>
          <div class="d-flex gap-3">
            <a href="#" class="social-icon">F</a>
            <a href="#" class="social-icon">T</a>
            <a href="#" class="social-icon">L</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Contact',
    methods: {
        submitForm() {
            // In a real application, you would send data to an API here
            alert('Thank you for contacting Tech Hawk! Your message has been sent.')
            // Reset form fields after successful submission
        }
    }
}
</script>

<style scoped>
/* Global Dark Theme Settings (Assumes App.vue/index.html sets body background) */
body {
    background-color: #0d1117; /* GitHub Dark Theme Background */
    color: #c9d1d9; /* Default text color */
}

.contact-page {
    min-height: 85vh;
}

/* New Primary Accent Blue */
.text-accent-blue {
    color: #58a6ff !important; 
}
.page-title-blue {
    color: #58a6ff !important;
}
.btn-primary-blue {
    background-color: #58a6ff !important;
    border-color: #58a6ff !important;
    color: #0d1117 !important; /* Dark text on blue button */
}
.btn-primary-blue:hover {
    background-color: #79a6e0 !important;
    border-color: #79a6e0 !important;
}

/* Dark Form Styling */
.contact-form {
    background-color: #161b22; /* Card background color */
    border: 1px solid #30363d;
    color: #c9d1d9;
}
.contact-form .form-label {
    color: #c9d1d9;
}
.contact-form .form-control {
    background-color: #0d1117;
    border: 1px solid #30363d;
    color: #c9d1d9;
}
.contact-form .form-control:focus {
    background-color: #0d1117;
    border-color: #58a6ff;
    box-shadow: 0 0 0 0.25rem rgba(88, 166, 255, 0.25);
}

/* Contact Info Styling (Darker Panel) */
.contact-info {
    background-color: #161b22; /* Matches form/card background */
    border: 1px solid #30363d;
    top: 70px; 
}
.text-light-subtle {
    color: #8b949e !important; /* Muted text */
}

/* Social Icons */
.social-icon {
    color: #0d1117; /* Dark text */
    background-color: #58a6ff; /* Blue background */
    transition: background-color 0.2s, transform 0.2s;
}
.social-icon:hover {
    background-color: #79a6e0; 
    transform: scale(1.1);
}
</style>