import React, { useEffect, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { eventoGetById, qrEventoGet } from "../../models/eventos.model";
import { usuarios } from "../../models/usuarios.model";
import Button from "@/components/ui/Button";
import Fileinput from "@/components/ui/Fileinput";
import Icon from "@/components/ui/Icon";
import { Link } from "react-router-dom";
import Textinput from "@/components/ui/Textinput";

import Card from "@/components/ui/Card";


import postImage from "@/assets/images/all-img/post-1.png";
import { createRegistroEvento, getRegistroEvento, getRegistroEventoByPersona } from "../../models/registroEvento.model";
import { fotosPost } from "../../models/fotos.model";

const FotografoEventosInfo = () => {
    const params = useParams();
    const [eventos, setEventos] = useState("");
    const [user, setUser] = useState("");
    const dataUser = Array.from(user);
    const [registroEventoPersona, setRegistroEventoPersona] = useState("");
    const [registroEstado, setRegistroEstado] = useState(false);
    const [qr, setQR] = useState("");
    const [precio, setPrecio] = useState(0.0);
    const navigate = useNavigate();

    const [fotos, setFotos] = useState([]);
    const [listaFotosOriginales, setListaFotosOriginales] = useState([]);
    const handleFileChangeMultiple2 = (e) => {
        const files = e.target.files;
        const filesArray = Array.from(files).map((file) => file);
        setFotos(filesArray);
    };

    useEffect(() => {
        eventoGetById(params.id).then(data => {
            console.log(data);
            setEventos(data);
        });
        usuarios().then(data => {
            console.log(data);
            setUser(data);
        });
        qrEventoGet(params.id).then(data => {
            /* console.log(data); */
            setQR(data);
        });
        const user = localStorage.getItem("user") || "{}";
        const userObj = JSON.parse(user);
        getRegistroEventoByPersona(params.id, userObj._id).then(data => {
            console.log(data);
            setRegistroEventoPersona(data);
            if (data.length > 0) {
                setRegistroEstado(true);
            } else {
                setRegistroEstado(false);
            }
        });
    }, []);

    function subirFoto() {
        /* console.log(precio)
        console.log(fotos); */
        if (fotos.length == 0 || precio == 0.0) {
            alert("Seleccione Fotos o Insertar Precio");
        } else {
            /* Arryar listaFotosOriginales */
            for (let index = 0; index < fotos.length; index++) {
                const foto = fotos[index];
                const formData = new FormData();
                formData.append("file", foto);
                formData.append("upload_preset", "ufp8irtp");
                formData.append("cloud_name", "dg2ugi96k");

                fetch("https://api.cloudinary.com/v1_1/dg2ugi96k/image/upload", {
                    method: "post",
                    body: formData,
                })
                    .then((res) => res.json())
                    .then((imagen) => {
                        /* console.log(imagen);
                        const user = localStorage.getItem("user") || "{}";
                        const userObj = JSON.parse(user);
                        const data = {
                            imagenOriginal: imagen.url,
                            precio: precio,
                            evento: params.id,
                            fotografo: userObj._id
                        }
                        fotosPost(data) */
                        setListaFotosOriginales((prevState) => [...prevState, imagen.url]);
                    }).catch((err) => {
                        console.log(err);
                    });
                if (index == fotos.length - 1) {

                    console.log("Lista");
                    console.log(listaFotosOriginales);
                    const user = localStorage.getItem("user") || "{}";
                    const userObj = JSON.parse(user);
                    const data = {
                        listaImagenOriginal: listaFotosOriginales,
                        precio: precio,
                        evento: params.id,
                        fotografo: userObj._id
                    }
                    console.log(data);
                    if (listaFotosOriginales.length == 0) {
                        alert("Error Vuelva a Intentarlo");
                    } else {
                        fotosPost(data).then(data => {
                            console.log(data);
                            alert("Fotos Subidas Correctamente");
                            navigate("/fotografo-eventos");
                        });
                    }
                }
            }
            /* alert("Fotos Subidas Correctamente");
            navigate("/fotografo-eventos"); */
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Card>
                        <div className="post-image mb-6">
                            <img
                                src={eventos.foto}
                                alt=""
                                className=" w-full h-full block object-cover"
                            />
                        </div>
                        <div className="flex justify-between mb-4">
                            <Link to="#">
                                <span className="inline-flex leading-5 text-slate-500 dark:text-slate-400 text-sm font-normal">
                                    <Icon
                                        icon="heroicons-outline:calendar"
                                        className="text-secondary-500 ltr:mr-2 rtl:ml-2 text-lg"
                                    />
                                    {eventos.fechaInicio} - {eventos.fechaFin}
                                </span>
                            </Link>
                        </div>
                        <h6 className="card-title text-slate-900 dark:text-white">
                            Evento: {eventos.nombre}
                            <img
                                src={qr.foto}
                                alt=""
                                className=" w-200 h-200 block object-cover"
                            />
                        </h6>
                        <div className="flex justify-between mb-4 mt-4">
                            <Link to="#">
                                <span className="inline-flex leading-5 text-slate-500 dark:text-slate-400 text-sm font-normal">
                                    <Icon
                                        icon="heroicons-outline:location-marker"
                                        className="text-secondary-500 ltr:mr-2 rtl:ml-2 text-lg"
                                    />
                                    {eventos.direccion}
                                </span>
                            </Link>
                        </div>
                        {/* Organizador */}
                        <div className="flex justify-between mb-4 mt-4">
                            <Link to="#">
                                <span className="inline-flex leading-5 text-slate-500 dark:text-slate-400 text-sm font-normal">
                                    <Icon
                                        icon="heroicons-outline:user"
                                        className="text-secondary-500 ltr:mr-2 rtl:ml-2 text-lg"
                                    />
                                    {dataUser.map((user, i) => {
                                        if (user._id === eventos.organizador) {
                                            return user.nombre;
                                        }
                                    })}
                                </span>
                            </Link>
                        </div>
                        <div className="card-text mt-4">
                            <p>
                                {eventos.descripcion}
                            </p>
                        </div>
                        {/* Input Precio */}


                        <div className="mt-4">
                            {/* Subir Foto */}
                            <h6 className="card-title text-slate-900 dark:text-white">
                                Subir Fotos
                            </h6>
                            <Fileinput
                                name="basic"
                                selectedFiles={fotos}
                                label="Subir Fotos"
                                onChange={handleFileChangeMultiple2}
                                multiple
                                preview
                            />
                        </div>
                        <Textinput
                            label="Precio"
                            id="precio"
                            type="number"
                            value={precio}
                            onChange={(e) => setPrecio(parseFloat(e.target.value))}
                            placeholder="Management dashboard "
                        />
                        <Button
                            text="Subir Fotos"
                            className="btn-outline-dark mt-4"
                            onClick={subirFoto}
                        />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default FotografoEventosInfo;