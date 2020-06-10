<template>
	<form-page
		:spaceId="spaceId"
		:module="module"
		:app="app"
		:form="form"
		disableFoot
		disableNav
		disableTopButton
		disableCrumb
	/>
</template>

<script>
import { FormPage } from '@qycloud/lego';

export default {
  components: {
    FormPage
  },
  data() {
    return {
      spaceId: '',
      app: '',
      module: '',
      form: ''
    };
  },
  created() {
    this.module = this.$route.params.module;
    this.app = this.$route.params.appId;
    this.form = this.$route.params.form;
    // node: this.$route.params.node,
    this.spaceId = this.$route.params.spaceId;
  }
};
</script>
