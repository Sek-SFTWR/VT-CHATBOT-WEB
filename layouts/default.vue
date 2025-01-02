<template>
  <div class="flex h-screen">
    <div :class="[isCollapsed ? 'w-20' : 'w-[20vw]']">
      <SideBar @sidebar-collapse="handleSidebarCollapse" />
    </div>
    <div
      :class="[
        'flex flex-col bg-slate-100 transition-all duration-300 h-full',
        isCollapsed ? 'w-[calc(100vw-5rem)]' : 'w-[80vw]',
      ]"
    >
      <div class="h-[calc(10vh)]">
        <Header />
      </div>

      <main class="overflow-auto h-[calc(90vh)]">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const isCollapsed = ref(false);

const handleSidebarCollapse = (collapsed) => {
  isCollapsed.value = collapsed;
};
</script>
