import { Skeleton } from "../ui/skeleton";

export default function LoadingSelect() {
  return (
    <div className="flex">
      <Skeleton className="h-8 w-full md:w-[35vw] lg:w-[30vw] xl:w-[40vw] justify-between" />
    </div>
  );
}
