<script setup>
import * as d3 from 'd3'
import { max } from 'd3';
import { ref, onMounted, watch} from 'vue'
import {getKnowledgeColor} from '../utils/getColor.js'

const props = defineProps({
    tableData: {
        type: Array,
        required: true
    }
});
const tableData = props.tableData;
const titleInfo = ref(null);

const width = 120;
const x = d3.scaleLinear()
            .domain([0, 1])
            .range([0, width]);
const drawBar = () => {
    //若knowledge数组只有一个知识点（题目对应一个知识点）
    if(tableData.length === 1){
        //console.log('this is one knowledge');
        //绘制横向柱状图
        const svg = d3.select(titleInfo.value)
            .attr('width',120)
            .attr('height',50);
        svg.selectAll("*").remove(); // Clear previous chart
        const margin = {top: 10, right: 10, bottom: 10, left: 10};
        const width = +svg.attr('width') - margin.left - margin.right;
        const height = +svg.attr('height') - margin.top - margin.bottom;
        const y = d3.scaleBand()
            .domain(tableData.map(d => d.name))
            .range([0, height])
        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
        g.selectAll('.bar')
            .data(tableData)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', 0)
            .attr('y', d => y(d.name))
            .attr('width', d => x(d.value))
            .attr('height', 20)
            .attr('fill',d => {
                return getKnowledgeColor(d.name.slice(0,5));
            })
        
    }
    //若knowledge数组有2个知识点（题目对应2个知识点）
    else if(tableData.length === 2){
        //绘制两个横向柱状图，纵向排列
        const svg = d3.select(titleInfo.value)
            .attr('width',120)
            .attr('height',100);
        svg.selectAll("*").remove(); // Clear previous chart
        const margin = {top: 10, right: 10, bottom: 10, left: 10};
        const width = +svg.attr('width') - margin.left - margin.right;
        const height = +svg.attr('height') - margin.top - margin.bottom;
        const y = d3.scaleBand()
            .domain(tableData.map(d => d.name))
            .range([0, height])
        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
        g.selectAll('.bar')
            .data(tableData)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', 0)
            .attr('y', d => y(d.name))
            .attr('width', d => x(d.value))
            .attr('height', 20)
            .attr('fill',d => {
                return getKnowledgeColor(d.name.slice(0,5));
            })

    }
}

onMounted(()=>{
    drawBar();
})
</script>

<template>
    <svg ref="titleInfo"></svg>
</template>

<style scoped>

</style>