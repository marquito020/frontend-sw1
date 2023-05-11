import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { useForm } from "react-hook-form";

import { rolesGet } from "../../models/roles.model";
import { rolesPost } from "../../models/roles.model";

const columns = [
    {
        name: "Nombre",
        selector: "nombre",
        sortable: true,
    },
    {
        name: "Descripción",
        selector: "descripcion",
        sortable: true,
    },
    {
        name: "Acciones",
        selector: "acciones",
        sortable: true,
    },
];

const RolesIndex = () => {
    const [roles, setRoles] = useState([]);
    const [open, setOpen] = useState(false);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");

    useEffect(() => {
        const getRoles = async () => {
            const roles = await rolesGet();
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
        const role = rolesPost(nombre, descripcion);
        if (role) {
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
    };

    return (
        <div className=" space-y-5">
            <Modal
                title="Nuevo Rol"
                label="Crear Rol"
                labelClass="btn-outline-dark"
                uncontrol
            >
                <div className="text-base text-slate-600 dark:text-slate-300">
                    <form onSubmit={onSubmit} className="space-y-5">
                        <Textinput
                            name="nombre"
                            label="Nombre"
                            register={register}
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        /* error={errors.nombre} */
                        />
                        <Textinput
                            name="descripcion"
                            label="Descripción"
                            register={register}
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            required
                        /* error={errors.descripcion} */
                        />
                        <Button
                            text="Accept"
                            className="btn-dark "
                            type="submit"
                        />
                    </form>
                </div>
            </Modal>

            <Card title="Roles" noborder>
                <div className="col-12">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {columns.map((columns, index) => (
                                    <th
                                        key={index}
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        {columns.name}
                                    </th>
                                ))
                                }
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {roles.map((role, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{role.nombre}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{role.descripcion}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            <div className="flex items-center space-x-4 text-sm">
                                                <button
                                                    onClick={() => setOpen(true)}
                                                    className="btn btn-outline-dark"
                                                >
                                                    <Icon
                                                        name="edit"
                                                        className="w-5 h-5"
                                                    />
                                                </button>
                                                <button
                                                    onClick={() => setOpen(true)}
                                                    className="btn btn-outline-dark"
                                                >
                                                    <Icon
                                                        name="trash"
                                                        className="w-5 h-5"
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}

export default RolesIndex;