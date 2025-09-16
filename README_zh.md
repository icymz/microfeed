</br>
</br>
<div align="center">
  <a href="https://www.microfeed.org/" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/1719237/210119945-50e1d444-2d12-43d2-a96d-65bdbccecb70.png">
    <img src="https://user-images.githubusercontent.com/1719237/207514210-99ddbd03-f8f0-410a-96c8-80da1afb804d.png" width="280" alt="Logo"/>
  </picture>
  </a>
</div>

<h1 align="center">microfeed: 一个轻量级的 Cloudflare 自托管 CMS</h1>

<p align="center">
  <a href="https://github.com/microfeed/microfeed/issues/new?assignees=&labels=bug"><b>报告 Bug</b></a>
  ·
  <a href="https://github.com/microfeed/microfeed/discussions/new?category=ideas"><b>功能建议</b></a>
  ·
  <a href="mailto:support@microfeed.org"><b>私信联系我们</b></a>
  ·
  <a href="README.md"><b>English Version</b></a>
</p>

欢迎使用 microfeed，一个轻量级内容管理系统（CMS），可自托管于 Cloudflare。  
你可以轻松发布音频、视频、照片、文档、博客文章和外部链接到你的 feed，并以网页、RSS 和 JSON 形式展示。  
适合技术爱好者，无需自建服务器即可拥有自己的 CMS。

