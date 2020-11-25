<template>
  <FormItem
    :class="'qiuer-form-item' + ' qiuer-form-' + vGap"
    :label="label"
    :labelAlign="labelAlign"
    :name="name"
    :required="required"
    :labelCol="labelCol || labelCol === 0 ? { span: labelCol } : null"
    :wrapperCol="labelCol || labelCol === 0 ? { span: 24 - labelCol } : null"
  >
    <a-select v-model:value="value" @change="_valueChange" class="select-content">
      <a-select-option v-for="item in filteredOptions" :key="item.value" :value="item.value">
        {{ item.label }}
      </a-select-option>
    </a-select>
  </FormItem>
</template>

<script lang="ts">

import { Select } from 'ant-design-vue';
import { defineComponent } from 'vue';
import { default as Controller, ControllerMetadata } from '../controller';
import { Tooltip, Form } from 'ant-design-vue';
const FormItem = Form.Item;

export interface SelectControllerMetadata extends ControllerMetadata {
  options?: string | Array<any>;
  option?: { label?: string, value?: string };
  valueType?: 'string' | 'number' | 'object';
}

export default defineComponent({
  name: 'select-ctrl',
  components: { Select, Tooltip, FormItem },
  extends: Controller,
  setup() { },
  data() {
    return {
      _options: [],
      _option: { label: 'label', value: 'value' },
      _valueType: 'string',
      filteredOptions: [
        { label: 'label1', value: 1 },
        { label: 'label2', value: 2 },
        { label: 'label3', value: 3 },
        { label: 'label4', value: 4 }
      ]
    }
  },
  mounted() {
    const _metadata: SelectControllerMetadata = this.metadata;
    this.options = _metadata.options || [];
    this.option = _metadata.option || this._option;
    this.valueType = _metadata.valueType || 'string';
  },
  computed: {
    options: {
      get: function (): string | Array<any> {
        return this._options;
      },
      set: function (options: string | Array<any>) {
        if (options instanceof Array) {
          this._options = options;
        }
      }
    },
    option: {
      get: function (): { label?: string, value?: string } {
        return this._option;
      },
      set: function (option: { label?: string, value?: string }) {
        this._option.label = option?.label || 'label';
        this._option.value = option?.value || 'value';
      }
    },
    valueType: {
      get: function (): 'string' | 'number' | 'object' {
        return this._valueType;
      },
      set: function (valueType: 'string' | 'number' | 'object') {
        if (['string', 'number', 'object'].indexOf(valueType) !== -1) {
          this._valueType = valueType;
        }
      }
    }
  },
  methods: {
    _valueChange(e: any) {
      this.valueChange(e);
    },
    getTypeValue(val: any) {
      console.log(val, this.valueType);
    }
  }
})

</script>

<style lang="less" scoped>
.select-content {
  // min-width: 200px;
}
</style>
