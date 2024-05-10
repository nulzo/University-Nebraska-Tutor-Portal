import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "../ui/dropdown-menu";
import { FormField, FormItem, FormMessage } from "../ui/form";

export default function CheckDropdown({ control, name }: any) {
  return (
    <FormField
      control={control}
      name={name}
      key={name}
      render={({ field }: any) => (
        <FormItem className="flex m-0 p-0 space-y-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-8 w-8 p-0">
                <span className="sr-only">Popout menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                key={field.id}
                className="capitalize"
                checked={field.value}
                onCheckedChange={field.onChange}
              >
                Successful
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <FormMessage className="text-warning" />
        </FormItem>
      )}
    />
  );
}
