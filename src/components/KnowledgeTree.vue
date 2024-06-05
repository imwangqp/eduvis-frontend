<script setup>
import * as d3 from 'd3'
import { ref, onMounted, watch, nextTick} from 'vue'

const data = [
    {
        name:'知识点1',
        children:[
            {
                name:'子知识点1-1',
                children:[
                    {
                        name:'题目1',
                        children:[
                            {
                                rank:0,
                                value:'10'
                            },
                            {
                                rank:1,
                                value:'20'
                            },
                            {
                                rank:2,
                                value:'30'
                            }
                        ]
                    },
                    {
                        name:'题目2',
                        children:[
                            {
                                rank:0,
                                value:'10'
                            },
                            {
                                rank:1,
                                value:'20'
                            },
                            {
                                rank:2,
                                value:'30'
                            }
                        ]
                    }
                ]
            },
            {
                name:'子知识点1-2',
                children:[
                    {
                        name:'题目x',
                        children:[
                            {
                                rank:0,
                                value:'10'
                            },
                            {
                                rank:1,
                                value:'20'
                            },
                            {
                                rank:2,
                                value:'30'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        name:'知识点2',
        children:[
            {
                name:'子知识点2-1',
                children:[
                    {
                        name:'题目3',
                        children:[
                            {
                                rank:0,
                                value:'10'
                            },
                            {
                                rank:1,
                                value:'20'
                            },
                            {
                                rank:2,
                                value:'30'
                            }
                        ]
                    },
                    {
                        name:'题目4',
                        children:[
                            {
                                rank:0,
                                value:'10'
                            },
                            {
                                rank:1,
                                value:'20'
                            },
                            {
                                rank:2,
                                value:'30'
                            }
                        ]
                    }
                ]
            },
            {
                name:'子知识点2-2',
                children:[
                    {
                        name:'题目5',
                        children:[
                            {
                                rank:0,
                                value:'10'
                            },
                            {
                                rank:1,
                                value:'20'
                            },
                            {
                                rank:2,
                                value:'30'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        name:'知识点3',
        children:[
            {
                name:'子知识点3-1',
                children:[
                    {
                        name:'题目8',
                        children:[
                            {
                                rank:0,
                                value:'10'
                            },
                            {
                                rank:1,
                                value:'20'
                            },
                            {
                                rank:2,
                                value:'30'
                            }
                        ]
                    }
                ]
            },
            {
                name:'子知识点3-2',
                children:[
                    {
                        name:'题目9',
                        children:[
                            {
                                rank:0,
                                value:'10'
                            },
                            {
                                rank:1,
                                value:'20'
                            },
                            {
                                rank:2,
                                value:'30'
                            }
                        ]
                    }
                ]
            }
        ]
    }
]

const treeRef = ref(null)
const treeDiv = ref(null)

const root = {
    name:'root',
    children:data.map(d => {
        return {
            name:d.name,
            children:d.children.map(c => {
                return {
                    name:c.name,
                    children:c.children.map(cc => {
                        return {
                            name:cc.name
                        }
                    })
                }
            })
        }
    })
}
const drawTree = () => {
    const margin = {top: 5, right: 5, bottom: 5, left: 10}
    const width = treeDiv.value.clientWidth - margin.left - margin.right
    const height = treeDiv.value.clientHeight - margin.top - margin.bottom

    const svg = d3.select(treeRef.value)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)
    
    let i = 0
    const duration = 750
    let rootNode

    const treemap = d3.tree().size([height, width])//作用是：设置树的布局大小，即树的宽度和高度

    rootNode = d3.hierarchy(root,function(d){
        return d.children
    })
    rootNode.x0 = height / 2
    rootNode.y0 = 0

    update(rootNode)
    drawRight()

    function update(source){
        const treeData = treemap(rootNode);

        const nodes = treeData.descendants(),
              links = treeData.descendants().slice(1);
        
        nodes.forEach(d => { d.y = d.depth * 100});//设置每个节点的x坐标
        
        // ****************** Nodes section ***************************
        
        // Update the nodes...
        const node = svg.selectAll('g.node')
            .data(nodes, d => d.id || (d.id = ++i));
        
        // Enter any new modes at the parent's previous position.
        const nodeEnter = node.enter().append('g')
            .attr('class', 'node')
            .attr("transform", d => "translate(" + source.y0  + "," + source.x0 + ")")//设置新节点的初始位置
        
        // Add Circle for the nodes
        nodeEnter.append(d => {
            if(d.depth===0){
                return document.createElementNS(d3.namespaces.svg, 'circle');
            }
            else if(d.depth === 1){
                return document.createElementNS(d3.namespaces.svg, 'circle');
            }
            else{
                return document.createElementNS(d3.namespaces.svg, 'rect');
            }
        })
        .attr('class', 'node')
        .attr('r', 8) // 对于圆形和椭圆形
        .attr('width', 15) // 对于矩形
        .attr('height', 15) // 对于矩形和椭圆形
        .attr('fill',d => {
            if(d.depth === 0) {
                return 'red'
            } else if(d.depth === 1){
                return 'green'
            } else {
                return 'blue'
            }
        })
        
        // UPDATE
        const nodeUpdate = nodeEnter.merge(node);
        
        // Transition to the proper position for the node
        nodeUpdate.transition()
          .duration(duration)
          .attr("transform", d => "translate(" + d.y + "," + d.x + ")");
        
        // 节点样式
        nodeUpdate.select('circle.node')
          .attr('r', 8)
          .style("fill", d => {
              if(d.depth === 0) {
                  return 'red'
              } else{
                //每个知识点 对应 一个颜色
                  return 'green'
              }
          })

        nodeUpdate.select('rect.node')
          .attr('width', 15)
          .attr('height', 15)
          .style("fill", d => {
              return '#a0a19d'
          })
          .attr('x', -7.5)
          .attr('y', -7.5)
        
        // Remove any exiting nodes
        const nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", d => "translate(" + source.y + "," + source.x + ")")
            .remove();
        
        // On exit reduce the node circles size to 0
        nodeExit.select('circle')
          .attr('r', 1e-6);
        
        // On exit reduce the opacity of text labels
        nodeExit.select('text')
          .style('fill-opacity', 1e-6);
        
        // ****************** links section ***************************
        
        // Update the links...
        const link = svg.selectAll('path.link')
            .data(links, d => d.id);
        
        // Enter any new links at the parent's previous position.
        const linkEnter = link.enter().insert('path', "g")
            .attr("class", "link")
            .attr('d', d => {
                const o = {x: source.x0, y: source.y0};
                return diagonal(o, o);
            });
        
        // UPDATE
        const linkUpdate = linkEnter.merge(link);
        
        // Transition back to the parent element position
        linkUpdate.transition()
            .duration(duration)
            .attr('d', d => {
                const source = {x: d.x, y: d.y};
                const target = {x: d.parent.x, y: d.parent.y};
                return diagonal(source, target);
            });
        
        const linkExit = link.exit().transition()
            .duration(duration)
            .attr('d', d => {
                const o = {x: d.x, y: d.y};
                return diagonal(o, o);
            })
            .remove();
        
        nodes.forEach(d => {
            d.x0 = d.x;
            d.y0 = d.y;
        });

        // 节点之间的路径
        function diagonal(s, d) {
            const path = `M ${s.y} ${s.x}
                C ${(s.y + d.y) / 2} ${s.x},
                  ${(s.y + d.y) / 2} ${d.x},
                  ${d.y} ${d.x}`;

            return path;
        }

    }

    function drawRight(){
        //const width = treeDiv.clientWidth - d3.select(treeRef.value).width

        // svg右侧绘制每个题目对应的柱状图
        const rightSide = svg.append('g')
            .attr('transform',`translate(${width * 0.6 + margin.left},${margin.top})`)

        //添加底部的坐标轴    
        rightSide.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisTop(d3.scaleLinear().domain([0, 3]).range([0, width * 0.35])).ticks(3))
            
    }

}

onMounted(() => {
    nextTick(() => {
        drawTree()
    })
    //drawTree()
})

</script>

<template>
    <div style="width: 100%; height: 80%;" ref="treeDiv">
        <svg ref="treeRef"></svg>
    </div>
</template>

<style>
.link{
    stroke: rgba(109, 164, 242, 0.948);
    stroke-width: 2px;
    fill: none;
}
</style>