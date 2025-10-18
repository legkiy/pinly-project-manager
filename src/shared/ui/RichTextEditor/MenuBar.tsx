import { Button, ButtonGroup, Stack } from '@mui/material';
import { useEditorState } from '@tiptap/react';
import type { Editor } from '@tiptap/react';
import {
  CodeRounded,
  FormatBoldRounded,
  FormatItalicRounded,
  FormatQuoteRounded,
  FormatStrikethroughRounded,
  FormatListBulletedRounded,
  FormatListNumberedRounded,
  RedoRounded,
  UndoRounded,
} from '@mui/icons-material';
import styles from './styels.module.scss';

interface Props {
  editor: Editor;
}

const MenuBar = ({ editor }: Props) => {
  // const [active, setActive] = useState({
  //   p: editor.isActive('paragraph'),
  //   h1: editor.isActive('heading', { level: 1 }),
  //   h2: editor.isActive('heading', { level: 2 }),
  //   bold: editor.isActive('bold'),
  //   boldCan: !editor.can().chain().toggleBold().run() || false,
  // });

  // useEffect(() => {
  //   if (!editor) return;

  //   // при любом апдейте редактора обновляем стейт тулбара
  //   editor.on('transaction', () => {
  //     setActive({
  //       p: editor.isActive('paragraph'),
  //       h1: editor.isActive('heading', { level: 1 }),
  //       h2: editor.isActive('heading', { level: 2 }),
  //       bold: editor.isActive('bold'),
  //       boldCan: !editor.can().chain().toggleBold().run(),
  //     });
  //   });

  //   return () => {
  //     editor.off('transaction');
  //   };
  // }, [editor]);

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive('bold') ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive('italic') ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive('strike') ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive('code') ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor.isActive('paragraph') ?? false,
        isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive('heading', { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive('heading', { level: 6 }) ?? false,
        isBulletList: ctx.editor.isActive('bulletList') ?? false,
        isOrderedList: ctx.editor.isActive('orderedList') ?? false,
        isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
        isBlockquote: ctx.editor.isActive('blockquote') ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      };
    },
  });

  return (
    <Stack direction="row" className={styles.menuBar}>
      <ButtonGroup>
        <Button
          size="small"
          onClick={editor.chain().focus().toggleBold().run}
          disabled={!editorState.canBold}
          variant={editorState.isBold ? 'contained' : 'outlined'}
        >
          <FormatBoldRounded />
        </Button>
        <Button
          size="small"
          onClick={editor.chain().focus().toggleItalic().run}
          disabled={!editorState.canItalic}
          variant={editorState.isItalic ? 'contained' : 'outlined'}
        >
          <FormatItalicRounded />
        </Button>
        <Button
          size="small"
          onClick={editor.chain().focus().toggleStrike().run}
          disabled={!editorState.canStrike}
          variant={editorState.isStrike ? 'contained' : 'outlined'}
        >
          <FormatStrikethroughRounded />
        </Button>
        <Button
          size="small"
          onClick={editor.chain().focus().toggleCode().run}
          disabled={!editorState.canCode}
          variant={editorState.isCode ? 'contained' : 'outlined'}
        >
          <CodeRounded />
        </Button>
      </ButtonGroup>

      <Button size="small" onClick={editor.chain().focus().unsetAllMarks().run}>
        Clear marks
      </Button>
      <Button size="small" onClick={editor.chain().focus().clearNodes().run}>
        Clear nodes
      </Button>

      <ButtonGroup>
        <Button
          size="small"
          onClick={editor.chain().focus().setParagraph().run}
          variant={editorState.isParagraph ? 'contained' : 'outlined'}
        >
          P
        </Button>

        <Button
          size="small"
          onClick={editor.chain().focus().toggleHeading({ level: 1 }).run}
          variant={editorState.isHeading1 ? 'contained' : 'outlined'}
        >
          H1
        </Button>
        <Button
          size="small"
          onClick={editor.chain().focus().toggleHeading({ level: 2 }).run}
          variant={editorState.isHeading2 ? 'contained' : 'outlined'}
        >
          H2
        </Button>
        <Button
          size="small"
          onClick={editor.chain().focus().toggleHeading({ level: 3 }).run}
          variant={editorState.isHeading3 ? 'contained' : 'outlined'}
        >
          H3
        </Button>
        <Button
          size="small"
          onClick={editor.chain().focus().toggleHeading({ level: 4 }).run}
          variant={editorState.isHeading4 ? 'contained' : 'outlined'}
        >
          H4
        </Button>
      </ButtonGroup>

      <Button
        size="small"
        onClick={editor.chain().focus().toggleCodeBlock().run}
        className={editorState.isCodeBlock ? 'is-active' : ''}
      >
        Code block
      </Button>
      <ButtonGroup>
        <Button
          size="small"
          onClick={editor.chain().focus().toggleBulletList().run}
          variant={editorState.isBulletList ? 'contained' : 'outlined'}
        >
          <FormatListBulletedRounded />
        </Button>
        <Button
          size="small"
          onClick={editor.chain().focus().toggleOrderedList().run}
          variant={editorState.isOrderedList ? 'contained' : 'outlined'}
        >
          <FormatListNumberedRounded />
        </Button>
      </ButtonGroup>
      <Button
        size="small"
        onClick={editor.chain().focus().toggleBlockquote().run}
        variant={editorState.isBlockquote ? 'contained' : 'outlined'}
      >
        <FormatQuoteRounded />
      </Button>
      {/* <ButtonGroup>
        <Button size="small" onClick={editor.chain().focus().setHorizontalRule().run}>
          Horizontal rule
        </Button>
        <Button size="small" onClick={editor.chain().focus().setHardBreak().run}>
          Hard break
        </Button>
      </ButtonGroup> */}
      <ButtonGroup>
        <Button size="small" onClick={editor.chain().focus().undo().run} disabled={!editorState.canUndo}>
          <UndoRounded />
        </Button>
        <Button size="small" onClick={editor.chain().focus().redo().run} disabled={!editorState.canRedo}>
          <RedoRounded />
        </Button>
      </ButtonGroup>
    </Stack>
  );

  // return (
  //   <Stack direction="row" className={styles.menuBar}>
  //     <ButtonGroup>
  //       {menuBarItems(editor.chain().focus()).map((item, index) => (
  //         <Button
  //           key={item.titleKey + index}
  //           onClick={item.onClick}
  //           variant={active[item.name as keyof typeof active] ? 'contained' : 'outlined'}
  //           disabled={active[(item.name + 'Can') as keyof typeof active]}
  //           size="small"
  //           sx={{
  //             minWidth: 'unset',
  //             ':first-of-type': { borderBottomLeftRadius: 0 },
  //             ':last-child': { borderBottomRightRadius: 0 },
  //           }}
  //         >
  //           {item.icon ? <item.icon /> : item.titleKey}
  //         </Button>
  //       ))}
  //     </ButtonGroup>
  //   </Stack>
  // );
};
export default MenuBar;
