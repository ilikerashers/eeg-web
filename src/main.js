import { createApp } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import App from './App.vue'
import './assets/tailwind.css'

const myApp = createApp(App);
myApp.component('apexchart', VueApexCharts);
myApp.mount('#app');
