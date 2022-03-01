import app from "./app";

const port = process.env.PORT || 3005;

app.listen(port, () => {
  console.log(`The server Is Running On Port : ${port}`);
});
