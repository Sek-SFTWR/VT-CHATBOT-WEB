<template>
  <div
    :class="[
      ' bg-gradient-to-b from-blue-500 to-blue-700 text-white p-4 flex flex-col transition-all duration-300 h-full',
      isCollapsed ? 'w-20' : 'w-full',
    ]"
  >
    <!-- Header with Title and Action Buttons -->
    <div class="flex items-center justify-between mb-4">
      <div class="text-xl font-semibold" v-show="!isCollapsed">
        Chat History
      </div>
      <div class="flex space-x-2">
        <button
          v-show="!isCollapsed"
          @click="newChat"
          class="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md text-sm"
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
        class="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-600 cursor-pointer border border-blue-300 border-solid border-2"
        @click="loadChat(chat)"
      >
        <div
          class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-blue-700"
        >
          <span class="font-semibold text-sm">{{ chat.initials }}</span>
        </div>
        <div class="flex-1 text-sm font-medium truncate">{{ chat.title }}</div>
      </div>
    </div>

    <!-- Clear History Button (Bottom) -->
    <div v-show="!isCollapsed" class="mt-4 pt-4 border-t border-blue-400">
      <button
        @click="clearHistory"
        class="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md text-sm"
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

const isCollapsed = ref(false);
const chatHistory = ref([
  { title: "Chat 1", initials: "C1", messages: [] },
  // Add more chat history items as needed
]);

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
  "sidebar-collapse",
]);
</script>
