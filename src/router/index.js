import { createRouter, createWebHistory } from 'vue-router'
import Home from '../Home.vue' 
import Blog from '../Blog.vue' 
import News from '../News.vue'
import Contact from '../Contact.vue' 
import Terms from '../Terms.vue'
import Policy from '../Policy.vue'
import Login from '../Login.vue'
import Admin from '../Admin.vue'
import AdminAddBlog from '../AdminAddBlog.vue'
import AdminAddNews from '../AdminAddNews.vue'
import BlogDetail from '../BlogDetail.vue' 
import NewsDetail from '../NewsDetail.vue'
// NEW IMPORTS FOR AD PAGES
import AdPage1 from '../AdPage1.vue'
import AdPage2 from '../AdPage2.vue'
import { supabase } from '../supabase.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/blogs',
      name: 'Blogs',
      component: Blog
    },
    {
      path: '/full-blog/:id',
      name: 'BlogDetail',
      component: BlogDetail,
      props: true
    },
    {
      path: '/news',
      name: 'News',
      component: News 
    },
    {
      path: '/full-news/:id',
      name: 'NewsDetail',
      component: NewsDetail,
      props: true
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact 
    },
    {
      path: '/terms',
      name: 'Terms',
      component: Terms
    },
    {
      path: '/policy',
      name: 'Policy',
      component: Policy 
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: { requiresAuth: true }
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/admin/add-blog",
      name: "AdminAddBlog",
      component: AdminAddBlog,
      meta: { requiresAuth: true }
    },
    {
      path: "/admin/add-news",
      name: "AdminAddNews",
      component: AdminAddNews,
      meta: { requiresAuth: true }
    },
    // NEW ROUTES FOR MONETIZATION AD PAGES
    {
      path: '/ad-page-1',
      name: 'AdPage1',
      component: AdPage1,
      meta: { 
        hideHeader: true,  // Optional: hide header/footer on ad pages
        title: 'Preparing Download...'
      }
    },
    {
      path: '/ad-page-2',
      name: 'AdPage2',
      component: AdPage2,
      meta: { 
        hideHeader: true,
        title: 'Almost There...'
      }
    },
  ],
})

router.beforeEach(async (to) => {
  const { data } = await supabase.auth.getUser();

  // Auth check for admin routes
  if (to.meta.requiresAuth && !data.user) {
    return "/login";
  }

  // Optional: Set page title dynamically
  if (to.meta.title) {
    document.title = to.meta.title + ' - Tech Hawk';
  }
});

export default router