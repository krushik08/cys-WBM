import PropTypes from "prop-types";

// material-ui
import {
  Card,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// =============================|| REVENUE CARD ||============================= //

const UserCard = ({
  primary,
  secondary,
  content1,
  content2,
  color,
  txtColor,
}) => {
  const theme = useTheme();
  const matchDownXs = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card sx={{ background: color, position: "relative", color: "#fff" }}>
      <CardContent>
        <Grid
          container
          direction={matchDownXs ? "column" : "row"}
          spacing={1}
          justifyContent={"space-between"}
        >
          <Grid item xs={6}>
            <Typography variant="subtitle2" fontWeight={"bold"}>
              {primary} :
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h3" color="inherit">
              {secondary}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" fontWeight={"bold"}>
              {content1} :
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h3" color="inherit">
              {content2}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

UserCard.propTypes = {
  primary: PropTypes.string,
  secondary: PropTypes.string,
  content1: PropTypes.string,
  content2: PropTypes.string,
  color: PropTypes.string,
  txtColor: PropTypes.string,
};

export default UserCard;
