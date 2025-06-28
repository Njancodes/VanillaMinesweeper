class MineMap {
    constructor(size, number_of_mines, starting_position) {
        this.s = size
        this.nom = number_of_mines
        this.strt = starting_position
        this.map = []
        this.mapSet = {}
        this.mineCordinates = []
        this.initializeMap()
    }

    cornersFunction(r, c, cb) {
        if (r - 1 >= 0) {
            if (c + 1 < this.s[1]) {
                cb(r - 1, c + 1)
            }
            if (c - 1 >= 0) {
                cb(r - 1, c - 1)

            }
            cb(r - 1, c)
        }
        if (r + 1 < this.s[0]) {
            if (c + 1 < this.s[1]) {
                cb(r + 1, c + 1)
            }
            if (c - 1 >= 0) {
                cb(r + 1, c - 1)
            }
            cb(r + 1, c)
        }
        if (c + 1 < this.s[1]) {
            cb(r, c + 1)
        }
        if (c - 1 >= 0) {
            cb(r, c - 1)
        }
    }

    initializeMap() {

        for (let i = 0; i < this.s[0]; i++) {
            this.map.push([])
            this.mapSet[i] = []
            for (let j = 0; j < this.s[1]; j++) {
                this.map[i].push(0)
                if (i != this.strt[0] || j != this.strt[1]) {
                    this.mapSet[i].push(j)
                }

            }
        }

        this.cornersFunction(this.strt[0],this.strt[1],(row,col)=>{
            let colArry = this.mapSet[row]
            let idx = colArry.indexOf(col)

            let temp = colArry[idx]
            colArry[idx] = colArry[colArry.length - 1]
            colArry[colArry.length - 1] = temp
            colArry.pop()
            
            this.mapSet[row] = colArry
        })


        if (this.nom > (this.s[0] * this.s[1]) - 1) {
            console.log("The number of mines is exceeding the size of the matrix -> Error")
        } else if (this.strt[0] >= this.s[0] || this.strt[0] < 0) {
            console.log("The starting position is outside the range of rows -> Error")

        } else if (this.strt[1] >= this.s[1] || this.strt[1] < 0) {
            console.log("The starting position is outside the range of columns -> Error")

        } else {
            for (let i = 0; i < this.nom; i++) {
                let [x, y] = this.getRandomPosition
                this.mineCordinates.push([x, y])
                this.map[x][y] = -1
            }
        }
        for (let [r, c] of this.mineCordinates) {
            this.makeNumberTiles(r, c)
        }
    }

    makeNumberTiles(r, c) {
        if (r - 1 >= 0) {
            if (c + 1 < this.s[1]) {
                if (this.map[r - 1][c + 1] >= 0) {
                    this.map[r - 1][c + 1] += 1
                }

            }
            if (c - 1 >= 0) {
                if (this.map[r - 1][c - 1] >= 0) {
                    this.map[r - 1][c - 1] += 1
                }

            }
            if (this.map[r - 1][c] >= 0) {
                this.map[r - 1][c] += 1
            }
        }
        if (r + 1 < this.s[0]) {
            if (c + 1 < this.s[1]) {
                if (this.map[r + 1][c + 1] >= 0) {
                    this.map[r + 1][c + 1] += 1
                }
            }
            if (c - 1 >= 0) {
                if (this.map[r + 1][c - 1] >= 0) {
                    this.map[r + 1][c - 1] += 1
                }
            }
            if (this.map[r + 1][c] >= 0) {
                this.map[r + 1][c] += 1
            }
        }
        if (c + 1 < this.s[1]) {
            if (this.map[r][c + 1] >= 0) {
                this.map[r][c + 1] += 1
            }
        }
        if (c - 1 >= 0) {
            if (this.map[r][c - 1] >= 0) {
                this.map[r][c - 1] += 1
            }
        }
    }

    get getMinesPosition() {
        return this.mineCordinates
    }

    get getRandomPosition() {

        const rowArray = Object.keys(this.mapSet)
        const i = Math.floor(Math.random() * rowArray.length)
        const row = Number.parseInt(rowArray[i])
        const colArray = this.mapSet[row]
        const j = Math.floor(Math.random() * colArray.length)
        const col = colArray[j]

        let temp = colArray[colArray.length - 1]
        colArray[colArray.length - 1] = colArray[j]
        colArray[j] = temp
        colArray.pop()


        this.mapSet[row] = colArray


        for (let i of Object.keys(this.mapSet)) {
            if (this.mapSet[i].length === 0) {
                delete this.mapSet[i]
            }
        }

        return [row, col]
    }


    get getMap() {
        return { map: this.map, size: this.s }
    }
}
