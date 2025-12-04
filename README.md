# HaloLight Fly.io

[![License](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![Fly.io](https://img.shields.io/badge/Fly.io-Deployed-8B5CF6.svg?logo=fly.io)](https://halolight-fly.h7ml.cn)
[![Next.js](https://img.shields.io/badge/Next.js-15-%23000000.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-%233178C6.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-%2361DAFB.svg)](https://react.dev/)

HaloLight 后台管理系统的 **Fly.io 部署版本**，支持全球边缘部署、持久化存储和有状态服务。

- 在线预览：<https://halolight-fly.h7ml.cn>
- GitHub：<https://github.com/halolight/halolight-fly>

## 功能亮点

- **全球边缘部署**：35+ 区域就近部署
- **Fly Machines**：微型虚拟机，按需启动
- **Fly Volumes**：持久化 NVMe 存储
- **Fly Postgres**：托管 PostgreSQL
- **私有网络**：应用间私有通信
- **自动扩缩容**：根据负载自动调整

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/halolight/halolight-fly.git
cd halolight-fly

# 安装依赖
pnpm install

# 安装 Fly CLI
brew install flyctl

# 登录 Fly.io
fly auth login

# 本地开发
pnpm dev
```

## 部署到 Fly.io

```bash
# 创建应用
fly launch

# 部署
fly deploy

# 查看状态
fly status

# 查看日志
fly logs
```

## Fly.io 配置

### fly.toml

```toml
app = "halolight-fly"
primary_region = "hkg"

[build]
  dockerfile = "Dockerfile"

[http_service]
  internal_port = 3000
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 1

[[vm]]
  cpu_kind = "shared"
  cpus = 1
  memory_mb = 512
```

### Dockerfile

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

## 持久化存储

```bash
# 创建 Volume
fly volumes create data --region hkg --size 10

# 挂载到应用
# 在 fly.toml 中添加:
[mounts]
  source = "data"
  destination = "/data"
```

## Fly Postgres

```bash
# 创建 Postgres 集群
fly postgres create

# 连接到应用
fly postgres attach --app halolight-fly
```

## 环境变量

```bash
# 设置密钥
fly secrets set DATABASE_URL="postgres://..."
fly secrets set API_KEY="your-api-key"
```

## 相关链接

- [HaloLight 文档](https://halolight.docs.h7ml.cn)
- [Fly.io 文档](https://fly.io/docs/)
- [Fly.io Next.js](https://fly.io/docs/js/frameworks/nextjs/)

## 许可证

[MIT](LICENSE)
