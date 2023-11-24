interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  return <li>{note.title}</li>;
}
