# 破甲提示词存档 / Jailbreak prompt archive

本目录保存 **dsh-purge（DeepSeek Harness 破甲）** 默认提示词的全部已知版本。
上游会改历史、删 tag、覆盖文件（本仓库就是为这个建的），所以这里按版本冻结字节，
一版一目录，永不覆盖。

- 原项目：**dsh-purge — DeepSeek Harness 破甲**
- 原作者：**YuJunZhiXue**（<https://github.com/YuJunZhiXue/dsh-purge>）
- 署名要求：借用名称 / 思路 / 代码 / **提示词**必须署名并写明来源仓库；不得收费倒卖。
  本目录仅为存档镜像，一切权利归原作者。

## 版本清单

| 目录 | 来源 | 字节 | SHA256(zh) | 说明 |
| --- | --- | --- | --- | --- |
| `v1.1.74/` | tag `v1.1.74`（= 上游 2026-10-23 master `5a9b8e1`） | 25727 / 29427 | `5bb958ea…` | 最新版，含「禁止外挂」等修订 |
| `v1.1.73/` | tag `v1.1.73`（= 审计时的 `1ea0671` 字节一致） | 25624 / 29373 | `686595e5…` | 首个 Apache-2.0 + local-lab only 版本 |
| `v1.1.73-bak/` | `lib/default-prompt-inject.md.bak` | 24455 | `fa2f43cb…` | 上游遗留的上一代中英混排版（`[MODE: SANDBOX — STABLE]`） |
| `installed-2026-10-23/` | 本机 `~/.dsh/prompt-inject.md`（apply 1.1.73 后落盘的实际文件） | 25127 | `dec02209…` | 真正在跑的成型版本，与上面三份都不同 |

`SHA256SUMS.txt` 覆盖全部 6 个文件，可直接 `shasum -a 256 -c SHA256SUMS.txt` 校验。

## 版本差异（zh）

- `v1.1.73-bak`：`[MODE: SANDBOX — STABLE]`，正文偏英文，行数最少。
- `v1.1.73`：`[OPERATION: STABLE]`，中文全量重写，补了 Routing / CTF 契约段。
- `v1.1.74`：在 1.1.73 上追加「禁止外挂」等条款，尾部多约 100 字节。
- `installed-2026-10-23`：安装器落盘时裁掉了部分重复段（25127 < 25624），
  与 `v1.1.73` 正文顺序一致但不是字节子集。

## 还原 / 使用方法

```bash
# 1) 校验
cd archive/prompts && shasum -a 256 -c SHA256SUMS.txt

# 2) 直接把某个版本塞回 DSH（等价于 dsh-purge 的注入落点）
cp v1.1.74/zh.md ~/.dsh/prompt-inject.md

# 3) 或者走原插件重装
npm i -g dsh-purge && dsh-purge apply
```

> 注意：这是把 harness 的审批 / 沙箱 / hook deny 一并拆掉的工具，只在
> 本机、自己的环境、授权靶场里用。上游 README 的「原版不允许倒卖」条款继续有效。
