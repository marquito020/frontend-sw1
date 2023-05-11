import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { eventoGetById } from "../../models/eventos.model";
import { usuarios } from "../../models/usuarios.model";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import Card from "@/components/ui/Card";


import postImage from "@/assets/images/all-img/post-1.png";
import { createRegistroEvento, getRegistroEventoByPersona } from "../../models/registroEvento.model";
import { fotografosAceptadosGet } from "../../models/formularios.model";
import { rolesGet } from "../../models/roles.model";
import { contratarPost } from "../../models/contrataciones.model";

const CrearContratarFotografo = () => {
    const params = useParams();
    const [eventos, setEventos] = useState("");
    const [user, setUser] = useState("");
    const dataUser = Array.from(user);
    const [fotografos, setFotografos] = useState([]);
    const [registroEstado, setRegistroEstado] = useState(false);
    const [fotografo, setFotografo] = useState("");
    const [rolFotografo, setRolFotografo] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        eventoGetById(params.id).then(data => {
            console.log(data);
            setEventos(data);
        });
        usuarios().then(data => {
            console.log(data);
            setUser(data);
        });
        rolesGet().then(data => {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                if (data[i].nombre === "Fotografo") {
                    console.log(data[i]._id);
                    setRolFotografo(data[i]._id);
                }
            }
        });

        fotografosAceptadosGet().then(data => {
            console.log(data);
            setFotografos(data);
        });
        const user = localStorage.getItem("user") || "{}";
        const userObj = JSON.parse(user);
        getRegistroEventoByPersona(params.id, userObj._id).then(data => {
            console.log(data);
            if (data.length > 0) {
                setRegistroEstado(true);
            } else {
                setRegistroEstado(false);
            }
        });
    }, []);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: "all",
    });
    function ContratarFotografo() {
        if (fotografo === "") {
            alert("Seleccione un fotografo");
            return;
        }
        const data = {
            fotografo: fotografo,
            evento: eventos._id,
            rol: rolFotografo,
        };
        console.log(data);
        contratarPost(data).then(data => {
            console.log(data);
            navigate("/contratar-fotografo");
        });
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Card>
                        <div className="post-image mb-6">
                            <img
                                src={postImage}
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
                        <h5 className="card-title text-slate-900 dark:text-white">
                            {eventos.nombre}
                        </h5>
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
                            {/* Select Fotografo */}
                            <div className="mt-4 space-x-4 rtl:space-x-reverse">
                                <div className="flex items-center space-x-2">
                                    <span className="inline-flex leading-5 text-slate-500 dark:text-slate-400 text-sm font-normal">
                                        <Icon
                                            icon="heroicons-outline:camera"
                                            className="text-secondary-500 ltr:mr-2 rtl:ml-2 text-lg"
                                        />
                                        Fotografo
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <select
                                        className="
                        mt-1
                        block
                        w-full
                        pl-3
                        pr-10
                        py-2
                        text-base
                        border-gray-300
                        focus:outline-none
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        sm:text-sm
                        rounded-md
                        "
                                        {...register("persona")}
                                        onChange={(e) => setFotografo(e.target.value)}
                                    >
                                        <option value="">Seleccione un Fotografo</option>
                                        {fotografos.map((persona, index) => (
                                            <option key={index} value={persona.persona._id}>
                                                {persona.persona.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Unirme */}
                            <div className="mt-4 space-x-4 rtl:space-x-reverse">
                                <Button
                                    text="Contratar Fotografo"
                                    className="btn-outline-dark"
                                    onClick={ContratarFotografo}
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default CrearContratarFotografo;