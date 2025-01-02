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
            class="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Right: Navigation and User Profile -->
        <div class="flex items-center space-x-6">
          <!-- Home Icon -->
          <button class="p-2 rounded-full hover:bg-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-6 h-6 text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2 2 7-7 7 7 2-2M5 12V7a2 2 0 012-2h10a2 2 0 012 2v5"
              />
            </svg>
          </button>

          <!-- Notification Icon -->
          <button class="p-2 rounded-full hover:bg-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-6 h-6 text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.019 2.019 0 0020 13V8a4 4 0 00-8 0v5a2.019 2.019 0 00-1.595 2.595L9 17h5M5 17H2l1.405-1.405A2.019 2.019 0 004 13V8a4 4 0 018 0v5a2.019 2.019 0 001.595 2.595L15 17H5z"
              />
            </svg>
          </button>

          <!-- Messages Icon -->
          <button class="p-2 rounded-full hover:bg-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-6 h-6 text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 10.5a7.5 7.5 0 10-15 0 7.5 7.5 0 0015 0zM12 3v3M12 18v3m9-9h-3M6 12H3m3.707-6.707L7.743 5.243M16.257 14.757l2.121 2.121M6 18l-2.121 2.121M16.257 7.243l-2.121-2.121"
              />
            </svg>
          </button>

          <!-- Profile Icon -->
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
