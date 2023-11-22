import React from "react";

interface ButtonProps {
  onClick?: () => {};
  children: React.ReactNode;
  className?: string;
}

export default function Button({ onClick, className, children }: ButtonProps) {
  return (
    <button className={className || "py-1.5 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 ease-linear duration-100"} onClick={onClick}>
      {children}
    </button>
  );
}
