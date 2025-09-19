import { Paper } from '@mui/material';
import { EditorContent, useEditor } from '@tiptap/react';
import { extensions } from './models';
import MenuBar from './MenuBar';
import './styel.css';

interface RichTextEditorProps {
  label?: string;
  value?: string;
  onChange?: (val: string) => void;
  error?: boolean;
  helperText?: string;
}

const RichTextEditor = ({ error, value, onChange, helperText, label }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions,
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <Paper>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </Paper>
  );
};
export default RichTextEditor;
