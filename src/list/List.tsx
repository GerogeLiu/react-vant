import React, { useRef, forwardRef, useImperativeHandle, isValidElement } from 'react';
import classnames from 'classnames';

import Loading from '../loading';
import { getRect } from '../hooks/use-rect';
import useScrollParent from '../hooks/use-scroll-parent';
import useEventListener from '../hooks/use-event-listener';

import { createNamespace, isHidden } from '../utils';
import { ListInstance, ListProps } from './PropsType';
import { useSetState, useUpdateEffect } from '../hooks';

const [bem] = createNamespace('list');

const List = forwardRef<ListInstance, ListProps>((props, ref) => {
  const [state, updateState] = useSetState({
    loading: props.loading,
    error: props.error,
  });

  const root = useRef<HTMLDivElement>();
  const scrollParent = useRef(null);
  const placeholder = useRef<HTMLDivElement>();

  scrollParent.current = useScrollParent(root);

  // 判断是否需要加载
  const check = async () => {
    if (state.loading || props.finished || state.error) {
      return;
    }
    const { offset, direction } = props;
    const scrollParentRect = getRect(scrollParent.current);
    if (!scrollParentRect.height || isHidden(root.current)) {
      return;
    }
    let isReachEdge = false;
    const placeholderRect = getRect(placeholder.current);

    if (direction === 'up') {
      isReachEdge = scrollParentRect.top - placeholderRect.top <= offset;
    } else {
      isReachEdge = placeholderRect.bottom - scrollParentRect.bottom <= offset;
    }

    if (isReachEdge) {
      try {
        updateState({ loading: true });
        await props.onLoad();
        updateState({ loading: false });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('onLoad error:', error);
        updateState({ loading: false, error: true });
      }
    }
  };

  const renderFinishedText = () => {
    if (props.finished && props.finishedText) {
      return <div className={classnames(bem('finished-text'))}>{props.finishedText}</div>;
    }
    return null;
  };

  const clickErrorText = () => {
    updateState({ error: false });
    check();
  };

  const renderErrorText = () => {
    if (state.error && props.errorText) {
      return (
        <div className={classnames(bem('error-text'))} onClick={clickErrorText}>
          {props.errorText}
        </div>
      );
    }
    return null;
  };

  const renderLoading = () => {
    if (state.loading && !props.finished) {
      return (
        <div className={classnames(bem('loading'))}>
          {isValidElement(props.loadingText) ? (
            props.loadingText
          ) : (
            <Loading className={classnames(bem('loading-icon'))} size={16}>
              {props.loadingText}
            </Loading>
          )}
        </div>
      );
    }
    return null;
  };

  useUpdateEffect(() => {
    check();
  }, [state.loading, props.finished, state.error]);

  useUpdateEffect(() => {
    updateState({ loading: props.loading, error: props.error });
  }, [props.loading, props.error]);

  useUpdateEffect(() => {
    if (scrollParent.current && props.immediateCheck) {
      check();
    }
  }, [scrollParent.current]);

  useEventListener('scroll', check, {
    target: scrollParent.current,
    depends: [state.loading, props.finished, state.error],
  });

  useImperativeHandle(ref, () => ({
    check,
    state,
  }));

  const Placeholder = <div ref={placeholder} className={classnames(bem('placeholder'))} />;

  return (
    <div ref={root} role="feed" className={classnames(bem())} aria-busy={state.loading}>
      {props.direction === 'down' ? props.children : Placeholder}
      {renderLoading()}
      {renderFinishedText()}
      {renderErrorText()}
      {props.direction === 'up' ? props.children : Placeholder}
    </div>
  );
});

List.defaultProps = {
  offset: 300,
  direction: 'down',
  immediateCheck: true,
  loadingText: '加载中...',
  finishedText: '没有更多了',
};

export default List;
