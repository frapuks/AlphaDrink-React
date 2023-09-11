import { Badge, Box, Button, Card, CardActions, CardContent, CardHeader, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, Rating, SpeedDial, SpeedDialAction, SpeedDialIcon, Stack, Switch, TextField, Typography } from "@mui/material";
import { Favorite, FavoriteBorder, EditNote, SportsBar, LocalDrink, CheckCircle, Cancel, Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Drink = () => {
  // Utils
  const navigate = useNavigate();
  const urlApi = process.env.REACT_APP_URL_API;
  
  // Variables
  const {drinkId} = useParams();
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem('isAdmin');
  
  // States
  const [isAdminConnected, setIsAdminConnected] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [likes, setLikes] = useState(0);
  const [categories, setCategories] = useState([{"id": 1, "name": "divers"}]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [drink, setDrink] = useState({
    "id": 0,
    "name": "",
    "maker": "",
    "infos": "",
    "starscounter": 0,
    "averagerate": 0,
    "isalcool": false,
    "isavailable": false,
    "category_id": 1,
    "reviews": [
      {
        "id": 0,
        "name": "Exemple",
        "date": "2000-01-01",
        "content": "Exemple",
        "rate": 1,
        "drink_id": 1
      }
    ]
  });
  
  // UseEffect
  useEffect(() => {
    setIsAdminConnected(token && isAdmin ? true : false);

    const drinkFetch = async () => {
      const response = await fetch(`${urlApi}/drinks/${drinkId}/reviews`);
      const drink = await response.json();
      setDrink(drink);
      setLikes(drink.starscounter);
    };

    const categoriesFetch = async () => {
      const response = await fetch(`${urlApi}/categories`);
      const categories = await response.json();
      setCategories(categories);
    };

    drinkFetch();
    categoriesFetch();
  }, []);
  
  // Methods
  const handleClickOpenDialog = () => { setOpenDialog(true); };
  const handleCloseDialog = () => { setOpenDialog(false); };
  const handleClickOpenDelete = () => { setOpenDelete(true); };
  const handleCloseDelete = () => { setOpenDelete(false); };
  const handleUpdate = () => {setIsUpdateMode(true);}
  const handleCloseUpdate = () => {setIsUpdateMode(false);}
  
  const handleSubmitReview = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('rate') == '') {return;}

    const newReview = {
      id: drink.reviews.length,
      name: data.get("name"),
      date: new Date().toISOString().split('T')[0],
      content: data.get("content"),
      rate: +data.get('rate'),
      drink_id: drinkId,
    }
    drink.reviews.push(newReview);

    const response = await fetch(`${urlApi}/reviews`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: data.get("name"),
        rate: +data.get('rate'),
        content: data.get("content"),
        drink_id: drinkId,
      })
    });
    setOpenDialog(false);
  }

  const handleSubmitUpdate = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch(`${urlApi}/drinks/${drinkId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", authorization: `bearer ${token}` },
      body: JSON.stringify({
        "name": form.get("name"),
        "maker": form.get("maker"),
        "infos": form.get("infos"),
        "isalcool": form.get("isAlcool") === 'on'
      })
    });
    const data = await response.json();
    const newDrink = {...data, reviews: drink.reviews};
    setDrink(newDrink);
    setIsUpdateMode(false);
  }
  
  const handleDeleteReview = async (reviewId) => {
    const response = await fetch(`${urlApi}/reviews/${reviewId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", authorization: `bearer ${token}` }
    });
    if (!response.ok) { return; }
    const reviews = drink.reviews.filter(review => review.id !== reviewId);
    const newDrink = {...drink, reviews: reviews};
    setDrink(newDrink);
  }
  
  const handleDeleteDrink = async () => {
    const response = await fetch(`${urlApi}/drinks/${drinkId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", authorization: `bearer ${token}` }
    });
    if (!response.ok) { return; }
    navigate("/")
  }

  // TODO : Refacto this method (duplicated in AccordionDrink)
  const handleLike = async (event) => {
    event.stopPropagation();
    const endUrl = event.target.checked ? 'addstar' : 'removestar';
    const response = await fetch(`${urlApi}/drinks/${drink.id}/${endUrl}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"}
    });
    const data = await response.json();
    setLikes(data.starscounter);
  };  


  return (
    <>
      <Box component="form" onSubmit={handleSubmitUpdate}>

        {isAdminConnected && isUpdateMode
          ? (
            <Stack direction="row" justifyContent="center" alignItems="center" gap={"1rem"} sx={{marginTop:"1rem"}}>
              <Typography>Nom :</Typography>
              <TextField name="name" size="small" label="Nom de la boisson" defaultValue={drink.name} required/>
            </Stack>
          )
          : <Typography variant="h3" sx={{ textAlign: "center", fontWeight: "bold" }}>{drink.name}</Typography>
        }

        <Container sx={{ padding: "1rem" }}>

          <Stack direction="row">
            <Typography sx={{ fontWeight: "bold" }}>Compteur :</Typography>
            <Badge badgeContent={likes} color="primary" >
              <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} sx={{ padding: "0" }} size="small" onClick={handleLike} name="favorite"/>
            </Badge>
          </Stack>

          <Stack direction="row">
            <Typography sx={{ fontWeight: "bold" }}>Note Moyenne :</Typography>
            <Rating value={drink.averagerate} />
          </Stack>

          <Stack direction="row">
            {drink.isavailable ? <CheckCircle /> : <Cancel />}
            <Typography sx={{ fontWeight: "bold" }}>{drink.isavailable ? "Disponible" : "Non disponible"}</Typography>
          </Stack>

          <Typography>
            <Box component="span" sx={{ fontWeight: "bold" }}>Catégorie : </Box>
            {categories.map(category => (category.id === drink.category_id && category.name))}
          </Typography>

          {isAdminConnected && isUpdateMode
            ? (
              <Stack direction="row" alignItems="center">
                <Typography>Alcool :</Typography>
                <Switch name="isAlcool" defaultChecked={drink.isalcool}/>
              </Stack>
            ) : (
              <Stack direction="row">
                {drink.isalcool ? <SportsBar /> : <LocalDrink />}
                <Typography sx={{ fontWeight: "bold" }}>{drink.isalcool ? "Alcool" : "Sans Alcool"}</Typography>
              </Stack>
            )
          }

          {isAdminConnected && isUpdateMode
            ? (
              <Stack direction="row" alignItems="center" gap={"1rem"}>
                <Typography>Fabricant :</Typography>
                <TextField name="maker" size="small" label="Fabricant" defaultValue={drink.maker} required/>
              </Stack>
            ) : (
              <Typography>
                <Box component="span" sx={{ fontWeight: "bold" }}>Fabricant : </Box>
                {drink.maker}
              </Typography>
            )
          }

          {isAdminConnected && isUpdateMode
            ? (
              <Stack direction="row" gap={"1rem"} sx={{marginTop:"0.5rem"}}>
                <Typography>Infos :</Typography>
                <TextField name="infos" multiline rows={2} label="Infos" defaultValue={drink.infos} required/>
              </Stack>
            ) : (
              <Typography>
                <Box component="span" sx={{ fontWeight: "bold" }}>Infos : </Box>
                {drink.infos}
              </Typography>
            )
          }

          {isAdminConnected && isUpdateMode &&
            <Stack direction="row" justifyContent="center" gap={"1rem"} sx={{marginTop:"0.5rem"}}>
              <Button onClick={handleCloseUpdate}>Annuler</Button>
              <Button variant="contained" color="error" onClick={handleClickOpenDelete}>Supprimer</Button>
              <Button type="submit" variant="contained" autoFocus>Valider</Button>
            </Stack>
          }
          {isAdminConnected && !isUpdateMode &&
            <Stack direction="row" justifyContent="center">
              <Button onClick={handleUpdate}>Update</Button>
            </Stack>
          }

        </Container>
      </Box>


      <Divider />


      <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold", marginTop: "1rem" }}>COMMENTAIRES</Typography>

      <Container sx={{ padding: "1rem" }}>
        <Stack spacing="1rem">

          {drink.reviews[0] && drink.reviews.map(review => 
            <Card key={review.id}>
              <CardHeader title={`Par ${review.name}`} subheader={review.date} action={ <Rating value={review.rate} /> } />
              <CardContent sx={{ backgroundColor: 'teal', margin: "0.5rem", borderRadius: "10px" }}>
                <Typography variant="body2" sx={{ fontStyle: "italic", color: "white" }}>{review.content}</Typography>
              </CardContent>
              {isAdminConnected &&
                <CardActions>
                  <SpeedDial ariaLabel="SpeedDial" icon={<SpeedDialIcon/>} direction="right" FabProps={{sx:{bgcolor:"red", '&:hover': {bgcolor: "red"}}}}>
                    <SpeedDialAction icon={<Delete/>} tooltipTitle="Supprimer" onClick={() => {handleDeleteReview(review.id)}}/>
                  </SpeedDial>
                </CardActions>
              }
            </Card>
          )}

        </Stack>
      </Container>

      <Fab color="primary" sx={{ position: "fixed", bottom: "1rem", right: "1rem" }} onClick={handleClickOpenDialog}>
        <EditNote />
      </Fab>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <Box component="form" onSubmit={handleSubmitReview}>
          <DialogTitle>Ajouter un commentaire</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection:"column", gap:"0.5rem"}}>
            <Box sx={{ display: 'flex', alignItems: "center", gap: "0.5rem", marginTop:"1rem" }}>
              <Typography>Nom :</Typography>
              <TextField size="small" label="Votre nom ..." name="name" required/>
            </Box>
            <TextField label="Votre commentaire ..." multiline rows={4} fullWidth  name="content" required/>
            <Box sx={{ display: 'flex' }}>
              <Typography>Votre note :</Typography>
              <Rating name="rate"/>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Annuler</Button>
            <Button type="submit" variant="contained" autoFocus>Valider</Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogContent sx={{ display: 'flex', flexDirection:"column", gap:"0.5rem"}}>
          <Typography>Etes vous sur de vouloir supprimer cette boisson ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Non</Button>
          <Button variant="contained" color="error" onClick={handleDeleteDrink}>Oui</Button>
        </DialogActions>
      </Dialog>

    </>
  );
};

export default Drink;