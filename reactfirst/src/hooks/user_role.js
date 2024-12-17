import jwt_decode from "jwt-decode";

export const getUserRole = (token) => {
  try {
    const decoded = jwt_decode(token);
    return decoded.role; // Вернёт "USER", "ADMIN" или "HOTELIER"
  } catch (error) {
    console.error("Ошибка при декодировании токена", error);
    return null;
  }
};
