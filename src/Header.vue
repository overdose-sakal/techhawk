<template>
<header class="navbar navbar-expand-lg">
    <div class="container-fluid">
        <a class="navbar-brand ms-2" href="/">
            <h4 class="header-logo-text mb-0">Tech Hawk</h4>
        </a>

        <button 
            class="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon custom-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
            
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link" href="/">Home</a> </li>
                <li class="nav-item">
                    <a class="nav-link" href="/news">News</a> </li>
                <li class="nav-item">
                    <a class="nav-link" href="/blogs">Blogs</a> </li>
                <li class="nav-item">
                    <a class="nav-link" href="/contact">Contact</a> </li>
            </ul>

            <div class="d-flex align-items-center me-2">
                <a class="nav-link utility-link" href="/terms/">Terms</a>
                <a class="nav-link utility-link" href="/policy/">Policy</a>
            </div>
            
        </div>
    </div>
</header>
</template>


<script>
export default {
    // Keep this empty export default for Options API structure
}
</script>

<style scoped>
/* The scoped styles are crucial to customize the Bootstrap Navbar.
    We are targeting the elements within the Bootstrap structure.
*/

/* REMOVED: Local :root variable definitions.
   We now rely on the global variables defined in App.vue:
   --color-accent: #58a6ff; 
   --color-text-light: #c9d1d9; 
*/

/* --- Header & Border --- */
header {
    /* Changed to use the global variable --color-accent */
    border-bottom: 2px solid var(--color-accent);
    padding: 0.5rem 0; /* Adjust padding for top/bottom */
}

/* --- Brand/Logo --- */
.navbar-brand {
    padding: 0; /* Remove default brand padding */
}

/* FIX 1: Use global variable --color-accent and !important */
.header-logo-text {
    color: var(--color-accent) !important; 
}

/* --- Navigation Links --- */
.nav-link {
    /* FIX 2: Use global variable --color-accent and !important 
       to force the link color to blue */
    color: var(--color-accent) !important; 
    text-decoration: none;
    padding: 4px 8px; /* Adjust padding for better look */
    border-radius: 5px;
    margin: 0 5px; /* Spacing between links */
    transition: all 0.2s ease;
}

.nav-link:hover {
    /* Changed to use global variables --color-accent and --color-text-light */
    background-color: var(--color-accent);
    color: var(--color-text-light) !important; /* Ensure high contrast text on hover */
}

/* --- Utility Links (Terms/Contact) --- */
.utility-link {
    font-size: 0.95rem; 
    font-weight: 500;
}

/* --- Mobile Menu Fixes --- */

/* The toggler icon remains light grey for visibility on dark background */
.custom-toggler-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='%23c9d1d9' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E") !important;
}

/* Resetting the default Bootstrap list styling */
.navbar-nav {
    list-style: none; /* Remove bullet points */
    padding-left: 0;
    margin-top: 5px; /* Add slight space above menu items when collapsed */
}

/* Styles specifically for mobile menu links when the menu is OPEN (stacked vertically) */
@media (max-width: 991.98px) {
    .nav-link {
        /* On mobile, stack them vertically and fill the width */
        display: block;
        width: 100%;
        margin: 5px 0;
    }

    .utility-link {
        /* Ensure utility links also stack nicely */
        display: block;
        text-align: left;
    }
}
</style>