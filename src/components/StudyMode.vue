<script setup>
import {Bottom, Close, Download, Top, Upload} from "@element-plus/icons-vue";
import * as d3 from 'd3';
import { onMounted, watch, ref } from "vue";
import {clusterColorList, CommonColor, getKnowledgeColor, titleColorList} from "@/utils/getColor.js";
import _ from 'lodash'
import store from "@/store/index.js";
import emitter from "@/utils/mitt.js";
import sample_data from '../assets/data.json'

const clusters=[0,1,2]

const size={
  width: 0,
  height:0,
  areaHeight: 50,
  radarHeight: 40,
  radarOuterRadius:30,
  radarInner:10,
  chartInterval:10,
  angleStep: Math.PI * 2 / 8,
  masteryMax:0,
  countMax: 0
}

const width = 400,
    height = 100,
    titleInnerRadius = 50,
    titleOuterRadius = 54,
    totalOuterRadius = 84,
    totalInnerRadius = 20,
    lineHeight = 76
const data = [3, 4, 6, 7, 8, 3, 9, 1, 5, 3, 8, 6, 4, 9, 3, 2, 6, 7, 5, 8, 9];

function findIntervals(arr) {
  const result = [];
  for (let i = 1; i < arr.length; i++) {
    const diff = arr[i] - arr[i - 1];
    if (diff > 0.05) {
      // console.log(diff, i)
      result.push([i-1, i]);
    }
  }
  return result.map(([start, end]) => [start, end + (end - start)]);
}

function completeRange(arr) {
  return _.range(arr[0], arr[arr.length - 1] + 1);
}

