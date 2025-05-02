'use client'
import * as React from "react"


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,

  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import { Controller } from "react-hook-form";
type SelectTypes ={
  value: string;
  label: string;

}
// const options : GenderTypes[] = [{value: 'MALE', label:'Male'},{value: 'FEMALE', label:'female'}]
export default  function CustomSelect({control,placeholder, name, label, options}:{name:string,control?:any,label?:string; placeholder?:string; options:SelectTypes[]}) {

  return (
    <Controller  name={name} control={control}  render={({ field }) => (
    <Select  onValueChange={field.onChange} value={field.value}>
       {label&& <label className="flex mb-2">{label}</label>}
      <SelectTrigger className="w-full  !bg-white py-[26px]">
        <SelectValue placeholder={placeholder? placeholder: "select.."}/>
      </SelectTrigger>
      <SelectContent>

        <SelectGroup>

          {options?.map((option) => (
            <SelectItem  key={option.value} value={option.value}> {option.label} </SelectItem>
          ))}

        </SelectGroup>

      </SelectContent>
    </Select>
  )}
  />

)
}