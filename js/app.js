const canvas = document.getElementById('canvas')
// we need to get the game's context, which will allows to specify where to put things and how big to make them
const ctx = canvas.getContext('2d')
const score = document.getElementById('score')
const button = document.getElementById('hidden')


//build our gameboard 
canvas.width = innerWidth
canvas.height =innerHeight 



class Board {
  constructor({position}) {
    this.position = position
    this.width = 60
    this.height = 60
  }
  render = function() {
    ctx.fillStyle = 'blue'
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

//add our points/food -since our food will be the same shape as our player , we can copy and paste it - change color/size
class Food {
  constructor({position}) {
    this.position = position
    this.radius = 5
  }
  render = function() {
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = 'white'
    ctx.fill()
    ctx.closePath()
  }
}
//create and set our  score var
let points = 0
const tiles =[]
const foods = []


//0 = container
//1 = blank
//2 = food
const gameBoard = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
  [0,1,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,0],
  [0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
  [0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
  [0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
  [0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
  [0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
  [0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
  [0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
  [0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]

gameBoard.forEach((row, index) => {
  row.forEach((number, j) => {
    switch (number) {
      case 0:
        tiles.push(new Board({
          position: {
            x: 60 * j,
            y: 60 * index
          },
        })
      )
        break
          case 2:
            foods.push(new Food({
              position: {
                x: 60 * j,
                y: 60 * index
              }
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
    this.radius = 20
    this.rad = .75
    this.mouth = .040
    this.collectSound = new Audio('sounds/collectSound.wav')
    this.deathSound = new Audio('sounds/deathSound.wav')
    this.winSound = new Audio('sounds/winSound.wav')
    this.bumpSound = new Audio('sounds/bump.wav')
  }
  render = function() {
    ctx.save()
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, this.rad, Math.PI * 2 - this.rad)
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

//need to add moveset for our AI
// let dx = 2
// let dy = 2

//add our enemies - same constructors as our player but will have different color 
class Enemy {
  constructor({position,color,movement}) {
    this.position = position
    this.radius = 20
    this.color = color
    this.movement = movement
  }
  render = function() {
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = 'red'
    ctx.fill()
    ctx.closePath()
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
  update = function() {
    this.render()
    this.position.x += this.movement.x
    this.position.y += this.movement.y
  }
}
//end of enemy class

const enemies = [
  new Enemy({
    position: {
      x:880,
      y:820
    },
    movement: {
      x: 0,
      y: 0
    }
  })
]

const enemies2 = [
  new Enemy({
    position: {
      x:200,
      y:800
    },
    movement: {
      x: 0,
      y:0
    },
  })
]


// the gameloop function will basically allow the game to be a game (controlling what happens/when, movement/spawning items)
const gameLoop = () => {
  let gameAnimation = requestAnimationFrame(gameLoop)
  ctx.clearRect(0,0, canvas.width, canvas.height)
  
  tiles.forEach((tile) => {
    tile.render()
      if (player.position.y - player.radius + player.movement.y <= tile.position.y + tile.height 
      && player.position.x + player.radius + player.movement.x >= tile.position.x 
      && player.position.y + player.radius +player.movement.y>= tile.position.y 
      && player.position.x - player.radius + player.movement.x<= tile.position.x + tile.width) {
      // console.log('this should log if we are touching a wall')
        player.bumpSound.play()
        player.movement.x = 0
        player.movement.y =0
      }
  })

foods.forEach((food,index) => {
  food.render()
    //remove food when we touch it 
    if (((food.position.x - player.position.x)*(food.position.x - player.position.x )) + (( food.position.y - player.position.y)*( food.position.y - player.position.y)) < 
    (food.radius + player.radius) * (food.radius + player.radius)) {
      foods.splice(index, 1)
      player.collectSound.play()
      // console.log('this will notify us that we are touching the food')
      points +=5
      score.innerText = points
      // win condition
      // console.log('should log win message when everything is collected', 'you win')
       if (foods.length === 0) {
         player.winSound.play()
          button.style.display === "none"
          button.style.display = "inline"
       cancelAnimationFrame(gameAnimation)
       alert(`You Won!, Final score of ${score.innerText}`)
         } 
      //populates button to play game again
    }
})

//spawn our player
player.update() 
  
//spawns our enemies
enemies.forEach(enemy=> {
  enemy.update()
  //this will notify AI that they are touching a wall 
   tiles.forEach((tile) => {
    tile.render()
    if (enemy.position.y - enemy.radius + enemy.movement.y <= tile.position.y + tile.height 
      && enemy.position.x + enemy.radius + enemy.movement.x >= tile.position.x 
      && enemy.position.y + enemy.radius +enemy.movement.y>= tile.position.y 
      && enemy.position.x - enemy.radius + enemy.movement.x<= tile.position.x + tile.width) {
        //  console.log('this should log if the AI touches a wall')
        enemy.movement.x = 0
        enemy.movement.y = 0
      }
  })
  if (((enemy.position.x - player.position.x)*(enemy.position.x - player.position.x )) + (( enemy.position.y - player.position.y)*( enemy.position.y - player.position.y)) < 
  (enemy.radius + player.radius) * (enemy.radius + player.radius)) {
    // console.log('this should log a message when we touch an enemy','you lost'
    button.style.display === "none"
    button.style.display = "inline"
    player.deathSound.play()
    cancelAnimationFrame(gameAnimation)
    alert(`Oh no, you died!, Final score of ${score.innerText}`)
  }
})


enemies2.forEach(enemy2=> {
  enemy2.update()
  //this will notify AI that they are touching a wall 
  tiles.forEach((tile) => {
    tile.render()
    if (enemy2.position.y - enemy2.radius + enemy2.movement.y <= tile.position.y + tile.height 
      && enemy2.position.x + enemy2.radius + enemy2.movement.x >= tile.position.x 
      && enemy2.position.y + enemy2.radius +enemy2.movement.y>= tile.position.y 
      && enemy2.position.x - enemy2.radius + enemy2.movement.x<= tile.position.x + tile.width) {
        // console.log('this should log if the AI touches a wall')
        enemy2.movement.x = 0
        enemy2.movement.y = 0
     }
  })
  if (((enemy2.position.x - player.position.x)*(enemy2.position.x - player.position.x )) + (( enemy2.position.y - player.position.y)*( enemy2.position.y - player.position.y)) < 
  (enemy2.radius + player.radius) * (enemy2.radius + player.radius)) {
    // console.log('this should log a message when we touch an enemy', 'you lost')
    button.style.display === "none"
    button.style.display = "inline"
    player.deathSound.play()
    cancelAnimationFrame(gameAnimation)
    alert(`Oh no, you died!, Final score of ${score.innerText}`)
  }
})


}
//end of game loop





document.addEventListener('DOMContentLoaded', (e) => {
  gameLoop()
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