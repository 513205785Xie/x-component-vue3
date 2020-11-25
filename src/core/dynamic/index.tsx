import {
  defineAsyncComponent, defineComponent, watchEffect,
  watch, ref
} from 'vue'
import { appStore } from '/@/store/modules/app';

export interface ParmaAttrs {
  data: any;
  metadata: any;
  parent: any;
}

export default defineComponent({
  name: 'Dynamic',
  props: ['data', 'metadata', 'parent'],
  setup(props: ParmaAttrs) {

    const rootMapping: any = appStore.getRootMapping;
    const contentMapping: any = appStore.getContentMapping;

    const getContainer = function (type: string): any {
      const clz = rootMapping[type];
      if (clz) { return clz; }
      const dlz = contentMapping[type];
      if (dlz) { return dlz; }
      type = 'notfound';
      return rootMapping[type];
    }

    const type = props.metadata?.type || null;
    let AsyncComp = defineAsyncComponent(() => getContainer(type));
    // v-dynLayout={props.metadata?.style || {}}
    let _render: any = type && getContainer(type) ? <AsyncComp metadata={props.metadata || null} data={props.data || null} parent={props.parent || null}></AsyncComp> : '组件不存在！';

    const _metadata = ref(null);
    const _data = ref(null);
    const _parent = ref(null);
    watchEffect(() => {
      _metadata.value = props.metadata;
      _data.value = props.data;
      _parent.value = props.parent;
    });
    watch([_metadata, _data, _parent], ([metadata, data, parent], [pMetadata, pData, pParent]) => {
      setRender(getContainer(metadata?.type));
    })

    const setRender = function (com: any) {
      AsyncComp = defineAsyncComponent(() => com);
      // v-dynLayout={props.metadata?.style || {}}
      _render = com ? <AsyncComp metadata={props.metadata || null} data={props.data || null} parent={props.parent || null}></AsyncComp> : '组件不存在！';
    }

    return () => (
      <div>
        {_render}
      </div>
    );
  },
  mounted() { },
  methods: {

  }
})
