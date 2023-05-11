import axios from "axios";

const rolesGet = async () => {
  const response = await axios.get("https://backend-sw1.fly.dev/roles");
  const { data } = response;
  /* console.log("🚀 ~ file: usuarios.model.js ~ line 8 ~ usuarios ~ data", data); */
  /* for (let i = 0; i < data.length; i++) {
            const element = data[i];
            console.log("🚀 ~ file: usuarios.model.js ~ line 10 ~ usuarios ~ element", element);
        } */
  return data;
};

const rolesPost = async (nombre, descripcion) => {
  const response = await axios.post("https://backend-sw1.fly.dev/roles", {
    nombre: nombre,
    descripcion: descripcion,
  });
  console.log(
    "🚀 ~ file: eventos.model.js ~ line 8 ~ eventosPost ~ response",
    response
  );
  if (response.status === 200) {
    return true;
  } else {
    return false;
  }
};

export { rolesGet, rolesPost };
