import { createRouter, createWebHistory } from 'vue-router'
// https://router.vuejs.org/guide/

import DashboardPage from '../views/DashboardPage.vue'
import LandingPage from '../views/LandingPage.vue'
import CityPage from '../views/CityPage.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            // page for welcome and auth info
            path: '/',
            name: 'home',
            component: LandingPage,
            meta: {
                title: "The Weather",
            }
        },
        // this is Home view
        {
            path: '/dashboard',
            name: 'dashboard',
            component: DashboardPage,
            meta: {
                title: "Dashboard",
            },
        },
        // will need to configure city view later
        // the /:param context allows us to 'pass' values into the code from the URL and vice versa
        // see Navbar for where this gets used
        {
            path: "/weather/:state/:city",
            name: "city",
            component: CityPage,
            meta: {
                title: "Weather",
            }
        }
    ],
});

router.beforeEach((to, from, next) => {
    // If there is state (cities are visible) then tag the meta part of the document and change the title
    document.title = `${
      to.params.state 
      ? `${to.params.city}, ${to.params.state}`
      : to.meta.title 
    } | The Local Weather`;
    next(); // this is a navigation specific tool and not our present focus
  })
  
  export default router;