//import axios from "axios";
import React, { useCallback, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FilterAsFC } from "../FilterComponent/Filter";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditStudentAsFC from "../EditStudent/EditStudent";
import { Event } from "@mui/icons-material";
import { CardActions, CardContent, IconButton, Typography, CardHeader, Card } from "@mui/material";
import { maxWidth } from "@mui/system";


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

            const transformedStudents = () => data.map((student: any) => {
                return {
                    firstName: student.firstName,
                    middleName: student.middleName,
                    lastName: student.lastName,
                    dateOfBirth: student.dateOfBirth.slice(0,10),
                    favouriteSubject: student.favouriteSubject
                };
            });
            setStudents(transformedStudents);
            console.log(transformedStudents());
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
        <EditStudentAsFC student={students} />    };

    const handleClose = () => {
        setOpen(false);
    };


     const tableColumns =[
        { name:"First Name", selector: (row : any) => row.firstName},
        { name:"Middle Name", selector: (row : any) => row.middleName},
        { name:"Last Name", selector: (row : any) => row.lastName},
        { name:"Date of Birth", selector: (row : any) => row.dateOfBirth},
        { name:"Favourite Subject", selector: (row : any) => row.favouriteSubject},
        { name:"Edit Student", selector:(row : any) => <EditIcon sx={{
            "&:hover": {
              backgroundColor: "transparent",
              cursor: "pointer"
              }
          }} color="primary"></EditIcon>},
        { name:"Delete Student", selector:(row : any) =>  <DeleteIcon sx={{
            "&:hover": {
              backgroundColor: "transparent",
              cursor: "pointer"
              }
          }} style={{ color: "#D22B2B" }}></DeleteIcon>}
    ];

    // const filteredItems = students.filter(
    //     (item) =>
    //       (item.favouriteSubject.toLowerCase().includes(filterText.toLowerCase())
    // ));
    let content = <p>No students found.</p>;

    if(students.length > 0){
        content = 
        // <DataTable 
        //     data={students}
        //     columns={tableColumns}
        //     onRowClicked={(event) => console.log(event)}
        // />
        <div style={{justifyContent:'center'}}>
            <Card style={{ height: "200px" }} sx={{ minWidth: 1000, marginLeft:"10%", marginRight:"10%"}}>
            <CardHeader
                title="Parul Bajaj"
                subheader="Date Of Birth: September 14, 2016"
                style={{ textAlign: "center" }}
            />
            <CardContent>
                <Typography
                variant="body2"
                color="text.secondary"
                style={{ textAlign: "center" }}
                >
                Favourite Subject: English
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                style={{ left:"46%" }}
                aria-label="add to favorites"
                >
                <EditIcon />
                </IconButton>
                <IconButton style={{ left:"46%" }} aria-label="share">
                <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
        </div>
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
                {content}
            </div>
            
            
        </div>
    );

    
}
