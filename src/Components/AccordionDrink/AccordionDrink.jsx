import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Badge, Button, Checkbox, Rating, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const AccordionDrink = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [likes, setLikes] = useState(4);
  const handleLike = (event) => {
    event.stopPropagation();
    event.target.checked ? setLikes(likes + 1) : setLikes(likes - 1);
  };
  const redirect = ()=>{
    navigate("/drink");
  }
  return (
    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>

      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        // aria-controls="panel1bh-content"
        // id="panel1bh-header"
      >
        <Typography sx={{ width: '50%' }}>Boisson</Typography>
        <Rating value={4} size="small"  sx={{width:"35%"}}/>
        <Badge badgeContent={likes} color="primary" >
          <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} sx={{ padding: "0" }} size="small" onClick={handleLike} />
        </Badge>
      </AccordionSummary>

      <AccordionDetails>
        <Typography>Fabricant</Typography>
        <Typography>Infos sur la boisson</Typography>
      </AccordionDetails>

      <AccordionActions>
        <Button size="small" onClick={redirect}>Plus d'infos</Button>
      </AccordionActions>
      
    </Accordion>
  );
};

export default AccordionDrink;