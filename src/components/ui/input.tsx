import React from "react";

export const Input = ({ value, onChange, placeholder }: any) => {
    return (
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    );
  };