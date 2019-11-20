
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

export default getIngredientsFromRecepies
