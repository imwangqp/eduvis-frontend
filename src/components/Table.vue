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
        Knowledge:[//偏好题型（知识点=3）
            {
                name:'知识点1',
                value:0.85
            },
            {
                name:'知识点2',
                value:0.75
            },
            {
                name:'知识点3',
                value:0.89
            }
        ],
        // 不擅长题型
        badknowledge:[
            {
                name:'知识点4',
                value:0.3
            },
            {
                name:'知识点5',
                value:0.4
            },
            {
                name:'知识点6',
                value:0.3
            }
        ],
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
                name:'知识点1',
                value:0.3
            },
            {
                name:'知识点2',
                value:0.4
            },
            {
                name:'知识点3',
                value:0.3
            },
        ],
        badknowledge:[
            {
                name:'知识点4',
                value:0.3
            },
            {
                name:'知识点5',
                value:0.4
            },
            {
                name:'知识点6',
                value:0.3
            }
        ]
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
                name:'知识点1',
                value:0.3
            },
            {
                name:'知识点2',
                value:0.4
            },
            {
                name:'知识点3',
                value:0.3
            },
        ],
        badknowledge:[
            {
                name:'知识点4',
                value:0.3
            },
            {
                name:'知识点5',
                value:0.4
            },
            {
                name:'知识点6',
                value:0.3
            }
        ],
    }
]

</script>

<template>
    <el-table :data="studentInfo" style="width:100%" max-height="300">
        <el-table-column label="ID" prop="ID" width="250"></el-table-column>
        <el-table-column label="Sex" prop="sex" width="100"></el-table-column>
        <el-table-column label="Age" prop="age" width="100"></el-table-column>
        <el-table-column label="Major" prop="major" width="150"></el-table-column>
        <el-table-column label="HotTime" >
            <!-- 高峰时段：绘制每个时段下提交次数的折线图 -->
            <template #default="scope">
                <TableLineChart :data="scope.row.HotTime"></TableLineChart>
            </template>
        </el-table-column>
        <el-table-column label="Knowledge" >
            <!-- 擅长题型：绘制每个知识点下的准确率 -->
            <template #default="scope">
                <KnowledgeGlyph :knowledgeData="scope.row.Knowledge"></KnowledgeGlyph>
            </template>
        </el-table-column>
        <el-table-column label="BadKnowledge" >
            <!-- 不擅长题型：绘制每个知识点下的准确率 -->
            <template #default="scope">
                <BadKnowledgeGlyph :badknowledgeData="scope.row.badknowledge"></BadKnowledgeGlyph>
            </template>
        </el-table-column>
        <el-table-column label="Method"></el-table-column>
    </el-table>
</template>

<style scoped>

</style>