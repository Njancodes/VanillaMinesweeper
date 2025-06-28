import { registerTileComponent } from "./components/tile.js";
import { registerTileManagerComponent } from "./components/tilemanager.js";

const app = () => {
    registerTileManagerComponent()
    registerTileComponent()
}

document.addEventListener('DOMContentLoaded', () => {
    app()

    const tm = document.querySelector("m-tilemanager");

    


})