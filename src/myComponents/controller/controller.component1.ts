export interface ControllerMetadata {
  name?: string; // 名称, 如果不存在就使用id
  label?: string; // 标题
  defaultValue?: any; // 默认值
  disabled?: boolean; // 禁用的, 默认是启用
  passive?: boolean; // 被动的, 默认是主动提供值, 如果为真则该控件的父Form不会使用其值
  required?: boolean; // [校验类]必须的, 值必须填写
  requiredMsg?: string; // [校验类]必填验证错误信息 优先级最高 TODO requiredMsg
  pattern?: string; // [校验类]正则表达式
  patternMsg?: string; // [校验类]正则验证错误信息 TODO patternMsg
  // event
  onValueChange?: string; // 回调参数
  onStatusChange?: string; // 回调参数
}

export class ControllerComponent {
  public _metadata: ControllerMetadata;
  public _data: any;
  public _onValueChange: Function;
  public _label: string;
  public _value: any;

  constructor(data: Object, metadata: ControllerMetadata) {
    this._metadata = metadata;
    this._data = data;
    this.setAttr();
    this.init();
  }

  init() {
    this.onValueChange = this._metadata?.onValueChange;
    this.label = this._metadata?.label;
    setTimeout(() => {
      this.value = '123';
    }, 500);
  }

  /**
   * 设置存取器
   * @param name 属性名
   * @param setter set函数
   * @param getter get函数
   */
  setAccessor(name: string, setter: any, getter: any) {
    const _setter = typeof (setter) === 'function' ? setter : () => { };
    const _getter = typeof (getter) === 'function' ? getter : () => { };
    Object.defineProperty(this, name, {
      set: _setter,
      get: _getter,
      enumerable: true,
      configurable: true
    })
  }

  setAttr() {
    this.setAccessor('onValueChange', (onValueChange: string) => {
      // if (isFunction(onValueChange)) {
      //   this._onValueChange = new Function(onValueChange)();
      // }
    }, () => {
      return this._onValueChange?.toString();
    });

    this.setAccessor('label', (label: string) => {
      this._label = label || '';
    }, () => {
      return this._label;
    });

    this.setAccessor('value', (value: string) => {
      this._value = value || '';
      console.log('=====setValue=====');
    }, () => {
      console.log('=====getValue=====');
      return this._value;
    });
  }

}
