/**
 * Global authority directive
 * Used for fine-grained control of component permissions
 * @Example v-auth="RoleEnum.TEST"
 */
import type { App, Directive, DirectiveBinding } from 'vue';

import { appStore } from '/@/store/modules/app';
import { usePermission } from '/@/hooks/web/usePermission';
import { PermissionModeEnum } from '/@/enums/appEnum';

import { Layout } from '/@/myComponents/layout/layout';

const { hasPermission } = usePermission();

function isAuth(el: Element, binding: any) {
  const value = binding.value;
  if (!value) return;
  if (!hasPermission(value)) {
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }
}

function isBackMode() {
  return appStore.getProjectConfig.permissionMode === PermissionModeEnum.BACK;
}

const mounted = (el: Element, binding: DirectiveBinding<any>) => {
  if (isBackMode()) return;
  isAuth(el, binding);
};

const updated = (el: Element, binding: DirectiveBinding<any>) => {
  if (!isBackMode()) return;
  isAuth(el, binding);
};

const authDirective: Directive = {
  mounted,
  updated,
};

export function setupPermissionDirective(app: App) {

  const setLayout = function (el: Element, binding: any) {
    const _width = app._container?.offsetWidth || null; // 项目根节点
    const data: Layout = binding?.value;
    if (el && data instanceof Object && _width) {
      let { xs, sm, md, lg, ..._data } = data;
      let mediaData = lg || {};
      if (_width < 600) {
        mediaData = xs || {}
      } else if (_width >= 600 && _width < 960) {
        mediaData = sm || {}
      } else if (_width >= 960 && _width < 1280) {
        mediaData = md || {}
      }
      _data = { ..._data, ...mediaData };
      el.className = el.className.replace(/flexLayout|floatLayout|gridLayout/g, '') + ` ${data.layoutType}Layout`;
      if (_data.layoutType === 'float') {
        for (const item of el.childNodes) {
          if (item && item.className) {
            item.className = item.className.replace(/floatItem/g, '') + ` floatItem`;
          }
        }
      }
      for (const attr in _data) {
        el.style[attr] = _data[attr];
      }
    }
  }

  app.directive('auth', authDirective);

  app.directive('dynLayout', {
    mounted(el: Element, binding: any) {
      setLayout(el, binding);
    }, updated(el: Element, binding: any) {
      setLayout(el, binding);
    }
  });

}

export default authDirective;
