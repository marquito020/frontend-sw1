import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { eventosGet } from "../../models/eventos.model";

import cardImage1 from "@/assets/images/all-img/card-1.png";

const Eventos = () => {
    const [eventos, setEventos] = useState("");
    const dataEvento = Array.from(eventos);
    useEffect(() => {
        eventosGet().then(data => {
            console.log(data);
            setEventos(data);
        });
    }, []);
    return (
        <div className=" space-y-5">
            <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 card-height-auto">
                {dataEvento.map((row, i) => (
                    <Card key={i} title={row.nombre} className="card-height-auto">
                        <div className="h-[140px] w-full mb-6">
                            <img
                                src={row.foto}
                                alt=""
                                className="block w-full h-full object-cover rounded-md"
                            />
                        </div>

                        <span className="inline-flex leading-5 text-slate-500 dark:text-slate-400 text-sm font-normal">
                            <Icon
                                icon="heroicons-outline:calendar"
                                className="text-secondary-500 ltr:mr-2 rtl:ml-2 text-lg"
                            />
                            {row.fechaInicio} - {row.fechaFin}
                        </span>

                        <div className="mt-4">
                            <p className="text-slate-600 dark:text-slate-300">
                                {row.descripcion}
                            </p>
                        </div>
                        <div className="mt-4 space-x-4 rtl:space-x-reverse">
                            <Button
                                text="Ver"
                                className="btn-outline-dark"
                                link={`/eventos/${row._id}`}
                            />
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Eventos;
