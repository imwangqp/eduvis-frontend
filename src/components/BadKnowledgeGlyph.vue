<script setup>
import * as d3 from 'd3'
import { ref, onMounted, watch} from 'vue'

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
        .attr('height',100);
    
    svg.selectAll("*").remove(); // Clear previous chart

    const margin = {top: 10, right: 10, bottom: 10, left: 10};
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 4;
    const innerRadius = 0.6 * radius;
    const outerRadius = 0.9 * radius;

    const g = svg.append('g')
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const colorScale = d3.scaleOrdinal()
        .domain(badknowledgeData.map(d => d.name))
        .range(d3.schemeCategory10);

    badknowledgeData.forEach((d,i)=>{
        const x = i * (radius * 2 + 10) + radius;
        const y = height / 2;

        const glyph = g.append('g')
            .attr('transform', `translate(${x},${y})`);
        
        glyph.append('circle')
            .attr('r', innerRadius)
            .attr('fill', colorScale(d.name))
            .on('mouseover', function(event, dd) {
                //console.log(d);
                // 添加悬浮提示框
                const tooltip = d3.select('body')
                    .append('div')
                    .attr('class', 'tooltip')
                    .style('background-color', 'rgba(128, 128, 128, 0.7)') // 设置背景颜色为半透明的灰色
                    .style('position', 'absolute')
                    .style('z-index', '10')// 设置提示框的层级
                    .style('visibility', 'hidden')
                    .text(`知识点：${d.name}；正确率：${d.value}`); // 设置提示框的文本

                tooltip.style('visibility', 'visible')
                    .style('left', `${event.pageX + 5}px`)// 设置提示框的位置
                    .style('top', `${event.pageY + 5}px`);
            })
            .on('mouseout', function() {
                glyph.selectAll('text').remove();
                d3.select('.tooltip').remove(); // 移除提示框
            });
        
        // Draw outer arc for accuracy
        const arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle(0)
            .endAngle(2 * Math.PI * d.value);

        glyph.append("path")
            .attr("d", arc)
            .attr("fill", "lightgreen");

        // Draw background circle for the arc
        glyph.append("circle")
            .attr("r", outerRadius)
            .attr("fill", "none")
            .attr("stroke", "#ccc")
            .attr("stroke-width", 2);
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