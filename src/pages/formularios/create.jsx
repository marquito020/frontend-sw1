import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";

import { rolesGet } from "../../models/roles.model";
import Select from "@/components/ui/Select";
import { createFormulario } from "../../models/formularios.model";
import { useForm } from "react-hook-form";

const CreateFormulario = () => {
    const [roles, setRoles] = useState([]);
    const [descripcion, setDescripcion] = useState("");
    const [rol, setRol] = useState("");
    useEffect(() => {
        const getRoles = async () => {
            const roles = await rolesGet();
            console.log(roles);
            setRoles(roles);
        };
        getRoles();
    }, []);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: "all",
    });
    const onSubmit = (data) => {
        /* console.log(roles);
        console.log(descripcion);
        console.log(rol); */
        if (createFormulario(descripcion, rol)) {
            console.log("Formulario creado");
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
    };

    return (
        <div className=" xl:grid-cols-2 gap-5">
            <Card title="Crear Solicitud">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Textinput
                        label="Descripción"
                        id="descripcion"
                        type="text"
                        vale={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        placeholder="Management dashboard "
                    />
                    <label className="mt-4 block text-sm font-medium text-gray-700">
                        Rol
                    </label>
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
                        {...register("rol")}
                        onChange={(e) => setRol(e.target.value)}
                    >
                        <option value="">Seleccione un rol</option>
                        {roles.map((rol, index) => (
                            <option key={index} value={rol._id}>
                                {rol.nombre}
                            </option>
                        ))}
                    </select>
                    <Button
                        text="Accept"
                        className="btn-dark mt-2"
                        type="submit"
                    />
                </form>
            </Card>
        </div>
    );
}

export default CreateFormulario;