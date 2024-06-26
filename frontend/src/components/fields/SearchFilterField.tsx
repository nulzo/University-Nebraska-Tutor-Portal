import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { CommandEmpty } from "cmdk";
import { ScrollArea } from "../ui/scroll-area";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SearchFilterField({ control, name, key, items }: any) {
  return (
    <FormField
      control={control}
      name={name}
      key={key}
      render={({ field }: any) => (
        <FormItem className="flex flex-col mt-1" key="issue_form_item">
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="dropdown"
                  role="combobox"
                  key="issue_button"
                  className={cn(
                    "m-0 p-2 text-xs",
                    !field.value && "text-muted-foreground font-normal",
                  )}
                >
                  {field.value
                    ? items?.data.find(
                        (tutor: any) =>
                          tutor.id == field.value
                      )?.info.name
                    : "select a tutor"}
                  <CaretSortIcon
                    key="issue_sort_icon"
                    className="h-3 w-3 shrink-0"
                  />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent key="issue_content" className="h-full p-0">
              <Command>
                <CommandInput
                  placeholder="search..."
                  className="h-8 my-1"
                  key="issue_input"
                />
                <CommandEmpty>nothing found...</CommandEmpty>
                <CommandGroup key="issue_command_group">
                  <ScrollArea className="h-fit rounded-md border">
                    {items?.data.map((tutor: any) => (
                      <CommandItem
                        onSelect={() => {
                          field.onChange(tutor.id);
                        }}
                        value={tutor.id}
                        key={`${tutor.info.name}${tutor.id}`}
                      >
                        {tutor.info.name}
                        <CheckIcon
                          key={`issue-${tutor.info.name}-check-icon`}
                          className={cn(
                            "ml-auto h-3 w-3",
                            tutor.id === field.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </ScrollArea>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage className="text-warning" />
        </FormItem>
      )}
    />
  );
}
