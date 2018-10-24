export function provideDocumentFormattingEdits(model, options, token, extend) {
  const textEdits = async () => {
    const text = await extend.formatter(model.getValue())
    return [
      {
        range: {
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: 1,
          endColumn: 1
        },
        text
      }
    ]
  }
  return textEdits()
}

export function provideDocumentRangeFormattingEdits(model, selection, options, token, extend) {
  console.log(selection)
  const textEdits = async () => {
    const text = await extend.formatter(model.getValueInRange(selection))
    return [
      {
        range: {
          startLineNumber: selection.startLineNumber,
          startColumn: selection.startColumn,
          endLineNumber: selection.endLineNumber,
          endColumn: selection.endColumn
        },
        text
      }
    ]
  }
  return textEdits()
}