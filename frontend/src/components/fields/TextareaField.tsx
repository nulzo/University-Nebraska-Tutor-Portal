import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";

export default function TextareaField({
  name,
  control,
  max_length,
}: {
  name: string;
  control: any;
  max_length: number;
}) {
  return (
    <FormField
      control={control}
      name={name}
      key={name}
      render={({ field }: any) => (
        <FormItem>
          <FormControl>
            <div className="relative">
              {field.value && field.value.length > max_length && (
                <p className="absolute top-0 right-0 text-warning font-bold text-xs pr-2 pt-1">
                  {(field.value && max_length - field.value.length) ||
                    max_length}
                </p>
              )}
              {field.value && field.value.length <= max_length && (
                <p className="absolute top-0 right-0 text-muted-foreground/50 text-xs pr-2 pt-1">
                  {max_length - field.value.length}
                </p>
              )}
              {!field.value && (
                <p className="absolute top-0 right-0 text-muted-foreground/50 text-xs pr-2 pt-1">
                  {max_length}
                </p>
              )}
              <Textarea
                className="text-foreground focus:border-none resize-none min-h-[20vh]"
                placeholder="Enter ticket description..."
                {...field}
              />
            </div>
          </FormControl>
          <FormMessage className="text-warning" />
        </FormItem>
      )}
    />
  );
}
