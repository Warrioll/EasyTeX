import { Dispatch, SetStateAction } from 'react';
import { Editor, EditorContent } from '@tiptap/react';
import parse from 'html-react-parser';
import { Badge, Box, Button, Flex, FocusTrap, Group, Input, Menu } from '@mantine/core';
import { useDisclosure, useFocusWithin } from '@mantine/hooks';
import { blockType } from '@/Types';
import { chceckIfBlockContentEmpty, saveBasicTextInputChanges } from '../../../documentHandlers';
import styles from '../blocks.module.css';

type BasicTextfieldProps = {
  idx: number;
  idxInput: string;
  activeBlockState: [number, Dispatch<SetStateAction<number>>];
  editor: Editor;

  activeTextInputState: [string, Dispatch<SetStateAction<string>>];
  contentToRead: string;
  sectionsContent: blockType[];
  setSectionsContent: Dispatch<SetStateAction<blockType[]>>;
};

export default function BasicTexfield({
  idx,
  activeBlockState,
  editor,
  activeTextInputState,
  idxInput,
  contentToRead,
  sectionsContent,
  setSectionsContent,
}: BasicTextfieldProps) {
  const [focusTrap, { toggle }] = useDisclosure(false);
  const [activeBlock, setActiveBlock] = activeBlockState;
  const [activeTextInput, setActiveTextInput] = activeTextInputState;
  const blocksContentState = [sectionsContent, setSectionsContent];

  const onBlurSaveContentMethod = (sectionsContent, toSave: string) => {
    let sectionsContentCopy = sectionsContent;
    switch (sectionsContent[idx].typeOfBlock) {
      case 'titlePage':
        console.log('titlePageeee');
        if (idxInput.includes('title')) {
          sectionsContentCopy[idx].blockContent.title = toSave;
        }
        if (idxInput.includes('author')) {
          sectionsContentCopy[idx].blockContent.author = toSave;
        }
        if (idxInput.includes('date')) {
          sectionsContentCopy[idx].blockContent.date = toSave;
        }
        break;
      default:
        //console.log('default on blur save');
        sectionsContentCopy[idx].blockContent = toSave;
        break;
    }
    setSectionsContent(sectionsContentCopy);
  };

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      key={idxInput}
      tabIndex={idx}
      onFocus={async () => {
        setActiveTextInput(idxInput);
        // sectionsContent[idx].blockContent
        //   ?
        console.log('sectionsContent: ', sectionsContent);
        console.log('contentToREad:', contentToRead);
        await editor?.commands.setContent(contentToRead);
        //: null;
        //console.log('onFocus', block);
      }}
      onBlur={() => {
        const fromTextInput = editor?.getHTML();
        //let content= sectionsContent;
        if (chceckIfBlockContentEmpty(fromTextInput)) {
          //onBlurSaveContentMethod(sectionsContent, '<p>...</p>');
          saveBasicTextInputChanges(idx, idxInput, blocksContentState, '<p>...</p>');
        } else {
          saveBasicTextInputChanges(idx, idxInput, blocksContentState, fromTextInput);
        }
        //setActiveTextInput('');

        // setSectionsContent(content);
        //console.log('OnBlur', editorContent);
      }}
    >
      {activeTextInput === idxInput ? (
        // <RichTextEditor editor={editor}>
        //   <RichTextEditor.Content />
        // </RichTextEditor>

        <FocusTrap active={focusTrap}>
          <EditorContent editor={editor} />
        </FocusTrap>
      ) : contentToRead ? (
        <Box pl="lg" pr="lg">
          <div className={styles.textfieldNotFocused}>{parse(contentToRead)}</div>
        </Box>
      ) : null}
    </div>
  );
}
