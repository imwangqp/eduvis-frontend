<script setup>
import {ref} from 'vue'
import * as d3 from 'd3'
import TableLineChart from './TableLineChart.vue';
import KnowledgeGlyph from './KnowledgeGlyph.vue';
import BadKnowledgeGlyph from './BadKnowledgeGlyph.vue';
const studentInfo = [
    {
        ID: '8b6d1125760bd3939b6e',
        sex: 'female',
        age: 18,
        major: 'J87654',
        HotTime:[//高峰时段，统计每人每个时间段下的提交记录次数，例如：time为 1 表示 0点至1点下提交了30次
            {
                time: 1,
                value: 52
            },
            {
                time: 2,
                value: 40
            },
            {
                time: 3,
                value: 50
            },
            {
                time: 4,
                value: 60
            },
            {
                time: 5,
                value: 65
            },
            {
                time: 6,
                value: 80
            },
            {
                time: 7,
                value: 90
            },
            {
                time: 8,
                value: 100
            },
            {
                time: 9,
                value: 20
            },
            {
                time: 10,
                value: 120
            },
            {
                time: 11,
                value: 60
            },
            {
                time: 12,
                value: 140
            },
            {
                time: 13,
                value: 150
            },
            {
                time: 14,
                value: 160
            },
            {
                time: 15,
                value: 170
            },
            {
                time: 16,
                value: 180
            },
            {
                time: 17,
                value: 55
            },
            {
                time: 18,
                value: 200
            },
            {
                time: 19,
                value: 210
            },
            {
                time: 20,
                value: 220
            },
            {
                time: 21,
                value: 230
            },
            {
                time: 22,
                value: 156
            },
            {
                time: 23,
                value: 250
            },
            {
                time: 24,
                value: 125
            }
        ],
        Knowledge:[//偏好题型（知识点>=3）
            {
                name:'r8S3g',
                value:0.3
            },
            {
                name:'t5V9e',
                value:0.4
            },
            {
                name:'m3D1v',
                value:0.3
            },
        ],
        badknowledge:[
            {
                name:'s8Y2f',
                value:0.3
            },
            {
                name:'k4W1c',
                value:0.4
            },
            {
                name:'g7R2j',
                value:0.3
            }
        ],
        method:{
            name:'Method_5Q4KoXthUuYz3bvrTDFm',
            value:100
        }
    },
    {
        ID: '8b6d1125760bd3939b6e',
        sex: 'male',
        age: 20,
        major: 'J87654',
        HotTime:[//高峰时段，统计每人每个时间段下的提交记录次数，例如：time为 1 表示 0点至1点下提交了30次
        {
                time: 1,
                value: 30
            },
            {
                time: 2,
                value: 40
            },
            {
                time: 3,
                value: 50
            },
            {
                time: 4,
                value: 60
            },
            {
                time: 5,
                value: 70
            },
            {
                time: 6,
                value: 80
            },
            {
                time: 7,
                value: 90
            },
            {
                time: 8,
                value: 100
            },
            {
                time: 9,
                value: 110
            },
            {
                time: 10,
                value: 120
            },
            {
                time: 11,
                value: 130
            },
            {
                time: 12,
                value: 140
            },
            {
                time: 13,
                value: 150
            },
            {
                time: 14,
                value: 160
            },
            {
                time: 15,
                value: 170
            },
            {
                time: 16,
                value: 180
            },
            {
                time: 17,
                value: 190
            },
            {
                time: 18,
                value: 200
            },
            {
                time: 19,
                value: 210
            },
            {
                time: 20,
                value: 220
            },
            {
                time: 21,
                value: 230
            },
            {
                time: 22,
                value: 240
            },
            {
                time: 23,
                value: 250
            },
            {
                time: 24,
                value: 260
            }
        ],
        Knowledge:[//偏好题型（知识点>=3）
            {
                name:'r8S3g',
                value:0.3
            },
            {
                name:'t5V9e',
                value:0.4
            },
            {
                name:'m3D1v',
                value:0.3
            },
        ],
        badknowledge:[
            {
                name:'s8Y2f',
                value:0.3
            },
            {
                name:'k4W1c',
                value:0.4
            },
            {
                name:'g7R2j',
                value:0.3
            }
        ],
        method:{
            name:'Method_BXr9AIsPQhwNvyGdZL57',
            value:100
        }
    },
    {
        ID: '8b6d1125760bd3939b6e',
        sex: 'female',
        age: 22,
        major: 'J87654',
        HotTime:[//高峰时段，统计每人每个时间段下的提交记录次数，例如：time为 1 表示 0点至1点下提交了30次
        {
                time: 1,
                value: 30
            },
            {
                time: 2,
                value: 40
            },
            {
                time: 3,
                value: 50
            },
            {
                time: 4,
                value: 60
            },
            {
                time: 5,
                value: 70
            },
            {
                time: 6,
                value: 80
            },
            {
                time: 7,
                value: 90
            },
            {
                time: 8,
                value: 100
            },
            {
                time: 9,
                value: 110
            },
            {
                time: 10,
                value: 120
            },
            {
                time: 11,
                value: 130
            },
            {
                time: 12,
                value: 140
            },
            {
                time: 13,
                value: 150
            },
            {
                time: 14,
                value: 160
            },
            {
                time: 15,
                value: 170
            },
            {
                time: 16,
                value: 180
            },
            {
                time: 17,
                value: 190
            },
            {
                time: 18,
                value: 200
            },
            {
                time: 19,
                value: 210
            },
            {
                time: 20,
                value: 220
            },
            {
                time: 21,
                value: 230
            },
            {
                time: 22,
                value: 240
            },
            {
                time: 23,
                value: 250
            },
            {
                time: 24,
                value: 260
            }
        ],
        Knowledge:[//偏好题型（知识点>=3）
            {
                name:'r8S3g',
                value:0.3
            },
            {
                name:'t5V9e',
                value:0.4
            },
            {
                name:'m3D1v',
                value:0.3
            },
        ],
        badknowledge:[
            {
                name:'s8Y2f',
                value:0.3
            },
            {
                name:'k4W1c',
                value:0.4
            },
            {
                name:'g7R2j',
                value:0.3
            }
        ],
        method:{
            name:'Method_Cj9Ya2R7fZd6xs1q5mNQ',
            value:100
        }
    }
]
const getMethodClass = (name) => {
    if(name==='Method_5Q4KoXthUuYz3bvrTDFm'){
        return 'tagStyle_1'
    }
    else if(name==='Method_BXr9AIsPQhwNvyGdZL57')
    {
        return 'tagStyle_2'
    }
    else if(name==='Method_Cj9Ya2R7fZd6xs1q5mNQ'){
        return 'tagStyle_3'
    }
    else if(name==='Method_gj1NLb4Jn7URf9K2kQPd'){
        console.log('tagStyle_4')
        return 'tagStyle_4'
    }
    else if(name === 'Method_m8vwGkEZc3TSW2xqYUoR'){
        return 'tagStyle_5'
    }
}
</script>

