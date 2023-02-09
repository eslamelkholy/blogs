import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { segmentTypes } from './types';
import { capitalizeFirstLetter } from '../../util/capatalize';

interface SegmentTypeProp {
  setSegmentType: any;
  segmentType: any;
}

export default function SegmentTypesPage(props: SegmentTypeProp) {
  const { setSegmentType, segmentType } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSegmentType((event.target as HTMLInputElement).value);
  };
  return (
    <FormControl>
      <FormLabel id='demo-radio-buttons-group-label'>Gender</FormLabel>
      <RadioGroup
        aria-labelledby='demo-radio-buttons-group-label'
        defaultValue='female'
        name='radio-buttons-group'
        value={segmentType}
        onChange={handleChange}
      >
        {segmentTypes.map((type) => (
          <FormControlLabel value={type} control={<Radio />} label={capitalizeFirstLetter(type)} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
