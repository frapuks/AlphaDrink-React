import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, IconButton, List, ListItem, ListItemText, MenuItem, Rating, Select, Stack, Switch, TextField, Typography } from "@mui/material";
import "./Dashboard.scss"
import { Add, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleClickEdit = () => {
    navigate("/drink");
  }

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  const [category, setCategory] = useState('');
  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  return (
    <>
      <List>

        <ListItem>
          <ListItemText primary="Boisson" />
          <Switch/>
          <IconButton onClick={handleClickEdit}>
            <Edit/>
          </IconButton>
        </ListItem>
        
        <ListItem>
          <ListItemText primary="Boisson" />
          <Switch/>
          <IconButton onClick={handleClickEdit}>
            <Edit/>
          </IconButton>
        </ListItem>
        
        <ListItem>
          <ListItemText primary="Boisson" />
          <Switch/>
          <IconButton onClick={handleClickEdit}>
            <Edit/>
          </IconButton>
        </ListItem>
        
      </List>

      <Fab color="primary" sx={{position: 'fixed', bottom: "1rem", right: "1rem"}} onClick={handleClickOpen}>
        <Add />
      </Fab>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ajouter une boisson</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection:"column", gap:"0.5rem"}}>
          <TextField size="small" label="Nom de la boisson" sx={{marginTop: "0.5rem"}}/>
          <TextField size="small" label="Fabricant"/>
          <TextField multiline rows={4} label="Infos"/>
          <Select size="small" value={category} onChange={handleCategory}>
            <MenuItem value="category1">Catégorie 1</MenuItem>
            <MenuItem value="category2">Catégorie 2</MenuItem>
            <MenuItem value="category3">Catégorie 3</MenuItem>
          </Select>
          <Stack direction="row" alignItems="center">
            <Typography>Alcool :</Typography>
            <Switch/>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Typography>Disponible :</Typography>
            <Switch/>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button variant="contained" onClick={handleClose} autoFocus>Valider</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Dashboard;