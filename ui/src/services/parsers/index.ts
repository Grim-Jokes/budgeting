import { TransactionParser } from './parser';
import { YNCUFileClipboardParser } from './yncu';

export * from './parser';
export * from './yncu';

export type FormatChoice = "YNCU";

type ClipboardParserMap = { [ K in FormatChoice ]: TransactionParser };

export const FILE_CLIPBOARD_PARSER: ClipboardParserMap = {
  "YNCU": new YNCUFileClipboardParser()
}