export default function Header({
  text,
  subtext,
}: any) {
  return (
    <div className="mt-8 flex text-center pb-4 sm:text-start sm:block justify-center text-foreground dark:text-foreground">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold tracking-tight text-foregound">
          {text}
        </h2>
        <div className="flex flex-col gap-3">
          <p className="text-muted-foreground">{subtext!}</p>
        </div>
      </div>
    </div>
  );
}
