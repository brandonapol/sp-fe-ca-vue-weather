import { createApp } from 'vue'
import App from './App.vue'
import '../src/assets/tailwind.css'
import router from './router'
import { Frontegg } from "@frontegg/vue";

const app = createApp(App)
app.use(router)

app.use(Frontegg, {
    contextOptions: {
        baseUrl: 'https://app-lodi029zuja7.frontegg.com',
        clientId: 'e1144aa3-3314-4a37-8fb9-a409e2018f90'
      },
      hostedLoginBox: true,
      router,
})




app.mount('#app')

// at some point mention that components can also be recursive