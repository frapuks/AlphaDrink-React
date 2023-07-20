import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, IconButton, List, ListItem, ListItemText, MenuItem, Select, Snackbar, Stack, Switch, TextField, Typography } from "@mui/material";
import "./Dashboard.scss"
import { Add, Close, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([{"id": 1,"name": "divers"}]);
  const [drinks, setDrinks] = useState([]);
  
  useEffect(() => {
    const dataFetch = async () => {
      const response = await fetch("http://localhost:4100/categories/drinks");
      const data = await response.json();
      const list = [];
      for (const category of data) {
        category.drinks.map(drink => list.push(drink));
      }
      setCategories(data);
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

  const [categoryId, setCategoryId] = useState(1);
  const handleCategory = (event) => {
    setCategoryId(event.target.value);
  };

  const handleChange = async (drink) => {
    const token = localStorage.getItem("token");
    const endUrl = drink.isavailable ? 'unavailable' : 'isavailable';
    const response = await fetch(`http://localhost:4100/drinks/${drink.id}/${endUrl}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", authorization: `bearer ${token}` }
    });
    if (!response.ok) setOpenSnackbar(true);
    const data = await response.json();
    drinks.find(elem => elem.id === drink.id && (elem.isavailable = data.isavailable));
  }

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleCloseSnackbar = () => { setOpenSnackbar(false); };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:4100/drinks`, {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: `bearer ${token}` },
      body: JSON.stringify({
        "name": form.get("name"),
        "maker": form.get("maker"),
        "infos": form.get("infos"),
        "isalcool": form.get("isAlcool") === 'on',
        "category_id": categoryId
      })
    });
    const data = await response.json();
    drinks.push(data);
    setOpen(false);
  }

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
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>Ajouter une boisson</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection:"column", gap:"0.5rem"}}>
            <TextField name="name" autoComplete="name" size="small" label="Nom de la boisson" sx={{marginTop: "0.5rem"}} required/>
            <TextField name="maker" size="small" label="Fabricant" required/>
            <TextField name="infos" multiline rows={4} label="Infos" required/>
            <Select name="category" size="small" value={categoryId} onChange={handleCategory} required>
              {categories.map(category =>
                <MenuItem value={category.id} key={category.id}>{category.name}</MenuItem>
              )}
            </Select>
            <Stack direction="row" alignItems="center">
              <Typography>Alcool :</Typography>
              <Switch name="isAlcool"/>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Annuler</Button>
            <Button type="submit" variant="contained" autoFocus>Valider</Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Snackbar severity="error" open={openSnackbar} onClose={handleCloseSnackbar}>
        <Alert severity="error">Erreur Serveur</Alert>
      </Snackbar>
    </>
  );
};

export default Dashboard;