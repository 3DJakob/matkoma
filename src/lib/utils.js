
const getIngridientsFromRecepies = (recepies) => {
  const ingridients = []
  recepies.forEach(recepie => {
    recepie.ingredients.forEach(ingridient => {
      if (!ingridients.includes(ingridient.name)) {
        ingridients.push(ingridient.name)
      }
    })
  })
  return ingridients
}

export default getIngridientsFromRecepies
