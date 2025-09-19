import StarterKit from '@tiptap/starter-kit';
import { ChainedCommands, Extensions } from '@tiptap/react';
import { TextStyleKit } from '@tiptap/extension-text-style';
import FormatBoldRoundedIcon from '@mui/icons-material/FormatBoldRounded';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export const extensions: Extensions = [TextStyleKit, StarterKit];

type MenuBarItem = {
  titleKey: string;
  name: string;
  tooltipKey: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
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
  {
    titleKey: 'Bold',
    name: 'bold',
    tooltipKey: 'editor.bold',
    onClick: () => focus.toggleBold().run(),
    icon: FormatBoldRoundedIcon,
  },
];
