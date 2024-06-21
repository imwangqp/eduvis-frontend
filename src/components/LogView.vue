<template>
    <div class="outerHeader" style="text-align: left;">
        <div class="title-text" style="text-align: left;">
            答题日志
        </div>
        <div class="slider-demo-block">
            <!-- <span class="demonstration">宽度</span> -->
            <el-slider v-model="value1" :min="1" :max="16" size="small"/>
        </div>
    </div>
    <div class="outerContainer" style="max-height: 100%;">
        <div class="card" v-for="(item, index) in cards" :key="index" :style="getCardStyle(index)">
            <div class="header">
                <div class="title">学号: {{ item }}</div>

                <div>
                    <el-button-group class="button">
                        <el-button @click="toTop(index)" size="small" round>
                            <el-icon>
                                <Upload />
                            </el-icon>
                        </el-button>
                        <el-button @click="moveUp(index)" size="small" round>
                            <el-icon>
                                <Top />
                            </el-icon>
                        </el-button>
                        <el-button @click="toBottom(index)" size="small" round>
                            <el-icon>
                                <Download />
                            </el-icon>
                        </el-button>
                        <el-button @click="moveDown(index)" size="small" round >
                            <el-icon>
                                <Bottom />
                            </el-icon>
                        </el-button>
                    </el-button-group>
                </div>

            </div>

            <div id="logview" class="container" > 
                <div> 
                    <svg :id="`knowledge-${index}`" ></svg>
                </div>

                <div id="logContainer" class="overflow-x-auto" >
                    <svg :id="`log-${index}`" style="min-width:100%;"></svg>
                </div>

                <div>
                    <svg :id="`line-${index}`" style="width: 100%;" :ref="(el) => setLineRef(el, index)"></svg>
                </div>
            
            </div>
        </div>

        <div class="tooltip">
            <!-- <span class="tooltipText"> {{ content }} </span> -->
        </div>
    </div>
    
</template>

<script setup>
import * as d3 from 'd3';
import { onMounted, reactive, ref, watch, computed, watchEffect } from "vue";
import getKnowledgeColor from '../utils/index'; 
import axios from "axios";
import { useStore } from 'vuex'
import _ from 'lodash'

var data = new Map();

// var cards = reactive(["8b6d1125760bd3939b6e", "63eef37311aaac915a45"]);
// var cards = reactive(["3c89c7f1db26ae691db8"]);
var cards = reactive([]);

var selectedKnowledge = [-1, -1, -1, -1, -1, -1, -1, -1];

const knowledge = ["r8S3g", "t5V9e", "m3D1v", "s8Y2f", "k4W1c", "g7R2j", "b3C9s", "y9W5d"]
//方块宽度
var value1 = ref(8)

const lineRef = ref([])
const intervalX = 1;
const intervalY = 2;
// var cellWidth = ref();
// cellWidth = value1.value + intervalX;
var cellWidth = value1.value + intervalX;

const cellHeight = 14 + intervalY;

const highlightColor = "yellow"
const highlightWidth = 2

const lineWidth = 1;
const newLineWidth = 3;

var content = ref()
const store = useStore()
var signal = ref(0)
var tempIds = []
var meanLines = new Map();
var knowledgeData = new Map();

