
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

export {
  getIngredientsFromRecepies,
  getSpecialDietsFromRecepies
}
