const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let gameRunning=false
let score=0
let highScore=0
let speed=3

let stars=[]
let asteroids=[]
let particles=[]

const player={
x:canvas.width/2,
y:canvas.height-120,
size:25,
speed:7
}

let keys={}

function startGame(){
document.getElementById("menu").style.display="none"
resetGame()
gameRunning=true
update()
}

function restartGame(){
document.getElementById("gameOver").style.display="none"
resetGame()
gameRunning=true
update()
}

function resetGame(){
score=0
speed=3
asteroids=[]
particles=[]
player.x=canvas.width/2
player.y=canvas.height-120
}

function createStars(){
for(let i=0;i<120;i++){
stars.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*2
})
}
}

createStars()

function spawnAsteroid(){

asteroids.push({
x:Math.random()*canvas.width,
y:-40,
size:30+Math.random()*30
})

}

function explode(x,y){

for(let i=0;i<20;i++){
particles.push({
x:x,
y:y,
vx:Math.random()*6-3,
vy:Math.random()*6-3,
life:40
})
}

}

function updatePlayer(){

if(keys["ArrowLeft"]) player.x-=player.speed
if(keys["ArrowRight"]) player.x+=player.speed

if(player.x<20) player.x=20
if(player.x>canvas.width-20) player.x=canvas.width-20

}

function updateAsteroids(){

asteroids.forEach(a=>{

a.y+=speed

if(
player.x < a.x+a.size &&
player.x > a.x-a.size &&
player.y < a.y+a.size &&
player.y > a.y-a.size
){
explode(player.x,player.y)
endGame()
}

})

asteroids=asteroids.filter(a=>a.y<canvas.height+60)

}

function updateParticles(){

particles.forEach(p=>{
p.x+=p.vx
p.y+=p.vy
p.life--
})

particles=particles.filter(p=>p.life>0)

}

function drawStars(){

ctx.fillStyle="white"

stars.forEach(s=>{

s.y+=0.3

if(s.y>canvas.height) s.y=0

ctx.fillRect(s.x,s.y,s.size,s.size)

})

}

function drawPlayer(){

ctx.fillStyle="#00ffff"

ctx.beginPath()
ctx.moveTo(player.x,player.y)
ctx.lineTo(player.x-15,player.y+30)
ctx.lineTo(player.x+15,player.y+30)
ctx.closePath()
ctx.fill()

}

function drawAsteroids(){

ctx.fillStyle="#888"

asteroids.forEach(a=>{

ctx.beginPath()

for(let i=0;i<7;i++){

let angle=(i/7)*Math.PI*2
let radius=a.size+(Math.random()*6-3)

let x=a.x+Math.cos(angle)*radius
let y=a.y+Math.sin(angle)*radius

if(i===0) ctx.moveTo(x,y)
else ctx.lineTo(x,y)

}

ctx.closePath()
ctx.fill()

})

}

function drawParticles(){

ctx.fillStyle="orange"

particles.forEach(p=>{
ctx.fillRect(p.x,p.y,3,3)
})

}

function drawScore(){

ctx.fillStyle="white"
ctx.font="22px Arial"
ctx.fillText("Score: "+score,30,40)
ctx.fillText("High Score: "+highScore,30,70)

}

function endGame(){

gameRunning=false

if(score>highScore) highScore=score

document.getElementById("finalScore").innerText="Score: "+score
document.getElementById("gameOver").style.display="block"

}

function update(){

if(!gameRunning) return

ctx.fillStyle="black"
ctx.fillRect(0,0,canvas.width,canvas.height)

drawStars()

updatePlayer()
updateAsteroids()
updateParticles()

drawAsteroids()
drawParticles()
drawPlayer()
drawScore()

score++
speed+=0.002

requestAnimationFrame(update)

}

setInterval(spawnAsteroid,900)

document.addEventListener("keydown",e=>{
keys[e.key]=true
})

document.addEventListener("keyup",e=>{
keys[e.key]=false
})