<script setup>
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const logout = async () => {
  // 1) make user.value == null;
  // 2) remove JWT from cookie browser
  
  const {error} = await supabase.auth.signOut();

  try {
    await $fetch('/api/_supabase/session', {
      method: 'POST',
      body: { event: 'SIGNED_OUT', session: null }
    })
  } catch (error) {
    console.log(error)
  }

  user.value = null;
  navigateTo('/');
}
</script>

<template>
    <header class="sticky top-0 z-50 flex justify-between items-center space-x-1 border-b bg-white p-4 shadow-md">
      <NuxtLink class="text-3xl font-mono" to="/">cartrader</NuxtLink>
      <div v-if="user" class="flex">
        <NuxtLink class="text-xl mr-5" to="/profile/listings">Profile</NuxtLink>
        <NuxtLink @click="logout" class="text-xl mr-5 cursor-pointer">Logout</NuxtLink>
      </div>
      <NuxtLink v-if="!user" class="text-xl" to="/login">Login</NuxtLink>
    </header>
</template>