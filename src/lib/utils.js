
const getIngredientsFromRecepies = (recepies) => {
  const ingredients = []
  for (const recepie of recepies) {
    const recipieIngredients = recepie.ingredients.map(ingredient => ingredient.name)
    for (const recipieIngredient of recipieIngredients) {
      if (!ingredients.includes(recipieIngredient)) {
        ingredients.push(recipieIngredient)
      }
    }
  }

  return ingredients
}

const getSpecialDietsFromRecepies = (recepies) => {
  const diets = []
  for (const recepie of recepies) {
    for (const diet of recepie.specialDiets) {
      if (!diets.includes(diet)) {
        diets.push(diet)
      }
    }
  }

  return diets
}
const getTextColorFromDifficulty = (difficulty) => {
  let color
  switch (difficulty) {
    case 'Enkel':
      color = '#6FC48C'
      break
    case 'Medel':
      color = '#6FC48C'
      break
    case 'Avancerad':
      color = '#6FC48C'
      break
    default:
      color = '#6FC48C'
  }
  return color
}
export {
  getIngredientsFromRecepies,
  getSpecialDietsFromRecepies,
  getTextColorFromDifficulty
}
