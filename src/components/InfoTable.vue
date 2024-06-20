<script setup>
import {onMounted, ref} from 'vue'
import * as d3 from 'd3'
import TableLineChart from './TableLineChart.vue';
import KnowledgeGlyph from './KnowledgeGlyph.vue';
import BadKnowledgeGlyph from './BadKnowledgeGlyph.vue';
//导入json数据
// import studentInfoData from '../utils/studentInfo.json';
import store from "@/store/index.js";
import axios from "axios";

let tableHeight = ref()
//表格组件
const tableRef = ref()
const tableContainer = ref()
//多选的数据
const multipleSelection = ref([])
let studentInfo = ref([])

// const studentInfo = studentInfoData.data
// console.log(studentInfo[0])
const filterHandler = (value, row) => {
    return row.class === value;
}

const handleSelection = (val) => {
  //console.log(val[0].ID)
  multipleSelection.value = val
  console.log(multipleSelection.value)
}
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
        // console.log('tagStyle_4')
        return 'tagStyle_4'
    }
    else if(name === 'Method_m8vwGkEZc3TSW2xqYUoR'){
        return 'tagStyle_5'
    }
}
const getMethodIndex = (name) => {
  if(name==='Method_5Q4KoXthUuYz3bvrTDFm'){
    return 'Method 1'
  }
  else if(name==='Method_BXr9AIsPQhwNvyGdZL57')
  {
    return 'Method 2'
  }
  else if(name==='Method_Cj9Ya2R7fZd6xs1q5mNQ'){
    return 'Method 3'
  }
  else if(name==='Method_gj1NLb4Jn7URf9K2kQPd'){
    return 'Method 4'
  }
  else if(name === 'Method_m8vwGkEZc3TSW2xqYUoR'){
    return 'Method 5'
  }
}
const handleSelectionChange = (e) =>{
  e.map(i=>i)
  console.log(e)
  store.commit('addId', e.map(i=>i.ID))
}

onMounted(()=>{
  tableHeight.value = tableContainer.value.clientHeight
  axios.get('/api/getStudentInfo').then(res=>{
    console.log(res.data.data)
    studentInfo.value=res.data.data
  })
})

</script>

<template>
  <div style="width: 1030px" class="h-full flex" ref="tableContainer">
    <el-table :data="studentInfo" @selection-change="handleSelectionChange" ref="tableRef" :height="tableHeight">
      <el-table-column type="selection" width="40" />
      <el-table-column label="ID" prop="ID" width="200" class-name="centered-column"></el-table-column>
      <el-table-column label="性别" prop="sex" width="60" class-name="centered-column">
        <template #default="scope">
          {{scope.row.sex==='male'?'男':'女'}}
        </template>
      </el-table-column>
      <el-table-column label="年龄" prop="age" width="60" class-name="centered-column"></el-table-column>
      <el-table-column label="专业" prop="major" width="80" class-name="centered-column"></el-table-column>
      <el-table-column label="答题高峰期" class-name="centered-column" width="180">
        <!-- 高峰时段：绘制每个时段下提交次数的折线图 -->
        <template #default="scope">
          <TableLineChart :data="scope.row.HotTime"></TableLineChart>
        </template>
      </el-table-column>
      <el-table-column label="擅长知识点" class-name="centered-column" width="140">
        <template #default="scope">
          <KnowledgeGlyph :knowledgeData="scope.row.Knowledge"></KnowledgeGlyph>
        </template>
      </el-table-column>
      <el-table-column label="不擅长知识点" class-name="centered-column" width="140">
        <!-- 不擅长题型：绘制每个知识点下的准确率 -->
        <template #default="scope">
          <BadKnowledgeGlyph :badknowledgeData="scope.row.badknowledge"></BadKnowledgeGlyph>
        </template>
      </el-table-column>
      <el-table-column label="常用方法" class-name="centered-column" width="130">
        <template #default="scope">
          <span :class="getMethodClass(scope.row.method.name)">{{ getMethodIndex(scope.row.method.name) }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
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