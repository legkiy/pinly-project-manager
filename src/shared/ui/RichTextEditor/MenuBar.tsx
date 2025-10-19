import { ButtonGroup, Divider, Stack } from '@mui/material';
import { useEditorState } from '@tiptap/react';
import type { Editor, EditorStateSnapshot } from '@tiptap/react';
import {
  FormatBoldRounded,
  FormatItalicRounded,
  FormatListBulletedRounded,
  FormatListNumberedRounded,
  FormatQuoteRounded,
  FormatStrikethroughRounded,
  HorizontalRuleRounded,
  RedoRounded,
  TerminalRounded,
  UndoRounded,
} from '@mui/icons-material';
import { useCallback } from 'react';
import styles from './styels.module.scss';
import MenuBtn from './MenuBtn';

interface Props {
  editor: Editor;
}

const MenuBar = ({ editor }: Props) => {
  const selector = useCallback(
    (ctx: EditorStateSnapshot<Editor>) => ({
      isBold: ctx.editor.isActive('bold') ?? false,
      canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
      isItalic: ctx.editor.isActive('italic') ?? false,
      canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
      isStrike: ctx.editor.isActive('strike') ?? false,
      canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
      isCode: ctx.editor.isActive('code') ?? false,
      canCodeBlock: ctx.editor.can().chain().toggleCodeBlock().run() ?? false,
      canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
      isParagraph: ctx.editor.isActive('paragraph') ?? false,
      isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
      isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
      isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
      isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
      isBulletList: ctx.editor.isActive('bulletList') ?? false,
      isOrderedList: ctx.editor.isActive('orderedList') ?? false,
      isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
      isBlockquote: ctx.editor.isActive('blockquote') ?? false,
      canUndo: ctx.editor.can().chain().undo().run() ?? false,
      canRedo: ctx.editor.can().chain().redo().run() ?? false,
    }),
    []
  );

  const editorState = useEditorState({
    editor,
    selector,
  });

  return (
    <Stack direction="row" className={styles.menuBar}>
      <ButtonGroup>
        <MenuBtn
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          active={editorState.isBold}
        >
          <FormatBoldRounded />
        </MenuBtn>
        <MenuBtn
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          active={editorState.isItalic}
        >
          <FormatItalicRounded />
        </MenuBtn>
        <MenuBtn
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          active={editorState.isStrike}
        >
          <FormatStrikethroughRounded />
        </MenuBtn>
        <MenuBtn
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          disabled={!editorState.canCodeBlock}
          active={editorState.isCodeBlock}
        >
          <TerminalRounded />
        </MenuBtn>
      </ButtonGroup>
      <Divider orientation="vertical" variant="middle" flexItem />
      <MenuBtn onClick={() => editor.chain().focus().unsetAllMarks().run()}>Clear marks</MenuBtn>
      <MenuBtn onClick={() => editor.chain().focus().clearNodes().run()}>Clear nodes</MenuBtn>
      <Divider orientation="vertical" variant="middle" flexItem />
      <ButtonGroup>
        <MenuBtn onClick={() => editor.chain().focus().setParagraph().run()} active={editorState.isParagraph}>
          P
        </MenuBtn>

        <MenuBtn
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editorState.isHeading1}
        >
          H1
        </MenuBtn>
        <MenuBtn
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editorState.isHeading2}
        >
          H2
        </MenuBtn>
        <MenuBtn
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editorState.isHeading3}
        >
          H3
        </MenuBtn>
        <MenuBtn
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          active={editorState.isHeading4}
        >
          H4
        </MenuBtn>
      </ButtonGroup>
      <Divider orientation="vertical" variant="middle" flexItem />
      <ButtonGroup>
        <MenuBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editorState.isBulletList}>
          <FormatListBulletedRounded />
        </MenuBtn>
        <MenuBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editorState.isOrderedList}>
          <FormatListNumberedRounded />
        </MenuBtn>
      </ButtonGroup>
      <Divider orientation="vertical" variant="middle" flexItem />
      <MenuBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editorState.isBlockquote}>
        <FormatQuoteRounded />
      </MenuBtn>
      <Divider orientation="vertical" variant="middle" flexItem />
      <ButtonGroup>
        <MenuBtn onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <HorizontalRuleRounded />
        </MenuBtn>
      </ButtonGroup>
      <Divider orientation="vertical" variant="middle" flexItem />
      <ButtonGroup>
        <MenuBtn onClick={() => editor.chain().focus().undo().run()} disabled={!editorState.canUndo}>
          <UndoRounded />
        </MenuBtn>
        <MenuBtn onClick={() => editor.chain().focus().redo().run()} disabled={!editorState.canRedo}>
          <RedoRounded />
        </MenuBtn>
      </ButtonGroup>
    </Stack>
  );
};
export default MenuBar;
