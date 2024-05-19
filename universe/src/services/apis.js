// import { getTokenFromCookies } from "./utils/cookies";
const BASE_URL = "https://super-blog-application-a8d092f788b3.herokuapp.com";


///REGISTER

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

///LOGIN



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
      document.cookie = `token=${data.token}; path=/; Secure; HttpOnly`;
  
      return data;
    } catch (error) {
      throw new Error(error.message || "An error occurred during login");
    }
  };
  


/// CREATE UNIVERSE




export const createUniverse = async (name, description, background) => {
  try {
    // const token = getTokenFromCookies();
    const response = await fetch(`${BASE_URL}/api/universe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        titleUniverse: name,
        backgroundUniverse: background,
        descriptionUniverse: description,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create universe");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || "An error occurred while creating the universe");
  }
};


