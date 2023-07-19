import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, IconButton, List, ListItem, ListItemText, MenuItem, Select, Snackbar, Stack, Switch, TextField, Typography } from "@mui/material";
import "./Dashboard.scss"
import { Add, Close, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const dataFetch = async () => {
      const response = await fetch("http://localhost:4100/categories/drinks");
      const data = await response.json();
      const list = [];
      for (const category of data) {
        category.drinks.map(drink => list.push(drink));
      }
      setDrinks(list);
    };

    dataFetch();
  }, []);

  const handleClickEdit = (drink) => {
    navigate(`/drink/${drink.id}`);
  }

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  const [category, setCategory] = useState('');
  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleChange = async (drink) => {
    // TODO : get token
    const token = '';
    if (drinks.isavailable) {
      const response = await fetch(`http://localhost:4100/drinks/${drink.id}/unavailable`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", authorization: `bearer ${token}` }
      });
      if (!response.ok) setOpenSnackbar(true);
    } else {
      const response = await fetch(`http://localhost:4100/drinks/${drink.id}/isavailable`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", authorization: `bearer ${token}` }
      });
      if (!response.ok) setOpenSnackbar(true);
    }
  }

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleCloseSnackbar = () => { setOpenSnackbar(false); };

  return (
    <>
      <List>

        {drinks.map(drink =>
          <ListItem key={drink.id}>
            <ListItemText primary={drink.name} />
            <Switch defaultChecked={drink.isavailable} name="isAvailable" onChange={async () => await handleChange(drink)}/>
            <IconButton onClick={() => handleClickEdit(drink)}>
              <Edit/>
            </IconButton>
          </ListItem>
        )}
        
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

      <Snackbar severity="error" open={openSnackbar} onClose={handleCloseSnackbar}>
        <Alert severity="error">Erreur Serveur</Alert>
      </Snackbar>
    </>
  );
};

export default Dashboard;