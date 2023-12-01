import React, { useEffect, useRef, useState } from "react";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import { useRefreshMutation } from "./authApiSlice";
import { Link, Outlet } from "react-router-dom";
import Button from "../../components/ui/Button";

export default function PersistLogin() {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      console.log("Verifying refresh token");
      try {
        const newAccessToken = await refresh("");
        console.log(newAccessToken);
        setTrueSuccess(true);
      } catch (error) {
        console.error(error);
      }
    };

    if (!token && persist) verifyRefreshToken();
  }, []);

  let content;

  if (!persist) {
    console.log("User login not persisted.");
    content = <Outlet />;
  } else if (isLoading) {
    console.log("Loading token.");
    content = <p>Loading...</p>;
  } else if (isError) {
    console.log("An error has occurred: ", error);
    const errorObj = error as any;
    content = (
      <>
        <p className="font-semibold text-red-600 p-2 w-full bg-slate-200">
          Error: {errorObj?.data?.message}
        </p>
        <div className="w-full h-[60vh] flex justify-center items-center flex-col gap-8">
          <h2 className="text-red-600 text-lg font-semibold">
            Error: {errorObj?.data?.message}
          </h2>
          <p className="text-slate-800 tracking-wide">
            You are not authorized to view this page. Please login to continue.
          </p>

          <div className="flex flex-col gap-4 md:flex-row">
            <Link to="/">
              <Button>Return Home</Button>
            </Link>

            <Link to="/login">
              <Button>Employee Login</Button>
            </Link>
          </div>
        </div>
      </>
    );
  } else if (isSuccess && trueSuccess) {
    console.log("Success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    console.log("Token and uninitiated");
    console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
}
