import React from "react";

export const Label = ({ htmlFor, children }: any) => {
    return (
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
        {children}
      </label>
    );
  };