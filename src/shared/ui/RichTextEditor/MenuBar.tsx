import { Button, Stack } from '@mui/material';
import { Editor, useEditorState } from '@tiptap/react';
import { menuBarItems } from './models';

interface Props {
  editor: Editor;
}

const MenuBar = ({ editor }: Props) => {
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      h1: editor.isActive('heading', { level: 1 }) ?? false,
      h2: editor.isActive('heading', { level: 2 }) ?? false,
    }),
  });
  return (
    <Stack direction="row">
      {menuBarItems(editor.chain().focus()).map((item, index) => (
        <Button
          key={item.titleKey + index}
          onClick={item.onClick}
          variant={editorState[item.name as keyof typeof editorState] ? 'contained' : 'outlined'}
          size="small"
          sx={{
            minWidth: 'unset',
          }}
        >
          {item.titleKey}
        </Button>
      ))}
    </Stack>
  );
};
export default MenuBar;
