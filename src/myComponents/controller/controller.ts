
import { defineComponent } from 'vue';
import { default as Container, ContainerMetadata } from '/@/core/container/index';
import { useDebounce } from '/@/hooks/core/useDebounce';

export interface SetValueOptions {
  // options.onlySelf 如果为 true，则每个变更仅仅影响当前控件，而不会影响父控件。默认为 false。
  // options.emitEvent 如果为 true 或未提供（默认），则当控件值发生变化时，statusChanges 和 valueChanges 这两个 Observable 分别会以最近的状态和值发出事件。 如果为 false 则不发出事件。
  emitEvent?: boolean;
  onlySelf?: boolean;
}

export interface ControllerMetadata extends ContainerMetadata {
  defaultValue?: any;
  label?: string;
  onValueChange?: string;
  labelAlign?: 'left' | 'right';
  required?: boolean;
  help?: string;
  name?: string;
  vGap?: 'large' | 'default' | 'small' // 垂直间隔 24、16、8
  disabled?: boolean;
  labelCol?: number;
}

export default defineComponent({
  name: 'Controller',
  extends: Container,
  data() {
    return {
      _value: null,
      _onValueChange: null,
      _label: null,
      _labelAlign: 'right',
      _help: null,
      name: null,
      _vGap: 'default',
      _disabled: false,
      _labelCol: null,
      parentForm: null,
    }
  },
  setup() { },
  mounted() {
    const _metadata: ControllerMetadata = this.metadata;
    this.value = _metadata.defaultValue || null;
    this.label = _metadata.label || null;
    this.onValueChange = _metadata.onValueChange || null;
    this.labelAlign = _metadata.labelAlign || 'right';
    this.help = _metadata.help || null;
    this.name = _metadata.name || _metadata.id;
    this.vGap = _metadata.vGap;
    this.disabled = _metadata.disabled;
    this.labelCol = _metadata.labelCol;
    this.parentForm = this.getParentForm(this.parent);
    if (this.parentForm) {
      this.parentForm.childControl[this.name] = this._self();
    }
  },
  computed: {
    value: {
      get: function (): any {
        return this._value;
      },
      set: function (value: any) {
        this.setValue(value);
      }
    },
    label: {
      get: function (): string {
        return this._label;
      },
      set: function (label: string) {
        this._label = label;
      }
    },
    labelCol: {
      get: function (): number {
        return this._labelCol;
      },
      set: function (labelCol: number) {
        this._labelCol = labelCol || null;
      }
    },
    labelAlign: {
      get: function (): string {
        return this._labelAlign;
      },
      set: function (labelAlign: string) {
        this._labelAlign = labelAlign;
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
    },
    help: {
      get: function (): string {
        return this._help;
      },
      set: function (help: string) {
        this._help = help || null;
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
    disabled: {
      set: function (disabled: boolean) {
        this._disabled = !!disabled;
      },
      get: function (): boolean {
        return this._disabled;
      }
    },
  },
  methods: {
    valueChange(value: any): void {
      if (this._onValueChange) {
        this._onValueChange(value);
      }
    },
    getParentForm(container: any): any {
      let _container = null;
      if (container) {
        _container = container.type === 'form-layout' ? container : this.getParentForm(container.parent);
      }
      return _container;
    },
    setValue(value: any, options?: SetValueOptions): void {
      this._value = value;
      if (options?.emitEvent !== false) {
        this.valueChange(value);
      }
      if (!options?.onlySelf && this.parentForm) {
        this.parentForm.valueChange();
      }
    }
  }
});


