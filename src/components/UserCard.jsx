import { Button, Card, Typography } from "antd";
import {  Edit, DeleteIcon } from "lucide-react";
import React from "react";
// import deleteIcon from "../assets/trash.svg";
export const UserCard = ({ fristName, lastName, email , onEdit, onDelete }) => {
  return (
    <Card  className="">
      <Typography>{fristName}</Typography>
      <Typography>{lastName}</Typography>
      <Typography>{email}</Typography>
      <div className="flex gap-3" >
        <Button onClick={onEdit} >
          <Edit />
        </Button>
        <Button onClick={onDelete}>
          <DeleteIcon/>
        </Button>
      </div>
    </Card>
  );
};
