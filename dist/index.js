"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const settings_1 = require("./settings");
const PORT = 3000;
settings_1.app.listen(PORT, () => {
    console.log('App starter on ${PORT} port');
});
