const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  const response = await axios.post('http://127.0.0.1:8000/refresh/', {
    refresh: refreshToken,
  });
  const newAccessToken = response.data.access;
  localStorage.setItem('access_token', newAccessToken);
  return newAccessToken;
};

const apiRequest = async (url, method = 'GET', data = null) => {
  let accessToken = localStorage.getItem('access_token');
  try {
    const response = await axios({
      url,
      method,
      data,
      headers: { Authorization: `Bearer ${accessToken}` },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      accessToken = await refreshAccessToken();
      if (!accessToken) return;
      const retryResponse = await axios({
        url,
        method,
        data,
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      });
      return retryResponse.data;
    } else {
      throw error;
    }
  }
};
const loginIcon = document.getElementById('loginIcon');
const fetchUser = async (accessToken) => {
  try {
    const userData = await apiRequest(
      'http://127.0.0.1:8000/users/fetch_user/'
    );
    return userData;
  } catch (error) {
    return null;
  }
};
const checkLogin = async () => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    const userData = await fetchUser(accessToken);
    loginIcon.innerHTML = `<div class="d-flex justify-content-center align-items-center m-3 gap-3"><p class="m-0">Hello <strong>${userData.username}</strong></p><a class="btn btn-danger" id="logoutBtn">Logout</a></div>`;
    document.getElementById('logoutBtn').addEventListener('click', logout);
  } else {
    if (window.location.pathname != '/index.html') {
      window.location.href = 'index.html';
    }
  }
};
const logout = async () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  alert('logged out!');
  window.location.href = 'index.html';
};

window.onload = checkLogin;
