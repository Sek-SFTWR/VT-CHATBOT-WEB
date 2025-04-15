<template>
  <div class="flex flex-col bg-transparent h-full pb-4 mt-4">
    <div class="text-lg text-blue-500 w-full justify-center flex items-center">
      <h1 class="text-2xl font-semibold">Trained Model</h1>
    </div>

    <!-- Chat box -->
    <div
      class="flex-1 overflow-y-auto overflow-hidden scrollbar-hidden h-[calc(90vh)]"
    >
      <div v-for="(message, index) in messages" :key="index">
        <!-- User message -->
        <div
          v-if="message.type === 'user'"
          class="flex justify-end items-center space-x-2 mb-4"
        >
          <div
            class="bg-blue-500 text-white border border-blue-300 border-solid border-2 rounded-lg w-fit"
          >
            <p class="p-3 rounded-lg max-w-xs inline-block">
              {{ message.text }}
            </p>
          </div>
          <div class="w-12 h-12 flex items-center justify-center">
            <img src="~/assets/images/user.png" alt="you" class="w-10 h-10" />
          </div>
        </div>

        <!-- Bot message or loading -->
        <div v-else class="flex justify-start items-center space-x-2 mb-4">
          <div class="w-12 h-12 flex items-center justify-center">
            <img src="~/assets/images/bot.png" alt="Hero" class="w-10 h-10" />
          </div>

          <div v-if="message.isLoading" class="bg-gray-100 rounded-lg p-3">
            <div class="flex space-x-2">
              <div
                class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              ></div>
              <div
                class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style="animation-delay: 200ms"
              ></div>
              <div
                class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style="animation-delay: 400ms"
              ></div>
            </div>
          </div>

          <div
            v-else
            class="bg-gray-200 text-gray-800 border border-gray-300 border-solid border-2 rounded-lg w-fit max-w-[calc(50%)]"
          >
            <p class="p-3 rounded-lg inline-block">
              {{ message.text }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Input field and send button -->
    <div class="px-4 flex items-center space-x-4 bg-white h-[calc(10vh)]">
      <input
        v-model="userMessage"
        @keyup.enter="sendMessage"
        type="text"
        placeholder="Type a message..."
        :disabled="isLoading"
        class="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-500 font-semibold"
      />
      <button
        @click="sendMessage"
        :disabled="isLoading"
        class="p-3 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </div>

    <!-- Error message -->
    <div
      v-if="errorMessage"
      class="absolute bottom-0 left-1/2 transform -translate-x-1/2 p-4 bg-red-500 text-white rounded-full"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default"
});

import { ref, onMounted } from "vue";
import { useApi } from "~/composables/useApi";

const { fetchData, isLoading, errorMessage } = useApi();
const userMessage = ref("");
const messages = ref([]);
const chatHistoryKey = "chatHistory";

// Load chat history from LocalStorage
onMounted(() => {
  const storedHistory = localStorage.getItem(chatHistoryKey);
  if (storedHistory) {
    messages.value = JSON.parse(storedHistory);
    // localStorage.clear();
  }
});

// Save chat history to LocalStorage
const saveChatLocally = (messages) => {
  localStorage.setItem(chatHistoryKey, JSON.stringify(messages));
};

// Send user message and handle response
const sendMessage = async () => {
  if (userMessage.value.trim() === "") return;

  // Add user message
  messages.value.push({ type: "user", text: userMessage.value });

  // Add loading message
  messages.value.push({ type: "bot", isLoading: true });

  try {
    // Send message to API
    const response = await fetchData("/chat", {
      method: "POST",
      body: JSON.stringify({ text: userMessage.value })
    });

    // Replace loading message with response
    messages.value[messages.value.length - 1] = {
      type: "bot",
      text: response.response,
      isLoading: false,
      timestamp: new Date().toISOString()
    };

    // Save updated chat to LocalStorage
    saveChatLocally(messages.value);
    userMessage.value = "";
  } catch (error) {
    // Replace loading message with error
    messages.value[messages.value.length - 1] = {
      type: "bot",
      text: "Sorry, something went wrong.",
      isLoading: false
    };
  } finally {
    userMessage.value = "";
    scrollToBottom();
  }
};

// Scroll to the bottom of the chat box
const scrollToBottom = () => {
  setTimeout(() => {
    const chatBox = document.querySelector(".flex-1");
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 100);
};
</script>
