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
    //console.log(student.id);

    const startEditingHandler = () => {
        setIsEditing(true);
    };

    const stopEditingHandler = () => {
        setIsEditing(false);
    };

    // return (
    //     <div className="new-expense">
    //         {!isEditing && <button onClick={startEditingHandler}>Add New Expense</button>}
    //         {isEditing && <ExpenseForm onSaveExpenseData = {saveExpenseDataHandler} 
    //         onCancel={stopEditingHandler}
    //         />}
    //     </div>
    // );
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
                    <IconButton style={{ left:"46%" }} aria-label="share">
                    <DeleteIcon style={{ color: "#D22B2B" }}/>
                    </IconButton>
                </CardActions>
            </Card>}
            {isEditing && <EditStudentAsFC student={student} />}
        </div>
    );
}