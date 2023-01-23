import React from "react";
import styled from "styled-components";

interface FilterProps{
  filterText: string;
    onFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClear: () => void;
}

const TextField = styled.input`
  height: 36px;

  width: calc(100%-32px);

  flex-grow: 1;

  border-radius: 3px;

  border-top-left-radius: 5px;

  border-bottom-left-radius: 5px;

  border-top-right-radius: 0;

  border-bottom-right-radius: 0;

  border: 1px solid #e5e5e5;

  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;

const ClearButton = styled.button`
  border-top-left-radius: 0;

  border-bottom-left-radius: 0;

  border-top-right-radius: 5px;

  border-bottom-right-radius: 5px;

  height: 36px;

  width: 32px;

  text-align: center;

  display: flex;

  align-items: center;

  justify-content: center;
`;

export const FilterAsFC : React.FC<FilterProps> = ({ filterText, onFilter, onClear }) => {
  return (
    <div style={{ display: "flex" }}>
      <TextField
        id="search"
        type="text"
        placeholder="Filter By Favourite Subject"
        aria-label="Search Input"
        value={filterText}
        onChange={onFilter}
      />
  
      <ClearButton type="button" onClick={onClear}>
        X
      </ClearButton>
    </div>
  );
}
