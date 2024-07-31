import { Typography, Container } from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/system";

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
});

export const Home = () => {
  return (
    <AboutContainer>
      <AboutContent
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography
          variant="h3"
          align="center"
          pb={7}
          className="text-blue-500 font-bold"
        >
          Home
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Welcome to Masagal Inventory System. Our platform helps manage and
          track your office supplies efficiently.
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Explore our features and see how MarkusAI can streamline your
          inventory management process, saving you time and effort.
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Thank you for choosing Masagal Inventory System. We are committed to
          providing you with the best experience possible.
        </Typography>
      </AboutContent>
    </AboutContainer>
  );
};
