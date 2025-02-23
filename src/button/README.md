# Button 按钮

### 介绍

按钮用于触发一个操作，如提交表单。

### 引入

```js
import { Button } from 'react-vant';
```

## 代码演示

### 按钮类型

按钮支持 `default`、`primary`、`info`、`warning`、`danger` 五种类型，默认为 `default`。

```jsx
<Button type="primary">主要按钮</Button>
<Button type="info">信息按钮</Button>
<Button type="default">默认按钮</Button>
<Button type="warning">警告按钮</Button>
<Button type="danger">危险按钮</Button>
```

### 朴素按钮

通过 `plain` 属性将按钮设置为朴素按钮，朴素按钮的文字为按钮颜色，背景为白色。

```jsx
<Button plain type="primary">朴素按钮</Button>
<Button plain type="primary">朴素按钮</Button>
```

### 细边框

设置 `hairline` 属性可以展示 0.5px 的细边框。

```jsx
<Button plain hairline type="primary">细边框按钮</Button>
<Button plain hairline type="primary">细边框按钮</Button>
```

### 禁用状态

通过 `disabled` 属性来禁用按钮，禁用状态下按钮不可点击。

```jsx
<Button disabled type="primary">禁用状态</Button>
<Button disabled type="primary">禁用状态</Button>
```

### 加载状态

通过 `loading` 属性设置按钮为加载状态，加载状态下默认会隐藏按钮文字，可以通过 `loadingText` 设置加载状态下的文字。

```jsx
<Button loading type="primary" />
<Button loading type="primary" loadingType="spinner" />
<Button loading type="primary" loadingText="加载中..." />
```

### 按钮形状

通过 `square` 设置方形按钮，通过 `round` 设置圆形按钮。

```jsx
<Button type="primary" square>方形按钮</Button>
<Button type="primary" round>圆形按钮</Button>
```

### 图标按钮

通过 `icon` 属性设置按钮图标，支持 Icon 组件里的所有图标，也可以传入图标 URL。

```jsx
<Button icon="plus" type="primary" />
<Button icon="plus" type="primary">按钮</Button>
<Button icon="https://img.yzcdn.cn/vant/user-active.png" plain type="primary">按钮</Button>
```

### 按钮尺寸

支持 `large`、`normal`、`small`、`mini` 四种尺寸，默认为 `normal`。

```jsx
<Button type="primary" size="large">大号按钮</Button>
<Button type="primary" size="normal">普通按钮</Button>
<Button type="primary" size="small">小型按钮</Button>
<Button type="primary" size="mini">迷你按钮</Button>
```

### 块级元素

按钮在默认情况下为行内块级元素，通过 `block` 属性可以将按钮的元素类型设置为块级元素。

```jsx
<Button type="primary" block>
  块级元素
</Button>
```

### 自定义颜色

通过 `color` 属性可以自定义按钮的颜色。

```jsx
<Button color="#7232dd">单色按钮</Button>
<Button color="#7232dd" plain>单色按钮</Button>
<Button color="linear-gradient(to right, #ff6034, #ee0a24)">渐变色按钮</Button>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 类型，可选值为 `primary` `info` `warning` `danger` | _string_ | `default` |
| size | 尺寸，可选值为 `large` `small` `mini` | _string_ | `normal` |
| text | 按钮文字 | _string_ | - |
| color | 按钮颜色，支持传入 `linear-gradient` 渐变色 | _string_ | - |
| icon | 左侧[图标名称](#/zh-CN/icon)或图片链接 | _string_ | - |
| iconPrefix | 图标类名前缀，同 Icon 组件的 [class-prefix 属性](#/zh-CN/icon#props) | _string_ | `van-icon` |
| iconPosition | 图标展示位置，可选值为 `right` | _string_ | `left` |
| tag | 按钮根节点的 HTML 标签 | _string_ | `Button` |
| nativeType | 原生 Button 标签的 type 属性 | _string_ | `Button` |
| block | 是否为块级元素 | _boolean_ | `false` |
| plain | 是否为朴素按钮 | _boolean_ | `false` |
| square | 是否为方形按钮 | _boolean_ | `false` |
| round | 是否为圆形按钮 | _boolean_ | `false` |
| shadow | 显示阴影，可选值为 `1` `2` `3` | _boolean_ _number_ | `false` |
| disabled | 是否禁用按钮 | _boolean_ | `false` |
| hairline | 是否使用 0.5px 边框 | _boolean_ | `false` |
| loading | 是否显示为加载状态 | _boolean_ | `false` |
| loadingText | 加载状态提示文字 | _string_ | - |
| loadingType | [加载图标类型](#/zh-CN/loading)，可选值为 `spinner` | _string_ | `circular` |
| loadingSize | 加载图标大小 | _string_ | `20px` |

### Events

| 事件名  | 说明                                     | 回调参数       |
| ------- | ---------------------------------------- | -------------- |
| onClick | 点击按钮，且按钮状态不为加载或禁用时触发 | _event: Event_ |
