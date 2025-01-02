import { ref } from "vue";

const apiBaseUrl = "http://127.0.0.1:8000";

export function useApi() {
  const isLoading = ref(false);
  const errorMessage = ref("");
  const data = ref(null);

  const fetchData = async (endpoint: string, options: RequestInit = {}) => {
    isLoading.value = true;
    errorMessage.value = "";

    try {
      const response = await fetch(`${apiBaseUrl}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Request failed");
      }

      data.value = await response.json();
      return data.value;
    } catch (error) {
      errorMessage.value =
        (error as Error).message || "An error occurred during the request";
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    fetchData,
    isLoading,
    errorMessage,
    data,
  };
}
