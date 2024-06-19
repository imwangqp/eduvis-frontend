<script setup>
import * as d3 from 'd3'
import { ref, onMounted, watch} from 'vue'

const props = defineProps({
    data: {
        type: Array,
        required: true
    }
});

const chartRef = ref(null);

const drawLineChart = () => {
    const data = props.data;

    const svg = d3.select(chartRef.value)
        .attr('width',160)
        .attr('height',50);


    svg.selectAll("*").remove(); // Clear previous chart

    const margin = {top: 10, right: 10, bottom: 20, left: 0};
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;
    
    const x = d3.scaleLinear()
        .domain([1, 24])
        .range([5, width - 10]);
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([height, 0]);

    const line = d3.line()
        .x(d => x(d.time))
        .y(d => y(d.value))
        .curve(d3.curveBumpX)  //曲线效果

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    g.append('g')
      //.attr('transform', `translate(0,0)`)
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x)
          .tickValues([6, 12, 18, 24])
          .tickFormat(d3.format('d'))
);
      .call(d3.axisBottom(x).ticks(6).tickFormat(d3.format('d')));

    g.append('text')
        .attr('x', width - 5)
        .attr('y', height + 15)
        .style('text-anchor', 'end')
        .style('font-size', '7px')
        .text('时间');

    g.append('path')
      .datum(data)
      .attr('d', line)
      .style('fill', 'none')
      .style('stroke', '#D29690')
      .style('stroke-width', '1.5px');

}

onMounted(() => {
    drawLineChart();
});

watch(() => props.data, () => {
    drawLineChart();
});
</script>

<template>
    <svg ref="chartRef"></svg>
</template>

<style scopoed>
.axis--x  {

}
<style scoped>
</style>