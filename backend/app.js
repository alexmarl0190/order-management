import { Server } from "./src/presentation/server.js";


(async () => {
    main();
})();


function main() {

    const server = new Server()
    server.start();

}