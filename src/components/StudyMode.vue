<script setup>
import {Bottom, Close, Download, Top, Upload} from "@element-plus/icons-vue";
import * as d3 from 'd3';
import { onMounted, watch } from "vue";
import {titleColorList} from "@/utils/getColor.js";
import _ from 'lodash'
import store from "@/store/index.js";



const width = 400,
    height = 100,
    titleInnerRadius = 50,
    titleOuterRadius = 54,
    totalOuterRadius = 84,
    totalInnerRadius = 20,
    lineHeight = 76
const data = [3, 4, 6, 7, 8, 3, 9, 1, 5, 3, 8, 6, 4, 9, 3, 2, 6, 7, 5, 8, 9];

function completeRange(arr) {
  return _.range(arr[0], arr[arr.length - 1] + 1);
}

function splitArrayByRanges(array, ranges) {
  // 对范围进行排序和处理，确保它们是连续的
  const sortedRanges = ranges
      .map(range => range.sort((a, b) => a - b))
      .sort((a, b) => a[0] - b[0]);

  // 用于存储最终的分段数组
  const segments = [];
  let startIndex = 0;

  // 遍历每个范围，切割数组
  sortedRanges.forEach(range => {
    const [begin, end] = range;
    // 添加当前范围之前的部分
    if (startIndex < begin - 1) {
      segments.push(array.slice(startIndex, begin - 1));
    }
    // 添加当前范围的部分
    segments.push(array.slice(begin - 1, end));
    // 更新下一次切割的起始索引
    startIndex = end;
  });

  // 添加最后一个范围之后的部分
  if (startIndex < array.length) {
    segments.push(array.slice(startIndex));
  }

  return segments;
}

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
  watch(store.state.id, n=>console.log(n))
  drawCircle(data, [[1,3],[5,8]], circleData)
  drawChart(data, circleData)
})

function drawCircle(lineData, interval, circleData){


    const svg = d3.select('#study-mode-1')
        .append('svg')
        .attr('width', width)
        .attr('height', height)

  const lineGroup = svg.append('g')
      .attr('class', 'line-group')
  const xScale = d3.scaleLinear([0, lineData.length - 1], [0, width])

  const yScale = d3.scaleLinear([0, d3.max(lineData)], [0, height])

  const area = d3.area()
      .x(d=>xScale(d))
      .y1(d=>{
        console.log(lineData[d])
        return yScale(lineData[d])
      })
      .y0(yScale(d3.max(lineData)))
      .curve(d3.curveBumpX)

  const lineGenerator = d3.line()
      .x((d, i) => xScale(i))
      .y(d => yScale(d))
      .curve(d3.curveBumpX)

  lineGroup.append('path')
      .datum(lineData)
      .attr('d', lineGenerator)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
  // console.log()
  const gradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'gradient')
      .attr('x1', '0%') // 渐变开始位置
      .attr('y1', '0%') // 渐变开始位置
      .attr('x2', '0%') // 渐变结束位置
      .attr('y2', '100%'); // 渐变结束位置

// 2. 设置渐变的颜色和位置
  gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', 'tomato'); // 上边的颜色

  gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', 'white');
  const areaGroup = svg.append('g')
      .attr('class', 'area-group')
  _.forEach(interval, item=>{
    areaGroup.append('path')
        .datum(completeRange(item))
        .attr('fill', 'url(#gradient)')
        .attr('d', area)
  })


}

function drawChart(lineData, circleData){
  const xScale = d3.scaleLinear([0, lineData.length - 1], [0, width])
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

  const svg = d3.select('#master-degree-1')
      .append('svg')
      .attr('width', width)
      .attr('height', height)

  const correctGroups = svg.selectAll(".correct-group")
      .data(correctStack(circleData))
      .enter()
      .append("g")
      .attr('class', 'correct-group')
      .selectAll("path")
      .data(d=>d)
      .enter()
      .append("path")
      .attr('d', correctArc)
      .attr('fill', 'yellow')
      .attr('stroke', 'black')

  const countGroups = svg.selectAll(".count-group")
      .data(countStack(circleData))
      .enter()
      .append("g")
      .attr('class', 'count-group')
      .selectAll("path")
      .data(d=>d)
      .enter()
      .append("path")
      .attr('d', countArc)
      .attr('fill', 'red')
      .attr('stroke', 'red')

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
        <span class="w-2 inline-block"></span>
        <el-button size="small" type="danger" plain :icon="Close" />
      </div>
    </div>
    <div id="study-mode-1"></div>
    <div id="master-degree-1"></div>
  </div>
</template>

<style scoped>
</style>