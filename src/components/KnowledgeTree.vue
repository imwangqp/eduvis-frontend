<script setup>
import * as d3 from 'd3'
import { ref, onMounted, watch, nextTick} from 'vue'
import {getKnowledgeColor} from '../utils/getColor.js'
import titleInfo from './titleInfo.vue'

const start = 30
const nodes = [
    {id:'r8S3g',x:10,y:50,group:1},
    {id:'t5V9e',x:10,y:260,group:1},
    {id:'m3D1v',x:10,y:470,group:1},
    {id:'s8Y2f',x:10,y:680,group:1},
    {id:'k4W1c',x:10,y:890,group:1},
    {id:'y9W5d',x:10,y:1100,group:1},
    {id:'g7R2j',x:10,y:1310,group:1},
    {id:'b3C9s',x:10,y:1520,group:1},



    {id:'r8S3g_l0p5viby',x:100,y:40,group:2},
    {id:'r8S3g_n0m9rsw4',x:100,y:145,group:2},
    {id:'t5V9e_e1k6cixp',x:100,y:250,group:2},
    {id:'m3D1v_t0v5ts9h',x:100,y:355,group:2},
    {id:'m3D1v_v3d9is1x',x:100,y:460,group:2},
    {id:'m3D1v_r1d7fr3l',x:100,y:565,group:2},
    {id:'s8Y2f_v4x8by9j',x:100,y:670,group:2},
    {id:'k4W1c_h5r6nux7',x:100,y:775,group:2},
    {id:'y9W5d_c0w4mj5h',x:100,y:880,group:2},
    {id:'y9W5d_p8g6dgtv',x:100,y:985,group:2},
    {id:'y9W5d_e2j7p95s',x:100,y:1090,group:2},

    {id:'g7R2j_e0v1yls8',x:100,y:1195,group:2},
    {id:'g7R2j_j1g8gd3v',x:100,y:1300,group:2},
    {id:'b3C9s_l4z6od7y',x:100,y:1405,group:2},
    {id:'b3C9s_j0v1yls8',x:100,y:1510,group:2},

// 38T
    {id:'Question_VgKw8PjY1FR6cm2QI9XW',x:200,y:30,group:3},
    {id:'Question_q7OpB2zCMmW9wS8uNt3H',x:200,y:70,group:3},
    {id:'Question_fZrP3FJ4ebUogW9V7taS',x:200,y:110,group:3},
    {id:'Question_BW0ItEaymH3TkD6S15JF',x:200,y:150,group:3},
    {id:'Question_rvB9mVE6Kbd8jAY4NwPx',x:200,y:190,group:3},
    {id:'Question_3oPyUzDmQtcMfLpGZ0jW',x:200,y:230,group:3},
    {id:'Question_3MwAFlmNO8EKrpY5zjUd',x:200,y:270,group:3},
    {id:'Question_x2L7AqbMuTjCwPFy6vNr',x:200,y:310,group:3},
    {id:'Question_tgOjrpZLw4RdVzQx85h6',x:200,y:350,group:3},
    {id:'Question_s6VmP1G4UbEQWRYHK9Fd',x:200,y:390,group:3},
    {id:'Question_h7pXNg80nJbw1C4kAPRm',x:200,y:430,group:3},
    {id:'Question_6RQj2gF3OeK5AmDvThUV',x:200,y:470,group:3},
    {id:'Question_4nHcauCQ0Y6Pm8DgKlLo',x:200,y:510,group:3},
    {id:'Question_TmKaGvfNoXYq4FZ2JrBu',x:200,y:550,group:3},
    {id:'Question_NixCn84GdK2tySa5rB1V',x:200,y:590,group:3},
    {id:'Question_n2BTxIGw1Mc3Zo6RLdUe',x:200,y:630,group:3},
    {id:'Question_7NJzCXUPcvQF4Mkfh9Wr',x:200,y:670,group:3},
    {id:'Question_ZTbD7mxr2OUp8Fz6iNjy',x:200,y:710,group:3},
    {id:'Question_Jr4Wz5jLqmN01KUwHa7g',x:200,y:750,group:3},
    {id:'Question_QRm48lXxzdP7Tn1WgNOf',x:200,y:790,group:3},
    {id:'Question_pVKXjZn0BkSwYcsa7C31',x:200,y:830,group:3},
    {id:'Question_Ej5mBw9rsOUKkFycGvz2',x:200,y:870,group:3},
    {id:'Question_lU2wvHSZq7m43xiVroBc',x:200,y:910,group:3},
    {id:'Question_Mh4CZIsrEfxkP1wXtOYV',x:200,y:950,group:3},
    {id:'Question_62XbhBvJ8NUSnApgDL94',x:200,y:990,group:3},
    {id:'Question_x2Fy7rZ3SwYl9jMQkpOD',x:200,y:1030,group:3},
    {id:'Question_UXqN1F7G3Sbldz02vZne',x:200,y:1070,group:3},
    {id:'Question_Ou3f2Wt9BqExm5DpN7Zk',x:200,y:1110,group:3},
    {id:'Question_Az73sM0rHfWVKuc4X2kL',x:200,y:1150,group:3},
    {id:'Question_EhVPdmlB31M8WKGqL0wc',x:200,y:1190,group:3},
    {id:'Question_oCjnFLbIs4Uxwek9rBpu',x:200,y:1230,group:3},
    {id:'Question_5fgqjSBwTPG7KUV3it6O',x:200,y:1270,group:3},
    {id:'Question_X3wF8QlTyi4mZkDp9Kae',x:200,y:1310,group:3},
    {id:'Question_YWXHr4G6Cl7bEm9iF2kQ',x:200,y:1350,group:3},
    {id:'Question_xqlJkmRaP0otZcX4fK3W',x:200,y:1390,group:3},
    {id:'Question_bumGRTJ0c8p4v5D6eHZa',x:200,y:1430,group:3},
    {id:'Question_hZ5wXofebmTlzKB1jNcP',x:200,y:1470,group:3},
    {id:'Question_FNg8X9v5zcbB1tQrxHR3',x:200,y:1510,group:3},
]

