//import axios from "axios";
import React, { useCallback, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FilterAsFC } from "../FilterComponent/Filter";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { EditStudentAsFC } from "../EditStudent/EditStudent";
import { Event } from "@mui/icons-material";
import { maxWidth } from "@mui/system";
import { StudentAsFC } from "../Student/Student";



export const StudentsList = () =>{
    const [filterText, setFilterText] = React.useState("");
    const [students, setStudents] = React.useState<any>([]);
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
            //console.log(response);
            const data = await response.json();
            console.log(data);

            const transformedStudents = () => data.map((student: any) => {
                return {
                    id: student.id,
                    firstName: student.firstName,
                    middleName: student.middleName,
                    lastName: student.lastName,
                    dateOfBirth: student.dateOfBirth.slice(0,10),
                    //favouriteSubject: student.favouriteSubject
                };
            });
            setStudents(transformedStudents);
            //console.log(transformedStudents());
        }
        catch(error : any){
            setError(error.message);
        }
        
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchStudentsHandler();
    }, [fetchStudentsHandler]);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (event: Event) => {
        console.log("clicked");
        setOpen(true);
        <EditStudentAsFC student={students[0]} />    };

    const handleClose = () => {
        setOpen(false);
    };

    // const filteredItems = students.filter(
    //     (item) =>
    //       (item.favouriteSubject.toLowerCase().includes(filterText.toLowerCase())
    // ));
    let content = <p>No students found.</p>;

    if(students.length > 0){
        content = 
        <>{students.map((student: any) => {
            return (
                <StudentAsFC key={student.id} student={student} />
            );
        })}
        </>
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
