<template>
  <div class="mw-wrapper">
    <span class="mw-btn" @click="uploadPhoto">
      <slot><button>上传</button></slot>
    </span>
    <div class="mw-uploader">
      <div
        class="viewImg"
        :style="'width:' + width + 'px;height:' + height + 'px'"
        v-for="(item, index) in imgUrl"
        :key="index"
      >
        <img :src="item.base64" ref="image" style="width:100%" v-show="item.showImg" :title="item.name" alt="" />
        <div class="z-close" @click="delPhoto(index)">✖</div>
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
    //图片宽度
    width: {
      type: Number,
      default: () => 200
    },
    //图片高度
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
          file: obj,
          showImg:false
        });
        
        // 创建image对象
        const image = new Image();
        image.src = evt.target.result;
        //如果宽度小于容器宽度，按照图片本身宽度显示
        setTimeout(()=>{
          this.$nextTick(()=>{
            if (image.width < this.width) {
              this.$refs.image[this.$refs.image.length -1].style.width = image.width + 'px'
            }
          })
          this.$set(this.imgUrl[this.imgUrl.length-1],'showImg',true)
        },300)
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
      justify-content: center;
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
        background: rgba(179, 175, 181, 0.32);
        box-shadow:inset 0 0 26px 5px rgb(179 184 189 / 62%);
        font-size: 26px;
        color:#ff0909;
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
