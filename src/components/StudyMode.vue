<script setup>
import {Bottom, Download, Top, Upload} from "@element-plus/icons-vue";
import * as d3 from 'd3';
import { onMounted } from "vue";
import {titleColorList} from "@/utils/getColor.js";
import _ from 'lodash'

const width = 400,
    height = 100,
    titleInnerRadius = 50,
    titleOuterRadius = 54,
    totalOuterRadius = 84,
    totalInnerRadius = 20,
    lineHeight = 76
const data = [3, 4, 6, 7, 8, 3, 9, 1, 5, 3, 8, 6, 4, 9, 3, 2, 6, 7, 5, 8, 9];
const circleData = [
  {
    "index": 0,
    "new_correct": 0.8,
    "new_count": 100,
    "old_correct": 0.7,
    "old_count": 200
  },
  {
    "index": 1,
    "new_correct": 0.82,
    "new_count": 105,
    "old_correct": 0.68,
    "old_count": 195
  },
  {
    "index": 2,
    "new_correct": 0.76,
    "new_count": 110,
    "old_correct": 0.72,
    "old_count": 190
  },
  {
    "index": 3,
    "new_correct": 0.84,
    "new_count": 95,
    "old_correct": 0.69,
    "old_count": 205
  },
  {
    "index": 4,
    "new_correct": 0.78,
    "new_count": 108,
    "old_correct": 0.71,
    "old_count": 198
  },
  {
    "index": 5,
    "new_correct": 0.81,
    "new_count": 103,
    "old_correct": 0.73,
    "old_count": 202
  },
  {
    "index": 6,
    "new_correct": 0.79,
    "new_count": 107,
    "old_correct": 0.74,
    "old_count": 194
  },
  {
    "index": 7,
    "new_correct": 0.83,
    "new_count": 102,
    "old_correct": 0.75,
    "old_count": 199
  }
]


onMounted(()=>{
  drawCircle(data, [[1,3],[5,8]], circleData)
  // drawChart()
})

function drawCircle(lineData, interval, circleData){
  const correctArc = d3.arc()
      .innerRadius(d=>correctScale(d[0]))
      .outerRadius(d => correctScale(d[1]))
      .startAngle(d => xScale(d.data.index))
      .endAngle(d => xScale(d.data.index+1))
      .padAngle(0.01)
      .padRadius(0)

  const countArc = d3.arc()
      .innerRadius(d=>countScale(d[0]))
      .outerRadius(d => countScale(d[1]))
      .startAngle(d => xScale(d.data.index))
      .endAngle(d => xScale(d.data.index+1))
      .padAngle(0.01)
      .padRadius(0)

    // const xScale = d3.scaleBand(data.map(d => d.index), [0, 2 * Math.PI]).align(0)
    const correctScale = d3.scaleRadial([0, d3.max(circleData, d => d.new_correct + d.old_correct)], [titleOuterRadius, totalOuterRadius])
    const countScale = d3.scaleRadial([0, d3.max(circleData, d => d.new_count + d.old_count)], [totalInnerRadius, titleInnerRadius])

    const correctStack = d3.stack()
      .keys(['new_correct', 'old_correct'])
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);

    const countStack = d3.stack()
      .keys(['new_count', 'old_count'])
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);

    const svg = d3.select('#study-mode-1')
        .append('svg')
        .attr('width', width)
        .attr('height', height)

  // const circleGroup =
  const lineGroup = svg.append('g')
      .attr('class', 'line-group')
  const xScale = d3.scaleLinear([0, lineData.length - 1], [0, width])

  const yScale = d3.scaleLinear([0, d3.max(lineData)], [0, height]);
console.log(yScale(9))
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  const lineGenerator = d3.line()
      .x((d, i) => xScale(i))
      .y(d => yScale(d))
      .curve(d3.curveBasis)

  lineGroup.append('path')
      .datum(lineData)
      .attr('d', lineGenerator)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)

  const area = d3.area()
      .x(d=>xScale(d))
      .y0(d=>yScale(lineData[d]))
      .y1(yScale(d3.max(lineData)))
      .curve(d3.curveBasis)

  const areaGroup = svg.append('g')
      .attr('class', 'area-group')

  _.forEach(interval, item=>{
    areaGroup.append('path')
        .datum(item)
        .attr('fill', 'tomato')
        .attr('d', area)
  })

  // const correctGroups = svg.selectAll("g")
  //     .data(correctStack(data))
  //     .enter()
  //     .append("g")
  //     .selectAll("path")
  //     .data(d=>d)
  //     .enter()
  //     .append("path")
  //     .attr('d', correctArc)
  //     .attr('fill', 'black')
  //     .attr('stroke', 'black')
  //
  // const countGroups = svg.selectAll("g")
  //     .data(countStack(data))
  //     .enter()
  //     .append("g")
  //     .selectAll("path")
  //     .data(d=>d)
  //     .enter()
  //     .append("path")
  //     .attr('d', countArc)
  //     .attr('fill', 'black')
  //     .attr('stroke', 'red')
}

function drawChart(){
  const svg = d3.select('#study-mode-1')
      .append('svg')
      .attr('width', width)
      .attr('height', height)



}
</script>

<template>
  <div class="chart-subcomponent">
    <div>
      <span class="float-left">Card name</span>
      <div class="float-right">
        <el-button-group size="small">
          <el-button :icon="Upload" />
          <el-button :icon="Top" />
          <el-button :icon="Bottom" />
          <el-button :icon="Download" />
        </el-button-group>
      </div>
    </div>
    <div id="study-mode-1"></div>
  </div>
</template>

<style scoped>
</style>