export const setAuth = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const getAuth = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  return { token, user };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
