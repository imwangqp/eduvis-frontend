<script setup>
import * as d3 from 'd3'
import { ref, onMounted, watch, nextTick} from 'vue'
import {getKnowledgeColor} from '../utils/getColor.js'

// const data = [
//     {
//         name:'知识点1',
//         children:[
//             {
//                 name:'子知识点1-1',
//                 children:[
//                     {
//                         name:'题目1',
//                         children:[
//                             {
//                                 rank:0,
//                                 value:'10'
//                             },
//                             {
//                                 rank:1,
//                                 value:'20'
//                             },
//                             {
//                                 rank:2,
//                                 value:'30'
//                             }
//                         ]
//                     },
//                     {
//                         name:'题目2',
//                         children:[
//                             {
//                                 rank:0,
//                                 value:'10'
//                             },
//                             {
//                                 rank:1,
//                                 value:'20'
//                             },
//                             {
//                                 rank:2,
//                                 value:'30'
//                             }
//                         ]
//                     }
//                 ]
//             },
//             {
//                 name:'子知识点1-2',
//                 children:[
//                     {
//                         name:'题目x',
//                         children:[
//                             {
//                                 rank:0,
//                                 value:'10'
//                             },
//                             {
//                                 rank:1,
//                                 value:'20'
//                             },
//                             {
//                                 rank:2,
//                                 value:'30'
//                             }
//                         ]
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         name:'知识点2',
//         children:[
//             {
//                 name:'子知识点2-1',
//                 children:[
//                     {
//                         name:'题目3',
//                         children:[
//                             {
//                                 rank:0,
//                                 value:'10'
//                             },
//                             {
//                                 rank:1,
//                                 value:'20'
//                             },
//                             {
//                                 rank:2,
//                                 value:'30'
//                             }
//                         ]
//                     },
//                     {
//                         name:'题目4',
//                         children:[
//                             {
//                                 rank:0,
//                                 value:'10'
//                             },
//                             {
//                                 rank:1,
//                                 value:'20'
//                             },
//                             {
//                                 rank:2,
//                                 value:'30'
//                             }
//                         ]
//                     }
//                 ]
//             },
//             {
//                 name:'子知识点2-2',
//                 children:[
//                     {
//                         name:'题目5',
//                         children:[
//                             {
//                                 rank:0,
//                                 value:'10'
//                             },
//                             {
//                                 rank:1,
//                                 value:'20'
//                             },
//                             {
//                                 rank:2,
//                                 value:'30'
//                             }
//                         ]
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         name:'知识点3',
//         children:[
//             {
//                 name:'子知识点3-1',
//                 children:[
//                     {
//                         name:'题目8',
//                         children:[
//                             {
//                                 rank:0,
//                                 value:'10'
//                             },
//                             {
//                                 rank:1,
//                                 value:'20'
//                             },
//                             {
//                                 rank:2,
//                                 value:'30'
//                             }
//                         ]
//                     }
//                 ]
//             },
//             {
//                 name:'子知识点3-2',
//                 children:[
//                     {
//                         name:'题目9',
//                         children:[
//                             {
//                                 rank:0,
//                                 value:'10'
//                             },
//                             {
//                                 rank:1,
//                                 value:'20'
//                             },
//                             {
//                                 rank:2,
//                                 value:'30'
//                             }
//                         ]
//                     }
//                 ]
//             }
//         ]
//     }
// ]

