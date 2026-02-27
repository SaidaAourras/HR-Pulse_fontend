import api from "./api";

/**
 * Login function (rolled back to mock)
 */
export const login = async (credentials) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const mockToken = "mock_jwt_token_for_" + credentials.email;
    
    // Save in both localStorage AND cookie
    localStorage.setItem("token", mockToken);
    document.cookie = `token=${mockToken}; path=/; max-age=86400`;
    
    return { token: mockToken, user: { id: "1", fullName: "User Mock", email: credentials.email } };
};

/**
 * Register function (rolled back to mock)
 */
export const register = async (data) => {
    console.log("Mock register with:", data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, message: "Inscription réussie (Mock)" };
};

export const logout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; max-age=0";
};

export const isAuthenticated = () => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("token");
};

