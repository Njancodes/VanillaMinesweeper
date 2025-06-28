class TileComponent extends HTMLElement {

    constructor() {
        super()
        this.value = 0
        this.show = false
        this.flagged = false
    }

    static get observedAttributes() {
        return ["row", "col", "value", "show", "flagged"]
    }

    attributeChangedCallback() {
        this.row = this.getAttribute("row")
        this.col = this.getAttribute("col")
        this.value = this.getAttribute("value")
        this.show = this.getAttribute("show") === "false" ? false : true
        this.flagged = this.getAttribute("flagged") === "false" ? false : true
        this.update();
    }

    update() {
        if (this.querySelector("img")) {
            let tileImg = this.querySelector("img")
            if (!this.show) {
                if (!this.flagged) {
                    tileImg.src = `/components/assets/h-tile.png`
                }else{
                    tileImg.src = `/components/assets/flag-tile.png`
                }
            } else {
                tileImg.src = `/components/assets/${this.value}-tile.png`
            }
        }
    }

    connectedCallback() {
        if (!(this.querySelector("img"))) {
            let tileImg = document.createElement("img")
            console.log("A tile is connected to DOM")
            tileImg.src = "/components/assets/h-tile.png"
            tileImg.width = 32
            tileImg.height = 32
            this.appendChild(tileImg)
        }
    }
}



export const registerTileComponent = () => {
    customElements.define('m-tile', TileComponent)
}