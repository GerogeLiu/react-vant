# Tag 标签

### 引入

```js
import { Tag } from 'react-vant';
```

## 代码演示

### 基础用法

通过 `type` 属性控制标签颜色。

```jsx
<Tag type="primary">标签</Tag>
<Tag type="success">标签</Tag>
<Tag type="danger">标签</Tag>
<Tag type="warning">标签</Tag>
```

### 空心样式

设置 `plain` 属性设置为空心样式。

```jsx
<Tag plain type="primary">标签</Tag>
```

### 圆角样式

通过 `round` 设置为圆角样式。

```jsx
<Tag round type="primary">标签</Tag>
```

### 标记样式

通过 `mark` 设置为标记样式(半圆角)。

```jsx
<Tag mark type="primary">标签</Tag>
```

### 可关闭标签

添加 `closeable` 属性表示标签是可关闭的，关闭标签时会触发 `close` 事件，在 `close` 事件中可以执行隐藏标签的逻辑。

```jsx
<Tag show={show} closeable size="medium" type="primary" onClose={() => setShow(false)}>
  标签
</Tag>
```

### 细边框

添加 `hairline` 属性设置 `plain` 状态下的边框为细边框

```jsx
<Tag hairline plain type="primary">标签</Tag>
```

### 标签大小

通过 `size` 属性调整标签大小。

```jsx
<Tag type="primary" size="mini">标签</Tag>
<Tag type="primary">标签</Tag>
<Tag type="primary" size="medium">标签</Tag>
<Tag type="primary" size="large">标签</Tag>
```

### 自定义颜色

通过 `color` 和 `text-color` 属性设置标签颜色。

```jsx
<Tag color="#7232dd">标签</Tag>
<Tag color="#ffe1e1" text-color="#ad0000">标签</Tag>
<Tag color="#7232dd" plain>标签</Tag>
```

### 可选中标签

通过 `selected` 属性设置标签的选中状态。

```jsx
<Tag
  size="medium"
  color="#f5f5f9"
  textColor="#888"
  selected
  onChange={(selected) => {
    console.log(`tag selected: ${selected}`);
  }}
>
  标签
</Tag>
```

## API

### Props

| 参数      | 说明                                                  | 类型      | 默认值    |
| --------- | ----------------------------------------------------- | --------- | --------- |
| type      | 类型，可选值为 `primary` `success` `danger` `warning` | _string_  | `default` |
| size      | 大小, 可选值为 `large` `medium`                       | _string_  | -         |
| color     | 标签颜色                                              | _string_  | -         |
| show      | 是否展示标签                                          | _boolean_ | `true`    |
| plain     | 是否为空心样式                                        | _boolean_ | `false`   |
| round     | 是否为圆角样式                                        | _boolean_ | `false`   |
| mark      | 是否为标记样式                                        | _boolean_ | `false`   |
| hairline  | 是否为细边框                                          | _boolean_ | `false`   |
| selected  | 是否为可选中模式                                      | _boolean_ | `false`   |
| textColor | 文本颜色，优先级高于 `color` 属性                     | _string_  | `white`   |
| closeable | 是否为可关闭标签                                      | _boolean_ | `false`   |

### Events

| 事件名 | 说明           | 回调参数       |
| ------ | -------------- | -------------- |
| click  | 点击时触发     | _event: Event_ |
| close  | 关闭标签时触发 | -              |
| change | 选中模式下出发 | _selected: boolean_  |
### 样式变量

组件提供了下列 Less 变量，可用于自定义样式，使用方法请参考[主题定制](#/zh-CN/theme)。

| 名称                        | 默认值                      | 描述 |
| --------------------------- | --------------------------- | ---- |
| @tag-padding                | `0 @padding-base`           | -    |
| @tag-text-color             | `@white`                    | -    |
| @tag-font-size              | `@font-size-sm`             | -    |
| @tag-border-radius          | `2px`                       | -    |
| @tag-line-height            | `16px`                      | -    |
| @tag-medium-padding         | `2px 6px`                   | -    |
| @tag-mini-font-size         | `@font-size-xs`             | -    |
| @tag-large-padding          | `@padding-base @padding-xs` | -    |
| @tag-large-border-radius    | `@border-radius-md`         | -    |
| @tag-large-font-size        | `@font-size-md`             | -    |
| @tag-round-border-radius    | `@border-radius-max`        | -    |
| @tag-danger-color           | `@red`                      | -    |
| @tag-primary-color          | `@blue`                     | -    |
| @tag-success-color          | `@green`                    | -    |
| @tag-warning-color          | `@orange`                   | -    |
| @tag-default-color          | `@gray-6`                   | -    |
| @tag-plain-background-color | `@white`                    | -    |