function octagonPath(center, index, innerRadius) {
  let path = '';
  const x0 = center[0] + Math.cos(size.angleStep * index + Math.PI/8) * innerRadius,
      y0 = center[1] + Math.sin(size.angleStep * index + Math.PI/8) * innerRadius,
      x1 = center[0] + Math.cos(size.angleStep * (index+1) + Math.PI/8) * innerRadius,
      y1 = center[1] + Math.sin(size.angleStep * (index+1) + Math.PI/8) * innerRadius,
      x2 = center[0] + Math.cos(size.angleStep * index + Math.PI/8) * size.radarOuterRadius,
      y2 = center[1] + Math.sin(size.angleStep * index + Math.PI/8) * size.radarOuterRadius,
      x3 = center[0] + Math.cos(size.angleStep * (index+1) + Math.PI/8) * size.radarOuterRadius,
      y3 = center[1] + Math.sin(size.angleStep * (index+1) + Math.PI/8) * size.radarOuterRadius

  path += `M ${x0} ${y0} `;
  path += `L ${x2} ${y2} `;
  path += `L ${x3} ${y3} `;
  path += `L ${x1} ${y1} `;
  path += 'Z';
  return path;
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
const modeRef = ref()

onMounted(()=>{
  initChart(sample_data)
  // emitter.on('detail', detail=>{
  //   initChart(detail)
  // })
})

function initChart(detail){
  // console.log(detail)
  size.masteryMax=_.max([_.max(detail[0]['detail']['mastery']), _.max(detail[0]['detail']['mastery']), _.max(detail[0]['detail']['mastery'])])
  size.countMax=_.max([d3.max(detail[0]['detail']['key_detail'], d=>d.count), d3.max(detail[1]['detail']['key_detail'], d=>d.count), d3.max(detail[1]['detail']['key_detail'], d=>d.count)])
  size.width=modeRef.value[0].clientWidth
  size.height=size.areaHeight+size.chartInterval*4+size.radarHeight*2
  console.log(modeRef.value[0].clientWidth)
  _.forEach(detail, (item ,index)=>{
    const svg = d3.select(`#cluster-feature-${index}`)
        .append('svg')
        .attr('width', size.width)
        .attr('height', size.height)
    const areaGroup = svg.append('g')
        .attr('id', `area-group-${index}`)
    initAreaChart(areaGroup, item.detail)
    const radarGroup = svg.append('g')
        .attr('transform', `translate(-158, ${size.areaHeight + size.chartInterval})`)
        .attr('id', `radar-group-${index}`)
    initRadarChart(radarGroup, item.detail)
  })
}

function initAreaChart(group, data){
  const mastery = data.mastery
  const intervals = findIntervals(mastery)
  const xScale = d3.scaleLinear([0, mastery.length], [0, size.width]),
      yScale = d3.scaleLinear([0, size.masteryMax], [size.areaHeight, 0])

  const lineGenerator = d3.line()
      .x((_, i) => xScale(i))
      .y(d => {
        return yScale(d)
      })
      .curve(d3.curveBumpX);

  const gradient = group.append('defs')
      .append('linearGradient')
      .attr('id', 'gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');
  gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', CommonColor.Master);
  gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', 'white');

  const area = d3.area()
      .x(d=>xScale(d))
      .y1(d=>{
        return yScale(mastery[d])
      })
      .y0(yScale(0))
      .curve(d3.curveBumpX)

  _.forEach(intervals, item=> {
    group.append('path')
        .datum(completeRange(item))
        .attr('fill', 'url(#gradient)')
        .attr('d', area)
  })

  group.append('path')
      .datum(mastery)
      .attr('d', lineGenerator)
      .attr('fill', 'none')
      .attr('stroke', CommonColor.Master)
      .attr('stroke-width', 2)


}

function initRadarChart(group, data) {
  const radarWidth = size.radarHeight*Math.cos(Math.PI/8)*2
  group.selectAll('g')
      .data(new Array(3).fill(0))
      .enter()
      .append('g')
      .attr('id', (d, i)=>`radar-${i}`)
      .attr('transform', (d, i) => `translate(${(size.width-12)/2*i-radarWidth/2*i}, 0)`)
  _.forEach(new Array(3).fill(0), (d, i) => {
    const dataSlice = _.filter(data['key_detail'], {'index': i})
    const correctScale = d3.scaleLinear([0,1], [size.radarOuterRadius, size.radarHeight]),
        countScale = d3.scaleLog([0+1, size.countMax+1], [size.radarOuterRadius, size.radarInner])
    const item = d3.select(`#${group.attr('id')} > #radar-${i}`)
        item.append('g')
            .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")
            .selectAll("polygon")
            .data([dataSlice])
            .enter()
            .append("polygon")
            .attr("points", d=> {
              return d.map((e, i)=>{
                return [
                  (correctScale(e['correctness'])+size.radarInner)*Math.cos(size.angleStep * i + Math.PI/8),
                  (correctScale(e['correctness'])+size.radarInner)*Math.sin(size.angleStep * i + Math.PI/8)
                ].join(',')
              }).join(' ')
            })
            .style("stroke", "#999")
            .style("fill", "none")

    item.append("g")
        .attr("transform", "translate(" + (width / 2) + ", " + (height / 2) + ")")
        .selectAll("path")
        .data(dataSlice)
        .enter()
        .append("path")
        .attr("d", (d, i) => {
          // console.log(d['count'])
          const center = [0, 0];
          return octagonPath(center, i, countScale(d['count']+1));
        })
        .attr('fill', (d, i)=>titleColorList[i])
        // .style("stroke", "#999")
  })
}

</script>

<template>
  <div class="overflow-scroll container" style="height: 40%;">
    <div ref="modeRef" class="w-full chart-subcomponent" v-for="i in clusters" :key="i" :id='`cluster-feature-${i}`'>
      <div style="text-align: left">
        <span class="cluster-icon" :style="{backgroundColor: clusterColorList[i]}">
        </span> 簇 # {{(i+1)}}
      </div>
    </div>
    <!-- <div style="width:50px;height:1000px;border:1px solid #000;">This is a rectangle!</div> -->
  </div>
</template>

<style scoped>
.container::-webkit-scrollbar {
    display: none;
}
.cluster-icon{
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: inline-block;
}
</style>