onMounted(()=>{
    console.log("store"+JSON.stringify(store.getters.getId))
    console.log("store"+store.getters.getId.length)
    // signal.value = computed(()=>{
    //     store.getters.getId.length
    // })

    watch(
      () => store.getters.getId.length,
      (newValue, oldValue) => {
        // console.log('itemIds changed:', store.getters.getId[0])
        tempIds = store.getters.getId
        if(newValue > oldValue) {
            cards.push(tempIds[tempIds.length-1])
            var newId = cards.length-1
            // axios.get('/api/getAnswerLog', {
            //     params: {
            //         stu_id: cards[newId]
            //     }
            // })
            
            axios.post('/api/getAnswerLog', {
                id: cards[newId]
            })
            .then(res => {
                if(res.data.code) {
                    console.log(res.data.code)
                    // console.log(index+"data---------------"+JSON.stringify(res.data))
                    data.set(cards[newId], res.data.data)
                    // data[index] = res.data.data
                    // emitter.emit('detail', res.data.detail)
                    initKnowledge(newId)
                    initLog(newId)
                    
                } else {
                    console.log(res.data.msg)
                }
            })

            //折线图数据
            axios.get('/api/getKnowledgeMastery', {
                params: {
                    stu_id: cards[newId]
                }
            })
            .then(response => {
                console.log("===============")
                console.log(cards[newId])
                console.log(response.data)
                knowledgeData.set(cards[newId], response.data.data)
                console.log("linedata---------", response.data.data)
                // initLineChart(newId)


                //折线图数据
                console.log("cards"+cards[newId])
                axios.post('/api/getAvgMastery', {
                    id: cards[newId]
                })
                .then(response => {
                    console.log("===============")
                    console.log(response.data)
                    meanLines.set(cards[newId], response.data)
                    initLineChart(newId)
                })
                .catch(error => {
                console.log(error)
                })
            })
            .catch(error => {
              console.log(error)
            })
        }})



    
    // cards.forEach((item, index) => {
    //     axios.get('/api/getAnswerLog', {
    //         params: {
    //             stu_id: cards[index]
    //         }
    //     }).then(res => {
    //         if(res.data.code) {
    //             console.log("-----------")
    //             // console.log(index+"data---------------"+JSON.stringify(res.data))
    //             data.set(cards[index], res.data.data)
    //             // data[index] = res.data.data
    //             // emitter.emit('detail', res.data.detail)
    //             initKnowledge(index)
    //             initLog(index)
    //             initLineChart(index)
    //         } else {
    //             console.log(res.data.msg)
    //         }
    //     })

    //     //折线图数据
    //     //折线图数据
    //     axios.get('/api/getKnowledgeMastery', {
    //             params: {
    //                 stu_id: cards[index]
    //             }
    //         })
    //         .then(response => {
    //             console.log("===============")
    //             console.log(response.data)
    //             knowledgeData[index] = response.data.data
    //             console.log("linedata---------", response.data.data)
    //             // initLineChart(newId)


    //             //折线图数据
    //             axios.post('/api/getAvgMastery', {
    //                 id: cards[index]
    //             })
    //             .then(response => {
    //                 console.log("===============")
    //                 console.log(response.data)
    //                 meanLines = response.data
    //                 initLineChart(index)
    //             })
    //             .catch(error => {
    //             console.log(error)
    //             })
    //         })
    //         .catch(error => {
    //         console.log(error)
    //         })
        
    // })
    
    console.log("watch")

    watch(value1, (newVal, oldVal) => {
        console.log("watch"+newVal, oldVal)
        cellWidth = newVal + intervalX
        cards.forEach((item, index) => {
            initKnowledge(index)
            initLog(index)
            initLineChart(index)
            
        })
        cards.forEach((item, index) => {
            if(selectedKnowledge[index] != -1)
                addHighlight(selectedKnowledge[index], index)
        })
    })

})

function setLineRef(el, index) {
    if(el) {
        lineRef[index] = el
    }
}

function getCardStyle(index) {
    let top = 0;
    for (let i = 0; i < index; i++) {
        top += cards[i].offsetHeight +8; // 16 是卡片之间的间距
    }
    return {
        top: `${top}px`,
    };
}

