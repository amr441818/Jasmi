import axios from "axios";

const apiServiceCall = async ({
  url,
  method,
  body,
  headers,
}: {
  url: string;
  method?: string;
  body?: any;
  headers?: any;
}) => {
  console.log("api service call run");
  console.log("data we need to see", body);

  try {
    const response = await axios({
      method: method?.toUpperCase() || "GET",
      url: `https://aljasmi-staging-api.ahmedshawareb.dev/${url}`,
      data: body, // Replace body with data
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      // Spread any custom config passed to the function
    });

    return response?.data;
  } catch (error) {
    // Handle error (you could add more custom error handling here)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export default apiServiceCall;
