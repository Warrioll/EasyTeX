import { Editor, EditorContent } from '@tiptap/react';
import parse from 'html-react-parser';
import { Badge, Button, Flex, FocusTrap, Group, Input, Menu } from '@mantine/core';
import { useDisclosure, useFocusWithin } from '@mantine/hooks';
import { blockType } from '@/Types';
import styles from './blocks.module.css';

type BasicTextfieldProps = {
  idx: number | string;
  activeSection: number | string;
  editor: Editor;
  textFieldContent: string;
};

export default function BasicTexfield({
  idx,
  activeSection,
  editor,
  textFieldContent,
}: BasicTextfieldProps) {
  const [focusTrap, { toggle }] = useDisclosure(false);

  return (
    <>
      {activeSection === idx ? (
        // <RichTextEditor editor={editor}>
        //   <RichTextEditor.Content />
        // </RichTextEditor>
        <FocusTrap active={focusTrap}>
          <EditorContent editor={editor} />
        </FocusTrap>
      ) : textFieldContent ? (
        <div className={styles.textfieldNotFocused}>yolo{parse(textFieldContent)}</div>
      ) : null}
    </>
  );
}
