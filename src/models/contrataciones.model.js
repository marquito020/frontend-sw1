import axios from "axios";

const contratarGet = async () => {
  const response = await axios.get("https://backend-sw1.fly.dev/contrataciones/");
  const { data } = response;
  /* console.log("🚀 ~ file: usuarios.model.js ~ line 8 ~ usuarios ~ data", data); */
  /* for (let i = 0; i < data.length; i++) {
            const element = data[i];
            console.log("🚀 ~ file: usuarios.model.js ~ line 10 ~ usuarios ~ element", element);
        } */
  return data;
};

const contratarPost = async (data) => {
  const response = await axios.post("https://backend-sw1.fly.dev/contrataciones/", {
    persona: data.fotografo,
    evento: data.evento,
    rol: data.rol,
  });
  console.log(
    "🚀 ~ file: contrataciones.model.js ~ line 8 ~ contratarPost ~ response",
    response
  );
  if (response.status === 201) {
    return true;
  } else {
    return false;
  }
};

const contratacionesPersonaGet = async (id) => {
  const response = await axios.get(
    `https://backend-sw1.fly.dev/contrataciones/persona/${id}`
  );
  const { data } = response;
  /* console.log("🚀 ~ file: usuarios.model.js ~ line 8 ~ usuarios ~ data", data); */
  /* for (let i = 0; i < data.length; i++) {
                const element = data[i];
                console.log("🚀 ~ file: usuarios.model.js ~ line 10 ~ usuarios ~ element", element);
            } */
  return data;
};

export { contratarGet, contratarPost, contratacionesPersonaGet };
