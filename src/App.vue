<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <imgUploader
      :width="100"
      :height="100"
      :limit="4"
      @empty="emptyShow"
      @upload="uploadImg"
    >
      <button>上传</button>
    </imgUploader>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  methods:{
    emptyShow(){},
    uploadImg(){}
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
