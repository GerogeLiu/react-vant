/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { Cell, Toast } from 'react-vant';
import { components } from 'site-mobile-demo';

export default (): React.ReactNode => {
  const { DemoBlock, DemoSection } = components;

  return (
    <DemoSection>
      <DemoBlock card title="基础用法">
        <Cell title="文字提示" isLink onClick={() => Toast.info('提示内容')} />
        <Cell
          title="加载提示"
          isLink
          onClick={() =>
            Toast.loading({
              message: '加载中...',
              forbidClick: true,
            })
          }
        />
        <Cell title="成功提示" isLink onClick={() => Toast.success('成功文案')} />
        <Cell title="失败提示" isLink onClick={() => Toast.fail('失败文案')} />
      </DemoBlock>
      <DemoBlock card title="动态更新提示">
        <Cell
          title="动态更新提示"
          isLink
          onClick={() => {
            let remain = 4;
            const updateConfig = Toast.info({
              message: `还剩 ${remain + 1} 秒`,
              duration: 5000,
              onClose: () => clearInterval(timer),
            });
            const timer = setInterval(() => {
              updateConfig({ message: `还剩 ${remain--} 秒` });
            }, 1000);
          }}
        />
      </DemoBlock>
      <DemoBlock card title="自定义图标">
        <Cell
          title="自定义图标"
          isLink
          onClick={() =>
            Toast({
              message: '自定义图标',
              icon: 'fire-o',
            })
          }
        />
        <Cell
          title="自定义图片"
          isLink
          onClick={() =>
            Toast({
              message: '自定义图片',
              icon: 'https://img01.yzcdn.cn/vant/logo.png',
              iconSize: 100,
            })
          }
        />
        <Cell
          title="自定义加载图标"
          isLink
          onClick={() =>
            Toast.loading({
              message: '加载中...',
              forbidClick: true,
              loadingType: 'spinner',
            })
          }
        />
      </DemoBlock>
      <DemoBlock card title="自定义位置">
        <Cell
          title="顶部展示"
          isLink
          onClick={() =>
            Toast({
              message: '顶部展示',
              position: 'top',
            })
          }
        />
        <Cell
          title="底部展示"
          isLink
          onClick={() =>
            Toast({
              message: '底部展示',
              position: 'bottom',
            })
          }
        />
      </DemoBlock>
    </DemoSection>
  );
};