const start = 30
const nodes = [
    {id:'r8S3g',x:10,y:50,group:1},
    {id:'t5V9e',x:10,y:150,group:1},
    {id:'m3D1v',x:10,y:250,group:1},
    {id:'s8Y2f',x:10,y:350,group:1},
    {id:'k4W1c',x:10,y:450,group:1},
    {id:'g7R2j',x:10,y:550,group:1},
    {id:'b3C9s',x:10,y:650,group:1},
    {id:'y9W5d',x:10,y:750,group:1},


    {id:'0-0',x:100,y:40,group:2},
    {id:'0-1',x:100,y:90,group:2},
    {id:'1-0',x:100,y:140,group:2},
    {id:'1-1',x:100,y:190,group:2},
    {id:'2-0',x:100,y:240,group:2},
    {id:'2-1',x:100,y:290,group:2},

    {id:'T0',x:200,y:30,group:3},
    {id:'T1',x:200,y:70,group:3},
    {id:'T2',x:200,y:110,group:3},
    {id:'T3',x:200,y:150,group:3},
    {id:'T4',x:200,y:190,group:3},
    {id:'T5',x:200,y:230,group:3},

    {id:'T5',x:200,y:270,group:3},
    {id:'T6',x:200,y:310,group:3},
    {id:'T7',x:200,y:350,group:3},
    {id:'T8',x:200,y:390,group:3},
    {id:'T9',x:200,y:430,group:3},
    {id:'T10',x:200,y:470,group:3},

    {id:'T11',x:200,y:510,group:3},
    {id:'T12',x:200,y:550,group:3},
    {id:'T13',x:200,y:590,group:3},
    {id:'T14',x:200,y:630,group:3},
    {id:'T15',x:200,y:670,group:3},
    {id:'T16',x:200,y:710,group:3},

    {id:'T17',x:200,y:750,group:3},
    {id:'T18',x:200,y:790,group:3},
    {id:'T19',x:200,y:830,group:3},
    {id:'T20',x:200,y:870,group:3},
    {id:'T21',x:200,y:910,group:3},
    {id:'T22',x:200,y:950,group:3},

    {id:'T23',x:200,y:990,group:3},
    {id:'T24',x:200,y:1030,group:3},
    {id:'T25',x:200,y:1070,group:3},
    {id:'T26',x:200,y:1110,group:3},
    {id:'T27',x:200,y:1150,group:3},
    {id:'T28',x:200,y:1190,group:3},

    {id:'T29',x:200,y:1230,group:3},
    {id:'T30',x:200,y:1270,group:3},
    {id:'T31',x:200,y:1310,group:3},
    {id:'T32',x:200,y:1350,group:3},
    {id:'T33',x:200,y:1390,group:3},
    {id:'T34',x:200,y:1430,group:3},

    {id:'T35',x:200,y:1470,group:3},
    {id:'T36',x:200,y:1510,group:3},
    {id:'T37',x:200,y:1550,group:3},
    {id:'T38',x:200,y:1590,group:3},
    {id:'T39',x:200,y:1630,group:3},
    {id:'T40',x:200,y:1670,group:3},

    {id:'T41',x:200,y:1710,group:3},
    {id:'T42',x:200,y:1750,group:3},
    {id:'T43',x:200,y:1790,group:3},
    {id:'T44',x:200,y:1830,group:3},
]

const links = [
    {source:'r8S3g',target:'0-0'},
    {source:'r8S3g',target:'0-1'},
    {source:'t5V9e',target:'1-0'},
    {source:'t5V9e',target:'1-1'},
    {source:'m3D1v',target:'2-0'},
    {source:'m3D1v',target:'2-1'},
    {source:'0-0',target:'T0'},
    {source:'0-1',target:'T0'},
    {source:'0-1',target:'T1'},
    {source:'1-0',target:'T2'},
    {source:'1-1',target:'T3'},
    {source:'2-0',target:'T2'},
    {source:'2-0',target:'T5'},
    {source:'1-1',target:'T4'},
    {source:'2-1',target:'T5'},

]

// const treeRef = ref(null)
// const treeDiv = ref(null)

const graphRef = ref(null)
const graphDiv = ref(null)

// const root = {
//     name:'root',
//     children:data.map(d => {
//         return {
//             name:d.name,
//             children:d.children.map(c => {
//                 return {
//                     name:c.name,
//                     children:c.children.map(cc => {
//                         return {
//                             name:cc.name
//                         }
//                     })
//                 }
//             })
//         }
//     })
// }

// const drawTree = () => {
//     const margin = {top: 5, right: 5, bottom: 5, left: 10}
//     const width = treeDiv.value.clientWidth - margin.left - margin.right
//     const height = treeDiv.value.clientHeight - margin.top - margin.bottom

