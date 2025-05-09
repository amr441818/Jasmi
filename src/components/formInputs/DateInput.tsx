

import { UseFormRegister, FieldError } from "react-hook-form";


import { Controller } from "react-hook-form";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";

export const DatePicker = ({


  control,
  name
}: {


  control: any;
  name:string

}) => {


  return (
    <div>

      <Controller    control={control}
          name={name}
          render={({ field }) => (
            <Popover>
            <PopoverTrigger asChild>
              {/* <FormControl> */}
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full h-[55px]  text-left font-normal rounded-[12px]",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick Date</span>
                  )}
                  <CalendarIcon className=" rtl:mr-auto  ltr:!ml-auto h-4 w-4 opacity-50" />
                </Button>
              {/* </FormControl> */}
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date < new Date()
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          )}/>
    </div>

  );
};

export default DatePicker
