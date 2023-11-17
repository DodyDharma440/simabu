import { useCallback, useEffect, useMemo } from "react";
import { useDisclosure } from "@mantine/hooks";

type UseTransitionElement = {
  duration?: number;
  onClose: () => void;
  openDuration?: number;
  closeDuration?: number;
  initialIsOpen?: boolean;
};

export const useTransitionElement = ({
  duration,
  onClose,
  openDuration,
  closeDuration,
  initialIsOpen,
}: UseTransitionElement): [boolean, () => void] => {
  const [isTransOpen, transHandlers] = useDisclosure(initialIsOpen);

  const _openDuration = useMemo(() => {
    return openDuration || duration || 0;
  }, [duration, openDuration]);

  const _closeDuration = useMemo(() => {
    return closeDuration || duration || 0;
  }, [closeDuration, duration]);

  const handleClose = useCallback(() => {
    transHandlers.close();
    setTimeout(() => onClose(), _closeDuration);
  }, [_closeDuration, onClose, transHandlers]);

  useEffect(() => {
    if (!isTransOpen) {
      setTimeout(() => transHandlers.open(), _openDuration);
    }
  }, [_openDuration, isTransOpen, transHandlers]);

  return [isTransOpen, handleClose];
};
