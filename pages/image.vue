<template>
  <div class="flex flex-col bg-transparent h-full pb-4 mt-4">
    <div
      class="flex-1 overflow-y-auto overflow-hidden scrollbar-hidden h-[calc(90vh)]"
    >
      <div v-for="(message, index) in messages" :key="index">
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
            class="bg-gray-200 text-gray-800 border border-gray-300 border-solid border-2 rounded-lg w-[200px] h-[200px] max-w-[calc(30%)]"
          >
            <div v-if="message.text">
              <p class="p-3 rounded-lg inline-block">
                {{ message.text }}
              </p>
            </div>
            <div v-if="message.image">
              <img
                :src="message.image"
                alt="Generated Image"
                class="h-[100px] w-[100px] rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex p-4 space-x-2">
      <input
        v-model="userMessage"
        @keyup.enter="sendMessage"
        type="text"
        placeholder="Type a message..."
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
import { ref } from "vue";
import { useApi } from "~/composables/useApi";

const { fetchData, isLoading, errorMessage } = useApi();
const userMessage = ref("");
const messages = ref([]);

const sendMessage = async () => {
  if (userMessage.value.trim() === "") return;

  // Add user message
  messages.value.push({ type: "user", text: userMessage.value });

  // Add loading message
  messages.value.push({ type: "bot", isLoading: true });

  try {
    // Send message to API
    const response = await fetchData("/generate-image", {
      method: "POST",
      body: JSON.stringify({ text: userMessage.value })
    });

    // Replace loading message with response
    messages.value[messages.value.length - 1] = {
      type: "bot",
      text: response.response,
      image: response.url || null,
      isLoading: false
    };
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

const scrollToBottom = () => {
  setTimeout(() => {
    const chatBox = document.querySelector(".flex-1");
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 100);
};
</script>
