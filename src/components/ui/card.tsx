import React from "react";

export const Card = ({ children }: any) => {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6">
        {children}
      </div>
    );
  };
  
  export const CardContent = ({ children }: any) => {
    return <div className="space-y-4">{children}</div>;
  };