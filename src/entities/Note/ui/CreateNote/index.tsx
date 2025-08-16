import { CreateNewItem } from '@/shared/ui';
import { useNotesStore } from '../../lib';
import { CreateNoteDTO } from '../../model';

interface Props {
  projectId: string;
}

const CreateNote = ({ projectId }: Props) => {
  const baseNote: CreateNoteDTO = {
    projectId,
    title: '',
    descriptions: '',
  };
  const createNote = useNotesStore((s) => s.createNote);

  return <CreateNewItem onClick={() => createNote(baseNote)} titleKey="note.add" type="button" color="success" />;
};

export default CreateNote;
