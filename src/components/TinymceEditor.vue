<template>
	<div class="tinymce-editor">
		<editor id="tinymce" :init="init" v-model="tinymceHtml"></editor>
	</div>
</template>

<script>
import tinymce from 'tinymce/tinymce';
import Editor from '@tinymce/tinymce-vue';
import 'tinymce/themes/silver';

import 'tinymce/plugins/image'; // 插入上传图片插件
import 'tinymce/plugins/media'; // 插入上传视频插件
import 'tinymce/plugins/table'; // 插入表格插件
import 'tinymce/plugins/link'; // 超链接插件
import 'tinymce/plugins/lists'; // 列表插件
import 'tinymce/plugins/contextmenu'; // 右键菜单插件
import 'tinymce/plugins/wordcount'; // 字数统计插件
import 'tinymce/plugins/colorpicker'; // 选择颜色插件
import 'tinymce/plugins/textcolor'; // 文本颜色插件

export default {
  components: {
    Editor,
  },
  props: {
    // 传入一个value，使组件支持v-model绑定
    value: {
      type: String,
      default: '',
    },
    plugins: {
      type: [String, Array],
      default: 'lists image media table textcolor wordcount contextmenu link',
    },
    toolbar: {
      type: [String, Array],
      default:
				'undo redo |  formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat',
    },
  },
  data() {
    return {
      // 初始化配置
      init: {
        selector: '#tinymce', // dom选择器
        language_url: '/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/tinymce/skins/ui/oxide',
        height: 300,

        branding: false, // 去水印
        menubar: false,
        browser_spellcheck: true, // 拼写检查
        statusbar: false, // 隐藏编辑器底部的状态栏
        paste_data_images: true, // 允许粘贴图像

        plugins: this.plugins,
        toolbar: this.toolbar,

        images_upload_handler: (blobInfo, success) => {
          const img = `data:image/jpeg;base64,${blobInfo.base64()}`;
          success(img);
        },
      },
      tinymceHtml: this.value,
    };
  },
  methods: {},
  watch: {
    value(newValue) {
      this.tinymceHtml = newValue;
    },
    tinymceHtml(newValue) {
      this.$emit('input', newValue);
    },
  },

  mounted() {
    tinymce.init({});
  },
};
</script>
<style scoped></style>
