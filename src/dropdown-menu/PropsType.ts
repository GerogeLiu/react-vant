import React from 'react';
import { BaseTypeProps, TeleportType } from '../utils';

type DropdownMenuDirection = 'up' | 'down';

export type DropdownMenuItemOption = {
  /** 文本 */
  text: React.ReactNode;
  /** icon */
  icon?: React.ReactNode;
  /** 选项值 */
  value: number | string;
};

interface DropdownMenuCommonProps extends BaseTypeProps {
  /** 是否显示遮罩层	 */
  overlay?: boolean;
  overlayClass?: string;
  overlayStyle?: React.CSSProperties;
  /** 是否禁用 */
  disabled?: boolean;
  /** 动画时长，单位毫秒，设置为 0 可以禁用动画	 */
  duration?: number | string;
  /** 未选中时展示的文本 */
  placeholder?: string;
  /** 关闭菜单栏时触发	 */
  onClose?: () => void;
  /** 打开菜单栏时触发	 */
  onOpen?: () => void;
  /** 打开菜单栏且动画结束后触发	 */
  onOpened?: () => void;
  /** 关闭菜单栏且动画结束后触发	 */
  onClosed?: () => void;
  /** 指定挂载的节点 */
  teleport?: TeleportType;
}

export interface DropdownMenuProps extends DropdownMenuCommonProps {
  /** 当前选中项对应的 value	 */
  value?: Record<string, string | number>;
  /** 点击选项导致 value 变化时触发		 */
  onChange?: (v: Record<string, string | number>) => void;
  /** 是否在点击外部元素后关闭菜单	 */
  closeOnClickOutside?: boolean;
  /** 是否在点击遮罩层后关闭菜单	 */
  closeOnClickOverlay?: boolean;
  /** 菜单标题和选项的选中态颜色	 */
  activeColor?: string;
  /** 菜单栏 z-index 层级	 */
  zIndex?: number | string;
  /** 菜单展开方向 */
  direction?: DropdownMenuDirection;
}

export interface DropdownMenuItemProps extends DropdownMenuCommonProps, ItemPrivateProps {
  /** 菜单项标题	 */
  title?: React.ReactNode;
  /** 标题额外类名	 */
  titleClass?: string;
  /** 选项数组	 */
  options?: DropdownMenuItemOption[];
  /** 菜单标识符 */
  name: string;
  children?: React.ReactNode;
}

export type DropdownMenuItemInstance = {
  toggle: (show: boolean, options?: { immediate?: boolean }) => void;
  renderTitle?: (itemValue: string | number) => void;
  state: {
    transition: boolean;
    showWrapper: boolean;
  };
};

interface ItemPrivateProps {
  /** @private */
  value?: string | number;
  /** @private */
  showPopup?: boolean;
  offset: number;
}
