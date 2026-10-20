// hostFs 能力清单回归(#127)。
// closeSync / readSync 收的是 fd,不进 HOST_SYNC,必须直接透传。
// 少了它们,core.js 的 isTextShim() 恒返回 false,shim 全被判成 binary,patchShim() 永不执行;
// 同一个 finally 里的 closeSync 也抛,句柄就一直开着。
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { hostFs } from "../lib/extract-asar.js";
import { shimFileStatus } from "../lib/core.js";

function fixtureDir(tag) {
  return fs.mkdtempSync(path.join(os.tmpdir(), `dsh-purge-${tag}-`));
}

test("hostFs exposes closeSync and readSync", () => {
  assert.equal(typeof hostFs.closeSync, "function");
  assert.equal(typeof hostFs.readSync, "function");
});

test("hostFs readSync reads the file and closeSync really closes the fd", () => {
  const dir = fixtureDir("hostfs");
  try {
    const fp = path.join(dir, "dsh.cmd");
    fs.writeFileSync(fp, "@echo off\r\necho hello\r\n");
    const fd = hostFs.openSync(fp, "r");
    const buf = Buffer.alloc(64);
    const n = hostFs.readSync(fd, buf, 0, buf.length, 0);
    assert.equal(buf.subarray(0, n).toString("utf8"), "@echo off\r\necho hello\r\n");
    hostFs.closeSync(fd);
    // 关掉了才会抛;句柄还开着的话这次读是读得出来的。
    assert.throws(() => hostFs.readSync(fd, buf, 0, 1, 0));
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("a text shim is reported as original, not binary", () => {
  const dir = fixtureDir("shim");
  try {
    const fp = path.join(dir, "dsh.cmd");
    fs.writeFileSync(fp, "@echo off\r\necho dsh\r\n");
    assert.equal(shimFileStatus(fp), "original");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("a binary shim is still reported as binary", () => {
  const dir = fixtureDir("shim-bin");
  try {
    const fp = path.join(dir, "dsh");
    fs.writeFileSync(fp, Buffer.from([0x7f, 0x45, 0x4c, 0x46, 0x00, 0x01, 0x02]));
    assert.equal(shimFileStatus(fp), "binary");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
