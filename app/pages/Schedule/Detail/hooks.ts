import { useState } from "react";

export const useScheduleDetail = () => {
  const [isModal, setIsModal] = useState(false);

  return {
    isModal,
    setIsModal,
  };
};
