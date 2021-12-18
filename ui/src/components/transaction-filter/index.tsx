import { FormControlLabel, FormGroup } from '@material-ui/core';
import React from 'react';

import DatePicker from 'react-datepicker';


interface Props {
  onMonthChange: (date: Date) => void;
  onYearChange: (date: Date) => void;
  onDayChange: (day?: number) => void;
  date?: Date;
  day?: Date;
}

export function TransactionFilter(props: Props) {
  return <>
    <FormGroup row>
      <FormControlLabel
        control={<>
          <DatePicker
            selected={props.date}
            onChange={props.onYearChange}
            dateFormat="yyyy"
            showYearDropdown
            showYearPicker
          />
        </>}
        label="Year"
        labelPlacement="start"
      />
      <FormControlLabel
        control={<>
          <DatePicker
            selected={props.date}
            onChange={props.onMonthChange}
            dateFormat="MM"
            showMonthYearPicker
            showYearDropdown
            isClearable
          />
        </>}
        label="Month"
        labelPlacement="start"
      />
      <FormControlLabel
        control={<>
          <DatePicker
            selected={props.day}
            onChange={(date: Date) => {
              if (date) {
                props.onDayChange(date.getDate());
              }
              props.onDayChange();
            }}
            dateFormat="dd"
            isClearable
          />
        </>}
        label="day"
        labelPlacement="start"

      />
    </FormGroup>
  </>
}