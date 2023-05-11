import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/Icon";
import Card from "@/components/ui/Card";
import Carousel from "@/components/ui/Carousel";
import { SwiperSlide } from "swiper/react";
import { facturaPersonaGet } from "../../models/factura.model";

// import images


const profile = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [genero, setGenero] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [direccion, setDireccion] = useState("");
  const [foto, setFoto] = useState("");

  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const userObj = JSON.parse(user);
    console.log(userObj);
    setNombre(userObj.nombre);
    setApellido(userObj.apellido);
    setEmail(userObj.usuario.email);
    setTelefono(userObj.telefono);
    setGenero(userObj.genero);
    setFechaNacimiento(userObj.fechaNacimiento);
    setDireccion(userObj.direccion);
    setFoto(userObj.foto);

    facturaPersonaGet(userObj._id).then(data => {
      console.log(data);
      setFotos(data);
    });
  }, []);
  return (
    <div>
      <div className="space-y-5 profile-page">
        <div className="profiel-wrap px-[35px] pb-10 md:pt-[84px] pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0 space-y-6 justify-between items-end relative z-[1]">
          <div className="bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 md:h-1/2 h-[150px] w-full z-[-1] rounded-t-lg"></div>
          <div className="profile-box flex-none md:text-start text-center">
            <div className="md:flex items-end md:space-x-6 rtl:space-x-reverse">
              <div className="flex-none">
                <div className="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative">
                  <img
                    src={foto}
                    alt=""
                    className="w-full h-full object-cover rounded-full"
                  />
                  <Link
                    to="#"
                    className="absolute right-2 h-8 w-8 bg-slate-50 text-slate-600 rounded-full shadow-sm flex flex-col items-center justify-center md:top-[140px] top-[100px]"
                  >
                    <Icon icon="heroicons:pencil-square" />
                  </Link>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]">
                  {nombre}
                </div>
                <div className="text-sm font-light text-slate-600 dark:text-slate-400">
                  {apellido}
                </div>
              </div>
            </div>
          </div>

          <div className="profile-info-500 md:flex md:text-start text-center flex-1 max-w-[516px] md:space-y-0 space-y-4">
            <div className="flex-1">
              <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
                {genero.toUpperCase()}
              </div>
              <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                {fechaNacimiento}
              </div>
            </div>

            {/* <div className="flex-1">
              <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
                200
              </div>
              <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                Board Card
              </div>
            </div> */}

            {/* <div className="flex-1">
              <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
                3200
              </div>
              <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                Calender Events
              </div>
            </div> */}
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="lg:col-span-4 col-span-12">
            <Card title="Info">
              <ul className="list space-y-8">
                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:envelope" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      EMAIL
                    </div>
                    <a
                      href="mailto:someone@example.com"
                      className="text-base text-slate-600 dark:text-slate-50"
                    >
                      {email}
                    </a>
                  </div>
                </li>

                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:phone-arrow-up-right" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      PHONE
                    </div>
                    <a
                      href="tel:0189749676767"
                      className="text-base text-slate-600 dark:text-slate-50"
                    >
                      {telefono}
                    </a>
                  </div>
                </li>

                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:map" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      Direccion
                    </div>
                    <div className="text-base text-slate-600 dark:text-slate-50">
                      {direccion}
                    </div>
                  </div>
                </li>
              </ul>
            </Card>
          </div>
          <div className="lg:col-span-8 col-span-12">
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
        </div>
      </div>
    </div>
  );
};

export default profile;
