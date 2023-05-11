import axios from "axios";

const facturaGet = async () => {
    const response = await axios.get("https://backend-sw1.fly.dev/facturas");
    const { data } = response;
    /* console.log("🚀 ~ file: usuarios.model.js ~ line 8 ~ usuarios ~ data", data); */
    /* for (let i = 0; i < data.length; i++) {
            const element = data[i];
            console.log("🚀 ~ file: usuarios.model.js ~ line 10 ~ usuarios ~ element", element);
        } */
    return data;
};

const facturaPost = async (data) => {
    const response = await axios.post("https://backend-sw1.fly.dev/facturas", {
        listaFotos: data.listaFotos,
        precioTotal: data.precioTotal,
        persona: data.persona,
        numeroTarjeta: data.numeroTarjeta,
        mesVencimientoTarjeta: data.mesVencimientoTarjeta,
        anioVencimientoTarjeta: data.anioVencimientoTarjeta,
        codigoSeguridadTarjeta: data.codigoSeguridadTarjeta,
        titularTarjeta: data.titularTarjeta,
    });
    console.log( "🚀 ~ file: eventos.model.js ~ line 8 ~ eventosPost ~ response", response );
    if (response.status === 201) {
        return true;
    } else {
        return false;
    }
};

const facturaPersonaGet = async (id) => {
    const response = await axios.get(`https://backend-sw1.fly.dev/facturas/persona/${id}`);
    const { data } = response;
    /* console.log("🚀 ~ file: usuarios.model.js ~ line 8 ~ usuarios ~ data", data); */
    /* for (let i = 0; i < data.length; i++) {
            const element = data[i];
            console.log("🚀 ~ file: usuarios.model.js ~ line 10 ~ usuarios ~ element", element);
        } */
    return data;
};

export { facturaGet, facturaPost, facturaPersonaGet };