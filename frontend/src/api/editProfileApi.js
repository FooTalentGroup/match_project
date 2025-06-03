const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const USERS_URL = `${BASE_URL}/users`;

export const getUserById = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${USERS_URL}/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al obtener el usuario");
  }

  return res.json();
};

export const updateUserProfile = async (id, data) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${USERS_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al actualizar el usuario");
  }

  return res.json();
};
