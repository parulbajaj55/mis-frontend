import React from "react";
import styled from "styled-components";
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

interface FilterProps{
  filterText: string;
    onFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FilterAsFC : React.FC<FilterProps> = ({ filterText, onFilter }) => {
  const [favouriteSubject, setFavouriteSubject] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setFavouriteSubject(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 1, minWidth: 500 }}>
        <InputLabel id="demo-simple-select-label">Favourite Subject</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={favouriteSubject}
          label="Favourite Subject"
          onChange={handleChange}
        >
          <MenuItem value={"English"}>English</MenuItem>
          <MenuItem value={"Physics"}>Physics</MenuItem>
          <MenuItem value={"Chemistry"}>Chemistry</MenuItem>
          <MenuItem value={"Mathematics"}>Mathematics</MenuItem>
          <MenuItem value={"Computers"}>Computers</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
