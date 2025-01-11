import { Active, Over } from '@dnd-kit/core';
import { DnDItemType } from '../model';

export { default as useTaskBoard } from './store';

export const checkDragItemType = (eventType: Active | Over, type: DnDItemType) => eventType.data.current?.type === type;
