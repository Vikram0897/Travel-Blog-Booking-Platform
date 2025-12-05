export const saveUser = (user) => {
  localStorage.setItem("travelUser", JSON.stringify(user));
};

export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("travelUser"));
  } catch {
    return null;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("travelUser");
};
