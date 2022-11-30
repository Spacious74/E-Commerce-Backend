let serverConfig = require("./config/server.config");   
const expressApp = require("./app");
expressApp.listen(serverConfig.PORT, () => {
    console.log("Server is running at Port " + serverConfig.PORT);
});