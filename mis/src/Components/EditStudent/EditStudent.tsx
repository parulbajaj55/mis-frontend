import React from "react";
import { useState } from 'react'
import {Formik, Form,
  } from 'formik'
import { TextField, Button, Card, CardContent, Typography} from '@mui/material';
//import { useLocation } from 'react-router-dom'
//import classes from "./styles/StudentsStyle.module.css";
import { FilterAsFC } from "../FilterComponent/Filter";
import './EditStudent.css';

interface EditStudentProps{
    student: any
    //handleChange: 
  }

export const EditStudentAsFC : React.FC<EditStudentProps> = ({ student }) =>  {
    const [filterText, setFilterText] = React.useState("");
    // const location = useLocation();
    // const student = location.state.student;
   
    function setStudent(values: { firstName: string; middleName: string; lastName: string; dateOfBirth: string; favoriteSubject: any; }) {
      const payload = {
      id: student.id,
      firstName: values.firstName,
      lastName: values.lastName,
      middleName: values.middleName,
      dateOfBirth: values.dateOfBirth,
      subjectId: values.favoriteSubject.SubjectId
      }
      
    //   axios.put('http://localhost:5026/Student',payload).then(resp => {
    //     console.log(resp.data);
    //     });
     }
    return (  
      <Card sx={{ minWidth: 1000, marginLeft:"15%", marginRight:"15%" }} style={{border: "1px solid #ccc"}}>
        <CardContent>
            <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
          Edit Student
            </Typography>
                <Formik
                    initialValues={
                        { firstName: student.firstName,
                            middleName: student.middleName,
                            lastName: student.lastName,
                            dateOfBirth: student.dateOfBirth,
                            //favoriteSubject: student.favoriteSubject.name, 
                        }
                    }
                    onSubmit={(student:any, actions:any) => {
                        console.log({ student, actions })
                        setStudent(student)
                        alert(JSON.stringify(student, null, 2))
                        actions.setSubmitting(false)
                    }}
                >
                    <Form className="form_control">
                        <div>
                            <TextField
                                id='firstName'
                                label="First Name"
                                name='firstName'
                                placeholder='firstName'
                                value={student.firstName}
                                //onChange={props.handleChange}
                            />
                        </div>
                        <div >
                            <TextField
                                id='middleName'
                                label="Middle Name"
                                name='middleName'
                                placeholder='Middle Name'
                                value={student.middleName}
                                //onChange={props.handleChange}
                            />
                        </div>
                        <div>
                            <TextField
                                id='lastName'
                                label="Last Name"
                                name='lastName'
                                placeholder='Last Name'
                                value={student.lastName}
                                //onChange={props.handleChange}
                        />
                        </div>
                        <div>
                            <TextField
                                id='date'
                                label="Date of Birth"
                                name='dateOfBirth'
                                placeholder='Date of Birth'
                                value={student.dateOfBirth.slice(0,10)}
                                //onChange={props.handleChange}
                            />
                        </div>
                        <div style={{marginTop: "0px"}}>
                            <FilterAsFC onFilter={(e) => setFilterText(e.target.value)}
                                    filterText={filterText}  
                            //onChange={props.handleChange}
                            />
                        </div>
                            <Button variant='contained' type='submit'>
                            Save Changes
                        </Button>  
                    </Form>
                </Formik>
        </CardContent>
    </Card>
    );
}
