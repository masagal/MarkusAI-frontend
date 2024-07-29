import { Typography, Paper, Container, Card, CardContent, CardMedia, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/system";
import ludvig from '../assets/footer-image-ludvig copy.png';
import mathangi from '../assets/Footer-image-mathangi copy.jpeg';
import simon from '../assets/footer-image-simon copy.jpeg';

const HoverPaper = styled(Paper)({
  backgroundColor: "#ffffff",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.02)",
  },
  padding: "50px",
  borderRadius: "5px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  boxSizing: "border-box",
  marginBottom: "2px",
});

const AboutContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  minHeight: "80vh",
  padding: "0 16px",
  paddingTop: "20px",
});

const AboutContent = styled(motion.div)({
  backgroundColor: "#ffffff",
  borderRadius: "20px",
  padding: "40px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  maxWidth: "800px",
  width: "100%",
  marginTop: "20px",
  marginBottom: "40px",
});

const TeamGrid = styled(Grid)({
  marginTop: "40px",
  width: "100%",
});

const TeamCard = styled(Card)({
  maxWidth: 345,
  margin: "auto",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.2)",
  },
});

export const About = () => {
  return (
    <AboutContainer>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        className="text-blue-500 font-bold"
      >
        Our Team
      </Typography>
      <TeamGrid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <TeamCard>
            <CardMedia
              component="img"
              alt="Ludvig"
              image={ludvig}
              sx={{ height: 200, objectFit: "contain", padding: 2 }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Ludvig
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {/* Add more information about Ludvig here */}
              </Typography>
            </CardContent>
          </TeamCard>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TeamCard>
            <CardMedia
              component="img"
              alt="Mathangi"
              image={mathangi}
              sx={{ height: 200, objectFit: "contain", padding: 2 }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Mathangi
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {/* Add more information about Mathangi here */}
              </Typography>
            </CardContent>
          </TeamCard>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TeamCard>
            <CardMedia
              component="img"
              alt="Simon"
              image={simon}
              sx={{ height: 200, objectFit: "contain", padding: 2 }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Simon
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {/* Add more information about Simon here */}
              </Typography>
            </CardContent>
          </TeamCard>
        </Grid>
      </TeamGrid>

      <AboutContent
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          className="text-blue-500 font-bold"
        >
          About MarkusAI
        </Typography>
        <HoverPaper elevation={3}>
          <Typography variant="body1" color="textSecondary" paragraph>
            Welcome to MarkusAI. Our platform is designed to revolutionize the way office supplies are managed, making the process faster, more efficient, and more user-friendly.
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            In many offices, managing inventory is a tedious task that involves multiple layers of approval and a lot of back-and-forth communication. This traditional method is slow and ineffective, leading to overstocking or running out of essential supplies.
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            MarkusAI simplifies this process by allowing team members to request supplies directly through an easy-to-use interface. The admin team can quickly approve or deny these requests, and our system helps to avoid duplication by tracking current inventory levels and pending orders.
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            To make our tool as user-friendly as possible, we integrate natural language processing, allowing team members to request supplies using a conversational interface. Simply message Markus.AI on Slack to place a request, and our system will handle the rest.
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            Our goal is to streamline your inventory management process, saving you time and effort while ensuring your office never runs out of the supplies it needs. Thank you for choosing MarkusAI to help manage your office supplies more effectively!
          </Typography>
        </HoverPaper>
      </AboutContent>
    </AboutContainer>
  );
};

export default About;