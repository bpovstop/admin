export default function sqlCompletionProvider(editor, monaco, list) {
  const getBeforeSingleQuoteText = (model, position) => {
    const currentLine = model.getValueInRange({
      startLineNumber: position.lineNumber,
      startColumn: 0,
      endLineNumber: position.lineNumber,
      endColumn: position.column
    })
    console.log(model.getValueInRange({
      startLineNumber: position.lineNumber,
      startColumn: 0,
      endLineNumber: position.lineNumber,
      endColumn: position.column + 1
    }))
    if (currentLine.substr(-2, 1) !== '\'') return undefined
    if (currentLine) {
      for (let i = currentLine.length - 3; i > -1; i -= 1) {
        const elm = currentLine[i]
        if (elm === '\'') {
          return currentLine.slice(i + 1, position.column - 3)
        }
      }
    }
  }

  editor.onDidType(text => {
    if (text === '.') {
      editor.trigger('anything', 'editor.action.triggerSuggest')
    }
    if (text === '\'') {
      editor.trigger('anything', 'editor.action.triggerSuggest')
    }
  })

  return {
    provideCompletionItems: (model, position) => {
      // get editor content before the pointer
      let table = getBeforeSingleQuoteText(model, position);
      if (table) return [
        {
          label: 'column1',
          kind: monaco.languages.CompletionItemKind.Text
        },
        {
          label: 'column2',
          kind: monaco.languages.CompletionItemKind.Text
        }
      ]
      return [
        { label: 'SELECT', kind: monaco.languages.CompletionItemKind.Keyword },
        { label: 'FROM', kind: monaco.languages.CompletionItemKind.Keyword },
        { label: 'WHERE', kind: monaco.languages.CompletionItemKind.Keyword },
        { label: 'ORDER BY', kind: monaco.languages.CompletionItemKind.Keyword },
        { label: 'GROUP BY', kind: monaco.languages.CompletionItemKind.Keyword },
        { label: 'LIMIT', kind: monaco.languages.CompletionItemKind.Keyword },
        { label: 'INNER JOIN', kind: monaco.languages.CompletionItemKind.Keyword },
        { label: 'LEFT JOIN', kind: monaco.languages.CompletionItemKind.Keyword },
        { label: 'RIGHT JOIN', kind: monaco.languages.CompletionItemKind.Keyword },
        { label: 'FULL JOIN', kind: monaco.languages.CompletionItemKind.Keyword },
        { label: 'ON', kind: monaco.languages.CompletionItemKind.Keyword },
        { label: 'AND', kind: monaco.languages.CompletionItemKind.Keyword },
        { label: 'OR', kind: monaco.languages.CompletionItemKind.Keyword },
        { label: 'SET', kind: monaco.languages.CompletionItemKind.Keyword },
        { label: 'INSERT', kind: monaco.languages.CompletionItemKind.Keyword },
        { label: 'DELETE', kind: monaco.languages.CompletionItemKind.Keyword },
        { label: 'INTO', kind: monaco.languages.CompletionItemKind.Keyword },
        { label: 'VALUES', kind: monaco.languages.CompletionItemKind.Keyword },
      ]
    }
  }
}