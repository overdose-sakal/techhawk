<template>
  <div class="terms-page container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">

        <h1 class="display-5 fw-bold mb-4 text-center page-title-blue">Terms & Conditions</h1>
        <p class="text-light-subtle text-center mb-5">Last Updated: November 20, 2025</p>

        <div class="card p-4 shadow-lg terms-card">
          
          <h2 class="h5 fw-bold text-white">Welcome to Tech Hawk!</h2>
          <p class="text-light-body">These terms and conditions outline the rules and regulations for the use of Tech Hawk's Website, located at **https://techhawk.online**. By accessing this website, we assume you accept these terms and conditions. Do not continue to use Tech Hawk if you do not agree to take all of the terms and conditions stated on this page.</p>
          <p class="text-light-body">The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice, and all Agreements: “Client”, “You” and “Your” refer to you, the person who logs on to this website and is compliant with the Company’s terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves. All terms refer to the offer, acceptance, and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of the provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization, and/or he/she or they, are taken as interchangeable and therefore as referring to the same.</p>

          <h3 class="h5 fw-bold mt-4 text-white">Cookies</h3>
          <p class="text-light-body">We employ the use of cookies. By accessing Tech Hawk, you agree to use cookies in agreement with the Privacy Policy. Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.</p>

          <h3 class="h5 fw-bold mt-4 text-white">License</h3>
          <p class="text-light-body">Unless otherwise stated, Tech Hawk and/or its licensors own the intellectual property rights for all material on Tech Hawk. All intellectual property rights are reserved. You may access this from Tech Hawk for your own personal use subject to restrictions set in these terms and conditions. You must not:</p>
          <ul class="text-light-body">
            <li>Republish material from Tech Hawk</li>
            <li>Sell, rent, or sub-license material from Tech Hawk</li>
            <li>Reproduce, duplicate, or copy material from Tech Hawk</li>
            <li>Redistribute content from Tech Hawk</li>
          </ul>

          <h3 class="h5 fw-bold mt-4 text-white">User Comments</h3>
          <p class="text-light-body">Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Tech Hawk does not filter, edit, publish, or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Tech Hawk, its agents, and/or affiliates. Comments reflect the views and opinions of the person who posts their views and opinions. To the extent permitted by applicable laws, Tech Hawk will not be liable for the Comments or for any liability, damages, or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website. Tech Hawk reserves the right to monitor all Comments and to remove any Comments that can be considered inappropriate, offensive, or cause a breach of these Terms and Conditions. You warrant and represent that:</p>
          <ul class="text-light-body">
            <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
            <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent, or trademark of any third party;</li>
            <li>The Comments do not contain any defamatory, libelous, offensive, indecent, or otherwise unlawful material which is an invasion of privacy</li>
            <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
          </ul>
          <p class="text-light-body">You hereby grant Tech Hawk a non-exclusive license to use, reproduce, edit, and authorize others to use, reproduce, and edit any of your Comments in any and all forms, formats, or media.</p>

          <h3 class="h5 fw-bold mt-4 text-white">Disclaimer</h3>
          <p class="text-light-body">To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>
          <ul class="text-light-body">
            <li>limit or exclude our or your liability for death or personal injury;</li>
            <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
            <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
            <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
          </ul>
          <p class="text-light-body">The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty. As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>
        </div>

        <p class="text-center text-light-subtle mt-5">© 2026 Tech Hawk.online. All Rights Reserved.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Terms',
}
</script>

<style scoped>
/* Global Dark Theme Settings (repeated for scope) */
body {
    background-color: #0d1117; 
    color: #c9d1d9; 
}

.terms-page {
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
    font-size: 1.05rem; 
    line-height: 1.8;
}
.text-white {
    color: #fff !important;
}

/* Card Styling */
.card {
    background-color: #161b22;
    border: 1px solid #30363d;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
}
.terms-card {
    /* Top border now uses the blue accent color */
    border-top: 5px solid #58a6ff; 
}

/* List Styling */
.text-light-body ul {
    margin-bottom: 1rem;
    padding-left: 20px;
}
.text-light-body ul li {
    margin-bottom: 5px;
}
</style>