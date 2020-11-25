<template>
  <Dropdown>
    <template #overlay>
      <Menu>
        <MenuItem v-for="(item, index) in child" v-bind:key="index" @click="doClick(item)">
          {{ item?.label || '' }}
        </MenuItem>
      </Menu>
    </template>
    <a-button> {{ label }} <DownOutlined /> </a-button>
  </Dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { default as Button, ButtonMetadata } from '../button';
import { DownOutlined } from '@ant-design/icons-vue';
import { Dropdown, Menu } from 'ant-design-vue';

const MenuItem = Menu.Item;

export interface GroupButtonChildMetadata {
  label?: string;
  onClick?: string;
}

export interface GroupButtonMetadata extends ButtonMetadata {
  child?: Array<GroupButtonChildMetadata>
}

export default defineComponent({
  name: 'group-button',
  extends: Button,
  components: { DownOutlined, Dropdown, Menu, MenuItem },
  setup() { },
  data() {
    return {
      _child: []
    }
  },
  mounted() {
    const _metadata: GroupButtonMetadata = this.metadata;
    this.child = _metadata.child;
  },
  computed: {
    child: {
      set: function (child: Array<GroupButtonChildMetadata>) {
        if (child instanceof Array) {
          this._child = child;
        }
      },
      get: function (): Array<GroupButtonChildMetadata> {
        return this._child;
      }
    }
  },
  methods: {
    doClick(menu: GroupButtonChildMetadata) {
      if (menu && menu['onClick'] && this.isFn(menu.onClick)) {
        const _fn = this.getFn(menu.onClick);
        _fn(menu);
      } else if (this._onClick) {
        this._onClick(menu);
      }
    }
  },
})
</script>