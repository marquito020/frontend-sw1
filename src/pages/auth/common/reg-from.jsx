import React, { useState } from "react";
import { toast } from "react-toastify";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { handleRegister } from "./store";
import { registerUser } from "../../../models/auth.model";

import Select from "@/components/ui/Select";

const schema = yup
  .object({
    nombre: yup.string().required("Name is Required"),
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup
      .string()
      .min(6, "Password must be at least 8 characters")
      .max(20, "Password shouldn't be more than 20 characters")
      .required("Please enter password"),
    // confirm password
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();

const RegForm = () => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    /* dispatch(handleRegister(data)); */
    const formData = new FormData();
    formData.append("file", data.fotoPerfil[0]);
    formData.append("upload_preset", "ufp8irtp");
    formData.append("cloud_name", "dg2ugi96k");

    fetch("https://api.cloudinary.com/v1_1/dg2ugi96k/image/upload", {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((imagen) => {
        /* console.log(data);
        console.log(data.url); */
        const user = registerUser(data.nombre, data.apellido, data.fechaNacimiento, data.genero, data.telefono, data.email, data.password, data.direccion, imagen.url);
        if (user) {
          /* dispatch(handleRegister(true)); */
          setTimeout(() => {
            navigate("/");
          }, 1500);
        } else {
          toast.error("Invalid credentials", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const styles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
  };

  const [value, setValue] = useState(null);

  const genero = [
    { value: "masculino", label: "Masculino" },
    { value: "femenino", label: "Femenino" },
    { value: "otro", label: "Otro" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
      <Textinput
        name="nombre"
        label="nombre"
        type="text"
        placeholder=" Enter your name"
        register={register}
        error={errors.nombre}
      />{" "}
      <Textinput
        name="apellido"
        label="apellido"
        type="text"
        placeholder=" Enter your apellido"
        register={register}
        error={errors.apellido}
      />
      <Textinput
        name="password"
        label="passwrod"
        type="password"
        placeholder=" Enter your password"
        register={register}
        error={errors.password}
      />
      {/* Fecha Nacimiento */}
      <Textinput
        name="email"
        label="email"
        type="email"
        placeholder=" Enter your email"
        register={register}
        error={errors.email}
      />
      <Textinput
        name="fechaNacimiento"
        label="fecha Nacimiento"
        type="date"
        placeholder=" Enter your fechaNacimiento"
        register={register}
        error={errors.fechaNacimiento}
      />
      {/* genero */}
      <label htmlFor=" hh" className="form-label ">
        Genero
      </label>
      <Select
        name="genero"
        options={genero}
        styles={styles}
        placeholder="Seleccione su genero"
        value={value}
        register={register}
        error={errors.genero}
      />
      <Textinput
        name="telefono"
        label="telefono"
        type="number"
        placeholder=" Enter your telefono"
        register={register}
        error={errors.telefono}
      />
      <Textinput
        name="direccion"
        label="direccion"
        type="text"
        placeholder=" Enter your direccion"
        register={register}
        error={errors.direccion}
      />
      {/* Foto de Perfil */}
      <Textinput
        name="fotoPerfil"
        label="fotoPerfil"
        type="file"
        placeholder=" Enter your fotoPerfil"
        register={register}
        error={errors.fotoPerfil}
      />
      <Checkbox
        label="Tu aceptas los terminos y condiciones"
        value={checked}
        onChange={() => setChecked(!checked)}
      />
      <button className="btn btn-dark block w-full text-center">
        Register
      </button>
    </form>
  );
};

export default RegForm;
