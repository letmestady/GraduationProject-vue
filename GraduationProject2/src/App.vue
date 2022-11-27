<template>
<div id="maxbox">
  <!-- <h1>这是主界面</h1>
  <button @click="add">点击+1</button>
  <p>{{x}}</p> -->
 <router-view></router-view>
</div>
</template>

<script setup lang="ts">
import {ref} from "vue"
import {RegisterdData} from './view/registered/registered'

let x = ref<number>(0)
const add=()=>{
  x.value++
}
RegisterdData();
</script>

<style lang="less">
@import url("./common/common.less");
</style>
