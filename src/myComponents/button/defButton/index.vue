<template>
  <div v-dynLayout="style">
    <a-button
      :type="btnType"
      :disabled="disabled"
      @click="doClick"
      :shape="shape"
      :size="size"
      :block="auto_block"
      :loading="hasLoading && loading"
      :ghost="ghost"
    >
      {{ label }}
    </a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { default as Button } from '../button';

export default defineComponent({
  name: 'def-button',
  extends: Button,
  setup() { },
  mounted() {
  },
  computed: {
  },
  methods: {
    doClick() {
      if (this._onClick) {
        this._onClick();
      }
    }
  }
})
</script>
