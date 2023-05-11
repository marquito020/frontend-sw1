import axios from "axios";

const eventosGet = async () => {
  const response = await axios.get("https://backend-sw1.fly.dev/eventos");
  const { data } = response;
  /* console.log("🚀 ~ file: usuarios.model.js ~ line 8 ~ usuarios ~ data", data); */
  /* for (let i = 0; i < data.length; i++) {
        const element = data[i];
        console.log("🚀 ~ file: usuarios.model.js ~ line 10 ~ usuarios ~ element", element);
    } */
  return data;
};

const eventoGetById = async (id) => {
  const response = await axios.get(`https://backend-sw1.fly.dev/eventos/${id}`);
  const { data } = response;
  /* console.log("🚀 ~ file: usuarios.model.js ~ line 8 ~ usuarios ~ data", data); */
  /* for (let i = 0; i < data.length; i++) {
        const element = data[i];
        console.log("🚀 ~ file: usuarios.model.js ~ line 10 ~ usuarios ~ element", element);
    } */
  return data;
};

const eventosPost = async (data) => {
  const response = await axios.post("https://backend-sw1.fly.dev/eventos", {
    nombre: data.nombre,
    direccion: data.direccion,
    descripcion: data.descripcion,
    fechaInicio: data.fechaInicio,
    fechaFin: data.fechaFin,
    foto: data.foto,
    organizador: data.organizador,
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

const eventoOrganizadorGet = async (id) => {
  const response = await axios.get(
    `https://backend-sw1.fly.dev/eventos/organizador/${id}`
  );
  const { data } = response;
  /* console.log("🚀 ~ file: usuarios.model.js ~ line 8 ~ usuarios ~ data", data); */
  /* for (let i = 0; i < data.length; i++) {
        const element = data[i];
        console.log("🚀 ~ file: usuarios.model.js ~ line 10 ~ usuarios ~ element", element);
    } */
  return data;
};

const qrEventoGet = async (id) => {
  const response = await axios.get(`https://backend-sw1.fly.dev/eventos/qr/${id}`);
  const { data } = response;
  return data;
};

export {
  eventosGet,
  eventosPost,
  eventoGetById,
  eventoOrganizadorGet,
  qrEventoGet,
};
