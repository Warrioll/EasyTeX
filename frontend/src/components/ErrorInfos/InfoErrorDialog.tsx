import { ReactNode } from 'react';
import { RiErrorWarningFill,} from 'react-icons/ri';
import { Alert,  Dialog } from '@mantine/core';


type InfoErrorDialogPropsType = {
  title: string;
  content: string | ReactNode;
  errorDialogHandlers: any;
  errorDialogOpened: boolean;
};

export default function InfoErrorDialog({
  title,
  content,
  errorDialogHandlers,
  errorDialogOpened,
}: InfoErrorDialogPropsType) {
  return (
    <Dialog
      opened={errorDialogOpened}
      size="md"
      radius="md"
      p="0px"
      bg="light-dark(rgba(255,255,255,0.9),rgba(50,0,0,0.9))"
      style={{ top: 5 }}
      transitionProps={{ transition: 'pop-bottom-right', duration: 200 }}
    >
      <Alert
        variant="light"
        withCloseButton
        onClose={errorDialogHandlers.close}
        color="red"
        radius="xs"
        title={title}
        icon={
          <span style={{ fontSize: '1.2rem' }}>
            <RiErrorWarningFill />
          </span>
        }
      >
        {content}
      </Alert>
    </Dialog>
  );
}
