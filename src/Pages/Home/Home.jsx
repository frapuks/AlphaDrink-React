import { CardDrink, Button } from "../../Components";
import "./Home.scss"

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <CardDrink/>
      <Button text={'ce que tu veux'} color={'red'} />
      <Button text={'+'} color={'green'} />
    </>
  );
};

export default Home;