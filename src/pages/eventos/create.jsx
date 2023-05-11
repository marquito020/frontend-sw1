import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { useForm } from "react-hook-form";
import Fileinput from "@/components/ui/Fileinput";

import { eventosGet, eventosPost } from "../../models/eventos.model";
import { usuarios } from "../../models/usuarios.model";

const columns = [
    {
        label: "Nombre",
        field: "nombre",
    },
    {
        label: "Descripcion",
        field: "descripcion",
    },
    {
        label: "fecha Inicio",
        field: "fechaInicio",
    },

    {
        label: "fecha Fin",
        field: "fechaFin",
    },
];

const CreateEventos = () => {
    const [eventos, setEventos] = useState("");
    const [user, setUser] = useState("");
    const dataEvento = Array.from(eventos);
    const dataUser = Array.from(user);
    useEffect(() => {
        eventosGet().then(data => {
            console.log(data);
            setEventos(data);
        });
        usuarios().then(data => {
            console.log(data);
            setUser(data);
        });
    }, []);
    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [foto, setFoto] = useState("");

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        /* resolver: yupResolver(schema), */
        //
        mode: "all",
    });

    const handleFileChange2 = (e) => {
        setFoto(e.target.files[0]);
    };

    const onSubmit = async () => {
        const user = localStorage.getItem("user") || "{}";
        const userObj = JSON.parse(user);
        console.log(userObj._id);
        const formData = new FormData();
        formData.append("file", foto);
        formData.append("upload_preset", "ufp8irtp");
        formData.append("cloud_name", "dg2ugi96k");

        fetch("https://api.cloudinary.com/v1_1/dg2ugi96k/image/upload", {
            method: "post",
            body: formData,
        })
            .then((res) => res.json())
            .then(async (foto) => {
                console.log(foto);
                const data = {
                    nombre: nombre,
                    direccion: direccion,
                    fechaInicio: fechaInicio,
                    fechaFin: fechaFin,
                    descripcion: descripcion,
                    organizador: userObj._id,
                    foto: foto.url,
                };

                const response = await eventosPost(data);
                console.log(response);
                if (response) {
                    alert("Evento creado");
                    window.location.reload();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className=" space-y-5">
            <Modal
                title="Login Form Modal"
                label="Crear Evento"
                labelClass="btn-outline-dark"
                uncontrol
            >
                <div className="text-base text-slate-600 dark:text-slate-300">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <Textinput
                            label="Nombre"
                            type="text"
                            placeholder="Ingrese el nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                        <Textinput
                            label="Direccion"
                            type="text"
                            placeholder="Ingrese la direccion"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                        />
                        <Textinput
                            label="Fecha Inicio"
                            type="date"
                            placeholder="8+ characters, 1 capital letter"
                            register={register}
                            name="fechaInicio"
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                        />
                        <Textinput
                            label="Fecha Fin"
                            type="date"
                            register={register}
                            name="fechaFin"
                            value={fechaFin}
                            onChange={(e) => setFechaFin(e.target.value)}
                        />
                        {/* Subir Foto */}
                        <Fileinput
                            name="basic"
                            label="Subir Foto"
                            selectedFile={foto}
                            onChange={(e) => setFoto(e.target.files[0])}
                            preview
                        />
                        <Textinput
                            label="Descripcion"
                            type="text"
                            placeholder="Ingrese la descripcion"
                            register={register}
                            name="descripcion"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                        <Button
                            text="Accept"
                            className="btn-dark "
                            type="submit"
                        />
                    </form>
                </div>
            </Modal>
            <Card title="Eventos" noborder>
                {/* <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center">
                            <Button
                                className="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                            >
                                Nuevo Evento
                            </Button>
                        </div>
                    </div>
                </div> */}
                <div className="row">
                    <div className="col-12">
                        {eventos && (
                            <div className="overflow-hidden ">
                                <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                                    <thead className="bg-slate-200 dark:bg-slate-700">
                                        <tr>
                                            {columns.map((column, index) => (
                                                <th key={index} scope="col" className=" table-th " >{column.label}</th>
                                            ))}
                                            <th scope="col" className=" table-th ">
                                                Organizador
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                                        {dataEvento.map((item, index) => (
                                            <tr key={index} className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                                {columns.map((column, index) => (
                                                    <td key={index} className="table-td">{item[column.field]} </td>
                                                ))}
                                                <td className="table-td">
                                                    {dataUser.map((user, i) => {
                                                        if (user._id === item.organizador) {
                                                            return user.nombre;
                                                        }
                                                    })}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </Card>

            {/* <Modal id="exampleModal">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                        Nuevo Evento
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={onSubmit}>
                        <div className="row">
                            <div className="col-12">
                                <Textinput
                                    label="Nombre"
                                    value={nombre}
                                    onChange={(event) => setNombre(event.target.value)}
                                />
                            </div>
                            <div className="col-12">
                                <Textinput
                                    label="Fecha Inicio"
                                    value={fechaInicio}
                                    onChange={(event) => setFechaInicio(event.target.value)}
                                />
                            </div>
                            <div className="col-12">
                                <Textinput
                                    label="Fecha Fin"
                                    value={fechaFin}
                                    onChange={(event) => setFechaFin(event.target.value)}
                                />
                            </div>
                            <div className="col-12">
                                <Textinput
                                    label="Descripcion"
                                    value={descripcion}
                                    onChange={(event) => setDescripcion(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <Button type="submit" className="btn btn-primary">
                                    Crear Evento
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal> */}
        </div>
    );
};

export default CreateEventos;