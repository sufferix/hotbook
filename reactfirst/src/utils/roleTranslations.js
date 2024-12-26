const roleTranslations = {
    ADMIN: "Администратор",
    USER: "Пользователь",
    HOTELIER: "Владелец отеля",
  };
  
  export const translateRole = (role) => {
    return roleTranslations[role] || "Неизвестная роль";
  };
  