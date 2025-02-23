/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import cls from 'classnames';
import { CascaderOption, CascaderProps, CascaderTab } from './PropsType';
import { createNamespace, extend } from '../utils';
import { useSetState, useUpdateEffect } from '../hooks';
import Icon from '../icon';
import Tabs from '../tabs';
import { TabsClickTabEventParams } from '../tabs/PropsType';

const [bem] = createNamespace('cascader');

const Cascader: React.FC<CascaderProps> = (props) => {
  const [internalValue, updateInternalValue] = useState(undefined);
  const [state, updateState] = useSetState<{ tabs: CascaderTab[]; activeTab: number }>({
    tabs: [],
    activeTab: 0,
  });

  const {
    text: textKey,
    value: valueKey,
    children: childrenKey,
  } = extend(
    {
      text: 'text',
      value: 'value',
      children: 'children',
    },
    props.fieldNames,
  );

  const getSelectedOptionsByValue = (
    options: CascaderOption[],
    value: string | number,
  ): CascaderOption[] | undefined => {
    for (let i = 0; i < options.length; i++) {
      const option = options[i];

      if (option[valueKey] === value) {
        return [option];
      }

      if (option[childrenKey]) {
        const selectedOptions = getSelectedOptionsByValue(option[childrenKey], value);
        if (selectedOptions) {
          return [option, ...selectedOptions];
        }
      }
    }
    return undefined;
  };

  const updateTabs = () => {
    if (internalValue || internalValue === 0) {
      const selectedOptions = getSelectedOptionsByValue(props.options, internalValue);

      if (selectedOptions) {
        let optionsCursor = props.options;

        const tabs = selectedOptions.map((option) => {
          const tab = {
            options: optionsCursor,
            selectedOption: option,
          };

          const next = optionsCursor.find((item) => item[valueKey] === option[valueKey]);
          if (next) {
            optionsCursor = next[childrenKey];
          }

          return tab;
        });

        if (optionsCursor) {
          tabs.push({
            options: optionsCursor,
            selectedOption: null,
          });
        }

        updateState({ tabs });
        setTimeout(() => {
          updateState({ activeTab: tabs.length - 1 });
        }, 0);

        return;
      }
    }

    updateState({
      tabs: [
        {
          options: props.options,
          selectedOption: null,
        },
      ],
    });
  };

  const onSelect = (option: CascaderOption, tabIndex: number) => {
    if (option.disabled) {
      return;
    }
    let tabs = JSON.parse(JSON.stringify(state.tabs));
    tabs[tabIndex].selectedOption = option;

    if (tabs.length > tabIndex + 1) {
      tabs = tabs.slice(0, tabIndex + 1);
    }

    if (option[childrenKey]) {
      const nextTab = {
        options: option[childrenKey],
        selectedOption: null,
      };

      if (tabs[tabIndex + 1]) {
        tabs[tabIndex + 1] = nextTab;
      } else {
        tabs.push(nextTab);
      }
      updateState({ tabs, activeTab: state.activeTab + 1 });
    }

    const selectedOptions = tabs.map((tab) => tab.selectedOption).filter(Boolean);

    const eventParams = {
      value: option[valueKey],
      tabIndex,
      selectedOptions,
    };

    updateInternalValue(option[valueKey]);
    props.onChange?.(eventParams);

    if (!option[childrenKey]) {
      props.onFinish?.(eventParams);
    }
  };

  const onClose = () => props.onClose?.();

  const onClickTab = ({ name, title }: TabsClickTabEventParams) => {
    updateState({ activeTab: +name });
    props.onClickTab?.(+name, title);
  };

  const renderHeader = () => (
    <div className={cls(bem('header'))}>
      <h2 className={cls(bem('title'))}>{props.title}</h2>
      {props.closeable ? (
        <Icon name={props.closeIcon} className={cls(bem('close-icon'))} onClick={onClose} />
      ) : null}
    </div>
  );

  const renderOption = (
    option: CascaderOption,
    selectedOption: CascaderOption | null,
    tabIndex: number,
  ) => {
    const selected = selectedOption && option[valueKey] === selectedOption[valueKey];
    const color = option.color || (selected ? props.activeColor : undefined);
    const Text = props.optionRender ? (
      props.optionRender({ option, selected })
    ) : (
      <span>{option[textKey]}</span>
    );
    return (
      <li
        key={option[valueKey]}
        className={cls(
          bem('option', {
            selected,
            disabled: option.disabled,
          }),
          option.className,
        )}
        style={{ color }}
        onClick={() => onSelect(option, tabIndex)}
      >
        {Text}
        {selected ? <Icon name="success" className={cls(bem('selected-icon'))} /> : null}
      </li>
    );
  };

  const renderOptions = (
    options: CascaderOption[],
    selectedOption: CascaderOption | null,
    tabIndex: number,
  ) => (
    <ul key={tabIndex} className={cls(bem('options'))}>
      {options.map((option) => renderOption(option, selectedOption, tabIndex))}
    </ul>
  );

  const renderTab = (tab: CascaderTab, tabIndex: number) => {
    const { options, selectedOption } = tab;
    const title = selectedOption ? selectedOption[textKey] : props.placeholder || '请选择';
    return (
      <Tabs.TabPane
        key={tabIndex}
        title={title}
        titleClass={cls(
          bem('tab', {
            unselected: !selectedOption,
          }),
        )}
      >
        {renderOptions(options, selectedOption, tabIndex)}
      </Tabs.TabPane>
    );
  };

  const renderTabs = () => (
    <Tabs
      animated
      active={state.activeTab}
      className={cls(bem('tabs'))}
      color={props.activeColor}
      swipeThreshold={0}
      swipeable={props.swipeable}
      onClickTab={onClickTab}
    >
      {state.tabs.map(renderTab)}
    </Tabs>
  );

  useEffect(() => {
    updateTabs();
  }, []);

  useUpdateEffect(() => {
    updateTabs();
  }, [JSON.stringify(props.options)]);

  useUpdateEffect(() => {
    if (internalValue || internalValue === 0) {
      const values = state.tabs.map((tab) => tab.selectedOption?.[valueKey]);
      if (values.includes(internalValue)) {
        return;
      }
    }
    updateTabs();
  }, [internalValue]);

  return (
    <div className={cls(bem())}>
      {renderHeader()}
      {state.tabs.length ? renderTabs() : null}
    </div>
  );
};

Cascader.defaultProps = {
  closeable: true,
  swipeable: true,
  options: [],
  closeIcon: 'cross',
};

export default Cascader;
