import { ExpandMore, Favorite, FavoriteBorder } from "@mui/icons-material";
import "./CardDrink.scss"
import { Badge, Button, Card, CardActions, CardContent, CardHeader, Checkbox, Collapse, IconButton, Rating, Typography } from "@mui/material";
import { useState } from "react";

const CardDrink = () => {
  const [expanded, setExpanded] = useState(false);
  const [likes, setLikes] = useState(4);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLike = (event) => {
    event.target.checked ? setLikes(likes + 1) : setLikes(likes - 1);
  };

  return (
    <Card>
      <CardHeader title="Boisson" subheader={<Rating value={4}/>} action={
        <Badge badgeContent={likes} color="primary" sx={{margin:"0.5rem"}}>
          <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} sx={{padding:"0"}} onChange={handleLike}/>
        </Badge>
      }/>
      <CardActions>
        <Button size="small">Plus d'infos</Button>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          sx={{marginLeft:"auto"}}
        >
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded}>
        <CardContent>
          <Typography variant="subtitle2">Fabricant</Typography>
          <Typography variant="body2">Infos de la boisson</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default CardDrink;