# upstream-archive — dsh-purge 上游 Issue / PR / Release 完整快照

本分支是 **[YuJunZhiXue/dsh-purge](https://github.com/YuJunZhiXue/dsh-purge)** 的
issue、PR、评论与 release 制品快照。上游重写过历史、删过 tag，仓库本身也可能再次消失，
这里存的是**抓取时刻的原始 JSON**，不做二次加工。

- 抓取时间：**2026-10-23 21:33 (Asia/Shanghai)**
- 上游 `master`：`5a9b8e14856138814a2139a0105481e1dcdaece4`（= `v1.1.74`）
- 抓取方式：GitHub REST API v3（`gh api --paginate`，`state=all`）

## 内容

| 文件 | 内容 | 条数 / 大小 |
| --- | --- | --- |
| `repo.json` | 仓库元数据（星标 6741、fork 455、license Apache-2.0、topics） | 1 |
| `issues.json` | 全部 issue **与 PR**（GitHub 的 issues 接口把 PR 也列进来） | 148 |
| `issues-index.md` | 上面这份的可读索引：编号 / 类型 / 状态 / 创建日 / 标题 | 112 issue + 36 PR |
| `issue-comments.json` | 全部 issue 评论正文 | 258 |
| `pulls.json` | 全部 PR（含 head/base、合并状态、diff 统计） | 36 |
| `review-comments.json` | PR 行内 review 评论 | 0（上游没有） |
| `releases.json` | 两个 release 的完整元数据与资产清单 | 2 |
| `commits.json` | 上游当前 `master` 的提交列表（作者重写后只剩 6 个） | 6 |
| `releases/dsh-purge-1.1.73.zip` | release 原包 | 2,063,744 B |
| `releases/dsh-purge-1.1.74.zip` | release 原包 | 2,066,206 B |

`releases/SHA256SUMS.txt`：

```
0431e345d85979aba5b2d589ffdec13223263ad3d9b499a8432c2f5f5b0e39ab  dsh-purge-1.1.73.zip
96fd401bf0a04c1a7915f3e82419e16b763682e1419a94212fe79cb7b6dba78c  dsh-purge-1.1.74.zip
```

## 复原上游仓库

```bash
git clone -b upstream-archive https://github.com/Huangxizhe11/dsh-purge.git dsh-purge-archive
cd dsh-purge-archive/upstream-archive && shasum -a 256 -c releases/SHA256SUMS.txt

# 另一条线：master 分支 = 上游代码 + 被重写前的旧全量历史 + archive/ 破甲提示词冻结档
cd .. && git checkout master && ls archive/prompts
```

## 署名

原项目 **dsh-purge — DeepSeek Harness 破甲**，作者 **YuJunZhiXue**。
Apache-2.0 / `NOTICE` 原样保留；按原 README 署名要求，借用名称、思路、代码或提示词必须署名
并写明来源仓库；不得收费倒卖。本目录仅存档，不主张任何原创性。
