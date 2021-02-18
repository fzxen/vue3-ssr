<template>
  <div class="home-wrap">
    <h2 class="title">This is home page</h2>
    <p>name:{{$store.state.name}}</p>
    <ul class="list">
      <li class="lite-item">1</li>
      <li class="lite-item">2</li>
      <li class="lite-item">3</li>
    </ul>
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
  .list {
    display: flex;
    justify-content: space-between;
  }
}
</style>
