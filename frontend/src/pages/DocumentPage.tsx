//import { IconBold, IconItalic } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import { BubbleMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import parse from 'html-react-parser';
import { Textarea, Title } from '@mantine/core';
import { useTextSelection } from '@mantine/hooks';
import { Link, RichTextEditor } from '@mantine/tiptap';

export default function DocumentPage() {
  // const BoldIcon = () => 'B'; //<IconBold size="1rem" stroke={3.5} />;
  // const ItalicIcon = () => 'I'; //<IconItalic size="1rem" stroke={3.5} />;

  // const [content, setContent] = useState('yolo');
  // const [content2, setContent2] = useState('yolo');

  // const editor = useEditor({
  //   extensions: [StarterKit, Link],
  //   content: `${content}`,
  //   onUpdate: (editor) => console.log(editor.editor.getHTML()),
  // });

  // const editor2 = useEditor({
  //   extensions: [StarterKit, Link],
  //   content: `yolo`,
  //   onUpdate: (editor) => console.log(editor.editor.getHTML()),
  // });

  // const editor3 = useEditor({
  //   extensions: [StarterKit, Link],
  //   content: `${content}`,
  //   onUpdate: (editor) => console.log(editor.editor.getHTML()),
  // });

  // const selection = useTextSelection();
  // const sel = window.getSelection();
  // const jej = document.getElementById('jej');

  // const ta = useRef(null);

  // return (
  //   <>
  //     ------------------------------------
  //     <RichTextEditor editor={editor}>
  //       <RichTextEditor.ControlsGroup>
  //         <RichTextEditor.Bold />
  //         <RichTextEditor.Italic />
  //       </RichTextEditor.ControlsGroup>
  //       <RichTextEditor editor={editor3}>
  //         <RichTextEditor.Content />
  //       </RichTextEditor>
  //       ---------------------------------------
  //       <div> Drugi edytoir</div>
  //       -----------------------------------
  //       <RichTextEditor editor={editor2}>
  //         <RichTextEditor.Content />
  //       </RichTextEditor>
  //       ---------------------------
  //     </RichTextEditor>
  //     <textarea ref={ta} />
  //     <button
  //       className=".x"
  //       type="button"
  //       onClick={() => {
  //         const selceted = selection?.toString();
  //         console.log(selection.start);
  //         const all = document.querySelector('.x');
  //         //? selection?.selectAllChildren(document.querySelector('RichTextEditor.Content'))

  //         console.log('start', ta.selectionStart);
  //       }}
  //     >
  //       df
  //     </button>
  //     <div id="jej">fdg</div>
  //     {}
  //   </>
  // );

  // const [text, setText] = useState(''); // stan dla tekstu
  // const textAreaRef = useRef(null); // ref do elementu textarea

  // const replaceSelectedText = () => {
  //   const textarea = textAreaRef.current;

  //   if (!textarea) {
  //     return;
  //   }

  //   // Pobranie pozycji zaznaczenia
  //   const start = textarea.selectionStart;
  //   const end = textarea.selectionEnd;
  //   console.log('s', start);
  //   console.log('s', start);
  //   console.log('e', end);

  //   const selectedText = text.substring(start, end);

  //   // Nowy tekst do zastąpienia
  //   const replacement = 'uuuuuuuuuuuuuuuuu';

  //   if (replacement !== null) {
  //     // Podmiana zaznaczonego tekstu
  //     const newText = text.substring(0, start) + replacement + text.substring(end);
  //     setText(newText);

  //     // Ustawienie kursora za podmienionym tekstem
  //     setTimeout(() => {
  //       textarea.selectionStart = textarea.selectionEnd = start + replacement.length;
  //     }, 0);
  //   }
  // };

  // return (
  //   <div>
  //     {/* <Textarea
  //       placeholder="Autosize with no rows limit"
  //       label="Autosize with no rows limit"
  //       autosize
  //       minRows={2}
  //       ref={textAreaRef}
  //       value={text}
  //       onChange={(e) => setText(e.target.value)} // aktualizacja stanu
  //     /> */}
  //     <RichTextEditor editor={editor2} >
  //       <RichTextEditor.Content />
  //     </RichTextEditor>
  //     {/* <textarea
  //       ref={textAreaRef}
  //       value={text}
  //       onChange={(e) => setText(e.target.value)} // aktualizacja stanu
  //       rows={5}
  //       cols={40}
  //     /> */}
  //     <br />
  //     <button onClick={replaceSelectedText} type="button">
  //       Podmień zaznaczony tekst
  //     </button>
  //   </div>
  // );
  const [sectionsContent, setSectionContent] = useState([
    `<div>contetnt 1 </div>`,
    '<p>contetnt<strong> 2</strong></p>',
  ]);

  const [activeSection, setActiveSecion] = useState(0);
  const [editorContent, setEditorContent] = useState(sectionsContent[activeSection]);

  const editor = useEditor({
    extensions: [StarterKit],
    content: editorContent,
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML()); // Zapisuje treść w konsoli po każdej edycji
    },
  });

  const replaceSelectedText = () => {
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      ' '
    );

    if (!selectedText) {
      //alert('Brak zaznaczonego tekstu');
      return;
    }

    const replacement = 'wwwwwwwwwwwww'; //prompt('Podaj tekst, który ma zastąpić zaznaczony:', selectedText);

    if (replacement !== null) {
      // Zastąpienie zaznaczonego tekstu
      editor.commands.insertContent(replacement);
    }
  };

  return (
    <div>
      <div
        tabIndex={0}
        onFocus={() => {
          setActiveSecion(0);
          editor?.commands.setContent(sectionsContent[0]);
          console.log(activeSection);
        }}
      >
        {activeSection === 0 ? (
          <RichTextEditor editor={editor}>
            <RichTextEditor.Content />
          </RichTextEditor>
        ) : (
          parse(sectionsContent[0])
        )}
      </div>

      <div
        tabIndex={1}
        onFocus={() => {
          setActiveSecion(1);
          editor?.commands.setContent(sectionsContent[1]);
          console.log(activeSection);
        }}
      >
        {activeSection === 1 ? (
          <RichTextEditor editor={editor}>
            <RichTextEditor.Content />
          </RichTextEditor>
        ) : (
          parse(sectionsContent[1])
        )}
      </div>

      <button type="button" onClick={replaceSelectedText} style={{ marginTop: '10px' }}>
        Podmień zaznaczony tekst
      </button>
    </div>
  );
}
