import { useState } from "react";

export const useScheduleDate = () => {
  const [isModal, setIsModal] = useState(false);

  return {
    isModal,
    setIsModal,
  };
};
