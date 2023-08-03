import { Box, Button, Stack, TextField } from "@mui/material";

const SearchBar = ({handleSearch}) => {
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