# 镜像说明 / Mirror Notice

本仓库是 **[YuJunZhiXue/dsh-purge](https://github.com/YuJunZhiXue/dsh-purge)** 的**存档镜像（mirror）**，
由 [@mmparko](https://github.com/mmparko) 在上游宣布删库前备份，用于存档与分发。
上游此后**重写过 Git 历史、删掉过 tag、并把若干文件从发布版里摘除**，因此本仓库同时承担
「当前版本镜像」与「被删内容留档」两个职责。

---

## 一、署名 / Attribution

| 项 | 内容 |
| --- | --- |
| 原项目 | **dsh-purge — DeepSeek Harness 破甲**（让所有模型都能破甲，不同模型可换不同提示词） |
| 原作者 | **YuJunZhiXue**（[@YuJunZhiXue](https://github.com/YuJunZhiXue)） |
| 原仓库 | <https://github.com/YuJunZhiXue/dsh-purge> |
| 原许可证 | Apache-2.0（`LICENSE` / `NOTICE` 原样保留，未做改动） |

**本项目的名称、思路、代码、提示词的一切权利与署名均归原作者。**
本镜像不主张任何原创性，仅承担存档与分发职责，未对原作者内容做再授权。

按原 README「[署名要求](https://github.com/YuJunZhiXue/dsh-purge#署名要求)」章节的明确要求：
**借用本项目的名称、思路、代码或提示词，必须署名，并写明来源仓库。** 任何基于本镜像的二开、
分发、集成，都必须保留本说明与原仓库链接。原项目的非盈利条款同样沿用：**不得用于卖课、
卖插件、卖 token、倒卖等收费行为。**

---

## 二、本仓库现在有什么 / What's here

| 位置 | 内容 |
| --- | --- |
| `master` | 上游 **v1.1.74**（2026-10-23 的 `5a9b8e1`）内容，逐文件对齐；另加本文件与 `archive/` |
| `master` 历史 | 上游**被重写前**的完整旧线（回溯到早期版本，含 1.1.71 及以前全部提交），以 merge commit 并入 |
| Tag（43 个） | `v1.1.73`、`v1.1.74`（作者重写后仍在线的两个）+ `archive/pr-<N>-head` / `-merge` 39 个（上游 `refs/pull/*` 的同 SHA 转换，GitHub 禁止推送隐藏 ref）+ 快照 tag `upstream-snapshot-6c1d638`、`pre-rewrite-1.1.71` |
| 分支 `upstream-archive` | **Issue / PR / 评论 / Release 制品快照**：112 个 issue + 36 个 PR + 258 条评论的原始 JSON、`issues-index.md` 可读索引、两个 release 原包 zip |
| `archive/prompts/` | **破甲默认提示词 4 个版本的字节冻结档**（见下） |
| `archive/skills-1.1.71/` | 23 个 redteam skill —— 上游 1.1.73 提交 `679a3db` 明确 "drop skills and knowledge base"，已从 master 消失 |
| `archive/audit/` | 2026-10-23 对 `v1.1.73` 的静态审计报告（82 处补丁位点、沙箱/审批关闭清单、无后门结论） |

### 破甲提示词存档（`archive/prompts/`）

| 目录 | 来源 | 字节 |
| --- | --- | --- |
| `v1.1.74/` | tag `v1.1.74` | 25727 (zh) / 29427 (en) |
| `v1.1.73/` | tag `v1.1.73`，与当年发布的 `1ea0671` 字节一致 | 25624 / 29373 |
| `v1.1.73-bak/` | 上游遗留 `lib/default-prompt-inject.md.bak` | 24455 |
| `installed-2026-10-23/` | 本机 `~/.dsh/prompt-inject.md`，apply 1.1.73 后真正在跑的那份 | 25127 |

四份互不相同，`SHA256SUMS.txt` 可整体校验。详见 [`archive/prompts/README.md`](archive/prompts/README.md)。

---

## 三、上游被改写的时间线 / What the author changed

| 时间 | 事件 |
| --- | --- |
| 2026-10-13 | 本仓库首次备份：上游 `master` = `6c1d638`（1.1.71 时代），完整历史 + 73 个原版 tag + 26 个 `archive/pr-*` tag |
| 2026-10-23 前 | 上游删库风险兑现：**历史被重写**，`master` 只剩 6 个提交；`v1.1.73` tag 指向新的 `ca848d7`，与当年发布的 `1ea0671` 不同；1.1.71 及以前的 tag 全部消失 |
| 2026-10-23 | 本仓库把上游 `5a9b8e1`（1.1.74）合并进 `master`，保留旧历史线；补推 tag；新增 `archive/` |
| 2026-10-23 21:33 | 二次全量快照：拉齐上游全部 `refs/pull/*`（转 39 个 `archive/pr-*` tag）；新建 `upstream-archive` 分支存 issue / PR / 评论 / release 原包 |

> 2026-10-13 那一批「73 个原版 tag + 26 个 `archive/pr-*` tag」的 ref 早已不在远端，
> 对应 commit 能否取回取决于 GitHub 的 GC 状态；**但旧 `master` 线本身完整**，旧版源码仍可
> `git log --all` / `git checkout <old-sha>` 取回。
> 2026-10-23 21:33 这次是按上游**当前实际在线**的 ref 重新做了一遍：只拉到 39 个 `refs/pull/*`，
> 已全部转成 `archive/pr-*` tag 归档。

---

## 四、自行校验 / Verify

```bash
git clone https://github.com/Huangxizhe11/dsh-purge.git
cd dsh-purge

# 1. 破甲提示词逐字节校验
cd archive/prompts && shasum -a 256 -c SHA256SUMS.txt

# 2. 本镜像与上游当前 master 的差异（应只有 MIRROR-NOTICE.md 与 archive/）
git remote add upstream https://github.com/YuJunZhiXue/dsh-purge.git
git fetch upstream --tags
git diff --stat upstream/master master

# 3. ref 清点（应为 2 个分支 + 43 个 tag）
git ls-remote --heads --tags origin | wc -l

# 4. Release 原包校验
git checkout upstream-archive && cd upstream-archive && shasum -a 256 -c releases/SHA256SUMS.txt

# 5. 旧历史是否还在
git log --all --oneline | tail -5
git log --oneline --follow lib/default-prompt-inject.zh.md | tail -3
```

---

## 五、上游 README 中的原生状态说明（保留告知）

上游 README 曾载明：**项目暂停更新**，作者因工作安排暂停维护、不再发版、暂不收
issue / PR，也不保证跟进新版 dsh；仓库仍可自用。该状态与「违规商用公示」章节一并完整保留在
`README.md` / `README.zh-CN.md` 中，本镜像不修改其任何字句。
