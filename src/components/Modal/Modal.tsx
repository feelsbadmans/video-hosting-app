import React, { useRef } from 'react';
import { useOutsideClick } from 'hooks/useOutsideClick';

import css from './Modal.module.scss';

type ModalProps = {
  onClose: () => void;
  needOutsideClick?: boolean;
};

export const Modal: React.FC<ModalProps> = ({ children, onClose, needOutsideClick = true }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClose = needOutsideClick ? onClose : undefined;

  useOutsideClick({ containerRef: ref, handleClose });

  return (
    <div className={css.globalContainer}>
      <div className={css.container} ref={ref}>
        <div className={css.xIcon} onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.509766 15.4492C0.851562 15.7812 1.41797 15.7812 1.75 15.4492L8 9.19922L14.25 15.4492C14.582 15.7812 15.1582 15.791 15.4902 15.4492C15.8223 15.1074 15.8223 14.5508 15.4902 14.2188L9.24023 7.95898L15.4902 1.70898C15.8223 1.37695 15.832 0.810547 15.4902 0.478516C15.1484 0.136719 14.582 0.136719 14.25 0.478516L8 6.72852L1.75 0.478516C1.41797 0.136719 0.841797 0.126953 0.509766 0.478516C0.177734 0.820312 0.177734 1.37695 0.509766 1.70898L6.75977 7.95898L0.509766 14.2188C0.177734 14.5508 0.167969 15.1172 0.509766 15.4492Z" />
          </svg>
        </div>
        {children}
      </div>
    </div>
  );
};
