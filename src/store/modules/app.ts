import type { ProjectConfig } from '/@/types/config';

import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators';
import store from '/@/store';

import { PROJ_CFG_KEY, LOCK_INFO_KEY, LOCK_LAN } from '/@/enums/cacheEnum';

import { hotModuleUnregisterModule } from '/@/utils/helper/vuexHelper';

import { setLocal, getLocal, removeLocal } from '/@/utils/helper/persistent';
import { deepMerge } from '/@/utils';

import { userStore } from './user';

export interface LockInfo {
  pwd: string | undefined;
  isLock: boolean;
}

const RootContainer = {
  'content': import('/@/core/root/content.vue'),
};

const DynComponents = {

  // control
  'input-ctrl': import('/@/myComponents/controller/input/index.vue'),
  'select-ctrl': import('/@/myComponents/controller/select/index.vue'),

  // button
  'def-button': import('/@/myComponents/button/defButton/index.vue'),
  'group-button': import('/@/myComponents/button/groupButton/index.vue'),

  // layout
  'form-layout': import('/@/myComponents/layout/form/index.vue'),

};

let timeId: ReturnType<typeof setTimeout>;
const NAME = 'app';
hotModuleUnregisterModule(NAME);
@Module({ dynamic: true, namespaced: true, store, name: NAME })
class App extends VuexModule {
  // Page loading status
  private pageLoadingState = false;

  // project config
  private projectConfigState: ProjectConfig | null = getLocal(PROJ_CFG_KEY);

  // lock info
  private lockInfoState: LockInfo | null = getLocal(LOCK_INFO_KEY);

  // set main overflow hidden
  private lockMainScrollState = false;

  private lockLanguage: string = getLocal(LOCK_LAN) || 'zh';

  // public SCOPE_ROOT: ContainerType = {}; // 全局保存的组件实例对象 以scope的id为key

  private DIALOGS_METADATA: any; // 全局保存的dialog配置list

  private BOOTSTRAP_METADATA: any; // 启动入口根组件配置

  get getPageLoading() {
    return this.pageLoadingState;
  }

  get getLockMainScrollState() {
    return this.lockMainScrollState;
  }

  get getLockInfo(): LockInfo {
    return this.lockInfoState || ({} as LockInfo);
  }

  get getProjectConfig(): ProjectConfig {
    return this.projectConfigState || ({} as ProjectConfig);
  }

  @Mutation
  commitPageLoadingState(loading: boolean): void {
    this.pageLoadingState = loading;
  }

  @Mutation
  commitLockMainScrollState(lock: boolean): void {
    this.lockMainScrollState = lock;
  }

  @Mutation
  commitProjectConfigState(proCfg: DeepPartial<ProjectConfig>): void {
    this.projectConfigState = deepMerge(this.projectConfigState || {}, proCfg);
    setLocal(PROJ_CFG_KEY, this.projectConfigState);
  }

  @Mutation
  commitLockInfoState(info: LockInfo): void {
    this.lockInfoState = Object.assign({}, this.lockInfoState, info);
    setLocal(LOCK_INFO_KEY, this.lockInfoState);
  }

  @Mutation
  resetLockInfo(): void {
    removeLocal(LOCK_INFO_KEY);
    this.lockInfoState = null;
  }


  // 切换语言(宋晨)
  get getLockLanguage() {
    return this.lockLanguage;
  }

  get getDialogMetadata() {
    return this.DIALOGS_METADATA;
  }

  get getBootstrapMetadata() {
    return this.BOOTSTRAP_METADATA;
  }

  get getRootMapping() {
    return RootContainer;
  }

  get getContentMapping() {
    return DynComponents;
  }

  @Mutation
  commitDialogs(dialogs: Array<any>): void {
    this.DIALOGS_METADATA = dialogs;
  }

  @Mutation
  commitBootstrap(bootstrap: any): void {
    this.BOOTSTRAP_METADATA = bootstrap;
  }

  @Mutation
  commitLockLanguage(language: string): void {
    this.lockLanguage = language;
    setLocal(LOCK_LAN, this.lockLanguage);
  }




  @Action
  public async setPageLoadingAction(loading: boolean): Promise<void> {
    if (loading) {
      clearTimeout(timeId);
      // 防止闪动
      timeId = setTimeout(() => {
        this.commitPageLoadingState(loading);
      }, 100);
    } else {
      this.commitPageLoadingState(loading);
      clearTimeout(timeId);
    }
  }

  // /**
  //  * @description: unlock page
  //  */
  @Action
  public async unLockAction({ password, valid = true }: { password: string; valid?: boolean }) {
    if (!valid) {
      this.resetLockInfo();
      return true;
    }
    const tryLogin = async () => {
      try {
        const username = userStore.getUserInfoState.username;
        const res = await userStore.login({ username, password }, false);
        if (res) {
          this.resetLockInfo();
        }
        return res;
      } catch (error) {
        return false;
      }
    };

    if (this.getLockInfo) {
      if (this.getLockInfo.pwd === password) {
        this.resetLockInfo();
        return true;
      }
      const res = await tryLogin();
      return res;
    }
    const res = await tryLogin();
    return res;
  }
}
export { App };
export const appStore = getModule<App>(App);