const links = [
    {source:'r8S3g',target:'r8S3g_l0p5viby'},
    {source:'r8S3g',target:'r8S3g_n0m9rsw4'},
    {source:'t5V9e',target:'t5V9e_e1k6cixp'},
    {source:'m3D1v',target:'m3D1v_r1d7fr3l'},
    {source:'m3D1v',target:'m3D1v_v3d9is1x'},
    {source:'m3D1v',target:'m3D1v_t0v5ts9h'},
    {source:'s8Y2f',target:'s8Y2f_v4x8by9j'},
    {source:'k4W1c',target:'k4W1c_h5r6nux7'},
    {source:'y9W5d',target:'y9W5d_c0w4mj5h'},
    {source:'y9W5d',target:'y9W5d_p8g6dgtv'},
    {source:'y9W5d',target:'y9W5d_e2j7p95s'},

    {source:'g7R2j',target:'g7R2j_e0v1yls8'},
    {source:'g7R2j',target:'g7R2j_j1g8gd3v'},
    {source:'b3C9s',target:'b3C9s_l4z6od7y'},
    {source:'b3C9s',target:'b3C9s_j0v1yls8'},


    {source:'r8S3g_l0p5viby',target:'Question_VgKw8PjY1FR6cm2QI9XW'},
    {source:'r8S3g_n0m9rsw4',target:'Question_q7OpB2zCMmW9wS8uNt3H'},
    {source:'r8S3g_l0p5viby',target:'Question_q7OpB2zCMmW9wS8uNt3H'},
    {source:'r8S3g_n0m9rsw4',target:'Question_fZrP3FJ4ebUogW9V7taS'},
    {source:'r8S3g_n0m9rsw4',target:'Question_BW0ItEaymH3TkD6S15JF'},
    {source:'r8S3g_n0m9rsw4',target:'Question_rvB9mVE6Kbd8jAY4NwPx'},
    {source:'t5V9e_e1k6cixp',target:'Question_3oPyUzDmQtcMfLpGZ0jW'},
    {source:'t5V9e_e1k6cixp',target:'Question_3MwAFlmNO8EKrpY5zjUd'},
    {source:'t5V9e_e1k6cixp',target:'Question_x2L7AqbMuTjCwPFy6vNr'},
    {source:'t5V9e_e1k6cixp',target:'Question_tgOjrpZLw4RdVzQx85h6'},
    {source:'t5V9e_e1k6cixp',target:'Question_s6VmP1G4UbEQWRYHK9Fd'},
    {source:'m3D1v_r1d7fr3l',target:'Question_h7pXNg80nJbw1C4kAPRm'},
    {source:'m3D1v_r1d7fr3l',target:'Question_6RQj2gF3OeK5AmDvThUV'},
    {source:'m3D1v_r1d7fr3l',target:'Question_4nHcauCQ0Y6Pm8DgKlLo'},
    {source:'m3D1v_r1d7fr3l',target:'Question_TmKaGvfNoXYq4FZ2JrBu'},
    {source:'m3D1v_r1d7fr3l',target:'Question_NixCn84GdK2tySa5rB1V'},
    {source:'m3D1v_r1d7fr3l',target:'Question_n2BTxIGw1Mc3Zo6RLdUe'},
    {source:'m3D1v_v3d9is1x',target:'Question_7NJzCXUPcvQF4Mkfh9Wr'},
    {source:'m3D1v_v3d9is1x',target:'Question_ZTbD7mxr2OUp8Fz6iNjy'},
    {source:'m3D1v_t0v5ts9h',target:'Question_Jr4Wz5jLqmN01KUwHa7g'},
    {source:'y9W5d_c0w4mj5h',target:'Question_QRm48lXxzdP7Tn1WgNOf'},
    {source:'m3D1v_r1d7fr3l',target:'Question_QRm48lXxzdP7Tn1WgNOf'},
    {source:'y9W5d_c0w4mj5h',target:'Question_pVKXjZn0BkSwYcsa7C31'},
    {source:'m3D1v_r1d7fr3l',target:'Question_pVKXjZn0BkSwYcsa7C31'},
    {source:'y9W5d_c0w4mj5h',target:'Question_Ej5mBw9rsOUKkFycGvz2'},
    {source:'y9W5d_c0w4mj5h',target:'Question_lU2wvHSZq7m43xiVroBc'},
    {source:'k4W1c_h5r6nux7',target:'Question_lU2wvHSZq7m43xiVroBc'},
    {source:'y9W5d_c0w4mj5h',target:'Question_Mh4CZIsrEfxkP1wXtOYV'},
    {source:'y9W5d_c0w4mj5h',target:'Question_62XbhBvJ8NUSnApgDL94'},
    {source:'y9W5d_c0w4mj5h',target:'Question_x2Fy7rZ3SwYl9jMQkpOD'},
    {source:'s8Y2f_v4x8by9j',target:'Question_x2Fy7rZ3SwYl9jMQkpOD'},
    {source:'y9W5d_c0w4mj5h',target:'Question_UXqN1F7G3Sbldz02vZne'},
    {source:'y9W5d_p8g6dgtv',target:'Question_Ou3f2Wt9BqExm5DpN7Zk'},
    {source:'y9W5d_p8g6dgtv',target:'Question_Az73sM0rHfWVKuc4X2kL'},
    {source:'y9W5d_e2j7p95s',target:'Question_EhVPdmlB31M8WKGqL0wc'},
    {source:'g7R2j_e0v1yls8',target:'Question_oCjnFLbIs4Uxwek9rBpu'},
    {source:'m3D1v_r1d7fr3l',target:'Question_oCjnFLbIs4Uxwek9rBpu'},
    {source:'g7R2j_e0v1yls8',target:'Question_5fgqjSBwTPG7KUV3it6O'},
    {source:'g7R2j_e0v1yls8',target:'Question_X3wF8QlTyi4mZkDp9Kae'},
    {source:'g7R2j_j1g8gd3v',target:'Question_YWXHr4G6Cl7bEm9iF2kQ'},
    {source:'g7R2j_e0v1yls8',target:'Question_xqlJkmRaP0otZcX4fK3W'},
    {source:'b3C9s_l4z6od7y',target:'Question_bumGRTJ0c8p4v5D6eHZa'},
    {source:'b3C9s_l4z6od7y',target:'Question_hZ5wXofebmTlzKB1jNcP'},
    {source:'b3C9s_j0v1yls8',target:'Question_FNg8X9v5zcbB1tQrxHR3'}

]

