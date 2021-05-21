import { ReactNode } from 'react';
import { Modal as UiModal } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../Hooks/app.hook';
import { ModalClose } from '../../Store/modal.store';

interface ModalProps {
  header: string;
  content: ReactNode;
  actions: ReactNode | null;
}

const Modal = ({ header, content, actions }: ModalProps) => {
  const { size, open } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const onClose = () => dispatch(ModalClose());

  return (
    <UiModal closeIcon {...{ size, open, onClose }}>
      <UiModal.Header>{header}</UiModal.Header>
      <UiModal.Content>{content}</UiModal.Content>
      {actions && <UiModal.Actions>{actions}</UiModal.Actions>}
    </UiModal>
  );
};

export default Modal;
