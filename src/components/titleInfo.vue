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

const width = 150;
const x = d3.scaleLinear()
            .domain([-0.01, 1])
            .range([0, width]);
const drawBar = () => {
    const margin = {top: 10, right: 0, bottom: 0, left: 10};
    //若knowledge数组只有一个知识点（题目对应一个知识点）
    if(tableData.length === 1){
        //console.log('this is one knowledge');
        //绘制横向柱状图
        const svg = d3.select(titleInfo.value)
            .attr('width',160)
            .attr('height',40);
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
            .on('mouseover', function(event, d) {
                // 添加悬浮提示框
                const tooltip = d3.select('body')
                    .append('div')
                    .attr('class', 'tooltip')
                    .style('background-color', 'rgba(128, 128, 128, 0.7)') // 设置背景颜色为半透明的灰色
                    .style('position', 'absolute')
                    .style('z-index', '10')// 设置提示框的层级
                    .style('visibility', 'hidden')
                    .style('border-radius', '4px')
                    .text(`知识点：${d.name}；掌握程度：${d.value.toFixed(2)}`); // 设置提示框的文本

                tooltip.style('visibility', 'visible')
                    .style('left', `${event.pageX + 5}px`)// 设置提示框的位置
                    .style('top', `${event.pageY + 5}px`);
            })
            .on('mouseout', function() {
                d3.select('.tooltip').remove();
            })

        g.append('rect')
            .attr('x',0)
            .attr('y',0)
            .attr('width',150)
            .attr('height',20)
            .attr('fill','none')
            .attr('stroke','rgb(220,220,220)')
            .attr('stroke-width',1)
        
    }
    //若knowledge数组有2个知识点（题目对应2个知识点）
    else if(tableData.length === 2){
        //绘制两个横向柱状图，纵向排列
        const svg = d3.select(titleInfo.value)
            .attr('width',160)
            .attr('height',60);
        // svg.selectAll("*").remove(); // Clear previous chart
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
            .on('mouseover', function(event, d) {
                // 添加悬浮提示框
                const tooltip = d3.select('body')
                    .append('div')
                    .attr('class', 'tooltip')
                    .style('background-color', 'rgba(128, 128, 128, 0.7)') // 设置背景颜色为半透明的灰色
                    .style('position', 'absolute')
                    .style('z-index', '10')// 设置提示框的层级
                    .style('visibility', 'hidden')
                    .style('border-radius', '4px')
                    .text(`知识点：${d.name}；掌握程度：${d.value.toFixed(2)}`); // 设置提示框的文本

                tooltip.style('visibility', 'visible')
                    .style('left', `${event.pageX + 5}px`)// 设置提示框的位置
                    .style('top', `${event.pageY + 5}px`);
            })
            .on('mouseout', function() {
                d3.select('.tooltip').remove();
            })

        g.append('rect')
            .attr('x',0)
            .attr('y',0)
            .attr('width',150)
            .attr('height',20)
            .attr('fill','none')
            .attr('stroke','rgb(220,220,220)')
            .attr('stroke-width',1)
        
        g.append('rect')
            .attr('x',0)
            .attr('y',25)
            .attr('width',150)
            .attr('height',20)
            .attr('fill','none')
            .attr('stroke','rgb(220,220,220)')
            .attr('stroke-width',1)

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