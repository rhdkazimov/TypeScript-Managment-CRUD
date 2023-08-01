import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { log } from 'console';

export const UserCard:React.FC<any> = ({data}) => {
   const {firstName,lastName,email} = data    
  return (
    <Card className='userCard' sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
        className='userImg'
          component="img"
          height="140"
          image="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
          alt="green iguana"
        />
        <CardContent>
          {/* <Typography gutterBottom variant="h5" component="div">
            {firstName}  {lastName}
          </Typography> */}
          <Typography className='userInfo' variant="body2" color="text.secondary">
          {firstName}  {lastName}
          </Typography>
          <Typography className='userEmail' variant="body2" color="text.secondary">
           Email : {email}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}