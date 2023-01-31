import React from "react";
import { CardActions, CardContent, IconButton, Typography, CardHeader, Card } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { EditStudentAsFC } from "../EditStudent/EditStudent";

interface StudentProps {
    student: any;
}

export const StudentAsFC : React.FC<StudentProps> = ({ student }) => {

    const [isEditing, setIsEditing] = React.useState(false);
    const [isDeleted, setIsDeleted] = React.useState(false);

    const startEditingHandler = () => {
        setIsEditing(true);
    };

    const stopEditingHandler = () => {
        setIsEditing(false);
    };

    const deleteStudentHandler = async () => {
        try {
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: student.id
            };
            const response = await fetch('http://localhost:5026/api/Student/' + student.id,{ method: 'DELETE' });
            if(!response.ok){
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            console.log(data);
        }
        catch(error : any){
            console.log(error.message);
        }
        setIsDeleted(true);
    }

    return (
        <div style={{justifyContent:'center'}}>
            {!isEditing && <Card style={{ height: "200px", border: "1px solid #ccc"}} sx={{ minWidth: 1000, marginLeft:"15%", marginRight:"15%"}}>
                <CardHeader
                    title = {`${student.firstName} ${student.lastName}`}
                    subheader= {`Date of Birth: ${student.dateOfBirth} `}
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
                    onClick={startEditingHandler}
                    >
                    <EditIcon color="primary" />
                    </IconButton>
                    <IconButton style={{ left:"46%" }} aria-label="share"
                    onClick={deleteStudentHandler}>
                    <DeleteIcon style={{ color: "#D22B2B" }}/>
                    </IconButton>
                </CardActions>
            </Card>}
            {isEditing && <EditStudentAsFC student={student} stopEditingHandler={stopEditingHandler}/>}
        </div>
    );
}