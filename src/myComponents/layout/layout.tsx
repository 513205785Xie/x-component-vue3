
import { defineComponent } from 'vue';
import { default as Container, ContainerMetadata } from '/@/core/container/index';

export const isFunction = (arg: unknown): arg is (...args: any[]) => any =>
  typeof arg === 'function';

export const isFn = (str: string) => {
  const pattern = /^\s*\([A-Za-z0-9, ]*\)\s*=>/;
  return pattern.test(str);
}

export const getFn = (str: string): Function => {
  const _fn = new Function(`return (${str})`);
  return _fn();
}

export interface LayoutData {
  // 特殊
  layoutType?: 'float' | 'flex' | 'grid',

  // 默认
  width?: string,
  height?: string,
  minWidth?: string,
  minHeight?: string,
  padding?: string,
  margin?: string,
  color?: string,
  backgroundColor?: string,

  // flex
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse', // 排列方向
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around', // 主轴排列方式
  alignItems?: 'flex-start' | 'flex-end' | 'center', // 副轴排列方式
  flex?: string | number,

  // grid
  gridAutoFlow?: 'row' | 'column', // 排列顺序  grid-auto-flow
  gridTemplateColumns?: string, // 列样式
  gridTemplateRows?: string, // 行样式
  gridRowGap?: string, // 行间距
  gridColumnGap?: string, // 列间距

}

export interface Layout extends LayoutData {
  xs?: LayoutData; // (max-width: 599.99px)
  sm?: LayoutData; // (min-width: 600px) and (max-width: 959.99px)
  md?: LayoutData; // (min-width: 960px) and (max-width: 1279.99px)
  lg?: LayoutData; // (min-width: 1280px)
}

export interface LayoutMetadata extends ContainerMetadata {
  childStyle?: Layout;
  children?: any[];

  clsBoxing?: boolean;
  clsPadding?: boolean;
  clsMargin?: boolean;
  clsTopMargin?: boolean;
}

export default defineComponent({
  name: 'BaseLayout',
  extends: Container,
  data() {
    return {
      _childStyle: null,
      _children: null,
      _clsBoxing: null,
      _clsPadding: null,
      _clsMargin: null,
      _clsTopMargin: null,
      defaultChildLayout: {
        layoutType: 'flex',
        width: '100%'
      }
    }
  },
  setup() { },
  mounted() {
    const _metadata: LayoutMetadata = this.metadata;
    this.childStyle = _metadata.childStyle;
    this.children = _metadata.children;
    this.clsBoxing = !!_metadata.clsBoxing;
    this.clsPadding = !!_metadata.clsPadding;
    this.clsMargin = !!_metadata.clsMargin;
    this.clsTopMargin = !!_metadata.clsTopMargin;
  },
  computed: {
    childStyle: {
      get: function (): Layout {
        return this._childStyle;
      },
      set: function (childStyle: Layout) {
        this._childStyle = this.styleMerge({}, childStyle);
      }
    },
    children: {
      get: function (): Array<any> {
        return this._children;
      },
      set: function (children: Array<any>) {
        this._children = children instanceof Array ? children : [];
      }
    },
    clsBoxing: {
      get: function (): boolean {
        return this._clsBoxing;
      },
      set: function (clsBoxing: boolean) {
        this._clsBoxing = !!clsBoxing;
      }
    },
    clsPadding: {
      get: function (): boolean {
        return this._clsPadding;
      },
      set: function (clsPadding: boolean) {
        this._clsPadding = !!clsPadding;
      }
    },
    clsTopMargin: {
      get: function (): boolean {
        return this._clsTopMargin;
      },
      set: function (clsTopMargin: boolean) {
        this._clsTopMargin = !!clsTopMargin;
      }
    },
    clsMargin: {
      get: function (): boolean {
        return this._clsMargin;
      },
      set: function (clsMargin: boolean) {
        this._clsMargin = !!clsMargin;
      }
    }
  },
  methods: {
    
  }
});
