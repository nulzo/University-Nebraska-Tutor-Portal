export default function Avatar({ name }: any) {
  return (
    <div className="text-muted-primary bg-yellow-500 inline-block h-8 w-8 rounded-full">
      <div className="font-bold h-8 tracking-wider flex justify-center content-center no-underline align-center center-align text-center align-middle items-center place-content-center">
        {name}
      </div>
    </div>
  );
}
