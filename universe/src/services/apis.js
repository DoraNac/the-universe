import Cookies from "universal-cookie";

const BASE_URL = "https://super-blog-application-a8d092f788b3.herokuapp.com";

export const getTokenFromCookies = () => {
  const cookies = new Cookies();
  return cookies.get("token") || "";
};

// REGISTER
export const registerUser = async (name, email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Registration failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || "An error occurred during registration");
  }
};

// LOGIN
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Invalid email or password");
    }

    const data = await response.json();
    const cookies = new Cookies();
    cookies.set("token", data.token, {
      path: "/",
      secure: true,
      sameSite: "None",
    });

    return data;
  } catch (error) {
    throw new Error(error.message || "An error occurred during login");
  }
};

// CREATE UNIVERSE
export const createUniverse = async (formData) => {
  try {
    const token = getTokenFromCookies();
    const response = await fetch(`${BASE_URL}/api/universe`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create universe");
    }

    const data = await response.json();
    console.log("Create Universe Response:", data); // Log the response
    return data;
  } catch (error) {
    throw new Error(
      error.message || "An error occurred while creating the universe"
    );
  }
};

// GET ALL UNIVERSES
export const getAllUniverses = async () => {
  try {
    const token = getTokenFromCookies();
    const response = await fetch(`${BASE_URL}/api/universe`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch universes");
    }

    return await response.json();
  } catch (error) {
    throw new Error(
      error.message || "An error occurred while fetching universes"
    );
  }
};

// GET UNIVERSE BY ID
export const getUniverseById = async (id) => {
  try {
    const token = getTokenFromCookies();
    const response = await fetch(`${BASE_URL}/api/universe/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch universe");
    }

    return await response.json();
  } catch (error) {
    throw new Error(
      error.message || "An error occurred while fetching the universe"
    );
  }
};
