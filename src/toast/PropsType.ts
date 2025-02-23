import { LoadingType } from '../loading/PropsType';
import { BaseTypeProps } from '../utils';

export type ToastType = 'loading' | 'success' | 'fail' | 'info';

export type ToastPosition = 'top' | 'middle' | 'bottom';
export interface ToastProps extends BaseTypeProps {
  /** 提示类型 */
  type?: ToastType;
  /** 文本内容，支持通过\n换行 */
  message?: number | string;
  /** 展示时长(ms)，值为 0 时，toast 不会消失	 */
  duration?: number;
  /** 自定义图标，支持传入图标名称或图片链接	 */
  icon?: string;
  /** 图标大小，如 20px 2em，默认单位为 px	 */
  iconSize?: number | string;
  /** 图标类名前缀，等同于 Icon 组件的 classPrefix 属性	 */
  iconPrefix?: string;
  /** 加载图标类型, 可选值为 spinner */
  loadingType?: LoadingType;
  /** 是否显示背景遮罩层	 */
  overlay?: boolean;
  overlayClass?: string;
  overlayStyle?: React.CSSProperties;
  /** 是否禁止背景点击	 */
  forbidClick?: boolean;
  /** 是否在点击遮罩层后关闭	 */
  closeOnClickOverlay?: boolean;
  /** 是否在点击后关闭	 */
  closeOnClick?: boolean;
  /** 位置，可选值为 top bottom	 */
  position?: ToastPosition;
  /** 动画类名 */
  transition?: string;
  /** 轻提示弹出时的的父容器 */
  teleport?: HTMLElement | (() => HTMLElement);
  /** 关闭时的回调函数 */
  onClose?: () => void;
  /** 完全展示后的回调函数	 */
  onOpened?: () => void;
}

export type ToastPrivateProps = {
  onClosed?: () => void;
};

type ToastInstanceOpts = Omit<ToastProps, 'type'> | string;
export interface ToastInstance {
  (opts: ToastProps | string): React.Dispatch<React.SetStateAction<ToastProps>>;
  info(opts: ToastInstanceOpts | string): React.Dispatch<React.SetStateAction<ToastProps>>;
  loading(opts: ToastInstanceOpts | string): React.Dispatch<React.SetStateAction<ToastProps>>;
  success(opts: ToastInstanceOpts | string): React.Dispatch<React.SetStateAction<ToastProps>>;
  fail(opts: ToastInstanceOpts | string): React.Dispatch<React.SetStateAction<ToastProps>>;
  clear(): void;
}
