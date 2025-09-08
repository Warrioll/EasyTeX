import { createContext, ReactElement, ReactNode, useContext, useEffect, useState } from 'react';
import LinkTiptap from '@tiptap/extension-link';
import Mention from '@tiptap/extension-mention';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Underline from '@tiptap/extension-underline';
import { ReactRenderer, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { cloneDeep } from 'lodash';
import { blockType, referencesElementType } from '@/Types';

type DocumentProvidersPropsType = {
  children: ReactNode;
};

export const BlocksContentContext = createContext<any>(null);
export const ActiveBlockContext = createContext<any>(null);
export const ActiveTextfieldContext = createContext<any>(null);
export const ActiveTableCellContext = createContext<any>(null);
export const ReferencesListContext = createContext<any>(null);
export const EditorContext = createContext<any>(null);

export const BlocksContentProvider = ({ children }: DocumentProvidersPropsType) => {
  const [blocksContent, setBlocksContent] = useState<blockType[]>([]);

  return (
    <BlocksContentContext.Provider
      value={{
        blocksContent,
        setBlocksContent,
      }}
    >
      {children}
    </BlocksContentContext.Provider>
  );
};

export const ActiveBlockProvider = ({ children }: DocumentProvidersPropsType) => {
  const [activeBlock, setActiveBlock] = useState<number>(0);

  return (
    <ActiveBlockContext.Provider
      value={{
        activeBlock,
        setActiveBlock,
      }}
    >
      {children}
    </ActiveBlockContext.Provider>
  );
};

export const ActiveTextfieldProvider = ({ children }: DocumentProvidersPropsType) => {
  const [activeTextfield, setActiveTextfield] = useState<string>('');
  const { activeBlock, setActiveBlock } = useActiveBlockContext();

  //useEffect(() => {}, [activeBlock]);

  return (
    <ActiveTextfieldContext.Provider
      value={{
        activeTextfield,
        setActiveTextfield,
      }}
    >
      {children}
    </ActiveTextfieldContext.Provider>
  );
};

export const ActiveTableCellProvider = ({ children }: DocumentProvidersPropsType) => {
  const [activeTableCell, setActiveTableCell] = useState<[number, number]>([0, 0]); //[row, column]

  return (
    <ActiveTableCellContext.Provider
      value={{
        activeTableCell,
        setActiveTableCell,
      }}
    >
      {children}
    </ActiveTableCellContext.Provider>
  );
};

// export const ReferencesListProvider = ({ children }: DocumentProvidersPropsType) => {
//   const [referencesList, setReferencesList] = useState<referencesElementType[]>([]); //[row, column]

//   return (
//     <ReferencesListContext.Provider
//       value={{
//         referencesList,
//         setReferencesList,
//       }}
//     >
//       {children}
//     </ReferencesListContext.Provider>
//   );
// };

export const EditorProvider = ({ children }: DocumentProvidersPropsType) => {
  const { activeBlock, setActiveBlock } = useActiveBlockContext();
  const { blocksContent, setBlocksContent } = useBlocksContentContext();
  const { activeTextfield, setActiveTextfield } = useActiveTextfieldContext();
  //const { referencesList, setReferencesList } = useReferencesListContext();
  // const activeBlockContainer = { activeBlock };

  const saveEditorContent = (idx: string, idxInput: string, toSave: string) => {
    const blocksContentCopy = cloneDeep(blocksContent);
    //console.log(activeBlock, blocksContent[activeBlock]);
    console.log('saveEditorContent', toSave);
    switch (blocksContent[activeBlock].typeOfBlock) {
      case 'titlePage':
        //console.log('titlePage');
        if (activeTextfield.includes('title')) {
          //console.log('title');
          blocksContent[activeBlock].blockContent.title = toSave;
        }
        if (activeTextfield.includes('author')) {
          blocksContent[activeBlock].blockContent.author = toSave;
        }
        if (activeTextfield.includes('date')) {
          blocksContent[activeBlock].blockContent.date = toSave;
        }
        //console.log('end');
        break;
      case 'figure':
        blocksContent[activeBlock].blockContent.label = toSave;
        break;
      case 'table':
        //FIXME sprawedzić czy działa i label zapisywanie
        //console.log('table on blur save');
        if (activeTextfield.includes('tableLabel')) {
          blocksContent[activeBlock].blockContent.label = toSave;
        } else {
          const tmp = activeTextfield.split(';');
          const cellId = [tmp[0], tmp[1], tmp[2]]; //0 - id tabeli, 1 - rows, 2- columns
          blocksContent[activeBlock].blockContent.content[(cellId[1] as unknown as number) - 1][
            (cellId[2] as unknown as number) - 1
          ] = toSave;
        }

        break;
      case 'references':
        //FIXME id od reference jset stringkiem! tu i gdzie indziej popatrzć
        //console.log(blocksContentCopy[activeBlock]);
        const [blockIdx, refId] = activeTextfield.split('ref');

        console.log('whole: ', activeTextfield, 'blockIdx: ', blockIdx, 'refId', refId);
        const refIdx = blocksContent[activeBlock].blockContent.findIndex(
          (item) => item.id === 'ref'.concat(refId)
        );

        console.log(
          'ref To save: ',
          refIdx,
          'items: ',
          blocksContent[activeBlock].blockContent,
          'refId: ',
          refId
        );
        blocksContent[activeBlock].blockContent[refIdx].label = toSave;
        break;
      case 'pageBreak':
        console.log('page breaaaak');
        // if (typeof blocksContent[activeBlock].blockContent === 'object') {
        if (activeTextfield.includes('SlideTitle')) {
          blocksContent[activeBlock].blockContent.title = toSave;
        }
        if (activeTextfield.includes('SlideSubtitle')) {
          blocksContent[activeBlock].blockContent.subtitle = toSave;
        }
        // }
        break;
      default:
        blocksContent[activeBlock].blockContent = toSave;
        console.log('default on blur save: ', blocksContent);
        break;
    }
    //setBlocksContent(blocksContentCopy);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Subscript,
      Superscript,
      LinkTiptap,
      Mention.configure({
        HTMLAttributes: {
          class: 'mention',
        },
        suggestion: {
          char: '',
        },
      }),

      //, Placeholder.configure({ placeholder: 'This is placeholder' })
    ],
    //content: editorContent,
    onUpdate: ({ editor }) => {
      //TODO Memo albo coś żeby zobptymalisowac renderowanie

      saveEditorContent(activeBlock, activeTextfield, editor.getHTML());
      //console.log(editor.getHTML());
    },
  });

  return (
    <EditorContext.Provider
      value={{
        editor,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useBlocksContentContext = () => useContext(BlocksContentContext);
export const useActiveBlockContext = () => useContext(ActiveBlockContext);
export const useActiveTextfieldContext = () => useContext(ActiveTextfieldContext);
export const useActiveTableCellContext = () => useContext(ActiveTableCellContext);
//export const useReferencesListContext = () => useContext(ReferencesListContext);
export const useEditorContext = () => useContext(EditorContext);
