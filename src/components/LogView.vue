<template>
    <div id="logview" ref="containerRef"> </div>
</template>

<script setup>
import * as d3 from 'd3';
import { onMounted, ref, watch } from "vue";
import getKnowledgeColor from '../utils/index'; 



const logData = [
    {"status": "Absolutely_Correct", "score": 5, "knowledge": "r8S3g"},
    {"status": "Partially_Correct", "score": 3, "knowledge": "t5V9e"},
    {"status": "Error1", "score": 0, "knowledge": "m3D1v"},
    {"status": "Absolutely_Correct", "score": 5, "knowledge": "s8Y2f"},
    {"status": "Error2", "score": 0, "knowledge": "m3D1v"},
    {"status": "Absolutely_Correct", "score": 5, "knowledge": "k4W1c"},
    {"status": "Error1", "score": 0, "knowledge": "g7R2j"},
    {"status": "Partially_Correct", "score": 3, "knowledge": "r8S3g"},
    {"status": "Error3", "score": 0, "knowledge": "b3C9s"},
    {"status": "Error1", "score": 0, "knowledge": "y9W5d"},
    {"status": "Partially_Correct", "score": 3, "knowledge": "t5V9e"},
    {"status": "Error1", "score": 0, "knowledge": "m3D1v"},
    {"status": "Absolutely_Correct", "score": 5, "knowledge": "s8Y2f"},
    {"status": "Absolutely_Correct", "score": 5, "knowledge": "k4W1c"},
    {"status": "Error1", "score": 0, "knowledge": "g7R2j"},
    {"status": "Partially_Correct", "score": 3, "knowledge": "r8S3g"},
    {"status": "Absolutely_Correct", "score": 5, "knowledge": "k4W1c"},
    {"status": "Error1", "score": 0, "knowledge": "g7R2j"},
    {"status": "Partially_Correct", "score": 3, "knowledge": "r8S3g"},
    {"status": "Error3", "score": 0, "knowledge": "b3C9s"},
    {"status": "Error1", "score": 0, "knowledge": "y9W5d"},
    {"status": "Partially_Correct", "score": 3, "knowledge": "t5V9e"},
    {"status": "Partially_Correct", "score": 3, "knowledge": "t5V9e"},
    {"status": "Error1", "score": 0, "knowledge": "m3D1v"},
    {"status": "Absolutely_Correct", "score": 5, "knowledge": "s8Y2f"},
    {"status": "Error1", "score": 0, "knowledge": "g7R2j"},
    {"status": "Partially_Correct", "score": 3, "knowledge": "r8S3g"},
    {"status": "Absolutely_Correct", "score": 5, "knowledge": "k4W1c"},
    {"status": "Error1", "score": 0, "knowledge": "g7R2j"},
    {"status": "Partially_Correct", "score": 3, "knowledge": "r8S3g"},
    {"status": "Error3", "score": 0, "knowledge": "b3C9s"},
    {"status": "Error1", "score": 0, "knowledge": "y9W5d"},
    {"status": "Partially_Correct", "score": 3, "knowledge": "t5V9e"},
    {"status": "Error1", "score": 0, "knowledge": "m3D1v"},
    {"status": "Absolutely_Correct", "score": 5, "knowledge": "s8Y2f"},
    {"status": "Absolutely_Correct", "score": 5, "knowledge": "k4W1c"},
    {"status": "Error1", "score": 0, "knowledge": "g7R2j"},
    {"status": "Partially_Correct", "score": 3, "knowledge": "r8S3g"},
    {"status": "Absolutely_Correct", "score": 5, "knowledge": "k4W1c"},
    {"status": "Error1", "score": 0, "knowledge": "g7R2j"},
    {"status": "Partially_Correct", "score": 3, "knowledge": "r8S3g"},
    {"status": "Error3", "score": 0, "knowledge": "b3C9s"},
]
const knowledge = ["r8S3g", "t5V9e", "m3D1v", "s8Y2f", "k4W1c", "g7R2j", "b3C9s", "y9W5d"]

const containerRef = ref()

onMounted(()=>{
    init()
})


function init() {
    const intervalX = 1;
    const intervalY = 3;
    const cellWidth = 16 + intervalX;
    const cellHeight = 16 + intervalY;
    const width = containerRef.value.clientWidth;
    const height = cellHeight * knowledge.length + 20;
    const kdot_left = 10
    const log_left = kdot_left + cellWidth
    const margin_top = 0.5
    const r = (cellHeight-intervalY)/2

    const gray = "#F1F1F1"

    // const gray = getKnowledgeColor.getKnowledgeColor("t5V9e")
    console.log(gray)
    
    // console.log("width"+width+"height"+height)

    //处理数据
    var n = 8, m = logData.length;
    var table = new Array(n);
    for(var i = 0; i < n; i++) {
        table[i] = new Array();
    }

    for(var j = 0; j < m; j ++) {

        var k_index = knowledge.indexOf(logData[j].knowledge)
        for(var i = 0; i < n; i ++) 
            if(i == k_index)
                table[i][j] = {"xx": i, "yy": j, "log": logData[j]}
            else
                table[i][j] = {"xx": i, "yy": j, "log": null}
    }
    table = table.flat()
    // console.log(table)

    //状态颜色映射
    function getColor(status) {
        if(status == "Absolutely_Correct")
            return "#99BC85";
        if(status == "Partially_Correct")
            return "#F9F7C9";
        return "#F19292"; 
    }

    const svg = d3
          .select("#logview")
          .append("svg")
          .attr("viewBox", [0, 0, width, height])
          .attr("width", width)
          .attr("height", height)
          .attr("style", "max-width: 100%; height: auto; font: 12px sans-serif;");

    const kdot = svg.selectAll("g")
        .data(knowledge)
        .join("g")
        .attr("class", "kl")
        .attr("transform", function(d, i) {
            return `translate(${kdot_left}, ${i * cellHeight + margin_top + r})`
        })
        .append("circle")
            .attr("r", r)
            .attr("fill", d => getKnowledgeColor.getKnowledgeColor(d))


    const log = svg.selectAll(".log")
        .data(table)
        .join("g")
        .attr("class", "log")
        .attr("transform", function(d) {
            // console.log("d"+d)
                return `translate(${d.yy * cellWidth + log_left}, ${d.xx * cellHeight + margin_top})`
        })
        .append("rect")
            .attr("width", cellWidth - intervalX)
            .attr("height", cellHeight - intervalY)
            .attr("fill", d => d.log ? getColor(d.log.status): gray)

}
</script>
