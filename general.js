// const loginIcon = document.getElementById('loginIcon');
// const fetchUser = async (accessToken) => {
//   const response = await axios.get('http://127.0.0.1:8000/users/fetch_user/', {
//     headers: { Authorization: `Bearer ${accessToken}` },
//     withCredentials: true,
//   });
//   const userData = response.data;
//   return userData;
// };
// const checkLogin = async () => {
//   const accessToken = sessionStorage.getItem('access_token');
//   if (accessToken) {
//     const userData = await fetchUser(accessToken);
//     loginIcon.innerHTML = `<div class="d-flex justify-content-center align-items-center m-3 gap-3"><p class="m-0">Hello <strong>${userData.username}</strong></p><a href="./myTasks.html?user=${userData.id}" class=" btn btn-primary ">
//         My Tasks
//       </a><a class="btn btn-danger" id="logoutBtn">Logout</a></div>`;
//   } else {
//     loginIcon.innerHTML = `<a href="./login.html" class="btn-primary">
//         <i class="bi bi-person-circle me-5" style="font-size: 24px"></i>
//       </a>`;
//   }
// };
// window.onload = checkLogin;
