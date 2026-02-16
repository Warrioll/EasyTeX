import { useEffect, useRef } from 'react';
import { EditorContent } from '@tiptap/react';
import parse from 'html-react-parser';
import { Box, Flex } from '@mantine/core';
import { sanitizeBlocksContent } from '@/pages/Document/hooksAndUtils/documentUtils';
import {
  useActiveBlockContext,
  useActiveTextfieldContext,
  useEditorContext,
} from '../../../DocumentContextProviders';

type BasicTextfieldPropsType = {
  idx: number;
  idxInput: string;
  contentToRead: string;
};

export default function BasicTexfield({ idx, idxInput, contentToRead }: BasicTextfieldPropsType) {
  const { activeTextfield, setActiveTextfield } = useActiveTextfieldContext();
  const { activeBlock, setActiveBlock } = useActiveBlockContext();
  const { editor } = useEditorContext();

  useEffect(() => {
    if (activeTextfield === idxInput && activeBlock !== idx) {
      setActiveTextfield('');
    }
  }, [activeBlock]);

  useEffect(() => {
    if (activeTextfield === idxInput) {
      if (contentToRead === '&nbsp;' || contentToRead === '<p>&nbsp;</p>') {
        editor?.commands.setContent('');
      } else {
        editor?.commands.setContent(contentToRead);
      }
      editor?.commands.focus('end');
    }
  }, [activeTextfield]);

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      key={idxInput}
      tabIndex={idx}
      onFocus={async () => {
        if (activeTextfield !== idxInput) {
          setActiveTextfield(idxInput);

          if (contentToRead === '&nbsp;' || contentToRead === '<p>&nbsp;</p>') {
            await editor?.commands.setContent('');
          } else {
            await editor?.commands.setContent(contentToRead);
          }
        }
      }}
    >
      <Box mih="2rem">
        {activeTextfield === idxInput ? (
          <EditorContent editor={editor} />
        ) : contentToRead ? (
          <Flex m="0px" className="tiptap nonEditor" bg="var(--mantine-color-white)">
            <div>{parse(sanitizeBlocksContent(contentToRead))}</div>
          </Flex>
        ) : null}
      </Box>
    </div>
  );
}
