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
// NEW IMPORTS
import BlogDetail from '../BlogDetail.vue' 
import NewsDetail from '../NewsDetail.vue'
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
    // NEW DYNAMIC ROUTES
    {
      path: '/full-blog/:id',
      name: 'BlogDetail',
      component: BlogDetail,
      props: true // Pass route params as props (optional, but good practice)
    },
    {
      path: '/news',
      name: 'News',
      component: News 
    },
    // NEW DYNAMIC ROUTES
    {
      path: '/full-news/:id',
      name: 'NewsDetail',
      component: NewsDetail,
      props: true // Pass route params as props (optional, but good practice)
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
  path: "/admin",
  name: "Admin",
  component: Admin,
  meta: { requiresAuth: true }
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

  ],
})

router.beforeEach(async (to) => {
  const { data } = await supabase.auth.getUser();

  if (to.meta.requiresAuth && !data.user) {
    return "/login";
  }
});

export default router