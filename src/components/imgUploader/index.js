import imgUploader from "./imgUploader";
const uploader = {
  install: function(Vue) {
    Vue.component(imgUploader.name, imgUploader);
  }
}

export default uploader;
