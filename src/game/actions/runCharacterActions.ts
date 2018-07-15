const runCharacterActions = state => {
  state.characters.forEach(char => {
    char.age = char.age + 0.01
  })

  return state.characters
}

export default runCharacterActions
