# PasswordInput 密码输入框

### 介绍

密码输入框

### 引入

```js
import { PasswordInput } from 'react-vant';
```

## 代码演示

### 基础用法

```jsx
const onSubmit = (val: string) => {
  Dialog.alert({
    message: val
  })
};
<PasswordInput value="12a" length={4} type="text" onSubmit={onSubmit} />
```

### 限制长度

```jsx
const onSubmit = (val: string) => {
  Dialog.alert({
    message: val
  })
};
<PasswordInput type="text" length={6} onSubmit={onSubmit} />
```

### 只允许数字

```jsx
const onSubmit = (val: string) => {
  Dialog.alert({
    message: val
  })
};
<PasswordInput
  type="number"
  value=""
  mask={false}
  length={4}
  onSubmit={onSubmit}
/>
```

### 自定义规则

> 如果设置的初始值不符合规则, 将不会展示

```jsx
const onSubmit = (val: string) => {
  Dialog.alert({
    message: val
  })
};
<PasswordInput
  value="124"
  mask={false}
  length={4}
  validator={(val: string) => {
    return /^[0-3]{0,4}$/.test(val);
  }}
  onSubmit={onSubmit}
/>
```

### 自动聚焦

```jsx
const onSubmit = (val: string) => {
  Dialog.alert({
    message: val
  })
};
<PasswordInput
  length={4}
  autoFocus
  onSubmit={onSubmit}
/>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 值  | _string_ | - |
| type  | 类型 默认为text | _string_ | `number` `text` |
| length | 长度 | _number_ | 6 |
| autoFocus | 自动聚焦 | _boolean_ | false |
| mask | 是否隐藏密码 | _boolean_ | true |
| validator | 自定义规则, 这个规则并非单个输入框的 | _function_ | - |
| highlightClass | 高亮样式(mask=true时不生效) | _string_ | - |

### Events

| 事件名 | 说明       | 回调参数       |
| ------ | ---------- | -------------- |
| onChange  | 数据改变时触发 | val: _string_ |
| onSubmit  | 数据输满时触发 | val: _string_ |


### 样式变量

组件提供了下列 Less 变量，可用于自定义样式，使用方法请参考[主题定制](#/zh-CN/theme)。

| 名称                      | 默认值               | 描述 |
| ------------------------- | -------------------- | ---- |
| @password-input-color     | `#2879ff`            | -    |
| @password-border-color    | `#dee4e7`            | -    |
