<template>
  <div class="home-wrap">
    <h2 class="title">This is home page</h2>
    <button @click="goToList">go to list</button>
  </div>
</template>

<script lang="ts">
import {} from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Home",

  setup() {
    const router = useRouter();
    const goToList = () => {
      router.push("/list");
    };
    return { goToList };
  },
};
</script>

<style lang="scss">
.home-wrap {
  .title {
    color: red;
  }
}
</style>
