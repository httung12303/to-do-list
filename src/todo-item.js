function TodoItem(
  title = 'Untitled',
  description = 'No description',
  dueDate = 'No due date',
  finished = false
) {
  function propertiesOnly() {
    return { title, dueDate, description, finished };
  }
  return { ...propertiesOnly(), propertiesOnly };
}

export default TodoItem;
