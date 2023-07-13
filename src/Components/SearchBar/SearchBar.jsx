import { useNavigate } from "react-router-dom";
import "./SearchBar.scss"
import { Box, Button, Stack, TextField } from "@mui/material";

const SearchBar = () => {
  const navigate = useNavigate();
  const handleSearch = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(`search : ${data.get('search')}`);
    navigate("/search");
  }
  return (
    <>
      <Box component="form" onSubmit={handleSearch}>
        <Stack direction="row" justifyContent="center" spacing="0.5rem" sx={{m:1}}>
          <TextField label="Tapez votre recherche..." name="search" size="small" required/>
          <Button variant="contained" type="submit">Rechercher</Button>
        </Stack>
      </Box>
    </>
  );
};

export default SearchBar;