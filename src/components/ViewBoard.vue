<script setup>
import Table from "./InfoTable.vue";
import KnowledgeTree from "./KnowledgeTree.vue";
import LogView from './LogView.vue';
import KLRelationView from "@/components/KLRelationView.vue";
import StudyMode from "@/components/StudyMode.vue";
import RadarView from "@/components/RadarView.vue";
import {onMounted} from "vue";
import * as d3 from "d3";

onMounted(()=>{
// 创建一个 SVG 元素
  var svg = d3.select("#knowledge-legend").append("svg")
      .attr("width", 640)
      .attr("height", 30)

// 定义图例数据
  var legendData = [
    { label: "r8S3g", color: "#b3e2cd" },
    { label: "t5V9e", color: "#fdcdac" },
    { label: "m3D1v", color: "#cbd5e8" },
    { label: "s8Y2f", color: "#f4cae4" },
    { label: "k4W1c", color: "#e6f5c9" },
    { label: "g7R2j", color: "#fff2ae" },
    { label: "b3C9s", color: "#f1e2cc" },
    { label: "y9W5d", color: "#fed9a6" }
  ];

// 创建一个分组元素用于放置图例项
  var legendGroup = svg.append("g")
      .attr("class", "legend")
      .attr("transform", "translate(0,11)");

// 创建图例项
  var legendItems = legendGroup.selectAll(".legend-item")
      .data(legendData)
      .enter().append("g")
      .attr("class", "legend-item")
      .attr("transform", function(d, i) {
        return "translate(" + (i * 80) + ", 0)";
      });

// 添加圆形
  legendItems.append("circle")
      .attr("cx", 10)
      .attr("cy", 0)
      .attr("r", 7)
      .style("fill", function(d) {
        return d.color;
      });

// 添加字符串
  legendItems.append("text")
      .attr("x", 25)
      .attr("y", 0)
      .attr("dy", "0.35em")
      .text(function(d) {
        return d.label;
      })
      .style('font-size', 13)
      .style('font-weight', 'bold')
      .style('fill', 'white')
})
</script>

<template>
  <div class="tool-tip"></div>
  <span style="z-index: 100; position: absolute;top: 0;left: 1340px;height: 30px" id="knowledge-legend"></span>
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
    <div class="row-span-5 col-span-1 chart-component grid grid-cols-5">
      <div class="col-span-3">
        <KLRelationView />
      </div>
      <div class="col-span-2" style="height: 100%;">
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
  grid-template-rows: 2rem repeat(8, 1fr);    
  grid-template-columns: 5fr 4fr;   
}

.view-title{
  position: absolute;
  background-color: aliceblue;
  opacity: 0.5;
}
</style>