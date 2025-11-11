import {
  FaBold,
  FaCode,
  FaItalic,
  FaStrikethrough,
  FaSubscript,
  FaSuperscript,
  FaUnderline,
} from 'react-icons/fa';
import { groupedListType } from '@/Types';
import { useEditorContext } from '../../DocumentContextProviders';

export const useTextTools = (): groupedListType => {
  const { editor } = useEditorContext();

  return [
    {
      label: 'Text',
      group: [
        {
          label: 'Bold',
          Icon: () => <FaBold />,
          function: () => {
            editor?.commands.toggleBold();
          },
          value: null,
          belonging: ['article', 'beamer', 'book', 'letter', 'report'],
        },
        {
          label: 'Italic',
          Icon: () => <FaItalic />,
          function: () => {
            editor?.commands.toggleItalic();
          },
          value: null,
          belonging: ['article', 'beamer', 'book', 'letter', 'report'],
        },

        {
          label: 'Underilne',
          Icon: () => <FaUnderline />,
          function: () => {
            editor?.commands.toggleUnderline();
          },
          value: null,
          belonging: ['article', 'beamer', 'book', 'letter', 'report'],
        },
        {
          label: 'Strikethrough',
          Icon: () => <FaStrikethrough />,
          function: () => {
            editor?.commands.toggleStrike();
          },
          value: null,
          belonging: ['article', 'beamer', 'book', 'letter', 'report'],
        },
      ],
    },
    {
      label: 'Typewriter',
      group: [
        {
          label: 'Typewriter',
          Icon: () => <FaCode />,
          function: () => {
            editor?.commands.toggleCode();
          },
          value: null,
          belonging: ['article', 'beamer', 'book', 'letter', 'report'],
        },
      ],
    },

    {
      label: 'Indexes',
      group: [
        {
          Icon: () => <FaSubscript />,
          function: () => editor?.commands.toggleSubscript(),
          belonging: ['article', 'beamer', 'book', 'letter', 'report'],
          label: 'Subscript',
          value: null,
        },
        {
          Icon: () => <FaSuperscript />,
          function: () => editor?.commands.toggleSuperscript(),
          belonging: ['article', 'beamer', 'book', 'letter', 'report'],
          label: 'Superscript',
          value: null,
        },
      ],
    },
  ];
};