<template>
    <el-table :data="studentInfo" style="width:100%" max-height="300">
        <el-table-column label="ID" prop="ID" width="250" class-name="centered-column"></el-table-column>
        <el-table-column label="Sex" prop="sex" width="100" class-name="centered-column"></el-table-column>
        <el-table-column label="Age" prop="age" width="100" class-name="centered-column"></el-table-column>
        <el-table-column label="Major" prop="major" width="150" class-name="centered-column"></el-table-column>
        <el-table-column label="HotTime" class-name="centered-column">
            <!-- 高峰时段：绘制每个时段下提交次数的折线图 -->
            <template #default="scope">
                <TableLineChart :data="scope.row.HotTime"></TableLineChart>
            </template>
        </el-table-column>
        <el-table-column label="Knowledge" class-name="centered-column">
            <!-- 擅长题型：绘制每个知识点下的准确率 -->
            <template #default="scope">
                <KnowledgeGlyph :knowledgeData="scope.row.Knowledge"></KnowledgeGlyph>
            </template>
        </el-table-column>
        <el-table-column label="BadKnowledge" class-name="centered-column">
            <!-- 不擅长题型：绘制每个知识点下的准确率 -->
            <template #default="scope">
                <BadKnowledgeGlyph :badknowledgeData="scope.row.badknowledge"></BadKnowledgeGlyph>
            </template>
        </el-table-column>
        <el-table-column label="Method" class-name="centered-column">
            <template #default="scope">
                <el-popover effect="light" trigger="hover" placement="top">
                  <template #default>
                    <div>method: {{ scope.row.method.name }}</div>
                    <div>value: {{ scope.row.method.value }}</div>
                  </template>
                  <template #reference>
                    <span :class="getMethodClass(scope.row.method.name)">{{ scope.row.method.name }}</span>
                  </template>
                </el-popover>
              </template>
        </el-table-column>
    </el-table>
</template>

<style>
.el-table th.is-leaf {
    text-align: center;
}
.centered-column .cell {
    text-align: center;
  }
.tagStyle_1{
    display: inline-block;
    width: 130px;
    border: 1px solid #EDF7B5;
    border-radius: 6px;
    background-color: #EDF7B5;
    color: #6e6e6e;
    font-size: 12px;
}
.tagStyle_2{
    display: inline-block;
    width: 130px;
    border: 1px solid #f1f9dd;
    border-radius: 6px;
    background-color: #f1f9dd;
    color: #6e6e6e;
    font-size: 12px;
}
.tagStyle_3{
    display: inline-block;
    width: 130px;
    border: 1px solid #eae4c7;
    border-radius: 6px;
    background-color: #eae4c7;
    color: #6e6e6e;
    font-size: 12px;
}
.tagStyle_4{
    display: inline-block;
    width: 130px;
    border: 1px solid #c8ede0;
    border-radius: 6px;
    background-color: #c8ede0;
    color: #6e6e6e;
    font-size: 12px;
}
.tagStyle_5{
    display: inline-block;
    width: 130px;
    border: 1px solid #dae6c8;
    border-radius: 6px;
    background-color: #dae6c8;
    color: #6e6e6e;
    font-size: 12px;
}
</style>