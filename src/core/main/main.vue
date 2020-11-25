<template>
  <DynamicCom :metadata="bootstrap" :data="data"></DynamicCom>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DynamicCom from '/@/core/dynamic';
import { message } from 'ant-design-vue';
import { appStore } from '/@/store/modules/app';

export default defineComponent({
  components: { DynamicCom },
  props: ['data', 'metadata'],
  data() {
    return {
      _metadata: null,
      _type: null
    }
  },
  setup() {
  },
  mounted() {
    // this._data = this.data;
    this._metadata = this.metadata;
  },
  methods: {
    bootstrapInit(containers: Array<any>) {
      if (!(containers instanceof Array)) {
        message.error('containers 入参必须为数组');
        return;
      }
      if (containers.length === 0) {
        message.error('containers数组长度需大于0');
        return;
      }
      const bootContainer = containers.some((item) => {
        return item['bootstrap'] === true;
      });
      if (!bootContainer) {
        // 给第一个container设置为bootstrap
        containers[0]['bootstrap'] = true;
      }
      const dialogMap: any = {};
      const rootsMetadata: any = {};
      containers.forEach((item) => {
        if (item instanceof Object && 'id' in item) {
          if (item['bootstrap'] && item['bootstrap'] === true) {
            appStore.commitBootstrap(item);
            this.bootstrap = item;
          }
          if (item['type'] && item.type.indexOf('dialog') > -1) { dialogMap[item.id] = item; }
          rootsMetadata[item.id] = item;
        } else {
          message.error('组件id不能为空');
        }
      });
      appStore.commitDialogs(dialogMap);
    }
  },
  computed: {
    _data: {
      set: function (data: any) {
        // console.log(data);
        // this.data = data;
      },
      get: function (): any {
        // this._data
        return '';
      }
    },
    _metadata: {
      set: function (metadata: Array<any>) {
        this.bootstrapInit(metadata);
      },
      get: function (): any {
        const _metadata = Object.assign(appStore.getBootstrapMetadata, appStore.getDialogMetadata);
        return _metadata;
      }
    },
    bootstrap: {
      set: function () { },
      get: function (): any {
        return appStore.getBootstrapMetadata;
      }
    }
  }
});
</script>