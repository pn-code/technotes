import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  title?: string;
  disabled?: boolean;
  type?: "submit" | "button" | "reset";
}

export default function Button({
  onClick,
  className,
  children,
  ariaLabel,
  title,
  disabled,
  type,
}: ButtonProps) {
  return (
    <button
      title={title}
      aria-label={ariaLabel}
      className={
        className ||
        "py-1.5 px-4 disabled:bg-indigo-600/30 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 ease-linear duration-100"
      }
      onClick={onClick}
      disabled={disabled}
      type={type ? type : "button"}
    >
      {children}
    </button>
  );
}
