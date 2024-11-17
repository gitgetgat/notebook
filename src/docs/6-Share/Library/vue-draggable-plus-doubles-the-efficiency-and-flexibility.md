# Vue Draggable Plus 效率与灵活性的双重提升

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'Vue Draggable Plus',linkUrl:'https://github.com/Alfred-Skyblue/vue-draggable-plus'},{ linkText:'Vue Draggable Plus 官网',linkUrl:'https://vue-draggable-plus.pages.dev/en/'}]" />

![/6ce7da9b-a35a-623e-a59a-4c7bd620d268.png](/6ce7da9b-a35a-623e-a59a-4c7bd620d268.png)

## `Vue Draggable Plus` 是什么？

`Vue Draggable Plus` 继承了 `Sortable.js` 的所有功能，这意味着你可以享受到一个成熟、稳定且功能丰富的拖拽库所带来的便利。无论你的项目是基于 `Vue 2` 还是 `Vue 3`，`Vue Draggable Plus` 都能完美适配，让你的迁移之路无比顺畅。

## 特点

- <imp-text-danger>功能齐全</imp-text-danger>：该组件全面继承了 `Sortable.js` 的所有功能，为用户提供了丰富的拖拽操作选项。

- <imp-text-danger>无缝迁移</imp-text-danger>：兼容 `Vue 3` 和 `Vue 2`，使得从旧版本到新版本的迁移变得轻松无障碍。

- <imp-text-danger>灵活使用</imp-text-danger>：支持通过组件、指令或函数式调用等多种方式使用，满足了不同开发者的使用习惯和项目需求。

- <imp-text-danger>类型安全</imp-text-danger>：使用 `TypeScript` 编写，提供了完整的 `TypeScript` 文档，确保了代码的类型安全和易于维护。

- <imp-text-danger>双向绑定</imp-text-danger>：支持 `v-model` 双向绑定，使得数据的同步和更新更加直观和便捷。

- <imp-text-danger>自定义容器</imp-text-danger>：允许开发者将任意指定的容器作为拖拽容器，增加了组件的灵活性和使用场景。

- <imp-text-danger>易于集成</imp-text-danger>：`Vue Draggable Plus` 易于集成到现有的 `Vue` 项目中，无论是小型项目还是大型应用，都能快速引入并使用。

- <imp-text-danger>社区支持</imp-text-danger>：作为开源项目，`Vue Draggable Plus` 拥有活跃的社区支持，用户可以从社区获得帮助和最新的更新。

## 安装使用

通过 `npm` 或 `yarn` 安装 `Vue Draggable Plus`

::: code-group

```bash [npm]
npm install vue-draggable-plus
```

```bash [yarn]
yarn add vue-draggable-plus
```

:::

## 使用组件实现拖拽

::: code-group

```vue
<template>
  <div class="flex">
    <VueDraggable
      ref="el"
      v-model="list"
      :disabled="disabled"
      :animation="150"
      ghostClass="ghost"
      class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded"
      @start="onStart"
      @update="onUpdate"
      @end="onEnd"
    >
      <div
        v-for="item in list"
        :key="item.id"
        class="cursor-move h-30 bg-gray-500/5 rounded p-3"
      >
        {{ item.name }}
      </div>
    </VueDraggable>
    <preview-list :list="list" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  type DraggableEvent,
  type UseDraggableReturn,
  VueDraggable
} from "vue-draggable-plus";
const list = ref([
  {
    name: "Joao",
    id: 1
  },
  {
    name: "Jean",
    id: 2
  }
]);

const el = ref<UseDraggableReturn>();
const disabled = ref(false);
function pause() {
  el.value?.pause();
}

function start() {
  el.value?.start();
}

const onStart = (e: DraggableEvent) => {
  console.log("start", e);
};

const onEnd = (e: DraggableEvent) => {
  console.log("onEnd", e);
};

const onUpdate = () => {
  console.log("update");
};
</script>
```

:::

### 使用函数实现拖拽

::: code-group

```vue
<template>
  <button @click="start()">start</button>
  <div class="flex">
    <div
      class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded"
      ref="el"
    >
      <div
        v-for="item in list"
        :key="item.id"
        class="h-30 bg-gray-500/5 rounded p-3 cursor-move"
      >
        {{ item.name }}
      </div>
    </div>
    <preview-list :list="list" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDraggable } from "vue-draggable-plus";
const list = ref([
  {
    name: "Joao",
    id: 1
  },
  {
    name: "Jean",
    id: 2
  }
]);
const el = ref();

const { start } = useDraggable(el, list, {
  animation: 150,
  ghostClass: "ghost",
  onStart() {
    console.log("start");
  },
  onUpdate() {
    console.log("update");
  }
});
</script>
```

:::

![/c0b8bbd7-2e37-ccd1-7dcc-29e22559c1ce.gif](/c0b8bbd7-2e37-ccd1-7dcc-29e22559c1ce.gif)

官网还有许许多多的示例可以查看

- <imp-text-danger>单列表拖拽</imp-text-danger>
- <imp-text-danger>双列表拖拽</imp-text-danger>
- <imp-text-danger>拖拽克隆</imp-text-danger>
- <imp-text-danger>自定义拖拽克隆</imp-text-danger>
- <imp-text-danger>表行拖拽</imp-text-danger>
- <imp-text-danger>表列拖拽</imp-text-danger>
- <imp-text-danger>嵌套拖拽</imp-text-danger>
- ...
