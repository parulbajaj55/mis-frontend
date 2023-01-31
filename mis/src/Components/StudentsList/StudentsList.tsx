//import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { FilterAsFC } from "../FilterComponent/Filter";
import { StudentAsFC } from "../Student/Student";

export const StudentsList = () =>{
    const [filterText, setFilterText] = React.useState("");
    const [students, setStudents] = React.useState<any>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    
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
