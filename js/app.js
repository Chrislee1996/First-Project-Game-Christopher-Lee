// console.log('hello world')
const game = document.getElementById('canvas')
const movement = document.getElementById('movement')
const score = document.getElementById('score')
const ctx = game.getContext('2d')

// now we can set some attributes to our game,
// to set height and width based on COMPUTED STYLE
// basically it means reading how it's displaying in the current state in the browser.
game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])


//Build our player/enemies and tiles
//use class to build our pieces as they are the same thing 
// we could use the class syntax with a constructor
//x&y are our movement 
class Piece  {
    constructor(x,y,color,height,width) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.height = height,
        this.width = width,
        this.alive = true,
        this.render = function () {
            // ctx.fillStyle will determine the color(or style) of your element
            ctx.fillStyle = this.color
            // ctx.fillRect will draw a rectangle odn the canvas
            ctx.fillRect(this.x, this.y, this.height, this.width)
        }
    }
}


let player = new Piece(730, 460, 'white', 32, 32)
let enemy1 = new Piece(100, 60, 'blue', 32, 32)
let enemy2 = new Piece(730, 900, 'green', 32, 32)
let enemy3 = new Piece(1250, 60, 'yellow', 32, 32)
let enemy4 = new Piece(100, 900, 'grey', 32, 32)
let enemy5 = new Piece(1250, 900, 'orange', 32, 32)
let enemy6 = new Piece(730, 60, 'red', 32, 32)


//build our container/tiles
let topBoxes = new Piece(0,0,'brown', 1400,30)
let bottomBoxes = new Piece(0,970,'brown', 1464,30)
let leftBoxes = new Piece(0,0,'brown', 64,980)
let rightBoxes = new Piece(1400,0,'brown', 64,980)

let firstBox = new Piece(440,100,'brown', 620,320)
let firstLine = new Piece(120,150,'brown',1200,32)
let secondBox = new Piece(440,550,'brown', 620,300)
let secondLine = new Piece(120,740,'brown', 1200,30)

//Gameloop will basically let the game playable as its allows us to control our player, what happens 
//during the game, build our game board 
const gameLoop = () => {
     // we use clear rect because we're looping, and we want to clear out the old rendering
  if (enemy1.alive || enemy2.alive || enemy3.alive || enemy4.alive || enemy5.alive || enemy6.alive)  {
        detectHitEnemy1()
        detectHitEnemy2() 
        detectHitEnemy3()
        detectHitEnemy4()
        detectHitEnemy5()
        detectHitEnemy6()
  }
      // we use clear rect because we're looping, and we want to clear out the old rendering
  ctx.clearRect(0, 0, game.width, game.height)
  movement.textContent = player.x + ', ' + player.y
  player.render()
  if (enemy1.alive || enemy2|| enemy3 ) {
   enemy1.render()
   enemy2.render()
   enemy3.render()
   enemy4.render()
   enemy5.render()
   enemy6.render()
   topBoxes.render()
   bottomBoxes.render()
   leftBoxes.render()
   rightBoxes.render()
   firstBox.render()
   firstLine.render()
   secondBox.render()
   secondLine.render()
  }
}

const detectHitEnemy1 = () => {
    // we need an if statement that clearly defines the moment of collision
    // that means utilizing the x,y, width, and height of whatever we're detecting
    if (player.x < enemy1.x + enemy1.width 
        && player.x + player.width > enemy1.x
        && player.y < enemy1.y + enemy1.height
        && player.y + player.height > enemy1.y) {
            enemy1.alive = false
            document.getElementById('status').textContent = 'You Lost!'
        }
}
const detectHitEnemy2 = () => {
    // we need an if statement that clearly defines the moment of collision
    // that means utilizing the x,y, width, and height of whatever we're detecting
    if (player.x < enemy2.x + enemy2.width 
        && player.x + player.width > enemy2.x
        && player.y < enemy2.y + enemy2.height
        && player.y + player.height > enemy2.y) {
            enemy2.alive = false
            document.getElementById('status').textContent = 'You Lost!'
        }
}

const detectHitEnemy3 = () => {
    // we need an if statement that clearly defines the moment of collision
    // that means utilizing the x,y, width, and height of whatever we're detecting
    if (player.x < enemy3.x + enemy3.width 
        && player.x + player.width > enemy3.x
        && player.y < enemy3.y + enemy3.height
        && player.y + player.height > enemy3.y) {
            enemy3.alive = false
            document.getElementById('status').textContent = 'You Lost!'
        }
}


const detectHitEnemy4 = () => {
    // we need an if statement that clearly defines the moment of collision
    // that means utilizing the x,y, width, and height of whatever we're detecting
    if (player.x < enemy4.x + enemy4.width 
        && player.x + player.width > enemy4.x
        && player.y < enemy4.y + enemy4.height
        && player.y + player.height > enemy4.y) {
            enemy4.alive = false
            document.getElementById('status').textContent = 'You Lost!'
        }
}

const detectHitEnemy5 = () => {
    // we need an if statement that clearly defines the moment of collision
    // that means utilizing the x,y, width, and height of whatever we're detecting
    if (player.x < enemy5.x + enemy5.width 
        && player.x + player.width > enemy5.x
        && player.y < enemy5.y + enemy5.height
        && player.y + player.height > enemy5.y) {
            enemy5.alive = false
            document.getElementById('status').textContent = 'You Lost!'
        }
}

const detectHitEnemy6 = () => {
    // we need an if statement that clearly defines the moment of collision
    // that means utilizing the x,y, width, and height of whatever we're detecting
    if (player.x < enemy6.x + enemy6.width 
        && player.x + player.width > enemy6.x
        && player.y < enemy6.y + enemy6.height
        && player.y + player.height > enemy6.y) {
            enemy6.alive = false
            document.getElementById('status').textContent = 'You Lost!'
        }
}
//movement for enemy


//movement for player
const movementHandler = (e) => {
    // we can use if...else and keycodes to determine player movement
    // keycodes refer to specific keyboard keys with a number
    // if we want to use WASD the key codes are as follows:
    // w=87, a=65, s=83, d=68
    // up=38, down=40, left=37, right=39
    // we can also use a switch case which can be handy when we have multiple possibilities
    // switch case has a main switch, cases(which are our inputs in this instance)
    // we also need to break out of our cases, using the keyword break
    switch (e.keyCode) {
        case (87):
            // we'll move the player up
            player.y -= 10
            // then break the case
            break
        case (65):
            // move the player left
            player.x -= 10
            break
        case (83):
            // move player down
            player.y += 10
            break
        case (68):
            // move the player right
            player.x += 10
            break
    }
}

//move enemy 

//Build the game board

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keydown', movementHandler)
    setInterval(gameLoop, 60)
})

