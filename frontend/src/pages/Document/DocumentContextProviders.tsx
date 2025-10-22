import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import LinkTiptap from '@tiptap/extension-link';
import Mention from '@tiptap/extension-mention';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Underline from '@tiptap/extension-underline';
import { mergeAttributes, ReactRenderer, useEditor } from '@tiptap/react';
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
  const [isNotSaved, setIsNotSaved] = useState<boolean>(false);

  let blocksContentHistory: blockType[][] = [];
  let historyPivot: number = 0;
  //const isNotSavedRef = useRef(isNotSaved)
  let isBlocksLoaded = false;

  const historyBuffer = 10;

  const undo = (): void => {
    isBlocksLoaded = false;
    if (historyPivot < historyBuffer) {
      historyPivot++;
      setBlocksContent(cloneDeep(blocksContentHistory[historyPivot]));
    }
  };

  const undoPossible = (): boolean => {
    console.log('hisotry lht:', blocksContentHistory);
    return blocksContentHistory.length > 1;
  };

  const redo = (): void => {
    isBlocksLoaded = false;
    if (historyPivot > 0) {
      historyPivot--;
      setBlocksContent(cloneDeep(blocksContentHistory[historyPivot]));
    }
  };

  const redoPossible = (): boolean => historyPivot > 0;

  useEffect(() => {
    if (isBlocksLoaded) {
      setIsNotSaved(true);
    } else {
      isBlocksLoaded = true;
      blocksContentHistory = [cloneDeep(blocksContent), ...blocksContentHistory];
      historyPivot = 0;
    }
  }, [blocksContent]);

  useEffect(() => {
    const notSavedWaringHandler = (e: BeforeUnloadEvent) => {
      if (isNotSaved) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    //console.log('isnotsaved', isNotSaved);

    if (isNotSaved) {
      window.addEventListener('beforeunload', notSavedWaringHandler);
      if (historyPivot === 0) {
        blocksContentHistory = [cloneDeep(blocksContent), ...blocksContentHistory];
      } else if (historyPivot) {
        blocksContentHistory = blocksContentHistory.slice(historyPivot);
        blocksContentHistory = [cloneDeep(blocksContent), ...blocksContentHistory];
      }

      if (blocksContentHistory.length > historyBuffer) {
        blocksContentHistory.pop();
      }

      return () => window.removeEventListener('beforeunload', notSavedWaringHandler);
    }
  }, [isNotSaved]);

  return (
    <BlocksContentContext.Provider
      value={{
        blocksContent,
        setBlocksContent,
        isNotSaved,
        setIsNotSaved,
        undo,
        redo,
        undoPossible,
        redoPossible,
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
  const { blocksContent, setBlocksContent } = useBlocksContentContext();
  const { activeBlock, setActiveBlock } = useActiveBlockContext();

  useEffect(() => {
    // const blocksContentCopy = cloneDeep(blocksContent);
    setBlocksContent(cloneDeep(blocksContent));
  }, [activeTextfield]);

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
  const { blocksContent, setBlocksContent, isNotSaved, setIsNotSaved } = useBlocksContentContext();
  const { activeTextfield, setActiveTextfield } = useActiveTextfieldContext();
  //const { referencesList, setReferencesList } = useReferencesListContext();
  // const activeBlockContainer = { activeBlock };

  const saveEditorContent = (idx: string, idxInput: string, toSave: string) => {
    //const blocksContentCopy = cloneDeep(blocksContent);
    //console.log(activeBlock, blocksContent[activeBlock]);
    // console.log('saveEditorContent', toSave);
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
        // let tmp = cloneDeep(blocksContent[activeBlock]);
        // blocksContent[activeBlock] = tmp;
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
        //FIXME id od reference jset stringkiem! tu i gdzie indziej popatrzeć
        console.log('act txt: ', activeTextfield);
        const [blockIdx, refId] = activeTextfield.split('bib');

        //console.log('whole: ', activeTextfield, 'blockIdx: ', blockIdx, 'refId', refId);
        const refIdx = blocksContent[activeBlock].blockContent.findIndex(
          (item) => item.id === 'bib'.concat(refId)
        );

        // console.log(
        //   'ref To save: ',
        //   refIdx,
        //   'items: ',
        //   blocksContent[activeBlock].blockContent,
        //   'refId: ',
        //   refId
        // );
        blocksContent[activeBlock].blockContent[refIdx].label = toSave;
        break;
      case 'pageBreak':
        //console.log('page breaaaak');
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
        //console.log('default on blur save: ', blocksContent);
        break;
    }
    // const blocksContentCopy = cloneDeep(blocksContent);
    // setBlocksContent(blocksContentCopy);
    setIsNotSaved(true);
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
        renderHTML({ options, node }) {
          console.log('merge atributes: ', mergeAttributes({ class: 'mention' }));
          //console.log('html atributes: ', options.HTMLAttributes.);
          return [
            'span',
            mergeAttributes(
              { class: 'mention' },
              { 'data-type': 'mention' },
              { 'data-id': node.attrs.label ?? node.attrs.id }
            ),
            `${node.attrs.label ?? node.attrs.id}`,
          ];
        },
        //suggestions working
        suggestion: {
          char: '',
          allowedPrefixes: null,
        },
      }),

      //, Placeholder.configure({ placeholder: 'This is placeholder' })
    ],
    //content: editorContent,
    onUpdate: ({ editor }) => {
      saveEditorContent(activeBlock, activeTextfield, editor.getHTML());
      //console.log(editor.getHTML());
    },
    // onSelectionUpdate({ editor }) {
    //   console.log('onSelectionUpdate: ', editor.state.selection.head);
    // },
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
