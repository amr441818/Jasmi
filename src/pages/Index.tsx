import InputComponent from "@/components/formInputs/CustomInput";
import CustomSelect from "@/components/formInputs/CustomSelect";
import { useForm } from "react-hook-form";

const Index = () => {
const {register, control} = useForm()
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <div className=" col-span-12 md:col-span-6 lg:col-span-4">

            <InputComponent  label="اسم العميل"  type="string" placeholder="dfd" register={register} name="first" />
            </div>
            <div className=" col-span-12 md:col-span-6 lg:col-span-4">


            <CustomSelect label="اسم العميل" control={control}  placeholder="dfd"  name="first" options={[{value:'1', label:'amr'}]} />
            </div>
        </div>
    );
};

export default Index;
