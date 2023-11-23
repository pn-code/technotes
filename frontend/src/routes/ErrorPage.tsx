import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError() as any;
    console.error(error);
  
    return (
      <div className="w-full h-screen flex justify-center items-center flex-col gap-2">
        <h1 className="text-2xl">Oops!</h1>
        <p className="text-xl">Sorry, an unexpected error has occurred.</p>
        <p className="text-lg text-slate-600">
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    );
  }