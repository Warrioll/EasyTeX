import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import LinkTiptap from '@tiptap/extension-link';
import Mention from '@tiptap/extension-mention';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Underline from '@tiptap/extension-underline';
import { mergeAttributes, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { cloneDeep } from 'lodash';
import { blockType } from '@/Types';

type DocumentProvidersPropsType = {
  children: ReactNode;
};

const BlocksContentContext = createContext<any>(null);
const ActiveBlockContext = createContext<any>(null);
const ActiveTextfieldContext = createContext<any>(null);
const ActiveTableCellContext = createContext<any>(null);
//export const ReferencesListContext = createContext<any>(null);
const EditorContext = createContext<any>(null);
const ZoomsContext = createContext<any>(null);

export const BlocksContentProvider = ({ children }: DocumentProvidersPropsType) => {
  const [blocksContent, setBlocksContent] = useState<blockType[]>([]);
  const [isNotSaved, setIsNotSaved] = useState<boolean>(false);

  useEffect(() => {
    const notSavedWaringHandler = (e: BeforeUnloadEvent) => {
      if (isNotSaved) {
        e.preventDefault();
        e.returnValue = true;
      }
    };

    if (isNotSaved) {
      window.addEventListener('beforeunload', notSavedWaringHandler);
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

  useEffect(() => {
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
  const { activeBlock, setActiveBlock } = useActiveBlockContext();

  useEffect(() => {
    setActiveTableCell([0, 0]);
  }, [activeBlock]);

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

export const EditorProvider = ({ children }: DocumentProvidersPropsType) => {
  const { activeBlock, setActiveBlock } = useActiveBlockContext();
  const { blocksContent, setBlocksContent, isNotSaved, setIsNotSaved } = useBlocksContentContext();
  const { activeTextfield, setActiveTextfield } = useActiveTextfieldContext();

  const saveEditorContent = (toSave: string) => {
    switch (blocksContent[activeBlock].typeOfBlock) {
      case 'titlePage':
        if (activeTextfield.includes('title')) {
          blocksContent[activeBlock].blockContent.title = toSave;
        }
        if (activeTextfield.includes('author')) {
          blocksContent[activeBlock].blockContent.author = toSave;
        }
        if (activeTextfield.includes('date')) {
          blocksContent[activeBlock].blockContent.date = toSave;
        }
        break;
      case 'figure':
        blocksContent[activeBlock].blockContent.label = toSave;
        break;
      case 'table':
        if (activeTextfield.includes('tableLabel')) {
          blocksContent[activeBlock].blockContent.label = toSave;
        } else {
          const tmp = activeTextfield.split(';');
          const cellId = [tmp[0], tmp[1], tmp[2]];
          blocksContent[activeBlock].blockContent.content[(cellId[1] as unknown as number) - 1][
            (cellId[2] as unknown as number) - 1
          ] = toSave;
        }
        break;
      case 'references':
        const [blockIdx, refId] = activeTextfield.split('bib');
        const refIdx = blocksContent[activeBlock].blockContent.findIndex(
          (item) => item.id === 'bib'.concat(refId)
        );

        blocksContent[activeBlock].blockContent[refIdx].label = toSave;
        break;
      case 'pageBreak':
        if (activeTextfield.includes('SlideTitle')) {
          blocksContent[activeBlock].blockContent.title = toSave;
        }
        if (activeTextfield.includes('SlideSubtitle')) {
          blocksContent[activeBlock].blockContent.subtitle = toSave;
        }
        break;
      default:
        blocksContent[activeBlock].blockContent = toSave;
        break;
    }
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
        suggestion: {
          char: '',
          allowedPrefixes: null,
        },
      }),
    ],

    onUpdate: ({ editor }) => {
      saveEditorContent(editor.getHTML());
    },
    shouldRerenderOnTransaction: false,
  });

  return <EditorContext.Provider value={{ editor }}>{children}</EditorContext.Provider>;
};

export const ZoomsProvider = ({ children }: DocumentProvidersPropsType) => {
  const [pdfZoom, setPdfZoom] = useState<string>('1');
  const [workspaceZoom, setWorkspaceZoom] = useState<string>('1');

  return (
    <ZoomsContext.Provider
      value={{
        pdfZoom,
        setPdfZoom,
        workspaceZoom,
        setWorkspaceZoom,
      }}
    >
      {children}
    </ZoomsContext.Provider>
  );
};

export const useBlocksContentContext = () => useContext(BlocksContentContext);
export const useActiveBlockContext = () => useContext(ActiveBlockContext);
export const useActiveTextfieldContext = () => useContext(ActiveTextfieldContext);
export const useActiveTableCellContext = () => useContext(ActiveTableCellContext);
export const useEditorContext = () => useContext(EditorContext);
export const useZoomsContext = () => useContext(ZoomsContext);
