import axios from "axios";

const fotosGet = async () => {
  const response = await axios.get("https://backend-sw1.fly.dev/fotos/");
  const { data } = response;
  /* console.log("🚀 ~ file: usuarios.model.js ~ line 8 ~ usuarios ~ data", data); */
  /* for (let i = 0; i < data.length; i++) {
            const element = data[i];
            console.log("🚀 ~ file: usuarios.model.js ~ line 10 ~ usuarios ~ element", element);
        } */
  return data;
};

const fotosPost = async (data) => {
  const response = await axios.post("https://backend-sw1.fly.dev/fotos/", {
    listaImagenOriginales: data.listaImagenOriginal,
    precio: data.precio,
    evento: data.evento,
    fotografo: data.fotografo,
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

export { fotosGet, fotosPost };
