<script setup>
const route = useRoute();
useHead({
    title: route.params.name
})

definePageMeta({
    layout: "custom",
});
</script>

<template>
    <div>
        <CarDetailHero />
        <CarDetailAttributes />
        <CarDetailDescription />
        <CarDetailContact />
    </div>
</template>