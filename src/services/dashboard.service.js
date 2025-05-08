import { api_url } from "../utils/Constants";
import { ApiRequest } from "../utils/apiRequest";

export const getDashboard = async () => {
  try {
    const response = await ApiRequest.getRequest({
      url: `${api_url}/dashboard`,
    });

    if (response?.success) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        message: response?.message || "Failed to fetch dashboard data",
      };
    }
  } catch (error) {
    console.error("Dashboard Service Error:", error);
    return {
      success: false,
      message: error.message || "An error occurred while fetching dashboard data",
    };
  }
}; 