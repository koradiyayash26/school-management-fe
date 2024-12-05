const TOKEN_KEY = "jwt_token";

const getToken = () => {
  const jwt_token = JSON.parse(localStorage.getItem(TOKEN_KEY));
  return jwt_token.access
};

const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export { getToken, setToken, clearToken };