function moveUp(index) {
    console.log("moveup"+index)
    if (index > 0) {
        // 交换当前卡片与上一个卡片的位置
        [cards[index], cards[index - 1]] = [cards[index - 1], cards[index]];
        initLineChart(index)
        initLineChart(index-1)
        initLog(index)
        initLog(index-1)
        initKnowledge(index)
        initKnowledge(index - 1)

        var selectTmp = selectedKnowledge[index]
        selectedKnowledge[index] = selectedKnowledge[index - 1]
        selectedKnowledge[index - 1]=selectTmp
        // [selectedKnowledge[index], selectedKnowledge[index-1]] = [selectedKnowledge[index-1], selectedKnowledge[index]]
        if(selectedKnowledge[index] != -1) 
            addHighlight(selectedKnowledge[index], index)
        if(selectedKnowledge[index-1] != -1) 
            addHighlight(selectedKnowledge[index-1], index-1)
    }
}

function toTop(index) {
    if (index > 0) {
        // 交换当前卡片与上一个卡片的位置
        [cards[index], cards[0]] = [cards[0], cards[index]];
        initLineChart(index)
        initLineChart(0)
        initLog(index)
        initLog(0)
        initKnowledge(index)
        initKnowledge(0)
        var selectTmp = selectedKnowledge[index]
        selectedKnowledge[index] = selectedKnowledge[0]
        selectedKnowledge[0]=selectTmp
        // [selectedKnowledge[index], selectedKnowledge[0]] = [selectedKnowledge[0], selectedKnowledge[index]]
        if(selectedKnowledge[index] != -1) 
            addHighlight(selectedKnowledge[index], index)
        if(selectedKnowledge[0] != -1) 
            addHighlight(selectedKnowledge[0], 0)
    }
}

function toBottom(index) {
    if (index < cards.length - 1) {
        // 交换当前卡片与下一个卡片的位置
        var temp = cards[index]
        cards[index] = cards[cards.length - 1]
        cards[cards.length - 1] = temp
        
        console.log("tobottom")
        // [cards[index], cards[cards.length - 1]] = [cards[cards.length - 1], cards[index]];
        initKnowledge(index)
        initKnowledge(cards.length - 1)
        initLineChart(index)
        initLineChart(cards.length - 1)
        initLog(index)
        initLog(cards.length - 1)
        var selectTmp = selectedKnowledge[index]
        selectedKnowledge[index] = selectedKnowledge[cards.length - 1]
        selectedKnowledge[cards.length - 1]=selectTmp

        if(selectedKnowledge[index] != -1) 
            addHighlight(selectedKnowledge[index], index)
        if(selectedKnowledge[cards.length - 1] != -1) 
            addHighlight(selectedKnowledge[cards.length - 1], cards.length - 1)
    }
}

function moveDown(index) {
    console.log("movedown"+index)
    if (index < cards.length - 1) {
        // 交换当前卡片与下一个卡片的位置
        var temp = cards[index]
        cards[index] = cards[index + 1]
        cards[index + 1] = temp

        console.log("tobottom")
        // [cards[index], cards[index + 1]] = [cards[index + 1], cards[index]];
        initKnowledge(index)
        initKnowledge(index + 1)
        initLineChart(index)
        initLineChart(index + 1)
        initLog(index)
        initLog(index + 1)

        console.log("movedown"+selectedKnowledge[index])
        var selectTmp = selectedKnowledge[index]
        selectedKnowledge[index] = selectedKnowledge[index + 1]
        selectedKnowledge[index + 1]=selectTmp
        // [selectedKnowledge[index], selectedKnowledge[index + 1]] = [selectedKnowledge[index + 1], selectedKnowledge[index]]
        console.log("movedown"+selectedKnowledge[index+1])
        if(selectedKnowledge[index] != -1) 
            addHighlight(selectedKnowledge[index], index)
        if(selectedKnowledge[index + 1] != -1) 
            addHighlight(selectedKnowledge[index + 1], index + 1)
    }
}


//状态颜色映射
function getColor(status) {
    if(status == "Absolutely_Correct")
        return "#99BC85";
    if(status == "Partially_Correct")
        return "#F9F7C9";
    return "#F19292"; 
}

