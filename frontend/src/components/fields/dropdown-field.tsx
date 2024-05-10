import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import {
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../ui/select";

export default function DropdownField({ control, name, items }: any) {
  return (
    <FormField
      control={control}
      name={name}
      key={name}
      render={({ field }: any) => (
        <FormItem>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-[100px] bg-secondary">
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
