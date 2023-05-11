import axios from "axios";

const usuarios = async () => {
  const response = await axios.get("https://backend-sw1.fly.dev/usuarios");
  const { data } = response;
  /* console.log("🚀 ~ file: usuarios.model.js ~ line 8 ~ usuarios ~ data", data); */
  /* for (let i = 0; i < data.length; i++) {
        const element = data[i];
        console.log("🚀 ~ file: usuarios.model.js ~ line 10 ~ usuarios ~ element", element);
    } */
  return data;
};

const usuarioById = async (id) => {
  const response = await axios.get(`https://backend-sw1.fly.dev/usuarios/${id}`);
  const { data } = response;
  /* console.log("🚀 ~ file: usuarios.model.js ~ line 8 ~ usuarios ~ data", data); */
  /* for (let i = 0; i < data.length; i++) {
        const element = data[i];
        console.log("🚀 ~ file: usuarios.model.js ~ line 10 ~ usuarios ~ element", element);
    } */
  return data;
};

export { usuarios, usuarioById };