function addHighlight(num, index) {
    console.log("addhighlight"+num)
    console.log("addhighlight"+index)
    const dotSvg = d3.select(`#knowledge-${index}`)
    const svg = d3.select(`#log-${index}`)
    const dots = dotSvg.selectAll(".kl")
    const rects = svg.selectAll(".log")
    //滤镜
    const filter = svg.append("defs")
    .append("filter")
    .attr("id", "blur")
    .attr("x", "-50%")
    .attr("y", "-50%")
    .attr("width", "200%")
    .attr("height", "200%");

    filter.append("feGaussianBlur")
    .attr("in", "SourceGraphic")
    .attr("stdDeviation", 3);

    dots.filter((d, i) => i !== num)
    .attr("opacity", .2)
    // .attr("filter", "url(#blur)");
    

    rects.filter((d, i) => d.xx !== num)
    .attr("filter", "url(#blur)")
    .attr("opacity", 0.5);
    

    //突出显示
    // const box = d3.selectAll("rect")
    // .filter(function() {
    //     return d3.select(this).style("opacity") == "0";
    // });
    // const box = d3.select("body").selectAll("rect:empty");
    // const box = d3.selectAll(".box")
    // box.filter((d, i) => i === index).attr("opacity", "1")

    const shadowFilter = svg.append("filter")
    .attr("id", "shadowFilter")
    .attr("x", "-10%")
    .attr("y", "-10%")
    .attr("width", "120%")
    .attr("height", "120%");

    shadowFilter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 1)
    .attr("result", "blur");

    shadowFilter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 1)
    .attr("dy", 1)
    .attr("result", "offsetBlur");

    shadowFilter.append("femerge")
    .append("femergenode")
    .attr("in", "offsetBlur")
    .append("femergenode")
    .attr("in", "SourceGraphic");

    // rects.filter((d, i) => d.xx === num).style("filter", "drop-shadow(1px 1px 1px #aaa)")


    //折线图

    const lineSvg = d3.select(`#line-${index}`)
    const lines = lineSvg.selectAll(".brokenLine");
    const areas = lineSvg.selectAll(".area");
    lines.filter((d, i) => i === num)
    .attr("stroke", getKnowledgeColor.getKnowledgeColor(knowledge[num]))
    .attr("stroke-width", newLineWidth);

    lines.filter((d, i) => i !== num)
    .attr("stroke", null)

    // lines.filter((d, i) => d.xx !== num)
    // .attr("opacity", 0.5);

    //面积
    areas.filter((d, i) => i === num)
    .attr("fill-opacity", .3)
}

function removeHighlight(num, index) {
    // console.log("index"+index)
    const dotSvg = d3.select(`#knowledge-${index}`)
    const svg = d3.select(`#log-${index}`)

    const rects = svg.selectAll(".log")
    const dots = dotSvg.selectAll(".kl")

    rects.attr("filter", null)
    rects.filter((d, i) => d.xx !== num)
    .attr("opacity", 1);

    rects.filter((d, i) => d.xx === num)
    .style("filter", null)

    //折线图
    const lineSvg = d3.select(`#line-${index}`)
    const lines = lineSvg.selectAll(".brokenLine");
    const areas = lineSvg.selectAll(".area");

    lines.filter((d, i) => i === num)
    .attr("stroke-width", lineWidth)

    lines.filter((d, i) => i !== num)
    .attr("opacity", 1);

    lines.filter((d, i) => i === num)
    .attr("stroke", null)

    //面积
    areas.filter((d, i) => i === num)
    .attr("fill-opacity", .0)

    //知识点
    dots.filter((d, i) => i !== num)
    .attr("opacity", 1)
}

