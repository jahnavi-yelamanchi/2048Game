document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const highscoreDisplay = document.getElementById('highscore')

    let squares = [];
    let score = 0;
    let highscore = 0;

    function createCookie(name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    }
    
    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    
    function eraseCookie(name) {
        createCookie(name,"",-1);
    }
    
    function setHighScore(x){
        highscore = x;
        highscoreDisplay.innerHTML = x;
        createCookie("highscore", highscore, 365);
        //alert("createCookie func: "+document.cookie)
        //document.cookie = "highscore=" + String(highscore)+";";
        //alert("Now:"+document.cookie);
    }

    function checkHighscore() {
        let x = readCookie("highscore");
        if (x != null) {
            //alert(document.cookie);
            //alert("x=" + x);
            setHighScore(parseInt(x));
        } else {
            createCookie("highscore", highscore, 365);
        }
        setHighScore(highscore);
    }
    checkHighscore();

    function updateHighscore(){
        if (score > highscore){
            createCookie("highscore", score, 365);
            setHighScore(score);
        }
    }
    
    function createBoard() {
        for (let i=0; i< 16; i++){
            square = document.createElement('div')
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            squares.push(square)
        }
        generateTwo()
        generateTwo()
    }
    createBoard()

    function generateTwo(){
        let random = Math.floor(Math.random() * squares.length)
        if (squares[random].innerHTML == 0){
            squares[random].innerHTML = 2
            checkLose()
        }
        else generateTwo()
    }

    //swipe right
    function moveRight(){
        for (let i = 0; i<16; i++){
            if(i%4 == 0 ){ 
                let totalOne = parseInt(squares[i].innerHTML)
                let totalTwo = parseInt(squares[i+1].innerHTML)
                let totalThree = parseInt(squares[i+2].innerHTML)
                let totalFour = parseInt(squares[i+3].innerHTML)
                let row = [totalOne,totalTwo,totalThree,totalFour]

                //console.log(row)

                let filteredRow = row.filter(x => x != 0)
                //console.log(filteredRow)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                //console.log(zeros)
                let newRow = zeros.concat(filteredRow)
                //console.log(newRow)

                //insert new row into the squares
                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
    }
 
    //swipe left
    function moveLeft(){
        for (let i = 0; i<16; i++){
            if(i%4 == 0 ){ //first column
                let totalOne = parseInt(squares[i].innerHTML)
                let totalTwo = parseInt(squares[i+1].innerHTML)
                let totalThree = parseInt(squares[i+2].innerHTML)
                let totalFour = parseInt(squares[i+3].innerHTML)
                let row = [totalOne,totalTwo,totalThree,totalFour]


                let filteredRow = row.filter(x => x != 0)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = filteredRow.concat(zeros)
                

                //insert new row into the squares
                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
    }
    
    function sumRow(){
        for (let i=0; i <15; i++){ //end before index 15 because is has no "right neighbour"
            if(squares[i].innerHTML == squares[i+1].innerHTML){
                let combineNum = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
                squares[i].innerHTML = combineNum
                squares[i+1].innerHTML = 0
                score += combineNum
                scoreDisplay.innerHTML = score
            }
        }
    }

    checkWin()

    function moveDown(){
        //get column
        for(let i=0; i<4; i++){
            let totalOne = parseInt(squares[i].innerHTML)
            let totalTwo = parseInt(squares[i+4].innerHTML)
            let totalThree = parseInt(squares[i+4*2].innerHTML)
            let totalFour = parseInt(squares[i+4*3].innerHTML)
            let column = [totalOne,totalTwo,totalThree,totalFour]

            let filteredColumn = column.filter(x => x!=0 )
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = zeros.concat(filteredColumn)

            squares[i].innerHTML = newColumn[0]
            squares[i+4].innerHTML = newColumn[1]
            squares[i+4*2].innerHTML = newColumn[2]
            squares[i+4*3].innerHTML = newColumn[3]
        }
    }

    function moveUp(){
        //get column
        for(let i=0; i<4; i++){
            let totalOne = parseInt(squares[i].innerHTML)
            let totalTwo = parseInt(squares[i+4].innerHTML)
            let totalThree = parseInt(squares[i+4*2].innerHTML)
            let totalFour = parseInt(squares[i+4*3].innerHTML)
            let column = [totalOne,totalTwo,totalThree,totalFour]

            let filteredColumn = column.filter(x => x!=0 )
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = filteredColumn.concat(zeros)

            squares[i].innerHTML = newColumn[0]
            squares[i+4].innerHTML = newColumn[1]
            squares[i+4*2].innerHTML = newColumn[2]
            squares[i+4*3].innerHTML = newColumn[3]
        }
    }

    function sumColumn(){
        for (let i=0; i <12; i++){ //end before index 12 because is has no "below neighbour"
            if(squares[i].innerHTML == squares[i+4].innerHTML){
                let combineNum = parseInt(squares[i].innerHTML) + parseInt(squares[i+4].innerHTML)
                squares[i].innerHTML = combineNum
                squares[i+4].innerHTML = 0
                score += combineNum
                scoreDisplay.innerHTML = score
            }
        }

        checkWin()
    }

    //Assign keys
    function control(event){
        if(event.keyCode === 39){
            keyRight()
        }else if (event.keyCode === 37){
            keyLeft()
        }else if (event.keyCode === 38){
            keyUp()
        }else if (event.keyCode === 40){
            keyDown()
        }
            
    }
    document.addEventListener('keyup',control)

    function keyRight(){
        moveRight() //move all to right
        sumRow() //combine neighbour if same number
        moveRight() //move all to right again
        generateTwo() //generate new numbers

        updateHighscore()
    }

    function keyLeft(){
        moveLeft()
        sumRow()
        moveLeft()
        generateTwo()

        updateHighscore()
    }

    function keyDown(){
        moveDown()
        sumColumn()
        moveDown()
        generateTwo()

        updateHighscore()
    }

    function keyUp(){
        moveUp()
        sumColumn()
        moveUp()
        generateTwo()

        updateHighscore()
    }

    function checkWin(){
        for(let i=0; i < 16; i++){
            if (squares[i].innerHTML == 2048){
                alert('Congratulations!! Refresh the page to play again.')
                updateHighscore()
                document.removeEventListener('keyup', control)
            }
        }
    }

    function checkLose(){
        let numZeros = 0
        for(let i = 0; i<16; i++){
            if(squares[i].innerHTML==0){
                numZeros++
            }
        }
        if(numZeros===0){
            alert('Game Over!! Refresh the page to play again.')
            updateHighscore()
            document.removeEventListener('keyup', control)
        }
    }
})
