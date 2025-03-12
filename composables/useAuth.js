export const useAuth = () => {
    const token = useState('token', () => {
      if (process.server) return null; // No token on server side
      return localStorage.getItem('token') || null;
    });
  
    const setToken = (newToken) => {
      token.value = newToken;
      if (process.client) {
        localStorage.setItem('token', newToken);
      }
    };
  
    const clearToken = () => {
      token.value = null;
      if (process.client) {
        localStorage.removeItem('token');
      }
    };
  
    return { token, setToken, clearToken };
  };