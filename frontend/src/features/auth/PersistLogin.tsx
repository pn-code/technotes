import React, { useEffect, useRef, useState } from "react";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import { useRefreshMutation } from "./authApiSlice";
import { Link, Outlet } from "react-router-dom";

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
        <p className="text-red-600 bg-slate-200">
          Error: {errorObj?.data?.message}
        </p>
        <Link to="/login">Click here to relogin.</Link>
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