function initKnowledge(index) {
    const r = (cellHeight-intervalY)/2
    const radius = 2
    const margin = { top: 0, right: 10, bottom: 10, left: 10 }
    const dotSvg = d3.select(`#knowledge-${index}`)
    dotSvg.selectAll('*').remove()

    const kdot = dotSvg.selectAll("g")
        .data(knowledge)
        .join("g")
        .attr("class", "kl")
        .attr("transform", function(d, i) {
            return `translate(${margin.left}, ${i * cellHeight + margin.top + r})`
        })
        .append("circle")
            .attr("r", r)
            .attr("fill", d => getKnowledgeColor.getKnowledgeColor(d))
        .on("click", handleClick)

    function handleClick(event, d) {

        const xy = d3.pointer(event, dotSvg.node());
        const yv = xy[1]
        // console.log(cellHeight)
        const num = Math.floor((yv-margin.top)/ cellHeight);

        // console.log(num)

        if(selectedKnowledge[index] == num) {
            removeHighlight(num, index);    //参数
            selectedKnowledge[index] = -1;
            return;
        }

        if(selectedKnowledge[index] != -1) {
            removeHighlight(selectedKnowledge[index], index)
        }
        addHighlight(num, index)
        selectedKnowledge[index] = num;
    }
}
function initLineChart(index) {
    // const start_x = cellWidth * logData.length + 50
    // console.log("lineRef"+lineRef[index])
    const width = lineRef[index].clientWidth;
    // const width = cellHeight * knowledge.length + 40;
    const height = cellHeight * knowledge.length ;
    const axis_color = "#b2bbbe"

    // console.log("index" + index)
    const margin = { top: 10, right: 10, bottom: 10, left: 30 }
    var lineData = getdata(knowledgeData.get(cards[index]))
    var meanData = meanLines.get(cards[index])
    console.log("linData"+lineData)
    function getdata(data) {
        var datda = data.datda
        var xAxis = data.xAxis
        var yy;
        var lineAxis = []
        
        for(var i = 0; i < datda.length; i ++) {
            yy = datda[i]
            var xx = [];
            var num = 0
            //换x坐标
            for(var j = 0; j < xAxis[i].length; j ++) {
                if(xAxis[i][j])
                    xx[num ++] = j
            }

            var pointers = []
            for(var j = 0; j < yy.length; j ++) {
                pointers.push({'x': xx[j], 'y': yy[j]})
            }
            lineAxis[i] = pointers
            // console.log("pointers"+JSON.stringify(pointers))
        }
        return lineAxis
    }


    var x = d3.scaleLinear().range([0, width-margin.left-margin.right]).nice();
    var y = d3.scaleLinear().range([height-margin.top-margin.bottom, 0]).nice();

    var xAxis = d3.axisBottom(x).ticks(5).tickSizeOuter(0);
    var yAxis = d3.axisLeft(y).ticks(5).tickSizeOuter(0);

    //另一个轴
    var yy = d3.scaleLinear().range([height-margin.top-margin.bottom, 0]).nice();

    const svg = d3.select(`#line-${index}`)
    //清空svg
    svg.selectAll('*').remove()
    var lineG = svg.append("g").attr("class", "line").attr("transform", `translate(${ margin.left}, ${margin.top})`)



    // 添加x轴
    lineG.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${height-margin.top-margin.bottom})`)
      .call(xAxis);

    // 添加y轴
    lineG.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    //坐标轴样式
    function changeAxisStyle() {
        // 设置 x 轴线的颜色和宽度
        d3.select(".x.axis path")
        .style("stroke", axis_color)
        .style("stroke-width", "1px");

        // 设置 y 轴线的颜色和宽度  
        d3.select(".y.axis path")
        .style("stroke", axis_color)
        .style("stroke-width", "1px");

        // 设置 x 轴刻度线的颜色和长度
        d3.selectAll(".x.axis .tick line")
        .style("stroke", axis_color)
        .style("stroke-length", "2px");

        // 设置 y 轴刻度线的颜色和长度
        d3.selectAll(".y.axis .tick line")
        .style("stroke", axis_color)
        .style("stroke-length", "2px");

        // 设置 x 轴刻度文字的字体、大小和颜色
        d3.selectAll(".x.axis .tick text")
        .style("font-family", "sans-serif")
        .style("font-size", "10px")
        .style("fill", axis_color);

        // 设置 y 轴刻度文字的样式
        d3.selectAll(".y.axis .tick text")
        .style("font-family", "sans-serif")
        .style("font-size", "12px")
        .style("fill", axis_color);
    }
    
    // 数据绑定
    var line = d3.line()
      .x((d) => x(d.x))
      .y(d => {/*console.log("yyyyyyyyyyyyy"+y(d.y));*/return yy(d.y)})
      .curve(d3.curveBasis);
     // .curve(d3.curveCardinal);

    // 添加多条线
    var paths = lineG.selectAll(".brokenLine")
        .data(lineData)
        .enter()
        .append("path")
        .attr("class", "brokenLine")
        .attr("fill", "none")
        .attr("stroke", (d, i) => getKnowledgeColor.getKnowledgeColor(knowledge[i])) // 使用不同颜色
        .attr("stroke-width", lineWidth)
        .attr("d", line);

    //平均折线图
    var line2 = d3.line()
      .x((d, i) => {/*console.log("xxxx"+i); */ return x(i)})
      .y(d => {/*console.log("yyyy"+y(d));*/ return y(d)})
      .curve(d3.curveBasis);
    
    //   console.log("meanlines", meanLines[index])
 
    

    //添加面积
    var areas = lineG.selectAll(".area")
        .data(lineData)
        .enter()
        .append("path")
        .attr("class", "area")
        .attr("fill", (d, i) => getKnowledgeColor.getKnowledgeColor(knowledge[i]))
        .attr("fill-opacity", .0)
        .attr("d", d3.area()
            .x(function(d) { return x(d.x) })
            .y0(yy(0))
            .y1((d) => yy(d.y))
            .curve(d3.curveBasis)
        )

     // 更新函数
    function updateChart(newDataset) {
        // 更新比例尺的域
        const allXValues = newDataset.flatMap(d => d.map(p => p.x));
        const allYValues = newDataset.flatMap(d => d.map(p => p.y));
        
        // console.log("meanlines", d3.max(meanData))
        // console.log("extent"+d3.extent(allXValues))
        // console.log("extent"+Math.max(d3.max(allYValues), d3.max(meanLines[index])))
        // x.domain(d3.extent(allXValues));
        // y.domain(d3.extent(allYValues));
        x.domain(d3.extent(allXValues));
        y.domain([0, 1]);
        // y.domain([0, d3.max(allYValues)]);

        yy.domain([0, d3.max(allYValues)]);

        // 更新轴
        lineG.select(".x.axis")
            .transition()
            .duration(10)
            .call(xAxis);

        lineG.select(".y.axis")
            .transition()
            .duration(10)
            .call(yAxis);

        // 更新线条
        paths.data(newDataset)
            .transition()
            .duration(10)
            .attr("d", line);

        var meanPath = lineG
        .append("path")
        .datum(meanData)
        .attr("class", "meanLine")
        .attr("fill", "none")
        .attr("stroke", "#FF0000") // 使用不同颜色
        .attr("stroke-width", lineWidth)
        .attr("d", line2);

        paths.attr("stroke", null)

    
        areas.data(newDataset)
            .transition()
            .duration(10)
            .attr("d", d3.area()
                .x(function(d) { return x(d.x) })
                .y0(yy(0))
                .y1((d) => yy(d.y))
                .curve(d3.curveBasis)
            )

        changeAxisStyle();
    }

    updateChart(lineData)
}

function initLog(index) {
    var logData = data.get(cards[index])
    // const viewWidth = containerRef.value.clientWidth;
    console.log(index+"logData----------------"+logData.length)
    const width = cellWidth * logData.length + 10;
    const height = cellHeight * knowledge.length + 5;

    const margin = {left: 0, right: 5, top: 0.5, bottom: 0.5}

    const radius = 2

    const gray = "#F1F1F1"

    console.log("newwidth"+cellWidth)

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

    const svg = d3.select(`#log-${index}`)
    svg.selectAll('*').remove()

    svg.attr("width", width)

    const log = svg.selectAll(".log")
        .data(table)
        .join("g")
        .attr("class", "log")
        .attr("transform", function(d) {
            // console.log("d"+d)
                return `translate(${d.yy * cellWidth + margin.left}, ${d.xx * cellHeight + margin.top})`
        })
        .append("rect")
            .attr("rx", radius) // 设置x方向的圆角半径
            .attr("ry", radius) 
            .attr("width", cellWidth - intervalX)
            .attr("height", cellHeight - intervalY)
            .attr("fill", d => d.log ? getColor(d.log.status): gray)
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut);

    const box = svg.selectAll(".box")
        .data(knowledge)
        .join("g")
        .attr("class", "box")
        .attr("transform", function(d, i) {
            return `translate(${margin.left}, ${i * cellHeight + margin.top})`
        })
        .append("rect")
            .attr("rx", radius) // 设置x方向的圆角半径
            .attr("ry", radius)
            .attr("width", cellWidth * logData.length - intervalX)
            .attr("height", cellHeight - intervalY)
            // .attr("stroke-width", "1px")
            .attr("fill", "none")
            .attr("stroke", d => getKnowledgeColor.getKnowledgeColor(d))
            .attr("opacity", "0")

    // const tooltip = d3.select("body")
    //     .append("div")
    //     .attr("class", "tooltip")
    //     .style("opacity", 0.9);

    const tooltip = d3.select(".tooltip")
        .style("opacity", 0)

    function handleMouseOver(event, d) {
        if(d.log == null)
            return;

        if(selectedKnowledge[index] != -1 && selectedKnowledge[index] != d.xx)
            return;

        d3.select(this).style("filter", "drop-shadow(3px 3px 3px #B8B8B8)")

        tooltip.transition()
            .duration(200)
            .style("opacity", 0.8);

        console.log(event.pageX)
        console.log(d3.pointer(event)[1])
        tooltip.html(`${d.log.status}: ${d.log.score}`)
            .style("left", (event.pageX) + "px")
            .style("top", (event.pageY) + "px");
    }

    function handleMouseOut() {
        d3.select(this).style("filter", null)
        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
    }

}
</script>

