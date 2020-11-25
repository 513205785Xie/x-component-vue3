import { defineComponent, getCurrentInstance } from 'vue';
import { message } from 'ant-design-vue';
import { getApp } from '/@/setup/App';
import { appStore } from '/@/store/modules/app';
import { Layout } from '/@/myComponents/layout/layout';

export interface ValueObject {
  [propName: string]: any;
}

export interface ContainerMetadata {
  id: string; // 允许id不存在
  type: string;
  hidden?: boolean; // 隐藏的, 默认是显示
  local?: string | any; //  TODO 遗留问题
  onCreate?: string; // 构造函数后
  onInit?: string; // 界面渲染以后
  onDestroy?: string; // 销毁组件前
  onSetElement?: string; //  set数据变化事件
  onGetElement?: string; //  get数据变化事件

  style?: Layout;
}

export default defineComponent({
  name: 'container',
  props: ['data', 'metadata', 'parent'],
  setup() { },
  data() {
    return {
      id: null,
      type: null,
      scope: null,
      root: null,
      _hidden: null,
      _local: null,
      _onInit: null,
      _onDestroy: null,
      _style: null,
      _parent: null,
      _that: null,
    }
  },
  mounted() {
    // QIUER_CONTAINERS : 存所有组件的实例
    // QIUER_ROOT : 暂存当前渲染组件的根组件
    // QIUER_SCOPE : 暂存当前渲染组件的全局对象

    const rootMapping: any = appStore.getRootMapping;
    const metadata: ContainerMetadata = this.metadata;
    this.hidden = metadata.hidden;
    this.local = metadata.local;
    this.onInit = metadata.onInit;
    this.onDestroy = metadata.onDestroy;
    this.style = metadata.style;
    this.id = metadata.id;
    this.type = metadata.type;

    const instance = getCurrentInstance()?.proxy;
    const _app = getApp();
    this._that = instance;

    if (this.type in rootMapping) {
      _app['QIUER_ROOT'] = instance;
      _app['QIUER_SCOPE'] = this.data;
    }

    if (!('QIUER_CONTAINERS' in _app)) { _app['QIUER_CONTAINERS'] = {}; }
    _app['QIUER_CONTAINERS'][instance.id] = instance;

    this.scope = _app['QIUER_SCOPE'] || {};
    this.root = _app['QIUER_ROOT'] || {};

  },
  computed: {
    hidden: {
      set: function (hidden: boolean) {
        this._hidden = !!hidden;
      },
      get: function (): boolean {
        return this._hidden;
      }
    },
    local: {
      set: function (local: any) {
        this._local = local;
      },
      get: function (): any {
        return this._local;
      }
    },
    onInit: {
      get: function (): string {
        return this._onInit?.toString() || null;
      },
      set: function (onInit: string) {
        if (this.isFn(onInit)) {
          this._onInit = this.getFn(onInit);
        }
      }
    },
    onDestroy: {
      get: function (): string {
        return this._onDestroy?.toString() || null;
      },
      set: function (onDestroy: string) {
        if (this.isFn(onDestroy)) {
          this._onDestroy = this.getFn(onDestroy);
        }
      }
    },
    style: {
      set: function (style: Layout) {
        style = style || {};
        style['layoutType'] = style['layoutType'] || 'flex';
        this._style = style;
      },
      get: function (): any {
        return this._style;
      }
    }
    // ,
    // scope: {
    //   set: function (scope: any) { },
    //   get: function (): any {
    //     return this.scope;
    //   }
    // }
  },
  methods: {
    isFn(str: string): boolean {
      const pattern = /^\s*\([A-Za-z0-9, ]*\)\s*=>/;
      return pattern.test(str);
    },
    getFn(str: string): Function {
      const _fn = this._compileCallbackFunction(str);
      return _fn;
    },
    _compileCallbackFunction(evalStr: string, argum?: string) {
      if (evalStr == null) { return null; }
      let evalFunc: any;
      if (this.isFn(evalStr)) {
        evalFunc = this._evalStatement('(\n' + evalStr + '\n)');
      } else {
        evalFunc = this._evalStatement(argum + '=>{\n' + evalStr + '\n}');
      }
      return evalFunc;
    },
    _evalStatement(statement: any): any {
      if (statement) {
        try {
          const ret: any = eval(statement);
          return ret;
        } catch (e) {
          console.log(e);
          console.error(statement);
          message.error('执行语句出错!');
        }

      }
    },
    cid(id: string): any {
      const _app = getApp();
      return _app.QIUER_CONTAINERS[id];
    },
    _self(): any {
      return this._that;
    },
    _getStyle(style: Layout): ValueObject {
      const _layoutType = style?.layoutType || 'flex';
      const _style = { ...(style?.defaultData || {}), ...(_layoutType === 'flex' ? (style?.flexData || {}) : _layoutType === 'grid' ? (style?.gridData || {}) : {}) };
      _style['layoutType'] = _layoutType;
      return _style;
    },
    mergeObject(target: object, source: object): object {
      target = target instanceof Object ? this.deepCopy(target) : {};
      source = source instanceof Object ? this.deepCopy(source) : {};
      const _data = Object.assign(target, source);
      return _data;
    },
    deepCopy(data: any): any {
      let _data = null;
      try {
        _data = JSON.parse(JSON.stringify(data))
      } catch (e) { }
      return _data;
    },
    styleMerge(lowLayout: Layout, highLayout: Layout) {
      const list = ['xs', 'sm', 'md', 'lg'];
      lowLayout = lowLayout ? this.deepCopy(lowLayout) : {};
      highLayout = highLayout ? this.deepCopy(highLayout) : {};

      const _layoutData = { ...lowLayout, ...highLayout };

      for (const key of list) {
        const _mediaData = Object.assign(lowLayout[key] || {}, highLayout[key] || {});
        // for (const key of Object.keys(_layoutData).filter(item => list.indexOf(item) === -1)) {
        //   _mediaData[key] = _mediaData[key] || _layoutData[key] || null;
        // }
        _layoutData[key] = _mediaData;
      }
      // console.log(_layoutData);
      return this.deepCopy(_layoutData);
    }
  }

})

export const isFunction = (arg: unknown): arg is (...args: any[]) => any =>
  typeof arg === 'function';
