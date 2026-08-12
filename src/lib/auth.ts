const AUTH_KEY = "durgas_admin_authenticated";
const DEFAULT_PASSWORD = "25122005";

export const auth = {
  login: async (password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (password === DEFAULT_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "true");
      return true;
    }
    return false;
  },

  logout: () => {
    sessionStorage.removeItem(AUTH_KEY);
  },

  isAuthenticated: (): boolean => {
    return sessionStorage.getItem(AUTH_KEY) === "true";
  },
};
