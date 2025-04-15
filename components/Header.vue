<template>
  <header
    class="bg-gradient-to-r from-blue-400 to-blue-800 shadow-md rounded-lg m-2"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between py-4">
        <div class="flex items-center space-x-2">
          <img src="~/assets/images/bot.png" alt="bot" class="w-8 h-8" />
          <span class="font-bold font-mono text-2xl text-white">HELPIX</span>
        </div>

        <div class="flex items-center space-x-6">
          <button class="p-2 rounded-full hover:text-blue-600">
            <a href="/">CUSTOM</a>
          </button>

          <button class="p-2 rounded-full hover:text-blue-600">
            <a href="/gpt">GPT</a>
          </button>

          <button class="p-2 rounded-full hover:text-blue-600">
            <a href="image">DALL-E</a>
          </button>

          <div
            class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer"
          >
            <span class="font-semibold text-white"></span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<style>
.btn:hover {
  transform: scale(1.5);
  background: #000;
}
</style>
