<template>
  <div id="app">
    <h1>威威猫-黑马头条</h1>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <i class="toutiao toutiao-lishi"></i>

    <div id="box">hello world</div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
#box {
  background-color: pink;
  width: 750px;
  height: 84px;
}
</style>
