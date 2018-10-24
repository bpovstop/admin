import sqlFormatter from "sql-formatter";
import {
  provideDocumentRangeFormattingEdits,
  provideDocumentFormattingEdits
} from "./sqlFormattingEdits";
import sqlCompletionProvider from "./sqlCompletionProvider";

export default {
  sqlFormatter,
  provideDocumentRangeFormattingEdits,
  provideDocumentFormattingEdits,
  sqlCompletionProvider
};
