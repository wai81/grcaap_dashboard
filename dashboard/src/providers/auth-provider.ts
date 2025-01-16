import { AuthProvider } from "@refinedev/core";

// Assuming OnErrorResponse is defined elsewhere  
type OnErrorResponse = {  
    logout?: boolean;  
    error?: Error;  // Required structure for the error property  
  };  

export const authProvider: AuthProvider = {
  getIdentity: async () => {
        const token = localStorage.getItem("my_access_token");  

        const headers: HeadersInit = {  
            ...(token ? { Authorization: token } : {}), // Use token only if it's truthy  
          };  

        const response = await fetch("https://api.fake-rest.refine.dev/auth/me", {
            headers,
        });

        if (response.status < 200 || response.status > 299) {
            return null;
        }

        const data = await response.json();

        return data;
        },  
  check: async () => {
    // When logging in, we'll obtain an access token from our API and store it in the local storage.
    // Now let's check if the token exists in the local storage.
    // In the later steps, we'll be implementing the `login` and `logout` methods.
    const token = localStorage.getItem("my_access_token");

    return { authenticated: Boolean(token) };
  },
  login: async ({ email, password }) => {
    const response = await fetch(
        "https://api.fake-rest.refine.dev/auth/login",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
  
      const data = await response.json();
  
      if (data.token) {
        localStorage.setItem("my_access_token", data.token);
        return { success: true, redirectTo: "/" };
      }
  
      return { success: false };
  },
  logout: async () => {
    localStorage.removeItem("my_access_token");
    // Let's redirect to the login page after a successful logout.
    return { success: true, redirectTo: "/login" };
  },
  onError: async (error : { status?: number }): Promise<OnErrorResponse> => {
    if (error?.status === 401) {
        return {
          logout: true,
          error: new Error("Unauthorized")//{ message: "Unauthorized" },
        };
      }
  
      return {};
  },
  // ...
};