//     const svg = d3.select(treeRef.value)
//         .attr('width', width + margin.left + margin.right)
//         .attr('height', height + margin.top + margin.bottom)
//         .append('g')
//         .attr('transform', `translate(${margin.left},${margin.top})`)
    
//     let i = 0
//     const duration = 750
//     let rootNode

//     const treemap = d3.tree().size([height, width])//作用是：设置树的布局大小，即树的宽度和高度

//     rootNode = d3.hierarchy(root,function(d){
//         return d.children
//     })
//     rootNode.x0 = height / 2
//     rootNode.y0 = 0

//     update(rootNode)
//     drawRight()

//     function update(source){
//         const treeData = treemap(rootNode);

//         const nodes = treeData.descendants(),
//               links = treeData.descendants().slice(1);
        
//         nodes.forEach(d => { d.y = d.depth * 100});//设置每个节点的x坐标
        
//         // ****************** Nodes section ***************************
        
//         // Update the nodes...
//         const node = svg.selectAll('g.node')
//             .data(nodes, d => d.id || (d.id = ++i));
        
//         // Enter any new modes at the parent's previous position.
//         const nodeEnter = node.enter().append('g')
//             .attr('class', 'node')
//             .attr("transform", d => "translate(" + source.y0  + "," + source.x0 + ")")//设置新节点的初始位置
        
//         // Add Circle for the nodes
//         nodeEnter.append(d => {
//             if(d.depth===0){
//                 return document.createElementNS(d3.namespaces.svg, 'circle');
//             }
//             else if(d.depth === 1){
//                 return document.createElementNS(d3.namespaces.svg, 'circle');
//             }
//             else{
//                 return document.createElementNS(d3.namespaces.svg, 'rect');
//             }
//         })
//         .attr('class', 'node')
//         .attr('r', 8) // 对于圆形和椭圆形
//         .attr('width', 15) // 对于矩形
//         .attr('height', 15) // 对于矩形和椭圆形
//         .attr('fill',d => {
//             if(d.depth === 0) {
//                 return 'red'
//             } else if(d.depth === 1){
//                 return 'green'
//             } else {
//                 return 'blue'
//             }
//         })
        
//         // UPDATE
//         const nodeUpdate = nodeEnter.merge(node);
        
//         // Transition to the proper position for the node
//         nodeUpdate.transition()
//           .duration(duration)
//           .attr("transform", d => "translate(" + d.y + "," + d.x + ")");
        
//         // 节点样式
//         nodeUpdate.select('circle.node')
//           .attr('r', 8)
//           .style("fill", d => {
//               if(d.depth === 0) {
//                   return 'red'
//               } else{
//                 //每个知识点 对应 一个颜色
//                   return 'green'
//               }
//           })

//         nodeUpdate.select('rect.node')
//           .attr('width', 15)
//           .attr('height', 15)
//           .style("fill", d => {
//               return '#a0a19d'
//           })
//           .attr('x', -7.5)
//           .attr('y', -7.5)
        
//         // Remove any exiting nodes
//         const nodeExit = node.exit().transition()
//             .duration(duration)
//             .attr("transform", d => "translate(" + source.y + "," + source.x + ")")
//             .remove();
        
//         // On exit reduce the node circles size to 0
//         nodeExit.select('circle')
//           .attr('r', 1e-6);
        
//         // On exit reduce the opacity of text labels
//         nodeExit.select('text')
//           .style('fill-opacity', 1e-6);
        
//         // ****************** links section ***************************
        
//         // Update the links...
//         const link = svg.selectAll('path.link')
//             .data(links, d => d.id);
        
//         // Enter any new links at the parent's previous position.
//         const linkEnter = link.enter().insert('path', "g")
//             .attr("class", "link")
//             .attr('d', d => {
//                 const o = {x: source.x0, y: source.y0};
//                 return diagonal(o, o);
//             });
        
//         // UPDATE
//         const linkUpdate = linkEnter.merge(link);
        
