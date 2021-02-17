<template>
  <div class="list-wrap">
    <h2>This is list page</h2>
    <button @click="goToHome">go to home</button>
  </div>
</template>

<script lang="ts">
import {} from "vue";
import { useRouter } from 'vue-router';

export default {
  name: "List",

  setup() {
    const router = useRouter()
    const goToHome = () => {
      router.push('/home')
    }
    return {goToHome};
  }
};
</script>

<style>
.list-wrap {}
</style>