import app from './app';
import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.info(`Server is running on port ${process.env.PORT}`);
});
