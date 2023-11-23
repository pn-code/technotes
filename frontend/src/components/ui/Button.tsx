import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  title?: string;
}

export default function Button({
  onClick,
  className,
  children,
  ariaLabel,
  title,
}: ButtonProps) {
  return (
    <button
      title={title}
      aria-label={ariaLabel}
      className={
        className ||
        "py-1.5 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 ease-linear duration-100"
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}
