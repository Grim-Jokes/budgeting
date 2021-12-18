import React, { useEffect, useState } from 'react';
import { Button, Dialog, FormControl, Grid } from '@material-ui/core';
import style from './paste-popup.module.css';
import { FormatSelector } from '../format-selector';
import { ParsedTransaction, FILE_CLIPBOARD_PARSER, FormatChoice } from '../../services/parsers';
import { TransactionList } from '../transaction-list';
// Show options on how to parse the data within the clipboard
// as well show a preview as to how the data will look

interface Props {
  onDataSaved?: (parsed: ParsedTransaction[]) => void
}

type CloseReason = "escapeKeyDown" | "backdropClick" | "saveAndCloseClick" | "cancel";

export function PastePopup(props: Props) {

  const [open, setOpen] = useState(false);
  const [parser, setParser] = useState<FormatChoice>("YNCU");
  const [sample, setSample] = useState<ParsedTransaction[]>([]);
  const [text, setText] = useState<string>('');


  function handleClose(_ev: {}, reason: CloseReason) {
    if (reason === "escapeKeyDown" || reason === "cancel") {
      setOpen(false);
    }

    if (reason === "saveAndCloseClick") {
      if (parser === "YNCU") {
        const clipboardParser = FILE_CLIPBOARD_PARSER[parser]
        const parsed = clipboardParser.parse(text);
        if (props.onDataSaved && parsed.length > 0) {
          setOpen(false);
          setSample([]);
          setText('');
          props.onDataSaved(parsed);
        }

      }
    }
  }

  useEffect(() => {
    function handlePaste(ev: ClipboardEvent) {
      if (!ev.clipboardData) {
        return;
      }

      let text = ev.clipboardData.getData("text") as string;

      const clipboardParser = FILE_CLIPBOARD_PARSER[parser]
      const parsed = clipboardParser.parse(text, 5);
      setText(text);
      setSample(parsed);
      if (parsed.length > 0) {
        setOpen(true);
      }
    }

    document.addEventListener("paste", handlePaste);
    return () => {
      document.removeEventListener("paste", handlePaste)
    }
  }, [open, parser, text]);

  return (
    <Grid container>
      <Dialog
        aria-labelledby="Select which bank the statement is from"
        aria-describedby="server-modal-description"
        className={style.modal}
        onClose={handleClose}
        open={open}>
        <Grid container style={{ padding: '15px' }} direction="column" spacing={0}>
          <Grid container>
            <Grid item xs={12}>
              <h1>
                Select parsing option
          </h1>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <FormatSelector value={parser} onFormatChosen={(format) => setParser(format)} />
            </Grid>
            <Grid item xs={12}>
              <TransactionList transactions={sample} />
            </Grid>

          </Grid>
          <Grid container spacing={1} justify={"flex-end"} >
            <Grid item xs={6} spacing={0}>
              <FormControl style={{ width: '100%' }}>
                <Button variant="contained" color="primary"
                  onClick={() => handleClose({}, "saveAndCloseClick")}>Save and Close</Button>
              </FormControl>
            </Grid>
            <Grid item xs={2} spacing={0}>
              <FormControl>
                <Button variant="contained" color="secondary"
                  onClick={() => handleClose({}, "cancel")}>Cancel</Button>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </Grid>
  )
}