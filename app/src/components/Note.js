export function Note ({ note, onToggle, onDelete }) {
  const { content, important } = note
  const label = important ? 'make not important' : 'make important'

  return (
    <li className='note'>
      <p>{content}</p>
      <button onClick={() => onToggle(note.id)}>{label}</button>
      <button onClick={() => onDelete(note.id)}>Delete Note</button>
    </li>
  )
}
