import { Dispatch, SetStateAction } from 'react';
import { Editor, EditorContent } from '@tiptap/react';
import parse from 'html-react-parser';
import { Badge, Button, Flex, FocusTrap, Group, Input, Menu,Box } from '@mantine/core';
import { useDisclosure, useFocusWithin } from '@mantine/hooks';
import { blockType } from '@/Types';
import styles from './blocks.module.css';
import { chceckIfBlockContentEmpty } from '../../documentHandlers';

type BasicTextfieldProps = {
  idx: number | string;
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

  const onBlurSaveContentMethod = (sectionsContent, toSave: string) => {
    let sectionsContentCopy = sectionsContent;
    switch (sectionsContent[activeBlock].typeOfBlock) {
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
        console.log("contentToREad:", contentToRead)
        await editor?.commands.setContent(contentToRead);
        //: null;
        //console.log('onFocus', block);
      }}
      onBlur={() => {
        const fromTextInput=editor?.getHTML()
        //let content= sectionsContent;
        if(chceckIfBlockContentEmpty(fromTextInput)){
          onBlurSaveContentMethod(sectionsContent, '<p>...</p>');
        }else{
          
          onBlurSaveContentMethod(sectionsContent, fromTextInput);
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
        <Box pl='lg' pr='lg'>
        <div className={styles.textfieldNotFocused}>{parse(contentToRead)}</div></Box>
      ) : null}
     
    </div>
  );
}
