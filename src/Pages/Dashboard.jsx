import { Alert, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, IconButton, List, ListItem, ListItemText, MenuItem, Select, Snackbar, Stack, Switch, TextField, Typography } from "@mui/material";
import { Add, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Dashboard = () => {
  // Utils
  const navigate = useNavigate();

  // Variables
  const token = localStorage.getItem("token");

  // States
  const [categories, setCategories] = useState([{"id": 1,"name": "divers"}]);
  const [drinks, setDrinks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [categoryId, setCategoryId] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  
  // UseEffect
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

  // Methods
  const handleClickEdit = (drink) => { navigate(`/drink/${drink.id}`); }
  const handleClickOpenDialog = () => { setOpenDialog(true); };
  const handleCloseDialog = () => { setOpenDialog(false); };
  const handleCategory = (event) => { setCategoryId(event.target.value); };
  const handleCloseSnackbar = () => { setOpenSnackbar(false); };
  
  const handleClickLogout = () => {
    localStorage.clear();
    navigate("/");
  }

  const handleChangeAvailability = async (drink) => {
    const endUrl = drink.isavailable ? 'unavailable' : 'isavailable';
    const response = await fetch(`http://localhost:4100/drinks/${drink.id}/${endUrl}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", authorization: `bearer ${token}` }
    });
    if (!response.ok) setOpenSnackbar(true);
    const data = await response.json();
    drinks.find(elem => elem.id === drink.id && (elem.isavailable = data.isavailable));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
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
    setOpenDialog(false);
  }

  
  return (
    <>
      <Stack direction="row" justifyContent="center" sx={{padding:1}}>
        <Button variant="contained" color="error" onClick={handleClickLogout}>Déconnexion</Button>
      </Stack>

      <Container sx={{padding:0}}>
        <List>
          {drinks.map(drink =>
            <Box key={drink.id}>
              <ListItem>
                <ListItemText primary={drink.name} />
                <Switch defaultChecked={drink.isavailable} name="isAvailable" onChange={async () => await handleChangeAvailability(drink)}/>
                <IconButton onClick={() => handleClickEdit(drink)}><Edit/></IconButton>
              </ListItem>
              <Divider/>
            </Box>
          )}
        </List>
      </Container>
      
      <Fab color="primary" sx={{position: 'fixed', bottom: "1rem", right: "1rem"}} onClick={handleClickOpenDialog}><Add /></Fab>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>Ajouter une boisson</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection:"column", gap:"0.5rem"}}>
            <TextField name="name" size="small" label="Nom de la boisson" sx={{marginTop: "0.5rem"}} required/>
            <TextField name="maker" size="small" label="Fabricant" required/>
            <TextField name="infos" multiline rows={4} label="Infos" required/>
            <Select name="category" size="small" value={categoryId} onChange={handleCategory} required>
              {categories.map(category => <MenuItem value={category.id} key={category.id}>{category.name}</MenuItem> )}
            </Select>
            <Stack direction="row" alignItems="center">
              <Typography>Alcool :</Typography>
              <Switch name="isAlcool"/>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Annuler</Button>
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