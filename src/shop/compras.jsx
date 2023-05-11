import React, { useEffect, useState } from "react";
import Carousel from "@/components/ui/Carousel";
import { SwiperSlide } from "swiper/react";
import Card from "../components/ui/Card";

import c1 from "@/assets/images/all-img/c1.png";
import c2 from "@/assets/images/all-img/c2.png";
import c3 from "@/assets/images/all-img/c3.png";
import { facturaPersonaGet } from "../models/factura.model";

const ComprasFotos = () => {

    const [fotos, setFotos] = useState([]);

    useEffect(() => {
        const user = localStorage.getItem("user") || "{}";
        const userObj = JSON.parse(user);
        facturaPersonaGet(userObj._id).then(data => {
            console.log(data);
            setFotos(data);
        });
    }, []);

    return (
        <div>
            <Card title="Mis Compras">
                <Carousel
                    pagination={true}
                    navigation={true}
                    className="main-caro"
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                >
                    {fotos.map((fotos, index) => (
                        fotos.listaFotos.map((foto, index) => (
                            <SwiperSlide>
                                <div
                                    className="single-slide bg-no-repeat bg-cover bg-center rounded-md min-h-[300px] "
                                    style={{
                                        backgroundImage: `url(${foto.imagenOriginal})`,
                                    }}
                                ></div>
                            </SwiperSlide>
                        ))
                    ))}
                </Carousel>
            </Card>
        </div>
    );
}

export default ComprasFotos;