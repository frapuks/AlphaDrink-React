import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Badge, Button, Checkbox, Rating, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const AccordionDrink = ({drink}) => {
  // Utils
  const navigate = useNavigate();
  
  // States
  const [expanded, setExpanded] = useState(false);
  const [likes, setLikes] = useState(drink.starscounter);
  
  // Methods
  const redirect = () => { navigate(`/drink/${drink.id}`); }
  const handleChange = (panel) => (event, isExpanded) => { setExpanded(isExpanded ? panel : false); };

  // TODO : Refacto this method (duplicated in Drink)
  const handleLike = async (event) => {
    event.stopPropagation();
    const endUrl = event.target.checked ? 'addstar' : 'removestar';
    const response = await fetch(`http://localhost:4100/drinks/${drink.id}/${endUrl}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"}
    });
    const data = await response.json();
    setLikes(data.starscounter);
  };

  
  return (
    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>

      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ width: '50%' }}>{drink.name}</Typography>
        <Rating value={drink.averagerate} size="small"  sx={{width:"35%"}}/>
        <Badge badgeContent={likes} color="primary" >
          <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} sx={{ padding: "0" }} size="small" onClick={handleLike} name="favorite"/>
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