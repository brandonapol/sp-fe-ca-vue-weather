<template>
    <div v-for="city in myCities" :key="city.id">
        <City :city="city" @click="viewCity(city)" />
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import City from "./City.vue"

const myCities = ref([])
const getCities = async () => {
    if (localStorage.getItem("myCities")) {
        myCities.value = JSON.parse(localStorage.getItem("myCities"))
    }
                // TODO
                // https://openweathermap.org/api/one-call-api 
                // url/data/version/topic?param1=lat&param2=lon&appid={API KEY}
    const requests = [];
    myCities.value.forEach((city) => {
        requests.push(
            axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lon}&appid=cb0e2c5ea4c83b9c517301b8e88f8121&units=imperial`
            )
        )
    })

    // A promise that waits until all requests are finished
    const weatherData = await Promise.all(requests)

    // await new Promise((res) => setTimeout(res, 1000)); 
    weatherData.forEach((value, idx) => {
        myCities.value[idx].weather = value.data
    })
}
await getCities();

const router = useRouter();
const viewCity = (city) => {
    router.push({
        name: "city",
        params: { state: city.state, city: city.city },
        query: {
            id: city.id,
            lat: city.coords.lat,
            lon: city.coords.lon,
        }
    })
}
</script>
