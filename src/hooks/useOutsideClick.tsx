import * as React from 'react';

interface IUseOutsideClick {
  containerRef: React.RefObject<HTMLDivElement>;
  setIsFocused?: (value: React.SetStateAction<boolean>) => void;
  setIsFocusedHandler?: (value: boolean) => void;
  handleClose?: () => void;
}

export const useOutsideClick = (params: IUseOutsideClick): void => {
  const { containerRef, setIsFocused, setIsFocusedHandler, handleClose } = params;
  React.useEffect(() => {
    const outsideClickListener = (event: MouseEvent) => {
      if (
        event.target instanceof HTMLElement &&
        event.target !== containerRef.current &&
        !containerRef.current?.contains(event.target)
      ) {
        if (setIsFocused) {
          setIsFocused(false);
        }
        if (setIsFocusedHandler) {
          setIsFocusedHandler(false);
        }
        if (handleClose) {
          handleClose();
        }
      }
    };

    document.body.addEventListener('click', outsideClickListener, true);

    return () => {
      document.body.removeEventListener('click', outsideClickListener, true);
    };
  }, [containerRef, handleClose, setIsFocused, setIsFocusedHandler]);
};
