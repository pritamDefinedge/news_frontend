import axios from "axios";

// Helper function to retrieve access token
const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

class _ApiRequest {
  // Define the content types for headers
  post_header = "multipart/form-data";
  get_header = "application/json";

  // Method to make POST requests
  postRequest = async ({ url = null, data = null, header = "form" }) => {
    try {
      console.log('Making POST request to:', url);
      console.log('Request data:', data);
      console.log('Request headers:', {
        "Content-Type": header === "form" ? this.post_header : this.get_header,
        Authorization: `Bearer ${getAccessToken()}`
      });

      const token = getAccessToken();
      const response = await axios({
        method: "post",
        url: url,
        headers: {
          "Content-Type":
            header === "form" ? this.post_header : this.get_header,
          Authorization: `Bearer ${token}`,
        },
        data: data,
      });
      console.log('Response:', response.data);
      return response.data;
    } catch (e) {
      console.error("Error in postRequest:", e);
      console.error("Error response:", e.response?.data);
      
      let errorMessage = "An error occurred";
      
      if (e.response?.data) {
        if (typeof e.response.data === 'string') {
          const errorMessageMatch = e.response.data.match(/Error: (.*?)(?:<|$)/);
          errorMessage = errorMessageMatch ? errorMessageMatch[1].trim() : e.response.data;
        } else if (typeof e.response.data === 'object') {
          errorMessage = e.response.data.message || e.response.data.error || "An error occurred";
        }
      } else if (e.message) {
        errorMessage = e.message;
      }

      // console.error("Error message", errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  // Method to make GET requests
  getRequest = async ({ url = null }) => {
    try {
      console.log('Making GET request to:', url);
      const token = getAccessToken(); // Get access token
      console.log('Using token:', token ? 'Token exists' : 'No token');
      
      const response = await axios({
        method: "get",
        url: url,
        headers: {
          "Content-Type": this.get_header,
          Authorization: `Bearer ${token}`, // Attach token to the header
        },
      });

      console.log('GET Response:', response.data);
      return response.data; // Return the response data directly
    } catch (e) {
      console.error("Error in getRequest:", e);
      console.error("Error response:", e.response?.data);
      
      let errorMessage = "An error occurred";
      
      if (e.response?.data) {
        if (typeof e.response.data === 'string') {
          errorMessage = e.response.data;
        } else if (typeof e.response.data === 'object') {
          errorMessage = e.response.data.message || e.response.data.error || "An error occurred";
        }
      } else if (e.message) {
        errorMessage = e.message;
      }

      return { success: false, message: errorMessage };
    }
  };

  // Method to make PUT requests
  putRequest = async ({ url = null, data = null, header = "form" }) => {
    console.log("Making PUT request to:", url);
    console.log("Request data:", data);
    
    try {
      const token = getAccessToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // If data is FormData, don't set Content-Type header
      // Let the browser set it automatically with the boundary
      if (!(data instanceof FormData)) {
        headers["Content-Type"] = header === "form" ? this.post_header : this.get_header;
      }

      
      console.log("Request headers:", headers);

      const response = await axios({
        method: "put",
        url: url,
        headers: headers,
        data: data,
      });
      
      console.log("PUT Response:", response.data);
      return response.data;
    } catch (e) {
      console.error("Error in putRequest:", e);
      console.error("Error response:", e.response?.data);
      
      let errorMessage = "An error occurred";
      
      if (e.response?.data) {
        if (typeof e.response.data === 'string') {
          const errorMessageMatch = e.response.data.match(/Error: (.*?)(?:<|$)/);
          errorMessage = errorMessageMatch ? errorMessageMatch[1].trim() : e.response.data;
        } else if (typeof e.response.data === 'object') {
          errorMessage = e.response.data.message || e.response.data.error || "An error occurred";
        }
      } else if (e.message) {
        errorMessage = e.message;
      }

      return { success: false, message: errorMessage };
    }
  };

 
  // Method to make DELETE requests
  deleteRequest = async ({ url = null, data = null, header = "form" }) => {
    try {
      console.log("data", data);
      console.log("header", header);
      const token = getAccessToken();
      const axiosConfig = {
        method: "delete",
        url: url,
        headers: {
          "Content-Type":
            header === "form" ? this.post_header : this.get_header,
          Authorization: `Bearer ${token}`,
        },
      };

      if (data) {
        axiosConfig.data = data;
      }

      const response = await axios(axiosConfig);
      return response.data;
    } catch (e) {
      console.error("Error in deleteRequest:", e); 
      return { success: false, message: e.message }; 
    }
  };
}

export const ApiRequest = new _ApiRequest();
