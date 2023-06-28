export function Note ({ note, onToggle }) {
  const { content, important } = note
  const label = important ? 'make not important' : 'make important'

  return (
    <li className='note'>
      <p>{content}</p>
      <button onClick={() => onToggle(note.id)}>{label}</button>
    </li>
  )
}
