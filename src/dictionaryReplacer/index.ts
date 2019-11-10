const replace = (template: string, dictionary: { [index: string]: string }): string => {
  const placeholders: string[] | null = template.match(/\$[A-z0-9]+\$/g)

  if (! placeholders) {
    return template
  }

  return placeholders
    .map((placeholder: string): string => placeholder.slice(1, -1))
    .filter((key: string): boolean => dictionary.hasOwnProperty(key))
    .reduce((output: string, key: string): string => {
      return output.replace(`$${key}$`, dictionary[key])
    }, template)
}

export { replace }