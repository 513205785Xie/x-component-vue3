import type { ColEx } from './types/index';

import { defineComponent, unref, computed, PropType } from 'vue';
import { Form, Col } from 'ant-design-vue';
import Button from '/@/components/Button/index.vue';
import { BasicArrow } from '/@/components/Basic/index';

import { getSlot } from '/@/utils/helper/tsxHelper';
import { useI18n } from '/@/hooks/web/useI18n';
import { appStore } from '/@/store/modules/app';

export default defineComponent({
  name: 'BasicFormAction',
  emits: ['toggle-advanced'],
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    showResetButton: {
      type: Boolean,
      default: true,
    },
    showSubmitButton: {
      type: Boolean,
      default: true,
    },
    showAdvancedButton: {
      type: Boolean,
      default: true,
    },
    resetButtonOptions: {
      type: Object as PropType<any>,
      default: {},
    },
    submitButtonOptions: {
      type: Object as PropType<any>,
      default: {},
    },
    actionColOptions: {
      type: Object as PropType<any>,
      default: {},
    },
    actionSpan: {
      type: Number,
      default: 6,
    },
    isAdvanced: {
      type: Boolean,
      default: false,
    },
    hideAdvanceBtn: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots, emit }) {
    let { t } = useI18n({
      locale: appStore.getLockLanguage,
      messages: {
        en: {
          reset: 'reset',
          search: 'search',
          open: 'open',
          close: 'close'
        },
        zh: {
          reset: '重置',
          search: '查询',
          open: '展开',
          close: '收起'
        },
      }
    });
    const getResetBtnOptionsRef = computed(() => {
      return {
        text: '重置',
        ...props.resetButtonOptions,
      };
    });

    const getSubmitBtnOptionsRef = computed(() => {
      return {
        text: '查询',
        // htmlType: 'submit',
        ...props.submitButtonOptions,
      };
    });

    const actionColOpt = computed(() => {
      const { showAdvancedButton, actionSpan: span, actionColOptions } = props;
      const actionSpan = 24 - span;
      const advancedSpanObj = showAdvancedButton ? { span: actionSpan < 6 ? 24 : actionSpan } : {};
      const actionColOpt: Partial<ColEx> = {
        span: showAdvancedButton ? 6 : 4,
        ...advancedSpanObj,
        ...actionColOptions,
      };
      return actionColOpt;
    });

    function toggleAdvanced() {
      emit('toggle-advanced');
    }

    return () => {
      if (!props.show) {
        return;
      }

      const {
        showAdvancedButton,
        hideAdvanceBtn,
        isAdvanced,
        showResetButton,
        showSubmitButton,
      } = props;

      return (
        <Col {...unref(actionColOpt)} style={{ textAlign: 'right' }}>
          {() => (
            <Form.Item>
              {() => (
                <>
                  {getSlot(slots, 'advanceBefore')}
                  {showAdvancedButton && !hideAdvanceBtn && (
                    <Button type="default" class="mr-2" onClick={toggleAdvanced}>
                      {() => (
                        <>
                          {/* {isAdvanced ? '收起' : '展开'} */}
                          { isAdvanced ? t('close') : t('open') }
                          <BasicArrow expand={!isAdvanced} />
                        </>
                      )}
                    </Button>
                  )}

                  {getSlot(slots, 'resetBefore')}
                  {showResetButton && (
                    <Button type="default" class="mr-2" {...unref(getResetBtnOptionsRef)}>
                      {/* {() => unref(getResetBtnOptionsRef).text} */}
                      {t('reset')}
                    </Button>
                  )}

                  {getSlot(slots, 'submitBefore')}
                  {showSubmitButton && (
                    <Button type="primary" {...unref(getSubmitBtnOptionsRef)}>
                      {/* {() => unref(getSubmitBtnOptionsRef).text} */}
                      {t('search')}
                    </Button>
                  )}

                  {getSlot(slots, 'submitAfter')}
                </>
              )}
            </Form.Item>
          )}
        </Col>
      );
    };
  },
});
