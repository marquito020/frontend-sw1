import React, { useContext, useEffect, useState } from "react";
import Dropdown from "@/components/ui/Dropdown";
import Icon from "@/components/ui/Icon";
import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { notifications } from "@/constant/data";

import { CartContext } from "../../../../contexts/ShoppingCartContext";

const notifyLabelMostrar = () => {
  const [cartItems, setCartItems] = useContext(CartContext);
  return (
    <span className="relative lg:h-[32px] lg:w-[32px] lg:bg-slate-100 text-slate-900 lg:dark:bg-slate-900 dark:text-white cursor-pointer rounded-full text-[20px] flex flex-col items-center justify-center">
      <Icon icon="heroicons:shopping-cart" className="animate-tada" />
      <span className="absolute lg:right-0 lg:top-0 -top-2 -right-2 h-4 w-4 bg-red-500 text-[8px] font-semibold flex flex-col items-center justify-center rounded-full text-white z-[99]">
        {cartItems.length}
      </span>
    </span>
  );
};

const notifyLabel = () => {
  const [cartItems, setCartItems] = useContext(CartContext);
  return (
    <Dropdown classMenuItems="md:w-[300px] top-[58px]" label={notifyLabelMostrar()}>
      <div className="flex justify-between px-4 py-4 border-b border-slate-100 dark:border-slate-600">
        <div className="text-sm text-slate-800 dark:text-slate-200 font-medium leading-6">
          Productos
        </div>
        <div className="text-slate-800 dark:text-slate-200 text-xs md:text-right">
          <Link to="/eventos-shop/pay" className="underline">
            Comprar
          </Link>
        </div>
      </div>
      {cartItems?.map((item, i) => (
          <Menu.Item key={i}>
            {({ active }) => (
              <div
                className={`${
                  active
                    ? "bg-slate-100 dark:bg-slate-700 dark:bg-opacity-70 text-slate-800"
                    : "text-slate-600 dark:text-slate-300"
                } block w-full px-4 py-2 text-sm  cursor-pointer`}
              >
                <div className="flex ltr:text-left rtl:text-right">
                  <div className="flex-none ltr:mr-3 rtl:ml-3">
                    <div className="h-8 w-8 bg-white rounded-full">
                      <img
                        src={item.imagenMarcaAgua}
                        alt=""
                        className={`${
                          active ? " border-white" : " border-transparent"
                        } block w-full h-full object-cover rounded-full border`}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div
                      className={`${
                        active
                          ? "text-slate-600 dark:text-slate-300"
                          : " text-slate-600 dark:text-slate-300"
                      } text-sm`}
                    >
                      Evento: {item.evento.nombre}
                    </div>
                    <div
                      className={`${
                        active
                          ? "text-slate-500 dark:text-slate-200"
                          : " text-slate-600 dark:text-slate-300"
                      } text-xs leading-4`}
                    >
                      Bs.{item.precio}
                    </div>
                    <div
                      className={`${
                        active
                          ? "text-slate-500 dark:text-slate-200"
                          : " text-slate-600 dark:text-slate-300"
                      } text-xs leading-4`}
                    >
                      Fotografo: {item.fotografo.nombre}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Menu.Item>
        ))}
      
      {/* <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {cartItems.map((item, i) => () => (
          <Menu.Item key={i}>
            <div className="flex ltr:text-left rtl:text-right">
              {item.precio}
            </div>
          </Menu.Item>
        ))}
      </div> */}

    </Dropdown >
  );
};

export default notifyLabel;
