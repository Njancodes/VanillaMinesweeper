class TileManager extends HTMLElement {
    connectedCallback() {
        console.log("The tile manager is connected to the DOM")

        this.m = [[]]
        this.rows = 9; // This default value is taken from the user
        this.cols = 9;
        this.isFirstClick = true
        this.mines = 6
        this.clickedMines = 0
        this.nonmines = (this.rows * this.cols) - this.mines

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let tile = document.createElement('m-tile')
                tile.setAttribute("col", j)
                tile.setAttribute("row", i)
                tile.setAttribute("show", false)
                tile.setAttribute("flagged",false)
                console.log(tile)
                tile.oncontextmenu = (e)=>{
                    console.log("Right clicked")
                    if(!e.currentTarget.show && !e.currentTarget.flagged){
                        e.currentTarget.setAttribute("flagged",true)
                    }else if(e.currentTarget.flagged){
                        e.currentTarget.setAttribute("flagged",false)
                    }
                }
                tile.onclick = (e) => {
                    if (!e.currentTarget.show && !e.currentTarget.flagged && !this.isFirstClick) {
                        const row = Number(e.currentTarget.getAttribute("row")) // Fix this getAttribute shit -> tile.row
                        const col = Number(e.currentTarget.getAttribute("col"))
                        let value = this.m[row][col]
                        e.currentTarget.setAttribute("value", value)
                        e.currentTarget.setAttribute("show", true)
                        if (value === 0) {
                            this.zeroShedding(row, col)
                        } 
                        this.clickedMines += 1
                        //I can make this section better...
                        if (value === -1) {
                            console.log("You lost")
                            this.lost()
                        } else {
                            console.log(this.clickedMines)
                            if (this.clickedMines === this.nonmines) {
                                console.log("You win")
                                this.win()
                            }
                        }
                    }else if(this.isFirstClick){
                        const row = Number(e.currentTarget.getAttribute("row")) // Fix this getAttribute shit -> tile.row
                        const col = Number(e.currentTarget.getAttribute("col"))
                        console.log(row,col)
                        const mapObj = new MineMap([9,9], 10, [row,col])
                        let {map, _} = mapObj.getMap
                        this.m = map
                        this.rows = this.m.length
                        this.cols = this.m[0].length
                        this.isFirstClick = false
                        this.mines = 10
                        this.clickedMines = 0
                        this.nonmines = (this.rows * this.cols) - this.mines

                        tile.onclick(e)
                    }
                }
                this.appendChild(tile)
            }
        }

        this.style = `grid-template-rows: repeat(${this.rows}, 32px);`
        this.style = `grid-template-columns: repeat(${this.cols}, 32px);`
    }

    lost() {
        //Show all the mine placements after losing
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let getTile = document.querySelector(`m-tile[row="${i}"][col="${j}"]`)
                getTile.onclick = null
                getTile.oncontextmenu = null
            }
        }
        let h1Ele = document.createElement("h1")
        h1Ele.textContent = "You lost"
        document.body.appendChild(h1Ele)
    }

    win() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let getTile = document.querySelector(`m-tile[row="${i}"][col="${j}"]`)
                getTile.onclick = null
                getTile.oncontextmenu = null
            }
        }
        //Flag all the tiles after winning.
        let h1Ele = document.createElement("h1")
        h1Ele.textContent = "You win"
        document.body.appendChild(h1Ele)
    }

    cornersFunction(r, c, cb) {
        if (r - 1 >= 0) {
            if (c + 1 < this.cols) {
                cb(r - 1, c + 1)
            }
            if (c - 1 >= 0) {
                cb(r - 1, c - 1)

            }
            cb(r - 1, c)
        }
        if (r + 1 < this.rows) {
            if (c + 1 < this.cols) {
                cb(r + 1, c + 1)
            }
            if (c - 1 >= 0) {
                cb(r + 1, c - 1)
            }
            cb(r + 1, c)
        }
        if (c + 1 < this.cols) {
            cb(r, c + 1)
        }
        if (c - 1 >= 0) {
            cb(r, c - 1)
        }
    }

    zeroShedding(r, c) {
        let corners = []
        this.cornersFunction(r, c, (row, col) => {
            const tile = this.querySelector(`m-tile[row="${row}"][col="${col}"]`)
            if (!tile.show) {
                corners.push([row, col])
            }
        })
        

        let count = 0;

        for (let corner of corners) {
            
            const row = corner[0]
            const col = corner[1]
            const value = this.m[row][col]
            const tile = this.querySelector(`m-tile[row="${corner[0]}"][col="${corner[1]}"]`)
            if (value === 0 && !tile.show && !tile.flagged) {
                this.clickedMines += 1
                tile.setAttribute("value", value);
                tile.setAttribute("show", true);
                this.zeroShedding(row, col)
            } else if (!tile.show && !tile.flagged) {
                this.clickedMines += 1
                tile.setAttribute("value", value);
                tile.setAttribute("show", true);
            }

        }

    }

}

export const registerTileManagerComponent = () => {
    customElements.define("m-tilemanager", TileManager)
}