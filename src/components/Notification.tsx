import React from "react";

const Notification = () => {
  return (
    <div className="h-12 bg-red-500 text-white px-4 flex items-center justify-center text-center text-sm md:text-base cursor-pointer">
      The food is free if we don't have time to deliver it in 50
      minutes&#128512;
    </div>
  );
};

export default Notification;
