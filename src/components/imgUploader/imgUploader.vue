<template>
  <div class="mw-wrapper">
    <span class="mw-btn" @click="uploadPhoto">
      <slot></slot>
    </span>
    <div class="mw-uploader">
      <div
        class="viewImg"
        :style="'width:' + width + 'px;height:' + height + 'px'"
        v-for="(item, index) in imgUrl"
        :key="index"
      >
        <img :src="item.base64" style="width:100%" :title="item.name" alt="" />
        <div class="z-close" @click="delPhoto(index)">删除</div>
      </div>
      <div
        class="add-btn"
        v-if="imgUrl.length < limit"
        :style="'width:' + width + 'px;height:' + height + 'px'"
        @click="addPhoto"
      >
        +
      </div>
      <input
        ref="inputFile"
        type="file"
        class="input-file"
        :accept="accept ? accept : 'image/*'"
        @change="selectPhoto"
      />
    </div>
  </div>
</template>

<script>
export default {
  name:'imgUploader',
  components: {},
  props: {
    width: {
      type: Number,
      default: () => 200
    },
    height: {
      type: Number,
      default: () => 200
    },
    limit: {
      type: Number,
      default: () => 9999
    },
    accept: {
      type: String,
      default: () => ""
    }
  },
  data() {
    return {
      imgUrl: []
    };
  },
  methods: {
    uploadPhoto() {
      if (this.imgUrl.length) {
        this.$emit("upload", this.imgUrl);
      } else {
        this.$emit("empty");
      }
    },
    selectPhoto(e) {
      const obj = e.target.files[0];
      const reader = new FileReader();
      reader.onload = evt => {
        this.imgUrl.push({
          base64: evt.target.result,
          file: obj
        });

        // 创建image对象
        const image = new Image();
        image.src = evt.target.result;
        // 获取图片宽高
        // image.onload = function() {
        //   console.log("宽度为：", this.width, "高度为：", this.height);
        // };
      };
      reader.readAsDataURL(obj);
    },
    addPhoto() {
      this.$refs.inputFile.click();
    },
    delPhoto(index) {
      this.imgUrl.splice(index, 1);
      this.$refs.inputFile.value = "";
    }
  }
};
</script>
<style lang="less" scoped>
.mw-wrapper {
  text-align: left;
  padding: 0 10px;
  .mw-btn {
    display: inline-block;
    margin-bottom: 12px;
  }
  .mw-uploader {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .viewImg {
      position: relative;
      display: flex;
      align-items: center;
      border: 1px solid #f7f0f0;
      box-sizing: border-box;
      margin-right: 12px;
      margin-bottom: 12px;
      transition: all 0.4s;
      border-radius: 6px;
      background-color: #fff;
      overflow: hidden;
      .z-close {
        display: none;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 4;
        background: rgba(179, 175, 181, 0.72);
        font-size: 16px;
        color: #fff;
        cursor: pointer;
        justify-content: center;
        align-items: center;
      }
      &:hover {
        .z-close {
          display: flex;
        }
      }
    }
    .add-btn {
      position: relative;
      overflow: hidden;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 40px;
      color: #d9d9d9;
      margin-right: 12px;
      margin-bottom: 12px;
      &:hover {
        border-color: #409eff;
        color: #409eff;
      }
    }
    .input-file {
      position: absolute;
      top: -9999px;
      left: -9999px;
      opacity: 0;
    }
  }
}
</style>
