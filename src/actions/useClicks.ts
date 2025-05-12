import { useEffect, useRef, useState } from "react";

type UseClicks = {
  onClose: () => void;
  delay?: number;
  lockScroll?: boolean; 
};

export const useClicks = ({
  onClose,
  delay = 300,
  lockScroll = false,
}: UseClicks) => {
  const [closing, setClosing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => onClose(), delay);
  };

  useEffect(() => {
    if (lockScroll) {
      document.body.style.overflow = "hidden";
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      if (lockScroll) {
        document.body.style.overflow = "unset";
      }
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return { ref, handleClose, closing };
};
