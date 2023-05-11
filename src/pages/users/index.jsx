import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";

import { usuarios } from "../../models/usuarios.model";

const columns = [
    {
        label: "Nombre",
        field: "nombre",
    },
    {
        label: "Apellido",
        field: "apellido",
    },

    {
        label: "Email",
        field: "email",
    },
    {
        label: "Genero",
        field: "genero",
    },
    {
        label: "Fecha Nacimiento",
        field: "fechaNacimiento",
    },
    {
        label: "Telefono",
        field: "telefono",
    },
];

const UsersIndex = () => {
    const [user, setUser] = useState("");
    useEffect(() => {
        usuarios().then(data => {
            setUser(data);
        });
        /* console.log(user); */
    }, []);
    const dataArray = Array.from(user);
    /* console.log(user); */
    return (
        <div className=" space-y-5">
            <Card title="Usuarios" noborder>
                <div className="overflow-x-auto -mx-6">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden ">
                            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                                <thead className="bg-slate-200 dark:bg-slate-700">
                                    <tr>
                                        {columns.map((column, i) => (
                                            <th key={i} scope="col" className=" table-th ">
                                                {column.label}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                                    {dataArray.map((row, i) => (
                                        <tr
                                            key={i}
                                            className="hover:bg-slate-200 dark:hover:bg-slate-700"
                                        >
                                            <td className="table-td">{row.nombre}</td>
                                            <td className="table-td">{row.apellido}</td>
                                            <td className="table-td ">{row.usuario.email}</td>
                                            <td className="table-td ">{row.genero}</td>
                                            <td className="table-td ">{row.fechaNacimiento}</td>
                                            <td className="table-td ">{row.telefono}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default UsersIndex;



