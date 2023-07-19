import { Badge, Box, Button, Card, CardContent, CardHeader, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, FormControl, FormControlLabel, Rating, Stack, Switch, TextField, Typography } from "@mui/material";
import "./Drink.scss"
import { Favorite, FavoriteBorder, EditNote, Check, Close, SportsBar, LocalDrink, CheckCircle, Cancel } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Drink = () => {
  const {drinkId} = useParams();
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
        "id": 1,
        "name": "Francois",
        "date": "2022-12-12",
        "content": "A vos risques et perils",
        "rate": 1,
        "drink_id": 1
      }
    ]
  });
  const [likes, setLikes] = useState(0);
  const [categories, setCategories] = useState([{"id": 1, "name": "divers"}]);

  useEffect(() => {
    const drinkFetch = async () => {
      const response = await fetch(`http://localhost:4100/drinks/${drinkId}/reviews`);
      const drink = await response.json();
      setDrink(drink);
      setLikes(drink.starscounter);
    };

    const categoriesFetch = async () => {
      const response = await fetch(`http://localhost:4100/categories`);
      const categories = await response.json();
      setCategories(categories);
    };

    drinkFetch();
    categoriesFetch();
  }, []);

  // TODO : Refacto this method (duplicated in AccordionDrink)
  const handleLike = async (event) => {
    event.stopPropagation();
    if (event.target.checked) {
      const response = await fetch(`http://localhost:4100/drinks/${drink.id}/addstar`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"}
      });
      const data = await response.json();
      setLikes(data.starscounter);
    } else {
      const response = await fetch(`http://localhost:4100/drinks/${drink.id}/removestar`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"}
      });
      const data = await response.json();
      setLikes(data.starscounter);
    }
  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  const handleSubmit = (event) => {
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

    const postReview = async () => {
      const response = await fetch(`http://localhost:4100/reviews`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          name: data.get("name"),
          rate: +data.get('rate'),
          content: data.get("content"),
          drink_id: drinkId,
        })
      });
    }
    postReview();
    setOpen(false);
  }

  return (
    <>
      <Typography variant="h3" sx={{ textAlign: "center", fontWeight: "bold" }}>{drink.name}</Typography>

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

        {drink.isalcool &&
          <Stack direction="row">
              <SportsBar />
              <Typography sx={{ fontWeight: "bold" }}>Alcool</Typography>
          </Stack>
        }
        {!drink.isalcool &&
          <Stack direction="row">
              <LocalDrink />
              <Typography sx={{ fontWeight: "bold" }}>Sans Alcool</Typography>
          </Stack>
        }

        {drink.isavailable &&
          <Stack direction="row">
            <CheckCircle />
            <Typography sx={{ fontWeight: "bold" }}>Disponible</Typography>
          </Stack>
        }        
        {!drink.isavailable &&
          <Stack direction="row">
            <Cancel />
            <Typography sx={{ fontWeight: "bold" }}>Non disponible</Typography>
          </Stack>
        }

        <Typography>
          <Box component="span" sx={{ fontWeight: "bold" }}>Catégorie : </Box>
          {categories.map(category => (category.id === drink.category_id && category.name))}
        </Typography>

        <Typography>
          <Box component="span" sx={{ fontWeight: "bold" }}>Fabricant : </Box>
          {drink.maker}
        </Typography>

        <Typography>
          <Box component="span" sx={{ fontWeight: "bold" }}>Infos : </Box>
          {drink.infos}
        </Typography>

      </Container>


      <Divider />


      <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold", marginTop: "1rem" }}>COMMENTAIRES</Typography>

      <Stack spacing="1rem" sx={{ padding: "1rem" }}>

        {drink.reviews[0] && drink.reviews.map(review => 
          <Card key={review.id}>
            <CardHeader title={`Par ${review.name}`} subheader={review.date} action={
              <Rating value={review.rate} />
            } />
            <CardContent sx={{ backgroundColor: 'teal', margin: "0.5rem", borderRadius: "10px" }}>
              <Typography variant="body2" sx={{ fontStyle: "italic", color: "white" }}>{review.content}</Typography>
            </CardContent>
          </Card>
        )}

      </Stack>

      <Fab color="primary" sx={{ position: "fixed", bottom: "1rem", right: "1rem" }} onClick={handleClickOpen}>
        <EditNote />
      </Fab>

      <Dialog open={open} onClose={handleClose}>
        <Box component="form" onSubmit={handleSubmit}>
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
            <Button onClick={handleClose}>Annuler</Button>
            <Button type="submit" variant="contained" autoFocus>Valider</Button>
          </DialogActions>
        </Box>
      </Dialog>

    </>
  );
};

export default Drink;