import imgUploader from "./components/imgUploader/index";

const component = [imgUploader];

const install = function(Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component);
  });
};

/* 支持使用标签的方式引入 */
if (typeof window !== "undefined" && window.Vue) {
  install.use(window.Vue);
}

export default {
  version: "1.0.0",
  imgUploader
};
