//This sets up our DOM man. - grabbing items from index 
const canvas = document.getElementById('canvas')
const instructions = document.getElementById('instructions')
// we need to get the game's context, which will allows to specify where to put things and how big to make them
const ctx = canvas.getContext('2d')
const score = document.getElementById('score')
const button = document.getElementById('hidden')
const startButton = document.getElementById('startButton')
const title = document.getElementById('Title-screen')
const winLogo = document.getElementById('winLogo')
const lostLogo = document.getElementById('lostLogo')
const gametitle = document.getElementById('gametitle')

//game images
const coin = new Image()
coin.src='images/coin.png'

const bricks = new Image()
bricks.src = 'images/bricks.png'

const ghosts = new Image()
ghosts.src = 'images/ghost.png'

const ghosts2 = new Image()
ghosts2.src = 'images/ghost2.png'

const superfoodimage = new Image()
superfoodimage.src = 'images/superfood.png'

//set our canvas 
ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

//create a constructor for our board - set our width and height of our board to 60x60
class Board {
  constructor({position,image}) {
    this.position = position
    this.width = 60
    this.height = 60
    this.image = image
  }
  render = function() {
    //this will create the walls using the image we create
    ctx.drawImage(this.image, this.position.x,this.position.y)
    //if the png for our bricks/walls are gone, this will server as a backup
    // ctx.fillStyle = 'blue'
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

//add our points/food -since our food will be the same shape as our player , we can copy and paste it - change color/size
class Food {
  constructor({position,image}) {
    this.position = position
    this.radius = 18
    this.image = image
  }
  render = function() {
    ctx.beginPath()
    ctx.drawImage(this.image, this.position.x,this.position.y)
    ctx.fill()
    ctx.closePath()
    //if png for the coins is gone - back-up will be available via ctx arc/fillstyle
    // ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    // ctx.fillStyle = 'white'
  }
}
//superfood - since it has basically the same principles as our food, we can copy and paste our food class
class Superfood {
  constructor({position,image}) {
    this.position = position
    this.radius = 15
    this.image = image
  }
  render = function() {
    ctx.beginPath()
    ctx.drawImage(this.image, this.position.x,this.position.y)
    ctx.fill()
    ctx.closePath()
    //if png for the coins is gone - back-up will be available via ctx arc/fillstyle
    // ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    // ctx.fillStyle = 'white'
  }
}

//create and set our score variables and store them as arrays so we can push into the arrays after our loop
let points = 0
const tiles =[]
const foods = []
const superFoods = []

//0 = container
//1 = blank
//2 = food
//5 = superfood
//create an array of arrays for our board 
const gameBoard = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,0,0],
  [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,5,1,0],
  [0,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1,1,0,0],
  [0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
  [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
  [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
  [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
  [0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
  [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
  [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
  [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
  [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]

//iterate/loop into our ararys of arrays with a callback function
//first we loop into the array 
gameBoard.forEach((row, index) => {
  //loop into the array of arrays
  row.forEach((number, j) => {
    //create a switch statement - basically telling our code that for each case "whatever", we want to switch it and push one of our constructors into them 
    switch (number) {
      case 0:
        tiles.push(new Board({
          position: {
            //since our board is 60x60, we can multiply by 'j' and 60 to create/push whatever we want into our array of arrays (ex. case 0 is our walls ) for our width
            x: 60 * j,
            //same concept, since our board is 60x60, we can multiply by the index to get our height 
            y: 60 * index
          },
          image: bricks
        })
      )
      //this works as above, if we want to import something new to our board, we just need a new case with the number of our new item
    break
      case 2:
        foods.push(new Food({
            position: {
              x: 60 * j,
              y: 60 * index
          },
          image: coin
        })
      )
      break
      case 5:
        superFoods.push(new Superfood({
            position: {
              x: 60 * j,
              y: 60 * index
          },
          image: superfoodimage
        })
      )
      break
    }
  })
})

//create our player -use the class syntax with a constructor
class Player {
  constructor({position,movement}) {
    this.position = position
    this.movement = movement
    //this is basically setting up how our pac-man mouth moves 
    this.radius = 20
    this.rad = .75
    this.mouth = .040
    this.rotation=0
    this.collectSound = new Audio('sounds/collectSound.wav')
    this.deathSound = new Audio('sounds/deathSound.wav')
    this.winSound = new Audio('sounds/winSound.wav')
    this.bumpSound = new Audio('sounds/bump.wav')
    this.unkillable = new Audio('sounds/unkillable.wav')
  }
  render = function() {
      //this is basically setting up how our pac-man mouth moves and to get them to that ball like shape 
    ctx.save()
    ctx.translate(this.position.x, this.position.y)
    ctx.rotate(this.rotation)
    ctx.translate(-this.position.x, -this.position.y)
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, this.rad, Math.PI * 2 - this.rad)
    ctx.restore()
    ctx.lineTo(this.position.x, this.position.y)
    ctx.fillStyle = 'yellow'
    ctx.fill()
    ctx.closePath()
  }
  update = function() {
    this.render()
    this.position.x += this.movement.x
    this.position.y += this.movement.y
    if (this.rad < 0 || this.rad > .75) this.mouth = -this.mouth
    this.rad += this.mouth
  }
}
//end of player class

//setting up our player position 
const player = new Player({
  position: {
    x:550,
    y:200
  } ,
  movement: {
    x:0,
    y:0
  }
})

//add our enemies - same constructors as our player but will have different color - since majority of our enemy and player share the same properties
class Enemy {
  constructor({position,color,movement,image}) {
    this.position = position
    this.radius = 10
    this.color = color
    this.movement = movement
    this.image = image
    this.eatten = false
  }
  render = function() {
    ctx.drawImage(this.image, this.position.x,this.position.y )
    ctx.beginPath()
    ctx.fill()
    ctx.closePath()
    //this is how our enemies will follow pacman when spawn - if our player position is different than our enemy position via x or the y axis, they will follow our player (hence the +1)
    let diffX = player.position.x - this.position.x
    let diffY = player.position.y - this.position.y
    if (diffX > 0) {
      this.position.x +=1
    } else {
      this.position.x -=1
    }
    if (diffY > 0) {
      this.position.y +=1
    } else {
      this.position.y -=1
    }
  }  
    //if the png for our ghost were to be deleted, this will server as a temp. backup (will appear as balls)
    // ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    // ctx.fillStyle = 'red'
  update = function() {
    this.render()
    this.position.x += this.movement.x
    this.position.y += this.movement.y
  }
}
//end of enemy class


//setting our enemy position up 
const enemies = [
  new Enemy({
    position: {
      x:880,
      y:820
    },
    movement: {
      x: 0,
      y: 0
    },
    image: ghosts
  })
]

const enemies2 = [
  new Enemy({
    position: {
      x:100,
      y:800
    },
    movement: {
      x: 0,
      y:0
    },
    image: ghosts2
  })
]

// the gameloop function will basically allow the game to be a game (controlling what happens/when, movement/spawning items)
const gameLoop = () => {
  let gameAnimation = requestAnimationFrame(gameLoop)
  ctx.clearRect(0,0, canvas.width, canvas.height)
  //prevents player from going in the walls 
  tiles.forEach((tile) => {
    tile.render()
      if (player.position.y - player.radius + player.movement.y <= tile.position.y + tile.height 
      && player.position.x + player.radius + player.movement.x >= tile.position.x 
      && player.position.y + player.radius +player.movement.y>= tile.position.y 
      && player.position.x - player.radius + player.movement.x<= tile.position.x + tile.width) {
      // console.log('this should log if we are touching a wall')
        player.bumpSound.play()
        player.movement.x = 0
        player.movement.y = 0
      }
  })
//end of player collision

foods.forEach((food,index) => {
  food.render()
    //remove food when we touch it 
    if (((food.position.x - player.position.x)*(food.position.x - player.position.x )) + (( food.position.y - player.position.y)*( food.position.y - player.position.y)) < 
    (food.radius + player.radius) * (food.radius + player.radius)) {
      foods.splice(index, 1)
      player.collectSound.play()
      // console.log('this will notify us that we are touching the food')
      points +=15
      score.innerText = points
      // win condition
      // console.log('should log win message when everything is collected', 'you win')
       if (foods.length === 0) {
          player.winSound.play()
          score.style.display= 'none'
          scoreElement.style.display = 'none'
          button.style.display = "inline"
          canvas.remove()
          winLogo.style.display = 'inline'
          cancelAnimationFrame(gameAnimation)
          instructions.innerText= `Congratulations, You Won!, Final score of: ${score.innerText}`
          document.appendChild(instructions)
        } 
    }
})
//end of eating food 

//eating super food 
superFoods.forEach((superFood,index) => {
  superFood.render()
  if (((superFood.position.x - player.position.x)*(superFood.position.x - player.position.x )) + (( superFood.position.y - player.position.y)*( superFood.position.y - player.position.y)) < 
    (superFood.radius + player.radius) * (superFood.radius + player.radius)) {
      points -=15
      score.innerText = points
      superFoods.splice(index, 1)
      //after superfood is eaten, sound will play for ~9.9 seconds to tell player we are unkillable
      let counter = 10
      const startSuperfood = setInterval(() => {
        player.unkillable.play()
        counter -=1 
      }, 1000);
      setTimeout(() => {
        clearInterval(startSuperfood)
      },4900)
      //after superfood is eaten = action for what happens to enemies
      enemies.forEach(enemy => {
        enemy.eatten = true 
        setTimeout(() => {
          enemy.eatten = false
        },5000)
      })
      enemies2.forEach(enemy2 => {
        enemy2.eatten = true 
        setTimeout(() => {
          enemy2.eatten = false
        },5000)
      })


    }
})
//spawn our player
player.update() 

//spawns our enemies
enemies.forEach((enemy,index)=> {
  enemy.update()
  if (((enemy.position.x - player.position.x)*(enemy.position.x - player.position.x )) + (( enemy.position.y - player.position.y)*( enemy.position.y - player.position.y)) < 
  (enemy.radius + player.radius) * (enemy.radius + player.radius)) {
    // console.log('this should log a message when we touch an enemy','you lost'
    if (enemy.eatten) {
      enemies.splice(index,1)
      points -=50
      score.innerText = points
    } else {
    player.deathSound.play()
    button.style.display === "none"
    button.style.display = "inline"
    score.style.display= 'none'
    scoreElement.style.display = 'none'
    lostLogo.style.display = 'inline'
    cancelAnimationFrame(gameAnimation)
    const lostScreen = lostLogo.style.display = 'inline'
    instructions.innerText= `Better luck next time! Final score of: ${score.innerText}`
    document.appendChild(instructions)
    }
  }
})

enemies2.forEach((enemy2,index)=> {
  enemy2.update()
//  this will prevent the ghost from colliding via the walls 
  tiles.forEach((tile) => {
    tile.render()
      if (enemy2.position.y - enemy2.radius + enemy2.movement.y <= tile.position.y + tile.height 
      && enemy2.position.x + enemy2.radius + enemy2.movement.x >= tile.position.x 
      && enemy2.position.y + enemy2.radius +enemy2.movement.y>= tile.position.y 
      && enemy2.position.x - enemy2.radius + enemy2.movement.x<= tile.position.x + tile.width) {
        enemy2.movement.y = Math.random() * 2
      } 
  })

  if (((enemy2.position.x - player.position.x)*(enemy2.position.x - player.position.x )) + (( enemy2.position.y - player.position.y)*( enemy2.position.y - player.position.y)) < 
  (enemy2.radius + player.radius) * (enemy2.radius + player.radius)) {
    //if enemy is touched they die if we have superfood
    if (enemy2.eatten) {
      enemies2.splice(index,1)
      console.log(enemy2.eatten)
    } else {
    // console.log('this should log a message when we touch an enemy', 'you lost')
    player.deathSound.play()
    button.style.display === "none"
    button.style.display = "inline"
    score.style.display= 'none'
    scoreElement.style.display = 'none'
    cancelAnimationFrame(gameAnimation)
    const lostScreen = lostLogo.style.display = 'inline'
    instructions.innerText= `Better luck next time! Final score of: ${score.innerText}`
    document.appendChild(instructions)
    }
  }
})
//this gives our pacman the chomping motion
  if      (player.movement.x > 0) player.rotation = 0 
  else if (player.movement.x < 0) player.rotation = Math.PI
  else if (player.movement.y > 0) player.rotation = Math.PI/2
  else if (player.movement.y < 0) player.rotation = Math.PI*1.5
}
//end of game loop
//title screen
//this will listen for a 'click' - once done,  our game will run
document.addEventListener('click', (event) => {
  setInterval(gameLoop(),6000)
  canvas.style.display = 'block'
  intro.innerText = ''
  startButton.style.display ='none'
  title.style.display= 'none'
  score.style.display= 'block'
  gametitle.style.display='none'
  scoreElement.style.display= 'block'
}, {once:true})

//add movement to player when key is pressed
document.addEventListener('DOMContentLoaded', (e) => {
  addEventListener('keydown', ({key}) => {
    // console.log('should log what key has been pressed via keyboard', key)
    switch (key.toLowerCase()) {
      case 'w' :
        player.movement.y = -5
          break
      case 'a' :
        player.movement.x = -5
          break
      case 's' :
        player.movement.y = 5
          break
        case 'd' :
        player.movement.x = 5
          break
    }
  })
  //this will stop our player/pacman when we released whatever key we pressed 
  addEventListener('keyup', ({key}) => {
    // console.log('should log what key has been pressed via keyboard', key)
    switch (key.toLowerCase()) {
      case 'w' :
      player.movement.y = 0
        break
      case 'a' :
      player.movement.x = 0
        break
      case 's' :
      player.movement.y = 0
        break
      case 'd' :
      player.movement.x = 0
        break
    }
  })
})