//         // Transition back to the parent element position
//         linkUpdate.transition()
//             .duration(duration)
//             .attr('d', d => {
//                 const source = {x: d.x, y: d.y};
//                 const target = {x: d.parent.x, y: d.parent.y};
//                 return diagonal(source, target);
//             });
        
//         const linkExit = link.exit().transition()
//             .duration(duration)
//             .attr('d', d => {
//                 const o = {x: d.x, y: d.y};
//                 return diagonal(o, o);
//             })
//             .remove();
        
//         nodes.forEach(d => {
//             d.x0 = d.x;
//             d.y0 = d.y;
//         });

//         // 节点之间的路径
//         function diagonal(s, d) {
//             const path = `M ${s.y} ${s.x}
//                 C ${(s.y + d.y) / 2} ${s.x},
//                   ${(s.y + d.y) / 2} ${d.x},
//                   ${d.y} ${d.x}`;

//             return path;
//         }

//     }

//     function drawRight(){
//         //const width = treeDiv.clientWidth - d3.select(treeRef.value).width

//         // svg右侧绘制每个题目对应的柱状图
//         const rightSide = svg.append('g')
//             .attr('transform',`translate(${width * 0.6 + margin.left},${margin.top})`)

//         //添加底部的坐标轴    
//         rightSide.append('g')
//             .attr('class', 'axis axis--x')
//             .attr('transform', `translate(0,${height - margin.bottom})`)
//             .call(d3.axisTop(d3.scaleLinear().domain([0, 3]).range([0, width * 0.35])).ticks(3))
            
//     }

// }