<style scoped>
.outerContainer {
    height: fit-content;
    overflow-y: scroll;
    scroll-behavior: smooth;
    box-sizing: border-box;
}
.container {
box-sizing: border-box;
  height: auto;
  width: 100%;
  display: grid;
  grid-template-columns: 2rem 3fr 2fr; /* 两列平均分配空间 */
}

::-webkit-scrollbar	{ 
    scrollbar-width: thin; 
    scrollbar-color: red green;
}
svg{
    box-sizing: border-box;
}
/* .logContainer {
    height: fit-content;
    width: 100%;
    overflow: auto;
} */
.tooltip {
  position: absolute;
  text-align: center;
  width: fit-content;
  height: 30;
  padding: 2px;
  font: 12px sans-serif;
  background: rgb(121, 121, 121);
  border: 0px;
  border-radius: 8px;
  pointer-events: none;
}
.outerHeader{
    display: grid;
    grid-template-columns: 4fr 1fr;
}
.header{
    width: 100%;
    height: fit-content;
    display: grid;
    grid-template-columns: 3fr 1fr;
    border-bottom-style: solid;
    border-bottom-color: rgba(207, 207, 207, 0.343);
    border-bottom-width: 1.5px;
    margin-bottom: 5px;

}
.title{
    text-align: left;
    font-size: 12px;
}
.button{
    float: right;
    margin-bottom: 5px;
}
.el-button{
    height: 20px;
}
.subcomponent{
    box-sizing: border-box;
    @apply bg-white rounded-lg border-slate-100 border-0 p-0 m-0;
  }
</style>