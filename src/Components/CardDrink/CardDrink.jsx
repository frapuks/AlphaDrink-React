import "./CardDrink.scss"
import { Rating } from "@mui/material";

const CardDrink = () => {
  return (
    <article>
      Boisson
      <Rating value={4}/>
    </article>
  );
};

export default CardDrink;