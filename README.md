<!--
 * @Author: jiangheng jh@pzds.com
 * @Date: 2025-01-22 16:07:49
 * @LastEditors: jiangheng jh@pzds.com
 * @LastEditTime: 2025-01-22 16:12:02
 * @FilePath: \cli\README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

# JH-CLI

一个用于快速创建基于 jh-vue 模板的项目脚手架。

## 安装

```bash
# 全局安装
npm install -g jh-cli

# 或者使用yarn
yarn global add jh-cli
```

## 使用方法

创建新项目：

```bash
jh create my-project
```

然后按照提示选择模板即可。

## 可用命令

- `jh create <project-name>`: 创建一个新的项目
- `jh -V`: 查看版本号
- `jh -h`: 查看帮助信息

## 模板列表

目前支持的模板：

- jh-vue: Vue.js 项目模板

## 开发说明

1. 克隆项目

```bash
git clone [项目地址]
```

2. 安装依赖

```bash
npm install
```

3. 本地测试

```bash
npm link
```

## 注意事项

- 确保有足够的权限创建项目目录
- 确保网络连接正常，以便下载模板
- 建议使用 Node.js 14.0.0 或更高版本
