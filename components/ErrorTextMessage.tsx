const getFormErrorMessage = (name: string, errors: any) => {
  const hasNestedObject = name.includes('.')
  if (hasNestedObject) {
    const nestedObject = name
      .split('.')
      .reduce((obj, key) => obj && obj[key], { ...errors })
    return nestedObject ? nestedObject.message : ' '
  }
  return errors[name] ? errors[name].message : null
}

export default getFormErrorMessage