microfeed 由 [Listen Notes](https://www.listennotes.com/) 构建，托管于 Cloudflare 的 [Pages](https://pages.cloudflare.com/)、[R2](https://www.cloudflare.com/products/r2/)、[D1](https://developers.cloudflare.com/d1/) 和 [Zero Trust](https://www.cloudflare.com/products/zero-trust/)。

如有疑问或建议，请通过 support@microfeed.org 联系我们！

## 📚 目录
[![部署到 Cloudflare Pages](https://github.com/microfeed/microfeed/actions/workflows/deploy.yml/badge.svg?event=workflow_dispatch)](https://github.com/microfeed/microfeed/actions/workflows/deploy.yml)
[![CI](https://github.com/microfeed/microfeed/actions/workflows/ci.yml/badge.svg)](https://github.com/microfeed/microfeed/actions/workflows/ci.yml)
[![邮件联系我们](https://img.shields.io/badge/Email-support%40microfeed.org-blue)](mailto:support@microfeed.org)
[![稳定性-alpha](https://img.shields.io/badge/stability-alpha-f4d03f.svg)](https://www.microfeed.org/i/introducing-microfeed-self-hosted-cms-on-cloudflare-opensource-serverless-free-uhbQEmArlC2/)

* [⭐️ 工作原理](#%EF%B8%8F-工作原理)
* [🚀 安装](#-安装)
  * [前置条件](#前置条件)
  * [步骤1. Fork microfeed 仓库到你的 GitHub](#步骤1-fork-microfeed-仓库到你的-github)
  * [步骤2. 在你的 fork 仓库添加 secrets](#步骤2-在你的-fork-仓库添加-secrets)
  * [步骤3. 运行 GitHub Action 部署代码](#步骤3-运行-github-action-部署代码)
  * [步骤4. 在 Cloudflare 控制台点击几下](#步骤4-在-cloudflare-控制台点击几下)
  * [步骤5. 完成，开始发布](#步骤5-完成开始发布)
  * [Bonus. 升级到最新版 microfeed](#bonus-升级到最新版-microfeed)
* [💻 常见问题](#-常见问题)
* [💪 贡献](#-贡献)
  * [本地运行 microfeed](#本地运行-microfeed)
* [🛡️ 许可证](#%EF%B8%8F-许可证)

## ⭐️ 工作原理

自 1990 年代以来，Web 的很大一部分都由 Feed 驱动。  
人们（和机器人）向 Feed 发布内容，其他人可以订阅该 Feed 获取新内容。

microfeed 让个人可以轻松在 Cloudflare 上自托管自己的 Feed，包括但不限于：
* 音频播客 Feed
* 博客文章 Feed
* 类 Instagram 的图片 Feed（如 [llamacorn.listennotes.com](https://llamacorn.listennotes.com/)、[brand-assets.listennotes.com](https://brand-assets.listennotes.com/)）
* 类 YouTube 的视频 Feed
* 带自定义链接的个人网站（如 [wenbin.org](https://www.wenbin.org/)）
* 外部新闻文章链接的内容聚合 Feed
* 营销网站（如 [microfeed.org](https://www.microfeed.org/)）
* 带 GUI 管理后台和公开 JSON Feed 的 Headless CMS（如 [microfeed.org/json](https://www.microfeed.org/json/) 及其 OpenAPI 规范 [YAML](https://www.microfeed.org/json/openapi.yaml) 和 [HTML](https://www.microfeed.org/json/openapi.html)）
* 域名出售列表（如 [ListenHost.com](https://www.listenhost.com/)）
* 整本书的网站（如 [The Art of War](https://the-art-of-war.microfeed.org/)）
* 更新日志网站（如 [changelog.listennotes.com](https://changelog.listennotes.com/)）
* ...

microfeed 使用 Cloudflare [Pages](https://pages.cloudflare.com/) 托管和运行代码，  
[R2](https://www.cloudflare.com/products/r2/) 存储和分发媒体文件，  
[D1](https://developers.cloudflare.com/d1/) 存储元数据，  
[Zero Trust](https://www.cloudflare.com/products/zero-trust/) 提供后台登录保护。  
Cloudflare 提供非常慷慨的免费额度，适合个人或小型企业使用。  
你只需支付域名费用，microfeed 的托管几乎是免费的。

你可以发布音频、视频、照片、文档、博客文章和外部链接到可定制的网站、RSS Feed 和 [JSON Feed](https://www.jsonfeed.org/)。  
示例：
* 网页 Feed: [https://llamacorn.listennotes.com/](https://llamacorn.listennotes.com/)
* RSS Feed: [https://llamacorn.listennotes.com/rss/](https://llamacorn.listennotes.com/rss/)
* JSON Feed: [https://llamacorn.listennotes.com/json/](https://llamacorn.listennotes.com/json/)

microfeed 提供简单强大的管理后台，方便添加内容、上传媒体、定制网页样式。如果你用过 WordPress，会觉得很熟悉。

![image-6d056193c81c0b8f5de0503f5af18116](https://user-images.githubusercontent.com/1719237/209486588-00acefe0-dd51-4bfc-aed7-1f63850aa720.png)

[返回 📚目录](#-目录)

## 🚀 安装

大致流程如下：

1. Fork [microfeed 仓库](https://github.com/microfeed/microfeed) 到你的 GitHub 账号。
2. 获取 Cloudflare API Token，并在你的 fork 仓库添加为 secrets。
3. 使用预设的 GitHub Action，将代码部署到 Cloudflare Pages（用第2步的 secrets）。
4. 在 Cloudflare 控制台设置自定义域名和安全配置。
5. 完成，开始发布！

> 我们理解不是所有人都喜欢看文档，所以尽量让 microfeed 的上手流程简单。  
> 如果 Cloudflare 未来支持“用 Cloudflare 登录”OAuth，将实现一键部署。  
> 目前已尽量让流程适合技术用户。

### 前置条件

* 拥有 Cloudflare 账号。没有的话可[免费注册](https://dash.cloudflare.com/sign-up)。
* 拥有 GitHub 账号。没有的话可[免费注册](https://github.com/signup)。

[返回目录](#-目录)

### 步骤1. Fork microfeed 仓库到你的 GitHub

点击 [https://github.com/microfeed/microfeed/fork](https://github.com/microfeed/microfeed/fork) Fork 仓库。

你可以后续修改代码，但一般无需改动，只需保持同步即可。

[返回 📚目录](#-目录)

### 步骤2. 在你的 fork 仓库添加 secrets

进入 fork 仓库的 [Settings -> Secrets -> Actions](../../settings/secrets/actions)，创建 5 个 secrets（点击可展开详情）。  
有了这些 secrets，就能用 GitHub Actions 部署 microfeed 到 Cloudflare Pages。

<details>
  <summary><b>CLOUDFLARE_ACCOUNT_ID</b></summary>

登录 Cloudflare 后，控制台 URL 如：
```
https://dash.cloudflare.com/[你的-cloudflare-account-id]
```
最后一段就是你的 Cloudflare 账号 ID。

例如：
```
https://dash.cloudflare.com/fff88980eeeeedcc3ffffd4f555f4999
```
则 **CLOUDFLARE_ACCOUNT_ID** 为 **fff88980eeeeedcc3ffffd4f555f4999**。

<img width="846" alt="Screenshot 2022-12-17 at 10 31 10 AM" src="https://user-images.githubusercontent.com/1719237/208216752-56f00f51-29cb-43ea-b720-75244719898d.png">
</details>

<details>
  <summary><b>CLOUDFLARE_API_TOKEN</b></summary>

在 [https://dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens) 创建 API Token。

自定义 Token：

<img width="925" alt="Screenshot 2022-12-04 at 4 30 57 PM" src="https://user-images.githubusercontent.com/1719237/205525627-14da54ae-1733-4db5-b65d-94f5ec48f360.png">

需要 Cloudflare Pages 和 D1 的编辑权限：

<img width="990" alt="Screenshot 2022-12-04 at 4 31 41 PM" src="https://user-images.githubusercontent.com/1719237/205525675-4c8a6bce-21a8-45e3-bf0c-28981f123da3.png">

复制 API Token：

<img width="682" alt="Screenshot 2022-12-04 at 4 34 01 PM" src="https://user-images.githubusercontent.com/1719237/205525785-6fed8e49-7342-4b36-9d07-348e1c28cbcc.png">
</details>

<details>
  <summary><b>R2_ACCESS_KEY_ID</b> 和 <b>R2_SECRET_ACCESS_KEY</b></summary>

进入 [R2 控制台](https://dash.cloudflare.com/sign-up/r2)，如需先绑定信用卡，免费额度很高（10GB 存储 + 1000万次读取/月 + 100万次写入/月）。

创建 R2 API Token：

<img width="1328" alt="Screenshot 2022-12-04 at 4 43 58 PM" src="https://user-images.githubusercontent.com/1719237/205526381-cc11d4fe-b053-49d0-9072-de54db31b3b7.png">

选择“Admin Read & Write”权限：

<img width="858" alt="Screenshot 2023-08-08 at 4 33 55 PM" src="https://github.com/microfeed/microfeed/assets/1719237/1a90df29-5660-49d4-b66a-24873812492d">

复制 Access Key ID 到 R2_ACCESS_KEY_ID，Secret Access Key 到 R2_SECRET_ACCESS_KEY：

<img width="728" alt="Screenshot 2022-12-04 at 4 45 35 PM" src="https://user-images.githubusercontent.com/1719237/205526582-92f440ac-21c4-46d9-a065-cfc1937391c8.png">
</details>

<details>
  <summary><b>CLOUDFLARE_PROJECT_NAME</b></summary>

项目名只能包含 [a-z]、[A-Z]、[0-9] 和 -  
建议用你的自定义域名，把点（.）换成短横线（-）

如 photos.mycustomdomain.com，则项目名为 photos-mycustomdomain-com

注意：不要用下划线、空格或其他特殊字符，否则 Cloudflare Pages 不允许创建项目。
</details>

共需添加 5 个 secrets：

<img width="826" alt="Screenshot 2022-12-04 at 4 10 46 PM" src="https://user-images.githubusercontent.com/1719237/205524410-268abf92-af61-467a-8883-78b8d4de3c56.png">

[返回 📚目录](#-目录)

### 步骤3. 运行 GitHub Action 部署代码

进入 [Actions -> Deploy to Cloudflare Pages](../../actions/workflows/deploy.yml) 并运行 Workflow。

<img width="1606" alt="Screenshot 2022-12-04 at 4 11 19 PM" src="https://user-images.githubusercontent.com/1719237/205526856-05ea0ff4-703a-4d08-bc7f-4ae2dfc07cfe.png">

看到绿色勾即可，Cloudflare 控制台会出现 Pages 项目：

<img width="880" alt="Screenshot 2022-12-04 at 4 55 10 PM" src="https://user-images.githubusercontent.com/1719237/205527141-277620dd-586b-42dd-be97-edb7875d0705.png">

可通过 ${CLOUDFLARE_PROJECT_NAME}.pages.dev 访问，如 [https://microfeed-org.pages.dev/](https://microfeed-org.pages.dev/)

[返回 📚目录](#-目录)

### 步骤4. 在 Cloudflare 控制台点击几下

管理 microfeed 实例时，使用后台地址 ${CLOUDFLARE_PROJECT_NAME}.pages.dev/admin，如 [https://microfeed-org.pages.dev/admin/](https://microfeed-org.pages.dev/admin/)（后台需用 Cloudflare Zero Trust 保护）。

首次进入后台会有设置流程：

<img width="1182" alt="Screenshot 2022-12-17 at 10 34 05 AM" src="https://user-images.githubusercontent.com/1719237/208216864-38a65086-77ef-4595-bc05-c87be2676e6d.png">

[返回 📚目录](#-目录)

### 步骤5. 完成，开始发布

设置完成后即可使用 microfeed 实例。  
可在后台添加、更新、删除内容。

也可在“设置 / 自定义代码”处编辑 HTML 和 CSS，定制网站外观：

<img width="1098" alt="Screenshot 2022-12-30 at 7 57 45 PM" src="https://user-images.githubusercontent.com/1719237/210062910-e56135f6-557e-419e-a00d-b25dd391c93d.png">

HTML 使用 [mustache.js](https://github.com/janl/mustache.js) 模板语言，可访问 Feed Json 或 Item Json 的变量。  
如 [microfeed.org](https://www.microfeed.org/) 首页（Feed Web）用 [microfeed.org/json/](https://www.microfeed.org/json/) 的变量，  
[某条内容页](https://www.microfeed.org/i/introducing-microfeed-a-self-hosted-open-source-cms-on-cloudflare-open-alpha-uhbQEmArlC2/)（Item Web）用 [${item_url}/json](https://www.microfeed.org/i/introducing-microfeed-a-self-hosted-open-source-cms-on-cloudflare-open-alpha-uhbQEmArlC2/json) 的变量。

通过 Feed Json 和 Item Json，microfeed 可作为 Headless CMS，开发自己的客户端展示内容。

[返回 📚目录](#-目录)

### Bonus. 升级到最新版 microfeed

我们会持续更新 microfeed，添加新功能和修复 bug。  
你可以同步 fork 仓库代码：

<img width="488" alt="Screenshot 2022-12-26 at 7 58 32 AM" src="https://user-images.githubusercontent.com/1719237/209483973-c82e7808-0d21-4aad-ac2d-c4e80da691bc.png">

然后再次运行 [Actions -> Deploy to Cloudflare Pages](../../actions/workflows/deploy.yml) 部署新代码。

[返回 📚目录](#-目录)

## 💻 常见问题

<details>
<summary><b>如何统计播客/视频/图片下载量？</b></summary>

可用“追踪链接”功能，设置第三方统计链接（如 [OP3](https://op3.dev/)、[Podtrac](http://analytics.podtrac.com/)）。

在后台“设置 / 追踪链接”添加第三方统计链接：

![Screenshot 2023-01-05 at 7 57 02 AM](https://user-images.githubusercontent.com/1719237/210665674-39f9b0a9-1f28-4608-b0cd-c67b8a5c87ec.png)

microfeed 会自动将这些链接加到媒体文件 URL 前，实现统计。

这是播客行业的[常见做法](https://lowerstreet.co/blog/podcast-tracking)，有助于了解内容表现和受众情况。
</details>

<details>
<summary><b>为什么选 Cloudflare？信任商业公司安全吗？</b></summary>

很多个人和组织都信任并使用 Cloudflare 服务，我们（Listen Notes）也用了很多年。

在 Cloudflare 一站式管理 DNS、缓存、防火墙、代码、CDN、登录等非常方便。

microfeed 目前处于开放 alpha 阶段，首选支持 Cloudflare。  
未来可能支持其他 serverless 平台，方便迁移。
</details>

<details>
<summary><b>如果 Cloudflare 禁用我的 microfeed 实例怎么办？</b></summary>

请仔细阅读 Cloudflare 服务条款，违规可能被禁用实例。

建议定期备份 Cloudflare 数据，方便恢复或迁移。  
建议用自定义域名，便于迁移和控制内容。
</details>

<details>
<summary><b>为什么要用 microfeed？</b></summary>

如果你已在用 Cloudflare且满意，microfeed 是不错选择。

不想自己管服务器，microfeed 利用 Cloudflare 基础设施和安全特性。

不想付服务器费，Cloudflare 免费额度很高。

想尝试新方案，microfeed值得一试。建议评估是否适合你的需求。
</details>

<details>
<summary><b>如何下载/备份 microfeed/Cloudflare 数据？</b></summary>

microfeed 数据存于 Cloudflare D1 和 R2。备份需下载两部分：
* D1 的 sqlite 数据库（所有元数据）
* R2 的媒体文件（音频、图片、视频等）

<b>如何下载 D1 的 sqlite 数据库？</b>

用命令行工具 `wrangler` 查找并下载 sqlite 备份：

[https://developers.cloudflare.com/workers/wrangler/commands/#d1](https://developers.cloudflare.com/workers/wrangler/commands/#d1)

<b>如何下载 R2 媒体文件？</b>

截至 2023年2月，Cloudflare 尚无批量下载 R2 bucket 工具。

可用 S3 兼容 API 写脚本批量下载：

[https://developers.cloudflare.com/r2/data-access/s3-api/api/](https://developers.cloudflare.com/r2/data-access/s3-api/api/)
</details>

[返回 📚目录](#-目录)

## 💪 贡献
欢迎为 microfeed 贡献！  
如有新功能建议或发现 bug，请[提交 issue](https://github.com/microfeed/microfeed/issues/new)。  
如要提交修复或新功能，请创建 pull request 并详细描述你的更改。

### 本地运行 microfeed

前置条件：node / npm、yarn、wrangler

### 前置条件 node / npm、yarn、wrangler

1.安装 Node.js 和 npm  
Node.js 是运行 JavaScript 的环境，npm 是其默认的包管理器，许多工具都依赖它。

**下载安装**：访问 [Node.js 官网](https://nodejs.org/)，推荐下载 LTS（长期支持）版本，通常更稳定。安装程序通常会自动将 Node.js 和 npm 添加到系统环境变量（PATH）中（安装时注意勾选相关选项）。

**验证安装**：打开终端（Windows 上是 Command Prompt 或 PowerShell，macOS/Linux 上是 Terminal），运行以下命令检查是否安装成功：
```bash
node -v
npm -v
```
如果这两条命令都能返回版本号（例如 v20.17.0 和 10.8.2），说明安装成功。

2. 安装 Yarn  
Yarn 是一个快速、可靠、安全的 JavaScript 依赖管理工具。

通过 npm 全局安装 Yarn：  
在终端中运行：
```bash
npm install -g yarn
```
**验证安装**：
```bash
yarn --version
```
成功安装会显示 Yarn 的版本号。

3. 安装 Wrangler  
Wrangler 是 Cloudflare 提供的命令行工具，用于本地开发、测试和部署 Cloudflare Workers 和 Pages 项目，microfeed 的本地边缘（edge）代码运行依赖它。

通过 npm 全局安装 Wrangler：  
在终端中运行：
```bash
npm install -g wrangler
```
**验证安装**：
```bash
wrangler --version
```
成功安装会显示 Wrangler 的版本号。
<br/>
### 本地运行
首先，在 microfeed 根目录（与本 README.md 同级）创建 .vars.toml 文件，写入 5 个 secrets（与[步骤2](#步骤2-在你的-fork-仓库添加-secrets)类似）：
```toml
# .vars.toml
CLOUDFLARE_PROJECT_NAME = "your-project-org"  # 你的项目名称
CLOUDFLARE_ACCOUNT_ID = "your_account_id_here"  # 你的Cloudflare Account ID
CLOUDFLARE_API_TOKEN = 'your_api_token_here'   # 你创建的API Token
R2_ACCESS_KEY_ID = "your_r2_access_key_id_here" # 你创建的R2 Access Key ID
R2_SECRET_ACCESS_KEY = "your_r2_secret_access_key_here" # 你创建的R2 Secret Access Key
R2_PUBLIC_BUCKET = "your-r2-bucket-name"  # 你在R2中创建的存储桶名称
```

然后运行本地开发服务器：
```bash
yarn dev
```

可通过 http://127.0.0.1:8788/ 访问本地 microfeed 实例。

**`yarn dev` 如何工作？**  
本质上同时运行两个进程：`yarn dev:client` 和 `yarn dev:edge`。  
`yarn dev:client` 启动 [webpack DevServer](https://webpack.js.org/configuration/dev-server/) 用于前端代码，  
`yarn dev:edge` 启动 [Wrangler](https://developers.cloudflare.com/pages/functions/local-development/) 用于 Pages（edge）代码。

[返回 📚目录](#-目录)

## 🛡️ 许可证
microfeed 采用 [AGPL-3.0](https://github.com/microfeed/microfeed/blob/main/LICENSE) 许可证。详情见 [LICENSE 文件](https://github.com/microfeed/microfeed/blob/main/LICENSE)