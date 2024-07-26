import { Typography, Paper, Container } from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/system";

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
});

export const About = () => {
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
          gutterBottom
          className="text-blue-500 font-bold"
        >
          About
        </Typography>
        <HoverPaper elevation={3}>
          <Typography variant="body1" color="textSecondary" paragraph>
            Welcome to Masagal Inventory System. Our platform helps manage and
            track your office supplies efficiently.
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            With MarkusAI, you can easily request new supplies, monitor
            inventory levels, and ensure that your office never runs out of
            essential items.
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            Our goal is to streamline your inventory management process and save
            you time and effort using cutting-edge technology like LLMs. Thank
            you for choosing Masagal Inventory System!
          </Typography>
        </HoverPaper>
      </AboutContent>
    </AboutContainer>
  );
};
