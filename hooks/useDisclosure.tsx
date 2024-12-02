import { useState } from "react";

type UseDisclosureReturnType = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  toggle: () => void;
};

const useDisclosure = (): UseDisclosureReturnType => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return { isOpen, onClose, onOpen, toggle };
};

export default useDisclosure;
