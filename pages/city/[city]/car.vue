<script setup>
const route = useRoute();
useHead({
    title: `${route.params.make ? route.params.make : "Cars"} in ${route.params.city}`,
});

definePageMeta({
    layout: "custom"
})

</script>

<template>
    <div>
        <div class="mt-32 flex">
            <CarSideBar />
            <NuxtPage />
        </div>
    </div>
</template>