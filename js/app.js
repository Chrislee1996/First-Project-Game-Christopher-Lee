const canvas = document.getElementById('canvas')
// we need to get the game's context, which will allows to specify where to put things and how big to make them
const ctx = canvas.getContext('2d')


//build our gameboard 
canvas.width = innerWidth
canvas.height =innerHeight 

class Board {
  constructor({position}) {
    this.position = position
    this.width = 60
    this.height = 60
  }
  render() {
    ctx.fillStyle = 'blue'
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

//add our points/food -since our food will be the same shape as our player , we can copy and paste it - change color/size
class Food {
  constructor({position}) {
    this.position = position
    this.radius = 10
  }
  render() {
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = 'white'
    ctx.fill()
    ctx.closePath()
  }
}

//0 = container
//1 = blank
//2 = food
const gameBoard = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,1,1,1,2,2,0,0,0,0,1,2,2,1,1,1,0],
  [0,1,2,2,0,0,0,0,0,0,0,0,0,0,1,2,1,0],
  [0,1,2,0,1,1,1,0,0,0,0,1,1,1,0,1,2,0],
  [0,1,2,1,1,2,2,1,0,0,1,1,2,2,1,1,2,0],
  [0,1,2,2,2,2,2,2,1,1,1,2,2,2,2,2,2,0],
  [0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
  [0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
  [0,1,2,2,2,2,0,0,0,0,0,0,1,2,2,2,2,0],
  [0,1,2,2,2,0,0,0,0,0,0,0,0,1,2,2,2,0],
  [0,1,2,2,2,1,0,0,0,0,0,0,1,1,2,2,2,0],
  [0,1,2,2,2,2,1,1,1,1,1,1,1,2,2,2,2,0],
  [0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]

const tiles =[]
const foods = []
gameBoard.forEach((row, index) => {
  row.forEach((number, j) => {
    switch (number) {
      case 0:
        tiles.push(new Board({
          position: {
            x: 60 * j,
            y: 60 * index
          }
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
  }

  render() {
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = 'yellow'
    ctx.fill()
    ctx.closePath()
  }
  update() {
    this.render()
    this.position.x += this.movement.x
    this.position.y += this.movement.y
  }

}


const player = new Player({
  position: {
    x:90,
    y:90
  } ,
  movement: {
    x:0,
    y:0
  }
})

//need to add moveset for our AI
const computerMovement = {
  up:0,
  down:1,
  left:2,
  right:3
}

//add our enemies - same constructors as our player but will have different color 
class Enemy {
  constructor({position,movement,color}) {
    this.position = position
    this.movement = movement
    this.radius = 20
    this.color = color
  }
  render() {
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = 'red'
    ctx.fill()
    ctx.closePath()
  }
  update() {
    this.render()
    this.position.x += this.movement.x
    this.position.y += this.movement.y
  }
}


const enemies = [
  new Enemy({
    position: {
      x:880,
      y:820
    },
    movement: {
      x:0,
      y:0
    }
  })
  ]

  const enemies2 = [
    new Enemy({
      position: {
        x:980,
        y:820
      },
      movement: {
        x:0,
        y:0
      },
    })
    ]
  







// the gameloop function will basically allow the game to be a game (controlling what happens/when, movement/spawning items)
const gameLoop = () => {
  
  requestAnimationFrame(gameLoop)
  ctx.clearRect(0,0, canvas.width, canvas.height)
tiles.forEach((tile) => {
  tile.render()

  if (player.position.y - player.radius + player.movement.y <= tile.position.y + tile.height 
    && player.position.x + player.radius + player.movement.x >= tile.position.x 
    && player.position.y + player.radius +player.movement.y>= tile.position.y 
    && player.position.x - player.radius + player.movement.x<= tile.position.x + tile.width) {
      console.log('this should log if we are touching a wall')
      player.movement.x = 0
      player.movement.y =0
    }

})



foods.forEach((food,index) => {
  food.render()
//remove food when we touch it 
  if (food.position.x - player.position.x + food.position.x - player.position.x,
    food.position.y - player.position.y +  food.position.y - player.position.y < food.radius + player.radius) {
      foods.splice(index,1)
      console.log('this will notify us that we are touching the food')
    }
})


player.update()

enemies.forEach(enemy=> {
  enemy.render()
})

enemies2.forEach(enemy=> {
  enemy.render()
})



}






//add playermovement

document.addEventListener('DOMContentLoaded', (e) => {
  gameLoop()
  addEventListener('keydown', ({key}) => {
    // console.log('should log what key has been pressed via keyboard', key)
    switch (key) {
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
    switch (key) {
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
