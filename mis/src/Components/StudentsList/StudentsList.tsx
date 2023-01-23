import React from "react";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import { FilterAsFC } from "../FilterComponent/Filter";



export const StudentsList = () =>{
    const [filterText, setFilterText] = React.useState("");

    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
        false
    );
    const HeaderDiv = styled.div`
        min-width: 300px;
        width: 25%;
        flex-grow: 1;
        `;

     const students = [{firstName: "Parul",middleName:"",lastName:"Bajaj", dateOfBirth: "22-06-1999",favouriteSubject:"English"},
     {firstName: "Vasuki", middleName:"",lastName:"Rohilla", dateOfBirth: "20-10-2000",favouriteSubject:"Mathematics"}

     ];

     const tableColumns =[
        { name:"First Name", selector: (row : any) => row.firstName},
        { name:"Middle Name", selector: (row : any) => row.middleName},
        { name:"Last Name", selector: (row : any) => row.lastName},
        { name:"Date of Birth", selector: (row : any) => row.dateOfBirth},
        { name:"Favourite Subject", selector: (row : any) => row.favouriteSubject}
    ];

    const filteredItems = students.filter(
        (item) =>
          (item.favouriteSubject.toLowerCase().includes(filterText.toLowerCase())
    ));

    const handleClear = () => {
        if (filterText) {
          setResetPaginationToggle(!resetPaginationToggle);
  
          setFilterText("");
        }
      };
        

    return(
        
        <div>
            <div
                style={{
                display: "flex",
                flexWrap: "wrap",
                rowGap: 10,
                columnGap: 10
                }}
            >
                <HeaderDiv>
                <FilterAsFC
                    onFilter={(e) => setFilterText(e.target.value)}
                    onClear={handleClear}
                    filterText={filterText}
                />
                </HeaderDiv>
            </div>
            
            <DataTable title="Students"
                data={students}
                columns={tableColumns}
            />
        </div>
    );

    
}
