import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Editor, EditorContent } from '@tiptap/react';
import parse from 'html-react-parser';
import { cloneDeep } from 'lodash';
import { Badge, Box, Button, Flex, FocusTrap, Group, Input, Menu } from '@mantine/core';
import { useDisclosure, useFocusWithin } from '@mantine/hooks';
import { blockType } from '@/Types';
import {
  useActiveBlockContext,
  useActiveTextfieldContext,
  useBlocksContentContext,
  useEditorContext,
} from '../../../DocumentContextProviders';
import styles from '../blocks.module.css';

type BasicTextfieldProps = {
  idx: number;
  idxInput: string;
  //activeBlockState: [number, Dispatch<SetStateAction<number>>];
  //editor: Editor;

  //activeTextInputState: [string, Dispatch<SetStateAction<string>>];
  contentToRead: string;
  //sectionsContent: blockType[];
  //setSectionsContent: Dispatch<SetStateAction<blockType[]>>;
  // saveBasicTextInputChanges: (
  //   idx: number,
  //   idxInput: string,
  //   sectionsContentState: any,
  //   toSave: string
  // ) => void;
};

export default function BasicTexfield({
  idx,
  //activeBlockState,
  //editor,
  // activeTextInputState,
  idxInput,
  contentToRead,
  //sectionsContent,
  //setSectionsContent,
}: BasicTextfieldProps) {
  //const { blocksContent, setBlocksContent } = useBlocksContentContext();
  const { activeTextfield, setActiveTextfield } = useActiveTextfieldContext();
  const { activeBlock, setActiveBlock } = useActiveBlockContext();
  const { editor } = useEditorContext();
  //const [updateReleaser, setUpdateReleaser] = useState<boolean>(false);

  const [focusTrap, { toggle }] = useDisclosure(false);
  // const [activeBlock, setActiveBlock] = activeBlockState;
  //const [activeTextInput, setActiveTextInput] = activeTextInputState;
  //const blocksContentState = [sectionsContent, setSectionsContent];

  // const onBlurSaveTextfieldContent = (toSave: string) => {
  //   let blocksContentCopy = cloneDeep(blocksContent);
  //   switch (blocksContent[idx].typeOfBlock) {
  //     case 'titlePage':
  //       if (idxInput.includes('title')) {
  //         blocksContentCopy[idx].blockContent.title = toSave;
  //       }
  //       if (idxInput.includes('author')) {
  //         blocksContentCopy[idx].blockContent.author = toSave;
  //       }
  //       if (idxInput.includes('date')) {
  //         blocksContentCopy[idx].blockContent.date = toSave;
  //       }
  //       break;
  //     case 'table':
  //       //console.log('table on blur save');
  //       const tmp = idxInput.split(';');
  //       const cellId = [tmp[0], tmp[1], tmp[2]]; //0 - id tabeli, 1 - rows, 2- columns
  //       blocksContentCopy[idx].blockContent[(cellId[1] as unknown as number) - 1][
  //         (cellId[2] as unknown as number) - 1
  //       ] = toSave;
  //       break;
  //     default:
  //       console.log('default on blur save: ', toSave);
  //       blocksContentCopy[idx].blockContent = toSave;
  //       break;
  //   }
  //   setBlocksContent(blocksContentCopy);
  // };

  useEffect(() => {
    //console.log('active block:', blocksContent[activeBlock]);
    if (activeTextfield === idxInput && activeBlock !== idx) {
      setActiveTextfield('');
    }
  }, [activeBlock]);

  // useEffect(() => {
  //   setUpdateReleaser((prev) => !prev);
  //   console.log('updateReleaser!');
  // }, [activeTextfield]);

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      key={idxInput}
      tabIndex={idx}
      onFocus={async () => {
        if (activeTextfield !== idxInput) {
          setActiveTextfield(idxInput);
          // sectionsContent[idx].blockContent
          //   ?
          //console.log('sectionsContent: ', sectionsContent);
          console.log('contentToREad:', contentToRead);
          if (contentToRead === '&nbsp;' || contentToRead === '<p>&nbsp;</p>') {
            await editor?.commands.setContent('');
          } else {
            await editor?.commands.setContent(contentToRead);
          }
        }

        //: null;
        //console.log('onFocus', block);
      }}
    >
      <Box mih="2rem">
        {activeTextfield === idxInput ? (
          // <RichTextEditor editor={editor}>
          //   <RichTextEditor.Content />f
          // </RichTextEditor>

          //<FocusTrap active={focusTrap}>
          <EditorContent
            editor={editor}

            // style={{
            //   backgroundColor: activeTextfield === idxInput ? '#ebffff;' : '',
            // }}
          />
        ) : // </FocusTrap>
        contentToRead ? (
          <Flex
            // ml="3px"
            // mr="3px"
            //align="center"
            className="tiptap nonEditor"
            bg="var(--mantine-color-white)"
          >
            <div className="nonEditor">{parse(contentToRead)}</div>
          </Flex>
        ) : null}
      </Box>
    </div>
  );
}
