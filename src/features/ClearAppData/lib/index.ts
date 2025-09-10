import { useNotesStore } from '@/entities/Note';
import { useProjectStore } from '@/entities/Project';

export async function clearAppData() {
  await Promise.all([useProjectStore.getState().clearStore(), useNotesStore.getState().clearStore()]);
}
