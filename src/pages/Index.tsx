"use client";


import { useForm } from "react-hook-form";
;
import { useMutation } from "@tanstack/react-query";
import apiServiceCall from "@/lib/apiServiceCall";

import { toast } from "react-toastify";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import InputComponent from "@/components/formInputs/CustomInput";
import CustomButton from "@/components/formInputs/CustomButton";

type InputType={
    email:string
    password:string
}
const Login = ({locale}:{locale :string}) => {
const {t} = useTranslation();
const navigate = useNavigate()

const { register, handleSubmit, getValues, formState:{errors} } = useForm({
    defaultValues: {
      email: "",
      password:''
    },
  });


  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
        navigate('/clients')
    }
  },[])
  const { mutate, isError, isSuccess, isPending } = useMutation({
    mutationFn: async (data: any) => apiServiceCall({url:"auth/login", body:data, method:"POST",}),


    onError: (error: any) => {


        toast.error(error?.message)


    },

    onSuccess: (data, variables, context) => {
console.log(data)

localStorage.setItem('token', data?.data?.token)
    navigate('/clients')


    },
  });
  const onSubmit =  (data: InputType) => {
    // const formData = new FormData();
    // formData.append("mobile", data.phone_number);

    mutate(data);
}

useEffect(()=>{

  if (isPending) {
    toast.loading("Loading...", {
        toastId: "loginLoadingToast",
        autoClose: false,
    });
  } else {
    toast.dismiss("loginLoadingToast");
  }
},[isPending])
  return (
    <div className="flex h-screen justify-center flex-col  gap-6 items-center w-full  bg-[url(/images/loginBG.svg)] bg-cover bg-center ">
      {/* <img src="/images/logoLogin.png" alt="logo" width={142} height={166} className="lg:mt-[130px]" /> */}
      <div className="text-center text-primary mt-[14px]">
        <h2 className=" font-bold text-[28px] "> {t("login.title")}</h2>

      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center w-[90%] lg:w-[40%] items-center  ">
        <div className="flex flex-col w-full gap-4">
            <div className=" w-full lg:w-[452px] h-[54px]">
          <InputComponent
            type="email"
            required
            register={register}
            name="email"
            placeholder={t("login.placeholder")}
            className="!w-full"
            // className="!bg-red-400"

          />
        </div>
        <div className=" w-full lg:w-[452px] h-[54px]">
          <InputComponent
            type="password"
            isPassword
            required
            register={register}
            name="password"
            placeholder={t("login.passPlaceholder")}
            className="!w-full"
            // className="!bg-red-400"

          />
        </div>
        </div>

        <div className=" w-full lg:w-[452px] mt-[28px]">
          <CustomButton
            bgColor={"bg-primary"}
            textColor="text-[#FFFFFF]"
            className="text-[14px] flex justify-center items-center gap-2 col-start-3 col-end-6"
          >
            {t("login.button")}
          </CustomButton>
        </div>


      </form>
    </div>
  );
};

export default Login;