const drawGraph = () => {
    const margin = {top: 5, right: 5, bottom: 5, left: 10}
    const width = graphDiv.value.clientWidth - margin.left - margin.right
    const height = graphDiv.value.clientHeight - margin.top - margin.bottom

    const svg = d3.select(graphRef.value)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)

    // Create scales
    //let xScale = d3.scaleLinear().domain([0, 500]).range([0, width]);
    //let yScale = d3.scaleLinear().domain([0, 800]).range([0, height]);

    // const updateScales = () => {
    //     width = graphDiv.value.clientWidth - margin.left - margin.right;
    //     height = graphDiv.value.clientHeight - margin.top - margin.bottom;

    //     xScale.range([0, width]);
    //     yScale.range([0, height]);

    //     svg.attr('width', width + margin.left + margin.right)
    //         .attr('height', height + margin.top + margin.bottom);

    //     updatePositions();
    // };

    // const updatePositions = () => {
    //     link
    //         .attr('x1', d => xScale(nodes.find(n => n.id === d.source).x))
    //         .attr('y1', d => yScale(nodes.find(n => n.id === d.source).y))
    //         .attr('x2', d => xScale(nodes.find(n => n.id === d.target).x))
    //         .attr('y2', d => yScale(nodes.find(n => n.id === d.target).y));

    //     node.filter('circle')
    //         .attr('cx', d => xScale(d.x))
    //         .attr('cy', d => yScale(d.y));

    //     node.filter('rect')
    //         .attr('x', d => xScale(d.x) - 5)
    //         .attr('y', d => yScale(d.y) - 5);
    // };
    
    const link = svg.selectAll('.link')
        .data(links)
        .enter()
        .append('line')
        .attr('class', 'link')
        .attr('x1',d => nodes.find(n => n.id === d.source).x)
        .attr('y1',d => nodes.find(n => n.id === d.source).y)
        .attr('x2',d => nodes.find(n => n.id === d.target).x)
        .attr('y2',d => nodes.find(n => n.id === d.target).y)


    const node = svg.selectAll('.node')
        .data(nodes)
        .enter()
        .append( d => {
            if(d.group === 1){
                return document.createElementNS(d3.namespaces.svg, 'circle');
            } else {
                return document.createElementNS(d3.namespaces.svg, 'rect');
            }
        })
        .attr('cx', d => d.x)//circle
        .attr('cy', d => d.y)
        .attr('r', 10)
        .attr('x', d => d.x - 5)//rect
        .attr('y', d => d.y - 5)
        .attr('width', 10)
        .attr('height', 10)

    svg.selectAll('circle')
        .attr('fill', d => {
            return getKnowledgeColor(d.id)
        })
    

    node.append('title')
        .text(d => d.id)

    drawRight()

    function drawRight(){
    //const width = treeDiv.clientWidth - d3.select(treeRef.value).width
    // svg右侧绘制每个题目对应的柱状图
    const rightSide = svg.append('g')
        .attr('transform',`translate(${width * 0.5 + margin.left},${margin.top})`)
    //添加底部的坐标轴    
    rightSide.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', `translate(0,${margin.top})`)
        .call(d3.axisTop(d3.scaleLinear().domain([0, 3]).range([0, width * 0.45])).ticks(3))

    // 每一个题目右侧绘制柱状图（每个题目共有三个柱形，分别对应0分、部分正确、满分）
    const barData = [
        {name:'T0',value:[10,20,30]},
        {name:'T1',value:[10,20,30]},
        {name:'T2',value:[10,20,30]},
        {name:'T3',value:[10,20,30]},
        {name:'T4',value:[10,20,30]},
        {name:'T5',value:[10,20,30]},

        {name:'T0',value:[10,20,30]},
        {name:'T1',value:[10,20,30]},
        {name:'T2',value:[10,20,30]},
        {name:'T3',value:[10,20,30]},
        {name:'T4',value:[10,20,30]},
        {name:'T5',value:[10,20,30]},

        {name:'T0',value:[10,20,30]},
        {name:'T1',value:[10,20,30]},
        {name:'T2',value:[10,20,30]},
        {name:'T3',value:[10,20,30]},
        {name:'T4',value:[10,20,30]},
        {name:'T5',value:[10,20,30]},

        {name:'T0',value:[10,20,30]},
        {name:'T1',value:[10,20,30]},
        {name:'T2',value:[10,20,30]},
        {name:'T3',value:[10,20,30]},
        {name:'T4',value:[10,20,30]},
        {name:'T5',value:[10,20,30]},

        {name:'T0',value:[10,20,30]},
        {name:'T1',value:[10,20,30]},
        {name:'T2',value:[10,20,30]},
        {name:'T3',value:[10,20,30]},
        {name:'T4',value:[10,20,30]},
        {name:'T5',value:[10,20,30]},

        {name:'T0',value:[10,20,30]},
        {name:'T1',value:[10,20,30]},
        {name:'T2',value:[10,20,30]},
        {name:'T3',value:[10,20,30]},
        {name:'T4',value:[10,20,30]},
        {name:'T5',value:[10,20,30]},

        {name:'T0',value:[10,20,30]},
        {name:'T1',value:[10,20,30]},
        {name:'T2',value:[10,20,30]},
        {name:'T3',value:[10,20,30]},
        {name:'T4',value:[10,20,30]},
        {name:'T5',value:[10,20,30]},
    ]

    const barYscale = d3.scaleLinear().domain([0,30]).range([0,30])//

    barData.forEach((d,i) => {
        const x = 0
        const y = i * 20 + 10
        console.log(y)
        const barWidth = 20
        //const barHeight = 40
        const barPadding = 50

        const bar = rightSide.append('g')
            .attr('transform',`translate(${x},${y})`)

        bar.selectAll('rect')
            .data(d.value)
            .enter()
            .append('rect')
            .attr('x', (d,i) => i * (barWidth + barPadding) +  20)
            .attr('y', y)//
            .attr('width', barWidth)
            .attr('height', d => barYscale(d))
            .attr('fill', 'steelblue')
    })

    }

    const bbox = d3.select('svg').node().getBBox()//获取svg的边界框
    d3.select('svg').attr('height',bbox.height)

    // Initial position update
    //updatePositions();

    // Listen for resize events
    //window.addEventListener('resize', updateScales);


    
}
onMounted(() => {
    nextTick(() => {
        drawGraph()
    })
})

</script>

<template>
    <div style="width: 100%; height: 80%;overflow:scroll" ref="graphDiv">
        <svg ref="graphRef"></svg>
    </div>
</template>

<style>
.link{
    stroke:#dadbdd;
    stroke-width: 2px;
    fill: none;
}

</style>