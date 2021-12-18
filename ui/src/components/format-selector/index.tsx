import React from 'react';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import { FormatChoice } from '../../services/parsers';

interface Props {
  onFormatChosen: (parser: FormatChoice) => void;
  value?: FormatChoice;
}

const options: FormatChoice[] = [
  "YNCU"
];

export function FormatSelector(props: Props) {

  function handleOnChange(event: React.ChangeEvent<{ name?: string, value?: unknown }>) {
    props.onFormatChosen(event.target.value as FormatChoice)
  }

  return <FormControl style={{ minWidth: '100%'}}>
    <Select value={props.value} onChange={handleOnChange}>
      {options.map((item) => {
        return <MenuItem value={item}>{item}</MenuItem>
      })}
    </Select>
  </FormControl>
}