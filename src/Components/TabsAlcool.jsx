import { Tab, Tabs } from "@mui/material";

const TabsAlcool = (data) => {
  return (
    <>
      <Tabs value={data.tabValue} onChange={data.handleChange} centered>
        <Tab label="Toutes les boissons" />
        <Tab label="Sans alcool" />
      </Tabs>
    </>
  );
};

export default TabsAlcool;

// Make dynamic page content
{/* <Typography hidden={tabValue !== 0}>Test 1</Typography> */}
{/* <Typography hidden={tabValue !== 1}>Test 2</Typography> */}