import axios from "axios";

const formulariosGet = async () => {
  const response = await axios.get("https://backend-sw1.fly.dev/formularios");
  const { data } = response;
  /* console.log("🚀 ~ file: usuarios.model.js ~ line 8 ~ usuarios ~ data", data); */
  /* for (let i = 0; i < data.length; i++) {
            const element = data[i];
            console.log("🚀 ~ file: usuarios.model.js ~ line 10 ~ usuarios ~ element", element);
        } */
  return data;
};

const createFormulario = async (descripcion, rol) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const response = await axios.post("https://backend-sw1.fly.dev/formularios", {
    descripcion: descripcion,
    estado: "Pendiente",
    rol: rol,
    persona: userId,
  });
  console.log(
    "🚀 ~ file: formulario.model.js ~ line 8 ~ createFormulario ~ response",
    response
  );
  if (response.status === 201) {
    return true;
  } else {
    return false;
  }
};

const aceptarFormulario = async (id) => {
  const response = await axios.put(`https://backend-sw1.fly.dev/formularios/${id}`, {
    estado: "Aceptado",
  });
  console.log(
    "🚀 ~ file: formulario.model.js ~ line 8 ~ createFormulario ~ response",
    response
  );
  if (response.status === 200) {
    return true;
  } else {
    return false;
  }
};

const peronaRolFormulario = async (id) => {
  const response = await axios.get(
    `https://backend-sw1.fly.dev/formularios/persona/rol/${id}`
  );
  const { data } = response;
  /* console.log("🚀 ~ file: usuarios.model.js ~ line 8 ~ usuarios ~ data", data); */
  /* for (let i = 0; i < data.length; i++) {
                const element = data[i];
                console.log("🚀 ~ file: usuarios.model.js ~ line 10 ~ usuarios ~ element", element);
            } */
  return data;
};

const fotografosAceptadosGet = async () => {
  const response = await axios.get(
    `https://backend-sw1.fly.dev/formularios/fotografo/persona`
  );
  const { data } = response;
  /* console.log("🚀 ~ file: usuarios.model.js ~ line 8 ~ usuarios ~ data", data); */
  /* for (let i = 0; i < data.length; i++) {
                const element = data[i];
                console.log("🚀 ~ file: usuarios.model.js ~ line 10 ~ usuarios ~ element", element);
            } */
  return data;
};

export {
  formulariosGet,
  createFormulario,
  aceptarFormulario,
  peronaRolFormulario,
  fotografosAceptadosGet,
};
