<template>
  <Form
    :model="value"
    :class="'qiuer-form-' + vGap"
    :labelCol="{ span: labelCol }"
    :wrapperCol="{ span: 24 - labelCol }"
    v-dynLayout="style"
  >
    <DynamicCom
      v-for="(child, index) in children"
      v-bind:key="index"
      v-dynLayout="mergeObject(childStyle, child.style)"
      :metadata="child"
      :parent="_self()"
    ></DynamicCom>
  </Form>
</template>

<script lang="ts">
      // v-dynLayout="mergeObject(childStyle, child.style)"

// style="display: grid"

import { defineComponent, ref, watchEffect, watch } from 'vue';
import { default as LayoutContainer, LayoutMetadata, Layout } from '../layout';
import { Form } from 'ant-design-vue';
import DynamicCom from '/@/core/dynamic';
import { useDebounce } from '/@/hooks/core/useDebounce';

export interface ValueObject {
  [propName: string]: any;
}

export interface SetValueOptions {
  // options.emitEvent 如果为 true 或未提供（默认），则当控件值发生变化时，statusChanges 和 valueChanges 这两个 Observable 分别会以最近的状态和值发出事件。 如果为 false 则不发出事件。
  emitEvent?: boolean;
}

export interface FormLayoutMetadata extends LayoutMetadata {
  vGap?: 'large' | 'default' | 'small' // 垂直间隔 24、16、8
  labelCol?: number;
  value?: ValueObject;
}

export default defineComponent({
  name: 'form-layout',
  extends: LayoutContainer,
  components: { Form, DynamicCom },
  setup() { },
  data() {
    return {
      _isSetUrl: false,
      _onValueChange: null,
      _vGap: 'default',
      _labelCol: 7,
      childControl: {},
      defaultChildLayout: {
        layoutType: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '25%',
        xs: { width: '100%' },
        sm: { width: '50%' }
      }
    }
  },
  computed: {
    childStyle: {
      get: function (): Layout {
        return this._childStyle;
      },
      set: function (childStyle: Layout) {
        this._childStyle = this.styleMerge(this.defaultChildLayout, childStyle);
      }
    },
    isSetUrl: {
      get: function (): boolean {
        return this._isSetUrl;
      },
      set: function (isSetUrl: boolean) {
        this._isSetUrl = !!isSetUrl;
      }
    },
    value: {
      set: function (value: ValueObject) {
        this.setValue(value);
      },
      get: function (): ValueObject {
        const _value = {};
        for (const key of Object.keys(this.childControl)) {
          if (!this.childControl[key].hidden) {
            _value[key] = this.childControl[key].value;
          }
        }
        return _value
      }
    },
    vGap: {
      set: function (vGap: string) {
        this._vGap = vGap || 'default';
      },
      get: function (): string {
        return this._vGap;
      }
    },
    labelCol: {
      get: function (): number {
        return this._labelCol;
      },
      set: function (labelCol: number) {
        this._labelCol = labelCol || 7;
      }
    },
    onValueChange: {
      get: function (): string {
        return this._onValueChange?.toString() || null;
      },
      set: function (onValueChange: string) {
        if (this.isFn(onValueChange)) {
          [this._onValueChange] = useDebounce(this.getFn(onValueChange), 200);
        }
      }
    }
  },
  mounted() {
    const _metadata: FormLayoutMetadata = this.metadata;
    this.isSetUrl = _metadata.isSetUrl;
    this.onValueChange = _metadata.onValueChange;
    this.vGap = _metadata.vGap;
    this.labelCol = _metadata.labelCol || 7;
    this.value = _metadata.value;

    const loadChildLength = ref(0);
    watchEffect(() => {
      loadChildLength.value = Object.keys(this.childControl).length;
    });
    watch(loadChildLength, (_length, p_length) => {
      if (loadChildLength.value === this.children?.length) {
        this.setValue(_metadata.value);
      }
    })
  },
  methods: {
    setValue(value: any, options?: SetValueOptions): void {
      if (!value || typeof (value) !== 'object') {
        return;
      }
      for (const key of Object.keys(this.childControl)) {
        this.childControl[key].setValue(value[key] || null, options);
      }
      if (options?.emitEvent !== false) {
        this.valueChange();
      }
    },
    valueChange() {
      if (this._onValueChange) {
        this._onValueChange(this.value);
      }
    }
  }
})

</script>