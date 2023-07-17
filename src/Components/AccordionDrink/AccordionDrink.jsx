import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Badge, Button, Checkbox, Rating, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const AccordionDrink = (data) => {
  const drink = data.drink;
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [likes, setLikes] = useState(drink.starscounter);
  const handleLike = (event) => {
    event.stopPropagation();
    event.target.checked ? setLikes(likes + 1) : setLikes(likes - 1);
  };
  const redirect = ()=>{
    navigate("/drink");
  }
  
  return (
    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>

      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ width: '50%' }}>{drink.name}</Typography>
        <Rating value={drink.averagerate} size="small"  sx={{width:"35%"}}/>
        <Badge badgeContent={likes} color="primary" >
          <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} sx={{ padding: "0" }} size="small" onClick={handleLike} />
        </Badge>
      </AccordionSummary>

      <AccordionDetails>
        <Typography>{drink.maker}</Typography>
        <Typography>{drink.infos}</Typography>
      </AccordionDetails>

      <AccordionActions>
        <Button size="small" onClick={redirect}>Plus d'infos</Button>
      </AccordionActions>
      
    </Accordion>
  );
};

export default AccordionDrink;