<template>
    <main class="container text-white">
    <div class="pt-4 mb-8 relative">
        <input 
            type="text" 
            placeholder="Search for a city or state" 
            class="py-2 px-1 w-full bg-transparent border-b
        focus:border-secondary focus:outline-none
            focus:shadow-[0px_1px_0_0_#004E71]"
        />
        <ul
            class="absolute bg-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
        >
            <p class="py-2">
            Sorry, something went wrong, please try again.
            </p>
            <p
            class="py-2"
            >
            No results match your query, try a different term.
            </p>
            <li
                v-for="searchResult in mapboxSearchResults"
                :key="searchResult.id"
                class="py-2 cursor-pointer"
                @click="previewCity(searchResult)"
                >
                {{ searchResult.place_name }}
            </li>
        </ul>
        </div>
        <div class="flex flex-col gap-4">
        <Suspense>
            <Cities />
            <template #fallback>
            <CitiesSkeleton />
            groovy baby
            </template>
        </Suspense>
        </div>
    </main>
</template>

<script setup>
    import { ref } from 'vue';
    import axios from "axios";
    import { useRouter } from 'vue-router';
    import Cities from "../components/Cities.vue"
    import CitiesSkeleton from "../skeletons/CitiesSkeleton.vue"


    const mapboxKey = "pk.eyJ1IjoiYnJhbmRvbmFwb2wiLCJhIjoiY2xicGU2bHR1MDdyMzN6cGNmMTFnZHozdCJ9.99emkuzBbgs0iVL9XxLsRg"
</script>

<style scoped>

</style>