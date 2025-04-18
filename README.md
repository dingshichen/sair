# 数据库设计软件
## 环境要求
- Node: v20.19.0

## 准备
镜像源
```bash
npm config set registry https://registry.npmmirror.com
```

```bash
npm config set electron_builder_binaries_mirror https://npmmirror.com/mirrors/electron-builder-binaries/
```
```bash
npm config set electron_mirror https://cdn.npmmirror.com/binaries/electron/
```

安装依赖
```bash
npm install
```

## 调试
服务端调试
```bash
npm run dev
```

软件调试
```bash
npm run electron:dev
```

## 打包
打包前端
```bash
npm run build
```

打包客户端
```bash
npm run electron:build
```