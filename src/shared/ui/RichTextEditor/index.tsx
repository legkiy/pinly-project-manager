import { Paper } from '@mui/material';
import { EditorContent, useEditor } from '@tiptap/react';
import { extensions } from './models';
import MenuBar from './MenuBar';

const RichTextEditor = () => {
  const editor = useEditor({
    extensions,
    content: '<p>Hello World!</p>',
  });

  return (
    <Paper>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </Paper>
  );
};
export default RichTextEditor;
