<template>
  <div class="print-popup">
    <template v-if="wordExportDataBindings.length">
      <div class="popup-content print-content">
        <h4>请选择打印模板</h4>
        <el-radio
          v-for="(word, index) in wordExportDataBindings"
          :key="index"
          v-model="selected"
          :label="index"
        >{{word.filename}}</el-radio>
      </div>
      <div class="center">
        <span class="water-mark-tips">建议您上传图片开启水印功能</span>
      </div>
    </template>
  </div>
</template>

<script>
import { Radio, Message } from 'element-ui';
import { $http } from '@commonbox/utils';

const { AY } = window;

export default {
  data() {
    return {
      wordExportDataBindings: [],
      selected: 0,
      buttons: [],
      spaceId: null,
    };
  },
  created() {
    // this.spaceId = this.$dialog.params.spaceId;
    // this.waterMarkUrl = `/${this.spaceUri}/api2/config/watermark/`
    this.getTemplateArr();
    this.printForm();
    this.$dialog.size();
    this.updateButtons();
  },
  methods: {
    close() {
      this.$dialog.close();
    },
    getTemplateArr() {
      const {
        app, form, workflowRecordId, printInfo,
      } = this.$dialog.params;
      const { spaceId } = this.$store.state;
      const { documents } = this.$store.state.expend;
      const { word } = documents;
      this.spaceId = spaceId;

      const printArr = [];
      this.selected = printInfo.index;
      printInfo.list.map((item) => {
        const template = word.find(templateItem => templateItem.indexOf(item) !== -1);
        printArr.push(template);
        return printArr;
      });

      if (printArr.length) {
        const exportBaseUrl = AY.buildSpaceUri('/api/datacenter/export/wFDetailExport/', spaceId);
        let exportUrl = exportBaseUrl + app;
        exportUrl += `/${app}`;
        exportUrl += `/${form}`;
        exportUrl += `/${workflowRecordId}/`;

        printArr.forEach((item) => {
          this.wordExportDataBindings.push({
            export: `${exportUrl}${item}/`,
            filename: item.replace(`${item.split('_')[0]}_`, ''),
          });
        });
      }
    },
    print(cryptoUrl) {
      const previewUrl = 'http://pageoffice.sinochemlogistics.com:9102/officer/pageOffice/subpage/index?fileUrl=';

      const pdfUrl = `${previewUrl}${cryptoUrl}&fileType=docx`;
      setTimeout(() => {
        window.open(pdfUrl, '_blank', '');
      }, 600);
    },
    printForm() {
      if (this.wordExportDataBindings && this.wordExportDataBindings.length) {
        this.$dialog.title('打印模板选择');
      }
    },
    /* eslint-disable */
    downloadAndPrint(isPrint) {
      const exportUrl = this.wordExportDataBindings[this.selected].export;
      if (isPrint) {
        const messager = Message({
          message: '请稍候...',
          duration: 0,
        });
        $http
          .get(`${exportUrl}?isPreview=1`)
          .then((response) => response.data)
          .then((data) => {
            messager.close();
            if (parseInt(data.status, 10) === 200) {
              const wordUrl = `${AY.get('server.fileio')
              + AY.buildSpaceUri('/api/store/printfile', this.spaceId)
                .substring(1)}?printFile=${data.result.printFile}`;

              this.$http
                .post('/napi/form/crypto', {
                  content: wordUrl,
                })
                .then((res) => {
                  const result = res.data;
                  if (result.success) {
                    this.print(result.data);
                  }
                })
                .catch((res) => {
                  Notification.error({
                    title: '加密失败',
                    message: res.data.error,
                  });
                });
            } else {
              const errMessage = data.msg ? data.msg : '文件未找到';
              alert(errMessage);
            }
          });
      } else {
        this.close();
        setTimeout(() => {
          window.open(exportUrl, '_blank', '');
        }, 600);
      }
    },
    /* eslint-disable */
    updateButtons() {
      const buttons = [];
      buttons.push({
        label: '取消',
        type: 'cancel',
        callback: () => {
          this.close();
        },
      });
      buttons.push({
        label: '下载',
        callback: () => {
          this.downloadAndPrint(false);
        },
      });
      buttons.push({
        label: '打印',
        callback: () => {
          this.downloadAndPrint(true);
        },
      });

      this.buttons = buttons;
    },
  },
  components: {
    ElRadio: Radio,
  },
};
</script>

<style lang="scss" scoped>
.print-content {
  padding: 20px 0;

  h4 {
    font-size: 16px;
    padding: 0 0 20px;
  }

  /deep/ .el-radio {
    margin-left: 30px;
  }
}
.print-buttons {
  margin-top: 20px;
  text-align: center;
}
.center {
  text-align: center;
}
</style>
