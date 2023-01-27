import React from "react";
import {Formik, Form,
  } from 'formik'
import { TextField, Button, Card, CardContent, Typography} from '@mui/material';
import { FilterAsFC } from "../FilterComponent/Filter";
import './EditStudent.css';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface EditStudentProps{
    student: any
  }

export const EditStudentAsFC : React.FC<EditStudentProps> = ({ student }) =>  {
    const [filterText, setFilterText] = React.useState("");
    const [editStudent, setEditStudent] = React.useState(student);

     const [value, setValue] = React.useState<any>(
        dayjs(editStudent.dateOfBirth.slice(0,10)),
      );

    
      const handleChange = (newValue: any) => {
        setValue(newValue);
      };

      const [firstName, setFirstName] = React.useState<string>(editStudent.firstName);

      const handleFirstNameChange = (event:any) => {
        setFirstName(event.target.value);
      };
      const [middleName, setMiddleName] = React.useState<string>(editStudent.middleName);

      const handleMiddleNameChange = (event:any) => {
        setMiddleName(event.target.value);
      };
      const [lastName, setLastName] = React.useState<string>(editStudent.lastName);
     
      const handleLastNameChange = (event:any) => {
        setLastName(event.target.value);
      };

      async function updateStudentHandler() {
        
        try{
            setEditStudent({
                ...editStudent,
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                dateOfBirth: value.slice(0,10),
                //favouriteSubject: data.favouriteSubject
            })
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editStudent)
            };
            const response = await fetch('http://localhost:5026/api/Student',requestOptions);
            if(!response.ok){
                throw new Error('Something went wrong!');
            }
            const data = await response.json();

            const transformedStudent = () => {
                return {
                    firstName: data.firstName,
                    middleName: data.middleName,
                    lastName: data.lastName,
                    dateOfBirth: data.dateOfBirth.slice(0,10),
                    favouriteSubject: data.favouriteSubject
                };
            };
            setEditStudent({...editStudent, transformedStudent});
            console.log(transformedStudent);
        }
        catch(error : any){
            console.log(error.message);
        }
           
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
                    onSubmit={updateStudentHandler}
                >
                    <Form className="form_control">
                        <div>
                            <TextField
                                id='firstName'
                                label="First Name"
                                name='firstName'
                                placeholder='firstName'
                                value={firstName}
                                onChange={handleFirstNameChange}
                            />
                        </div>
                        <div >
                            <TextField
                                id='middleName'
                                label="Middle Name"
                                name='middleName'
                                placeholder='Middle Name'
                                value={middleName}
                                onChange={handleMiddleNameChange}
                            />
                        </div>
                        <div>
                            <TextField
                                id='lastName'
                                label="Last Name"
                                name='lastName'
                                placeholder='Last Name'
                                value={lastName}
                                onChange={handleLastNameChange}
                        />
                        </div>
                        <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                         <DesktopDatePicker
                             label="Date of Birth"
                            inputFormat="MM/DD/YYYY"
                             value={value}
                             onChange={handleChange}
                             renderInput={(params:any) => <TextField {...params} />}
                             />
                             </LocalizationProvider>
                        </div>

                        <div style={{marginTop: "0px"}}>
                            <FilterAsFC onFilter={(e) => setFilterText(e.target.value)}
                                    filterText={filterText}  
                            //onChange={props.handleChange}
                            />
                        </div>
                            <Button variant='contained' type='submit' >
                            Save Changes
                        </Button>  
                    </Form>
                </Formik>
        </CardContent>
    </Card>
    );
}
