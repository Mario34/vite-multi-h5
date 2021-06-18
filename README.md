# vite-multi-h5

## 快速开始

```bash
# 启动开发服务
yarn dev
```

项目启动后，`pages/` 目录下的能够被规则匹配的文件都将会被作为入口

```text
- pages
  - project-a
      index.html
      main.ts
  - project-b
      index.html
      main.ts
```

项目访问地址与他们的目录结构保持一致，`project-a/index.html` => `host:port/pages/project-a/index.html`，默认最大递归深度为5(⚠️ 超出深度的入口在build会被忽略，尽管开发环境仍然能够访问)

---
## 以下是基础模版的开发指引

This template should help get you started developing with Vue 3 and Typescript in Vite.

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur). Make sure to enable `vetur.experimental.templateInterpolationService` in settings!

#### If Using `<script setup>`

[`<script setup>`](https://github.com/vuejs/rfcs/pull/227) is a feature that is currently in RFC stage. To get proper IDE support for the syntax, use [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) instead of Vetur (and disable Vetur).

### Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can use the following:

#### If Using Volar

Run `Volar: Switch TS Plugin on/off` from VSCode command palette.

#### If Using Vetur

1. Install and add `@vuedx/typescript-plugin-vue` to the [plugins section](https://www.typescriptlang.org/tsconfig#plugins) in `tsconfig.json`
2. Delete `src/shims-vue.d.ts` as it is no longer needed to provide module info to Typescript
3. Open `src/main.ts` in VSCode
4. Open the VSCode command palette
5. Search and run "Select TypeScript version" -> "Use workspace version"
