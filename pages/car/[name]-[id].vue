<script setup>
const route = useRoute();

const {data: car} = await useFetchCar(route.params.id);

definePageMeta({
    layout: "custom",
});
</script>

<template>
    <div v-if="car">
        <CarDetailHero :car="car" />
        <CarDetailAttributes :features="car.features" />
        <CarDetailDescription :description="car.description" />
        <CarDetailContact />
    </div>
</template>