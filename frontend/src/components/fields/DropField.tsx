import { cva } from "class-variance-authority";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import {
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../ui/select";
import { ChevronsUpIcon, EqualIcon, MinusIcon } from "lucide-react";

export default function DropField({ control, name, items, variant }: any) {
  if (variant === "difficulty") {
    return (
      <FormField
        control={control}
        name={name}
        key={name}
        render={({ field }: any) => (
          <FormItem className="mt-1">
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue className="text-xs" placeholder={field.value} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {items.map((item: any) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    className="flex"
                  >
                    <div className="flex text-xs">
                      <div className=" flex items-center align-middle content-center mr-2">
                        {item.text === "Easy" && (
                          <MinusIcon className="text-success" size={12} />
                        )}
                        {item.text === "Medium" && (
                          <EqualIcon className="text-alert" size={12} />
                        )}
                        {item.text === "Hard" && (
                          <ChevronsUpIcon className="text-warning" size={12} />
                        )}
                      </div>
                      <div className="text-xs">{item.text}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className="text-red-100" />
          </FormItem>
        )}
      />
    );
  }
  return (
    <FormField
      control={control}
      name={name}
      key={name}
      render={({ field }: any) => (
        <FormItem>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="">
                <SelectValue placeholder={field.value} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map((item: any) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage className="text-warning" />
        </FormItem>
      )}
    />
  );
}
