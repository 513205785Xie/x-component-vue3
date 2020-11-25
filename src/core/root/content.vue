<template>
  <DynamicCom
    v-for="(child, index) in children"
    v-bind:key="index"
    :metadata="child"
    :parent="_self()"
  ></DynamicCom>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DynamicCom from '/@/core/dynamic';
// import { message } from 'ant-design-vue';
import { default as Container, ContainerMetadata } from '/@/core/container/index';

export interface RootMetadata extends ContainerMetadata {
  children?: Array<any>;
}

export default defineComponent({
  components: { DynamicCom },
  extends: Container,
  data() {
    return {
      _children: null
    }
  },
  setup() {
  },
  mounted() {
    const _metadata: RootMetadata = this.metadata;
    this.children = _metadata.children;
  },
  computed: {
    children: {
      set: function (children: Array<any>) {
        this._children = children instanceof Array ? children : [];
      },
      get: function (): Array<any> {
        return this._children;
      }
    }
  },
  methods: {
  }
});

</script>