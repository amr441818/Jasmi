"use client";
export type customInputProps = {
    register:any;
    icon?: ReactNode;
    isPassword?: boolean;
    label?: string
    labelLang?: string
    type: string
    placeholder: string
    name?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    className?: string
    required?: boolean
    disabled?: boolean,
    validation?:{}
}

import { Eye, EyeOff } from "lucide-react";

import { useState, useEffect, ReactNode } from "react";

const InputComponent = (props: customInputProps) => {
  const [show, setShow] = useState(false);

  // هذا الكود يضمن أن "show" يتم تحديثه فقط في بيئة العميل
  useEffect(() => {
    setShow(false); // أو أي قيمة بدء مناسبة لك
  }, []);

  return (
    <div
      className={` ${
        props?.className ? props?.className : "lg:col-span-6 col-span-12"
      }`}
    >
      {props.label && (
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {props.label}{" "}
          <span className="bg-custom-gradient bg-clip-text text-transparent font-medium text-[16px]">
            {props.labelLang}
          </span>
        </label>
      )}
      <div className="relative">
        {props.icon && (
          <>
            <div className="absolute start-[20px] translate-y-[-50%] top-[50%] ">
              {props.icon}
            </div>
          </>
        )}
        <input
          type={show ? "text" : props.type}
          placeholder={props.placeholder}
          value={props.value}
          name={props.name}
          {...props.register(props.name, props.validation&& props.validation)}
          required={props.required ? props.required : false}
          disabled={props.disabled ? props.disabled : false}
          className="bg-white p-4 outline-none border md:ps-[25px] border-[#3C435C]/[0.14] text-gray-900 text-sm rounded-[6px] focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />

        {props?.isPassword && (
          <>
            {show ? (
              <Eye

                onClick={() => setShow(false)}
                className="absolute cursor-pointer size-6 end-2 md:end-5 translate-y-[-50%] top-[50%]"
              />
            ) : (
              <EyeOff
                className="absolute cursor-pointer end-2 md:end-5 size-6 top-[50%] translate-y-[-50%]"

                onClick={() => setShow(true)}
              />
            )}
          </>
        )}


      </div>
    </div>
  );
};

export default InputComponent;