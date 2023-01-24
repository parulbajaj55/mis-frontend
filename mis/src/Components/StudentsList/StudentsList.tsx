//import axios from "axios";
import React, { useCallback, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FilterAsFC } from "../FilterComponent/Filter";



export const StudentsList = () =>{
    const [filterText, setFilterText] = React.useState("");
    const [students, setStudents] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    //const {data} = await axios.get('http://localhost:5026/api/Student');


    //  const students = [{firstName: "Parul",middleName:"",lastName:"Bajaj", dateOfBirth: "22-06-1999",favouriteSubject:"English"},
    //  {firstName: "Vasuki", middleName:"",lastName:"Rohilla", dateOfBirth: "20-10-2000",favouriteSubject:"Mathematics"}

    //  ];
    const fetchStudentsHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        
        try{
            const response = await fetch('http://localhost:5026/api/Student')
            if(!response.ok){
                throw new Error('Something went wrong!');
            }
            const data = await response.json();

            setStudents(data);
        }
        catch(error : any){
            setError(error.message);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchStudentsHandler();
    }, [fetchStudentsHandler]);

     const tableColumns =[
        { name:"First Name", selector: (row : any) => row.firstName},
        { name:"Middle Name", selector: (row : any) => row.middleName},
        { name:"Last Name", selector: (row : any) => row.lastName},
        { name:"Date of Birth", selector: (row : any) => row.dateOfBirth},
        { name:"Favourite Subject", selector: (row : any) => row.favouriteSubject}
    ];

    // const filteredItems = students.filter(
    //     (item) =>
    //       (item.favouriteSubject.toLowerCase().includes(filterText.toLowerCase())
    // ));
    let content = <p>No students found.</p>;

    if(students.length > 0){
        content = <DataTable 
            data={students}
            columns={tableColumns}
        />
    }

    if(error){
        content = <p>{error}</p>
    }

    if(isLoading){
        content = <p>Loading!!!</p>
    }

    return(
        
        <div>
            <div>
                <FilterAsFC
                    onFilter={(e) => setFilterText(e.target.value)}
                    filterText={filterText}
                />
            </div>
            
            {content}
        </div>
    );

    
}
