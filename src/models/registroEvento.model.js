import axios from "axios";

const createRegistroEvento = async (data) => {
  const response = await axios.post("https://backend-sw1.fly.dev/registros", {
    persona: data.usuario,
    evento: data.evento,
  });
  console.log(
    "🚀 ~ file: eventos.model.js ~ line 8 ~ eventosPost ~ response",
    response
  );
  if (response.status === 201) {
    return true;
  } else {
    return false;
  }
};

const getRegistroEvento = async (id) => {
  const response = await axios.get("https://backend-sw1.fly.dev/registros");
  const { data } = response;
  console.log("🚀 ~ file: eventos.model.js ~ line 8 ~ eventosGet ~ data", data);
  return data;
};

const getRegistroEventoById = async (id) => {
  const response = await axios.get("https://backend-sw1.fly.dev/registros/" + id);
  const { data } = response;
  console.log("🚀 ~ file: eventos.model.js ~ line 8 ~ eventosGet ~ data", data);
  return data;
};

const getRegistroEventoByPersona = async (id, persona) => {
  const response = await axios.post(`https://backend-sw1.fly.dev/registros/evento/${id}`,{
    persona: persona
  });
  const { data } = response;
  console.log("🚀 ~ file: eventos.model.js ~ line 8 ~ eventosGet ~ data", data);
  return data;
};

export { createRegistroEvento, getRegistroEvento, getRegistroEventoById, getRegistroEventoByPersona };
