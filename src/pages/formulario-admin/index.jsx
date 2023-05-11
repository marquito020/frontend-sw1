import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";

import { aceptarFormulario, formulariosGet } from "../../models/formularios.model";

const columns = [
    {
        label: "Descripcion",
        field: "descripcion",
    },
    {
        label: "Estado",
        field: "estado",
    },
    {
        label: "Rol",
        field: "rol",
    },
    {
        label: "Persona",
        field: "persona",
    },
];

const FormulariosIndex = () => {
    const [formularios, setFormularios] = useState([]);

    useEffect(() => {
        const getFormularios = async () => {
            const formularios = await formulariosGet();
            setFormularios(formularios);
        };
        getFormularios();
    }, []);

    function aceptarForm(id) {
        console.log(id);
        if (aceptarFormulario(id)) {
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }

    return (
        <div className="grid grid-cols-1 gap-5">
            <Card title="Basic Inputs">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                        <thead className="bg-slate-200 dark:bg-slate-700">
                            <tr>
                                {columns.map((column) => (
                                    <th
                                        key={column.label}
                                        scope="col" className=" table-th "
                                    >
                                        {column.label}
                                    </th>
                                ))}
                                <th scope="col" className=" table-th ">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                            {formularios.map((formulario, index) => (
                                <tr key={index} className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                    <td className="table-td">{formulario.descripcion}</td>
                                    <td className="table-td">{formulario.estado}</td>
                                    <td className="table-td">{formulario.rol.nombre}</td>
                                    <td className="table-td">{formulario.persona.nombre}</td>
                                    <td className="table-td">
                                        {formulario.estado === "Pendiente" ? (
                                            <button className="btn btn-primary" onClick={() => aceptarForm(formulario._id)}>
                                                Aceptar
                                            </button>
                                        ) : (
                                            <label className="btn btn-primary">
                                                Aceptado
                                            </label>
                                        )}
                                    </td>
                                    {/* <td className="table-td">
                                        <button className="btn btn-primary">
                                            Rechazar
                                        </button>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}

export default FormulariosIndex;