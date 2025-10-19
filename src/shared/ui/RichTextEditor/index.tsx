import { Paper } from '@mui/material';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import styles from './styels.module.scss';
import MenuBar from './MenuBar';
import './extendsStyle.scss';
import { extensions } from './models';

interface EditorRef {
  getHTML: () => string | undefined;
  setContent: (html: string) => void;
}

interface RichTextEditorProps {
  label?: string;
  value?: string;
  onChange?: (val: string) => void;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
}

const RichTextEditor = forwardRef<EditorRef, RichTextEditorProps>(
  ({ error, value, onChange, helperText, label, placeholder }, ref) => {
    const editor = useEditor({
      extensions,
      content: value || ``,
      onUpdate: ({ editor }) => {
        onChange?.(editor.getHTML());
      },
      autofocus: false,
      editorProps: {
        attributes: {
          class: 'tiptap',
        },
      },
    });

    const editorRef = useRef<Editor | null>(null);
    useImperativeHandle(ref, () => ({
      getHTML: () => editor?.getHTML(),
      setContent: (html: string) =>
        editor?.commands.setContent(html, {
          emitUpdate: false,
        }),
    }));
    editorRef.current = editor;

    useEffect(() => {
      if (!(editor && value)) return;
      editor.commands.setContent(value);
    }, [editor]);

    return (
      <Paper className={styles.editorBox}>
        <MenuBar editor={editor} />
        <EditorContent editor={editor} className={styles.editorField} />
      </Paper>
    );
  }
);
export default RichTextEditor;
