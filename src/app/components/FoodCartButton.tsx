import Button from "@mui/material/Button";
const FoodCartButton = () => {
  return (
    <Button
      variant="contained"
      style={{
        textTransform: "none",
        fontSize: 16,
        backgroundColor: "rgb(239 68 68)",
        borderRadius: 10,
        fontWeight: "bold",
      }}>
      Добавить в корзину
    </Button>
  );
};
export default FoodCartButton;
