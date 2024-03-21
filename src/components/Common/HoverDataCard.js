import PropTypes from "prop-types";

// material-ui
import { Card, Grid, Stack, Typography } from "@mui/material";

// project imports

// ============================|| HOVER DATA CARD ||============================ //

const HoverDataCard = ({ title, iconPrimary, primary, secondary, color }) => {
  const IconPrimary = iconPrimary;
  const primaryIcon =
    iconPrimary !== undefined ? (
      <IconPrimary fontSize="large" sx={{ width: 20, height: 20, color }} />
    ) : null;

  return (
    <Card variant="outlined" sx={{ boxShadow: "none" }}>
      <Grid
        container
        justifyContent="space-between"
        direction="column"
        alignItems="center"
      >
        <Grid item sm={12}>
          <Typography variant="h5" color="inherit" textAlign={"center"}>
            {title}
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            sx={{ my: 1.75, mx: "auto" }}
          >
            {primaryIcon}
            <Typography variant="h2" color={"primary"} fontWeight={"bold"}>
              {primary}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};

HoverDataCard.propTypes = {
  title: PropTypes.string,
  iconPrimary: PropTypes.object,
  primary: PropTypes.number,
  secondary: PropTypes.string,
  color: PropTypes.string,
};

export default HoverDataCard;
