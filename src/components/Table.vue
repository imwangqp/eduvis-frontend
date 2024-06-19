<script setup>
import {onMounted, ref} from 'vue'
import * as d3 from 'd3'
import TableLineChart from './TableLineChart.vue';
import KnowledgeGlyph from './KnowledgeGlyph.vue';
import BadKnowledgeGlyph from './BadKnowledgeGlyph.vue';
//导入json数据
import studentInfoData from '../utils/studentInfo.json';
const studentInfo = [
    {
        ID: '8b6d1125760bd3939b6e',
        class:1,
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
                value:0.8
            },
            {
                name:'t5V9e',
                value:0.45
            },
            {
                name:'m3D1v',
                value:0.5
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
        method:'Method_5Q4KoXthUuYz3bvrTDFm',

    },
    {
        ID: '8b6d1125760bd3939b6e',
        class:2,
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
        method:'Method_5Q4KoXthUuYz3bvrTDFm',
    },
    {
        ID: '8b6d1125760bd3939b6e',
        class:3,
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
        method:'Method_5Q4KoXthUuYz3bvrTDFm',
    }
]
//多选的数据
const multipleSelection = ref([])
// const studentInfo = ref([])

// const studentInfo = studentInfoData.data
// console.log(studentInfo[0])
const filterHandler = (value, row) => {
    return row.class === value;
}
const getStudentInfo = () => {
    //请求数据
    studentInfo.value = studentInfoData.data
}
const handleSelection = (val) => {
    //console.log(val[0].ID)
    multipleSelection.value = val
    console.log(multipleSelection.value)
}
onMounted(() => {
    //请求数据
    //getStudentInfo()
})
</script>

<template>
    <el-table :data="studentInfo" style="width:100%" max-height="300" @selection-change="handleSelection">
        <el-table-column type="selection"  width="30"/>
        <el-table-column label="班级" prop="class" width="100" class-name="centered-column" column-key="class" :filters="[
            {text:'班级1', value:1},
            {text:'班级2', value:2},
            {text:'班级3', value:3},
            {text:'班级4', value:4},
            {text:'班级5', value:5},
            {text:'班级6', value:6},
            {text:'班级7', value:7},
            {text:'班级8', value:8},
            {text:'班级9', value:9},
            {text:'班级10', value:10},
            {text:'班级11', value:11},
            {text:'班级12', value:12},
            {text:'班级13', value:13},
            {text:'班级14', value:14},
            {text:'班级15', value:15},
        ]"
        :filter-method="filterHandler"></el-table-column>
        <el-table-column label="ID" prop="ID" width="250" class-name="centered-column"></el-table-column>
        <el-table-column label="性别" prop="sex" width="100" class-name="centered-column"></el-table-column>
        <el-table-column label="年龄" prop="age" width="100" class-name="centered-column"></el-table-column>
        <el-table-column label="专业" prop="major" width="150" class-name="centered-column"></el-table-column>
        <el-table-column label="提交时段" class-name="centered-column">
            <!-- 高峰时段：绘制每个时段下提交次数的折线图 -->
            <template #default="scope">
                <TableLineChart :data="scope.row.HotTime"></TableLineChart>
            </template>
        </el-table-column>
        <el-table-column label="擅长知识点" class-name="centered-column">
            <!-- 擅长题型：绘制每个知识点下的准确率 -->
            <template #default="scope">
                <KnowledgeGlyph :knowledgeData="scope.row.Knowledge"></KnowledgeGlyph>
            </template>
        </el-table-column>
        <el-table-column label="不擅长知识点" class-name="centered-column">
            <!-- 不擅长题型：绘制每个知识点下的准确率 -->
            <template #default="scope">
                <BadKnowledgeGlyph :badknowledgeData="scope.row.badknowledge"></BadKnowledgeGlyph>
            </template>
        </el-table-column>
        <el-table-column label="常用方法" prop='method' class-name="centered-column" style="font-size:8px"></el-table-column>
    </el-table>
</template>

<style>
.el-table th.is-leaf {
    text-align: center;
}
.centered-column .cell {
    text-align: center;
  }
.labelSelect .cell {
    text-align: center;
}
</style>