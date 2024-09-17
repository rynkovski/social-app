import api from "@/utils/api";

export const verifyToken = async (token: { token: string | null }) => {
  try {
    const response = await api.post("/token/verify/", token);
    if (response.status === 200) {
      // setAuthorized(true);
    } else {
      // setAuthorized(false);
    }
  } catch (error) {
    console.error("Error verifying token:", error);
  }
};
