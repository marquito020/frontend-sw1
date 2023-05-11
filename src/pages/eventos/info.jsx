import React, { useEffect, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { eventoGetById, qrEventoGet } from "../../models/eventos.model";
import { usuarios } from "../../models/usuarios.model";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Link } from "react-router-dom";

import Card from "@/components/ui/Card";


import postImage from "@/assets/images/all-img/post-1.png";
import { createRegistroEvento, getRegistroEvento, getRegistroEventoByPersona } from "../../models/registroEvento.model";

const InfoEvento = () => {
    const params = useParams();
    const [eventos, setEventos] = useState("");
    const [user, setUser] = useState("");
    const dataUser = Array.from(user);
    const [registroEventoPersona, setRegistroEventoPersona] = useState("");
    const [registroEstado, setRegistroEstado] = useState(false);
    const [qr, setQR] = useState("");
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
        qrEventoGet(params.id).then(data => {
            console.log(data);
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

    function unirseEvento() {
        const user = localStorage.getItem("user") || "{}";
        const userObj = JSON.parse(user);
        console.log(userObj._id);
        const data = {
            usuario: userObj._id,
            evento: eventos._id,
        };
        console.log(data);
        createRegistroEvento(data).then(data => {
            console.log(data);
            alert("Te has unido al evento");
            if (data) {
                navigate("/eventos");
            }
        });
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Card>
                        <div className="flex flex-row">
                            <div className="mr-5">
                                <div className="post-image mb-6">
                                    <img
                                        src={eventos.foto}
                                        alt=""
                                        className=" w-full h-full block object-cover"
                                    />
                                </div>
                            </div>
                            <div>
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
                                    <img
                                        src={qr.foto}
                                        alt=""
                                        className=" w-200 h-200 block object-cover"
                                    />
                                </h5>
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
                                    {/* Unirme */}
                                    <div className="mt-4 space-x-4 rtl:space-x-reverse">
                                        {registroEstado ? (
                                            <div className="flex items-center space-x-2">
                                                <span className="inline-flex leading-5 text-slate-500 dark:text-slate-400 text-sm font-normal">
                                                    <Icon
                                                        icon="heroicons-outline:check-circle"
                                                        className="text-secondary-500 ltr:mr-2 rtl:ml-2 text-lg"
                                                    />
                                                    Ya te has unido a este evento
                                                </span>
                                            </div>
                                        ) : (
                                            <Button
                                                text="Unirme"
                                                className="btn-outline-dark"
                                                onClick={unirseEvento}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default InfoEvento;