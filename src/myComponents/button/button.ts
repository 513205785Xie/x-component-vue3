
import { defineComponent } from 'vue';
import { default as Container, ContainerMetadata } from '/@/core/container/index';

export interface ButtonMetadata extends ContainerMetadata {
  label: string;
  disabled: boolean;
  btnType: 'primary' | 'dashed' | 'danger' | 'link'; // 主按钮、次按钮、虚线按钮、危险按钮和链接按钮
  shape: 'circle' | 'round'; // 形状圆
  size: 'small' | 'large' | 'default';
  loading: boolean;
  hasLoading: boolean;
  auto_block: boolean; // 转为行内属性，撑满父级宽度
  ghost: boolean; // 背景透明

  onClick: string;
}

export default defineComponent({
  name: 'Button',
  extends: Container,
  data() {
    return {
      _onClick: null,
      _label: null,
      _disabled: false,
      _btnType: 'primary',
      _shape: null,
      _size: 'default',
      _loading: false,
      _hasLoading: false,
      _auto_block: false,
      _ghost: false
    }
  },
  setup() { },
  mounted() {
    const _metadata: ButtonMetadata = this.metadata;
    this.onClick = _metadata.onClick || null;
    this._label = _metadata.label || null;
    this._disabled = !!_metadata.disabled;
    this._btnType = _metadata.btnType || 'primary';
    this._shape = _metadata.shape || null;
    this._size = _metadata.size || 'default';
    this._loading = !!_metadata.loading;
    this._hasLoading = !!_metadata.hasLoading;
    this._auto_block = !!_metadata.auto_block;
    this._ghost = !!_metadata.ghost;
  },
  computed: {
    onClick: {
      get: function (): string {
        return this._onClick?.toString() || null;
      },
      set: function (onClick: string) {
        if (this.isFn(onClick)) {
          // console.log(getApp());
          this._onClick = this.getFn(onClick);
        }
      }
    },
    label: {
      get: function (): string {
        return this._label;
      },
      set: function (label: string) {
        this._label = label || null;
      }
    },
    btnType: {
      get: function (): string {
        return this._btnType;
      },
      set: function (btnType: string) {
        this._btnType = btnType || 'primary';
      }
    },
    disabled: {
      get: function (): boolean {
        return this._disabled;
      },
      set: function (disabled: boolean) {
        this._disabled = !!disabled;
      }
    },
    loading: {
      get: function (): boolean {
        return this._loading;
      },
      set: function (loading: boolean) {
        this._loading = !!loading;
      }
    },
    hasLoading: {
      get: function (): boolean {
        return this._hasLoading;
      },
      set: function (hasLoading: boolean) {
        this._hasLoading = !!hasLoading;
      }
    },
    auto_block: {
      get: function (): boolean {
        return this._auto_block;
      },
      set: function (auto_block: boolean) {
        this._auto_block = !!auto_block;
      }
    },
    ghost: {
      get: function (): boolean {
        return this._ghost;
      },
      set: function (ghost: boolean) {
        this._ghost = !!ghost;
      }
    },
    shape: {
      get: function (): string {
        return this._shape;
      },
      set: function (shape: string) {
        this._shape = shape || 'round';
      }
    },
    size: {
      get: function (): string {
        return this._size;
      },
      set: function (size: string) {
        this._size = size || 'default';
      }
    },
  },
  methods: {
  }
});


