# Node.js template - DDD 

TLDR:
1. [How to install](#1-how-to-install)
2. [How to build](#2-how-to-build)
3. [Useful information](#3-useful-information)

## 1. How to start

### Install dependencies

```shell
npm install / yarn
```

## 2. How to build

```shell
npm run build / yarn build
```

If you even encounter strange build behavior, tsconfig is set to create build with cache. Set option `incremental` in tsConfig to false. Its set to cache builds to save time. Those errors are extremally rare, but can happen if you modify the same file, same lines over and over.

Makefile already includes command to build docker.

## 3. Useful information

### 3.1 Logs folder

#### Linux

```text
~/.cache/"package.json -> productName"/logs
```

#### Windows

```text
~/AppData/Roaming/"package.json -> productName"/logs
```
