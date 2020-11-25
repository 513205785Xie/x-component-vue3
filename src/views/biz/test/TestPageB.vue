<template>
  <Main style="margin-top: 40px" :data="data" :metadata="metadata"></Main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { default as Content } from '/@/core/root/content.vue';
import { default as Main } from '/@/core/main/main.vue';

export default defineComponent({
  components: { Content, Main },
  setup() {
    const data = {
      a: '1',
      b: '2',
      c: '3',
      d: '4'
    };
    const metadata = [{
      id: 'content',
      type: 'content',
      bootstrap: true,
      children: [
        {
          id: 'form',
          type: 'form-layout',
          labelCol: 4,
          value: {
            input1: '12345',
            input2: 'qwert'
          },
          onValueChange: `
            (val) => {
              console.log('form', val);
            }
          `,
          style: {
            layoutType: 'float',
          },
          // childStyle: {
          //   width: '50%'
          // },
          children: [
            {
              id: 'input1',
              type: 'input-ctrl',
              label: '姓名',
              help: '提示提示',
              hasClear: true,
              style: {
                layoutType: 'flex',
                width: '50%',
                height: '200px',
                justifyContent: 'center',
                alignItems: 'center',
              }
            }, {
              id: 'input2',
              type: 'input-ctrl',
              hasClear: true,
              label: '年龄',
              style: {
                layoutType: 'flex',
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
              }
            }, {
              id: 'input3',
              type: 'input-ctrl',
              hasClear: true,
              label: '工号'
            }, {
              id: 'input4',
              type: 'input-ctrl',
              hasClear: true,
              label: '电话'
            }, {
              id: 'input5',
              type: 'input-ctrl',
              hasClear: true,
              label: '邮箱'
            }, {
              id: 'select',
              type: 'select-ctrl',
              label: 'select'
            }
          ]
        }, {
          id: 'def-button',
          type: 'def-button',
          label: '获取值',
          onClick: `() => {
            this.cid('input1').setValue('zxczxczxc', {emitEvent: false,onlySelf: true});
            console.log(this.cid('form').childControl);
            // this.cid('input1').value = '123123123'
            console.log(this.scope);
            console.log(
              {
                input1: this.cid('input1').value,
                input2: this.cid('input2').value,
                select: this.cid('select').value,
              }
            );
          }`
        }, {
          id: 'group-button',
          type: 'group-button',
          label: '按钮组',
          onClick: `(item) => { console.log(item) }`,
          child: [
            { label: '按钮1', value: '1', onClick: `() => { console.log(this.scope);}` },
            { label: '按钮2', value: '2', onClick: `() => { console.log(this.root);}` },
            { label: '按钮3', value: '3' }
          ]
        }
      ]
    }, {
      id: 'dialog',
      type: 'dialog',
    }];
    return {
      data,
      metadata
    }
  }
});
</script>
