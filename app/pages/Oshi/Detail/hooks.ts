import { useState } from "react";

export const useOshiDetail = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onPressComplete = () => {
    setIsOpen(false);
  };

  const onPressCancel = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    setIsOpen,
    onPressComplete,
    onPressCancel,
  };
};
