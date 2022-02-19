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

//Build our player and enemies
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
            // ctx.fillRect will draw a rectangle on the canvas
            ctx.fillRect(this.x, this.y, this.height, this.width)
        }
    }
}


let player = new Piece(10, 10, 'white', 16, 16)
let enemy1 = new Piece(100, 50, 'blue', 16, 16)
let enemy2 = new Piece(200, 50, 'green', 16, 16)
let enemy3 = new Piece(300, 50, 'yellow', 16, 16)



//Gameloop will basically let the game playable as its allows us to control our player, what happens 
//during the game, build our game board 
const gameLoop = () => {
     // we use clear rect because we're looping, and we want to clear out the old rendering
  if (enemy1.alive || enemy2.alive || enemy3.alive) {
        detectHitEnemy1()
        detectHitEnemy2()
        detectHitEnemy3()
  }
      // we use clear rect because we're looping, and we want to clear out the old rendering
  ctx.clearRect(0, 0, game.width, game.height)
  movement.textContent = player.x + ', ' + player.y
  player.render()
  if (enemy1.alive || enemy2|| enemy3 ) {
   enemy1.render()
   enemy2.render()
   enemy3.render()
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



//Build the game board

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keydown', movementHandler)
    setInterval(gameLoop, 60)
})
