import { app } from "./settings";

const PORT = 80;

app.listen(PORT, () => {
    console.log(`Listen on ${PORT} port`)
});