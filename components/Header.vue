<template>
  <header
    class="bg-gradient-to-r from-blue-400 to-blue-800 shadow-md rounded-lg m-2"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between py-4">
        <!-- Left: Logo / App Name -->
        <div class="flex items-center space-x-2">
          <img src="~/assets/images/bot.png" alt="bot" class="w-8 h-8" />
          <span class="font-bold font-mono text-2xl text-white">CHATIX</span>
        </div>

        <!-- Center: Search Bar -->
        <div
          class="flex items-center space-x-4 flex-1 max-w-xs sm:max-w-md lg:max-w-lg"
        >
          <input
            type="text"
            placeholder="Search"
            class="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-500"
          />
        </div>

        <!-- Right: Navigation and User Profile -->
        <div class="flex items-center space-x-6">
          <button class="p-2 rounded-full hover:bg-blue-500">
            <a href="/">CUSTOM</a>
          </button>

          <button class="p-2 rounded-full hover:bg-blue-500">
            <a href="/gpt">GPT-4</a>
          </button>

          <button class="p-2 rounded-full hover:bg-blue-500">
            <a href="image">DALL-E</a>
          </button>

          <div
            class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer"
          >
            <span class="font-semibold text-white">U</span>
            <!-- User initials or Image -->
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
// You can add any necessary logic here
</script>

<style scoped>
/* Custom styling can go here */
</style>
