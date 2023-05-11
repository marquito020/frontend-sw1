import axios from "axios";

const login = async (email, password) => {
  const response = await axios.post("https://backend-sw1.fly.dev/login", {
    email: email,
    password: password,
  });
  /* console.log("🚀 ~ file: auth.model.js ~ line 8 ~ login ~ response", response); */
  const { token } = response.data;
  const { user } = response.data;
  const userInfo = JSON.stringify(user);
  /* console.log("🚀 ~ file: auth.model.js ~ line 11 ~ login ~ user", user); */
  localStorage.setItem("token", token);
  localStorage.setItem("user", userInfo);
  if (token) {
    return true;
  } else {
    return false;
  }
};

const registerUser = async (
  nombre,
  apellido,
  fechaNacimiento,
  genero,
  telefono,
  email,
  password,
  direccion,
  foto
) => {
  const response = await axios.post("https://backend-sw1.fly.dev/usuarios", {
    nombre: nombre,
    email: email,
    contraseña: password,
    nombrePersona: nombre,
    apellido: apellido,
    fechaNacimiento: fechaNacimiento,
    genero: genero,
    telefono: telefono,
    direccion: direccion,
    foto: foto,
  });
  console.log("🚀 ~ file: auth.model.js ~ line 8 ~ login ~ response", response);
  if (response.status === 200) {
    return true;
  } else {
    return false;
  }
};
export { login, registerUser };
