import type { ProjectConfig } from '/@/types/config';

import { MenuTypeEnum, MenuModeEnum, TriggerEnum } from '/@/enums/menuEnum';
import { ContentEnum, PermissionModeEnum, ThemeEnum, RouterTransitionEnum } from '/@/enums/appEnum';
import { primaryColor } from '../../build/config/lessModifyVars';
import { isProdMode } from '/@/utils/env';

// ! You need to clear the browser cache after the change
const setting: ProjectConfig = {
  // color
  // TODO 主题色
  themeColor: primaryColor,

  // header bg color
  headerBgColor: '#ffffff',

  // sidebar menu bg color
  menuBgColor: '#273352',

  // Whether to show the configuration button
  showSettingButton: true,
  // 权限模式
  permissionMode: PermissionModeEnum.ROLE,
  // 网站灰色模式，用于可能悼念的日期开启
  grayMode: false,
  // 色弱模式
  colorWeak: false,

  // 是否取消菜单,顶部,多标签页显示, 用于可能内嵌在别的系统内
  fullContent: false,
  // content mode
  contentMode: ContentEnum.FULL,
  // 是否显示logo
  showLogo: true,

  // 头部配置
  headerSetting: {
    fixed: true,
    // 是否显示顶部
    show: true,
    // theme
    theme: ThemeEnum.LIGHT,
    // 开启锁屏功能
    useLockPage: true,
    // 显示刷新按钮
    showRedo: true,
    // 显示全屏按钮
    showFullScreen: false,
    // 显示文档按钮
    showDoc: false,
    //  是否显示github
    showGithub: false,
    // 显示消息中心按钮
    showNotice: false,
    // 显示国际化切换(宋晨)
    switchLanguage: true,
  },
  // 菜单配置
  menuSetting: {
    // 菜单折叠
    collapsed: false,
    // 折叠菜单时候是否显示菜单名
    collapsedShowTitle: false,
    // 是否可拖拽
    hasDrag: false,
    // 是否显示 没有dom
    show: true,
    // 是否显示 有dom
    hidden: true,
    // 是否显示搜索框
    showSearch: true,
    // 菜单宽度
    menuWidth: 210,
    // 菜单模式
    mode: MenuModeEnum.INLINE,
    // 菜单类型
    type: MenuTypeEnum.SIDEBAR,
    // 菜单主题
    theme: ThemeEnum.DARK,
    // 分割菜单
    split: false,
    // 顶部菜单布局
    topMenuAlign: 'center',
    // 折叠菜单时候隐藏搜索框
    collapsedShowSearch: false,
    // 折叠触发器的位置
    trigger: TriggerEnum.HEADER,
    // 开启手风琴模式,只显示一个菜单
    accordion: true,
  },
  // 消息配置
  messageSetting: {
    // 弹窗title
    title: '操作提示',
    // 取消按钮的文子,
    cancelText: '取消',
    // 确认按钮的文字
    okText: '确定',
  },
  // 多标签
  multiTabsSetting: {
    // 开启
    show: true,
    // 开启快速操作
    showQuick: true,
    // 显示icon
    showIcon: false,
    // 标签页缓存最大数量
    max: 12,
  },
  // 是否开启KeepAlive缓存  开发时候最好关闭,不然每次都需要清除缓存
  openKeepAlive: true,

  // 自动锁屏时间，为0不锁屏。 单位分钟 默认0
  lockTime: 0,
  // 显示面包屑
  showBreadCrumb: true,
  // 显示面包屑图标
  showBreadCrumbIcon: false,

  // 使用error-handler-plugin
  useErrorHandle: false,

  //  开启页面切换动画
  openRouterTransition: true,

  // 路由切换动画
  routerTransition: RouterTransitionEnum.FADE_SIDE,

  // 是否开启登录安全校验
  openLoginVerify: true,

  // 是否开启页面切换loading
  openPageLoading: true,

  // 是否开启回到顶部
  useOpenBackTop: false,

  // 开启顶部进度条
  openNProgress: isProdMode(),

  //  是否可以嵌入iframe页面
  canEmbedIFramePage: false,

  // 切换界面的时候是否删除未关闭的message及notify
  closeMessageOnSwitch: true,

  // 切换界面的时候是否取消已经发送但是未响应的http请求。
  // 如果开启,想对单独接口覆盖。可以在单独接口设置
  removeAllHttpPending: false,
};

export default setting;
