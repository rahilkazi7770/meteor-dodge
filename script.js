const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let gameRunning = false
let score = 0
let gameOver = false
let speed = 3

const player = {
x:canvas.width/2,
y:canvas.height-120,
width:50,
height:50,
speed:7
}

let meteors=[]
let stars=[]
let particles=[]

function startGame(){
document.getElementById("menu").style.display="none"
gameRunning=true
update()
}

function spawnMeteor(){

meteors.push({
x:Math.random()*canvas.width,
y:-50,
size:40+Math.random()*30
})

}

function spawnStar(){

stars.push({
x:Math.random()*canvas.width,
y:-20,
size:12
})

}

function createParticles(x,y){

for(let i=0;i<10;i++){
particles.push({
x:x,
y:y,
vx:Math.random()*4-2,
vy:Math.random()*4-2,
life:30
})
}

}

function updatePlayer(){

if(keys["ArrowLeft"]) player.x-=player.speed
if(keys["ArrowRight"]) player.x+=player.speed

if(player.x<0) player.x=0
if(player.x+player.width>canvas.width) player.x=canvas.width-player.width

}

function updateMeteors(){

meteors.forEach(m=>{
m.y+=speed

if(
player.x < m.x+m.size &&
player.x+player.width > m.x &&
player.y < m.y+m.size &&
player.y+player.height > m.y
){
gameOver=true
createParticles(player.x,player.y)
}

})

meteors=meteors.filter(m=>m.y<canvas.height+50)

}

function updateStars(){

stars.forEach(s=>{

s.y+=speed

if(
player.x < s.x+s.size &&
player.x+player.width > s.x &&
player.y < s.y+s.size &&
player.y+player.height > s.y
){
score+=100
s.collected=true
createParticles(s.x,s.y)
}

})

stars=stars.filter(s=>!s.collected && s.y<canvas.height)

}

function updateParticles(){

particles.forEach(p=>{
p.x+=p.vx
p.y+=p.vy
p.life--
})

particles=particles.filter(p=>p.life>0)

}

function drawPlayer(){

ctx.fillStyle="#00ffff"
ctx.fillRect(player.x,player.y,player.width,player.height)

}

function drawMeteors(){

ctx.fillStyle="orange"

meteors.forEach(m=>{
ctx.beginPath()
ctx.arc(m.x,m.y,m.size,0,Math.PI*2)
ctx.fill()
})

}

function drawStars(){

ctx.fillStyle="yellow"

stars.forEach(s=>{
ctx.beginPath()
ctx.arc(s.x,s.y,s.size,0,Math.PI*2)
ctx.fill()
})

}

function drawParticles(){

ctx.fillStyle="white"

particles.forEach(p=>{
ctx.fillRect(p.x,p.y,3,3)
})

}

function drawScore(){

ctx.fillStyle="white"
ctx.font="24px Arial"

ctx.fillText("Score: "+score,30,40)

}

function update(){

if(!gameRunning) return

if(gameOver){

ctx.fillStyle="white"
ctx.font="50px Arial"
ctx.fillText("Game Over",canvas.width/2-140,canvas.height/2)

ctx.font="24px Arial"
ctx.fillText("Refresh to Restart",canvas.width/2-110,canvas.height/2+40)

return

}

ctx.clearRect(0,0,canvas.width,canvas.height)

updatePlayer()
updateMeteors()
updateStars()
updateParticles()

drawPlayer()
drawMeteors()
drawStars()
drawParticles()
drawScore()

score++
speed+=0.002

requestAnimationFrame(update)

}

setInterval(spawnMeteor,900)
setInterval(spawnStar,2000)

let keys={}

document.addEventListener("keydown",e=>{
keys[e.key]=true
})

document.addEventListener("keyup",e=>{
keys[e.key]=false
})