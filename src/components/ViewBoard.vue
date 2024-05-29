<script setup>

</script>

<template>
  <div class="grid-container bg-white text-black">
    <div class="col-span-2 bg-black font-bold text-left text-white text-2xl align-middle">
      Learn Scope
    </div>
    <div class="row-span-1 col-span-1 chart-component">
      1
    </div>
    <div class="row-span-3 chart-component">
      2
    </div>
    <div class="row-span-1 col-span-1 chart-component">
      3
    </div>
    <div class="row-span-1 col-span-1 chart-component">
      4
    </div>
  </div>
</template>

<style scoped>
.grid-container {
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-rows: 2rem 1fr 1fr 1fr; /* 第一行的高度为20px，其余的行平均分配剩余空间 */
  grid-template-columns: 3fr 1fr; /* 两列平均分配空间 */
}
</style>