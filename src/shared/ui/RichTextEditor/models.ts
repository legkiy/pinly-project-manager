import { Text } from '@tiptap/extension-text';
import StarterKit from '@tiptap/starter-kit';
import { ChainedCommands, Extensions } from '@tiptap/react';

export const extensions: Extensions = [Text, StarterKit];

type MenuBarItem = {
  titleKey: string;
  name: string;
  tooltipKey: string;
  icon?: React.JSX.Element;
  onClick?: () => void;
};

export const menuBarItems = (focus: ChainedCommands): MenuBarItem[] => [
  {
    titleKey: 'H1',
    name: 'h1',
    tooltipKey: 'editor.h1',
    onClick: () => focus.toggleHeading({ level: 1 }).run(),
  },
  {
    titleKey: 'H2',
    name: 'h2',
    tooltipKey: 'editor.h2',
    onClick: () => focus.toggleHeading({ level: 2 }).run(),
  },
];
