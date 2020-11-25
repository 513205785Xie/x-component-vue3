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
    <a-input
      v-model:value="value"
      :placeholder="placeholder"
      @change="_valueChange"
      :allowClear="hasClear"
      :maxlength="maxlength"
      :disabled="disabled"
      :type="inputType"
      :size="inputSize"
    >
      <template #suffix v-if="help">
        <Tooltip :title="help" :trigger="['hover']" placement="topRight">
          <span class="qf icon-information qiuer-form-item-help"></span>
        </Tooltip>
      </template>
    </a-input>
  </FormItem>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { default as Controller, ControllerMetadata } from '../controller';
import { Tooltip, Form } from 'ant-design-vue';

const FormItem = Form.Item;

export interface InputControllerMetadata extends ControllerMetadata {
  hasClear?: boolean; // 有清除按钮
  placeholder?: string;
  maxlength?: number;
  inputType?: 'text' | 'number' | 'password';
  inputSize?: 'large' | 'default' | 'small';
}

export default defineComponent({
  name: 'input-ctrl',
  extends: Controller,
  components: { Tooltip, FormItem, Form },
  setup() { },
  mounted() {
    const _metadata: InputControllerMetadata = this.metadata;
    this.placeholder = _metadata.placeholder || null;
    this.hasClear = !!_metadata.hasClear;
  },
  data() {
    return {
      _placeholder: null,
      _hasClear: false,
      num: 0,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      _maxlength: null,
      _inputType: 'text',
      _inputSize: 'default',
    }
  },
  computed: {
    placeholder: {
      get: function (): string {
        return this._placeholder;
      },
      set: function (placeholder: string) {
        this._placeholder = placeholder || null;
      }
    },
    inputType: {
      get: function (): string {
        return this._inputType;
      },
      set: function (inputType: string) {
        this._inputType = inputType || 'text';
      }
    },
    inputSize: {
      get: function (): string {
        return this._inputSize;
      },
      set: function (inputSize: string) {
        this._inputSize = inputSize || 'defalut';
      }
    },
    maxlength: {
      get: function (): number {
        return this._maxlength;
      },
      set: function (maxlength: number) {
        this._maxlength = maxlength || null;
      }
    },
    hasClear: {
      get: function (): boolean {
        return this._hasClear;
      },
      set: function (hasClear: boolean) {
        this._hasClear = !!hasClear;
      }
    },
  },
  methods: {
    changeValue(e: any) {
      this.num += 1;
      this.value = this.num;
    },
    _valueChange(e: any) {
      this.valueChange(e.target.value);
    }
  }
})
</script>

<style lang="less" scoped>
// .form-item {
//   display: flex;
//   align-items: center;
//   width: 100%;
//   label {
//     padding: 0 7px;
//   }
//   a-input {
//     flex: 1;
//   }
// }
// .form-help {
//   padding: 0 5px;
//   font-size: 15px;
// }
</style>
