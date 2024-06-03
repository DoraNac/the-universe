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
    console.log("Create Universe Response:", data); // response
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
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // mode: "no-cors",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("No universe found");
      } else {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch universe");
      }
    }

    const data = await response.json();
    console.log("API Response Data:", data); //
    return data;
  } catch (error) {
    console.error("Error fetching universe:", error); //
    throw new Error(
      error.message || "An error occurred while fetching the universe"
    );
  }
};

// CREATE POST
export const createPost = async (formData) => {
  try {
    const token = getTokenFromCookies();

    const response = await fetch(`${BASE_URL}/api/posts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create post");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      error.message || "An error occurred while creating the post"
    );
  }
};

// GET POSTS BY USER ID
export const getPostsByUserId = async (userId) => {
  try {
    const token = getTokenFromCookies();
    const response = await fetch(`${BASE_URL}/api/posts/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return { posts: [] };
      } else {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch posts");
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error(error.message || "An error occurred while fetching posts");
  }
};

// UPDATE UNIVERSE
export const updateUniverse = async (id, formData) => {
  try {
    const token = getTokenFromCookies();
    const response = await fetch(`${BASE_URL}/api/universe/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    console.log(response);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update universe");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      error.message || "An error occurred while updating the universe"
    );
  }
};
