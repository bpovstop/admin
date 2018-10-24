import merge from "lodash/merge";
export default {
  name: "monaco",
  props: {
    initValue: String,
    language: String,
    theme: String,
    contextmenu: {
      default: false,
      type: Boolean
    },
    options: Object
  },
  created() {
    import("monaco-editor").then(mod => {
      this.init(mod);
    });
  },
  mounted() {
    let flag = "";
    let that = this;
    const observer = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const { width, height } = entry.contentRect;
        const newFlag = width + "." + height;
        if (that.editor && newFlag !== flag) {
          that.editor.layout({ height, width });
          flag = newFlag;
        }
      });
    });

    observer.observe(this.$el);
  },
  methods: {
    init(mod) {
      this.mod = mod;
      const options = merge(
        {
          contextmenu: false,
          minimap: {
            enabled: false
          }
        },
        this.options
      );
      this.editor = mod.editor.create(this.$el, options);
      this.editor.onDidFocusEditorText(() => this.$emit("focus"));
      this.editor.onDidBlurEditorText(() => this.$emit("blur"));
      // this.editor.onKeyDown(e => this.$emit("keydown", e));
      // this.editor.onKeyUp(e => this.$emit("keyup", e));
      this.editor.onDidChangeModelContent(e => {
        const val = this.editor.getValue();
        if (this.value !== val) {
          this.$emit("change", val, e);
        }
      });
      this.editor.onDidChangeCursorSelection(e => {
        const val = this.editor.getModel().getValueInRange(e.selection);
        this.$emit("selection", val);
      });
      this.editor.onDidChangeModelLanguage(e =>
        this.$emit("changeLanguage", e)
      );
      // set absolute to make ResizeObserver work
      this.$el.style.position = "relative";
      this.$el.children[0].style.position = "absolute";
    },
    registerLanguage(lang, cb) {
      import(`./lang/${lang}`)
        .then(({ default: mod }) => {
          console.log(mod, "<-");
          const table = [
            {
              name: "db01",
              type: "db",
              children: [
                {
                  name: "table01",
                  type: "table"
                }
              ]
            },
            {
              name: "db02",
              type: "db",
              children: [
                {
                  name: "table02",
                  type: "table"
                }
              ]
            }
          ];
          const extend = {
            type: "hive",
            formatter: mod.sqlFormatter.format
          };
          this.mod.languages.registerCompletionItemProvider(
            lang,
            mod.sqlCompletionProvider(this.editor, this.mod, table)
          );
          this.mod.languages.registerDocumentFormattingEditProvider(lang, {
            provideDocumentFormattingEdits: (model, options, token) => {
              const selection = {
                startLineNumber: 1,
                startColumn: 1,
                endLineNumber: model.getLineCount(),
                endColumn: model.getLineLength(model.getLineCount())
              };
              return mod.provideDocumentRangeFormattingEdits(
                model,
                selection,
                options,
                token,
                extend
              );
            }
          });
          this.mod.languages.registerDocumentRangeFormattingEditProvider(lang, {
            provideDocumentRangeFormattingEdits: (...rest) =>
              mod.provideDocumentRangeFormattingEdits(...rest, extend)
          });
          cb();
        })
        .catch(error => {
          this.$emit("error", {
            type: "load language failed",
            error
          });
        });
    }
  },
  watch: {
    value(val) {
      if (this.editor && val !== this.editor.getValue()) {
        this.mod.editor.setValue(val);
      }
    },
    language() {
      console.log(this.language);
      if (this.editor) {
        this.registerLanguage(this.language, () => {
          this.mod.editor.setModelLanguage(
            this.editor.getModel(),
            this.language
          );
        });
      }
    },
    theme(val) {
      if (this.editor) {
        this.mod.editor.setTheme(val);
      }
    }
  },
  render(h) {
    return h("div");
  }
};
