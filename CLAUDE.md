# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## 项目概述

HaloLight Fly.io 部署版本，支持全球边缘部署、持久化存储、有状态服务。

## 技术栈

- **框架**: Next.js 15 + React 19 + TypeScript
- **样式**: Tailwind CSS 4、shadcn/ui
- **部署**: Fly.io (Fly Machines)
- **数据库**: Fly Postgres
- **存储**: Fly Volumes

## 常用命令

```bash
pnpm dev          # 本地开发
pnpm build        # 生产构建
fly deploy        # 部署到 Fly.io
fly logs          # 查看日志
fly status        # 查看状态
fly ssh console   # SSH 进入容器
```

## Fly.io 特性

### 区域部署

```bash
fly regions add sin nrt  # 添加新加坡、东京区域
fly scale count 2        # 每个区域 2 个实例
```

### 自动扩缩容

```toml
# fly.toml
[http_service]
  auto_stop_machines = true   # 无流量时停止
  auto_start_machines = true  # 有请求时启动
  min_machines_running = 1    # 最少保持 1 个实例
```

### 私有网络

Fly 应用间通过 `.internal` 域名私有通信：
```
postgres.internal:5432
redis.internal:6379
```

## Dockerfile 优化

使用 Next.js standalone 输出减小镜像体积：
```js
// next.config.ts
export default { output: 'standalone' }
```
