import React, {
  useRef,
  useState,
  useEffect,
  CSSProperties,
  forwardRef,
  useImperativeHandle,
} from 'react';
import classnames from 'classnames';
import Icon from '../icon';
import Cell from '../cell';
import { FieldInstance, FieldProps } from './PropsType';
import { createNamespace, isDef, addUnit, formatNumber, isObject, preventDefault } from '../utils';

const [bem] = createNamespace('field');
const ICON_SIZE = '16px';

const Field = forwardRef<FieldInstance, FieldProps>((props, ref) => {
  const [inputFocus, setInputFocus] = useState(false);
  const fieldRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (props.getFieldRef) props.getFieldRef(fieldRef);
    if (props.getInputRef) props.getInputRef(inputRef);
  }, [props.getFieldRef, props.getInputRef]);

  const focus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const blur = () => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  useImperativeHandle(ref, () => ({
    focus,
    blur,
  }));

  const getProp = (key) => {
    if (isDef(props[key])) {
      return props[key];
    }
    return null;
  };
  const getModelValue = () => String(props.value ?? '');
  const showClear = () => {
    const readonly = getProp('readonly');

    if (props.clearable && !readonly) {
      const hasValue = getModelValue() !== '';
      const trigger =
        props.clearTrigger === 'always' || (props.clearTrigger === 'focus' && inputFocus);

      return hasValue && trigger;
    }
    return false;
  };

  const labelStyle = (): CSSProperties => {
    const labelW = getProp('labelWidth');
    if (labelW) {
      return { width: addUnit(labelW) };
    }

    return {};
  };

  const adjustSize = () => {
    const input = inputRef.current;

    if (!(props.type === 'textarea' && props.autosize) || !input) {
      return;
    }

    input.style.height = 'auto';

    let height = input.scrollHeight;
    if (isObject(props.autosize)) {
      const { maxHeight, minHeight } = props.autosize;
      if (maxHeight) {
        height = Math.min(height, maxHeight);
      }
      if (minHeight) {
        height = Math.max(height, minHeight);
      }
    }

    if (height) {
      input.style.height = `${height}px`;
    }
  };

  useEffect(() => {
    adjustSize();
  }, [props.value]);

  const formatValue = (inputValue, trigger = 'onChange') => {
    const { formatTrigger, formatter } = props;
    if (formatter && trigger === formatTrigger) {
      return formatter(inputValue);
    }

    return inputValue;
  };

  const renderInput = () => {
    const { type, name, rows, value, placeholder, disabled, readonly, onClickInput } = props;
    const inputAlign = getProp('inputAlign');

    const handleChange = (e) => {
      const { maxlength, onChange } = props;
      const inputValue = e?.currentTarget?.value;
      let finalValue = inputValue;

      if (isDef(maxlength) && finalValue.length > +maxlength) {
        finalValue = finalValue.slice(0, maxlength);
      }

      if (type === 'number' || type === 'digit') {
        const isNumber = type === 'number';
        finalValue = formatNumber(finalValue, isNumber, isNumber);
      }

      finalValue = formatValue(finalValue, 'onChange');

      // if (inputRef.value && inputValue !== inputRef.value.value) {
      //   inputRef.value.value = inputValue;
      // }

      if (onChange && typeof onChange === 'function') {
        onChange(finalValue);
      }
    };

    const handleFocus = (e) => {
      const { onFocus } = props;
      const inputValue = e?.currentTarget?.value;
      setInputFocus(true);
      if (onFocus && typeof onFocus === 'function') {
        onFocus(inputValue);
      }
    };

    const handleBulr = (e) => {
      const { onBlur, onChange } = props;
      const inputValue = e?.currentTarget?.value;
      setInputFocus(false);
      if (onChange && typeof onChange === 'function') {
        onChange(formatValue(inputValue, 'onBlur'));
      }
      if (onBlur && typeof onBlur === 'function') {
        onBlur(inputValue);
      }
    };

    const handleKeypress = (e) => {
      const { onKeypress } = props;

      if (e.key === 'Enter' || +e.charCode === 13) {
        if (props.type !== 'textarea') {
          preventDefault(e);
        }
        // trigger blur after click keyboard search button
        if (props.type === 'search') {
          blur();
        }
      }

      if (onKeypress && typeof onKeypress === 'function') {
        onKeypress(e);
      }
    };

    if (type === 'textarea') {
      return (
        <textarea
          ref={inputRef}
          name={name}
          rows={rows}
          className={classnames(bem('control', inputAlign))}
          value={value}
          disabled={disabled}
          readOnly={readonly}
          placeholder={placeholder || ''}
          onBlur={handleBulr}
          onFocus={handleFocus}
          onClick={onClickInput}
          onChange={handleChange}
          onKeyPress={handleKeypress}
        />
      );
    }

    let inputType = type;
    let inputMode;

    // type="number" is weired in iOS, and can't prevent dot in Android
    // so use inputmode to set keyboard in mordern browers
    if (type === 'number') {
      inputType = 'text';
      inputMode = 'decimal';
    }

    if (type === 'digit') {
      inputType = 'tel';
      inputMode = 'numeric';
    }

    return (
      <input
        value={value}
        type={inputType}
        inputMode={inputMode}
        ref={inputRef}
        name={name}
        className={classnames(bem('control', inputAlign))}
        disabled={disabled}
        readOnly={readonly}
        placeholder={placeholder || ''}
        onBlur={handleBulr}
        onFocus={handleFocus}
        onClick={onClickInput}
        onChange={handleChange}
        onKeyPress={handleKeypress}
      />
    );
  };

  const renderLeftIcon = () => {
    const { leftIcon, onClickLeftIcon } = props;
    if (!leftIcon) return null;
    return (
      <div className={classnames(bem('left-icon'))} onClick={onClickLeftIcon}>
        {typeof leftIcon !== 'string' ? (
          leftIcon
        ) : (
          <Icon name={leftIcon} classPrefix={props.iconPrefix} />
        )}
      </div>
    );
  };

  const renderRightIcon = () => {
    const { rightIcon, iconPrefix, onClickRightIcon } = props;
    if (!rightIcon) return null;
    return (
      <div className={classnames(bem('right-icon'))} onClick={onClickRightIcon}>
        {typeof rightIcon === 'string' ? (
          <Icon name={rightIcon} classPrefix={iconPrefix} />
        ) : (
          rightIcon
        )}
      </div>
    );
  };

  const renderWordLimit = () => {
    const { value, showWordLimit, maxlength } = props;
    if (showWordLimit && maxlength) {
      const count = (value ? `${value}` : '').length;
      return (
        <div className={classnames(bem('word-limit'))}>
          <span className={classnames(bem('word-num'))}>{count}</span>/{maxlength}
        </div>
      );
    }

    return null;
  };

  const renderMessage = () => {
    // if (form && form.props.showErrorMessage === false) {
    //   return null;
    // }

    const message = props.errorMessage;

    if (message) {
      const errorMessageAlign = getProp('errorMessageAlign');
      return <div className={classnames(bem('error-message', errorMessageAlign))}>{message}</div>;
    }

    return null;
  };

  const handleClear = (e) => {
    const { onClear, onChange } = props;
    inputRef.current.value = '';
    onChange('');
    if (onClear && typeof onClear === 'function') {
      onClear(e);
    }
  };

  const {
    type,
    label,
    size,
    center,
    border,
    isLink,
    required,
    clickable,
    labelAlign,
    className,
    labelClass,
    arrowDirection,
    autosize,
    disabled,
    button,
    error,
  } = props;

  return (
    <Cell
      title={label || null}
      size={size}
      icon={renderLeftIcon()}
      center={center}
      border={border}
      isLink={isLink}
      required={required}
      clickable={clickable}
      extra={props.extra}
      titleStyle={labelStyle()}
      valueClass={classnames(bem('value'))}
      titleClass={classnames(bem('label', labelAlign), labelClass)}
      arrowDirection={arrowDirection}
      onClick={props?.onClick}
      className={classnames(
        bem({
          error,
          disabled,
          [`label-${labelAlign}`]: labelAlign,
          'min-height': type === 'textarea' && !autosize,
        }),
        className,
      )}
    >
      <div className={classnames(bem('body'))}>
        {renderInput()}
        {showClear() && (
          <Icon
            className={classnames(bem('clear'))}
            onTouchStart={handleClear}
            name={props.clearIcon}
            size={ICON_SIZE}
          />
        )}
        {renderRightIcon()}
        {button && button}
      </div>
      {renderWordLimit()}
      {renderMessage()}
    </Cell>
  );
});

Field.defaultProps = {
  clearIcon: 'clear',
};

export default Field;
