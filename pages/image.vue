<template>
  <div class="flex flex-col bg-transparent h-full pb-4 mt-4">
    <div
      class="flex justify-center items-center mx-3 my-2 text-lg text-blue-500 w-full"
    >
      <h1 class="text-2xl font-semibold">Image Generation</h1>
    </div>

    <!-- Image Upload Section -->
    <div class="flex justify-center items-center space-x-4 mb-4 px-4">
      <input
        type="file"
        ref="fileInput"
        @change="handleFileUpload"
        accept="image/png"
        class="hidden"
      />
      <button
        @click="$refs.fileInput.click()"
        class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        :disabled="isLoading"
      >
        Upload Image
      </button>
      <span v-if="uploadedFileName" class="text-sm text-gray-600">
        {{ uploadedFileName }}
      </span>
      <span class="text-sm text-gray-500"> (PNG format only, max 4MB) </span>
    </div>

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
            class="bg-gray-200 text-gray-800 border border-gray-300 border-solid border-2 rounded-lg w-fit"
          >
            <div v-if="message.text">
              <p class="p-3 rounded-lg inline-block">
                {{ message.text }}
              </p>
            </div>
            <div v-if="message.image" class="p-3">
              <img
                :src="message.image"
                alt="Generated Image"
                class="h-[200px] w-[200px] rounded-lg"
              />
              <button
                v-if="message.downloadInfo"
                @click="downloadImage(message.downloadInfo)"
                class="mt-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
              >
                Download Image
              </button>
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
import { ref } from "vue";
import { useApi } from "~/composables/useApi";

const { fetchData, isLoading, errorMessage } = useApi();
const userMessage = ref("");
const messages = ref([]);
const uploadedFileName = ref("");

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Check file type
  if (file.type !== "image/png") {
    messages.value.push({
      type: "bot",
      text: "Please upload a PNG image file.",
      isLoading: false
    });
    return;
  }

  // Check file size (4MB = 4 * 1024 * 1024 bytes)
  if (file.size > 4 * 1024 * 1024) {
    messages.value.push({
      type: "bot",
      text: "Image size must be less than 4MB.",
      isLoading: false
    });
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("http://127.0.0.1:8000/upload-image", {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      uploadedFileName.value = data.filename;
      messages.value.push({
        type: "bot",
        text: "Image uploaded successfully! You can now generate variations or edit this image.",
        isLoading: false
      });
    }
  } catch (error) {
    console.error("Upload error:", error);
    messages.value.push({
      type: "bot",
      text: "Failed to upload image. Please try again.",
      isLoading: false
    });
  }
};

const sendMessage = async () => {
  if (userMessage.value.trim() === "") return;

  messages.value.push({ type: "user", text: userMessage.value });
  messages.value.push({ type: "bot", isLoading: true });

  try {
    const response = await fetchData("/generate-image", {
      method: "POST",
      body: JSON.stringify({
        text: userMessage.value,
        uploaded_image: !!uploadedFileName.value
      })
    });

    messages.value[messages.value.length - 1] = {
      type: "bot",
      text: response.message,
      image: response.data.url,
      downloadInfo: response.data.download,
      isLoading: false
    };

    // Clear the uploaded file name after generating
    uploadedFileName.value = "";
  } catch (error) {
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

const downloadImage = (downloadInfo) => {
  if (!downloadInfo || !downloadInfo.base64) return;

  // Create a link element
  const link = document.createElement("a");
  link.href = `data:image/png;base64,${downloadInfo.base64}`;
  link.download = downloadInfo.filename || "generated-image.png";

  // Append to body, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const scrollToBottom = () => {
  setTimeout(() => {
    const chatBox = document.querySelector(".flex-1");
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 100);
};
</script>
