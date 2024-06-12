<script setup>
import { onMounted } from "vue";
import * as d3 from 'd3';

const data = [{
  index:0,
  
}]

onMounted(()=>{
  initChart()
})

function octagonPath(center, innerRadius, outerRadius, angle, angleStep) {
  let path = '';
  for (let i = 0; i < 8; i++) {
    // 内部顶点
    const x0 = center[0] + Math.cos(angle + angleStep * i) * innerRadius;
    const y0 = center[1] + Math.sin(angle + angleStep * i) * innerRadius;
    // 外部顶点
    const x1 = center[0] + Math.cos(angle + angleStep * i) * outerRadius;
    const y1 = center[1] + Math.sin(angle + angleStep * i) * outerRadius;

    path += `${i === 0 ? 'M' : 'L'} ${x0} ${y0} `;
    path += `L ${x1} ${y1} `;
  }
  path += 'Z'; // 闭合路径
  return path;
}

function initChart() {
  // 设置雷达图的大小和边距
  var width = 450,
      height = 450,
      margin = { top: 100, right: 100, bottom: 100, left: 100 },
      radius = Math.min(width / 2, height / 2) - (Math.max(margin.top + margin.bottom, margin.left + margin.right) / 2);

// 创建SVG容器
  var svg = d3.select("#test").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");

// 定义八边形的顶点
  var points = [];
  var angle = Math.PI * 2 / 8; // 八边形，所以是2π除以8
  for (var i = 0; i < 8; i++) {
    points.push([radius * Math.cos(angle * i + Math.PI/8), radius * Math.sin(angle * i + Math.PI/8)]);
  }

// 绘制八边形
  svg.selectAll("polygon")
      .data([points])
      .enter()
      .append("polygon")
      .attr("points", function(d) {
        return d.map(function(d) {
          return [d[0],d[1]].join(",");
        }).join(" ");
      })
      .style("stroke", "#999") // 边框颜色
      .style("fill", "none"); // 填充颜色

  svg.selectAll("path")
      .data(series)
      .enter().append("path")
      .attr("d", d => {
        // 计算每个八边形的中心点和角度
        const center = [0, 0]; // 假设图表的中心点为(0,0)
        const angle = x(d.data[0]) + x.bandwidth() / 2; // 根据x比例尺计算角度
        const angleStep = Math.PI * 2 / 8; // 八边形的角度步长
        return octagonPath(center, y(d[0]), y(d[1]), angle, angleStep);
      })
      .attr("fill", d => color(d.key));
}
</script>

<template>
  <div id="test"></div>
</template>

<style scoped>

</style>