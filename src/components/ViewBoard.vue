<script setup>
import Table from "./InfoTable.vue";
import KnowledgeTree from "./KnowledgeTree.vue";
import LogView from './LogView.vue';
import KLRelationView from "@/components/KLRelationView.vue";
import StudyMode from "@/components/StudyMode.vue";
import RadarView from "@/components/RadarView.vue";
import {onMounted} from "vue";
import * as d3 from "d3";
</script>

<template>
  <div class="tool-tip"></div>
  <div class="grid-container bg-white text-black">
    <div class="col-span-2 bg-black font-bold text-left text-white text-2xl align-middle">
      &nbsp;Study Scope
    </div>
    <div class="row-span-3 col-span-1 chart-component">
      <Table />
    </div>
    <div class="row-span-4 chart-component">
      <LogView class="chart-subcomponent"></LogView>
<!--      -->
    </div>
    <div class="row-span-5 chart-component grid grid-cols-5">
      <div class="col-span-3">
        <KLRelationView />
      </div>
      <div class="col-span-2">
        <StudyMode />
      </div> <!-- 绿色部分，flex-grow值为4 -->
<!--      <div class="flex-grow-6">-->
<!--                -->
<!--      </div>-->
<!--      <div class="flex-grow-4">-->
<!--        &lt;!&ndash;        &ndash;&gt;-->
<!--      </div>-->
    </div>
    <div class="row-span-4 col-span-1 chart-component">
<!--      <RadarView />-->
      <KnowledgeTree />
    </div>

  </div>
</template>

<style scoped>
.grid-container {
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-rows: 2rem repeat(8, 1fr); /* 第一行的高度为20px，其余的行平均分配剩余空间 */
  grid-template-columns: 5fr 4fr; /* 两列平均分配空间 */
}

.view-title{
  position: absolute;
  background-color: aliceblue;
  opacity: 0.5;
}
</style>