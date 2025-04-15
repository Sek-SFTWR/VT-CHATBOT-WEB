<template>
  <div
    :class="[
      ' bg-gradient-to-b from-blue-500 to-blue-700 text-white p-4 flex flex-col transition-all duration-300 h-full',
      isCollapsed ? 'w-20' : 'w-full'
    ]"
  >
    <!-- Header with Title and Action Buttons -->
    <div class="flex items-center justify-between mb-8 mt-2">
      <div class="text-xl font-semibold" v-show="!isCollapsed">
        Chat History
      </div>
      <div class="flex space-x-2">
        <button
          v-show="!isCollapsed"
          @click="newChat"
          class="text-white px-2 py-1 rounded-md text-sm hover:bg-blue-600"
        >
          New Chat
        </button>
        <button
          @click="toggleCollapse"
          class="p-1 hover:bg-blue-600 rounded-full transition-colors"
          :title="isCollapsed ? 'Expand' : 'Collapse'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 transform transition-transform"
            :class="{ 'rotate-180': isCollapsed }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Chat History List -->
    <div v-show="!isCollapsed" class="flex-1 space-y-2 overflow-y-auto">
      <div
        v-for="(chat, index) in chatHistory"
        :key="index"
        class="flex justify-between items-center py-2 px-4 rounded-lg hover:bg-blue-600 cursor-pointer border border-blue-300 border-solid border-2 transition duration-200"
        @click="loadChat(chat)"
      >
        <div class="text-sm font-medium truncate w-full">
          {{ chat.title }}
        </div>
        <div class="flex text-m font-medium text-white space-x-1">
          <span>•</span>
          <span>•</span>
          <span>•</span>
        </div>
      </div>
    </div>

    <!-- Clear History Button (Bottom) -->
    <div v-show="!isCollapsed" class="mt-4 pt-4 border-t border-blue-400">
      <button
        @click="clearHistory"
        class="w-full text-white py-2 rounded-md text-sm cursor-pointer border border-blue-300 border-solid border-2"
      >
        Clear History
      </button>
    </div>

    <!-- Collapsed State New Chat Button -->
    <button
      v-show="isCollapsed"
      @click="newChat"
      class="p-2 bg-green-500 hover:bg-green-600 rounded-full"
      title="New Chat"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 4v16m8-8H4"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import chatdata from "@/lib/chatHistory.json";
const isCollapsed = ref(false);
const chatHistory = ref([]);
onMounted(() => {
  chatHistory.value = chatdata.messages || [];
  emit("sidebar-collapse", isCollapsed.value);
});
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
  emit("sidebar-collapse", isCollapsed.value);
};

const loadChat = async (chat) => {
  emit("loading-state", true);
  emit("select-chat", chat);
};

const clearHistory = () => {
  chatHistory.value = [];
  emit("clear-history");
};

const newChat = () => {
  emit("loading-state", true);
  emit("new-chat");
};

const emit = defineEmits([
  "select-chat",
  "clear-history",
  "new-chat",
  "sidebar-collapse"
]);
</script>
<style scoped>
.sidebar {
  width: 250px;
  transition: width 0.3s;
}

.sidebar.collapsed {
  width: 60px;
}

.chat-item {
  cursor: pointer;
  padding: 10px;
}

.chat-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
