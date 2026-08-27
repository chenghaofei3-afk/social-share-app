# Social Share App 🌍

一个社交分享平台，帮助年轻人通过兴趣社群连接、分享和表达自己。

## 功能特性 ✨

- **多媒体分享** - 分享文字、图片、视频、音频等
- **兴趣社群** - 按兴趣和话题组织内容
- **社交互动** - 点赞、评论、私信、关注
- **用户认证** - 安全的注册和登录系统
- **实时通知** - 获取最新的互动和更新

## 技术栈 🛠️

### 后端
- **Node.js** + **Express** - 服务器框架
- **MongoDB** - 数据库
- **JWT** - 身份认证
- **Multer + Cloudinary** - 文件上传

### 前端
- **React** + **TypeScript** - UI 框架
- **Redux** - 状态管理
- **Axios** - HTTP 客户端
- **Tailwind CSS** - 样式库

## 项目结构 📁

```
social-share-app/
├── backend/
│   ├── models/           # 数据库模型
│   ├── routes/           # API 路由
│   ├── controllers/      # 业务逻辑
│   ├── middleware/       # 中间件
│   ├── config/           # 配置文件
│   └── server.js         # 入口文件
├── frontend/
│   ├── src/
│   │   ├── components/   # React 组件
│   │   ├── pages/        # 页面
│   │   ├── store/        # Redux store
│   │   ├── services/     # API 服务
│   │   └── App.js
│   └── package.json
├── .env.example          # 环境变量示例
└── README.md
```

## 快速开始 🚀

### 前置要求
- Node.js v14+
- MongoDB
- npm 或 yarn

### 安装依赖

```bash
# 后端
cd backend
npm install

# 前端
cd ../frontend
npm install
```

### 环境配置

复制 `.env.example` 为 `.env` 并填写配置：

```bash
cp .env.example .env
```

### 运行应用

```bash
# 开发模式
npm run dev

# 生产模式
npm start
```

## API 文档 📚

详见 `backend/API.md`

## 贡献指南 🤝

欢迎提交 PR 和 Issue！

## 许可证 📄

MIT License - 详见 LICENSE 文件

---

**让年轻人在这里找到属于自己的声音和社群！** 💬
