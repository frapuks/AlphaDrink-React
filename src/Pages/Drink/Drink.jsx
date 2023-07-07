import { Badge, Box, Button, Card, CardContent, CardHeader, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, FormControl, FormControlLabel, Rating, Switch, TextField, Typography } from "@mui/material";
import "./Drink.scss"
import { Favorite, FavoriteBorder, EditNote, Check, Close, SportsBar, LocalDrink, CheckCircle, Cancel } from "@mui/icons-material";
import { useState } from "react";

const Drink = () => {
  const [likes, setLikes] = useState(4);
  const handleLike = (event) => {
    event.stopPropagation();
    event.target.checked ? setLikes(likes + 1) : setLikes(likes - 1);
  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  return (
    <>
      <Typography variant="h3" sx={{ textAlign: "center", fontWeight: "bold" }}>BOISSON</Typography>

      <Container sx={{ padding: "1rem" }}>

        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ fontWeight: "bold" }}>Compteur :</Typography>
          <Badge badgeContent={likes} color="primary" >
            <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} sx={{ padding: "0" }} size="small" onClick={handleLike} />
          </Badge>
        </Box>

        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ fontWeight: "bold" }}>Note Moyenne :</Typography>
          <Rating value={4} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: "center" }}>
          <SportsBar />
          <Typography sx={{ fontWeight: "bold" }}>Alcool</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: "center" }}>
          <LocalDrink />
          <Typography sx={{ fontWeight: "bold" }}>Sans Alcool</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: "center" }}>
          <CheckCircle />
          <Typography sx={{ fontWeight: "bold" }}>Disponible</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: "center" }}>
          <Cancel />
          <Typography sx={{ fontWeight: "bold" }}>Non disponible</Typography>
        </Box>

        <Typography>
          <Box component="span" sx={{ fontWeight: "bold" }}>Catégorie : </Box>
          Catégorie
        </Typography>

        <Typography>
          <Box component="span" sx={{ fontWeight: "bold" }}>Fabricant : </Box>
          Fabricant
        </Typography>

        <Typography>
          <Box component="span" sx={{ fontWeight: "bold" }}>Infos : </Box>
          Infos à propos d'une boisson sur plusieurs lignes
        </Typography>

      </Container>


      <Divider />


      <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold", marginTop: "1rem" }}>COMMENTAIRES</Typography>

      <Container sx={{ padding: "1rem" }}>

        <Card sx={{ marginBottom: "1rem" }}>
          <CardHeader title="Par François" subheader="13/01/2023" action={
            <Rating value={4} />
          } />
          <CardContent sx={{ backgroundColor: 'teal', margin: "0.5rem", borderRadius: "10px" }}>
            <Typography variant="body2" sx={{ fontStyle: "italic", color: "white" }}>" Contenu du commentaire qui peut être sur plusieurs lignes "</Typography>
          </CardContent>
        </Card>

        <Card sx={{ marginBottom: "1rem" }}>
          <CardHeader title="Par François" subheader="13/01/2023" action={
            <Rating value={4} />
          } />
          <CardContent sx={{ backgroundColor: 'teal', margin: "0.5rem", borderRadius: "10px" }}>
            <Typography variant="body2" sx={{ fontStyle: "italic", color: "white" }}>" Contenu du commentaire qui peut être sur plusieurs lignes "</Typography>
          </CardContent>
        </Card>

      </Container>

      <Fab color="primary" sx={{ position: "fixed", bottom: "1rem", right: "1rem" }} onClick={handleClickOpen}>
        <EditNote />
      </Fab>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ajouter un commentaire</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection:"column", gap:"0.5rem"}}>
          <Box sx={{ display: 'flex', alignItems: "center", gap: "0.5rem", marginTop:"1rem" }}>
            <Typography>Nom :</Typography>
            <TextField size="small" label="Votre nom ..."/>
          </Box>
          <TextField label="Votre commentaire ..." multiline rows={4} fullWidth />
          <Box sx={{ display: 'flex' }}>
            <Typography>Votre note :</Typography>
            <Rating />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button variant="contained" onClick={handleClose} autoFocus>Valider</Button>
        </DialogActions>
      </Dialog>

    </>
  );
};

export default Drink;