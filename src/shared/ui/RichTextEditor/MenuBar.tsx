import { Button, ButtonGroup, Stack } from '@mui/material';
import { Editor, useEditorState } from '@tiptap/react';
import { menuBarItems } from './models';

interface Props {
  editor: Editor;
}

const MenuBar = ({ editor }: Props) => {
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      bold: editor.isActive('bold') ?? false,
      boldCan: !editor.can().chain().toggleBold().run() || false,
      isItalic: editor.isActive('italic') ?? false,
      canItalic: editor.can().chain().toggleItalic().run() ?? false,
      isStrike: editor.isActive('strike') ?? false,
      canStrike: editor.can().chain().toggleStrike().run() ?? false,
      isCode: editor.isActive('code') ?? false,
      canCode: editor.can().chain().toggleCode().run() ?? false,
      canClearMarks: editor.can().chain().unsetAllMarks().run() ?? false,

      p: editor.isActive('paragraph') ?? false,
      h1: editor.isActive('heading', { level: 1 }) ?? false,
      h2: editor.isActive('heading', { level: 2 }) ?? false,
      h3: editor.isActive('heading', { level: 3 }) ?? false,
      bulletList: editor.isActive('bulletList') ?? false,
      orderedList: editor.isActive('orderedList') ?? false,
      codeBlock: editor.isActive('codeBlock') ?? false,

      isBlockquote: editor.isActive('blockquote') ?? false,
      canUndo: editor.can().chain().undo().run() ?? false,
      canRedo: editor.can().chain().redo().run() ?? false,
    }),
  });

  return (
    <Stack direction="row">
      <ButtonGroup>
        {menuBarItems(editor.chain().focus()).map((item, index) => (
          <Button
            key={item.titleKey + index}
            onClick={item.onClick}
            variant={editorState[item.name as keyof typeof editorState] ? 'contained' : 'outlined'}
            disabled={editorState[(item.name + 'Can') as keyof typeof editorState]}
            size="small"
            sx={{
              minWidth: 'unset',
              ':first-child': {
                borderBottomLeftRadius: 0,
              },
              ':last-child': {
                borderBottomRightRadius: 0,
              },
            }}
          >
            {item.icon ? <item.icon /> : item.titleKey}
          </Button>
        ))}
      </ButtonGroup>
    </Stack>
  );
};
export default MenuBar;
