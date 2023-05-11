import React, { useContext, useEffect, useState } from "react";
import { fotosGet } from "../../models/fotos.model";

import { CartContext } from "../../contexts/ShoppingCartContext";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import img1 from "@/assets/images/all-img/big-shap1.png";

const ShopEventos = () => {

    const [cartItems, setCartItems] = useContext(CartContext);

    const [fotos, setFotos] = useState("");
    const dataFotos = Array.from(fotos);

    useEffect(() => {
        /* const fotos = fotosGet();
        console.log(fotos);
        setFotos(fotos); */
        fotosGet().then(data => {
            console.log(data);
            setFotos(data);
        });
    }, []);

    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
        console.log(item);
    };

    return (
        <div>
            <div className="space-y-5">
                <Card>
                    <div className="justify-between mb-6">
                        <h4 className="text-slate-900 text-xl font-medium">Shop</h4>
                        <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
                            {dataFotos.map((item, i) => (
                                <div
                                    className={` bg-warning-500
          price-table bg-opacity-[0.16] dark:bg-opacity-[0.36] rounded-[6px] p-6 text-slate-900 dark:text-white relative overflow-hidden z-[1]
          `}
                                    key={i}
                                >
                                    <div className="overlay absolute right-0 top-0 w-full h-full z-[-1]">
                                        <img src={img1} alt="" className="ml-auto block" />
                                    </div>
                                    <header className="mb-6">
                                        <h4 className="text-xl mb-5">Evento: {item.evento.nombre}</h4>
                                        <div className="space-x-4 relative flex items-center mb-5 rtl:space-x-reverse">

                                            <span className="text-[32px] leading-10 font-medium">
                                                Bs.{item.precio}{" "}
                                            </span>
                                        </div>

                                        {item.persona && (
                                            <p className="text-slate-500 dark:text-slate-300 text-sm">
                                                Persona: {item.persona.nombre}
                                            </p>
                                        )}
                                    </header>
                                    <div className="price-body space-y-8">
                                        <div className="h-40 grid place-items-center">
                                            <img
                                                src={item.imagenMarcaAgua}
                                                alt=""
                                                className=" h-40 block object-cover rounded"
                                            />
                                        </div>
                                        <p className="text-sm leading-5 text-slate-600 dark:text-slate-300">
                                            Fotografo: {item.fotografo.nombre}
                                        </p>
                                        <div>
                                            {cartItems.includes(item) ? (
                                                <Button
                                                    text="Añadido"
                                                    className="btn-outline-dark dark:border-slate-400 w-full"
                                                    disabled
                                                />
                                            ) : (
                                                <Button
                                                    text="Añadir al carro"
                                                    className="btn-outline-dark dark:border-slate-400 w-full"
                                                    onClick={() => addToCart(item)}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ShopEventos;