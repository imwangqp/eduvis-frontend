<script setup>
import { onMounted } from "vue";
import * as d3 from 'd3';

const data = [
  {"index": 0, "correct_old": 0.1, "correct_new": 0.8, "count_old": 100, "count_new": 50},
  {"index": 1, "correct_old": 0.2, "correct_new": 0.8, "count_old": 100, "count_new": 50},
  {"index": 2, "correct_old": 0.34, "correct_new": 0.8, "count_old": 100, "count_new": 50},
  {"index": 3, "correct_old": 0.5, "correct_new": 0.8, "count_old": 100, "count_new": 50},
  {"index": 4, "correct_old": 0.6, "correct_new": 0.8, "count_old": 100, "count_new": 50},
  {"index": 5, "correct_old": 0.7, "correct_new": 0.8, "count_old": 100, "count_new": 50},
  {"index": 6, "correct_old": 0.7, "correct_new": 0.8, "count_old": 100, "count_new": 50},
  {"index": 7, "correct_old": 0.7, "correct_new": 0.8, "count_old": 100, "count_new": 50}
]
const angleStep = Math.PI * 2 / 8;
const center = [0, 0];
const size = {
  radarWidth:20,
  radius:40,
  barWidth:30
}

onMounted(()=>{
  initChart(data)
})


function octagonPath(center, index, innerRadius, outerRadius) {
  let path = '';
  const x0 = center[0] + Math.cos(angleStep * index + Math.PI/8) * innerRadius,
      y0 = center[1] + Math.sin(angleStep * index + Math.PI/8) * innerRadius,
      x1 = center[0] + Math.cos(angleStep * (index+1) + Math.PI/8) * innerRadius,
      y1 = center[1] + Math.sin(angleStep * (index+1) + Math.PI/8) * innerRadius,
      x2 = center[0] + Math.cos(angleStep * index + Math.PI/8) * outerRadius,
      y2 = center[1] + Math.sin(angleStep * index + Math.PI/8) * outerRadius,
      x3 = center[0] + Math.cos(angleStep * (index+1) + Math.PI/8) * outerRadius,
      y3 = center[1] + Math.sin(angleStep * (index+1) + Math.PI/8) * outerRadius

  path += `M ${x0} ${y0} `;
  path += `L ${x2} ${y2} `;
  path += `L ${x3} ${y3} `;
  path += `L ${x1} ${y1} `;
  path += 'Z';
  return path;
}

function initChart(data) {
  const width = 450,
      height = 450,
      margin = { top: 100, right: 100, bottom: 100, left: 100 },
      radius = Math.min(width / 2, height / 2) - (Math.max(margin.top + margin.bottom, margin.left + margin.right) / 2);

  const svg = d3.select("#test").append("svg")
      .attr("width", width)
      .attr("height", height)

  const correctScale = d3.scaleLinear([0,1], [0, size.radarWidth])
  const countScale = d3.scaleLinear([0, d3.max(data, d=>d['count_old']+d['count_new'])], [radius, radius/2])

// 绘制八边形
  svg.append("g")
      .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")
      .selectAll("polygon")
      .data([data])
      .enter()
      .append("polygon")
      .attr("points", d=> {
        return d.map((e, i)=>{
          return [
            (correctScale(e['correct_old'])+size.radius)*Math.cos(angleStep * i + Math.PI/8),
            (correctScale(e['correct_old'])+size.radius)*Math.sin(angleStep * i + Math.PI/8)
          ].join(',')
        }).join(' ')
      })
      .style("stroke", "#999")
      .style("fill", "none")

  svg.append("g")
      .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")
      .selectAll("path")
      .data(data)
      .enter()
      .append("path")
      .attr("d", (d, i) => {
        const center = [0, 0];
        return octagonPath(center, i, countScale(0), countScale(d['count_old']));
      })

  svg.append("g")
      .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")
      .selectAll("path")
      .data(data)
      .enter()
      .append("path")
      .attr("d", (d, i) => {
        const center = [0, 0];
        return octagonPath(center, i, countScale(d['count_old']), countScale(d['count_new']));
      })
}
</script>

<template>
  <div id="test"></div>
</template>

<style scoped>

</style>