import { useState } from "react";

export const useOshi = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenColor, setIsOpenColor] = useState(false);
  const [isSelectedEdit, setIsSelectedEdit] = useState(false);

  const onPressCancel = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    isOpenColor,
    isSelectedEdit,
    setIsOpen,
    onPressCancel,
    setIsOpenColor,
    setIsSelectedEdit,
  };
};
