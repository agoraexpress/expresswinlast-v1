import axios from "axios";
import { auth } from "@/lib/firebase";
import { getFunctions, httpsCallable } from "firebase/functions";

// For direct API calls to your server
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response && response.status === 401) {
      // Handle unauthorized access
      console.error("Unauthorized access");
    }
    return Promise.reject(error);
  },
);

// Firebase Cloud Functions
const functions = getFunctions();

// Example function calls
export const createOrder = httpsCallable(functions, "createOrder");
export const processPayment = httpsCallable(functions, "processPayment");
export const addLoyaltyPoints = httpsCallable(functions, "addLoyaltyPoints");

export default api;
