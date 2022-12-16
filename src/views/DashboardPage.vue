<template>
    <main class="container bg-primary text-white flex-1">
    <div class="pt-4 mb-8 relative">
        <input 
            type="text" 
            v-model="searchQuery"
            @input="getSearchResults"
            placeholder="Search for a city or state" 
            class="py-2 px-1 text-black w-full bg-white border-b
        focus:border-secondary focus:outline-none
            focus:shadow-[0px_1px_0_0_#004E71]"
        />
        <ul
            class="absolute bg-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
            v-if="mapboxSearchResults"
        >
            <p class="py-2" v-if="searchError">
            Sorry, something went wrong, please try again.
            </p>
            <p
            class="py-2"
            v-if="!searchError && mapboxSearchResults.length === 0"
            >
            No results match your query, try a different term.
            </p>
            <template v-else>
            <li
                v-for="searchResult in mapboxSearchResults"
                :key="searchResult.id"
                class="py-2 cursor-pointer"
                @click="previewCity(searchResult)"
                >
                {{ searchResult.place_name }}
            </li>
            </template> 
          </ul>
        </div>
        <div class="flex flex-col gap-4">
        <Suspense>
            <CityList />
            <template #fallback>
                <CardSkeleton />
            </template>
        </Suspense>
        </div>
    </main>
</template>

<script setup>
    import { ref } from 'vue';
    import axios from "axios";
    import { useRouter } from 'vue-router';
    import CityList from "../components/CityList.vue"
    import CardSkeleton from '../skeletons/CardSkeleton.vue';

    const router = useRouter();
    const previewCity = (searchResult) => {
        const [city, state] = searchResult.place_name.split(",");
        // this will add our new city and state to our router object
        router.push({
            name: "city",
            // next line will strip spaces out of our split searchResult name
            params: { state: state.replaceAll(" ", ""), city: city},
            query: {
                lat: searchResult.geometry.coordinates[1],
                lon: searchResult.geometry.coordinates[0],
                preview: true,
            },
        });
    }

    // haven't set mapbox search results yet

    // API key from mapbox
    const mapboxKey = "pk.eyJ1IjoiYnJhbmRvbmFwb2wiLCJhIjoiY2xicGU2bHR1MDdyMzN6cGNmMTFnZHozdCJ9.99emkuzBbgs0iVL9XxLsRg"
    const searchQuery = ref('');
    const queryTimeout = ref(null);
    const mapboxSearchResults = ref(null);
    const searchError = ref(null);

    // gets location data from https://docs.mapbox.com/api/search/geocoding/
    const getSearchResults = () => {
        clearTimeout(queryTimeout.value);
        queryTimeout.value = setTimeout(async () => {
            if (searchQuery.value !== "") {
                try {
                    // url/v5/endpoint/${search terms}/{authentication and extra params}
                    // https://docs.mapbox.com/api/search/geocoding/#data-types 
                    const result = await axios.get(
                        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}/.json?access_token=${mapboxKey}&types=place`
                    );
                    console.log(result)
                    mapboxSearchResults.value = result.data.features;
                } catch {
                    searchError.value = true;
                }
                return;
            }
        }, 300) // we can change this for how long it takes for the stuff to load
    }
</script>

<style scoped>

</style>