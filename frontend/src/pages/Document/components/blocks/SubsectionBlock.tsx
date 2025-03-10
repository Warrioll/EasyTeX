import React, { Dispatch, SetStateAction } from 'react';
import { Editor, EditorContent } from '@tiptap/react';
import parse from 'html-react-parser';
import { Badge, Button, Flex, FocusTrap, Group, Input, Menu } from '@mantine/core';
import { useDisclosure, useFocusWithin } from '@mantine/hooks';
import { RichTextEditor } from '@mantine/tiptap';
import { blockType } from '@/Types';
import MarkedBlockFrame from './MarkedBlockFrame';
import styles from './blocks.module.css';

type SectionBlockProps = {
  idx: number;
  activeSection: number;
  setActiveSecion: Dispatch<SetStateAction<number>>;
  sectionsContent: blockType[];
  setSectionsContent: Dispatch<SetStateAction<blockType[]>>;
  editor: Editor;
};

export default function SubsectionBlock({
  idx,
  activeSection,
  setActiveSecion,
  sectionsContent,
  setSectionsContent,
  editor,
}: SectionBlockProps) {
  const [focusTrap, { toggle }] = useDisclosure(false);

  const updateSectionContent = (event) => {
    console.log('section event', event);
    let content = [...sectionsContent];
    console.log('section  event.target.value', event.target.value);
    //content[idx].blockContent = event.target.value;
    content[idx] = {
      ...content[idx],
      //blockContent: { idx: 1, sectionContent: event.target.value },
      blockContent: event.target.value,
    };
    console.log('section content[idx].blockContent', content[idx].blockContent);
    setSectionsContent(content);
  };

  return (
    <Flex>
      <MarkedBlockFrame
        idx={idx}
        activeSection={activeSection}
        setActiveSecion={setActiveSecion}
        blockName="Subsection"
        sectionsContent={sectionsContent}
        setSectionsContent={setSectionsContent}
      >
        <div
          key={idx}
          tabIndex={idx}
          onFocus={async () => {
            setActiveSecion(idx);
            // sectionsContent[idx].blockContent
            //   ?
            await editor?.commands.setContent(sectionsContent[idx].blockContent);
            //: null;
            //console.log('onFocus', block);
          }}
          onBlur={() => {
            let content = sectionsContent;
            content[idx].blockContent = editor?.getHTML();
            setSectionsContent(content);
            //console.log('OnBlur', editorContent);
          }}
        >
          {/* <FocusTrap active={focusTrap}>
            <Input
              radius="md"
              placeholder="Header..."
              variant="header1"
              value={
                sectionsContent[idx].blockContent === undefined
                  ? ''
                  : sectionsContent[idx].blockContent
                //sectionsContent[idx].blockContent.sectionContent === undefined ? '' : sectionsContent[idx].blockContent.sectionContent
              }
              onChange={(event) => updateSectionContent(event)}
              w="100%"
              style={{ borderRadius: 'var(--mantine-radius-md)' }}
            />
          </FocusTrap> */}
          {activeSection === idx ? (
            // <RichTextEditor editor={editor}>
            //   <RichTextEditor.Content />
            // </RichTextEditor>
            <FocusTrap active={focusTrap}>
              <EditorContent editor={editor} />
            </FocusTrap>
          ) : sectionsContent[idx].blockContent ? (
            <div className={styles.textfieldNotFocused}>
              {parse(sectionsContent[idx].blockContent as string)}
            </div>
          ) : null}
        </div>
      </MarkedBlockFrame>
    </Flex>
  );
}
