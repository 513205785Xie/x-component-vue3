<template>
  <div class="m-4">

    <CollapseContainer title="基础收缩示例">
      <BasicForm @register="register" />
    </CollapseContainer>

    <CollapseContainer title="超过3行自动收起" class="mt-4">
      <BasicForm @register="register1" />
    </CollapseContainer>

    <!-- <MyInput :metadata="metadata"></MyInput> -->


  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
import { CollapseContainer } from '/@/components/Container/index';
import { default as MyInput } from '/@/myComponents/controller/input/index.vue';

const getSchamas = (): FormSchema[] => {
  return [
    {
      field: 'field1',
      component: 'Input',
      label: '字段1',
      colProps: {
        span: 8,
      },
      componentProps: {
        placeholder: '自定义placeholder',
        onChange: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'field2',
      component: 'Input',
      label: '字段2',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field3',
      component: 'DatePicker',
      label: '字段3',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field4',
      component: 'Select',
      label: '字段4',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
            key: '1',
          },
          {
            label: '选项2',
            value: '2',
            key: '2',
          },
        ],
      },
    },
    {
      field: 'field5',
      component: 'CheckboxGroup',
      label: '字段5',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
        ],
      },
    },
    {
      field: 'field7',
      component: 'RadioGroup',
      label: '字段7',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
        ],
      },
    },
  ];
};

function getAppendSchemas(): FormSchema[] {
  return [
    {
      field: 'field10',
      component: 'Input',
      label: '字段10',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field11',
      component: 'Input',
      label: '字段11',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field12',
      component: 'Input',
      label: '字段12',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field13',
      component: 'Input',
      label: '字段13',
      colProps: {
        span: 8,
      },
    },
  ];
}
export default defineComponent({
  components: { BasicForm, CollapseContainer, MyInput },
  setup() {

    const [register] = useForm({
      labelWidth: 120,
      schemas: getSchamas(),
      actionColOptions: {
        span: 24,
      },
      compact: true,
      showAdvancedButton: true,
    });
    const [register1] = useForm({
      labelWidth: 120,
      schemas: [...getSchamas(), ...getAppendSchemas()],
      actionColOptions: {
        span: 24,
      },
      compact: true,
      showAdvancedButton: true,
    });

    const data = {
      value: 'test',
    };

    const metadata = {
      defaultValue: 'defaultValue',
      label: '测试测试',
      tip: 'xixi',
      hasClear: true,
      placeholder: '测试input',
      onValueChange: `(val)=>{console.log('=====valueChange=====', val);}`
    };

    return {
      register,
      register1,
      data,
      metadata,
    };
  },
  methods: {

  }
});
</script>