const tableData = [
    {
        ID:'8b6d1125760bd3939b6e',
        score:'3',
        knowledge:[//题目对应的知识点的掌握程度
            {
                name:'r8S3g_l0p5viby',
                value:0.5
            }
        ],
    },
    {
        ID:'xxxx',
        score:'2',
        knowledge:[//题目对应的知识点的掌握程度
            {
                name:'r8S3g_l0p5viby',
                value:1
            },
            {
                name:'k4W1c_25455852',
                value:0.4
            }
        ],
    },
    {
        ID:'8b6d1125760bd3939b6e',
        score:'3',
        knowledge:[//题目对应的知识点的掌握程度
            {
                name:'r8S3g_l0p5viby',
                value:0.5
            }
        ],
    },
    {
        ID:'8b6d1125760bd3939b6e',
        score:'3',
        knowledge:[//题目对应的知识点的掌握程度
            {
                name:'r8S3g_l0p5viby',
                value:0.5
            }
        ],
    },

]
const graphRef = ref(null)
const graphDiv = ref(null)

const getTitleStudentInfo = (titleId) => {
    //console.log(titleId)
    //根据题目ID从后端获取tableData
    
}
const drawGraph = () => {
    const margin = {top: 5, right: 5, bottom: 5, left: 10}
    let width = graphDiv.value.clientWidth - margin.left - margin.right
    let height = graphDiv.value.clientHeight - margin.top - margin.bottom

    const svg = d3.select(graphRef.value)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)

    //Create scales
    let xScale = d3.scaleLinear().domain([0, 500]).range([0, width]);
    //let yScale = d3.scaleLinear().domain([0, 800]).range([0, height]);

    const updateScales = () => {
        width = graphDiv.value.clientWidth - margin.left - margin.right;
        //height = graphDiv.value.clientHeight - margin.top - margin.bottom;

        xScale.range([0, width]);
        //yScale.range([0, height]);

        svg.attr('width', width + margin.left + margin.right)
        rightSide.attr('transform',`translate(${width * 0.5 + margin.left},${margin.top})`)

        updatePositions();
    };

    const updatePositions = () => {
        link
            .attr('x1', d => xScale(nodes.find(n => n.id === d.source).x))
            //.attr('y1', d => yScale(nodes.find(n => n.id === d.source).y))
            .attr('x2', d => xScale(nodes.find(n => n.id === d.target).x))
            //.attr('y2', d => yScale(nodes.find(n => n.id === d.target).y));

        node.filter('circle')
            .attr('cx', d => xScale(d.x))
            //.attr('cy', d => yScale(d.y));

        node.filter('rect')
            .attr('x', d => xScale(d.x) - 5)
            //.attr('y', d => yScale(d.y) - 5);
    };
  const bumpX = d3.line()
      .x(d => d.x)
      .y(d => d.y)
      .curve(d3.curveBumpX);

  const link = svg.selectAll('.link')
        .data(links)
        .enter()
        .append('path')
        .attr('class', 'link')
      .attr('d', d => {
        // 创建一个包含起点和终点的数组
        const points = [
          nodes.find(n => n.id === d.source),
          nodes.find(n => n.id === d.target)
        ];

        // 使用bumpX生成器来计算路径
        return bumpX(points);
      });


    const node = svg.selectAll('.node')
        .data(nodes)
        .enter()
        .append( d => {
            if(d.group === 1){
                return document.createElementNS(d3.namespaces.svg, 'circle');
            } else if(d.group === 2){
                return document.createElementNS(d3.namespaces.svg, 'circle');
            }
            else{
                return document.createElementNS(d3.namespaces.svg, 'rect');
            }
        })
        .attr('cx', d => d.x)//circle
        .attr('cy', d => d.y)
        .attr('x', d => d.x - 5)//rect
        .attr('y', d => d.y - 5)
        .attr('width', 15)
        .attr('height', 15)
        // .attr('fill','#d0d0d0')
        .on('click', d => {
            console.log(d)
        })

    svg.selectAll('circle')
        .attr('fill', d => {
            if(d.group === 1){
                return getKnowledgeColor(d.id)
            }
            else{
                return 'white'
            }
        })
        .attr('r', d => {
            if(d.group === 1){
                return 12
            }
            else{
                return 10
            }
        })
        .attr('stroke', d => {
            if(d.group === 2){
                if(d.id === 'r8S3g_l0p5viby' || d.id === 'r8S3g_n0m9rsw4')
                    return '#fbb4ae'
                else if(d.id === 't5V9e_e1k6cixp')
                    return '#b3cde3'
                else if(d.id === 'm3D1v_r1d7fr3l' || d.id === 'm3D1v_v3d9is1x' || d.id === 'm3D1v_t0v5ts9h')
                    return '#ccebc5'
                else if(d.id === 's8Y2f_v4x8by9j')
                    return '#decbe4'
                else if(d.id === 'k4W1c_h5r6nux7')
                    return '#fed9a6'
                else if(d.id === 'g7R2j_e0v1yls8' || d.id === 'g7R2j_j1g8gd3v')
                    return '#ffffcc'
                else if(d.id === 'b3C9s_l4z6od7y' || d.id === 'b3C9s_j0v1yls8')
                    return '#e5d8bd'
                else if(d.id === 'y9W5d_c0w4mj5h' || d.id === 'y9W5d_p8g6dgtv' || d.id === 'y9W5d_e2j7p95s')
                    return '#fddaec'
            }
        })
        .attr('stroke-width', d => {
            if(d.group === 2){
                return 8
            }
        })
    
    svg.selectAll('rect')
        .attr('fill', 'rgb(220,220,220)')
        .attr('stroke', 'rgb(220,220,220)')
        .attr('stroke-width', 2)
        .on('click', d => {
            //console.log(d.srcElement.__data__.id)
            getTitleStudentInfo(d.srcElement.__data__.id)
        })

    node.append('title')
        .text(d => d.id)

    const rightSide = svg.append('g')
        .attr('transform',`translate(${width * 0.5 + margin.left},${margin.top})`)

    const  drawRight = () => {
    rightSide.append('g')
        .append('text')
        .attr('class','titleInfo')
        .attr('x', width * 0.09)
        .attr('y', 0)
        .attr('dy', '0.32em')
        .text('错误');

    rightSide.append('g')
        .append('text')
        .attr('class','titleInfo')
        .attr('x', width * 0.33) 
        .attr('y', 0) 
        .attr('dy', '0.32em')
        .text('部分正确');

    rightSide.append('g')
        .append('text')
        .attr('class','titleInfo')
        .attr('x', width * 0.43) 
        .attr('y', 0) 
        .attr('dy', '0.32em')
        .text('正确');

    // 每一个题目右侧绘制柱状图（每个题目共有三个柱形，分别对应0分、部分正确、满分）
    const barData = [
        {id:'Question_VgKw8PjY1FR6cm2QI9XW',value:[15,25,35],knowledge:['r8S3g_l0p5viby']},
        {id:'Question_q7OpB2zCMmW9wS8uNt3H',value:[[12,22,100],[14,80,34]],knowledge:['r8S3g_l0p5viby','r8S3g_n0m9rsw4']},
        {id:'Question_fZrP3FJ4ebUogW9V7taS',value:[18,28,38],knowledge:['r8S3g_n0m9rsw4']},
        {id:'Question_BW0ItEaymH3TkD6S15JF',value:[16,26,36],knowledge:['r8S3g_n0m9rsw4']},
        {id:'Question_rvB9mVE6Kbd8jAY4NwPx',value:[20,30,40],knowledge:['r8S3g_n0m9rsw4']},
        {id:'Question_3oPyUzDmQtcMfLpGZ0jW',value:[25,35,45],knowledge:['t5V9e_e1k6cixp']},
        {id:'Question_3MwAFlmNO8EKrpY5zjUd',value:[22,32,42],knowledge:['t5V9e_e1k6cixp']},
        {id:'Question_x2L7AqbMuTjCwPFy6vNr',value:[28,38,48],knowledge:['t5V9e_e1k6cixp']},
        {id:'Question_tgOjrpZLw4RdVzQx85h6',value:[24,34,44],knowledge:['t5V9e_e1k6cixp']},
        {id:'Question_s6VmP1G4UbEQWRYHK9Fd',value:[30,40,50],knowledge:['t5V9e_e1k6cixp']},
        {id:'Question_h7pXNg80nJbw1C4kAPRm',value:[35,45,55],knowledge:['m3D1v_r1d7fr3l']},
        {id:'Question_6RQj2gF3OeK5AmDvThUV',value:[32,42,52],knowledge:['m3D1v_r1d7fr3l']},
        {id:'Question_4nHcauCQ0Y6Pm8DgKlLo',value:[38,48,58],knowledge:['m3D1v_r1d7fr3l']},
        {id:'Question_TmKaGvfNoXYq4FZ2JrBu',value:[34,44,54],knowledge:['m3D1v_r1d7fr3l']},
        {id:'Question_NixCn84GdK2tySa5rB1V',value:[40,50,60],knowledge:['m3D1v_r1d7fr3l']},
        {id:'Question_n2BTxIGw1Mc3Zo6RLdUe',value:[45,55,65],knowledge:['m3D1v_r1d7fr3l']},
        {id:'Question_7NJzCXUPcvQF4Mkfh9Wr',value:[50,60,70],knowledge:['m3D1v_v3d9is1x']},
        {id:'Question_ZTbD7mxr2OUp8Fz6iNjy',value:[55,65,75],knowledge:['m3D1v_v3d9is1x']},
        {id:'Question_Jr4Wz5jLqmN01KUwHa7g',value:[60,70,80],knowledge:['m3D1v_t0v5ts9h']},
        {id:'Question_QRm48lXxzdP7Tn1WgNOf',value:[[45,55,65],[50,60,70]],knowledge:['m3D1v_r1d7fr3l','y9W5d_c0w4mj5h']},
        {id:'Question_pVKXjZn0BkSwYcsa7C31',value:[[48,58,68],[52,62,72]],knowledge:['m3D1v_r1d7fr3l','y9W5d_c0w4mj5h']},
        {id:'Question_Ej5mBw9rsOUKkFycGvz2',value:[55,65,75],knowledge:['y9W5d_c0w4mj5h']},
        {id:'Question_lU2wvHSZq7m43xiVroBc',value:[[60,70,80],[65,75,85]],knowledge:['y9W5d_c0w4mj5h','k4W1c_h5r6nux7']},
        {id:'Question_Mh4CZIsrEfxkP1wXtOYV',value:[65,75,85],knowledge:['y9W5d_c0w4mj5h']},
        {id:'Question_62XbhBvJ8NUSnApgDL94',value:[70,80,90],knowledge:['y9W5d_c0w4mj5h']},
        {id:'Question_x2Fy7rZ3SwYl9jMQkpOD',value:[[75,85,95],[80,90,100]],knowledge:['y9W5d_c0w4mj5h','s8Y2f_v4x8by9j']},
        {id:'Question_UXqN1F7G3Sbldz02vZne',value:[80,90,100],knowledge:['y9W5d_c0w4mj5h']},
        {id:'Question_Ou3f2Wt9BqExm5DpN7Zk',value:[85,95,105],knowledge:['y9W5d_p8g6dgtv']},
        {id:'Question_Az73sM0rHfWVKuc4X2kL',value:[90,100,110],knowledge:['y9W5d_p8g6dgtv']},
        {id:'Question_EhVPdmlB31M8WKGqL0wc',value:[95,105,115],knowledge:['y9W5d_e2j7p95s']},
        {id:'Question_oCjnFLbIs4Uxwek9rBpu',value:[[100,110,120],[105,115,125]],knowledge:['g7R2j_e0v1yls8','m3D1v_r1d7fr3l']},
        {id:'Question_5fgqjSBwTPG7KUV3it6O',value:[105,115,125],knowledge:['g7R2j_e0v1yls8']},
        {id:'Question_X3wF8QlTyi4mZkDp9Kae',value:[110,120,130],knowledge:['g7R2j_e0v1yls8']},
        {id:'Question_YWXHr4G6Cl7bEm9iF2kQ',value:[115,125,135],knowledge:['g7R2j_j1g8gd3v']},
        {id:'Question_xqlJkmRaP0otZcX4fK3W',value:[120,130,140],knowledge:['g7R2j_e0v1yls8']},
        {id:'Question_bumGRTJ0c8p4v5D6eHZa',value:[125,135,145],knowledge:['b3C9s_l4z6od7y']},
        {id:'Question_hZ5wXofebmTlzKB1jNcP',value:[130,140,150],knowledge:['b3C9s_l4z6od7y']},
        {id:'Question_FNg8X9v5zcbB1tQrxHR3',value:[20,145,155],knowledge:['b3C9s_j0v1yls8']},
    ]
    let min = 0
    let max = 0
    barData.forEach((d,i) => {
        const temp = d.value.flat(2)
        min = Math.min(min,...temp)
        max = Math.max(max,...temp)
    })
    console.log(min,max)
    const barYscale = d3.scaleLinear().domain([min,max]).range([0,30])

    barData.forEach((d,i) => {
        const x = 0
        const y = i * 40 + 10
        let barWidth = 25
        const barPadding = 50

        
        const bar = rightSide.append('g')
                .attr('transform',`translate(${x},${y})`)
        
        const colorMap = {
            'r8S3g': '#fbb4ae',
            't5V9e': '#b3cde3',
            'm3D1v': '#ccebc5',
            's8Y2f': '#decbe4',
            'k4W1c': '#fed9a6',
            'g7R2j': '#ffffcc',
            'b3C9s': '#e5d8bd',
            'y9W5d': '#fddaec'
        };
            
        const firstknowledgePrefix = d.knowledge[0].slice(0,5)
        const secondknowledgePrefix = d.knowledge[1] ? d.knowledge[1].slice(0,5) : null
        const firstcolor = colorMap[firstknowledgePrefix]
        const secondcolor = secondknowledgePrefix ? colorMap[secondknowledgePrefix] : null
         
        const maxHeight = 30
        //题目对应一个知识点
        if(d.value.length === 3){
            const points = []
            bar.selectAll('rect')
                .data(d.value)
                .enter()
                .append('rect')
                .attr('x', (d,k) => {
                    const x = k * (barWidth + barPadding) + 20
                    points.push([x + barWidth / 2,maxHeight -  barYscale(d)] )
                    return x
                })
                .attr('y', d => maxHeight - barYscale(d))
                .attr('width', barWidth)
                .attr('height', d => barYscale(d))
                .attr('fill', d => {
                    return firstcolor
                })
            
            //三个柱形最高处连接一条线
            const line = d3.line()
                .curve(d3.curveBumpX)
            bar.append('path')
                .datum(points)
                .attr('d',line)
                .attr('fill','none')
                .attr('stroke','#d0d0d0')
                .attr('stroke-width',1.5) 

            bar.selectAll('circle')
                .data(points)
                .enter()
                .append('circle')
                .attr('cx',d => d[0])
                .attr('cy',d => d[1])
                .attr('r',2.5)
                .attr('fill','#C6CBB9')
                .attr('stroke','#B0B3A6')
                .attr('stroke-width',1)

        }
        //题目对应两个知识点
        else{
            const firstpoints = []
            const secondpoints = []
            d.value.forEach((v, j) => {
                v.forEach((value, k) => {
                    bar.append('rect')
                        .attr('x', d => {
                            const x = k * (barWidth + barPadding) + 20 + (j === 1 ? 12 : 0)
                            if(j === 0){
                                firstpoints.push([x + barWidth / 4,maxHeight - barYscale(value)] )
                            }
                            else{
                                secondpoints.push([x + barWidth / 4,maxHeight -  barYscale(value)] )
                            }
                            return x
                        })
                        .attr('y', maxHeight - barYscale(value))
                        .attr('width', barWidth * 0.5)
                        .attr('height', barYscale(value))
                        .attr('fill', j === 1 ? firstcolor : secondcolor);
                })
                console.log(firstpoints,secondpoints)
                const line = d3.line()
                    .curve(d3.curveBumpX)
                bar.append('path')
                    .datum(j === 0 ? firstpoints : secondpoints)
                    .attr('d',line)
                    .attr('fill','none')
                    .attr('stroke','#d0d0d0')
                    .attr('stroke-width',1.5) 

        // 添加circle元素
        bar.selectAll('circle.first')
            .data(firstpoints)
            .enter()
            .append('circle')
            .attr('cx', d => d[0])
            .attr('cy', d => d[1])
            .attr('r', 2.5)
            .attr('fill', '#C6CBB9')
            .attr('stroke', '#B0B3A6')
            .attr('stroke-width', 1);

        bar.selectAll('circle.second')
            .data(secondpoints)
            .enter()
            .append('circle')
            .attr('cx', d => d[0])
            .attr('cy', d => d[1])
            .attr('r', 2.5)
            .attr('fill', '#C6CBB9')
            .attr('stroke', '#B0B3A6')
            .attr('stroke-width', 1);
        })
        }
    })

    }

    drawRight()

    const bbox = d3.select('svg').node().getBBox()//获取svg的边界框
    d3.select('svg').attr('height',bbox.height)

    //Initial position update
    updatePositions();

    //Listen for resize events
    window.addEventListener('resize', updateScales);


    
}
onMounted(() => {
    nextTick(() => {
        drawGraph()
    })
})

</script>

<template>
    <div class="grid grid-cols-2">
        <div class="col-span-1" ref="graphDiv" id="graphDiv">
            <svg ref="graphRef"></svg>
        </div>
        <div class="col-span-1">
            <el-table :data="tableData" :default-sort="{prop:'score',order:'descending'}" max-height="270">
                <el-table-column prop="ID" label="ID" width="200" class-name="centered-column"></el-table-column>
                <el-table-column prop="score" label="得分" sortable width="80" class-name="centered-column"></el-table-column>
                <el-table-column prop="knowledge" label="掌握情况" class-name="centered-column">
                    <template #default="scope">
                        <titleInfo :tableData="scope.row.knowledge"></titleInfo>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>

</template>

<style>
#graphDiv::-webkit-scrollbar {
    display: none;
}

#graphDiv {
    scrollbar-width: none;
}
.link{
    stroke:#dadbdd;
    stroke-width: 1.5px;
    fill: none;
}
.centered-column .cell {
    text-align: center;
  }
.titleInfo{
    font-size: 12px;
    fill: #888892;
    text-anchor: end;
    font-weight: 600;
}
</style>