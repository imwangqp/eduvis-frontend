<script setup>
import * as d3 from 'd3'
import { ref, onMounted, watch} from 'vue'
import {CommonColor, getKnowledgeColor} from '../utils/getColor';
import axios from "axios";

const props = defineProps({
    badknowledgeData: {
        type: Array,
        required: true
    }
});
    
const glyphRef = ref(null);

const drawGlyph = () => {
    const badknowledgeData = props.badknowledgeData;

    const svg = d3.select(glyphRef.value)
        .attr('width',200)
        .attr('height',50);
    
    svg.selectAll("*").remove(); // Clear previous chart

    const margin = {top: 10, right: 10, bottom: 10, left: 10};
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 2;
    const innerRadius = 0.6 * radius;
    const outerRadius = 0.9 * radius;

    const g = svg.append('g')
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    badknowledgeData.forEach((d,i)=>{
        const x = i * (radius * 2 + 10) + radius;
        const y = height / 2;

        const glyph = g.append('g')
            .attr('transform', `translate(${x},${y})`);
        
        glyph.append('circle')
            .attr('r', innerRadius)
            .attr('fill', getKnowledgeColor(d.name))
            // .attr('stroke', '#ccc')
            .attr('stroke-width', 1.3)
            .on('mouseover', function(event, d) {

              const tooltip=d3.select('.tool-tip')
              tooltip.html(`<div>知识点：${d.name}</div><div>正确率：${d.value.toFixed(2)}</div>`)
                  .style('visibility', 'visible')
                  .style('left', `${event.pageX + 5}px`)
                  .style('top', `${event.pageY + 5}px`)
            })
            .on('mouseout', function() {
              d3.select('.tool-tip').style('visibility', 'hidden');
            });
        
        // Draw outer arc for accuracy
        const arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle(0)
            .endAngle(2 * Math.PI * d.value);

        glyph.append("path")
            .attr("d", arc)
            .attr("fill", CommonColor.CircleRadius)

        // Draw background circle for the arc
        glyph.append("circle")
            .attr("r", outerRadius)
            .attr("fill", "none")
            .attr("stroke", CommonColor.CircleBorder)
            .attr("stroke-width", 1.3);
    })


}

onMounted(()=>{
    drawGlyph();
})

watch(()=>[props.badknowledgeData],()=>{
    drawGlyph();
})
</script>

<template>
    <svg ref="glyphRef"></svg>
</template>

<style scoped>

</style>