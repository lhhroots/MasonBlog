#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

COMMIT_MSG="${1:-update: $(date +'%Y-%m-%d %H:%M')}"

echo "==> 1/4 校验未提交的源码变更"
if [[ -n "$(git status --porcelain)" ]]; then
  git add -A
  git commit -m "$COMMIT_MSG" || true
  echo "==> 源码头已提交: $COMMIT_MSG"
else
  echo "==> 无源码变更，跳过提交"
fi
git push origin master

echo "==> 2/4 构建静态站点"
npm run build

echo "==> 3/4 部署到 GitHub Pages"
npx hexo deploy

echo "==> 4/4 完成 ✅"
echo "线上站点: https://lihanghang.top"
