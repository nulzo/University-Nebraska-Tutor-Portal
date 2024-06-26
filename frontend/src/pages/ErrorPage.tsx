import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  return (
    <div className="text-center pt-[15vh] grid grid-cols-1">
      <h1 className="font-bold text-6xl pb-2">erm</h1>
      <p className="font-medium text-lg pb-8">... heh, le awkward ...</p>
      <div className="flex justify-center">
        <svg
          version="1.2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 211 200"
          width="200"
          height="200"
        >
          <title>Screenshot 2023-10-17 004918</title>
          <defs>
            <image
              width="205"
              height="192"
              id="img1"
              href="data:image/png;base64,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"
            />
          </defs>
          <style></style>
          <use id="Background" href="#img1" x="0" y="8" />
        </svg>
      </div>
      <p className="font-base text-md pt-10">A cringe error has occured</p>
      <p className="font-lighter pl-2 text-red-700">{error.data}</p>
    </div>
  );
}
