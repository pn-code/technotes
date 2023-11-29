import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "./authApiSlice";
import Button from "../../components/ui/Button";
import { setCredentials } from "./authSlice";

export default function Login() {
  const userRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const handleUsernameInput = (e: ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dashboard");
    } catch (error: any) {
      if (!error.status) {
        setErrorMessage("No Server Response");
      } else if (error.status === 400) {
        setErrorMessage("All fields are required.");
      } else if (error.status === 401) {
        setErrorMessage("Unauthorized");
      } else {
        setErrorMessage(error.data?.message);
      }

      errorRef?.current?.focus();
    }
  };

  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [username, password]);

  const errorClass = errorMessage
    ? "text-red-600 font-semibold text-center bg-slate-100"
    : "hidden";

  if (isLoading)
    return (
      <p className="w-full h-[80vh] flex items-center justify-center">
        Loading...
      </p>
    );

  return (
    <div className="w-full h-[80vh] flex items-center justify-center flex-col p-2">
      <header className="w-full md:mb-2 md:w-[370px] text-center bg-indigo-800 text-white p-2 rounded-t">
        <h1 className="text-xl font-semibold">Employee Login</h1>
      </header>

      <div className="w-full md:w-fit">
        <p ref={errorRef} className={errorClass} aria-live="assertive">
          Error: {errorMessage}
        </p>
        <form
          onSubmit={handleLogin}
          className="w-full flex flex-col gap-2 md:shadow-md md:p-10 md:pt-0 rounded-b"
        >
          <label htmlFor="username">Username: </label>
          <input
            onChange={handleUsernameInput}
            id="username"
            name="username"
            type="text"
            value={username}
            ref={userRef}
            required
            autoComplete="off"
          />

          <label htmlFor="password">Password: </label>
          <input
            onChange={handlePasswordInput}
            id="password"
            name="password"
            type="password"
            value={password}
            required
            autoComplete="off"
          />

          <div className="mt-2"></div>
          <Button type="submit">Login</Button>
        </form>
      </div>

      <footer className="mt-4">
        <Link className="underline text-slate-600 hover:text-slate-800" to="/">
          Back to Home
        </Link>
      </footer>
    </div>
  );
}
