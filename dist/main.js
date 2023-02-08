/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/HUD.js":
/*!********************!*\
  !*** ./src/HUD.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HUD)
/* harmony export */ });
class HUD{
    constructor(game){
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.width =  150;
        this.height = 75; 
        this.x = 0; 
        this.y = 0; 
        this.padding = 20; 
        this.font = "16px arial";
    }

    displayHUD(ctx, game){
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.lineWidth = "5"; 
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, this.height, 2);
        ctx.stroke();
        ctx.fill();
        
        ctx.textAlign = 'left'; 
        ctx.fillStyle ='black';
        ctx.font = this.font;

        this.lives = "Lives: " + game.player.health; 
        this.money = "Mesos: " + game.player.money;
        this.stage = "Wave: " + game.level + '-' + game.wave; 
        this.text = [this.lives, this.money, this.stage]; 
        
        for (let i=0; i<this.text.length; i++){
            ctx.fillText(this.text[i], this.x+this.padding, this.y+this.padding*(1+i), this.width); 
        }
    }


}

/***/ }),

/***/ "./src/SpriteAnimation.js":
/*!********************************!*\
  !*** ./src/SpriteAnimation.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SpriteAnimation)
/* harmony export */ });
/* harmony import */ var _img__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./img */ "./src/img.js");


class SpriteAnimation{
    images = [];
    constructor(fileName, numberOfImages, timerCount, state, stop){
        for (let i = 0; i<=numberOfImages; i++){ // loads images into array 
            const image = (0,_img__WEBPACK_IMPORTED_MODULE_0__["default"])(fileName.replace("?", i)); 
            this.images.push(image); 
        }

        this.timerCount = timerCount;
        this.timerCountDefault = this.timerCount; 
        this.imageIndex = 0; 
        this.state = state; 
        this.stop = stop; 
    }
    
    isFor(state){
        return this.state === state; 
    }

    reset(){ // loop animation
        this.imageIndex = 0;   
    }

    getFrame(){
        return this.imageIndex; 
    }

    getImage(pause){  //returns frame
        this.setImageIndex(pause); 
        return this.images[this.imageIndex]; 
    }

    setImageIndex(pause){
        this.timerCount--;
        if (this.timerCount <= 0 && !this.shouldStop()){
            this.timerCount= this.timerCountDefault; 
            if (!pause) {this.imageIndex++;} //animate only when unpaused
            if (this.imageIndex >= this.images.length){
                this.imageIndex = 0; 
            }
        }
    }

    shouldStop(){
        return this.stop  && this.imageIndex === this.images.length-1
    }
}


/***/ }),

/***/ "./src/endScreen.js":
/*!**************************!*\
  !*** ./src/endScreen.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ endScreen)
/* harmony export */ });
class endScreen{
    constructor(game){
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.width =  600;
        this.height = 200; // game.gameHeight - 3*90; 
        this.x = (game.gameWidth-this.width)/2; 
        this.y = 3;//(this.height)
        this.padding = 25; 
        this.font = "16px arial";
        this.font2 = "24px arial";
        this.display = true; 
        this.button1 = document.createElement('button');
        this.button1.textContent = 'Return to Main';
        this.buttonX1 = this.gameWidth/2;
        this.buttonWidth = 250;
        this.buttonHeight = 30; 
        
        
        this.stats1 = [];
        this.stats2 = [];
        this.statPosition = this.x; //starting x 
        this.statHeight = 20;
        this.statWidth = 200;

        this.buttonPositions = [ [this.x+(this.width-this.buttonWidth)/2, this.height-this.buttonHeight-this.padding]] 
        this.buttonsList = [this.button1]
        }

        initialize(game){
            const canvas = document.getElementById('gameScreen');
            var elem = this;
            canvas.addEventListener('click', function(e){elem.handleClick(e, game) }, false);            
        }

        redraw(ctx){
            for (let i = 0; i<this.buttonsList.length; i++){
              this.drawButton(this.buttonsList[i], this.buttonPositions[i][0], this.buttonPositions[i][1], ctx)
            }
        }

        startFunctions(game){
            game.nextWave = true; 
            this.display = false; 
        }

        handleClick(e, game){
            const canvas = document.getElementById('gameScreen');
            let ctx = canvas.getContext('2d'); 
            const x = e.clientX - canvas.offsetLeft;
            const y = e.clientY - canvas.offsetTop;
            
            for (let i = 0; i<this.buttonsList.length; i++){
               // this.drawButton(this.buttonsList[i], this.buttonPositions[i][0], this.buttonPositions[i][1], ctx)
                if (this.display && ctx.isPointInPath(x,y)) { //button click (only when displayed)
                    if (game.gameOver){
                        this.display = false; 
                        game.fadeOut = true;
                        setTimeout(()=> {game.titleDisplay = true}, "2000")} // fade out transition }
                    else {game.levelFinish = true;}
                }
            }      
        }


        drawButton(e1, x, y, ctx){   
            ctx.fillStyle = 'steelblue'; //draw border
            ctx.beginPath(); //sets area for collision (isPointInPath)
            ctx.roundRect(x,y,this.buttonWidth, this.buttonHeight, 2);
            ctx.stroke();
            ctx.fill();

            ctx.font = this.font2; //draw text 
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'white';
            ctx.fillText(e1.textContent, x+this.buttonWidth/2, y+this.buttonHeight/2); 
        }

        loadStats(game){
            this.stats1 = [[ 'Monsters Defeated: '+ game.monsterKill],
                    ['Monsters Escaped: '+ game.monsterEscape],
                        ['Mesos Collected: '+ game.moneyCollected],['Mesos Lost: '+ game.moneyLost]
                    ];
            
            this.stats2 = []
            for (const obj of game.playerObjects){
                let statsObj = ''
                if (obj.type == 'greenDragon'){ //add poison
                    statsObj =  [obj.name+' Damage: '+ obj.damageDealt.toFixed(0) + " (+"+ game.poisonDamage.toFixed(0)+ ')']; }
                else if (obj.type == 'redDragon' || obj.type == 'blackDragon'){ //explode damage 
                    statsObj =  [obj.name+' Damage: '+ obj.damageDealt.toFixed(0) + " (+"+ obj.explodeDamageDealt.toFixed(0)+ ')']; }
                else {statsObj =  [obj.name+' Damage: '+ obj.damageDealt.toFixed(0)]; }
                this.stats2.push(statsObj); 
            }
        }
     

        displayMenu(ctx, game){ //upgrade window background
            if (this.display){
                ctx.fillStyle = "white";
                ctx.strokeStyle = "black";
                ctx.lineWidth = "5"; 
                ctx.beginPath();
                ctx.roundRect(this.x, this.y, this.width, this.height, 2);
                ctx.stroke();
                ctx.fill();

               
                if (game.gameOver){
                        ctx.fillStyle = 'red';
                        ctx.font = this.font2; 
                        ctx.textAlign = 'center';
                        ctx.fillText('Game Over!', this.gameWidth/2, 25);
                        this.redraw(ctx); //return to main button 
                    }
                else {
                    if (game.waveFinish){
                        let text1='';
                        let text2='';
                        if (game.level == game.finalLevel && game.levelList.length == 0){ //final level
                            text1= 'Final Level Clear!'         
                            text2= 'Thanks for playing'
                            this.redraw(ctx);} //return to main button 
                        else{
                            if (game.levelList.length == 0){
                                text1='Level ' +game.level+ ' Clear!';
                            }
                            else { text1='Wave Clear!';}
                            text2 = 'Press [A] to open shop or [D] to start next wave';
                        }
                        ctx.fillStyle = 'black';
                        ctx.font = this.font2; 
                        ctx.textAlign = 'center'; 
                        ctx.fillText(text1, this.gameWidth/2, 25)
        
                        ctx.font = this.font2; 
                        ctx.textAlign = 'center'; 
                        ctx.fillStyle = 'blue';
                        ctx.fillText(text2, this.gameWidth/2, this.height-10)//
                    }
                }

            


                ctx.textAlign = 'start'; //stats 
                ctx.font = this.font;
                ctx.fillStyle = 'black';
                this.loadStats(game);
                for (let i=0; i<this.stats1.length; i++){
                    for (let j=0; j<this.stats1[i].length; j++){
                        ctx.fillText(this.stats1[i][j], this.padding+this.statPosition+(this.statWidth/4)*j,
                            25+ this.padding+(this.statHeight)*i, 300 ); 
                        }
                    }    
                for (let i=0; i<this.stats2.length; i++){
                    for (let j=0; j<this.stats2[i].length; j++){
                        ctx.fillText(this.stats2[i][j], this.padding+this.statPosition+this.statWidth*1.5,
                            25+ this.padding+(this.statHeight)*i, 300 ); 
                        }
                    }    
            }; 
            
                
    }
}


/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input */ "./src/input.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _mob__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mob */ "./src/mob.js");
/* harmony import */ var _upgrade__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./upgrade */ "./src/upgrade.js");
/* harmony import */ var _money__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./money */ "./src/money.js");
/* harmony import */ var _startScreen__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./startScreen */ "./src/startScreen.js");
/* harmony import */ var _titleScreen__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./titleScreen */ "./src/titleScreen.js");
/* harmony import */ var _restartScreen__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./restartScreen */ "./src/restartScreen.js");
/* harmony import */ var _endScreen__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./endScreen */ "./src/endScreen.js");
/* harmony import */ var _HUD__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./HUD */ "./src/HUD.js");
/* harmony import */ var _img__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./img */ "./src/img.js");
 
 

 
 
 
 
 
 
 


class Game{
    constructor(gameWidth, gameHeight){
        this.note = true;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.title = new _titleScreen__WEBPACK_IMPORTED_MODULE_6__["default"](this); 
        this.title.initialize(this);
        this.end = new _endScreen__WEBPACK_IMPORTED_MODULE_8__["default"](this); 
        this.end.initialize(this);
        this.restart = new _restartScreen__WEBPACK_IMPORTED_MODULE_7__["default"](this); 
        this.restart.initialize(this);
        this.gameOver = false; 
        this.restartWindow = false;
        this.titleDisplay = true;//false; //enable for release
        this.load = false;
        this.playerObjects =[];
        this.mobObjects =[]; 
        this.moneyObjects = []; 
        this.level = 1;
        this.finalLevel =3 ; 
        this.wave = 0; 
        this.lane = 1; 
        this.bgSky = (0,_img__WEBPACK_IMPORTED_MODULE_10__["default"])('bg/bgSky'+this.level+'.png');
        this.bgStage = (0,_img__WEBPACK_IMPORTED_MODULE_10__["default"])('bg/bgStage'+this.level+'.png');
        this.waveStart = false;
        this.waveInfo = __webpack_require__(/*! ./waveInfo.json */ "./src/waveInfo.json");
        this.waveNotes = __webpack_require__(/*! ./waveNotes.json */ "./src/waveNotes.json");
        this.levelNote = ''; 
        this.levelList = [...this.waveInfo['level'+this.level]];//{1: ['wave1-5', 'wave1-1']} //JSON
        this.waveList = [];
        this.toLoad =[]; 
        this.rowHeight = 90; //lane size
        this.nextWave = false; 
        this.levelStart = false;
        this.waveFinish = true; 
        this.levelFinish = false ; //close stats menu
        
        this.firstLoad = 0; 
        this.noteTime = 0; 
        this.gameTime = 0; //played game time for events; 
        this.gameTimeReal = 0; //tracks time against pauses 
        this.pausedTime = 0; 
        this.timeOffset = 0
        this.timeOffsetSum = 0; 
        this.setPoint = false; 

        this.fade = 0;
        this.fadeIn = false;
        this.fadeOut = false ;
        this.storage = []; 
        this.error = false; 
        this.mobCount = 0 ; 

        this.poisonDamage = 0; 
        this.monsterKill = 0; 
        this.monsterEscape = 0;
        this.damageDealt = {}; 
        this.moneyCollected = 0;
        this.moneyLost = 0; 
        this.pause = false; 
        this.recallStorage=false;

    }

    pauseHandler(time, ctx){

        if (this.pause ){ //snaps when time is paused; 
            if (!this.setPoint){
                this.pausedTime = time;
                this.setPoint = true; 
            }
            else {this.timeOffset = time - this.pausedTime} //runs up offset value 
        }
        else 
            {
            this.upgrade.display = false ;
            this.timeOffsetSum+= this.timeOffset; //sum of offset values 
            this.timeOffset = 0;  //reset 
            this.gameTimeReal = time -this.timeOffsetSum; //apply offset sum
            this.setPoint = false;        
        }

        if (this.pause){
            ctx.globalAlpha = 0.6
            ctx.fillStyle = "black";
            ctx.fillRect(0,0,this.gameWidth, this.gameHeight); 
            ctx.globalAlpha = 1;

            if (!this.upgrade.display){
                ctx.font = "16px arial"; 
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center'; 
                ctx.fillText('Press ESC to unpause', this.gameWidth/2, this.gameHeight/2+20) 
            }
        }
    }

    togglePause(){   
        this.pause = !this.pause; 
    }

    resetEverything(){
        this.gameOver = false; 
        this.restartWindow = false;
        this.titleDisplay = false; //enable for release
        this.moneyObjects = []; 
        this.wave = 0; 
        this.bgSky = (0,_img__WEBPACK_IMPORTED_MODULE_10__["default"])('bg/bgSky'+this.level+'.png');
        this.bgStage = (0,_img__WEBPACK_IMPORTED_MODULE_10__["default"])('bg/bgStage'+this.level+'.png');
        this.waveStart = false;
        this.waveInfo = __webpack_require__(/*! ./waveInfo.json */ "./src/waveInfo.json");
        this.levelList = [...this.waveInfo['level'+this.level]];//{1: ['wave1-5', 'wave1-1']} //JSON

        this.waveList = [];
        this.toLoad =[]; 
        this.nextWave = false; 
        this.waveFinish = true; 
        this.levelFinish = false ; //close stats menu
        //this.gameTime = 0; 
        this.storage = []; 
        this.poisonDamage = 0; 
        this.monsterKill = 0; 
        this.monsterEscape = 0;
        this.damageDealt = {}; 
        this.moneyCollected = 0;
        this.moneyLost = 0; 
        this.recallStorage=false;
        this.loadBG();
        this.playerObjects = [this.player];
    }
    
    titleMenu(ctx){ 

        this.title.displayMenu(ctx, this); 
    }

    waveClear(ctx){ // checks if wave is cleared
        if (!this.nextWave && this.waveStart && this.levelStart && 
            this.toLoad.length == 0  && this.mobObjects.length==0 ){
            this.waveFinish = true; 
            this.end.display = true;
            this.end.displayMenu(ctx, this);
        } 
    }
    nextLevelLoader(ctx){
        if (this.levelList.length == 0 && this.waveFinish){
            if (this.levelFinish){
                if (this.level==this.finalLevel){ 
                    this.gameOver = true; 
                }
                else {
                this.waveStart = false;
                this.waveFinish = false; 
                setTimeout(()=> {
                    this.fadeOut = true}, "2000") // fade out transition
                setTimeout(()=> { //load next content
                    this.level++;
                    this.levelList = [...this.waveInfo['level'+this.level]]; // load next level waves
                    this.levelFinish = false;
                    this.wave = 0;                 
                    this.bgSky = (0,_img__WEBPACK_IMPORTED_MODULE_10__["default"])('bg/bgSky'+this.level+'.png'); //reload BG art 
                    this.bgStage = (0,_img__WEBPACK_IMPORTED_MODULE_10__["default"])('bg/bgStage'+this.level+'.png');
                    this.moneyObjects = []; //clear floor money 
                    this.waveStart = false; 
                    this.waveFinish = true;
                    this.nextWave  = false 
                    
                    this.player.left = false;
                    this.player.lane = 1;
                    this.player.position = {x:25, y:this.gameHeight - 45 - 2*this.player.rowHeight};
                    this.player.floor = this.gameHeight - 45 - (1+this.player.lane)*this.player.rowHeight;
                    this.storage = this.playerObjects.splice(1);  //pulls everything expect player
                }, "4000"); 
            }
        }

        }
    }

    nextWaveLoader(){
        if (this.nextWave){ //load next wave data from JSON
            if (this.levelList.length>0){
                this.waveList = [...this.waveInfo[this.levelList.shift()]]; //
                this.gameTime = this.gameTimeReal; //start of wave;
                this.waveStart = false; 
                this.wave ++; 
                this.nextWave = false; 
                this.upgrade.display = false;
                this.waveFinish = false; 


                if (this.waveNotes['wave'+this.level+'-'+this.wave]){
                    this.levelNote = this.waveNotes['wave'+this.level+'-'+this.wave];
                    this.noteTime = this.gameTimeReal; 
                }
            }
            else this.levelFinish = true;
        }
    }

    screenTransition(ctx){
        if (this.fadeIn){ //fade in 
            if (this.fade>0){
                this.fade -= 0.03; 
                if (this.fade <= 0) {this.fadeIn = false;}
            } 
        }
        if (this.fadeOut){ //fade to black
            if (this.fade < 1){    
                this.fade += 0.03; 
                if (this.fade >= 1) { 
                    setTimeout(()=> {
                        this.fadeIn = true;
                        this.fadeOut = false;}, "1500")}
            } 
        }
        if (this.fadeIn || this.fadeOut){
            ctx.fillStyle = "black";
            ctx.globalAlpha = this.fade; 
            ctx.fillRect(0, 0, this.gameWidth, this.gameHeight); 
            ctx.globalAlpha = 1;
        }

    }
    waveLoader(){//loadds each mob from waveList
        if (this.toLoad.length == 0 && this.waveList.length>0) {this.toLoad = this.waveList.shift();}
        if (this.toLoad[2] <=  (this.gameTimeReal - this.gameTime)/1000 ){
            this.waveStart = true; 
            this.levelStart = true;
            if (this.toLoad[1].length>0){ //multiple entries 
                for (let i=0; i<this.toLoad[1].length; i++){
                    this.lane = this.toLoad[1][i]; //sets lane to load
                    this.createMob(this, this.toLoad[0], 1);
                    this.mobCount ++; }
                }
            
            else{
                this.lane = this.toLoad[1]-1; //sets lane to load
                this.createMob(this, this.toLoad[0], 1);
                this.mobCount ++; }           
            this.toLoad = []; 
        } 

    }    
    
    addElement(element){ //upgrade shop 
       if (this.player.elementList.length<5){
            if (this.player.money> this.player.elementCost[this.player.elementList.length]){
                this.player.money -= this.player.elementCost[this.player.elementList.length];
                this.player.elementList.push(element); 
                this.player.elementals(); //load sprites
                //apply upgrades
                if (element == 'Blaze'){this.player.damageMulti+=0.4 }
                if (element =="Dawn"){this.player.lootMulti+=0.5; this.player.damageMulti+=0.2 };
                if (element =='Night'){this.player.knockbackMulti+=0.2; this.player.damageMulti+=0.2};
                if (element =='Wind'){this.player.speedMulti+=0.2};
                if (element =='Thunder'){this.player.pierce+=1;this.player.damageMulti+=0.2 };
                
            }
       }
    }

    resummon(type){
        let transfer = this.storage.findIndex(obj=>obj.type === type); 
        this.storage[transfer].position.x = (this.player.curTile*80)+this.player.width/2;
        this.storage[transfer].position.y = (this.player.floor+30); 
        this.storage[transfer].lane = this.player.lane;

        this.playerObjects.push(this.storage[transfer]); //copies object to list
        this.storage.splice(transfer); //deletes object from storage
    }
    recallCheck(){
        if (!this.recallStorage  && this.storage[0]){
            this.recallStorage = this.storage.shift() ;
        }
    }
    recall(){        
        if (!this.recallStorage){
            this.recallStorage = this.playerObjects.find(obj=> (obj.position.y-30 === this.player.floor)&&  //checks for existing unit 
            (obj.position.x === (this.player.curTile*80)+this.player.width/2) && (obj.name!=='Wiz' ))

            if (this.recallStorage)
            {
                let type = this.recallStorage.type;
                this.playerObjects = this.playerObjects.filter(  
                    function (object){return object.type != type; });    
            }
        }
        else {
            if (!this.playerObjects.find(obj=> (obj.position.y-30 === this.player.floor) &&  //checks for existing unit 
            (obj.position.x === (this.player.curTile*80)+this.player.width/2) && (obj.name!=='Wiz'))){
                    
                this.recallStorage.position.x = (this.player.curTile*80)+this.player.width/2;
                this.recallStorage.position.y = (this.player.floor+30); 
                this.recallStorage.left = (this.player.left); 
                this.recallStorage.lane = (this.player.lane); 

                this.playerObjects.push(this.recallStorage);
                this.recallStorage = false;
            }
        }
        

        // if (!this.recallStorage){
        //     this.recallStorage = this.playerObjects.find(obj=> (obj.position.y-30 === this.player.floor)&&  //checks for existing unit 
        //     (obj.position.x === (this.player.curTile*80)+this.player.width/2) && (obj.name!=='Wiz' ))

        //     if (this.recallStorage)
        //     {
        //         let type = this.recallStorage.type;
        //         this.playerObjects = this.playerObjects.filter(  //removes looted coins
        //             function (object){return object.type != type; });    
        //     }
        // }
        // else {
        //     this.recallStorage.position.x = (this.player.curTile*80)+this.player.width/2;
        //     this.recallStorage.position.y = (this.player.floor+30); 

        //     this.playerObjects.push(this.recallStorage);
        //     this.recallStorage = false;
        // }


    }

    createMob(parent, type, side, game = null ){
        if (side === 0){ //Summon unit
            if (!this.playerObjects.find(obj=> (obj.position.y-30 === this.player.floor) &&  //checks for existing unit 
            (obj.position.x === (this.player.curTile*80)+this.player.width/2) && (obj.name!=='Wiz'))){
                
                let cost = 1000; 
                if (this.player.summonCost[this.player.summonCount]){ 
                    cost = this.player.summonCost[this.player.summonCount]; 
                    if (this.player.money>=cost){
                        this.playerObjects.push(new _mob__WEBPACK_IMPORTED_MODULE_2__["default"](parent, type, 0)) 
                        this.player.money -= cost; 
                        this.player.summonCount ++; 
                    }
                }
                }
            else if (game){game.error = true; }; 

        } else {this.mobObjects.push(new _mob__WEBPACK_IMPORTED_MODULE_2__["default"](parent, type, 1))}
        
    }

    loadBG(){
        this.bgSky = (0,_img__WEBPACK_IMPORTED_MODULE_10__["default"])('bg/bgSky'+this.level+'.png'); //load sky bg
    }

    start(){
        this.startMenu = new _startScreen__WEBPACK_IMPORTED_MODULE_5__["default"](this);
        this.startMenu.initialize(this); 
        this.upgrade = new _upgrade__WEBPACK_IMPORTED_MODULE_3__["default"](this); 
        this.upgrade.initialize(this); 
        this.HUDMenu = new _HUD__WEBPACK_IMPORTED_MODULE_9__["default"](this); 
        this.player = new _player__WEBPACK_IMPORTED_MODULE_1__["default"](this);
        this.playerObjects = [this.player];
        this.inputHandler = new _input__WEBPACK_IMPORTED_MODULE_0__["default"](this.player, this.upgrade, this);        

        // this.playerObjects.push(new Mob(this.player, 'redDragon', 0,4,5)); 
        // this.playerObjects.push(new Mob(this.player, 'blueDragon', 0,2,5)); 
        // this.playerObjects.push(new Mob(this.player, 'greenDragon', 0,3,5)); 
        // this.playerObjects.push(new Mob(this.player, 'blackDragon', 0,1,5)); 

    }



    draw(ctx){ //runs draw function for object list 

        ctx.drawImage(this.bgSky, 0, 0); 
        ctx.drawImage(this.bgStage, 0, 0); 
        this.startMenu.displayMenu(ctx, this );
        
        this.playerObjects.forEach( (object)=>object.emote(this)); 
        this.playerObjects.forEach( (object)=>object.draw(ctx,this.pause) )
        this.mobObjects.forEach( (object)=>object.draw(ctx, this.pause) );
        this.moneyObjects.forEach( (object)=>object.draw(ctx,this.pause) ); 
        this.playerObjects.forEach( (object)=>object.drawProj(ctx,this.pause) ); //player proj
        this.mobObjects.forEach( (object)=>object.drawProj(ctx, this.pause) ); //mob proj 


        this.player.recallIcon(ctx, this);
    
    } 

    knockback(obj, direction, multi){
        if (obj.name =='Wiz'){ //only player pops up
            obj.jump = true;
            obj.invulnTime = 110; 
            obj.speedY += 4;
            obj.knockbackForce= -8*direction; }
        else{
            obj.hit = true; 
            obj.knockbackTime = this.gameTimeReal;  //stores when target knockback;
            if (obj.boss){-2*direction*(1+ (multi-1)/4)} //boss less knockback
            else {obj.knockbackForce = -4*direction*(1+ (multi-1)/4)}; //add as stat
            
        }
    }
    aggro(obj1, obj2){ // checks if obj1 range is within obj2
        for (const target of obj2){
            if (target.health>0){
                
                if (obj1.hitbox[0]+obj1.hitbox[2]+obj1.range>target.hitbox[0] || 
                    obj1.hitbox[0]-obj1.range<target.hitbox[0]+target.hitbox[2]){ //aggro from right
                        if (obj1.aggro && obj1.side == 1 && obj1.position.x+150<this.gameWidth){obj1.attack()} //enemies attack on CD
                        else if (obj1.hitbox[1]<target.hitbox[1] && obj1.hitbox[1]+obj1.hitbox[3]>target.hitbox[1] &&  obj1.side == 0 ){
                            obj1.attack()
                            }
                        }
                }

            }
    }
    
    lootMoney(obj1, obj2){
        for (const target of obj2){ //-(this.width*(-1+this.lootMulti))
            if ( (obj1.hitbox[0]<target.hitbox[0] && obj1.hitbox[0]+80*(obj1.lootMulti) > target.hitbox[0]) || //obj1 on left
                (obj1.hitbox[0] > target.hitbox[0]+target.hitbox[2] && obj1.hitbox[0]-80*(obj1.lootMulti-1)<target.hitbox[0]+target.hitbox[2] )){ //obj1 on right
                if (obj1.hitbox[1]<target.hitbox[1] && obj1.hitbox[1]+obj1.hitbox[3]>target.hitbox[1]){
                    if (!target.startFade){
                        obj1.money += target.value; 
                        this.moneyCollected += target.value;
                        target.startFade = true;//true; 
                        target.float = true; 
                    }
            }
            }
            if (target.lost){ 
                this.moneyLost+=target.value
                target.value=0 }; 
        }
            

        this.moneyObjects = this.moneyObjects.filter(  //removes looted coins
        function (object){return object.delete == false; });     
    }

    explodeDamage(obj1, obj2, obj3){
        for (const target of obj2){
            if (target.health>0){
                if ( (obj1.hitbox[0]<target.hitbox[0] && obj1.hitbox[0]+obj1.hitbox[2]+obj3.area > target.hitbox[0]) || //obj1 ->target
                    (obj1.hitbox[0]+obj1.hitbox[2]>target.hitbox[0]+target.hitbox[2] && obj1.hitbox[0]-obj3.area<target.hitbox[0]+target.hitbox[2] )){ 
                        if ((obj1.hitbox[1]>target.hitbox[1] && obj1.hitbox[1]<target.hitbox[1]+target.hitbox[3])||obj3.column>0){
                            if (obj1.poison>0){
                                if (target.poisonStack+1<obj1.poisonMax){ //add to max stacks
                                    target.poisonAmount += obj1.poison;
                                    target.poisonStack++;}
                                target.poisonTime = 5;  //four ticks                
                                } 
                            else{
                                target.health -= obj3.damage; 
                                obj3.explodeDamageDealt += obj3.damage;}
                         }
                }
            }
        }
    }
    

    collision(obj1, obj2, obj3 = null){ // checks if obj1 is hitting obj2 
        for (const target of obj2){
            if (obj1.health>0 && target.health>0){
                if ( (obj1.hitbox[0]<target.hitbox[0] && obj1.hitbox[0]+obj1.hitbox[2]> target.hitbox[0]) || //obj1 ->target
                    (obj1.hitbox[0]+obj1.hitbox[2]>target.hitbox[0]+target.hitbox[2] && 
                    obj1.hitbox[0]<target.hitbox[0]+target.hitbox[2] )){ // target <- obj1

                    if (obj1.hitbox[1]>target.hitbox[1] && obj1.hitbox[1]<target.hitbox[1]+target.hitbox[3]){ //y-bounding
                        if (obj1.projectile && !obj1.explode && !obj1.hitList.includes(target.name)){
                            if (target.side == 0){
                                if(target.lane == obj1.lane){ //player only can hit from proj in lane
                                    this.damageCalc(obj1, target, obj3);
                                    obj1.pierce -= 1;  
                                    obj1.hitList.push(target.name);                                    
                                    }
                                }
                            else {
                                this.damageCalc(obj1, target, obj3);
                                obj1.pierce -= 1;  
                                obj1.hitList.push(target.name); 
                            }
                            if (obj3.area>0){this.explodeDamage(obj1, obj2, obj3)}; //area damage; checks for nearby targets 
                            if (obj1.pierce<=0){obj1.explode = true}; //destroy projectile      
                        } else if (!obj1.projectile) 
                            if (obj1.lane == target.lane){this.damageCalc(obj1, target)};
                       
                    }
                }
                }
            }
        }
        

    damageCalc(obj1, obj2, obj3 = null){ //obj1 (owned by obj3) attacking obj2 
        if (obj2.invulnTime == 0 && obj1.touchHit) {
            let damage = obj1.damage;
            let knockback = 1; 
            if (obj3){obj3.damageDealt+= damage;
                    knockback = obj3.knockbackMulti; 
                }
            if (obj1.chill>0){
                if ( Math.abs(obj2.speedX)-obj2.chillAmount>0){obj2.chillAmount+= obj1.chill}
                else obj2.chillAmount = Math.abs(obj2.speedX);
            }
            obj2.health -= damage;
            obj2.knockbackSum += damage*knockback;

            if (obj2.knockbackThresh <= obj2.knockbackSum){
                if (obj1.position.x>obj2.position.x){ this.knockback(obj2, 1, knockback )}
                else this.knockback(obj2, -1, knockback);
                obj2.knockbackSum = 0 
                // obj2.knockbackThresh *=1.2 //increase threshold each time

            }
         }


    }
    loseLife(ctx){ //mob escapes
        for (const obj of this.mobObjects){
            if (obj.position.x <= -obj.width*2){
                //this.player.health -= 1; 
                if (!obj.flip){
                    if (obj.value.length>0){
                        for (let i = 0; i<obj.value.length;i++){
                            this.moneyLost+=obj.value[i];
                            }
                        }
                    else {this.moneyLost += obj.value;} //lost money
                    obj.alive = false; //delete monser; 
                    this.monsterEscape ++; 
                } else {obj.speedX = -obj.speedX; obj.left=!obj.left;}
            }
            else if (obj.position.x >= this.gameWidth && obj.speedX<0)
                {obj.speedX = -obj.speedX
                obj.left=!obj.left};

        }

    }
    // drawGrid(ctx){
    //     ctx.beginPath();  // this.gameHeight = gameHeight
    //     ctx.moveTo(0, this.gameHeight);
    //     ctx.lineTo(1000, this.gameHeight);
    //     ctx.lineTo(1000, this.gameHeight - this.rowHeight);
    //     ctx.lineTo(0, this.gameHeight - this.rowHeight);
    //     ctx.lineTo(0, this.gameHeight - this.rowHeight*2);
    //     ctx.lineTo(1000, this.gameHeight - this.rowHeight*2);
    //     ctx.lineTo(1000, this.gameHeight - this.rowHeight*3);
    //     ctx.lineTo(0, this.gameHeight - this.rowHeight*3);        
    //     ctx.stroke();
    // }

    upgradeMenu(ctx){
        this.HUDMenu.displayHUD(ctx, this);  
        this.upgrade.displayMenu(ctx, this);

        if (this.player.health <= 0 ){
            this.gameOver = true; 
            this.end.display = true;
            this.end.displayMenu(ctx, this);
        }
    }
    spawnMoney(obj){
        if (obj.state == 'die' && !obj.lootDrop){
            if (obj.value.length>0){
                let x = -0.6*2 ; //money spread
                for (let i = 0; i<obj.value.length; i++){
                    this.moneyObjects.push(new _money__WEBPACK_IMPORTED_MODULE_4__["default"](this, obj, obj.value[i], x+i*0.6))
                }
            }
            else {this.moneyObjects.push(new _money__WEBPACK_IMPORTED_MODULE_4__["default"](this, obj, obj.value))}
            obj.lootDrop = true; 
            this.monsterKill++; 
        }
    }
    update(){
        this.mobObjects.forEach( (object)=>this.spawnMoney(object)); 
        this.loseLife(); //enemies past 
        this.mobObjects = this.mobObjects.filter(  //removes dead/passing objects
            function (object){
                return (object.alive !== false)});        
        this.lootMoney(this.player, this.moneyObjects);

        this.playerObjects.forEach( (object)=>object.update() ); 
        this.mobObjects.forEach( (object)=>object.update(this) ); 
        this.moneyObjects.forEach( (object)=>object.update(this) ); 
        
        if (this.player.alive){
            this.playerObjects.forEach( (object)=>this.aggro(object, this.mobObjects) );  //summon attacks
        }
        this.mobObjects.forEach( (object)=>this.aggro(object, this.playerObjects) ); //mob attacks

        this.collision(this.player, this.mobObjects); 
        this.mobObjects.forEach( (object)=>this.collision(object, this.playerObjects) ); 

        this.mobObjects.forEach( (object)=>object.mobAttack(this)); 
        this.playerObjects.forEach( (object)=>object.summonAttack(this)); 
        
        this.mobObjects.forEach( (object)=> //mob proj to player 
            object.projectiles.forEach( (object2)=> 
                this.collision(object2, [this.player], object)));
                
        
        this.playerObjects.forEach( (object)=> //player proj to mobs
            object.projectiles.forEach( (object2)=> 
                 this.collision(object2, this.mobObjects, object)
                 )
             ); 

    }
   

    
}

/***/ }),

/***/ "./src/img.js":
/*!********************!*\
  !*** ./src/img.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ img)
/* harmony export */ });
function img(file){
    const image = new Image(); 
    image.src = 'images/'+file; 
    return image; 
}


/***/ }),

/***/ "./src/input.js":
/*!**********************!*\
  !*** ./src/input.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ InputHandler)
/* harmony export */ });
class InputHandler{
    constructor(player, upgrade, Game){
        document.addEventListener('keydown', (event) =>{    
            switch(event.keyCode){ //a:65; s:83; d:68, w: 87;

                case 37: //left arrow
                    if (Game.titleDisplay && !Game.fadeOut && Game.level>1){Game.level--}
                    else if (upgrade.display){
                        if(upgrade.selectionX>1){upgrade.selectionX-=1}
                    }
                    else {
                            player.speedX = -player.speed; 
                            player.left = true;}
                        break;

                case 39: //right arrow
                    if (Game.titleDisplay && !Game.fadeOut && Game.level<Game.finalLevel){Game.level++}
                    else if (upgrade.display){
                            if(upgrade.selectionX<2){upgrade.selectionX+=1};
                            }
                    else {
                            player.speedX = player.speed; 
                            player.left = false;}
                            break;
        

                case 38: // up arrow
                    if (upgrade.display){
                        if(upgrade.selectionY>1){upgrade.selectionY-=1};
                        }
                    else {player.teleport(-1);}
                break
                
                case 40: // down arrow
                    if (upgrade.display){
                        if(upgrade.selectionY<5){upgrade.selectionY+=1};
                        }
                    else {player.teleport(1);}
                break
                    
                case 90: //Z recall
                if (!Game.titleDisplay) {Game.recall(); }
                break

                case 88: //X jump
                    if (!player.jump){
                        player.speedY = 12;
                        player.jump = true;}
                        break     

                case 67: //C attack
                    player.attack(Game.pause);
                    break
          
                case 65: //A open shop
                        upgrade.toggleMenu(Game); 
                    break

                case 83: // S buy
                    if (upgrade.display && !Game.titleDisplay){upgrade.purchase(Game)}
                break

                case 68: //D start wave
                    if (Game.waveFinish && Game.storage.length==0){
                        if (Game.gameTimeReal-Game.firstLoad>5000){
                            Game.nextWave = true; 
                            Game.startMenu.display = false}; }
                    break

                case 27: // ESC
                    Game.togglePause(); 
                break
                ///////////old controls 
                // case 65: //A move left 
                //     if (upgrade.display){
                //         if(upgrade.selectionX>1){upgrade.selectionX-=1};
                //         }
                //     else {
                //         player.speedX = -player.speed; 
                //         player.left = true;}
                //     break;


                // case 68: //D move right
                // if (upgrade.display){
                //     if(upgrade.selectionX<2){upgrade.selectionX+=1};
                //     }
                // else {
                //     player.speedX = player.speed; 
                //     player.left = false;}
                //     break;

                // case 87: //W teleport up
                // if (upgrade.display){
                //     if(upgrade.selectionY>1){upgrade.selectionY-=1};
                //     }
                // else {player.teleport(-1);}
                //     break
                    
                // case 83: //S teleport down
                // if (upgrade.display){
                //     if(upgrade.selectionY<5){upgrade.selectionY+=1};
                //     }
                // else {player.teleport(1);}
                //     break


                // case 74:  //J 
                // if (upgrade.display){upgrade.purchase(Game)}    
                // else if (!player.jump){
                //     player.speedY = 12;
                //     player.jump = true;}
                //     break 

                // case 75: //K
                //     player.attack(Game.pause);
                //     break

                // case 79: //O
                //     if (Game.waveFinish && Game.storage.length==0){
                //         Game.nextWave = true; 
                //         Game.startMenu.display = false}; 
                //         break

    
                // case 96:
                //     upgrade.toggleMenu(); 
                //     break

                // case 97: //1
                //     Game.createMob(player, 'redDragon', 0);
                //     break
                // case 98: //2
                //     Game.createMob(player, 'blueDragon', 0);
                //     break
                // case 99: //3
                //     Game.createMob(player, 'greenDragon', 0);
                //     break
                // case 100: //4
                //     Game.createMob(player, 'blackDragon', 0);
                //     break

            }

        })
        document.addEventListener('keyup', (event) =>{    
            switch(event.keyCode){ //a:65; s:83; d:68, w: 87;
                default:
                    if (Game.titleDisplay){
                        Game.fadeOut = true;
                        Game.firstLoad = Game.gameTimeReal;
                        setTimeout(() =>{Game.titleDisplay = false;
                            Game.resetEverything(); 
                        }, 800)}
                break
                case 9:  
                case 18: 
                case 116: break; 

                case 37:   //A = 65
                    if (player.speedX<0) player.speedX = 0; 
                    break;
                case 39: // D = 68
                    if (player.speedX>0) player.speedX = 0; 
                    break;
                }

                
            })
        
    }
}

/***/ }),

/***/ "./src/mob.js":
/*!********************!*\
  !*** ./src/mob.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Mob)
/* harmony export */ });
/* harmony import */ var _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SpriteAnimation */ "./src/SpriteAnimation.js");
/* harmony import */ var _projectile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projectile */ "./src/projectile.js");
 
 

class Mob{
    constructor(game, type, side, test = 0, level=0){
        this.side = side;
        if (this.side == 0){this.typeInfo = __webpack_require__(/*! ./summonInfo.json */ "./src/summonInfo.json") }
        else (this.typeInfo = __webpack_require__(/*! ./mobInfo.json */ "./src/mobInfo.json"))
        
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.type = type; 
         
        this.value = this.typeInfo[this.type]['value']; 
        this.lootDrop = false; 
        this.projectiles = [];
        this.speed = 1;
        this.level = 1; 
        this.fade = 1; 
        
        this.alive = true;  
        this.attackCD = 0; 
        this.maxSpeed = 15; 
        this.speed = 2;
        this.touchHit = true; 
        this.knockbackForce = 0; 
        this.sprite = this.typeInfo[this.type]['sprite']; 
        //this.damage = this.typeInfo[this.type]['damage']; 
        this.attackSpeed = this.typeInfo[this.type]['atkSpd']; 
        
        this.speedX = this.typeInfo[this.type]['speed'];
        this.speedY = 0; 
        this.gravityTime = 1;
        this.lane = game.lane;  // which lane
        if (this.side == 1){ //Enemy Mob 
            this.invulnTime =  0; 
            this.name = this.type+game.mobCount; 
            this.width = 45; //sprite size 
            
            if (this.typeInfo[this.type]['height']){this.height = this.typeInfo[this.type]['height']}
            else this.height = 65;
            if (this.typeInfo[this.type]['range']){this.range = this.typeInfo[this.type]['range']}
            else {this.range = 10;}
            this.left = true;
            this.health = this.typeInfo[this.type]['health'];
            this.maxHealth = this.health; 
            this.armor = 0;
            this.state = 'walk';
            this.xOff=-70;
            this.yOff=-85;
            this.position = {  //position (rightside)
                x: this.gameWidth+50, 
                y: this.gameHeight - 105 - game.rowHeight*game.lane,
            }
        }
        else { // PC pets
            this.invulnTime = 1; 
            this.width = 50; //sprite size 
            this.height = 50; 
            this.range = 600; //whole lane?
            this.health = 1; 
            this.armor = 1; 
            this.state = 'stand'
            this.left = false; 
            this.yOff=0;
            this.xOff=0;
            this.damageDealt = 0;
            this.aggro = true;
            this.name = this.typeInfo[this.type]['name'];
            if (level!=0) {this.level = level}; 
            this.label = 'Lvl. ' + this.level; 
            this.emoteTime = 100;
            this.emoteLength = [];
            this.yStart = game.floor+30;
            this.position = {  //position 
            x: (game.curTile*80)+game.width/2, 
            y: game.floor+30
            }  
        };  //offset for sprites 
        //if (this.typeInfo[this.type]['yOff']) (this.position.y -=this.typeInfo[this.type]['yOff']) ;
        if (this.typeInfo[this.type]['spriteType']){this.loadSprite = this.typeInfo[this.type]['spriteType'][0]}
        else {this.loadSprite = this.type};
        this.form = 0; 
        if (this.typeInfo[this.type]['damage']){this.damage = this.typeInfo[this.type]['damage']}
        else this.damage = 1;
        if (this.typeInfo[this.type]['aggro'])this.aggro = true;

        if (this.typeInfo[this.type]['width2']){this.width2 = this.typeInfo[this.type]['width2']}
        else {this.width2=0};
        if (this.typeInfo[this.type]['height2']){this.height2 = this.typeInfo[this.type]['height2']}
        else this.height2 = 0;

        if (this.typeInfo[this.type]['yOff']){this.yOff = this.typeInfo[this.type]['yOff']}
        if (this.typeInfo[this.type]['xOff']){this.xOff = this.typeInfo[this.type]['xOff']}
        if (this.typeInfo[this.type]['boss']){this.boss = true; 
                this.position.y-=70; this.height+=100}; 
        if (this.typeInfo[this.type]['roam']){
            this.roam = true; 
            this.roamTime = 50;
            this.roamY = this.lane*game.rowHeight; 
            this.roamLimits = [0, game.rowHeight, game.rowHeight*2]; //0,1,2
            //this.destination = 0;
         }
        else {this.roam = false}; 
        
        this.xOff2 = 0; 
        this.knockbackTime = 0 ;  
        this.knockbackThresh = Math.floor(this.maxHealth / 3);
        this.knockbackSum = 0;  
        this.knockbackResist = 0.3
        this.hit = false; 
        this.createAnimations(); 
        this.emoteChange = true;
        this.emoteTimer = true;
        this.emoteTimeOut = [];
        this.posionGraphic = []; 
        this.hitBy = []; 
        this.damageMulti = 1; 
        this.lootMulti = 1;
        this.knockbackMulti = 1;
        this.speedMulti = 1; 
        this.pierce = 1; 

        this.projectileAmount = 0; 
        this.chillAmount = 0; 
        this.poisonLoaded = false; //load sprite 
        this.poisonTime = 0; 
        this.poisonAmount = 0; 
        this.poisonTick = 0;
        this.chill = 0;
        this.area = 0; 
        this.column = 0; 
        this.explodeDamageDealt = 0 
        this.poison = 0; 
        this.poisonStack = 0; 
        this.poisonMax = 0; 

        this.attacked = false ;
        this.attackStart = 0;
        this.delayAttack = false;

        if (this.typeInfo[this.type]['flip']){this.flip = true }
        if (this.typeInfo[this.type]['weird']){
            this.weird = true; 
            this.weirdStart = game.gameTimeReal; 
            this.weirdTime = Math.floor(Math.random()*3000)+2000;

        }

        if (test==1){
            this.position.x = 260; 
            this.position.y = 395; //bottom
            this.lane = 0;

        }
        else if (test==2){
            this.position.x = 260; 
            this.position.y = 305; //middle
            this.lane = 1;
            
        }
        else if (test==3){
            this.position.x = 260; 
            this.position.y = 215; //top 
            this.lane = 2;    
        }
        else if (test==4){
            this.position.x = 340; 
            this.position.y = 305; // middle #2
            this.lane = 1;
            
        }
        if (this.type == 'redDragon'){
            if (this.level>=2){this.projectileAmount++; this.damageMulti+=0.3}
            if (this.level>=3){this.area += 60; this.damageMulti+=0.3}
            if (this.level>=4){this.area +=40; this.projectileAmount++};
        };

        if (this.type == 'blueDragon'){
            if (this.level>=2){this.projectileAmount++; this.pierce += 1;}
            if (this.level>=3){this.chill += 0.2; this.pierce += 1}
            if (this.level>=4){this.chill += 0.1; this.projectileAmount++};
        };
        if (this.type == 'greenDragon'){
            if (this.level>=2){this.projectileAmount++;}
            if (this.level>=3){this.poison += 0.4; this.area += 20; this.poisonMax+=10;}
            if (this.level>=4 ){this.poison += 0.4; this.area += 10; this.poisonMax+=5; this.projectileAmount++}
        };
        if (this.type == 'blackDragon'){
            if (this.level>=2){this.projectileAmount++; this.damageMulti+=0.2}
            if (this.level>=3){this.area +=15; this.column=1;this.damageMulti+=0.2}
            if (this.level>=4){this.area +=15; this.projectileAmount++}
        };
        if (this.level>=3){this.evolve()} 

    }


    createAnimations(){ //import sprites 
        this.frames = 30; 
        if (this.sprite=='mob'){ // Enemy mobs
            this.stand = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"](this.loadSprite+'/stand_?.png', this.typeInfo[this.type]['stand'], 10, "stand"); //standing sprites; 
            this.walk = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"](this.loadSprite+'/move_?.png', this.typeInfo[this.type]['walk'], 10, "walk"); //walking sprites; 
            this.hit = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"](this.loadSprite+'/hit1_?.png',0, 10, "hit");
            this.die = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"](this.loadSprite+'/die1_?.png', this.typeInfo[this.type]['die'], 15, "die", true);
            this.animations = [this.stand, this.walk, this.hit, this.die]; 
            if (this.typeInfo[this.type]['angry']){
                this.angry = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"](this.loadSprite+'/attack1_?.png', this.typeInfo[this.type]['angry'], 10, "attack", true)
                this.animations.push(this.angry);
            };
        }           
        else { 
            this.stand = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"](this.loadSprite +'/stand1_?.png', this.typeInfo[this.type]['stand'][this.form], 10, "stand"); //standing sprites; 
            this.angry = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"](this.loadSprite +'/angry_?.png', this.typeInfo[this.type]['angry'][this.form], 10, "attack", true); //walking sprites; 
            this.animations = [this.stand, this.angry]; 
            let emotes = this.typeInfo[this.type]['emote'][this.form];
            for (let i = 0; i<emotes.length; i++){
                let emote = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"](this.loadSprite +'/'+emotes[i][0]+'_?.png', emotes[i][1], 10, "emote"+(1+i) ); //emote; 
                this.animations.push(emote);
                this.emoteLength.push(emotes[i][2]);
            }
            //console.log(this.animations);
        }
    }
    evolve(){
        this.form++; 
        this.loadSprite = this.typeInfo[this.type]['spriteType'][this.form]; 
        this.emoteLength = []; 
        this.createAnimations(); // update sprites 

    }
    levelUp(player){ 
        let cost = player.upgradeCost[this.level-1];
        if (player.money>=cost){
            this.level++;  
            this.label = 'Lvl. ' + this.level; 
            this.value += cost; 
            player.money -= cost; 
            if (this.level==3){this.evolve()} 
            if (this.type == 'redDragon'){
                if (this.level==2){this.projectileAmount++; this.damageMulti+=0.25}
                else if (this.level==3){this.area += 60; this.damageMulti+=0.25}
                else if (this.level>=4){this.area += 30; this.projectileAmount ++};
            };

            if (this.type == 'blueDragon'){
                if (this.level==2){this.projectileAmount++;}
                else if (this.level==3){this.chill += 0.2; this.pierce += 1}
                else if (this.level>=4){this.chill += 0.1; this.projectileAmount ++};
            };
            if (this.type == 'greenDragon'){
                if (this.level==2){this.projectileAmount++;}
                else if (this.level==3){this.poison += 0.6; this.poisonMax+=6;this.pierce += 1}
                else if (this.level>=4 ){this.poison += 0.6; this.poisonMax+=3; this.projectileAmount ++}
            };
            if (this.type == 'blackDragon'){
                if (this.level==2){this.projectileAmount++; this.damageMulti+=0.2}
                else if (this.level==3){this.area +=20; this.column=1;this.damageMulti+=0.2}
                else if (this.level>=4){this.area +=20; this.projectileAmount ++}
            };
        }
        // stat updates .damageMulti
    }

    emote(game){
        let random = Math.floor(Math.random()*10);
        if (this.emoteChange){
            if (!game.player.alive){
                //this.state = 'emote5';
                if(random>5){this.state = 'emote5';} // cry
                else {this.state = 'emote2';} // bewilder
            }
            else if (game.waveFinish ){
                    if(random>5){this.state = 'emote3';} // sit
                    else {this.state = 'emote4';} // sleep
            }
            this.emoteTimer = false;
            this.emoteChange = false; 
        }

        else if (!this.emoteChange && !this.emoteTimer){ 
            this.emoteTimer = true;
            setTimeout(()=> {this.emoteChange = true}, "5000") ;}

    }

    attack(){ //triggers attack state 
        if (this.attackCD <= 0 && this.health>0){
            this.state = 'attack'; 
        }          
    }

    summonAttack(){ //summon attacks 
        if ( !this.attacked){
            if (this.angry.getFrame()==2){
                this.projectiles.push( new _projectile__WEBPACK_IMPORTED_MODULE_1__["default"](this, this.typeInfo[this.type]['proj'][this.form], this.position.x, this.position.y-50));
                if (this.projectileAmount>0){ //extra projectiles 
                    for (let i=1; i<=this.projectileAmount; i++){ 
                    setTimeout( ()=> {this.projectiles.push( new _projectile__WEBPACK_IMPORTED_MODULE_1__["default"](this, this.typeInfo[this.type]['proj'][this.form], this.position.x, this.position.y-50));
                        }, 120*i)
                    }
                }
                this.attacked = true;
                this.attackCD = this.attackSpeed;
               // this.angry.reset();
                this.emoteTime = 100+Math.floor(Math.random()*500); //reset random emote time
            }
        }
    }

    mobAttack(game){
        if (!this.attacked && game.player.alive && this.health>0){
            if (this.loadSprite=='stumpy'){
                if (this.angry.getFrame() == 9){
                    this.projectiles.push( new _projectile__WEBPACK_IMPORTED_MODULE_1__["default"](this, this.typeInfo[this.type]['proj'], 
                    this.position.x-40, this.position.y+30));    
                     this.attacked = true;
                     this.attackCD = this.attackSpeed;
                };
            }

            else if (this.loadSprite=='ghostStump'){
                if (this.angry.getFrame() == 4){
                    this.projectiles.push( new _projectile__WEBPACK_IMPORTED_MODULE_1__["default"](this, this.typeInfo[this.type]['proj'], 
                    this.position.x-40, this.position.y-27));    
                    this.attacked = true;
                    this.attackCD = this.attackSpeed;
                    
                };
            }
        
            if (this.loadSprite=='mushmom'){
                if (this.angry.getFrame() == 7){
                    this.attacked = true;
                    this.attackCD = this.attackSpeed;
                    // this.angry.reset();
                    if (!game.player.jump && game.player.lane == this.lane ){
                        game.player.health -= 1;
                        game.knockback(game.player, 1, 1);
                    } 
                } 
            }   
        }
    }

    draw(ctx, pause) {
        const animation = this.animations.find((animation)=>animation.isFor(this.state))
        //if (this.hitbox){ ctx.fillRect(this.hitbox[0],this.hitbox[1], this.hitbox[2], this.hitbox[3]);}
        //ctx.fillRect(this.position.x, this.position.y, this.width, this.height); 
        //ctx.fillRect(this.position.x-this.range, this.position.y, this.width+2*this.range, this.height); //range
        if (this.side == 0 && this.form==1 && this.state=='attack'){this.xOff2 = -51} //attack offset
        else this.xOff2=0;

        if (animation.shouldStop()){
            if (this.side == 0){this.state = 'stand'; } 
            else this.state='walk';}

        if (this.health<=0 && this.side ==1){
            this.state = 'die';  //death animation   
            if (animation.shouldStop()){
                if (this.fade>0) this.fade -= 0.03; //fade on death 
                ctx.globalAlpha = this.fade; 
                setTimeout(()=> {this.fade = 0}, "450") ;
                if (this.projectiles.length == 0){
                    setTimeout(()=> {this.alive = false}, "450") ;} 
                }
        }  
        if (this.side == 1 && this.state !='die'){ //health bar
            if (!this.typeInfo[this.type]['boss'])
                {ctx.fillStyle = "#2b2b2b";
                ctx.fillRect(this.position.x, this.position.y+70, 60, 12); //empty box
                ctx.fillStyle = "#990c02";
                ctx.fillRect(this.position.x+1, this.position.y+71, Math.floor(58*(1-(this.maxHealth - this.health)/this.maxHealth)), 10); // life bar
              }
            else { //boss health bar
                ctx.fillStyle = "#2b2b2b";
                ctx.fillRect(this.position.x-5, this.position.y+131, 65, 16); //empty box
                ctx.fillStyle = "#990c02";
                ctx.fillRect(this.position.x-4, this.position.y+132, Math.floor(63*(1-(this.maxHealth - this.health)/this.maxHealth)), 14); //empty box
 

            }
        } 
        else if (this.side == 0){ // summon name 
            ctx.fillStyle = "black";
            ctx.globalAlpha = 0.7; 
            ctx.beginPath();
            ctx.roundRect(this.position.x+15, this.position.y+this.height+17, 35, 15, 2);
            ctx.fill();
            ctx.globalAlpha = 1.0; 

            ctx.font = "11px arial"
            ctx.fillStyle = 'white'; 
            ctx.textAlign = 'center'; 
            ctx.fillText(this.label, this.position.x+32, this.position.y+this.height+27) ;          

        }

        let image = animation.getImage(pause);       
        //image = buffer; 

        if (!this.left){//flip based on sprite orientation
            ctx.scale(-1,1);
            ctx.drawImage(image, -this.position.x-this.width+this.xOff+this.xOff2, this.position.y+this.yOff );}
        else {ctx.drawImage(image, this.position.x+this.xOff+this.xOff2, this.position.y+this.yOff); }
    
        if (this.chillAmount>0){
            const buffer = document.createElement('canvas'); // Image tinting
            buffer.width = 200;//image.width;
            buffer.height = 400;//image.height;
            const btx = buffer.getContext('2d');
            btx.drawImage(image, 0,0);
            btx.fillStyle = "#2c68dc";
            btx.globalCompositeOperation = 'multiply';
            btx.fillRect(0,0,buffer.width, buffer.height);
            btx.globalAlpha = 0.8;
            btx.globalCompositeOperation = "destination-in";
            btx.drawImage(image,0,0); 

            if (!this.left){
                ctx.drawImage(buffer, -this.position.x-this.width+this.xOff, this.position.y+this.yOff)}
            else {ctx.drawImage(buffer, this.position.x+this.xOff, this.position.y+this.yOff)}
        }
        ctx.globalAlpha = 1;
        ctx.setTransform(1,0,0,1,0,0); 

        if (this.poisonAmount>0 && this.health>0){
            if (!this.poisonLoaded){
                this.poisonGraphic = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"]('poisonEffect/poison?.png', 4, 10, "poison");
                this.poisonLoaded = true; }
            else {
                    let poisonSpriteImage = this.poisonGraphic.getImage(pause); 
                    if (this.boss) {ctx.drawImage(poisonSpriteImage,this.position.x-10,this.position.y-this.height+75)}
                    else ctx.drawImage(poisonSpriteImage,this.position.x-10,this.position.y-this.height);
                }
            }

        }   
    
    drawProj(ctx, pause){
            this.projectiles.forEach( (object)=>object.draw(ctx, pause) ) //draw projectiles 
        }    
        
                
    update(game){
        if (this.side === 1){  // Mob 
            if (this.health>0){     
                let chillDirect = 1;  
                if (this.speedX<0)(chillDirect= -1);

                if (this.speedX-this.chillAmount*chillDirect>=0.4){
                    if (this.state !='attack') this.state = 'walk'; //cancels attack 
                }  
                else if (this.attackCD>0) this.state == 'hit'; 
                else this.state = 'walk';

                // if (this.position.x<-this.width*2) {this.position.x = -this.width*2}; //left border
                // if (this.position.x>this.gameWidth-this.width) {this.position.x = this.gameWidth-this.width;} //right border
                if (this.weird){
                    if (game.gameTimeReal-this.weirdStart> this.weirdTime){
                        this.weirdStart = game.gameTimeReal; 
                        this.weirdTime = Math.floor(Math.random()*2000)+500;
                        this.speedX  = -this.speedX;
                        if (this.speedX>0) {this.weirdTime+=700}; //bias moving forward
                    }
                    if (this.speedX<0 && this.position.x>this.gameWidth) this.speedX = abs(this.speedX); 
                }


            //     this.roam = true; 
            //     this.roamTime = 5000;
            //     this.roamY = this.lane*game.rowHeight; 
            //     this.roamLimits = [0, game.rowHeight, game.rowHeight*2]; //0,1,2
            //     this.destination = 0;
            //  }

                if (this.roam){
                    this.roamTime--;
                    if (this.roamTime == 0){
                        this.destination = Math.floor(Math.random()*3); //random 0,1,2
                        this.roamTime = Math.floor(Math.random()*250)+1000;
                    }

                    let speedY = 3;//
                    if (this.speedX-this.chillAmount*chillDirect<=1) {speedY=1}
                    else if (this.speedX-this.chillAmount*chillDirect<=2) {speedY=2};
                    if (this.roamY> this.roamLimits[this.destination]){
                        this.position.y+=speedY ;
                        this.roamY-=speedY ;
    
                    } else if (this.roamY<this.roamLimits[this.destination]){
                        this.position.y-=speedY ;
                        this.roamY+=speedY;
                    }

                    if (this.roamY+2> this.roamLimits[this.destination] && this.roamY-2<this.roamLimits[this.destination]){
                        this.position.y -= (this.roamY-this.roamLimits[this.destination]); 
                        this.roamY = this.roamLimits[this.destination];
                    }

                    if (this.roamY == this.roamLimits[this.destination]){
                        this.lane = this.roamLimits.indexOf(this.roamY)}; //update lane during move
            }

                if (this.poisonTime>0){ ///POISON
                    if (game.gameTimeReal-this.poisonTick>=1000){
                    this.health -= this.poisonAmount;
                    game.poisonDamage += this.poisonAmount;
                    this.poisonTime -= 1;  
                    this.poisonTick = game.gameTimeReal; //update tick time 
                    }
                }else if (this.poisonTime == 0){this.poisonAmount = 0;  
                    this.poisonStack = 0; }//drop poison stacks


                if (this.chillAmount>0){this.chillAmount-=0.005} //CHILL 
                else if (this.chillAmount<0){this.chillAmount=0};

                if (game.gameTimeReal-this.knockbackTime >1000){this.knockbackForce=0} //max 2s

                if (Math.abs(this.knockbackForce)>0) {
                    this.state = 'hit'
                    this.knockbackResist+=0.01;
                    this.position.x += this.knockbackForce;
                    if (this.knockbackForce>0){
                        this.knockbackForce-=this.knockbackResist;
                        if (this.position.x>this.gameWidth+50){this.position.x=this.gameWidth+50}
                        if (this.knockbackForce<0) this.knockbackForce = 0
                        } //backwards
                    else if (this.knockbackForce<0){
                        this.knockbackForce+=this.knockbackResist;
                        if (this.knockbackForce>0) this.knockbackForce = 0
                    }; //forwards 

                     
                } 
                else {
                    if (this.state !='attack'){this.position.x -= (this.speedX-this.chillAmount*chillDirect)}
                }
 
                
                this.position.y -= this.speedY; 
                if (this.speedY>0){
                    this.speedY-=0.5; 
                }        
                
                if (this.jump){ //gravity
                    this.position.y += 1*this.gravityTime;
                    this.gravityTime+=0.5; 
                }
                // if (this.position.y > this.gameHeight-110 ){ //bottom border (update for platforms)
                //     this.position.y = this.gameHeight-110;
                //     this.speedY = 0;
                //     this.jump = false;
                //     this.gravityTime = 1; 
                //     this.state = 'stand';
                // } 
            }
        } 
        else if (this.state=='stand'){   //emotes for summons
            if (this.emoteTime == 0 ){
                let random = Math.floor(Math.random()*10); //1: sleep, 2: ignore
                let time = 0; 
                if (random <5){this.state = 'emote1'; time = this.emoteLength[0];}
                else {this.state = 'emote6';time = this.emoteLength[5] };
                
                this.emoteTimeOut = setTimeout(()=> {
                    this.emoteTime = 600+Math.floor(Math.random()*500);
                    this.state = 'stand'}, time) ;//how long to run animation
                // if (game.pause){clearTimeout(this.emoteTimeOut)}; 
            }
            else this.emoteTime--; 
            
        }


        this.projectiles.forEach( (object)=>object.update() ); 
        this.projectiles = this.projectiles.filter(  //deletes projectiles
            function (object){return object.delete !== true; 
        });
       // console.log(this.projectiles); 
     

        if (this.attackCD >0){this.attackCD--}
        if (this.attackCD==0) {
            if (this.attacked){
                this.attacked = false;
                this.angry.reset(); 
            } 
            
        }

        this.hitbox = [this.position.x+this.width2/2, this.position.y+this.height2, 
                this.width-this.width2, this.height]; 
        




    }

}

/***/ }),

/***/ "./src/money.js":
/*!**********************!*\
  !*** ./src/money.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Money)
/* harmony export */ });
/* harmony import */ var _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SpriteAnimation */ "./src/SpriteAnimation.js");
 

class Money{
    constructor(game, obj, value, speedX = 0){
        this.yOff = 0 ;
        if (obj.boss){ this.yOff +=70}
        this.position = {  //position 
            x: (obj.position.x)+obj.width/2, 
            y: obj.position.y+40+this.yOff}
        if (this.position.x>game.gameWidth-10){this.position.x = game.gameWidth-30;} //killing off-screen (right)
        else if (this.position.x<10){this.position.x=30};
        this.width = 35;
        this.height = 35; 
        this.value = value; 
        this.spawnTime =  game.gameTimeReal; 
        this.popUp = 25; 
        this.dropDown = 23;
        this.speedX = speedX; 
        this.speedY = 1; 
        this.accelUp = 0;
        this.accelDown = 0;
        this.delete = false;
        this.fade = 1; 
        this.startFade = false; 
        this.float = false; 
        this.lost = false; 

        this.hitbox = [this.position.x, this.position.y-25, this.width, this.height]; 
        if (this.value>=100){this.type = '4';} 
        else if (this.value>=50){this.type = '3';} 
        else if (this.value>=10){this.type = '2';} 
        else this.type = '1'; 
        this.createAnimations(); 
    }
    
    createAnimations(){
        this.stand = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"]('coin/Coin'+this.type+'_?.png', 3, 6, "stand");
        this.animations = [this.stand]
    }

    draw(ctx, pause) {
        //ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        if (this.startFade) {
            if (this.float){this.fade -= 0.015;} //slower fade when pickup
            else this.fade -= 0.03;
            ctx.globalAlpha = this.fade; 
            setTimeout(()=> {this.delete= true}, "450") ;
        } 
        
        const animation = this.animations.find((animation)=>animation.isFor('stand')); 
        const image = animation.getImage(pause); 


        ctx.drawImage(image, this.position.x, this.position.y);
        ctx.globalAlpha = 1;

    }

    update(game){
        if (this.popUp>0){
            this.accelUp+=0.1;
            this.position.y -= (4.5-this.accelUp); 
            this.position.x -=this.speedX; 
            this.popUp -= 1; 
        } else if (this.dropDown>0){
            this.accelDown+=0.1;
            this.position.y += (2+this.accelDown);
            this.dropDown -= 1; 
            this.position.x -=this.speedX; 
        }
        if (this.float){
            this.position.y-=1; 
            if (game.player.position.x+game.player.width<this.position.x){this.position.x-=0.8  }
            else if (game.player.position.x>this.position.x) this.position.x+=0.8;
        }

        if (game.gameTimeReal-this.spawnTime>=20000){ //18 s 
            this.startFade=true;
            this.lost = true; 
        }

        this.hitbox = [this.position.x, this.position.y, this.width, this.height]; 

    }

    
}


/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _projectile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectile */ "./src/projectile.js");
/* harmony import */ var _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SpriteAnimation */ "./src/SpriteAnimation.js");
 
 

class Player {
    constructor(game){
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.width = 40; //sprite size 
        this.height = 80; 
        this.position = {  //position 
            x: this.width/2, 
            y: this.gameHeight - 45 - 2*game.rowHeight,
        }
        this.playerX = this.position.x - this.width/2 +18; 
        this.elePositions = [ [this.playerX -60, this.position.y], [this.playerX -40, this.position.y-40],
            [this.playerX , this.position.y-55], [this.playerX +40, this.position.y-40], 
            [this.playerX +60, this.position.y] ];
        this.rowHeight = game.rowHeight;
        this.lane = 1; 
        this.floor =  this.gameHeight - 45 - (1+this.lane)*this.rowHeight
        this.speed = 3.5;
        this.knockbackForce = 0; 
        this.left = false;
        this.side =0;
        this.speedX = 0;
        this.speedY = 0; 
        this.jump = false;
        this.gravityTime = 1; 
        this.projectiles = [];
        this.name = 'Wiz';
        this.health = 50; 
        this.damage = 1; 
        this.damageDealt = 0; 
        this.invulnTime =  0; 
        this.invulnDark = false; 
        this.invulnDarkTime = 0;
        this.knockbackThresh = 1; 
        this.knockbackSum = 0
        this.armor = 0; 
        this.touchHit = false; 
        this.attackSpeed = 35; 
        this.attackCD = 0; 
        this.alive = true; 
        this.state = 'stand'; 
        this.curTile = 0;
        this.elementList= []; //add sprites here 
        // this.elementList = ['Blaze','Dawn','Night','Thunder','Wind'];
        this.elementSprites = {};
        this.elementLoadedSprite = {} ; 
        this.elementInfo = { 'Blaze': {'stand':7, 'move': 7, 'attack': 8, 'proj':'redBall' },
            'Dawn': {'stand': 15, 'move':15, 'attack': 8, 'proj':'yellowBall'},
            'Night': {'stand':7, 'move':7, 'attack': 8, 'proj':'purpleBall'},
            'Thunder': {'stand': 7, 'move':7, 'attack': 8, 'proj':'greenBall',}, 
            'Wind': {'stand': 7, 'move':7, 'attack': 8, 'proj':'blueBall',} }
        this.elementState = ['stand','stand','stand','stand','stand']; 
        this.recallList = ['redDragon0', 'redDragon1', 'blueDragon0', 'blueDragon1', 
        'greenDragon0','greenDragon1','blackDragon0', 'blackDragon1'] ;
        this.recallImages ={};
        this.createAnimations(); 
        this.elementals();

        this.summonCount = 0; 
        this.money = 50;  //50
        if (game.level == 2) {this.money = 1200} //starting money based on level;
        else if (game.level == 3) {this.money = 5000}
        this.summonCost = [50, 100, 150, 200, 640];
        this.upgradeCost = [200, 400, 800, 1600, 3200]; 
        this.elementCost = [50, 100, 200, 400, 800]; 

        this.damageTaken = 0; 
        
        this.float = 20;
        this.floatDirect = 1; 
        this.graveSpawn = false;
        this.graveX = 0 ;
        this.graveY = -20; 
        this.graveState = 'move'
        //upgrades
        this.damageMulti = 1; 
        this.lootMulti = 1;
        this.knockbackMulti = 1;
        this.speedMulti = 1; 
        this.pierce = 0; 

        this.chill = 0;
        this.area = 0; 
        this.poison = 2; 
        this.explodeDamageDealt = 0 



    }
    elementals(){ 
        for (let i = 0; i<this.elementList.length; i++){ // Load elemental sprites 
            if (!this.elementSprites[this.elementList[i]]){
                let eleType = this.elementList[i]; 
                this.standEle = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"](eleType+"/stand_?.png", this.elementInfo[eleType]['stand'], 6, "stand");
                this.moveEle = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"](eleType+"/move_?.png", this.elementInfo[eleType]['move'], 6, "walk");
                this.attackEle = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"](eleType+"/attack1_?.png", this.elementInfo[eleType]['attack'], 6, "swing1", true);
                this.elementSprites[eleType] = [this.standEle, this.moveEle, this.attackEle]; 
                //{'stand': this.standEle, 'move': this.moveEle, 'attack': this.attackEle}
            }
        }
    }

    createAnimations(){
        this.frames = 15; 
        this.stand = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"]("wizard/alert_?.png", 3, this.frames, "stand"); //combat sprites; 
        this.walk = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"]("wizard/walk1_?.png", 3, 10, "walk"); //walking sprites; 
        this.jump = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"]("wizard/jump_?.png", 1, 10, "jump"); //jump sprites;
        this.relax = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"]("wizard/stand1_?.png", 3, 30, "relax"); // idle pose 
        this.cast = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"]("wizard/alert_?.png", 3, 10, "stand"); 
        this.swing1 = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"]("wizard/swingO1_?.png", 3, 12, "swing1", true); //attack sprites;
        this.swing2 = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"]("wizard/swingO2_?.png", 3, 12, "swing2", true); 
        this.swing3 = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"]("wizard/swingO3_?.png", 3, 12, "swing3", true); 
        this.dead = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"]("wizard/dead_?.png", 3, 200, "dead"); 
        this.attackAnim = ['swing1', 'swing2', 'swing3']; 
        this.animations = [this.stand, this.walk, this.jump, this.swing1, this.swing2, this.swing3, this.cast, this.dead, this.relax ]; 
        this.graveMove = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"]("grave/move_?.png", 0, 300, "move"); 
        this.graveLand = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"]("grave/stand_?.png", 5, 12, "land", true ); 
        this.graveAnimations = [this.graveMove, this.graveLand];

        // this.recallImages = ['redDragon0', 'redDragon1', 'blueDragon0', 'blueDragon1', 
        // 'greenDragon0','greenDragon1','blackDragon0', 'blackDragon1'] ;
        for (let i =0;i<this.recallList.length;i++){
            let image  = new Image(); 
            image.src = 'images/recall/'+this.recallList[i]+'.png'; 
            this.recallImages[this.recallList[i]] = image; 
        }
        


    }
    emote(game){
        if (game.waveFinish){
            if (this.state =='stand'){this.state = 'relax';} 
    }} 

    attack(pause){
        if (this.attackCD <= 0 && this.alive && !pause ){
            let x = this.position.x-25; 
            if (this.left){x +=50;}
            this.proj = new _projectile__WEBPACK_IMPORTED_MODULE_0__["default"](this, 'lightningball',x, this.position.y);

            
            this.state = this.attackAnim.shift(); 
            this.attackAnim.push(this.state); 
            this.animations.find((animation)=>animation.isFor(this.state)).reset(); 
            this.attackCD = this.attackSpeed;
            this.projectiles.push(this.proj);
            //setTimeout(()=> {this.projectiles.push(this.proj)}, "200"); //slight delay for animation

            for (let i=0; i<this.elementList.length; i++){
                let x = this.elePositions[i][0];//facing left
                if (this.left){x +=20};
                
                this.proj = new _projectile__WEBPACK_IMPORTED_MODULE_0__["default"](this, this.elementInfo[this.elementList[i]]['proj'],
                        x, this.elePositions[i][1]+18 );
                this.projectiles.push(this.proj);
            }
        }
    }

    recallIcon(ctx, game){
        if (game.recallStorage){
            let imageType = game.recallStorage.type + game.recallStorage.form;
            ctx.drawImage(this.recallImages[imageType], this.position.x+22, this.position.y-5); 

          //  this.recallImages[game.recallStorage.type]
        }

    }
    summonAttack(){}; 
    draw(ctx, pause){
        let animation = this.animations.find((animation)=>animation.isFor(this.state))
        let image = animation.getImage(pause);   //get sprite

        // if (this.invulnTime%4>=1 && this.invulnTime>0 && this.alive) {ctx.globalAlpha = 0.2};
        //if (this.hitbox){ ctx.fillRect(this.hitbox[0],this.hitbox[1], this.hitbox[2], this.hitbox[3]);}
        //ctx.fillRect(this.curTile*80, this.position.y, 80, 80); //selected tile
        // ctx.fillRect(this.hitbox[0]-(75*(-1+this.lootMulti)), this.position.y, this.width, 80); //loot range
        // ctx.fillRect(this.hitbox[0], this.position.y, this.width+75*(-1+this.lootMulti), 80); //loot range

        if (this.left){
            ctx.scale(-1,1);
            ctx.drawImage(image, -this.position.x-1.5*this.width-15, this.position.y);
        }
        else {ctx.drawImage(image, this.position.x-5, this.position.y); }
        
        ctx.setTransform(1,0,0,1,0,0);

        if (this.invulnDark && this.alive){
            const buffer = document.createElement('canvas'); // Image tinting
            buffer.width = 200;//image.width;
            buffer.height = 200;//image.height;
            const btx = buffer.getContext('2d');
            btx.drawImage(image, 0,0);
            btx.fillStyle = "#000000";
            btx.globalCompositeOperation = 'multiply';
            btx.fillRect(0,0,buffer.width, buffer.height);
            btx.globalAlpha = 0.6;
            btx.globalCompositeOperation = "destination-in";
            btx.drawImage(image,0,0); 

            if (this.left){
                ctx.scale(-1,1);
                ctx.drawImage(buffer, -this.position.x-1.5*this.width-10, this.position.y);
                ctx.setTransform(1,0,0,1,0,0);
            }
            else {ctx.drawImage(buffer, this.position.x-5, this.position.y); }
        }
        ctx.globalAlpha = 1;

        
        if (animation.shouldStop()){ //resets 
            this.state = 'stand';} 

        //elementals 
        this.playerX = this.position.x - this.width/2 +18; 
        this.elePositions = [ [this.playerX -60, this.position.y+5], [this.playerX -40, this.position.y-35],
            [this.playerX , this.position.y-55], [this.playerX +40, this.position.y-35], [this.playerX +60, this.position.y+5] ];
        
            for (let i = 0; i<this.elementList.length; i++){ // Load elemental sprites 
                let eleType = this.elementList[i]; 
                if (!this.elementLoadedSprite[eleType]){
                    // if (this.elementState[i] = 'stand') {
                        // this.elementState[i] = 'stand';
                        if (this.state == 'swing2' ||this.state == 'swing3'){this.elementState[i]='swing1'}
                       

                    const animation = this.elementSprites[eleType].find((animation)=>animation.isFor(this.elementState[i])) // copies player state
                    this.elementLoadedSprite[eleType] = animation.getImage(pause);                  
                    
                    if (animation.shouldStop()){ //resets Attack animation
                        this.elementState[i]= 'stand';
                        this.elementSprites[eleType][2].reset() //reset 
                    } 
                }

                   
                if (!this.left){
                    ctx.scale(-1,1);
                    ctx.drawImage(this.elementLoadedSprite[eleType], -this.elePositions[i][0]-this.width-45, this.elePositions[i][1]); 
                    ctx.setTransform(1,0,0,1,0,0);}
                else (ctx.drawImage(this.elementLoadedSprite[eleType], this.elePositions[i][0]-20, this.elePositions[i][1])); 
        }
        this.elementLoadedSprite = {} //clear loaded sprites

        if (this.graveSpawn) { 
            if (this.graveY >= this.floor+35){this.graveState ='land'}
            else {this.graveY += 8}; 

            let graveAnimation = this.graveAnimations.find((animation)=>animation.isFor(this.graveState))
            let graveImage = graveAnimation.getImage(pause);
            ctx.drawImage(graveImage, this.graveX, this.graveY);
            
        }
    }

    drawProj(ctx, pause){
        this.projectiles.forEach( (object)=>object.draw(ctx, pause) ) //draw projectiles 
    }

    teleport(direction){
        if (this.lane - 1*direction>-1 && this.lane - 1*direction<3 && this.alive){
            this.position.y += this.rowHeight*direction;2
            this.lane += -1*direction; 
            this.floor =  this.gameHeight - 45 - (1+this.lane)*this.rowHeight}
    }
    update(){
        if (this.invulnTime>0){
            this.invulnTime--
            if (this.invulnTime>0){
                this.invulnDarkTime ++

                if (this.invulnDarkTime>5) {this.invulnDark = false; this.invulnDarkTime = -3}
                else if (this.invulnDarkTime>0){this.invulnDark =true};
            } else {this.invulnDark = false};
        
        }; 
        if (this.attackCD >0){this.attackCD-= (1*this.speedMulti)};
        if (this.health<=0){this.state = 'dead'; 
                this.alive= false;
                this.graveSpawn = true
                this.graveX = this.position.x+20; 
            };

        this.projectiles.forEach( (object)=>object.update() ); 
        this.projectiles = this.projectiles.filter(  //deletes projectiles
            function (object){return object.delete !== true; 
        });
        
        if (this.alive){
            if (this.speedX!=0 && !this.attackAnim.includes(this.state)){
                this.state = 'walk'; 
            } else if (this.state == 'walk') this.state = 'stand'; 

            if (this.position.x<-30) {this.position.x = -30}; //left border
            if (this.position.x>this.gameWidth-this.width) {this.position.x = this.gameWidth-this.width;} //right border
            this.curTile = Math.floor( (this.width/2 +this.position.x)/80);
            if (Math.abs(this.knockbackForce)>0) {setTimeout(()=>{this.knockbackForce=0}, 1000)};  //DR 
            if (this.knockbackForce>0){this.knockbackForce-=0.5;}
            else if (this.knockbackForce<0){this.knockbackForce+=0.5;}
            this.position.x += (this.speedX*this.speedMulti);
            this.position.x += this.knockbackForce;
            this.position.y -= this.speedY; 

        } else {      
                if (this.float>0){
                    this.position.y -=0.1*this.floatDirect;
                    this.float --;
                } else {this.float = 20; 
                        this.floatDirect = -this.floatDirect}
                
            };


        if (this.position.y > this.floor){ //bottom border (update for platforms)
            this.position.y = this.floor;
            this.speedY = 0;
            this.jump = false;
            this.gravityTime = 1; 
            if (this.alive && !this.attackAnim.includes(this.state)) this.state = 'stand';
        } 
        if (this.speedY>0){
            this.speedY-=0.5; 
        }
        if (this.jump){ //gravity
            this.position.y += 1*this.gravityTime;
            this.gravityTime+=0.5; 
            if (!this.attackAnim.includes(this.state)) this.state = 'jump';
        }
        this.hitbox = [this.position.x+15, this.position.y, this.width, this.height]; 


        //this.position.x+= 5 / deltaTime; 
    }
}

/***/ }),

/***/ "./src/projectile.js":
/*!***************************!*\
  !*** ./src/projectile.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Projectile)
/* harmony export */ });
/* harmony import */ var _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SpriteAnimation */ "./src/SpriteAnimation.js");
 

class Projectile{
    constructor(player, type='energyball',x = 0, y=0, direction = 1 ){
        this.typeInfo = { 'energyball': {'speed': 10, 'travel':2, 'explode':5, 'xOff': 90},
                        'yellowBall': {'speed': 10, 'travel':2, 'explode':5, 'xOff': 50,'yOff':35},
                        'purpleBall': {'speed': 10, 'travel':2, 'explode':5, 'xOff': 50,'yOff':35},
                        'redBall': {'speed': 10, 'travel':2, 'explode':5, 'xOff': 50,'yOff':35},
                        'greenBall': {'speed': 10, 'travel':2, 'explode':5, 'xOff': 50,'yOff':35},
                        'blueBall': {'speed': 10, 'travel':2, 'explode':5, 'xOff': 50,'yOff':35},
                        'fireball': {'speed': 3, 'travel':1, 'explode':2, 'xOff': 70, 'yOff':-10 }, 
                        'batball': {'speed': 6, 'travel':3, 'explode':4, 'xOff': 105},
                        'fireball2': {'speed': 12, 'travel':1, 'explode':3, 'xOff': 95, 'yOff':-10 },  //-15, +20
                        'poisonball': {'speed': 7, 'travel':1, 'explode':5, 'xOff':85,  'yOff':-5 },
                        'iceball': {'speed': 8, 'travel':2, 'explode':4, 'xOff':95,  'yOff':-5 },
                        'lightningball': {'speed': 10, 'travel':2, 'explode':7, 'xOff':80}, //player ball
                        'thunderball': {'speed': 12, 'travel':2, 'explode':7, 'xOff':80,'yOff':-10 } }
        
        this.gameWidth = player.gameWidth;
        this.gameHeight = player.gameHeight;
        this.width = 20; //sprite size 
        this.height = 20; 
        this.explode = false; 
        this.delete = false; 
        this.projectile = true;
        this.touchHit= true;
        this.pierce = player.pierce;
        this.owner = player;
        this.damage = player.damage * player.damageMulti; 
        this.health =1; 
        this.side = 0; 
        this.type = type; 
        this.hitList = []; 
        this.lane = player.lane;
        this.state = 'travel'; 
        this.direction = direction; 
        

        this.chill = player.chill;
        this.area = player.area; 
        this.poison = player.poison; 
        this.poisonMax = player.poisonMax;

        this.xOff = this.typeInfo[this.type]['xOff'];
        if (this.typeInfo[this.type]['yOff']){this.yOff = this.typeInfo[this.type]['yOff']}
        else this.yOff =0;

        this.createAnimations()
        
        this.left = player.left; // shoot left
        if (x == 0 && y == 0){
            this.position = {  //position 
                x: player.position.x, 
                y: player.position.y+45
            }}
        else { this.position = {
                x: x+35,
                y: y+65}
        }

        this.speed = this.typeInfo[this.type]['speed'];
        this.hitbox = [this.position.x, this.position.y, this.width, this.height]; 


    }

    createAnimations(){
        this.frames = 6; 
        this.travel = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"](this.type+'/travel_?.png', this.typeInfo[this.type]['travel'], this.frames, "travel"); //standing sprites; 
        this.burst = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"](this.type+'/explode_?.png', this.typeInfo[this.type]['explode'], this.frames, "burst", true); //walking sprites; 
        this.animations = [this.travel, this.burst]; 

        if (this.type == 'thunderball'){
            this.bolt = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"]('thunderbolt/explode_?.png', 5, this.frames, "explode", true); //   
        }
    }

    draw(ctx, pause) {
        //ctx.fillRect(this.position.x, this.position.y, this.width, this.height); // hitbox
        if (this.type != "None"){ 
            const animation = this.animations.find((animation)=>animation.isFor(this.state))
            const image = animation.getImage(pause);       
            if (this.explode){
                this.state = 'burst'
                if(this.type =='thunderball'){
                    let boltImage = this.bolt.getImage(pause); 
                    ctx.drawImage(boltImage, this.position.x, 240)
                    }

                }; 
            if (animation.shouldStop()){this.delete = true;}
    
            if (this.type=='iceball' & this.state=='burst'){this.xOff=100};
            if (!this.left){//flip based on sprite orientation
                ctx.scale(-1,1);
                ctx.drawImage(image, -this.position.x- this.xOff+15, this.position.y-60+this.yOff);}
            else {ctx.drawImage(image, this.position.x-this.xOff+35, this.position.y-60+this.yOff); }

            ctx.setTransform(1,0,0,1,0,0); 
            }
        else {
            ctx.drawImage(this.sprite, this.position.x, this.position.y+25); //draw mob (x, y, height, width)
            if (this.explode){this.delete = true}; 
        }

    } 


    update(){
        if (!this.explode){
            if (this.left){this.position.x -= this.speed;} // direction
            else this.position.x += this.speed;
        }

        
        if (this.position.x<-this.width-100) {this.delete = true };
        if (this.position.x>this.gameWidth-this.width) {this.delete = true};

        this.hitbox = [this.position.x, this.position.y+5, this.width, this.height]; 




    }

}

/***/ }),

/***/ "./src/restartScreen.js":
/*!******************************!*\
  !*** ./src/restartScreen.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ restartScreen)
/* harmony export */ });
class restartScreen{
    constructor(game){
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.width =  600;
        this.height = 170; // game.gameHeight - 3*90; 
        this.x = (game.gameWidth-this.width)/2; 
        this.y = 3;//(this.height)
        this.padding = 25; 
        this.font = "16px arial";
        this.font2 = "24px arial";
        this.display = false ; 
        this.button1 = document.createElement('button');
        this.button1.textContent = 'Return to Main';
        this.buttonX1 = this.gameWidth/2;
        this.buttonWidth = 250;
        this.buttonHeight = 50; 
        
        this.buttonPositions = [ [this.x+(this.width-this.buttonWidth)/2, this.height-this.buttonHeight-this.padding]] 
        this.buttonsList = [this.button1]
        }

        initialize(game){
            const canvas = document.getElementById('gameScreen');
            
            var elem = this;
            canvas.addEventListener('click', function(e){elem.handleClick(e, game) }, false);            
        }

        redraw(ctx){
            for (let i = 0; i<this.buttonsList.length; i++){
             this.drawButton(this.buttonsList[i], this.buttonPositions[i][0], this.buttonPositions[i][1], ctx)
            }
        }

        restartFunctions(game){
            this.display = false; 
            game.fadeOut = true;
            setTimeout(()=> {game.titleDisplay = true}, "2000") // fade out transition
           
        }


        handleClick(e, game){
            const canvas = document.getElementById('gameScreen');
            let ctx = canvas.getContext('2d'); 
            const x = e.clientX - canvas.offsetLeft;
            const y = e.clientY - canvas.offsetTop;
            
            for (let i = 0; i<this.buttonsList.length; i++){
               // this.drawButton(this.buttonsList[i], this.buttonPositions[i][0], this.buttonPositions[i][1], ctx)
                if (this.display && ctx.isPointInPath(x,y)) { //button click (only when displayed)
                    this.restartFunctions(game, i); 
                }
            }      
        }


        drawButton(e1, x, y, ctx){   
            ctx.fillStyle = 'steelblue'; //draw border
            ctx.beginPath(); //sets area for collision (isPointInPath)
            ctx.roundRect(x,y,this.buttonWidth, this.buttonHeight, 2);
            ctx.stroke();
            ctx.fill();

            ctx.font = this.font2; //draw text 
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'white';
            ctx.fillText(e1.textContent, x+this.buttonWidth/2, y+this.buttonHeight/2); 



        }

     
        displayMenu(ctx, game){ //upgrade window background
            if (this.display){
                // ctx.fillStyle = "white";
                // ctx.strokeStyle = "black";
                // ctx.lineWidth = "5"; 
                // ctx.beginPath();
                // ctx.roundRect(this.x, this.y, this.width, this.height, 2);
                // ctx.stroke();
                // ctx.fill();

                this.redraw(ctx);

                ctx.font = this.font2; //defeat 
                ctx.fillStyle = 'red';
                ctx.textAlign = 'center'; 
                ctx.fillText('Game Over!', this.gameWidth/2, this.y + 25) //victory or defeat
            }


    
                
        }
    


    
        
}

/***/ }),

/***/ "./src/startScreen.js":
/*!****************************!*\
  !*** ./src/startScreen.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ startScreen)
/* harmony export */ });
class startScreen{
    constructor(game){
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.width =  600;
        this.height = 120; // game.gameHeight - 3*90; 
        this.x = (game.gameWidth-this.width)/2; 
        this.y = 3;//(this.height)
        this.padding = 15; 
        this.font = "16px arial";
        this.font2 = "24px arial";
        this.font3 = "20px arial";
        this.display = true; 
        this.controls = ["Stop the monsters from advancing!"," - Use (WASD) to move, (J) to jump, and (K) to shoot. Use (P) to open shop. ", 
            " - Collect the coins monsters drop before they expire", 
            " - Spend mesos on upgrades & summons to bolster your defense", 
            " - Lose lives when monsters escape or touch you", " - Game over when all lives lost!"];
        this.keyboard = new Image(); 
        this.keyboard.src = 'images/bg/keyboard.png';
        this.button1 = document.createElement('button');
        this.button1.textContent = 'Start!';
        this.buttonX1 = this.gameWidth/2;
        this.buttonWidth = 65;
        this.buttonHeight = 35; 
        
        this.buttonPositions = [ [this.x+this.width- this.buttonWidth-this.padding, this.height-this.buttonHeight-this.padding]] 
        this.buttonsList = [this.button1]
        }

        initialize(game){
            const canvas = document.getElementById('gameScreen');
            
            var elem = this;
            //canvas.addEventListener('click', function(e){elem.handleClick(e, game) }, false);            
        }

        redraw(ctx){
            for (let i = 0; i<this.buttonsList.length; i++){
             this.drawButton(this.buttonsList[i], this.buttonPositions[i][0], this.buttonPositions[i][1], ctx)
            }
        }

        startFunctions(game){
            game.nextWave = true; 
            this.display = false; 
        }


        handleClick(e, game){
            const canvas = document.getElementById('gameScreen');
            let ctx = canvas.getContext('2d'); 
            const x = e.clientX - canvas.offsetLeft;
            const y = e.clientY - canvas.offsetTop;
            
            for (let i = 0; i<this.buttonsList.length; i++){
                this.drawButton(this.buttonsList[i], this.buttonPositions[i][0], this.buttonPositions[i][1], ctx)
                if (this.display && ctx.isPointInPath(x,y)) { //button click (only when displayed)
                    this.startFunctions(game, i); 
                }
            }      
        }

        drawButton(e1, x, y, ctx){   
            ctx.fillStyle = 'steelblue'; //draw border
            ctx.fillRect(x,y,this.buttonWidth,this.buttonHeight); 

            ctx.font = this.font2; //draw text 
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'white';
            ctx.fillText(e1.textContent, x+this.buttonWidth/2, y+this.buttonHeight/2); 
            ctx.beginPath(); //sets area for collision (isPointInPath)
            ctx.rect(x,y,this.buttonWidth, this.buttonHeight);       
        }

     
        displayMenu(ctx, game){ //upgrade window background
            if (this.display || game.waveFinish || game.levelFinish){
                ctx.fillStyle = "white";
                ctx.strokeStyle = "black";
                ctx.lineWidth = "5"; 
                ctx.beginPath();
                ctx.roundRect(this.x+0.3*this.width, this.height+20, 0.4*this.width, 25, 2);
                ctx.stroke();
                ctx.fill();

                ctx.font = this.font; 
                ctx.fillStyle = 'black';
                ctx.textAlign = 'center'; 
                ctx.fillText('Press [A] for upgrades', this.gameWidth/2, this.height+35) 
            }

            if (game.levelNote!=''){
                if (game.gameTimeReal - game.noteTime<4500){
                    ctx.fillStyle = "white";
                    ctx.strokeStyle = "black";
                    ctx.lineWidth = "5"; 
                    ctx.beginPath();
                    ctx.roundRect(this.x+15, this.height*0.5, this.width-30, 50, 2);
                    ctx.stroke();
                    ctx.fill();

                    ctx.font = this.font3; 
                    ctx.fillStyle = 'black';
                    ctx.textAlign = 'center'; 
                    ctx.fillText(game.levelNote, this.gameWidth/2, this.height/2+30);
                }
            }

            if (this.display || (game.pause && !game.upgrade.diplay)){
                ctx.fillStyle = "white";
                ctx.strokeStyle = "black";
                ctx.lineWidth = "5"; 
                ctx.beginPath();
                ctx.roundRect(this.x, this.y, this.width, this.height, 2);
                ctx.stroke();
                ctx.fill();
                ctx.fillStyle = 'black';
                ctx.textAlign = 'start'; 
                ctx.font = this.font;
                ctx.drawImage(this.keyboard, 180,0);
                // for (let i=0; i<this.controls.length; i++){
                    
                //     ctx.fillText(this.controls[i], this.x+this.padding, this.y+this.padding*(1+i), this.width); 
                // }
                // this.redraw(ctx); //draw start button
                //
            }   
            // if (game.storage.length>0){
            //     ctx.fillStyle = "white";
            //     ctx.strokeStyle = "black";
            //     ctx.beginPath();
            //     ctx.roundRect(this.x, this.y, this.width, this.height, 2);
            //     ctx.stroke();
            //     ctx.fill();
            //     ctx.fillStyle = 'black';
            //     ctx.textAlign = 'start'; 
            //     ctx.font = this.font2;
            //     ctx.fillText('Resummon Dragons from shop!', this.x+this.padding, this.y+this.padding) 
            // }
            // else {document.getElementById('start').innerHTML="";}
            
    
    
                
        }
    


    
        
}

/***/ }),

/***/ "./src/titleScreen.js":
/*!****************************!*\
  !*** ./src/titleScreen.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ titleScreen)
/* harmony export */ });
/* harmony import */ var _img__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./img */ "./src/img.js");

class titleScreen{
    constructor(game){
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.width =  600;
        this.height = 170; // game.gameHeight - 3*90; 
        this.bgArt = (0,_img__WEBPACK_IMPORTED_MODULE_0__["default"])('bg/bgTitle.png');
        this.x = (game.gameWidth-this.width)/2; 
        this.y = 3;//(this.height)
        this.padding = 25; 
        this.fontTitle = "48px arial";
        this.font = "18px arial";
        this.font2 = "28px arial";
        this.font3 = "24px arial";
        this.display = true; 
        this.titleLogo = "MapleTD"; 
        this.button1 = document.createElement('button');
        this.button1.textContent = 'Play';
        this.button2 = document.createElement('button');
        this.button2.textContent = 'Level Select';
        this.button3 = document.createElement('button');
        this.button3.textContent = '<';   

        this.button4 = document.createElement('button');
        this.button4.textContent = '>';  

        this.selectionY = 1;

        this.aboutText = ["Unofficial fan game developed by Christopher Lee (sirhclee@gmail.com)",
                 "All MapleStory assets used are copyrighted materials & intellectual property belonging to NEXON"];
        this.buttonWidth = 175;
        this.buttonHeight = 35; 
        this.buttonX1 = this.gameWidth/2-(this.buttonWidth/2);
        
        this.buttonPositions = [ [this.buttonX1, this.padding+this.buttonHeight + 2*this.gameHeight/3-45], 
            [this.buttonX1, this.padding+this.buttonHeight + 2*this.gameHeight/3-25]] 
        this.buttonsList = [this.button2]

        this.levelButtons = [ this.button3, this.button4]; 
        this.levelButtonWidth = 50; 
        this.levelButtonHeight = 30; 
        this.levelButtonCenter = 70;  // middle number 
        this.levelButtonPositions = [ [this.gameWidth/2-this.levelButtonCenter/2-this.levelButtonWidth, this.buttonPositions[1][1]+40], 
        [this.gameWidth/2+this.levelButtonCenter/2, this.buttonPositions[1][1]+40]]; 

        this.fade = 1;
        this.fadeDirect =-1;
        }

        initialize(game){
            const canvas = document.getElementById('gameScreen');
            
            var elem = this;
            //canvas.addEventListener('click', function(e){elem.handleClick(e, game) }, false);            
            //canvas.addEventListener('mouseover', function(e){elem.handleHover(e) }, false);
        }

        redraw(ctx){
            for (let i = 0; i<this.buttonsList.length; i++){
             this.drawButton(this.buttonsList[i], this.buttonPositions[i][0], this.buttonPositions[i][1], ctx)
            } //        this.levelButtons = [ this.button3, this.button4]; 
            //this.levelButtonPositions = [ [10, this.buttonPositions[1][1]+10], [10, this.buttonPositions[1][1]+20]]; 

            for (let i = 0; i<this.levelButtons.length; i++){
                this.drawButton(this.levelButtons[i], this.levelButtonPositions[i][0], this.levelButtonPositions[i][1], ctx)
               }          


        }


        handleClick(e, game){
            const canvas = document.getElementById('gameScreen');
            let ctx = canvas.getContext('2d'); 
            const x = e.clientX - canvas.offsetLeft;
            const y = e.clientY - canvas.offsetTop;
            
            for (let i = 0; i<this.buttonsList.length; i++){
                this.drawButton(this.buttonsList[i], this.buttonPositions[i][0], this.buttonPositions[i][1], ctx)
                if (this.display && ctx.isPointInPath(x,y)) { //button click (only when displayed)
                    if (this.buttonsList[i].textContent == "Play"){
                        game.fadeOut = true;
                        setTimeout(() =>{game.titleDisplay = false;
                            game.resetEverything(); 
                        }, 1000)}
                }
            }    

            for (let i = 0; i<this.levelButtons.length; i++){
                this.drawButton(this.levelButtons[i], this.levelButtonPositions[i][0], this.levelButtonPositions[i][1], ctx)
                if (this.display && ctx.isPointInPath(x,y)) { //button click (only when displayed)
                     if (this.levelButtons[i].textContent == "<"){ // reload bg art and level load
                        if (game.level>1){game.level--}
                    }
                    else if (this.levelButtons[i].textContent == ">"){
                        if (game.level<game.finalLevel){game.level++}
                    }
                }
            }           
            

        }


        drawButton(e1, x, y, ctx){   
            let buttonWidth = this.buttonWidth;
            let buttonHeight = this.buttonHeight;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'steelblue';
            if (e1.textContent=='Play'){
                ctx.font = this.font2;}
            else if (e1.textContent=='Level Select'){
                ctx.font = this.font3;
                //buttonHeight -=11;
                y+=10
            }
            else {ctx.font = this.font3;
                buttonWidth = this.levelButtonWidth;
                buttonHeight = this.levelButtonHeight ;}
                //draw text 
        


            ctx.beginPath();
            ctx.roundRect(x,y, buttonWidth,buttonHeight, 3) ;
            ctx.stroke();
            ctx.fill();

            ctx.fillStyle = 'white';
            ctx.fillText(e1.textContent, x+buttonWidth/2, y+buttonHeight/2); 
    
        }

     
        displayMenu(ctx, game){ //upgrade window background
                ctx.drawImage(this.bgArt, 0,0); 
                

                ctx.beginPath();
                ctx.fillStyle= 'white';
                ctx.roundRect(this.levelButtonPositions[0][0]+ 10+ this.levelButtonWidth,this.levelButtonPositions[0][1],
                    this.levelButtonWidth, this.levelButtonHeight, 3) ;
                // ctx.stroke();
                ctx.fill();

               ctx.fillStyle= 'black';
               ctx.fillText(game.level,  this.levelButtonPositions[0][0]+this.levelButtonCenter+15,  this.levelButtonPositions[0][1]+18); 

                this.redraw(ctx); //draw start button

                ctx.save();
                ctx.shadowOffsetX=1;
                ctx.shadowOffsetY=1;
                ctx.shadowColor="black";
                ctx.shadowBlur= 4; 
                
                ctx.textAlign = 'center';
                ctx.font =  this.fontTitle; 
                ctx.fillStyle= 'white';
                ctx.fillText(this.titleLogo, this.gameWidth/2, this.gameHeight/3);

                const canvas = document.getElementById('gameScreen');

                ctx.font =  this.font; //about
                ctx.globalAlpha = this.fade; 
                ctx.fillText('Use arrow keys to select level', this.gameWidth/2,this.gameHeight/2+55); 
                ctx.fillText('Press any other key to start', this.gameWidth/2,this.gameHeight/2+75); 
                this.fade-=0.015*this.fadeDirect ;
                if (this.fade<0.5 || this.fade>1){this.fadeDirect = -this.fadeDirect }
                ctx.globalAlpha = 1;

                for (let i=0; i<this.aboutText.length; i++){ 
                    ctx.fillText(this.aboutText[i], this.gameWidth/2,this.gameHeight-35+15*i); 
                    //ctx.strokeText(this.aboutText[i],this.gameWidth/2,this.gameHeight-35+15*i)
                }
                ctx.restore();

    
                //ctx.strokeStyle ="black"; 
                // ctx.lineWidth=5;
                // ctx.beginPath();
                // ctx.roundRect(this.buttonPositions[0][0], this.buttonPositions[0][1], this.buttonWidth, this.buttonHeight, 3) ;
                // ctx.stroke();

                //
            // else {document.getElementById('start').innerHTML="";}
            
    
    
                
        }
    


    
        
}

/***/ }),

/***/ "./src/upgrade.js":
/*!************************!*\
  !*** ./src/upgrade.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Upgrade)
/* harmony export */ });

class Upgrade{
    constructor(game){
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.width =  650;
        this.height = 230; // game.gameHeight - 3*90;
        this.x = (game.gameWidth-this.width)/2; 
        this.y = 3;//(this.height)
        this.display = false; 
        this.padding = 15; 
        this.paddingY = 4;
        this.buttonWidth = 170;
        this.buttonHeight = 36;
        this.font = "13px arial";              
        this.font2 = "14px arial";  

        this.button1 = document.createElement('button');
        this.button1.textContent = 'Summon Red Dragon';
        this.button1.value = 'redDragon';
        this.button2 = document.createElement('button');
        this.button2.textContent = 'Summon Blue Dragon';
        this.button2.value = 'blueDragon';
        this.button3 = document.createElement('button');
        this.button3.textContent = 'Summon Green Dragon';
        this.button3.value = 'greenDragon';
        this.button4 = document.createElement('button');
        this.button4.textContent = 'Summon Black Dragon';
        this.button4.value = 'blackDragon';
        this.button10 = document.createElement('button');
        this.button10.textContent = 'WIP';
        this.button10.value = 'mushroomKnight';
        this.buttonX1 = this.x + this.padding; 
        this.nameHash = {'redDragon':'Red Dragon', 'blueDragon':'Blue Dragon',
        'greenDragon':'Green Dragon', 'blackDragon':'Black Dragon', 'mushroomKnight': 'Mushroom Knight'};
        this.summonList = ['redDragon', 'blueDragon','greenDragon','blackDragon'];
        this.elementList = ['Blaze','Dawn','Night','Wind','Thunder'];

        this.button5 = document.createElement('button');
        this.button5.textContent = 'Blaze Sprite'; //Blaze - Flame 
        this.button5.value = "Blaze";
        this.button6 = document.createElement('button');
        this.button6.textContent = 'Dawn Sprite '; //Dawn - Light 
        this.button6.value = "Dawn";
        this.button7 = document.createElement('button'); 
        this.button7.textContent = 'Night Sprite'; //Night - Dark
        this.button7.value = "Night";
        this.button8 = document.createElement('button');
        this.button8.textContent = 'Wind Sprite ';  //Wind - Storm
        this.button8.value = "Wind";
        this.button9 = document.createElement('button'); 
        this.button9.textContent = 'Thunder Sprite'; //Thunder - Lightning       
        this.button9.value = "Thunder"; 
        this.buttonX2 =  this.buttonX1 + this.buttonWidth+ this.padding ; 
        this.buttonPositions = [ [this.buttonX1, 0], [this.buttonX1,1], [this.buttonX1,2], [this.buttonX1,3],  [this.buttonX1,4], 
                 [this.buttonX2,0], [this.buttonX2,1], [this.buttonX2,2], [this.buttonX2,3], [this.buttonX2,4]  ]; 
        this.buttonsList = [this.button1, this.button2, this.button3, this.button4, this.button10,
                    this.button5, this.button6, this.button7, this.button8, this.button9]; 
       this.note = "Press [S] to buy, [A] to close menu"; 
       

        this.costPosition = this.buttonX2 + this.buttonWidth+ 2.5*this.padding; 
        this.costHeight = 20; 
        this.costWidth = 275; 
        this.costPadding = 4; 

        this.selectionX = 1;
        this.selectionY = 1;
        this.descriptionText = [];
        this.purchaseDescription = __webpack_require__(/*! ./purchase.json */ "./src/purchase.json"); 

        
    }

    initialize(game){
        const canvas = document.getElementById('gameScreen');
        let ctx = canvas.getContext('2d'); 
        document.addEventListener('focus', this.redraw(ctx), true); 
        var elem = this;
        canvas.addEventListener('click', function(e){elem.handleClick(e, game) }, false);
    }

    redraw(ctx, game ){
        let buttonDraw = this.buttonsList.length; 
       for (let i = 0; i<buttonDraw ; i++){
        this.drawButton(this.buttonsList[i], this.buttonPositions[i][0], 2*this.paddingY+(this.buttonHeight+this.paddingY)*this.buttonPositions[i][1], ctx, game)
       }
    }

    upgradeFunctions(game, button){
        //resummon;
        if (game.storage.find(obj=> (obj.type === button.value))){
            game.resummon(button.value);
            let unit = game.playerObjects.find(obj=> (obj.type === button.value));
            button.textContent =  'Upgrade '+this.nameHash[button.value]+ ' (Lvl '+unit.level+')';
        }
        else if (game.playerObjects.find(obj=> (obj.type === button.value))){ //upgrade summons 
            let unit = game.playerObjects.find(obj=> (obj.type === button.value));
            unit.levelUp(game.player); //add cost 
            console.log(unit.level);
            
            if (unit.level<5){
            button.textContent =  'Upgrade '+this.nameHash[button.value]+ ' (Lvl '+unit.level+')';}
            else {button.textContent =  this.nameHash[button.value]+ ' (Lvl '+unit.level+')' }
        } 

        else if (this.summonList.includes(button.value)){
            if (button.value !='mushroomKnight'){
                game.createMob(game.player, button.value, 0, game); //summons ;
                if (game.playerObjects.find(obj=> (obj.type === button.value))){ //checks if created successfully 
                    button.textContent = 'Upgrade '+this.nameHash[button.value]+ ' (Lvl 1)';
                }}
            }
        else if (this.elementList.includes(button.value)){
                game.addElement(button.value); //elements
            }   
        // else if (button.textContent=='Next Wave!') game.nextWave = true; //next wave button

    }

    handleClick(e, game){
        const canvas = document.getElementById('gameScreen');
        let ctx = canvas.getContext('2d'); 
        const x = e.clientX - canvas.offsetLeft;
        const y = e.clientY - canvas.offsetTop;
    
        let buttonDraw = this.buttonsList.length; 
        if (!game.waveFinish){buttonDraw-=1}; 
        for (let i = 0; i<buttonDraw ; i++){
            // this.drawButton(this.buttonsList[i], this.buttonPositions[i][0], this.paddingY+(this.buttonHeight+this.paddingY)*this.buttonPositions[i][1], ctx, game)
            
            if (this.display && ctx.isPointInPath(x,y)) { //button click (only when displayed)
                this.buttonsList[i].focus(); 
                this.upgradeFunctions(game, this.buttonsList[i]); 
            }
        }
    
    }


    drawButton(e1, x, y, ctx, game){   
        let buttonColor ='steelblue';
        let textColor ='white';
        let cost = 0; 
        if (game){
            if (this.buttonX1==x) { //summon buttons //check cost (if first or upgrade)
                if (game.playerObjects.find(obj=> (obj.type === e1.value))){
                    let unit = game.playerObjects.find(obj=> (obj.type === e1.value));
                    cost = game.player.upgradeCost[unit.level];
                }
                else ( cost = game.player.summonCost[game.player.summonCount]);
               
                if (game.player.money< cost){
                    
                    buttonColor = 'lightgrey';
                    textColor = 'darkgrey'; 
                }
            }
            else if (this.buttonX2==x){ //elements
                cost = game.player.elementCost[game.player.elementList.length];
                if (game.player.money<game.player.elementCost[game.player.elementList.length] || 
                    game.player.elementList.length >=5){
                    buttonColor = 'lightgrey';
                    textColor = 'darkgrey'; 
                    }
                }    
            }
            
        ctx.fillStyle = buttonColor;  //button background
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.roundRect(x,y,this.buttonWidth, this.buttonHeight, 3); 
        ctx.stroke();
        ctx.fill();
       
        ctx.font =  this.font; 
        ctx.textAlign = 'center'; //button text 
        ctx.fillStyle = textColor;
        if (game){
             if (game.storage.length>0){

                let test = game.storage.find(obj=> obj.type==e1.value); 
                if (test){ 
                    e1.textContent = 'Resummon Lvl '+test.level+' '+this.nameHash[e1.value]; 
                    cost = 0; 
                }
            }
            }

        ctx.fillText(e1.textContent, x+this.buttonWidth/2, y+this.buttonHeight/3); 
        if (cost && e1.value!='mushroomKnight'){
            ctx.fillText('('+cost+' mesos)', x+this.buttonWidth/2, y+2*this.buttonHeight/3);}
        //else { ctx.fillText('MAX', x+this.buttonWidth/2, y+2*this.buttonHeight/3);}

        ctx.beginPath(); //collision path 
        ctx.rect(x,y, this.buttonWidth, this.buttonHeight); 
        
    }

    toggleMenu(game){ 
        this.display = !this.display; 
        if (this.display){game.pause = true}
        else game.pause = false
    }

    purchase(game){
        let i = (this.selectionX-1)*5 + (this.selectionY-1);
        this.upgradeFunctions(game, this.buttonsList[i]); 
    }

    selectedDescrip(){
        let i = (this.selectionX-1)*5 + (this.selectionY-1);
        this.descriptionText = this.purchaseDescription[this.buttonsList[i].value]; 
    }

    displayMenu(ctx, game){ //upgrade window background
        if (this.display){
            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            ctx.beginPath();
            ctx.roundRect(this.x, this.y, this.width, this.height, 3); //white window
            ctx.stroke();
            ctx.fill();
            this.redraw(ctx, game); //draw button

            ctx.fillStyle = "#282828";
            ctx.beginPath();
            ctx.roundRect(this.costPosition-2*this.padding, 2*this.paddingY, 
                    this.costWidth, this.costHeight*11, 3);
            ctx.stroke();
            ctx.fill();

            ctx.fillStyle = 'white';
            ctx.textAlign = 'center'; 
            ctx.font =  this.font2; 

            ctx.beginPath(); //selection 
            ctx.strokeStyle = "green";
            ctx.lineWidth = "5"; 
            ctx.roundRect(this.buttonX1 + (this.selectionX-1)*(this.buttonWidth+ this.padding), 
                2*this.paddingY+(this.buttonHeight+this.paddingY)*(this.selectionY-1), 
                this.buttonWidth,this.buttonHeight, 3);
            ctx.stroke();

            this.selectedDescrip(); //shows selected summon detail 
            ctx.font =  this.font2; 
            ctx.textAlign = 'left';
            for (let i=0; i<this.descriptionText.length; i++){
                ctx.fillText(this.descriptionText[i], this.costPosition-25,
                6*this.paddingY+(this.costPadding+this.costHeight)*i); 
            } 

            //stats          this.damageMulti = 1; 
        // this.pickupMutli = 1;
        // this.knockbackMulti = 1;
        // this.speedMulti = 1; 
        // this.pierce = 0; 

            ctx.font =  this.font2; 
            ctx.textAlign = 'left';
            ctx.fillText('Damage: x'+game.player.damageMulti.toFixed(1), this.costPosition-25, 6*this.paddingY+(this.costPadding+this.costHeight)*7);       
            ctx.fillText('Speed: x'+game.player.speedMulti.toFixed(1), this.costPosition-25, 6*this.paddingY+(this.costPadding+this.costHeight)*7.6); 
            ctx.fillText('Knockback: x'+game.player.knockbackMulti.toFixed(1), this.costPosition-25, 6*this.paddingY+(this.costPadding+this.costHeight)*8.2); 
            ctx.fillText('Pierce: '+game.player.pierce, this.costPosition+100, 6*this.paddingY+(this.costPadding+this.costHeight)*7); 
            ctx.fillText('Loot Radius: x'+game.player.lootMulti.toFixed(1), this.costPosition+100, 6*this.paddingY+(this.costPadding+this.costHeight)*7.6); 


                


            ctx.textAlign = 'left';
            ctx.font =  this.font2; 
            ctx.fillStyle= 'black';
            ctx.fillText(this.note, this.buttonX1+10, this.height-10);

            if (game.error){
                ctx.textAlign = 'left';
                ctx.font =  this.font2; 
                ctx.fillStyle= 'red';
                ctx.fillText('Space occupied!', this.width-220, this.height-10); 
                setTimeout(()=> {game.error=false;}, "3000") ;

            }

        }
        else {document.getElementById('menu').innerHTML="";}
        


            
    }

}

/***/ }),

/***/ "./src/mobInfo.json":
/*!**************************!*\
  !*** ./src/mobInfo.json ***!
  \**************************/
/***/ ((module) => {

module.exports = JSON.parse('{"target":{"speed":"0.1","health":"100","stand":0,"walk":5,"die":5,"angry":12,"sprite":"mob","spriteType":["stumpy"],"proj":"batball","atkSpd":300,"damage":1,"range":500,"value":100},"zombie":{"speed":"0.1","health":"1000","stand":2,"walk":2,"die":10,"angry":9,"sprite":"mob","atkSpd":100,"damage":1,"value":5},"spore":{"speed":"1","health":"2","stand":2,"walk":2,"die":3,"sprite":"mob","value":1},"orangeMushroom":{"speed":"1","health":"4","stand":1,"walk":2,"die":2,"sprite":"mob","value":5},"greenMushroom":{"speed":"2","health":"1","stand":1,"walk":2,"die":2,"sprite":"mob","value":3},"blueMushroom":{"speed":"1","health":"8","stand":1,"walk":2,"die":2,"sprite":"mob","value":10},"hornyMushroom":{"speed":"2","health":"3","stand":2,"walk":2,"die":3,"sprite":"mob","value":2},"mushmom":{"speed":"0.3","health":"250","stand":0,"walk":5,"die":5,"angry":12,"aggro":true,"sprite":"mob","boss":"true","yOff":-10,"atkSpd":200,"damage":1,"range":350,"value":[50,50,50,50,50]},"goldMushroom1":{"speed":"3","health":"3","stand":1,"walk":2,"die":2,"sprite":"mob","spriteType":["goldMushroom"],"value":[20,20,20,20,20]},"stump":{"speed":"1","health":"10","stand":0,"walk":3,"die":2,"sprite":"mob","value":10},"darkStump":{"speed":"1","health":"18","stand":0,"walk":3,"die":2,"sprite":"mob","value":15},"axeStump":{"speed":"1","health":"15","stand":0,"walk":3,"die":3,"sprite":"mob","value":15},"ghostStump":{"speed":"0.75","health":"15","stand":0,"walk":3,"die":2,"angry":6,"aggro":true,"atkSpd":250,"damage":1,"range":600,"proj":"fireball","sprite":"mob","value":20},"boar":{"speed":"2.5","health":"10","stand":0,"walk":2,"die":1,"height2":18,"sprite":"mob","value":10},"fireBoar":{"speed":"3.5","health":"10","stand":0,"walk":2,"die":1,"sprite":"mob","height2":18,"value":15},"ironBoar":{"speed":"1.5","health":"30","stand":0,"walk":1,"die":1,"sprite":"mob","height2":18,"value":30},"goldMushroom2":{"speed":"3.5","health":"10","stand":1,"walk":2,"die":2,"sprite":"mob","spriteType":["goldMushroom"],"value":[50,50,50,50,50]},"stumpy":{"speed":"0.5","health":"750","stand":0,"walk":5,"die":9,"angry":13,"aggro":true,"sprite":"mob","boss":"true","proj":"batball","atkSpd":100,"damage":5,"range":600,"value":[80,80,80,80,80]},"neckiJr":{"speed":"2.5","health":"10","stand":0,"walk":2,"die":2,"sprite":"mob","height":50,"height2":35,"width2":25,"value":15},"stirge":{"speed":"2.5","health":"20","stand":0,"walk":1,"die":3,"sprite":"mob","roam":true,"value":15},"bubbling":{"speed":"1.5","health":"20","stand":0,"walk":6,"die":3,"sprite":"mob","value":15},"octopus":{"speed":"3","health":"70","stand":0,"walk":4,"die":3,"sprite":"mob","weird":true,"value":20},"wraith":{"speed":"4","health":"70","stand":0,"walk":3,"die":5,"width2":-20,"damage":2,"sprite":"mob","flip":true,"roam":true,"value":50},"jrWraith":{"speed":"4","health":"35","stand":0,"walk":3,"die":5,"sprite":"mob","flip":true,"value":25},"shade":{"speed":"3","health":"200","stand":0,"walk":5,"die":5,"damage":999,"sprite":"mob","roam":true,"flip":true,"value":[100,100,100,100,100]},"goldMushroom3":{"speed":"3","health":"25","stand":1,"walk":2,"die":2,"sprite":"mob","spriteType":["goldMushroom"],"value":[100,100,100,100,100]}}');

/***/ }),

/***/ "./src/purchase.json":
/*!***************************!*\
  !*** ./src/purchase.json ***!
  \***************************/
/***/ ((module) => {

module.exports = JSON.parse('{"redDragon":["Summons a Red Dragon to spit hot fire","","Level 1: Baby Dragon","Level 2: +30% Damage & +1 Projectile","Level 3: Evolve! Adds explosion damage","Level 4+: Increase explosion area + 1 Proj."],"blueDragon":["Summons a Blue Dragon to spew frost","","Level 1: Baby Dragon","Level 2: +1 Pierce & +1 Projectile","Level 3: Evolve! Adds chill effect","Level 4+: Increase chill effect + 1 Proj."],"greenDragon":["Summons a Green Dragon to spread poison","","Level 1: Baby Dragon","Level 2: +1 Projectile","Level 3: Evolve! Adds poison damage","Level 4+: Increase poison effect + 1 Proj."],"blackDragon":["Summons a Black Dragon to shoot bolts","","Level 1: Baby Dragon","Level 2: +20% Damage & +1 Projectile","Level 3: Evolve! Adds thunder pillar damage","Level 4+: Increase thunder area + 1 Proj."],"mushroomKnight":["Under development"],"Blaze":["Summons Elemental: Blaze","","Adds +1 projectile to attacks","Wiz & Elementals deal +40% damage","","Additional sprites further increase bonus"],"Dawn":["Summons Elemental: Dawn","","Adds +1 projectile to attacks","Wiz & Elementals deal +20% damage","Increases pick-up range by 50%","","Additional sprites further increase bonus"],"Night":["Summons Elemental: Night","","Adds +1 projectile to attacks","Wiz & Elementals deal +20% damage","Increases knockback effect by 20%","","Additional sprites further increase bonus"],"Wind":["Summons Elemental: Wind","","Adds +1 projectile to attacks","Increases speed by 20%","","Additional sprites further increase bonus"],"Thunder":["Summons Elemental: Dawn","","Adds +1 projectile to attacks","Wiz & Elementals deal +15% damage","Wiz & Elementals projectiles gain +1 pierce","","Additional sprites further increase bonus"]}');

/***/ }),

/***/ "./src/summonInfo.json":
/*!*****************************!*\
  !*** ./src/summonInfo.json ***!
  \*****************************/
/***/ ((module) => {

module.exports = JSON.parse('{"redDragon":{"speed":"0","proj":["redBall","fireball2"],"name":"Red Dragon","stand":[7,9],"walk":0,"die":0,"angry":[3,6],"sprite":"pet","xOff":-55,"yOff":-48,"emote":{"0":[["ignore",3,2000],["bewildered",3,1500],["sit",4,5000],["sleep",4,8000],["cry",3,5000],["turn",8,3200]],"1":[["nothing",4,1500],["bewildered",4,1500],["sit",5,5000],["sleep",5,8000],["cry",4,5000],["nothing",4,1500]]},"spriteType":["redDragonBaby","redDragon"],"atkSpd":100,"damage":2,"value":100},"blueDragon":{"speed":"0","proj":["blueBall","iceball"],"name":"Blue Dragon","stand":[7,9],"walk":0,"die":0,"angry":[3,6],"sprite":"pet","xOff":-55,"yOff":-48,"emote":{"0":[["ignore",3,2000],["bewildered",3,1500],["sit",4,5000],["sleep",4,8000],["cry",3,5000],["turn",8,3200]],"1":[["nothing",4,1500],["bewildered",4,1500],["sit",5,5000],["sleep",5,8000],["cry",4,5000],["nothing",4,1500]]},"spriteType":["blueDragonBaby","blueDragon"],"atkSpd":100,"damage":2,"value":100},"greenDragon":{"speed":"0","proj":["greenBall","poisonball"],"name":"Green Dragon","stand":[7,9],"walk":0,"die":0,"angry":[3,6],"sprite":"pet","xOff":-55,"yOff":-48,"spriteType":["greenDragonBaby","greenDragon"],"emote":{"0":[["ignore",3,2000],["bewildered",3,1500],["sit",4,5000],["sleep",4,8000],["cry",3,5000],["turn",8,3200]],"1":[["nothing",4,1500],["bewildered",4,1500],["sit",5,5000],["sleep",5,8000],["cry",4,5000],["nothing",4,1500]]},"atkSpd":100,"damage":2,"value":100},"blackDragon":{"speed":"0","proj":["yellowBall","thunderball"],"name":"Black Dragon","stand":[7,9],"walk":0,"die":0,"angry":[3,6],"sprite":"pet","xOff":-55,"yOff":-48,"spriteType":["blackDragonBaby","blackDragon"],"emote":{"0":[["ignore",3,2000],["bewildered",3,1500],["sit",4,5000],["sleep",4,8000],["cry",3,5000],["turn",8,3200]],"1":[["sigh",6,760],["bewildered",4,1500],["sit",7,5000],["sleep",6,8000],["cry",4,5000],["sigh",6,750]]},"atkSpd":100,"damage":2,"value":100},"mushroomKnight":{"speed":"0","health":25,"name":"Mushroom Knight","stand":5,"walk":0,"die":0,"angry":10,"sprite":"mob","atkSpd":200,"damage":5,"value":100,"xOff":-135,"yOff":-40}}');

/***/ }),

/***/ "./src/waveInfo.json":
/*!***************************!*\
  !*** ./src/waveInfo.json ***!
  \***************************/
/***/ ((module) => {

module.exports = JSON.parse('{"level1":["wave1-1","wave1-2","wave1-3","wave1-4","wave1-5","wave1-6","wave1-7","wave1-8","wave1-9","wave1-10"],"level2":["wave2-1","wave2-2","wave2-3","wave2-4","wave2-5","wave2-6","wave2-7","wave2-8","wave2-9","wave2-10"],"level3":["wave3-1","wave3-2","wave3-3","wave3-4","wave3-5","wave3-6","wave3-7","wave3-8","wave3-9","wave3-10"],"wave1-0":[["spore",2,2]],"wave1-1":[["spore",2,2],["spore",2,3],["spore",2,4],["spore",2,5],["spore",2,6],["spore",1,10],["spore",1,11],["spore",1,12],["spore",1,13],["spore",1,14]],"wave1-2":[["spore",2,2],["spore",2,3],["spore",2,4],["orangeMushroom",2,6],["spore",1,10],["spore",1,11],["spore",1,12],["orangeMushroom",1,14],["spore",1,18],["spore",1,19],["spore",1,20],["orangeMushroom",1,22]],"wave1-3":[["greenMushroom",2,3],["greenMushroom",3,4],["spore",2,5],["spore",2,6],["spore",2,7],["greenMushroom",1,10],["greenMushroom",3,11],["spore",1,12],["spore",1,13],["spore",1,14],["greenMushroom",3,17],["greenMushroom",1,18],["spore",3,19],["spore",3,20],["spore",3,21]],"wave1-4":[["greenMushroom",2,3],["greenMushroom",3,4],["orangeMushroom",2,5],["orangeMushroom",2,7],["greenMushroom",1,10],["greenMushroom",3,11],["orangeMushroom",1,12],["orangeMushroom",1,14],["greenMushroom",3,17],["greenMushroom",1,18],["orangeMushroom",3,19],["orangeMushroom",3,21]],"wave1-5":[["greenMushroom",2,3],["greenMushroom",3,4],["orangeMushroom",2,5],["blueMushroom",2,8],["greenMushroom",1,10],["greenMushroom",3,11],["orangeMushroom",1,12],["blueMushroom",1,15],["greenMushroom",3,17],["greenMushroom",1,18],["orangeMushroom",3,19],["blueMushroom",3,22]],"wave1-6":[["spore",2,2],["spore",2,2.5],["spore",2,3],["spore",2,3.5],["spore",2,4],["spore",2,4.5],["spore",2,5],["spore",2,5.5],["spore",2,6],["spore",2,6.5],["blueMushroom",1,7],["orangeMushroom",[0,2],10],["spore",1,11],["spore",1,11.5],["spore",1,12],["spore",1,12.5],["spore",1,13],["spore",3,17],["spore",3,17.5],["spore",3,18],["spore",3,18.5],["spore",3,19],["blueMushroom",[0,2],25]],"wave1-7":[["blueMushroom",2,2],["blueMushroom",2,4],["blueMushroom",2,6],["greenMushroom",2,8],["greenMushroom",3,13],["blueMushroom",3,16],["blueMushroom",3,18],["blueMushroom",3,20],["greenMushroom",2,22],["greenMushroom",1,27],["blueMushroom",1,30],["blueMushroom",1,32],["blueMushroom",1,34],["greenMushroom",3,36],["greenMushroom",[0,1,2],44]],"wave1-8":[["blueMushroom",3,2],["blueMushroom",3,3],["blueMushroom",3,4],["orangeMushroom",3,5],["blueMushroom",3,6],["greenMushroom",2,8],["greenMushroom",3,13],["orangeMushroom",1,14],["blueMushroom",2,16],["orangeMushroom",2,17],["blueMushroom",2,18],["blueMushroom",2,19],["greenMushroom",2,22],["greenMushroom",1,27],["orangeMushroom",3,28],["blueMushroom",1,30],["orangeMushroom",1,31],["blueMushroom",1,32],["blueMushroom",1,33],["blueMushroom",1,34],["greenMushroom",3,36],["greenMushroom",[0,1,2],44]],"wave1-9":[["blueMushroom",[1,2],3],["orangeMushroom",[1,2],4],["blueMushroom",[1,2],5],["orangeMushroom",[1,2],5],["blueMushroom",[1,2],6],["greenMushroom",[1,2],14],["blueMushroom",2,20],["orangeMushroom",2,21],["blueMushroom",2,22],["goldMushroom1",1,23],["blueMushroom",2,24],["greenMushroom",3,28],["blueMushroom",1,35],["orangeMushroom",1,36],["blueMushroom",1,37],["orangeMushroom",1,38],["blueMushroom",1,39],["greenMushroom",3,37]],"wave1-10":[["mushmom",2,1],["orangeMushroom",[0,2],10],["orangeMushroom",[0,2],12],["blueMushroom",[0,2],14],["orangeMushroom",[0,2],16],["orangeMushroom",[0,2],18],["orangeMushroom",[0,2],24],["orangeMushroom",[0,2],26],["blueMushroom",[0,2],28],["orangeMushroom",[0,2],30],["orangeMushroom",[0,2],32]],"wave2-1":[["stump",[0,1,2],2],["stump",[0,1,2],3],["stump",[0,1,2],4],["stump",[0,1,2],16],["stump",[0,1,2],17],["stump",[0,1,2],18],["stump",[0,1,2],30],["stump",[0,1,2],31],["stump",[0,1,2],32]],"wave2-2":[["stump",[0,1,2],2],["stump",[0,1,2],3],["darkStump",[0,1,2],4],["stump",[0,1,2],16],["darkStump",[0,1,2],17],["stump",[0,1,2],18],["darkStump",[0,1,2],30],["stump",[0,1,2],31],["stump",[0,1,2],32]],"wave2-3":[["stump",1,2],["darkStump",3,2],["stump",1,4],["darkStump",3,4],["stump",1,6],["darkStump",3,6],["stump",1,18],["darkStump",2,18],["stump",1,20],["darkStump",2,20],["stump",1,22],["darkStump",2,22],["stump",3,34],["darkStump",1,34],["stump",3,36],["darkStump",1,36],["stump",3,38],["darkStump",1,38]],"wave2-4":[["stump",[0,1,2],2],["stump",[0,1,2],3],["darkStump",[0,1,2],4],["ghostStump",1,5],["stump",[0,1,2],12],["stump",[0,1,2],13],["darkStump",[0,1,2],14],["ghostStump",2,15],["stump",[0,1,2],22],["stump",[0,1,2],23],["darkStump",[0,1,2],24],["ghostStump",3,25]],"wave2-5":[["stump",[0,1,2],2],["ghostStump",[1,2],3],["darkStump",[0,2],3],["darkStump",[0,1,2],4],["ghostStump",1,5],["stump",[0,1,2],12],["ghostStump",[0,1],3],["darkStump",3,3],["darkStump",[0,1,2],14],["ghostStump",2,15],["stump",[0,1,2],22],["ghostStump",[1,2],23],["darkStump",[0,1],24],["ghostStump",3,25]],"wave2-6":[["boar",2,2],["boar",2,2.25],["boar",2,2.5],["boar",2,2.75],["boar",2,3],["boar",2,3.25],["boar",2,3.5],["boar",2,3.75],["boar",2,4],["boar",2,4.25],["boar",2,4.5],["boar",2,4.75],["boar",2,5],["boar",2,5.25],["boar",2,5.5],["boar",2,5.75],["boar",2,6],["boar",2,6.25],["boar",2,6.5],["boar",2,6.75],["boar",2,7]],"wave2-7":[["fireBoar",2,2],["fireBoar",2,2.5],["fireBoar",2,3],["fireBoar",2,3.5],["boar",[0,1,2],7.5],["boar",[0,1,2],13],["boar",[0,1,2],13.25],["boar",[0,1,2],13.5],["boar",[0,1,2],13.75],["ironBoar",2,16],["fireBoar",[0,2],22],["fireBoar",[0,2],24],["fireBoar",[0,2],26],["ironBoar",2,30]],"wave2-8":[["darkStump",[0,1,2],3],["darkStump",[0,1,2],3.5],["darkStump",[0,1,2],4],["fireBoar",[0,1,2],4.5],["fireBoar",[0,1,2],5],["ironBoar",[0,1,2],9],["goldMushroom2",2,10],["darkStump",[0,1,2],15],["darkStump",[0,1,2],15.5],["darkStump",[0,1,2],16],["ghostStump",[0,2],17],["boar",[0,1,2],24],["boar",[0,1,2],24.25],["boar",[0,1,2],24.5],["ghostStump",[0,2],24]],"wave2-9":[["darkStump",[0,1,2],3],["darkStump",[0,1,2],3.5],["ghostStump",[0,1,2],4],["darkStump",[0,1,2],4.5],["darkStump",[0,1,2],5],["darkStump",[0,1,2],5.5],["ironBoar",[0,1,2],11],["ironBoar",[0,1,2],12],["ghostStump",[0,1,2],14],["darkStump",[0,1,2],18],["darkStump",[0,1,2],18.5],["ghostStump",[0,1,2],19],["ironBoar",[0,1,2],22],["ironBoar",[0,1,2],24],["ironBoar",[0,1,2],26]],"wave2-10":[["stumpy",2,3],["ghostStump",[0,1,2],5],["boar",[0,2],6],["boar",[0,2],7],["boar",[0,2],8],["ghostStump",[0,1,2],14],["fireBoar",[0,1,2],17],["fireBoar",[0,1,2],19],["ironBoar",[0,1,2],26],["ghostStump",2,27],["ghostStump",[0,2],29],["fireBoar",1,31],["fireBoar",2,32],["fireBoar",3,33],["ghostStump",2,34],["fireBoar",[0,1,2],40],["ironBoar",[0,1,2],42]],"wave3-1":[["neckiJr",3,2],["neckiJr",2,3],["neckiJr",1,4],["bubbling",[0,1,2],4],["bubbling",[0,1,2],5],["bubbling",[0,1,2],6],["neckiJr",1,10],["neckiJr",2,11],["neckiJr",3,12],["bubbling",2,15],["bubbling",2,15.5],["bubbling",2,16],["bubbling",2,16.5],["neckiJr",[0,2],15],["neckiJr",[0,2],17]],"wave3-2":[["neckiJr",1,2],["neckiJr",2,3],["neckiJr",3,4],["bubbling",[0,1],4],["bubbling",[0,1],4.5],["bubbling",[0,1],5],["bubbling",[0,1],5.5],["neckiJr",3,7],["neckiJr",3,13],["bubbling",3,15],["bubbling",3,15.5],["bubbling",3,16],["bubbling",3,16.5],["bubbling",3,17],["bubbling",3,17.5],["neckiJr",[0,1],19],["neckiJr",[0,1],21],["neckiJr",[0,1],23]],"wave3-3":[["stirge",[0,2],1],["stirge",[0,2],1.5],["bubbling",2,2],["bubbling",2,2.5],["bubbling",2,3],["bubbling",2,4],["bubbling",2,4.5],["bubbling",2,5],["bubbling",2,6],["bubbling",2,6.5],["bubbling",2,7],["stirge",[0,1,2],8],["stirge",[0,1,2],10],["stirge",[0,1,2],12],["bubbling",[0,2],13],["stirge",2,13.5],["bubbling",[0,2],14],["stirge",2,14.5],["bubbling",[0,2],15]],"wave3-4":[["octopus",[0,1,2],2],["bubbling",2,7],["bubbling",2,7.5],["bubbling",2,8],["neckiJr",1,9],["neckiJr",2,9.5],["neckiJr",3,10],["stirge",[0,1,2],10],["bubbling",3,16],["bubbling",2,16.5],["bubbling",2,17],["neckiJr",3,18],["neckiJr",2,18.5],["neckiJr",1,19],["stirge",[0,1,2],16],["octopus",[0,1,2],23],["bubbling",1,24],["bubbling",1,24.5],["bubbling",1,25],["bubbling",1,25.5],["stirge",[0,1,2],27]],"wave3-5":[["octopus",1,2],["bubbling",2,2.5],["bubbling",2,3],["bubbling",2,3.5],["bubbling",2,4],["neckiJr",3,5],["neckiJr",3,6],["neckiJr",3,7],["octopus",1,5],["bubbling",2,5.5],["bubbling",2,5.5],["bubbling",2,6],["bubbling",2,6.5],["octopus",2,10],["stirge",[0,1,2],15],["octopus",[1,2],18],["bubbling",1,18.5],["bubbling",1,19],["bubbling",1,19.5],["bubbling",1,20],["octopus",[1,2],20],["stirge",[0,1,2],25],["neckiJr",2,27],["neckiJr",2,27.5],["neckiJr",2,28]],"wave3-6":[["jrWraith",2,3],["jrWraith",2,4],["jrWraith",2,5],["jrWraith",2,6],["jrWraith",[0,2],18],["jrWraith",[0,2],19],["jrWraith",[0,2],20],["jrWraith",[0,2],21],["wraith",2,24],["jrWraith",2,25],["jrWraith",2,26],["jrWraith",2,27]],"wave3-7":[["jrWraith",[0,1],3],["jrWraith",[0,1],4],["jrWraith",[0,1],5],["neckiJr",3,4],["neckiJr",3,5],["wraith",1,10],["jrWraith",2,11],["jrWraith",2,12],["jrWraith",[0,1],13],["octopus",[1,2],15],["wraith",2,18],["jrWraith",1,19],["jrWraith",2,20],["jrWraith",2,21],["jrWraith",2,22]],"wave3-8":[["wraith",[0,1],3],["jrWraith",[0,1,2],9],["jrWraith",[0,1,2],12],["goldMushroom3",1,12],["bubbling",[0,1,2],18],["bubbling",[0,1,2],18.5],["bubbling",[0,1,2],19],["wraith",[0,1],18],["jrWraith",[0,1,2],26],["jrWraith",[0,1,2],28]],"wave3-9":[["shade",1,3],["jrWraith",[0,2],10],["jrWraith",[0,2],14],["bubbling",[0,1,2],18],["bubbling",[0,1,2],18.5],["bubbling",[0,1,2],19],["wraith",[0,1],20],["jrWraith",[0,1,2],26],["jrWraith",[0,1,2],30]],"wave3-10":[["shade",1,3],["jrWraith",[0,2],10],["jrWraith",[0,2],14],["bubbling",[0,1,2],18],["bubbling",[0,1,2],18.5],["bubbling",[0,1,2],19],["shade",1,20],["octopus",3,22],["octopus",3,23],["octopus",3,24],["jrWraith",[0,1,2],28],["jrWraith",[0,1,2],32],["bubbling",[0,1,2],32],["bubbling",[0,1,2],32.5],["bubbling",[0,1,2],32.5],["octopus",1,33],["octopus",1,34],["octopus",1,36],["shade",1,38],["wraith",[0,2],40],["jrWraith",[0,2],44]],"wave3-0":[["neckiJr",2,1],["stirge",2,3],["jrWraith",1,3],["wraith",1,5],["shade",1,7]],"wave4-0":[["neckiJr",[0,1],1],["neckiJr",[0,1],1.5],["neckiJr",[0,1],2],["wraith",[0,1],4],["shade",[0,1],7],["wraith",[0,1],4],["shade",[0,1],7],["wraith",[0,1],4],["shade",[0,1],7],["shade",[0,1],8]]}');

/***/ }),

/***/ "./src/waveNotes.json":
/*!****************************!*\
  !*** ./src/waveNotes.json ***!
  \****************************/
/***/ ((module) => {

module.exports = JSON.parse('{"wave1-1":"Defeat monsters! Pick up mesos before they disappear!","wave1-2":"Summon a companion to keep you company","wave1-3":"Dragons or Elementals? You choose! (but eventually get both)","wave1-5":"Press [Z] to reposition dragons to busier lanes","wave1-6":"Escaped monsters means escaped mesos!","wave1-7":"Here come the big boys!","wave1-9":"Thar be a Golden Mushroom!","wave1-10":"Jump to dodge Mushmom\'s slam attack!","wave2-1":"Divide & Conquer!","wave2-3":"Beware of enemy projectiles! (your dragons are fine though)","wave2-6":"Boar stampede incoming (middle!)","wave2-10":"Stumpy\'s bat-bolt packs a huge punch!","wave3-1":"Jr Neckis dodge your summons\' attacks!","wave3-3":"Those Ocotpus are strange, aren\'t they?","wave3-6":"Wraiths haunt the area...","wave3-8":"Do NOT let the Shade touch you!","wave3-10":"Many Shades of Black!"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");



let canvas = document.getElementById("gameScreen"); // gets canvas element
let ctx = canvas.getContext('2d'); //creates 2D rendering object

const gameWidth = 1000;
const gameHeight = 500;

let game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"](gameWidth, gameHeight); 
game.start(); //creates game objects;

function gameLoop(timestamp){
    
    setTimeout(()=> {
        ctx.clearRect(0,0, gameWidth, gameHeight); //refresh screen
        //console.log(timestamp);
        
        if (game.titleDisplay){
            game.titleMenu(ctx);
        }
        else{
            if (!game.pause ){ game.update(timestamp);
            }
            game.nextWaveLoader(); //loads wave list
            game.waveLoader(); // loads each mob from wave list
            //game.pauseHandler() 
            
            game.draw(ctx); 
            game.waveClear(ctx);
            game.pauseHandler(timestamp, ctx); 
            game.upgradeMenu(ctx);
            game.nextLevelLoader(ctx); //if wave list empty, move to next level
            
            game.recallCheck();
            
        }

        game.screenTransition(ctx);

   requestAnimationFrame(gameLoop);}, 10  );  //fix framtes 
   //5 too fast
   // 10 a little too slow
   //60 too slow

}

requestAnimationFrame(gameLoop); 

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxvQ0FBb0MsVUFBVTtBQUM5QztBQUNBO0FBQ0E7O0FBRUE7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvSFVELmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy9TcHJpdGVBbmltYXRpb24uanMiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL2VuZFNjcmVlbi5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvaW1nLmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy9pbnB1dC5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvbW9iLmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy9tb25leS5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy9wcm9qZWN0aWxlLmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy9yZXN0YXJ0U2NyZWVuLmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy9zdGFydFNjcmVlbi5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvdGl0bGVTY3JlZW4uanMiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL3VwZ3JhZGUuanMiLCJ3ZWJwYWNrOi8vYXJjYWRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2FyY2FkZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYXJjYWRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYXJjYWRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIEhVRHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lKXtcbiAgICAgICAgdGhpcy5nYW1lV2lkdGggPSBnYW1lLmdhbWVXaWR0aDtcbiAgICAgICAgdGhpcy5nYW1lSGVpZ2h0ID0gZ2FtZS5nYW1lSGVpZ2h0O1xuICAgICAgICB0aGlzLndpZHRoID0gIDE1MDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA3NTsgXG4gICAgICAgIHRoaXMueCA9IDA7IFxuICAgICAgICB0aGlzLnkgPSAwOyBcbiAgICAgICAgdGhpcy5wYWRkaW5nID0gMjA7IFxuICAgICAgICB0aGlzLmZvbnQgPSBcIjE2cHggYXJpYWxcIjtcbiAgICB9XG5cbiAgICBkaXNwbGF5SFVEKGN0eCwgZ2FtZSl7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IFwiNVwiOyBcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgucm91bmRSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgMik7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgXG4gICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnbGVmdCc7IFxuICAgICAgICBjdHguZmlsbFN0eWxlID0nYmxhY2snO1xuICAgICAgICBjdHguZm9udCA9IHRoaXMuZm9udDtcblxuICAgICAgICB0aGlzLmxpdmVzID0gXCJMaXZlczogXCIgKyBnYW1lLnBsYXllci5oZWFsdGg7IFxuICAgICAgICB0aGlzLm1vbmV5ID0gXCJNZXNvczogXCIgKyBnYW1lLnBsYXllci5tb25leTtcbiAgICAgICAgdGhpcy5zdGFnZSA9IFwiV2F2ZTogXCIgKyBnYW1lLmxldmVsICsgJy0nICsgZ2FtZS53YXZlOyBcbiAgICAgICAgdGhpcy50ZXh0ID0gW3RoaXMubGl2ZXMsIHRoaXMubW9uZXksIHRoaXMuc3RhZ2VdOyBcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLnRleHQubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRoaXMudGV4dFtpXSwgdGhpcy54K3RoaXMucGFkZGluZywgdGhpcy55K3RoaXMucGFkZGluZyooMStpKSwgdGhpcy53aWR0aCk7IFxuICAgICAgICB9XG4gICAgfVxuXG5cbn0iLCJpbXBvcnQgaW1nIGZyb20gJy4vaW1nJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ByaXRlQW5pbWF0aW9ue1xuICAgIGltYWdlcyA9IFtdO1xuICAgIGNvbnN0cnVjdG9yKGZpbGVOYW1lLCBudW1iZXJPZkltYWdlcywgdGltZXJDb3VudCwgc3RhdGUsIHN0b3Ape1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaTw9bnVtYmVyT2ZJbWFnZXM7IGkrKyl7IC8vIGxvYWRzIGltYWdlcyBpbnRvIGFycmF5IFxuICAgICAgICAgICAgY29uc3QgaW1hZ2UgPSBpbWcoZmlsZU5hbWUucmVwbGFjZShcIj9cIiwgaSkpOyBcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzLnB1c2goaW1hZ2UpOyBcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudGltZXJDb3VudCA9IHRpbWVyQ291bnQ7XG4gICAgICAgIHRoaXMudGltZXJDb3VudERlZmF1bHQgPSB0aGlzLnRpbWVyQ291bnQ7IFxuICAgICAgICB0aGlzLmltYWdlSW5kZXggPSAwOyBcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlOyBcbiAgICAgICAgdGhpcy5zdG9wID0gc3RvcDsgXG4gICAgfVxuICAgIFxuICAgIGlzRm9yKHN0YXRlKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUgPT09IHN0YXRlOyBcbiAgICB9XG5cbiAgICByZXNldCgpeyAvLyBsb29wIGFuaW1hdGlvblxuICAgICAgICB0aGlzLmltYWdlSW5kZXggPSAwOyAgIFxuICAgIH1cblxuICAgIGdldEZyYW1lKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlSW5kZXg7IFxuICAgIH1cblxuICAgIGdldEltYWdlKHBhdXNlKXsgIC8vcmV0dXJucyBmcmFtZVxuICAgICAgICB0aGlzLnNldEltYWdlSW5kZXgocGF1c2UpOyBcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VzW3RoaXMuaW1hZ2VJbmRleF07IFxuICAgIH1cblxuICAgIHNldEltYWdlSW5kZXgocGF1c2Upe1xuICAgICAgICB0aGlzLnRpbWVyQ291bnQtLTtcbiAgICAgICAgaWYgKHRoaXMudGltZXJDb3VudCA8PSAwICYmICF0aGlzLnNob3VsZFN0b3AoKSl7XG4gICAgICAgICAgICB0aGlzLnRpbWVyQ291bnQ9IHRoaXMudGltZXJDb3VudERlZmF1bHQ7IFxuICAgICAgICAgICAgaWYgKCFwYXVzZSkge3RoaXMuaW1hZ2VJbmRleCsrO30gLy9hbmltYXRlIG9ubHkgd2hlbiB1bnBhdXNlZFxuICAgICAgICAgICAgaWYgKHRoaXMuaW1hZ2VJbmRleCA+PSB0aGlzLmltYWdlcy5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VJbmRleCA9IDA7IFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvdWxkU3RvcCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5zdG9wICAmJiB0aGlzLmltYWdlSW5kZXggPT09IHRoaXMuaW1hZ2VzLmxlbmd0aC0xXG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgZW5kU2NyZWVue1xuICAgIGNvbnN0cnVjdG9yKGdhbWUpe1xuICAgICAgICB0aGlzLmdhbWVXaWR0aCA9IGdhbWUuZ2FtZVdpZHRoO1xuICAgICAgICB0aGlzLmdhbWVIZWlnaHQgPSBnYW1lLmdhbWVIZWlnaHQ7XG4gICAgICAgIHRoaXMud2lkdGggPSAgNjAwO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDIwMDsgLy8gZ2FtZS5nYW1lSGVpZ2h0IC0gMyo5MDsgXG4gICAgICAgIHRoaXMueCA9IChnYW1lLmdhbWVXaWR0aC10aGlzLndpZHRoKS8yOyBcbiAgICAgICAgdGhpcy55ID0gMzsvLyh0aGlzLmhlaWdodClcbiAgICAgICAgdGhpcy5wYWRkaW5nID0gMjU7IFxuICAgICAgICB0aGlzLmZvbnQgPSBcIjE2cHggYXJpYWxcIjtcbiAgICAgICAgdGhpcy5mb250MiA9IFwiMjRweCBhcmlhbFwiO1xuICAgICAgICB0aGlzLmRpc3BsYXkgPSB0cnVlOyBcbiAgICAgICAgdGhpcy5idXR0b24xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uMS50ZXh0Q29udGVudCA9ICdSZXR1cm4gdG8gTWFpbic7XG4gICAgICAgIHRoaXMuYnV0dG9uWDEgPSB0aGlzLmdhbWVXaWR0aC8yO1xuICAgICAgICB0aGlzLmJ1dHRvbldpZHRoID0gMjUwO1xuICAgICAgICB0aGlzLmJ1dHRvbkhlaWdodCA9IDMwOyBcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICB0aGlzLnN0YXRzMSA9IFtdO1xuICAgICAgICB0aGlzLnN0YXRzMiA9IFtdO1xuICAgICAgICB0aGlzLnN0YXRQb3NpdGlvbiA9IHRoaXMueDsgLy9zdGFydGluZyB4IFxuICAgICAgICB0aGlzLnN0YXRIZWlnaHQgPSAyMDtcbiAgICAgICAgdGhpcy5zdGF0V2lkdGggPSAyMDA7XG5cbiAgICAgICAgdGhpcy5idXR0b25Qb3NpdGlvbnMgPSBbIFt0aGlzLngrKHRoaXMud2lkdGgtdGhpcy5idXR0b25XaWR0aCkvMiwgdGhpcy5oZWlnaHQtdGhpcy5idXR0b25IZWlnaHQtdGhpcy5wYWRkaW5nXV0gXG4gICAgICAgIHRoaXMuYnV0dG9uc0xpc3QgPSBbdGhpcy5idXR0b24xXVxuICAgICAgICB9XG5cbiAgICAgICAgaW5pdGlhbGl6ZShnYW1lKXtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lU2NyZWVuJyk7XG4gICAgICAgICAgICB2YXIgZWxlbSA9IHRoaXM7XG4gICAgICAgICAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtlbGVtLmhhbmRsZUNsaWNrKGUsIGdhbWUpIH0sIGZhbHNlKTsgICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZHJhdyhjdHgpe1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8dGhpcy5idXR0b25zTGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgIHRoaXMuZHJhd0J1dHRvbih0aGlzLmJ1dHRvbnNMaXN0W2ldLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVswXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMV0sIGN0eClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXJ0RnVuY3Rpb25zKGdhbWUpe1xuICAgICAgICAgICAgZ2FtZS5uZXh0V2F2ZSA9IHRydWU7IFxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5ID0gZmFsc2U7IFxuICAgICAgICB9XG5cbiAgICAgICAgaGFuZGxlQ2xpY2soZSwgZ2FtZSl7XG4gICAgICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZVNjcmVlbicpO1xuICAgICAgICAgICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpOyBcbiAgICAgICAgICAgIGNvbnN0IHggPSBlLmNsaWVudFggLSBjYW52YXMub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBlLmNsaWVudFkgLSBjYW52YXMub2Zmc2V0VG9wO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTx0aGlzLmJ1dHRvbnNMaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgIC8vIHRoaXMuZHJhd0J1dHRvbih0aGlzLmJ1dHRvbnNMaXN0W2ldLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVswXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMV0sIGN0eClcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5ICYmIGN0eC5pc1BvaW50SW5QYXRoKHgseSkpIHsgLy9idXR0b24gY2xpY2sgKG9ubHkgd2hlbiBkaXNwbGF5ZWQpXG4gICAgICAgICAgICAgICAgICAgIGlmIChnYW1lLmdhbWVPdmVyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheSA9IGZhbHNlOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWUuZmFkZU91dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge2dhbWUudGl0bGVEaXNwbGF5ID0gdHJ1ZX0sIFwiMjAwMFwiKX0gLy8gZmFkZSBvdXQgdHJhbnNpdGlvbiB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge2dhbWUubGV2ZWxGaW5pc2ggPSB0cnVlO31cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ICAgICAgXG4gICAgICAgIH1cblxuXG4gICAgICAgIGRyYXdCdXR0b24oZTEsIHgsIHksIGN0eCl7ICAgXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3N0ZWVsYmx1ZSc7IC8vZHJhdyBib3JkZXJcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTsgLy9zZXRzIGFyZWEgZm9yIGNvbGxpc2lvbiAoaXNQb2ludEluUGF0aClcbiAgICAgICAgICAgIGN0eC5yb3VuZFJlY3QoeCx5LHRoaXMuYnV0dG9uV2lkdGgsIHRoaXMuYnV0dG9uSGVpZ2h0LCAyKTtcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgICAgICAgIGN0eC5mb250ID0gdGhpcy5mb250MjsgLy9kcmF3IHRleHQgXG4gICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gJ21pZGRsZSc7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3doaXRlJztcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChlMS50ZXh0Q29udGVudCwgeCt0aGlzLmJ1dHRvbldpZHRoLzIsIHkrdGhpcy5idXR0b25IZWlnaHQvMik7IFxuICAgICAgICB9XG5cbiAgICAgICAgbG9hZFN0YXRzKGdhbWUpe1xuICAgICAgICAgICAgdGhpcy5zdGF0czEgPSBbWyAnTW9uc3RlcnMgRGVmZWF0ZWQ6ICcrIGdhbWUubW9uc3RlcktpbGxdLFxuICAgICAgICAgICAgICAgICAgICBbJ01vbnN0ZXJzIEVzY2FwZWQ6ICcrIGdhbWUubW9uc3RlckVzY2FwZV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ01lc29zIENvbGxlY3RlZDogJysgZ2FtZS5tb25leUNvbGxlY3RlZF0sWydNZXNvcyBMb3N0OiAnKyBnYW1lLm1vbmV5TG9zdF1cbiAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5zdGF0czIgPSBbXVxuICAgICAgICAgICAgZm9yIChjb25zdCBvYmogb2YgZ2FtZS5wbGF5ZXJPYmplY3RzKXtcbiAgICAgICAgICAgICAgICBsZXQgc3RhdHNPYmogPSAnJ1xuICAgICAgICAgICAgICAgIGlmIChvYmoudHlwZSA9PSAnZ3JlZW5EcmFnb24nKXsgLy9hZGQgcG9pc29uXG4gICAgICAgICAgICAgICAgICAgIHN0YXRzT2JqID0gIFtvYmoubmFtZSsnIERhbWFnZTogJysgb2JqLmRhbWFnZURlYWx0LnRvRml4ZWQoMCkgKyBcIiAoK1wiKyBnYW1lLnBvaXNvbkRhbWFnZS50b0ZpeGVkKDApKyAnKSddOyB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAob2JqLnR5cGUgPT0gJ3JlZERyYWdvbicgfHwgb2JqLnR5cGUgPT0gJ2JsYWNrRHJhZ29uJyl7IC8vZXhwbG9kZSBkYW1hZ2UgXG4gICAgICAgICAgICAgICAgICAgIHN0YXRzT2JqID0gIFtvYmoubmFtZSsnIERhbWFnZTogJysgb2JqLmRhbWFnZURlYWx0LnRvRml4ZWQoMCkgKyBcIiAoK1wiKyBvYmouZXhwbG9kZURhbWFnZURlYWx0LnRvRml4ZWQoMCkrICcpJ107IH1cbiAgICAgICAgICAgICAgICBlbHNlIHtzdGF0c09iaiA9ICBbb2JqLm5hbWUrJyBEYW1hZ2U6ICcrIG9iai5kYW1hZ2VEZWFsdC50b0ZpeGVkKDApXTsgfVxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdHMyLnB1c2goc3RhdHNPYmopOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICBcblxuICAgICAgICBkaXNwbGF5TWVudShjdHgsIGdhbWUpeyAvL3VwZ3JhZGUgd2luZG93IGJhY2tncm91bmRcbiAgICAgICAgICAgIGlmICh0aGlzLmRpc3BsYXkpe1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJibGFja1wiO1xuICAgICAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSBcIjVcIjsgXG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGN0eC5yb3VuZFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAyKTtcbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGdhbWUuZ2FtZU92ZXIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdyZWQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmZvbnQgPSB0aGlzLmZvbnQyOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCgnR2FtZSBPdmVyIScsIHRoaXMuZ2FtZVdpZHRoLzIsIDI1KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVkcmF3KGN0eCk7IC8vcmV0dXJuIHRvIG1haW4gYnV0dG9uIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChnYW1lLndhdmVGaW5pc2gpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRleHQxPScnO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRleHQyPScnO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdhbWUubGV2ZWwgPT0gZ2FtZS5maW5hbExldmVsICYmIGdhbWUubGV2ZWxMaXN0Lmxlbmd0aCA9PSAwKXsgLy9maW5hbCBsZXZlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQxPSAnRmluYWwgTGV2ZWwgQ2xlYXIhJyAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQyPSAnVGhhbmtzIGZvciBwbGF5aW5nJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVkcmF3KGN0eCk7fSAvL3JldHVybiB0byBtYWluIGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdhbWUubGV2ZWxMaXN0Lmxlbmd0aCA9PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDE9J0xldmVsICcgK2dhbWUubGV2ZWwrICcgQ2xlYXIhJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7IHRleHQxPSdXYXZlIENsZWFyISc7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQyID0gJ1ByZXNzIFtBXSB0byBvcGVuIHNob3Agb3IgW0RdIHRvIHN0YXJ0IG5leHQgd2F2ZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5mb250ID0gdGhpcy5mb250MjsgXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7IFxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRleHQxLCB0aGlzLmdhbWVXaWR0aC8yLCAyNSlcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZm9udCA9IHRoaXMuZm9udDI7IFxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnYmx1ZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQodGV4dDIsIHRoaXMuZ2FtZVdpZHRoLzIsIHRoaXMuaGVpZ2h0LTEwKS8vXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFxuXG5cbiAgICAgICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ3N0YXJ0JzsgLy9zdGF0cyBcbiAgICAgICAgICAgICAgICBjdHguZm9udCA9IHRoaXMuZm9udDtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRTdGF0cyhnYW1lKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5zdGF0czEubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqPTA7IGo8dGhpcy5zdGF0czFbaV0ubGVuZ3RoOyBqKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRoaXMuc3RhdHMxW2ldW2pdLCB0aGlzLnBhZGRpbmcrdGhpcy5zdGF0UG9zaXRpb24rKHRoaXMuc3RhdFdpZHRoLzQpKmosXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMjUrIHRoaXMucGFkZGluZysodGhpcy5zdGF0SGVpZ2h0KSppLCAzMDAgKTsgXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gICAgXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMuc3RhdHMyLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaj0wOyBqPHRoaXMuc3RhdHMyW2ldLmxlbmd0aDsgaisrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0aGlzLnN0YXRzMltpXVtqXSwgdGhpcy5wYWRkaW5nK3RoaXMuc3RhdFBvc2l0aW9uK3RoaXMuc3RhdFdpZHRoKjEuNSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAyNSsgdGhpcy5wYWRkaW5nKyh0aGlzLnN0YXRIZWlnaHQpKmksIDMwMCApOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSAgICBcbiAgICAgICAgICAgIH07IFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgfVxufVxuIiwiaW1wb3J0IElucHV0SGFuZGxlciBmcm9tICcuL2lucHV0JzsgXG5pbXBvcnQgUGxheWVyIGZyb20gJy4vcGxheWVyJzsgXG5pbXBvcnQgTW9iIGZyb20gJy4vbW9iJztcbmltcG9ydCBVcGdyYWRlIGZyb20gJy4vdXBncmFkZSc7IFxuaW1wb3J0IE1vbmV5IGZyb20gJy4vbW9uZXknOyBcbmltcG9ydCBzdGFydFNjcmVlbiBmcm9tICcuL3N0YXJ0U2NyZWVuJzsgXG5pbXBvcnQgdGl0bGVTY3JlZW4gZnJvbSAnLi90aXRsZVNjcmVlbic7IFxuaW1wb3J0IHJlc3RhcnRTY3JlZW4gZnJvbSAnLi9yZXN0YXJ0U2NyZWVuJzsgXG5pbXBvcnQgZW5kU2NyZWVuIGZyb20gJy4vZW5kU2NyZWVuJzsgXG5pbXBvcnQgSFVEIGZyb20gJy4vSFVEJzsgXG5pbXBvcnQgaW1nIGZyb20gJy4vaW1nJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZXtcbiAgICBjb25zdHJ1Y3RvcihnYW1lV2lkdGgsIGdhbWVIZWlnaHQpe1xuICAgICAgICB0aGlzLm5vdGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmdhbWVXaWR0aCA9IGdhbWVXaWR0aDtcbiAgICAgICAgdGhpcy5nYW1lSGVpZ2h0ID0gZ2FtZUhlaWdodDtcbiAgICAgICAgdGhpcy50aXRsZSA9IG5ldyB0aXRsZVNjcmVlbih0aGlzKTsgXG4gICAgICAgIHRoaXMudGl0bGUuaW5pdGlhbGl6ZSh0aGlzKTtcbiAgICAgICAgdGhpcy5lbmQgPSBuZXcgZW5kU2NyZWVuKHRoaXMpOyBcbiAgICAgICAgdGhpcy5lbmQuaW5pdGlhbGl6ZSh0aGlzKTtcbiAgICAgICAgdGhpcy5yZXN0YXJ0ID0gbmV3IHJlc3RhcnRTY3JlZW4odGhpcyk7IFxuICAgICAgICB0aGlzLnJlc3RhcnQuaW5pdGlhbGl6ZSh0aGlzKTtcbiAgICAgICAgdGhpcy5nYW1lT3ZlciA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5yZXN0YXJ0V2luZG93ID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGl0bGVEaXNwbGF5ID0gdHJ1ZTsvL2ZhbHNlOyAvL2VuYWJsZSBmb3IgcmVsZWFzZVxuICAgICAgICB0aGlzLmxvYWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzID1bXTtcbiAgICAgICAgdGhpcy5tb2JPYmplY3RzID1bXTsgXG4gICAgICAgIHRoaXMubW9uZXlPYmplY3RzID0gW107IFxuICAgICAgICB0aGlzLmxldmVsID0gMTtcbiAgICAgICAgdGhpcy5maW5hbExldmVsID0zIDsgXG4gICAgICAgIHRoaXMud2F2ZSA9IDA7IFxuICAgICAgICB0aGlzLmxhbmUgPSAxOyBcbiAgICAgICAgdGhpcy5iZ1NreSA9IGltZygnYmcvYmdTa3knK3RoaXMubGV2ZWwrJy5wbmcnKTtcbiAgICAgICAgdGhpcy5iZ1N0YWdlID0gaW1nKCdiZy9iZ1N0YWdlJyt0aGlzLmxldmVsKycucG5nJyk7XG4gICAgICAgIHRoaXMud2F2ZVN0YXJ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMud2F2ZUluZm8gPSByZXF1aXJlKCcuL3dhdmVJbmZvLmpzb24nKTtcbiAgICAgICAgdGhpcy53YXZlTm90ZXMgPSByZXF1aXJlKCcuL3dhdmVOb3Rlcy5qc29uJyk7XG4gICAgICAgIHRoaXMubGV2ZWxOb3RlID0gJyc7IFxuICAgICAgICB0aGlzLmxldmVsTGlzdCA9IFsuLi50aGlzLndhdmVJbmZvWydsZXZlbCcrdGhpcy5sZXZlbF1dOy8vezE6IFsnd2F2ZTEtNScsICd3YXZlMS0xJ119IC8vSlNPTlxuICAgICAgICB0aGlzLndhdmVMaXN0ID0gW107XG4gICAgICAgIHRoaXMudG9Mb2FkID1bXTsgXG4gICAgICAgIHRoaXMucm93SGVpZ2h0ID0gOTA7IC8vbGFuZSBzaXplXG4gICAgICAgIHRoaXMubmV4dFdhdmUgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMubGV2ZWxTdGFydCA9IGZhbHNlO1xuICAgICAgICB0aGlzLndhdmVGaW5pc2ggPSB0cnVlOyBcbiAgICAgICAgdGhpcy5sZXZlbEZpbmlzaCA9IGZhbHNlIDsgLy9jbG9zZSBzdGF0cyBtZW51XG4gICAgICAgIFxuICAgICAgICB0aGlzLmZpcnN0TG9hZCA9IDA7IFxuICAgICAgICB0aGlzLm5vdGVUaW1lID0gMDsgXG4gICAgICAgIHRoaXMuZ2FtZVRpbWUgPSAwOyAvL3BsYXllZCBnYW1lIHRpbWUgZm9yIGV2ZW50czsgXG4gICAgICAgIHRoaXMuZ2FtZVRpbWVSZWFsID0gMDsgLy90cmFja3MgdGltZSBhZ2FpbnN0IHBhdXNlcyBcbiAgICAgICAgdGhpcy5wYXVzZWRUaW1lID0gMDsgXG4gICAgICAgIHRoaXMudGltZU9mZnNldCA9IDBcbiAgICAgICAgdGhpcy50aW1lT2Zmc2V0U3VtID0gMDsgXG4gICAgICAgIHRoaXMuc2V0UG9pbnQgPSBmYWxzZTsgXG5cbiAgICAgICAgdGhpcy5mYWRlID0gMDtcbiAgICAgICAgdGhpcy5mYWRlSW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mYWRlT3V0ID0gZmFsc2UgO1xuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBbXTsgXG4gICAgICAgIHRoaXMuZXJyb3IgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMubW9iQ291bnQgPSAwIDsgXG5cbiAgICAgICAgdGhpcy5wb2lzb25EYW1hZ2UgPSAwOyBcbiAgICAgICAgdGhpcy5tb25zdGVyS2lsbCA9IDA7IFxuICAgICAgICB0aGlzLm1vbnN0ZXJFc2NhcGUgPSAwO1xuICAgICAgICB0aGlzLmRhbWFnZURlYWx0ID0ge307IFxuICAgICAgICB0aGlzLm1vbmV5Q29sbGVjdGVkID0gMDtcbiAgICAgICAgdGhpcy5tb25leUxvc3QgPSAwOyBcbiAgICAgICAgdGhpcy5wYXVzZSA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5yZWNhbGxTdG9yYWdlPWZhbHNlO1xuXG4gICAgfVxuXG4gICAgcGF1c2VIYW5kbGVyKHRpbWUsIGN0eCl7XG5cbiAgICAgICAgaWYgKHRoaXMucGF1c2UgKXsgLy9zbmFwcyB3aGVuIHRpbWUgaXMgcGF1c2VkOyBcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXRQb2ludCl7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXVzZWRUaW1lID0gdGltZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBvaW50ID0gdHJ1ZTsgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHt0aGlzLnRpbWVPZmZzZXQgPSB0aW1lIC0gdGhpcy5wYXVzZWRUaW1lfSAvL3J1bnMgdXAgb2Zmc2V0IHZhbHVlIFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnVwZ3JhZGUuZGlzcGxheSA9IGZhbHNlIDtcbiAgICAgICAgICAgIHRoaXMudGltZU9mZnNldFN1bSs9IHRoaXMudGltZU9mZnNldDsgLy9zdW0gb2Ygb2Zmc2V0IHZhbHVlcyBcbiAgICAgICAgICAgIHRoaXMudGltZU9mZnNldCA9IDA7ICAvL3Jlc2V0IFxuICAgICAgICAgICAgdGhpcy5nYW1lVGltZVJlYWwgPSB0aW1lIC10aGlzLnRpbWVPZmZzZXRTdW07IC8vYXBwbHkgb2Zmc2V0IHN1bVxuICAgICAgICAgICAgdGhpcy5zZXRQb2ludCA9IGZhbHNlOyAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wYXVzZSl7XG4gICAgICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAwLjZcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoMCwwLHRoaXMuZ2FtZVdpZHRoLCB0aGlzLmdhbWVIZWlnaHQpOyBcbiAgICAgICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDE7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy51cGdyYWRlLmRpc3BsYXkpe1xuICAgICAgICAgICAgICAgIGN0eC5mb250ID0gXCIxNnB4IGFyaWFsXCI7IFxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgICAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJzsgXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCdQcmVzcyBFU0MgdG8gdW5wYXVzZScsIHRoaXMuZ2FtZVdpZHRoLzIsIHRoaXMuZ2FtZUhlaWdodC8yKzIwKSBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZVBhdXNlKCl7ICAgXG4gICAgICAgIHRoaXMucGF1c2UgPSAhdGhpcy5wYXVzZTsgXG4gICAgfVxuXG4gICAgcmVzZXRFdmVyeXRoaW5nKCl7XG4gICAgICAgIHRoaXMuZ2FtZU92ZXIgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMucmVzdGFydFdpbmRvdyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRpdGxlRGlzcGxheSA9IGZhbHNlOyAvL2VuYWJsZSBmb3IgcmVsZWFzZVxuICAgICAgICB0aGlzLm1vbmV5T2JqZWN0cyA9IFtdOyBcbiAgICAgICAgdGhpcy53YXZlID0gMDsgXG4gICAgICAgIHRoaXMuYmdTa3kgPSBpbWcoJ2JnL2JnU2t5Jyt0aGlzLmxldmVsKycucG5nJyk7XG4gICAgICAgIHRoaXMuYmdTdGFnZSA9IGltZygnYmcvYmdTdGFnZScrdGhpcy5sZXZlbCsnLnBuZycpO1xuICAgICAgICB0aGlzLndhdmVTdGFydCA9IGZhbHNlO1xuICAgICAgICB0aGlzLndhdmVJbmZvID0gcmVxdWlyZSgnLi93YXZlSW5mby5qc29uJyk7XG4gICAgICAgIHRoaXMubGV2ZWxMaXN0ID0gWy4uLnRoaXMud2F2ZUluZm9bJ2xldmVsJyt0aGlzLmxldmVsXV07Ly97MTogWyd3YXZlMS01JywgJ3dhdmUxLTEnXX0gLy9KU09OXG5cbiAgICAgICAgdGhpcy53YXZlTGlzdCA9IFtdO1xuICAgICAgICB0aGlzLnRvTG9hZCA9W107IFxuICAgICAgICB0aGlzLm5leHRXYXZlID0gZmFsc2U7IFxuICAgICAgICB0aGlzLndhdmVGaW5pc2ggPSB0cnVlOyBcbiAgICAgICAgdGhpcy5sZXZlbEZpbmlzaCA9IGZhbHNlIDsgLy9jbG9zZSBzdGF0cyBtZW51XG4gICAgICAgIC8vdGhpcy5nYW1lVGltZSA9IDA7IFxuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBbXTsgXG4gICAgICAgIHRoaXMucG9pc29uRGFtYWdlID0gMDsgXG4gICAgICAgIHRoaXMubW9uc3RlcktpbGwgPSAwOyBcbiAgICAgICAgdGhpcy5tb25zdGVyRXNjYXBlID0gMDtcbiAgICAgICAgdGhpcy5kYW1hZ2VEZWFsdCA9IHt9OyBcbiAgICAgICAgdGhpcy5tb25leUNvbGxlY3RlZCA9IDA7XG4gICAgICAgIHRoaXMubW9uZXlMb3N0ID0gMDsgXG4gICAgICAgIHRoaXMucmVjYWxsU3RvcmFnZT1mYWxzZTtcbiAgICAgICAgdGhpcy5sb2FkQkcoKTtcbiAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzID0gW3RoaXMucGxheWVyXTtcbiAgICB9XG4gICAgXG4gICAgdGl0bGVNZW51KGN0eCl7IFxuXG4gICAgICAgIHRoaXMudGl0bGUuZGlzcGxheU1lbnUoY3R4LCB0aGlzKTsgXG4gICAgfVxuXG4gICAgd2F2ZUNsZWFyKGN0eCl7IC8vIGNoZWNrcyBpZiB3YXZlIGlzIGNsZWFyZWRcbiAgICAgICAgaWYgKCF0aGlzLm5leHRXYXZlICYmIHRoaXMud2F2ZVN0YXJ0ICYmIHRoaXMubGV2ZWxTdGFydCAmJiBcbiAgICAgICAgICAgIHRoaXMudG9Mb2FkLmxlbmd0aCA9PSAwICAmJiB0aGlzLm1vYk9iamVjdHMubGVuZ3RoPT0wICl7XG4gICAgICAgICAgICB0aGlzLndhdmVGaW5pc2ggPSB0cnVlOyBcbiAgICAgICAgICAgIHRoaXMuZW5kLmRpc3BsYXkgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5lbmQuZGlzcGxheU1lbnUoY3R4LCB0aGlzKTtcbiAgICAgICAgfSBcbiAgICB9XG4gICAgbmV4dExldmVsTG9hZGVyKGN0eCl7XG4gICAgICAgIGlmICh0aGlzLmxldmVsTGlzdC5sZW5ndGggPT0gMCAmJiB0aGlzLndhdmVGaW5pc2gpe1xuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWxGaW5pc2gpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPT10aGlzLmZpbmFsTGV2ZWwpeyBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lT3ZlciA9IHRydWU7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLndhdmVTdGFydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMud2F2ZUZpbmlzaCA9IGZhbHNlOyBcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhZGVPdXQgPSB0cnVlfSwgXCIyMDAwXCIpIC8vIGZhZGUgb3V0IHRyYW5zaXRpb25cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4geyAvL2xvYWQgbmV4dCBjb250ZW50XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGV2ZWwrKztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZXZlbExpc3QgPSBbLi4udGhpcy53YXZlSW5mb1snbGV2ZWwnK3RoaXMubGV2ZWxdXTsgLy8gbG9hZCBuZXh0IGxldmVsIHdhdmVzXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxGaW5pc2ggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YXZlID0gMDsgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJnU2t5ID0gaW1nKCdiZy9iZ1NreScrdGhpcy5sZXZlbCsnLnBuZycpOyAvL3JlbG9hZCBCRyBhcnQgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmdTdGFnZSA9IGltZygnYmcvYmdTdGFnZScrdGhpcy5sZXZlbCsnLnBuZycpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbmV5T2JqZWN0cyA9IFtdOyAvL2NsZWFyIGZsb29yIG1vbmV5IFxuICAgICAgICAgICAgICAgICAgICB0aGlzLndhdmVTdGFydCA9IGZhbHNlOyBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YXZlRmluaXNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0V2F2ZSAgPSBmYWxzZSBcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmxlZnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIubGFuZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnBvc2l0aW9uID0ge3g6MjUsIHk6dGhpcy5nYW1lSGVpZ2h0IC0gNDUgLSAyKnRoaXMucGxheWVyLnJvd0hlaWdodH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmZsb29yID0gdGhpcy5nYW1lSGVpZ2h0IC0gNDUgLSAoMSt0aGlzLnBsYXllci5sYW5lKSp0aGlzLnBsYXllci5yb3dIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZSA9IHRoaXMucGxheWVyT2JqZWN0cy5zcGxpY2UoMSk7ICAvL3B1bGxzIGV2ZXJ5dGhpbmcgZXhwZWN0IHBsYXllclxuICAgICAgICAgICAgICAgIH0sIFwiNDAwMFwiKTsgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmV4dFdhdmVMb2FkZXIoKXtcbiAgICAgICAgaWYgKHRoaXMubmV4dFdhdmUpeyAvL2xvYWQgbmV4dCB3YXZlIGRhdGEgZnJvbSBKU09OXG4gICAgICAgICAgICBpZiAodGhpcy5sZXZlbExpc3QubGVuZ3RoPjApe1xuICAgICAgICAgICAgICAgIHRoaXMud2F2ZUxpc3QgPSBbLi4udGhpcy53YXZlSW5mb1t0aGlzLmxldmVsTGlzdC5zaGlmdCgpXV07IC8vXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lVGltZSA9IHRoaXMuZ2FtZVRpbWVSZWFsOyAvL3N0YXJ0IG9mIHdhdmU7XG4gICAgICAgICAgICAgICAgdGhpcy53YXZlU3RhcnQgPSBmYWxzZTsgXG4gICAgICAgICAgICAgICAgdGhpcy53YXZlICsrOyBcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRXYXZlID0gZmFsc2U7IFxuICAgICAgICAgICAgICAgIHRoaXMudXBncmFkZS5kaXNwbGF5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy53YXZlRmluaXNoID0gZmFsc2U7IFxuXG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy53YXZlTm90ZXNbJ3dhdmUnK3RoaXMubGV2ZWwrJy0nK3RoaXMud2F2ZV0pe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxldmVsTm90ZSA9IHRoaXMud2F2ZU5vdGVzWyd3YXZlJyt0aGlzLmxldmVsKyctJyt0aGlzLndhdmVdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGVUaW1lID0gdGhpcy5nYW1lVGltZVJlYWw7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgdGhpcy5sZXZlbEZpbmlzaCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzY3JlZW5UcmFuc2l0aW9uKGN0eCl7XG4gICAgICAgIGlmICh0aGlzLmZhZGVJbil7IC8vZmFkZSBpbiBcbiAgICAgICAgICAgIGlmICh0aGlzLmZhZGU+MCl7XG4gICAgICAgICAgICAgICAgdGhpcy5mYWRlIC09IDAuMDM7IFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZhZGUgPD0gMCkge3RoaXMuZmFkZUluID0gZmFsc2U7fVxuICAgICAgICAgICAgfSBcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5mYWRlT3V0KXsgLy9mYWRlIHRvIGJsYWNrXG4gICAgICAgICAgICBpZiAodGhpcy5mYWRlIDwgMSl7ICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuZmFkZSArPSAwLjAzOyBcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mYWRlID49IDEpIHsgXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZhZGVJbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZhZGVPdXQgPSBmYWxzZTt9LCBcIjE1MDBcIil9XG4gICAgICAgICAgICB9IFxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmZhZGVJbiB8fCB0aGlzLmZhZGVPdXQpe1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IHRoaXMuZmFkZTsgXG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgdGhpcy5nYW1lV2lkdGgsIHRoaXMuZ2FtZUhlaWdodCk7IFxuICAgICAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHdhdmVMb2FkZXIoKXsvL2xvYWRkcyBlYWNoIG1vYiBmcm9tIHdhdmVMaXN0XG4gICAgICAgIGlmICh0aGlzLnRvTG9hZC5sZW5ndGggPT0gMCAmJiB0aGlzLndhdmVMaXN0Lmxlbmd0aD4wKSB7dGhpcy50b0xvYWQgPSB0aGlzLndhdmVMaXN0LnNoaWZ0KCk7fVxuICAgICAgICBpZiAodGhpcy50b0xvYWRbMl0gPD0gICh0aGlzLmdhbWVUaW1lUmVhbCAtIHRoaXMuZ2FtZVRpbWUpLzEwMDAgKXtcbiAgICAgICAgICAgIHRoaXMud2F2ZVN0YXJ0ID0gdHJ1ZTsgXG4gICAgICAgICAgICB0aGlzLmxldmVsU3RhcnQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMudG9Mb2FkWzFdLmxlbmd0aD4wKXsgLy9tdWx0aXBsZSBlbnRyaWVzIFxuICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLnRvTG9hZFsxXS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFuZSA9IHRoaXMudG9Mb2FkWzFdW2ldOyAvL3NldHMgbGFuZSB0byBsb2FkXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9iKHRoaXMsIHRoaXMudG9Mb2FkWzBdLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2JDb3VudCArKzsgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLmxhbmUgPSB0aGlzLnRvTG9hZFsxXS0xOyAvL3NldHMgbGFuZSB0byBsb2FkXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVNb2IodGhpcywgdGhpcy50b0xvYWRbMF0sIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMubW9iQ291bnQgKys7IH0gICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy50b0xvYWQgPSBbXTsgXG4gICAgICAgIH0gXG5cbiAgICB9ICAgIFxuICAgIFxuICAgIGFkZEVsZW1lbnQoZWxlbWVudCl7IC8vdXBncmFkZSBzaG9wIFxuICAgICAgIGlmICh0aGlzLnBsYXllci5lbGVtZW50TGlzdC5sZW5ndGg8NSl7XG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIubW9uZXk+IHRoaXMucGxheWVyLmVsZW1lbnRDb3N0W3RoaXMucGxheWVyLmVsZW1lbnRMaXN0Lmxlbmd0aF0pe1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLm1vbmV5IC09IHRoaXMucGxheWVyLmVsZW1lbnRDb3N0W3RoaXMucGxheWVyLmVsZW1lbnRMaXN0Lmxlbmd0aF07XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuZWxlbWVudExpc3QucHVzaChlbGVtZW50KTsgXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuZWxlbWVudGFscygpOyAvL2xvYWQgc3ByaXRlc1xuICAgICAgICAgICAgICAgIC8vYXBwbHkgdXBncmFkZXNcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCA9PSAnQmxhemUnKXt0aGlzLnBsYXllci5kYW1hZ2VNdWx0aSs9MC40IH1cbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCA9PVwiRGF3blwiKXt0aGlzLnBsYXllci5sb290TXVsdGkrPTAuNTsgdGhpcy5wbGF5ZXIuZGFtYWdlTXVsdGkrPTAuMiB9O1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50ID09J05pZ2h0Jyl7dGhpcy5wbGF5ZXIua25vY2tiYWNrTXVsdGkrPTAuMjsgdGhpcy5wbGF5ZXIuZGFtYWdlTXVsdGkrPTAuMn07XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0nV2luZCcpe3RoaXMucGxheWVyLnNwZWVkTXVsdGkrPTAuMn07XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0nVGh1bmRlcicpe3RoaXMucGxheWVyLnBpZXJjZSs9MTt0aGlzLnBsYXllci5kYW1hZ2VNdWx0aSs9MC4yIH07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgfVxuICAgIH1cblxuICAgIHJlc3VtbW9uKHR5cGUpe1xuICAgICAgICBsZXQgdHJhbnNmZXIgPSB0aGlzLnN0b3JhZ2UuZmluZEluZGV4KG9iaj0+b2JqLnR5cGUgPT09IHR5cGUpOyBcbiAgICAgICAgdGhpcy5zdG9yYWdlW3RyYW5zZmVyXS5wb3NpdGlvbi54ID0gKHRoaXMucGxheWVyLmN1clRpbGUqODApK3RoaXMucGxheWVyLndpZHRoLzI7XG4gICAgICAgIHRoaXMuc3RvcmFnZVt0cmFuc2Zlcl0ucG9zaXRpb24ueSA9ICh0aGlzLnBsYXllci5mbG9vciszMCk7IFxuICAgICAgICB0aGlzLnN0b3JhZ2VbdHJhbnNmZXJdLmxhbmUgPSB0aGlzLnBsYXllci5sYW5lO1xuXG4gICAgICAgIHRoaXMucGxheWVyT2JqZWN0cy5wdXNoKHRoaXMuc3RvcmFnZVt0cmFuc2Zlcl0pOyAvL2NvcGllcyBvYmplY3QgdG8gbGlzdFxuICAgICAgICB0aGlzLnN0b3JhZ2Uuc3BsaWNlKHRyYW5zZmVyKTsgLy9kZWxldGVzIG9iamVjdCBmcm9tIHN0b3JhZ2VcbiAgICB9XG4gICAgcmVjYWxsQ2hlY2soKXtcbiAgICAgICAgaWYgKCF0aGlzLnJlY2FsbFN0b3JhZ2UgICYmIHRoaXMuc3RvcmFnZVswXSl7XG4gICAgICAgICAgICB0aGlzLnJlY2FsbFN0b3JhZ2UgPSB0aGlzLnN0b3JhZ2Uuc2hpZnQoKSA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVjYWxsKCl7ICAgICAgICBcbiAgICAgICAgaWYgKCF0aGlzLnJlY2FsbFN0b3JhZ2Upe1xuICAgICAgICAgICAgdGhpcy5yZWNhbGxTdG9yYWdlID0gdGhpcy5wbGF5ZXJPYmplY3RzLmZpbmQob2JqPT4gKG9iai5wb3NpdGlvbi55LTMwID09PSB0aGlzLnBsYXllci5mbG9vcikmJiAgLy9jaGVja3MgZm9yIGV4aXN0aW5nIHVuaXQgXG4gICAgICAgICAgICAob2JqLnBvc2l0aW9uLnggPT09ICh0aGlzLnBsYXllci5jdXJUaWxlKjgwKSt0aGlzLnBsYXllci53aWR0aC8yKSAmJiAob2JqLm5hbWUhPT0nV2l6JyApKVxuXG4gICAgICAgICAgICBpZiAodGhpcy5yZWNhbGxTdG9yYWdlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxldCB0eXBlID0gdGhpcy5yZWNhbGxTdG9yYWdlLnR5cGU7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzID0gdGhpcy5wbGF5ZXJPYmplY3RzLmZpbHRlciggIFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAob2JqZWN0KXtyZXR1cm4gb2JqZWN0LnR5cGUgIT0gdHlwZTsgfSk7ICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnBsYXllck9iamVjdHMuZmluZChvYmo9PiAob2JqLnBvc2l0aW9uLnktMzAgPT09IHRoaXMucGxheWVyLmZsb29yKSAmJiAgLy9jaGVja3MgZm9yIGV4aXN0aW5nIHVuaXQgXG4gICAgICAgICAgICAob2JqLnBvc2l0aW9uLnggPT09ICh0aGlzLnBsYXllci5jdXJUaWxlKjgwKSt0aGlzLnBsYXllci53aWR0aC8yKSAmJiAob2JqLm5hbWUhPT0nV2l6JykpKXtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5yZWNhbGxTdG9yYWdlLnBvc2l0aW9uLnggPSAodGhpcy5wbGF5ZXIuY3VyVGlsZSo4MCkrdGhpcy5wbGF5ZXIud2lkdGgvMjtcbiAgICAgICAgICAgICAgICB0aGlzLnJlY2FsbFN0b3JhZ2UucG9zaXRpb24ueSA9ICh0aGlzLnBsYXllci5mbG9vciszMCk7IFxuICAgICAgICAgICAgICAgIHRoaXMucmVjYWxsU3RvcmFnZS5sZWZ0ID0gKHRoaXMucGxheWVyLmxlZnQpOyBcbiAgICAgICAgICAgICAgICB0aGlzLnJlY2FsbFN0b3JhZ2UubGFuZSA9ICh0aGlzLnBsYXllci5sYW5lKTsgXG5cbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllck9iamVjdHMucHVzaCh0aGlzLnJlY2FsbFN0b3JhZ2UpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVjYWxsU3RvcmFnZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgICAgIC8vIGlmICghdGhpcy5yZWNhbGxTdG9yYWdlKXtcbiAgICAgICAgLy8gICAgIHRoaXMucmVjYWxsU3RvcmFnZSA9IHRoaXMucGxheWVyT2JqZWN0cy5maW5kKG9iaj0+IChvYmoucG9zaXRpb24ueS0zMCA9PT0gdGhpcy5wbGF5ZXIuZmxvb3IpJiYgIC8vY2hlY2tzIGZvciBleGlzdGluZyB1bml0IFxuICAgICAgICAvLyAgICAgKG9iai5wb3NpdGlvbi54ID09PSAodGhpcy5wbGF5ZXIuY3VyVGlsZSo4MCkrdGhpcy5wbGF5ZXIud2lkdGgvMikgJiYgKG9iai5uYW1lIT09J1dpeicgKSlcblxuICAgICAgICAvLyAgICAgaWYgKHRoaXMucmVjYWxsU3RvcmFnZSlcbiAgICAgICAgLy8gICAgIHtcbiAgICAgICAgLy8gICAgICAgICBsZXQgdHlwZSA9IHRoaXMucmVjYWxsU3RvcmFnZS50eXBlO1xuICAgICAgICAvLyAgICAgICAgIHRoaXMucGxheWVyT2JqZWN0cyA9IHRoaXMucGxheWVyT2JqZWN0cy5maWx0ZXIoICAvL3JlbW92ZXMgbG9vdGVkIGNvaW5zXG4gICAgICAgIC8vICAgICAgICAgICAgIGZ1bmN0aW9uIChvYmplY3Qpe3JldHVybiBvYmplY3QudHlwZSAhPSB0eXBlOyB9KTsgICAgXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gZWxzZSB7XG4gICAgICAgIC8vICAgICB0aGlzLnJlY2FsbFN0b3JhZ2UucG9zaXRpb24ueCA9ICh0aGlzLnBsYXllci5jdXJUaWxlKjgwKSt0aGlzLnBsYXllci53aWR0aC8yO1xuICAgICAgICAvLyAgICAgdGhpcy5yZWNhbGxTdG9yYWdlLnBvc2l0aW9uLnkgPSAodGhpcy5wbGF5ZXIuZmxvb3IrMzApOyBcblxuICAgICAgICAvLyAgICAgdGhpcy5wbGF5ZXJPYmplY3RzLnB1c2godGhpcy5yZWNhbGxTdG9yYWdlKTtcbiAgICAgICAgLy8gICAgIHRoaXMucmVjYWxsU3RvcmFnZSA9IGZhbHNlO1xuICAgICAgICAvLyB9XG5cblxuICAgIH1cblxuICAgIGNyZWF0ZU1vYihwYXJlbnQsIHR5cGUsIHNpZGUsIGdhbWUgPSBudWxsICl7XG4gICAgICAgIGlmIChzaWRlID09PSAwKXsgLy9TdW1tb24gdW5pdFxuICAgICAgICAgICAgaWYgKCF0aGlzLnBsYXllck9iamVjdHMuZmluZChvYmo9PiAob2JqLnBvc2l0aW9uLnktMzAgPT09IHRoaXMucGxheWVyLmZsb29yKSAmJiAgLy9jaGVja3MgZm9yIGV4aXN0aW5nIHVuaXQgXG4gICAgICAgICAgICAob2JqLnBvc2l0aW9uLnggPT09ICh0aGlzLnBsYXllci5jdXJUaWxlKjgwKSt0aGlzLnBsYXllci53aWR0aC8yKSAmJiAob2JqLm5hbWUhPT0nV2l6JykpKXtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgY29zdCA9IDEwMDA7IFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXllci5zdW1tb25Db3N0W3RoaXMucGxheWVyLnN1bW1vbkNvdW50XSl7IFxuICAgICAgICAgICAgICAgICAgICBjb3N0ID0gdGhpcy5wbGF5ZXIuc3VtbW9uQ29zdFt0aGlzLnBsYXllci5zdW1tb25Db3VudF07IFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIubW9uZXk+PWNvc3Qpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzLnB1c2gobmV3IE1vYihwYXJlbnQsIHR5cGUsIDApKSBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLm1vbmV5IC09IGNvc3Q7IFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuc3VtbW9uQ291bnQgKys7IFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGdhbWUpe2dhbWUuZXJyb3IgPSB0cnVlOyB9OyBcblxuICAgICAgICB9IGVsc2Uge3RoaXMubW9iT2JqZWN0cy5wdXNoKG5ldyBNb2IocGFyZW50LCB0eXBlLCAxKSl9XG4gICAgICAgIFxuICAgIH1cblxuICAgIGxvYWRCRygpe1xuICAgICAgICB0aGlzLmJnU2t5ID0gaW1nKCdiZy9iZ1NreScrdGhpcy5sZXZlbCsnLnBuZycpOyAvL2xvYWQgc2t5IGJnXG4gICAgfVxuXG4gICAgc3RhcnQoKXtcbiAgICAgICAgdGhpcy5zdGFydE1lbnUgPSBuZXcgc3RhcnRTY3JlZW4odGhpcyk7XG4gICAgICAgIHRoaXMuc3RhcnRNZW51LmluaXRpYWxpemUodGhpcyk7IFxuICAgICAgICB0aGlzLnVwZ3JhZGUgPSBuZXcgVXBncmFkZSh0aGlzKTsgXG4gICAgICAgIHRoaXMudXBncmFkZS5pbml0aWFsaXplKHRoaXMpOyBcbiAgICAgICAgdGhpcy5IVURNZW51ID0gbmV3IEhVRCh0aGlzKTsgXG4gICAgICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcih0aGlzKTtcbiAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzID0gW3RoaXMucGxheWVyXTtcbiAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIgPSBuZXcgSW5wdXRIYW5kbGVyKHRoaXMucGxheWVyLCB0aGlzLnVwZ3JhZGUsIHRoaXMpOyAgICAgICAgXG5cbiAgICAgICAgLy8gdGhpcy5wbGF5ZXJPYmplY3RzLnB1c2gobmV3IE1vYih0aGlzLnBsYXllciwgJ3JlZERyYWdvbicsIDAsNCw1KSk7IFxuICAgICAgICAvLyB0aGlzLnBsYXllck9iamVjdHMucHVzaChuZXcgTW9iKHRoaXMucGxheWVyLCAnYmx1ZURyYWdvbicsIDAsMiw1KSk7IFxuICAgICAgICAvLyB0aGlzLnBsYXllck9iamVjdHMucHVzaChuZXcgTW9iKHRoaXMucGxheWVyLCAnZ3JlZW5EcmFnb24nLCAwLDMsNSkpOyBcbiAgICAgICAgLy8gdGhpcy5wbGF5ZXJPYmplY3RzLnB1c2gobmV3IE1vYih0aGlzLnBsYXllciwgJ2JsYWNrRHJhZ29uJywgMCwxLDUpKTsgXG5cbiAgICB9XG5cblxuXG4gICAgZHJhdyhjdHgpeyAvL3J1bnMgZHJhdyBmdW5jdGlvbiBmb3Igb2JqZWN0IGxpc3QgXG5cbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmJnU2t5LCAwLCAwKTsgXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5iZ1N0YWdlLCAwLCAwKTsgXG4gICAgICAgIHRoaXMuc3RhcnRNZW51LmRpc3BsYXlNZW51KGN0eCwgdGhpcyApO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QuZW1vdGUodGhpcykpOyBcbiAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QuZHJhdyhjdHgsdGhpcy5wYXVzZSkgKVxuICAgICAgICB0aGlzLm1vYk9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9Pm9iamVjdC5kcmF3KGN0eCwgdGhpcy5wYXVzZSkgKTtcbiAgICAgICAgdGhpcy5tb25leU9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9Pm9iamVjdC5kcmF3KGN0eCx0aGlzLnBhdXNlKSApOyBcbiAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QuZHJhd1Byb2ooY3R4LHRoaXMucGF1c2UpICk7IC8vcGxheWVyIHByb2pcbiAgICAgICAgdGhpcy5tb2JPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QuZHJhd1Byb2ooY3R4LCB0aGlzLnBhdXNlKSApOyAvL21vYiBwcm9qIFxuXG5cbiAgICAgICAgdGhpcy5wbGF5ZXIucmVjYWxsSWNvbihjdHgsIHRoaXMpO1xuICAgIFxuICAgIH0gXG5cbiAgICBrbm9ja2JhY2sob2JqLCBkaXJlY3Rpb24sIG11bHRpKXtcbiAgICAgICAgaWYgKG9iai5uYW1lID09J1dpeicpeyAvL29ubHkgcGxheWVyIHBvcHMgdXBcbiAgICAgICAgICAgIG9iai5qdW1wID0gdHJ1ZTtcbiAgICAgICAgICAgIG9iai5pbnZ1bG5UaW1lID0gMTEwOyBcbiAgICAgICAgICAgIG9iai5zcGVlZFkgKz0gNDtcbiAgICAgICAgICAgIG9iai5rbm9ja2JhY2tGb3JjZT0gLTgqZGlyZWN0aW9uOyB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBvYmouaGl0ID0gdHJ1ZTsgXG4gICAgICAgICAgICBvYmoua25vY2tiYWNrVGltZSA9IHRoaXMuZ2FtZVRpbWVSZWFsOyAgLy9zdG9yZXMgd2hlbiB0YXJnZXQga25vY2tiYWNrO1xuICAgICAgICAgICAgaWYgKG9iai5ib3NzKXstMipkaXJlY3Rpb24qKDErIChtdWx0aS0xKS80KX0gLy9ib3NzIGxlc3Mga25vY2tiYWNrXG4gICAgICAgICAgICBlbHNlIHtvYmoua25vY2tiYWNrRm9yY2UgPSAtNCpkaXJlY3Rpb24qKDErIChtdWx0aS0xKS80KX07IC8vYWRkIGFzIHN0YXRcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxuICAgIGFnZ3JvKG9iajEsIG9iajIpeyAvLyBjaGVja3MgaWYgb2JqMSByYW5nZSBpcyB3aXRoaW4gb2JqMlxuICAgICAgICBmb3IgKGNvbnN0IHRhcmdldCBvZiBvYmoyKXtcbiAgICAgICAgICAgIGlmICh0YXJnZXQuaGVhbHRoPjApe1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChvYmoxLmhpdGJveFswXStvYmoxLmhpdGJveFsyXStvYmoxLnJhbmdlPnRhcmdldC5oaXRib3hbMF0gfHwgXG4gICAgICAgICAgICAgICAgICAgIG9iajEuaGl0Ym94WzBdLW9iajEucmFuZ2U8dGFyZ2V0LmhpdGJveFswXSt0YXJnZXQuaGl0Ym94WzJdKXsgLy9hZ2dybyBmcm9tIHJpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqMS5hZ2dybyAmJiBvYmoxLnNpZGUgPT0gMSAmJiBvYmoxLnBvc2l0aW9uLngrMTUwPHRoaXMuZ2FtZVdpZHRoKXtvYmoxLmF0dGFjaygpfSAvL2VuZW1pZXMgYXR0YWNrIG9uIENEXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChvYmoxLmhpdGJveFsxXTx0YXJnZXQuaGl0Ym94WzFdICYmIG9iajEuaGl0Ym94WzFdK29iajEuaGl0Ym94WzNdPnRhcmdldC5oaXRib3hbMV0gJiYgIG9iajEuc2lkZSA9PSAwICl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqMS5hdHRhY2soKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgbG9vdE1vbmV5KG9iajEsIG9iajIpe1xuICAgICAgICBmb3IgKGNvbnN0IHRhcmdldCBvZiBvYmoyKXsgLy8tKHRoaXMud2lkdGgqKC0xK3RoaXMubG9vdE11bHRpKSlcbiAgICAgICAgICAgIGlmICggKG9iajEuaGl0Ym94WzBdPHRhcmdldC5oaXRib3hbMF0gJiYgb2JqMS5oaXRib3hbMF0rODAqKG9iajEubG9vdE11bHRpKSA+IHRhcmdldC5oaXRib3hbMF0pIHx8IC8vb2JqMSBvbiBsZWZ0XG4gICAgICAgICAgICAgICAgKG9iajEuaGl0Ym94WzBdID4gdGFyZ2V0LmhpdGJveFswXSt0YXJnZXQuaGl0Ym94WzJdICYmIG9iajEuaGl0Ym94WzBdLTgwKihvYmoxLmxvb3RNdWx0aS0xKTx0YXJnZXQuaGl0Ym94WzBdK3RhcmdldC5oaXRib3hbMl0gKSl7IC8vb2JqMSBvbiByaWdodFxuICAgICAgICAgICAgICAgIGlmIChvYmoxLmhpdGJveFsxXTx0YXJnZXQuaGl0Ym94WzFdICYmIG9iajEuaGl0Ym94WzFdK29iajEuaGl0Ym94WzNdPnRhcmdldC5oaXRib3hbMV0pe1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRhcmdldC5zdGFydEZhZGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqMS5tb25leSArPSB0YXJnZXQudmFsdWU7IFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb25leUNvbGxlY3RlZCArPSB0YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQuc3RhcnRGYWRlID0gdHJ1ZTsvL3RydWU7IFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmZsb2F0ID0gdHJ1ZTsgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0YXJnZXQubG9zdCl7IFxuICAgICAgICAgICAgICAgIHRoaXMubW9uZXlMb3N0Kz10YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgICB0YXJnZXQudmFsdWU9MCB9OyBcbiAgICAgICAgfVxuICAgICAgICAgICAgXG5cbiAgICAgICAgdGhpcy5tb25leU9iamVjdHMgPSB0aGlzLm1vbmV5T2JqZWN0cy5maWx0ZXIoICAvL3JlbW92ZXMgbG9vdGVkIGNvaW5zXG4gICAgICAgIGZ1bmN0aW9uIChvYmplY3Qpe3JldHVybiBvYmplY3QuZGVsZXRlID09IGZhbHNlOyB9KTsgICAgIFxuICAgIH1cblxuICAgIGV4cGxvZGVEYW1hZ2Uob2JqMSwgb2JqMiwgb2JqMyl7XG4gICAgICAgIGZvciAoY29uc3QgdGFyZ2V0IG9mIG9iajIpe1xuICAgICAgICAgICAgaWYgKHRhcmdldC5oZWFsdGg+MCl7XG4gICAgICAgICAgICAgICAgaWYgKCAob2JqMS5oaXRib3hbMF08dGFyZ2V0LmhpdGJveFswXSAmJiBvYmoxLmhpdGJveFswXStvYmoxLmhpdGJveFsyXStvYmozLmFyZWEgPiB0YXJnZXQuaGl0Ym94WzBdKSB8fCAvL29iajEgLT50YXJnZXRcbiAgICAgICAgICAgICAgICAgICAgKG9iajEuaGl0Ym94WzBdK29iajEuaGl0Ym94WzJdPnRhcmdldC5oaXRib3hbMF0rdGFyZ2V0LmhpdGJveFsyXSAmJiBvYmoxLmhpdGJveFswXS1vYmozLmFyZWE8dGFyZ2V0LmhpdGJveFswXSt0YXJnZXQuaGl0Ym94WzJdICkpeyBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgob2JqMS5oaXRib3hbMV0+dGFyZ2V0LmhpdGJveFsxXSAmJiBvYmoxLmhpdGJveFsxXTx0YXJnZXQuaGl0Ym94WzFdK3RhcmdldC5oaXRib3hbM10pfHxvYmozLmNvbHVtbj4wKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqMS5wb2lzb24+MCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQucG9pc29uU3RhY2srMTxvYmoxLnBvaXNvbk1heCl7IC8vYWRkIHRvIG1heCBzdGFja3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5wb2lzb25BbW91bnQgKz0gb2JqMS5wb2lzb247XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQucG9pc29uU3RhY2srKzt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5wb2lzb25UaW1lID0gNTsgIC8vZm91ciB0aWNrcyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQuaGVhbHRoIC09IG9iajMuZGFtYWdlOyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqMy5leHBsb2RlRGFtYWdlRGVhbHQgKz0gb2JqMy5kYW1hZ2U7fVxuICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG5cbiAgICBjb2xsaXNpb24ob2JqMSwgb2JqMiwgb2JqMyA9IG51bGwpeyAvLyBjaGVja3MgaWYgb2JqMSBpcyBoaXR0aW5nIG9iajIgXG4gICAgICAgIGZvciAoY29uc3QgdGFyZ2V0IG9mIG9iajIpe1xuICAgICAgICAgICAgaWYgKG9iajEuaGVhbHRoPjAgJiYgdGFyZ2V0LmhlYWx0aD4wKXtcbiAgICAgICAgICAgICAgICBpZiAoIChvYmoxLmhpdGJveFswXTx0YXJnZXQuaGl0Ym94WzBdICYmIG9iajEuaGl0Ym94WzBdK29iajEuaGl0Ym94WzJdPiB0YXJnZXQuaGl0Ym94WzBdKSB8fCAvL29iajEgLT50YXJnZXRcbiAgICAgICAgICAgICAgICAgICAgKG9iajEuaGl0Ym94WzBdK29iajEuaGl0Ym94WzJdPnRhcmdldC5oaXRib3hbMF0rdGFyZ2V0LmhpdGJveFsyXSAmJiBcbiAgICAgICAgICAgICAgICAgICAgb2JqMS5oaXRib3hbMF08dGFyZ2V0LmhpdGJveFswXSt0YXJnZXQuaGl0Ym94WzJdICkpeyAvLyB0YXJnZXQgPC0gb2JqMVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmoxLmhpdGJveFsxXT50YXJnZXQuaGl0Ym94WzFdICYmIG9iajEuaGl0Ym94WzFdPHRhcmdldC5oaXRib3hbMV0rdGFyZ2V0LmhpdGJveFszXSl7IC8veS1ib3VuZGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iajEucHJvamVjdGlsZSAmJiAhb2JqMS5leHBsb2RlICYmICFvYmoxLmhpdExpc3QuaW5jbHVkZXModGFyZ2V0Lm5hbWUpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0LnNpZGUgPT0gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRhcmdldC5sYW5lID09IG9iajEubGFuZSl7IC8vcGxheWVyIG9ubHkgY2FuIGhpdCBmcm9tIHByb2ogaW4gbGFuZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYW1hZ2VDYWxjKG9iajEsIHRhcmdldCwgb2JqMyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoxLnBpZXJjZSAtPSAxOyAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoxLmhpdExpc3QucHVzaCh0YXJnZXQubmFtZSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYW1hZ2VDYWxjKG9iajEsIHRhcmdldCwgb2JqMyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iajEucGllcmNlIC09IDE7ICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqMS5oaXRMaXN0LnB1c2godGFyZ2V0Lm5hbWUpOyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iajMuYXJlYT4wKXt0aGlzLmV4cGxvZGVEYW1hZ2Uob2JqMSwgb2JqMiwgb2JqMyl9OyAvL2FyZWEgZGFtYWdlOyBjaGVja3MgZm9yIG5lYXJieSB0YXJnZXRzIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoxLnBpZXJjZTw9MCl7b2JqMS5leHBsb2RlID0gdHJ1ZX07IC8vZGVzdHJveSBwcm9qZWN0aWxlICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFvYmoxLnByb2plY3RpbGUpIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoxLmxhbmUgPT0gdGFyZ2V0LmxhbmUpe3RoaXMuZGFtYWdlQ2FsYyhvYmoxLCB0YXJnZXQpfTtcbiAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgZGFtYWdlQ2FsYyhvYmoxLCBvYmoyLCBvYmozID0gbnVsbCl7IC8vb2JqMSAob3duZWQgYnkgb2JqMykgYXR0YWNraW5nIG9iajIgXG4gICAgICAgIGlmIChvYmoyLmludnVsblRpbWUgPT0gMCAmJiBvYmoxLnRvdWNoSGl0KSB7XG4gICAgICAgICAgICBsZXQgZGFtYWdlID0gb2JqMS5kYW1hZ2U7XG4gICAgICAgICAgICBsZXQga25vY2tiYWNrID0gMTsgXG4gICAgICAgICAgICBpZiAob2JqMyl7b2JqMy5kYW1hZ2VEZWFsdCs9IGRhbWFnZTtcbiAgICAgICAgICAgICAgICAgICAga25vY2tiYWNrID0gb2JqMy5rbm9ja2JhY2tNdWx0aTsgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9iajEuY2hpbGw+MCl7XG4gICAgICAgICAgICAgICAgaWYgKCBNYXRoLmFicyhvYmoyLnNwZWVkWCktb2JqMi5jaGlsbEFtb3VudD4wKXtvYmoyLmNoaWxsQW1vdW50Kz0gb2JqMS5jaGlsbH1cbiAgICAgICAgICAgICAgICBlbHNlIG9iajIuY2hpbGxBbW91bnQgPSBNYXRoLmFicyhvYmoyLnNwZWVkWCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvYmoyLmhlYWx0aCAtPSBkYW1hZ2U7XG4gICAgICAgICAgICBvYmoyLmtub2NrYmFja1N1bSArPSBkYW1hZ2Uqa25vY2tiYWNrO1xuXG4gICAgICAgICAgICBpZiAob2JqMi5rbm9ja2JhY2tUaHJlc2ggPD0gb2JqMi5rbm9ja2JhY2tTdW0pe1xuICAgICAgICAgICAgICAgIGlmIChvYmoxLnBvc2l0aW9uLng+b2JqMi5wb3NpdGlvbi54KXsgdGhpcy5rbm9ja2JhY2sob2JqMiwgMSwga25vY2tiYWNrICl9XG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLmtub2NrYmFjayhvYmoyLCAtMSwga25vY2tiYWNrKTtcbiAgICAgICAgICAgICAgICBvYmoyLmtub2NrYmFja1N1bSA9IDAgXG4gICAgICAgICAgICAgICAgLy8gb2JqMi5rbm9ja2JhY2tUaHJlc2ggKj0xLjIgLy9pbmNyZWFzZSB0aHJlc2hvbGQgZWFjaCB0aW1lXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgIH1cblxuXG4gICAgfVxuICAgIGxvc2VMaWZlKGN0eCl7IC8vbW9iIGVzY2FwZXNcbiAgICAgICAgZm9yIChjb25zdCBvYmogb2YgdGhpcy5tb2JPYmplY3RzKXtcbiAgICAgICAgICAgIGlmIChvYmoucG9zaXRpb24ueCA8PSAtb2JqLndpZHRoKjIpe1xuICAgICAgICAgICAgICAgIC8vdGhpcy5wbGF5ZXIuaGVhbHRoIC09IDE7IFxuICAgICAgICAgICAgICAgIGlmICghb2JqLmZsaXApe1xuICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnZhbHVlLmxlbmd0aD4wKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpPG9iai52YWx1ZS5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbmV5TG9zdCs9b2JqLnZhbHVlW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7dGhpcy5tb25leUxvc3QgKz0gb2JqLnZhbHVlO30gLy9sb3N0IG1vbmV5XG4gICAgICAgICAgICAgICAgICAgIG9iai5hbGl2ZSA9IGZhbHNlOyAvL2RlbGV0ZSBtb25zZXI7IFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbnN0ZXJFc2NhcGUgKys7IFxuICAgICAgICAgICAgICAgIH0gZWxzZSB7b2JqLnNwZWVkWCA9IC1vYmouc3BlZWRYOyBvYmoubGVmdD0hb2JqLmxlZnQ7fVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAob2JqLnBvc2l0aW9uLnggPj0gdGhpcy5nYW1lV2lkdGggJiYgb2JqLnNwZWVkWDwwKVxuICAgICAgICAgICAgICAgIHtvYmouc3BlZWRYID0gLW9iai5zcGVlZFhcbiAgICAgICAgICAgICAgICBvYmoubGVmdD0hb2JqLmxlZnR9O1xuXG4gICAgICAgIH1cblxuICAgIH1cbiAgICAvLyBkcmF3R3JpZChjdHgpe1xuICAgIC8vICAgICBjdHguYmVnaW5QYXRoKCk7ICAvLyB0aGlzLmdhbWVIZWlnaHQgPSBnYW1lSGVpZ2h0XG4gICAgLy8gICAgIGN0eC5tb3ZlVG8oMCwgdGhpcy5nYW1lSGVpZ2h0KTtcbiAgICAvLyAgICAgY3R4LmxpbmVUbygxMDAwLCB0aGlzLmdhbWVIZWlnaHQpO1xuICAgIC8vICAgICBjdHgubGluZVRvKDEwMDAsIHRoaXMuZ2FtZUhlaWdodCAtIHRoaXMucm93SGVpZ2h0KTtcbiAgICAvLyAgICAgY3R4LmxpbmVUbygwLCB0aGlzLmdhbWVIZWlnaHQgLSB0aGlzLnJvd0hlaWdodCk7XG4gICAgLy8gICAgIGN0eC5saW5lVG8oMCwgdGhpcy5nYW1lSGVpZ2h0IC0gdGhpcy5yb3dIZWlnaHQqMik7XG4gICAgLy8gICAgIGN0eC5saW5lVG8oMTAwMCwgdGhpcy5nYW1lSGVpZ2h0IC0gdGhpcy5yb3dIZWlnaHQqMik7XG4gICAgLy8gICAgIGN0eC5saW5lVG8oMTAwMCwgdGhpcy5nYW1lSGVpZ2h0IC0gdGhpcy5yb3dIZWlnaHQqMyk7XG4gICAgLy8gICAgIGN0eC5saW5lVG8oMCwgdGhpcy5nYW1lSGVpZ2h0IC0gdGhpcy5yb3dIZWlnaHQqMyk7ICAgICAgICBcbiAgICAvLyAgICAgY3R4LnN0cm9rZSgpO1xuICAgIC8vIH1cblxuICAgIHVwZ3JhZGVNZW51KGN0eCl7XG4gICAgICAgIHRoaXMuSFVETWVudS5kaXNwbGF5SFVEKGN0eCwgdGhpcyk7ICBcbiAgICAgICAgdGhpcy51cGdyYWRlLmRpc3BsYXlNZW51KGN0eCwgdGhpcyk7XG5cbiAgICAgICAgaWYgKHRoaXMucGxheWVyLmhlYWx0aCA8PSAwICl7XG4gICAgICAgICAgICB0aGlzLmdhbWVPdmVyID0gdHJ1ZTsgXG4gICAgICAgICAgICB0aGlzLmVuZC5kaXNwbGF5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZW5kLmRpc3BsYXlNZW51KGN0eCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3Bhd25Nb25leShvYmope1xuICAgICAgICBpZiAob2JqLnN0YXRlID09ICdkaWUnICYmICFvYmoubG9vdERyb3Ape1xuICAgICAgICAgICAgaWYgKG9iai52YWx1ZS5sZW5ndGg+MCl7XG4gICAgICAgICAgICAgICAgbGV0IHggPSAtMC42KjIgOyAvL21vbmV5IHNwcmVhZFxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpPG9iai52YWx1ZS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9uZXlPYmplY3RzLnB1c2gobmV3IE1vbmV5KHRoaXMsIG9iaiwgb2JqLnZhbHVlW2ldLCB4K2kqMC42KSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHt0aGlzLm1vbmV5T2JqZWN0cy5wdXNoKG5ldyBNb25leSh0aGlzLCBvYmosIG9iai52YWx1ZSkpfVxuICAgICAgICAgICAgb2JqLmxvb3REcm9wID0gdHJ1ZTsgXG4gICAgICAgICAgICB0aGlzLm1vbnN0ZXJLaWxsKys7IFxuICAgICAgICB9XG4gICAgfVxuICAgIHVwZGF0ZSgpe1xuICAgICAgICB0aGlzLm1vYk9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9PnRoaXMuc3Bhd25Nb25leShvYmplY3QpKTsgXG4gICAgICAgIHRoaXMubG9zZUxpZmUoKTsgLy9lbmVtaWVzIHBhc3QgXG4gICAgICAgIHRoaXMubW9iT2JqZWN0cyA9IHRoaXMubW9iT2JqZWN0cy5maWx0ZXIoICAvL3JlbW92ZXMgZGVhZC9wYXNzaW5nIG9iamVjdHNcbiAgICAgICAgICAgIGZ1bmN0aW9uIChvYmplY3Qpe1xuICAgICAgICAgICAgICAgIHJldHVybiAob2JqZWN0LmFsaXZlICE9PSBmYWxzZSl9KTsgICAgICAgIFxuICAgICAgICB0aGlzLmxvb3RNb25leSh0aGlzLnBsYXllciwgdGhpcy5tb25leU9iamVjdHMpO1xuXG4gICAgICAgIHRoaXMucGxheWVyT2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LnVwZGF0ZSgpICk7IFxuICAgICAgICB0aGlzLm1vYk9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9Pm9iamVjdC51cGRhdGUodGhpcykgKTsgXG4gICAgICAgIHRoaXMubW9uZXlPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QudXBkYXRlKHRoaXMpICk7IFxuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMucGxheWVyLmFsaXZlKXtcbiAgICAgICAgICAgIHRoaXMucGxheWVyT2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+dGhpcy5hZ2dybyhvYmplY3QsIHRoaXMubW9iT2JqZWN0cykgKTsgIC8vc3VtbW9uIGF0dGFja3NcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1vYk9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9PnRoaXMuYWdncm8ob2JqZWN0LCB0aGlzLnBsYXllck9iamVjdHMpICk7IC8vbW9iIGF0dGFja3NcblxuICAgICAgICB0aGlzLmNvbGxpc2lvbih0aGlzLnBsYXllciwgdGhpcy5tb2JPYmplY3RzKTsgXG4gICAgICAgIHRoaXMubW9iT2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+dGhpcy5jb2xsaXNpb24ob2JqZWN0LCB0aGlzLnBsYXllck9iamVjdHMpICk7IFxuXG4gICAgICAgIHRoaXMubW9iT2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0Lm1vYkF0dGFjayh0aGlzKSk7IFxuICAgICAgICB0aGlzLnBsYXllck9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9Pm9iamVjdC5zdW1tb25BdHRhY2sodGhpcykpOyBcbiAgICAgICAgXG4gICAgICAgIHRoaXMubW9iT2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+IC8vbW9iIHByb2ogdG8gcGxheWVyIFxuICAgICAgICAgICAgb2JqZWN0LnByb2plY3RpbGVzLmZvckVhY2goIChvYmplY3QyKT0+IFxuICAgICAgICAgICAgICAgIHRoaXMuY29sbGlzaW9uKG9iamVjdDIsIFt0aGlzLnBsYXllcl0sIG9iamVjdCkpKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIHRoaXMucGxheWVyT2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+IC8vcGxheWVyIHByb2ogdG8gbW9ic1xuICAgICAgICAgICAgb2JqZWN0LnByb2plY3RpbGVzLmZvckVhY2goIChvYmplY3QyKT0+IFxuICAgICAgICAgICAgICAgICB0aGlzLmNvbGxpc2lvbihvYmplY3QyLCB0aGlzLm1vYk9iamVjdHMsIG9iamVjdClcbiAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICk7IFxuXG4gICAgfVxuICAgXG5cbiAgICBcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbWcoZmlsZSl7XHJcbiAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpOyBcclxuICAgIGltYWdlLnNyYyA9ICdpbWFnZXMvJytmaWxlOyBcclxuICAgIHJldHVybiBpbWFnZTsgXHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5wdXRIYW5kbGVye1xuICAgIGNvbnN0cnVjdG9yKHBsYXllciwgdXBncmFkZSwgR2FtZSl7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+eyAgICBcbiAgICAgICAgICAgIHN3aXRjaChldmVudC5rZXlDb2RlKXsgLy9hOjY1OyBzOjgzOyBkOjY4LCB3OiA4NztcblxuICAgICAgICAgICAgICAgIGNhc2UgMzc6IC8vbGVmdCBhcnJvd1xuICAgICAgICAgICAgICAgICAgICBpZiAoR2FtZS50aXRsZURpc3BsYXkgJiYgIUdhbWUuZmFkZU91dCAmJiBHYW1lLmxldmVsPjEpe0dhbWUubGV2ZWwtLX1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXBncmFkZS5kaXNwbGF5KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHVwZ3JhZGUuc2VsZWN0aW9uWD4xKXt1cGdyYWRlLnNlbGVjdGlvblgtPTF9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLnNwZWVkWCA9IC1wbGF5ZXIuc3BlZWQ7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5sZWZ0ID0gdHJ1ZTt9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgMzk6IC8vcmlnaHQgYXJyb3dcbiAgICAgICAgICAgICAgICAgICAgaWYgKEdhbWUudGl0bGVEaXNwbGF5ICYmICFHYW1lLmZhZGVPdXQgJiYgR2FtZS5sZXZlbDxHYW1lLmZpbmFsTGV2ZWwpe0dhbWUubGV2ZWwrK31cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXBncmFkZS5kaXNwbGF5KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih1cGdyYWRlLnNlbGVjdGlvblg8Mil7dXBncmFkZS5zZWxlY3Rpb25YKz0xfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5zcGVlZFggPSBwbGF5ZXIuc3BlZWQ7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5sZWZ0ID0gZmFsc2U7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBcblxuICAgICAgICAgICAgICAgIGNhc2UgMzg6IC8vIHVwIGFycm93XG4gICAgICAgICAgICAgICAgICAgIGlmICh1cGdyYWRlLmRpc3BsYXkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodXBncmFkZS5zZWxlY3Rpb25ZPjEpe3VwZ3JhZGUuc2VsZWN0aW9uWS09MX07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge3BsYXllci50ZWxlcG9ydCgtMSk7fVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY2FzZSA0MDogLy8gZG93biBhcnJvd1xuICAgICAgICAgICAgICAgICAgICBpZiAodXBncmFkZS5kaXNwbGF5KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHVwZ3JhZGUuc2VsZWN0aW9uWTw1KXt1cGdyYWRlLnNlbGVjdGlvblkrPTF9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtwbGF5ZXIudGVsZXBvcnQoMSk7fVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNhc2UgOTA6IC8vWiByZWNhbGxcbiAgICAgICAgICAgICAgICBpZiAoIUdhbWUudGl0bGVEaXNwbGF5KSB7R2FtZS5yZWNhbGwoKTsgfVxuICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgICAgICBjYXNlIDg4OiAvL1gganVtcFxuICAgICAgICAgICAgICAgICAgICBpZiAoIXBsYXllci5qdW1wKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5zcGVlZFkgPSAxMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5qdW1wID0gdHJ1ZTt9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhayAgICAgXG5cbiAgICAgICAgICAgICAgICBjYXNlIDY3OiAvL0MgYXR0YWNrXG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5hdHRhY2soR2FtZS5wYXVzZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgXG4gICAgICAgICAgICAgICAgY2FzZSA2NTogLy9BIG9wZW4gc2hvcFxuICAgICAgICAgICAgICAgICAgICAgICAgdXBncmFkZS50b2dnbGVNZW51KEdhbWUpOyBcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgICAgICAgIGNhc2UgODM6IC8vIFMgYnV5XG4gICAgICAgICAgICAgICAgICAgIGlmICh1cGdyYWRlLmRpc3BsYXkgJiYgIUdhbWUudGl0bGVEaXNwbGF5KXt1cGdyYWRlLnB1cmNoYXNlKEdhbWUpfVxuICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgICAgICBjYXNlIDY4OiAvL0Qgc3RhcnQgd2F2ZVxuICAgICAgICAgICAgICAgICAgICBpZiAoR2FtZS53YXZlRmluaXNoICYmIEdhbWUuc3RvcmFnZS5sZW5ndGg9PTApe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEdhbWUuZ2FtZVRpbWVSZWFsLUdhbWUuZmlyc3RMb2FkPjUwMDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWUubmV4dFdhdmUgPSB0cnVlOyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lLnN0YXJ0TWVudS5kaXNwbGF5ID0gZmFsc2V9OyB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgICAgICBjYXNlIDI3OiAvLyBFU0NcbiAgICAgICAgICAgICAgICAgICAgR2FtZS50b2dnbGVQYXVzZSgpOyBcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIC8vLy8vLy8vLy8vb2xkIGNvbnRyb2xzIFxuICAgICAgICAgICAgICAgIC8vIGNhc2UgNjU6IC8vQSBtb3ZlIGxlZnQgXG4gICAgICAgICAgICAgICAgLy8gICAgIGlmICh1cGdyYWRlLmRpc3BsYXkpe1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgaWYodXBncmFkZS5zZWxlY3Rpb25YPjEpe3VwZ3JhZGUuc2VsZWN0aW9uWC09MX07XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgcGxheWVyLnNwZWVkWCA9IC1wbGF5ZXIuc3BlZWQ7IFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgcGxheWVyLmxlZnQgPSB0cnVlO31cbiAgICAgICAgICAgICAgICAvLyAgICAgYnJlYWs7XG5cblxuICAgICAgICAgICAgICAgIC8vIGNhc2UgNjg6IC8vRCBtb3ZlIHJpZ2h0XG4gICAgICAgICAgICAgICAgLy8gaWYgKHVwZ3JhZGUuZGlzcGxheSl7XG4gICAgICAgICAgICAgICAgLy8gICAgIGlmKHVwZ3JhZGUuc2VsZWN0aW9uWDwyKXt1cGdyYWRlLnNlbGVjdGlvblgrPTF9O1xuICAgICAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIHBsYXllci5zcGVlZFggPSBwbGF5ZXIuc3BlZWQ7IFxuICAgICAgICAgICAgICAgIC8vICAgICBwbGF5ZXIubGVmdCA9IGZhbHNlO31cbiAgICAgICAgICAgICAgICAvLyAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAvLyBjYXNlIDg3OiAvL1cgdGVsZXBvcnQgdXBcbiAgICAgICAgICAgICAgICAvLyBpZiAodXBncmFkZS5kaXNwbGF5KXtcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYodXBncmFkZS5zZWxlY3Rpb25ZPjEpe3VwZ3JhZGUuc2VsZWN0aW9uWS09MX07XG4gICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAvLyBlbHNlIHtwbGF5ZXIudGVsZXBvcnQoLTEpO31cbiAgICAgICAgICAgICAgICAvLyAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gY2FzZSA4MzogLy9TIHRlbGVwb3J0IGRvd25cbiAgICAgICAgICAgICAgICAvLyBpZiAodXBncmFkZS5kaXNwbGF5KXtcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYodXBncmFkZS5zZWxlY3Rpb25ZPDUpe3VwZ3JhZGUuc2VsZWN0aW9uWSs9MX07XG4gICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAvLyBlbHNlIHtwbGF5ZXIudGVsZXBvcnQoMSk7fVxuICAgICAgICAgICAgICAgIC8vICAgICBicmVha1xuXG5cbiAgICAgICAgICAgICAgICAvLyBjYXNlIDc0OiAgLy9KIFxuICAgICAgICAgICAgICAgIC8vIGlmICh1cGdyYWRlLmRpc3BsYXkpe3VwZ3JhZGUucHVyY2hhc2UoR2FtZSl9ICAgIFxuICAgICAgICAgICAgICAgIC8vIGVsc2UgaWYgKCFwbGF5ZXIuanVtcCl7XG4gICAgICAgICAgICAgICAgLy8gICAgIHBsYXllci5zcGVlZFkgPSAxMjtcbiAgICAgICAgICAgICAgICAvLyAgICAgcGxheWVyLmp1bXAgPSB0cnVlO31cbiAgICAgICAgICAgICAgICAvLyAgICAgYnJlYWsgXG5cbiAgICAgICAgICAgICAgICAvLyBjYXNlIDc1OiAvL0tcbiAgICAgICAgICAgICAgICAvLyAgICAgcGxheWVyLmF0dGFjayhHYW1lLnBhdXNlKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgYnJlYWtcblxuICAgICAgICAgICAgICAgIC8vIGNhc2UgNzk6IC8vT1xuICAgICAgICAgICAgICAgIC8vICAgICBpZiAoR2FtZS53YXZlRmluaXNoICYmIEdhbWUuc3RvcmFnZS5sZW5ndGg9PTApe1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgR2FtZS5uZXh0V2F2ZSA9IHRydWU7IFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgR2FtZS5zdGFydE1lbnUuZGlzcGxheSA9IGZhbHNlfTsgXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBicmVha1xuXG4gICAgXG4gICAgICAgICAgICAgICAgLy8gY2FzZSA5NjpcbiAgICAgICAgICAgICAgICAvLyAgICAgdXBncmFkZS50b2dnbGVNZW51KCk7IFxuICAgICAgICAgICAgICAgIC8vICAgICBicmVha1xuXG4gICAgICAgICAgICAgICAgLy8gY2FzZSA5NzogLy8xXG4gICAgICAgICAgICAgICAgLy8gICAgIEdhbWUuY3JlYXRlTW9iKHBsYXllciwgJ3JlZERyYWdvbicsIDApO1xuICAgICAgICAgICAgICAgIC8vICAgICBicmVha1xuICAgICAgICAgICAgICAgIC8vIGNhc2UgOTg6IC8vMlxuICAgICAgICAgICAgICAgIC8vICAgICBHYW1lLmNyZWF0ZU1vYihwbGF5ZXIsICdibHVlRHJhZ29uJywgMCk7XG4gICAgICAgICAgICAgICAgLy8gICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgLy8gY2FzZSA5OTogLy8zXG4gICAgICAgICAgICAgICAgLy8gICAgIEdhbWUuY3JlYXRlTW9iKHBsYXllciwgJ2dyZWVuRHJhZ29uJywgMCk7XG4gICAgICAgICAgICAgICAgLy8gICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgLy8gY2FzZSAxMDA6IC8vNFxuICAgICAgICAgICAgICAgIC8vICAgICBHYW1lLmNyZWF0ZU1vYihwbGF5ZXIsICdibGFja0RyYWdvbicsIDApO1xuICAgICAgICAgICAgICAgIC8vICAgICBicmVha1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZXZlbnQpID0+eyAgICBcbiAgICAgICAgICAgIHN3aXRjaChldmVudC5rZXlDb2RlKXsgLy9hOjY1OyBzOjgzOyBkOjY4LCB3OiA4NztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoR2FtZS50aXRsZURpc3BsYXkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZS5mYWRlT3V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWUuZmlyc3RMb2FkID0gR2FtZS5nYW1lVGltZVJlYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+e0dhbWUudGl0bGVEaXNwbGF5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZS5yZXNldEV2ZXJ5dGhpbmcoKTsgXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCA4MDApfVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgY2FzZSA5OiAgXG4gICAgICAgICAgICAgICAgY2FzZSAxODogXG4gICAgICAgICAgICAgICAgY2FzZSAxMTY6IGJyZWFrOyBcblxuICAgICAgICAgICAgICAgIGNhc2UgMzc6ICAgLy9BID0gNjVcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllci5zcGVlZFg8MCkgcGxheWVyLnNwZWVkWCA9IDA7IFxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDM5OiAvLyBEID0gNjhcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllci5zcGVlZFg+MCkgcGxheWVyLnNwZWVkWCA9IDA7IFxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pXG4gICAgICAgIFxuICAgIH1cbn0iLCJpbXBvcnQgU3ByaXRlQW5pbWF0aW9uIGZyb20gJy4vU3ByaXRlQW5pbWF0aW9uJzsgXG5pbXBvcnQgUHJvamVjdGlsZSBmcm9tICcuL3Byb2plY3RpbGUnOyBcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9ie1xuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHR5cGUsIHNpZGUsIHRlc3QgPSAwLCBsZXZlbD0wKXtcbiAgICAgICAgdGhpcy5zaWRlID0gc2lkZTtcbiAgICAgICAgaWYgKHRoaXMuc2lkZSA9PSAwKXt0aGlzLnR5cGVJbmZvID0gcmVxdWlyZSgnLi9zdW1tb25JbmZvLmpzb24nKSB9XG4gICAgICAgIGVsc2UgKHRoaXMudHlwZUluZm8gPSByZXF1aXJlKCcuL21vYkluZm8uanNvbicpKVxuICAgICAgICBcbiAgICAgICAgdGhpcy5nYW1lV2lkdGggPSBnYW1lLmdhbWVXaWR0aDtcbiAgICAgICAgdGhpcy5nYW1lSGVpZ2h0ID0gZ2FtZS5nYW1lSGVpZ2h0O1xuXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7IFxuICAgICAgICAgXG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3ZhbHVlJ107IFxuICAgICAgICB0aGlzLmxvb3REcm9wID0gZmFsc2U7IFxuICAgICAgICB0aGlzLnByb2plY3RpbGVzID0gW107XG4gICAgICAgIHRoaXMuc3BlZWQgPSAxO1xuICAgICAgICB0aGlzLmxldmVsID0gMTsgXG4gICAgICAgIHRoaXMuZmFkZSA9IDE7IFxuICAgICAgICBcbiAgICAgICAgdGhpcy5hbGl2ZSA9IHRydWU7ICBcbiAgICAgICAgdGhpcy5hdHRhY2tDRCA9IDA7IFxuICAgICAgICB0aGlzLm1heFNwZWVkID0gMTU7IFxuICAgICAgICB0aGlzLnNwZWVkID0gMjtcbiAgICAgICAgdGhpcy50b3VjaEhpdCA9IHRydWU7IFxuICAgICAgICB0aGlzLmtub2NrYmFja0ZvcmNlID0gMDsgXG4gICAgICAgIHRoaXMuc3ByaXRlID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydzcHJpdGUnXTsgXG4gICAgICAgIC8vdGhpcy5kYW1hZ2UgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2RhbWFnZSddOyBcbiAgICAgICAgdGhpcy5hdHRhY2tTcGVlZCA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnYXRrU3BkJ107IFxuICAgICAgICBcbiAgICAgICAgdGhpcy5zcGVlZFggPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3NwZWVkJ107XG4gICAgICAgIHRoaXMuc3BlZWRZID0gMDsgXG4gICAgICAgIHRoaXMuZ3Jhdml0eVRpbWUgPSAxO1xuICAgICAgICB0aGlzLmxhbmUgPSBnYW1lLmxhbmU7ICAvLyB3aGljaCBsYW5lXG4gICAgICAgIGlmICh0aGlzLnNpZGUgPT0gMSl7IC8vRW5lbXkgTW9iIFxuICAgICAgICAgICAgdGhpcy5pbnZ1bG5UaW1lID0gIDA7IFxuICAgICAgICAgICAgdGhpcy5uYW1lID0gdGhpcy50eXBlK2dhbWUubW9iQ291bnQ7IFxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IDQ1OyAvL3Nwcml0ZSBzaXplIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydoZWlnaHQnXSl7dGhpcy5oZWlnaHQgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2hlaWdodCddfVxuICAgICAgICAgICAgZWxzZSB0aGlzLmhlaWdodCA9IDY1O1xuICAgICAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsncmFuZ2UnXSl7dGhpcy5yYW5nZSA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsncmFuZ2UnXX1cbiAgICAgICAgICAgIGVsc2Uge3RoaXMucmFuZ2UgPSAxMDt9XG4gICAgICAgICAgICB0aGlzLmxlZnQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5oZWFsdGggPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2hlYWx0aCddO1xuICAgICAgICAgICAgdGhpcy5tYXhIZWFsdGggPSB0aGlzLmhlYWx0aDsgXG4gICAgICAgICAgICB0aGlzLmFybW9yID0gMDtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAnd2Fsayc7XG4gICAgICAgICAgICB0aGlzLnhPZmY9LTcwO1xuICAgICAgICAgICAgdGhpcy55T2ZmPS04NTtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSB7ICAvL3Bvc2l0aW9uIChyaWdodHNpZGUpXG4gICAgICAgICAgICAgICAgeDogdGhpcy5nYW1lV2lkdGgrNTAsIFxuICAgICAgICAgICAgICAgIHk6IHRoaXMuZ2FtZUhlaWdodCAtIDEwNSAtIGdhbWUucm93SGVpZ2h0KmdhbWUubGFuZSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHsgLy8gUEMgcGV0c1xuICAgICAgICAgICAgdGhpcy5pbnZ1bG5UaW1lID0gMTsgXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gNTA7IC8vc3ByaXRlIHNpemUgXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IDUwOyBcbiAgICAgICAgICAgIHRoaXMucmFuZ2UgPSA2MDA7IC8vd2hvbGUgbGFuZT9cbiAgICAgICAgICAgIHRoaXMuaGVhbHRoID0gMTsgXG4gICAgICAgICAgICB0aGlzLmFybW9yID0gMTsgXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gJ3N0YW5kJ1xuICAgICAgICAgICAgdGhpcy5sZWZ0ID0gZmFsc2U7IFxuICAgICAgICAgICAgdGhpcy55T2ZmPTA7XG4gICAgICAgICAgICB0aGlzLnhPZmY9MDtcbiAgICAgICAgICAgIHRoaXMuZGFtYWdlRGVhbHQgPSAwO1xuICAgICAgICAgICAgdGhpcy5hZ2dybyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ25hbWUnXTtcbiAgICAgICAgICAgIGlmIChsZXZlbCE9MCkge3RoaXMubGV2ZWwgPSBsZXZlbH07IFxuICAgICAgICAgICAgdGhpcy5sYWJlbCA9ICdMdmwuICcgKyB0aGlzLmxldmVsOyBcbiAgICAgICAgICAgIHRoaXMuZW1vdGVUaW1lID0gMTAwO1xuICAgICAgICAgICAgdGhpcy5lbW90ZUxlbmd0aCA9IFtdO1xuICAgICAgICAgICAgdGhpcy55U3RhcnQgPSBnYW1lLmZsb29yKzMwO1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHsgIC8vcG9zaXRpb24gXG4gICAgICAgICAgICB4OiAoZ2FtZS5jdXJUaWxlKjgwKStnYW1lLndpZHRoLzIsIFxuICAgICAgICAgICAgeTogZ2FtZS5mbG9vciszMFxuICAgICAgICAgICAgfSAgXG4gICAgICAgIH07ICAvL29mZnNldCBmb3Igc3ByaXRlcyBcbiAgICAgICAgLy9pZiAodGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd5T2ZmJ10pICh0aGlzLnBvc2l0aW9uLnkgLT10aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3lPZmYnXSkgO1xuICAgICAgICBpZiAodGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydzcHJpdGVUeXBlJ10pe3RoaXMubG9hZFNwcml0ZSA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnc3ByaXRlVHlwZSddWzBdfVxuICAgICAgICBlbHNlIHt0aGlzLmxvYWRTcHJpdGUgPSB0aGlzLnR5cGV9O1xuICAgICAgICB0aGlzLmZvcm0gPSAwOyBcbiAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnZGFtYWdlJ10pe3RoaXMuZGFtYWdlID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydkYW1hZ2UnXX1cbiAgICAgICAgZWxzZSB0aGlzLmRhbWFnZSA9IDE7XG4gICAgICAgIGlmICh0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2FnZ3JvJ10pdGhpcy5hZ2dybyA9IHRydWU7XG5cbiAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnd2lkdGgyJ10pe3RoaXMud2lkdGgyID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd3aWR0aDInXX1cbiAgICAgICAgZWxzZSB7dGhpcy53aWR0aDI9MH07XG4gICAgICAgIGlmICh0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2hlaWdodDInXSl7dGhpcy5oZWlnaHQyID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydoZWlnaHQyJ119XG4gICAgICAgIGVsc2UgdGhpcy5oZWlnaHQyID0gMDtcblxuICAgICAgICBpZiAodGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd5T2ZmJ10pe3RoaXMueU9mZiA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsneU9mZiddfVxuICAgICAgICBpZiAodGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd4T2ZmJ10pe3RoaXMueE9mZiA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsneE9mZiddfVxuICAgICAgICBpZiAodGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydib3NzJ10pe3RoaXMuYm9zcyA9IHRydWU7IFxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueS09NzA7IHRoaXMuaGVpZ2h0Kz0xMDB9OyBcbiAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsncm9hbSddKXtcbiAgICAgICAgICAgIHRoaXMucm9hbSA9IHRydWU7IFxuICAgICAgICAgICAgdGhpcy5yb2FtVGltZSA9IDUwO1xuICAgICAgICAgICAgdGhpcy5yb2FtWSA9IHRoaXMubGFuZSpnYW1lLnJvd0hlaWdodDsgXG4gICAgICAgICAgICB0aGlzLnJvYW1MaW1pdHMgPSBbMCwgZ2FtZS5yb3dIZWlnaHQsIGdhbWUucm93SGVpZ2h0KjJdOyAvLzAsMSwyXG4gICAgICAgICAgICAvL3RoaXMuZGVzdGluYXRpb24gPSAwO1xuICAgICAgICAgfVxuICAgICAgICBlbHNlIHt0aGlzLnJvYW0gPSBmYWxzZX07IFxuICAgICAgICBcbiAgICAgICAgdGhpcy54T2ZmMiA9IDA7IFxuICAgICAgICB0aGlzLmtub2NrYmFja1RpbWUgPSAwIDsgIFxuICAgICAgICB0aGlzLmtub2NrYmFja1RocmVzaCA9IE1hdGguZmxvb3IodGhpcy5tYXhIZWFsdGggLyAzKTtcbiAgICAgICAgdGhpcy5rbm9ja2JhY2tTdW0gPSAwOyAgXG4gICAgICAgIHRoaXMua25vY2tiYWNrUmVzaXN0ID0gMC4zXG4gICAgICAgIHRoaXMuaGl0ID0gZmFsc2U7IFxuICAgICAgICB0aGlzLmNyZWF0ZUFuaW1hdGlvbnMoKTsgXG4gICAgICAgIHRoaXMuZW1vdGVDaGFuZ2UgPSB0cnVlO1xuICAgICAgICB0aGlzLmVtb3RlVGltZXIgPSB0cnVlO1xuICAgICAgICB0aGlzLmVtb3RlVGltZU91dCA9IFtdO1xuICAgICAgICB0aGlzLnBvc2lvbkdyYXBoaWMgPSBbXTsgXG4gICAgICAgIHRoaXMuaGl0QnkgPSBbXTsgXG4gICAgICAgIHRoaXMuZGFtYWdlTXVsdGkgPSAxOyBcbiAgICAgICAgdGhpcy5sb290TXVsdGkgPSAxO1xuICAgICAgICB0aGlzLmtub2NrYmFja011bHRpID0gMTtcbiAgICAgICAgdGhpcy5zcGVlZE11bHRpID0gMTsgXG4gICAgICAgIHRoaXMucGllcmNlID0gMTsgXG5cbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlQW1vdW50ID0gMDsgXG4gICAgICAgIHRoaXMuY2hpbGxBbW91bnQgPSAwOyBcbiAgICAgICAgdGhpcy5wb2lzb25Mb2FkZWQgPSBmYWxzZTsgLy9sb2FkIHNwcml0ZSBcbiAgICAgICAgdGhpcy5wb2lzb25UaW1lID0gMDsgXG4gICAgICAgIHRoaXMucG9pc29uQW1vdW50ID0gMDsgXG4gICAgICAgIHRoaXMucG9pc29uVGljayA9IDA7XG4gICAgICAgIHRoaXMuY2hpbGwgPSAwO1xuICAgICAgICB0aGlzLmFyZWEgPSAwOyBcbiAgICAgICAgdGhpcy5jb2x1bW4gPSAwOyBcbiAgICAgICAgdGhpcy5leHBsb2RlRGFtYWdlRGVhbHQgPSAwIFxuICAgICAgICB0aGlzLnBvaXNvbiA9IDA7IFxuICAgICAgICB0aGlzLnBvaXNvblN0YWNrID0gMDsgXG4gICAgICAgIHRoaXMucG9pc29uTWF4ID0gMDsgXG5cbiAgICAgICAgdGhpcy5hdHRhY2tlZCA9IGZhbHNlIDtcbiAgICAgICAgdGhpcy5hdHRhY2tTdGFydCA9IDA7XG4gICAgICAgIHRoaXMuZGVsYXlBdHRhY2sgPSBmYWxzZTtcblxuICAgICAgICBpZiAodGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydmbGlwJ10pe3RoaXMuZmxpcCA9IHRydWUgfVxuICAgICAgICBpZiAodGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd3ZWlyZCddKXtcbiAgICAgICAgICAgIHRoaXMud2VpcmQgPSB0cnVlOyBcbiAgICAgICAgICAgIHRoaXMud2VpcmRTdGFydCA9IGdhbWUuZ2FtZVRpbWVSZWFsOyBcbiAgICAgICAgICAgIHRoaXMud2VpcmRUaW1lID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjMwMDApKzIwMDA7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0ZXN0PT0xKXtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueCA9IDI2MDsgXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgPSAzOTU7IC8vYm90dG9tXG4gICAgICAgICAgICB0aGlzLmxhbmUgPSAwO1xuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGVzdD09Mil7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnggPSAyNjA7IFxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gMzA1OyAvL21pZGRsZVxuICAgICAgICAgICAgdGhpcy5sYW5lID0gMTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRlc3Q9PTMpe1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54ID0gMjYwOyBcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSA9IDIxNTsgLy90b3AgXG4gICAgICAgICAgICB0aGlzLmxhbmUgPSAyOyAgICBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0ZXN0PT00KXtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueCA9IDM0MDsgXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgPSAzMDU7IC8vIG1pZGRsZSAjMlxuICAgICAgICAgICAgdGhpcy5sYW5lID0gMTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT0gJ3JlZERyYWdvbicpe1xuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw+PTIpe3RoaXMucHJvamVjdGlsZUFtb3VudCsrOyB0aGlzLmRhbWFnZU11bHRpKz0wLjN9XG4gICAgICAgICAgICBpZiAodGhpcy5sZXZlbD49Myl7dGhpcy5hcmVhICs9IDYwOyB0aGlzLmRhbWFnZU11bHRpKz0wLjN9XG4gICAgICAgICAgICBpZiAodGhpcy5sZXZlbD49NCl7dGhpcy5hcmVhICs9NDA7IHRoaXMucHJvamVjdGlsZUFtb3VudCsrfTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodGhpcy50eXBlID09ICdibHVlRHJhZ29uJyl7XG4gICAgICAgICAgICBpZiAodGhpcy5sZXZlbD49Mil7dGhpcy5wcm9qZWN0aWxlQW1vdW50Kys7IHRoaXMucGllcmNlICs9IDE7fVxuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw+PTMpe3RoaXMuY2hpbGwgKz0gMC4yOyB0aGlzLnBpZXJjZSArPSAxfVxuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw+PTQpe3RoaXMuY2hpbGwgKz0gMC4xOyB0aGlzLnByb2plY3RpbGVBbW91bnQrK307XG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT0gJ2dyZWVuRHJhZ29uJyl7XG4gICAgICAgICAgICBpZiAodGhpcy5sZXZlbD49Mil7dGhpcy5wcm9qZWN0aWxlQW1vdW50Kys7fVxuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw+PTMpe3RoaXMucG9pc29uICs9IDAuNDsgdGhpcy5hcmVhICs9IDIwOyB0aGlzLnBvaXNvbk1heCs9MTA7fVxuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw+PTQgKXt0aGlzLnBvaXNvbiArPSAwLjQ7IHRoaXMuYXJlYSArPSAxMDsgdGhpcy5wb2lzb25NYXgrPTU7IHRoaXMucHJvamVjdGlsZUFtb3VudCsrfVxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy50eXBlID09ICdibGFja0RyYWdvbicpe1xuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw+PTIpe3RoaXMucHJvamVjdGlsZUFtb3VudCsrOyB0aGlzLmRhbWFnZU11bHRpKz0wLjJ9XG4gICAgICAgICAgICBpZiAodGhpcy5sZXZlbD49Myl7dGhpcy5hcmVhICs9MTU7IHRoaXMuY29sdW1uPTE7dGhpcy5kYW1hZ2VNdWx0aSs9MC4yfVxuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw+PTQpe3RoaXMuYXJlYSArPTE1OyB0aGlzLnByb2plY3RpbGVBbW91bnQrK31cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMubGV2ZWw+PTMpe3RoaXMuZXZvbHZlKCl9IFxuXG4gICAgfVxuXG5cbiAgICBjcmVhdGVBbmltYXRpb25zKCl7IC8vaW1wb3J0IHNwcml0ZXMgXG4gICAgICAgIHRoaXMuZnJhbWVzID0gMzA7IFxuICAgICAgICBpZiAodGhpcy5zcHJpdGU9PSdtb2InKXsgLy8gRW5lbXkgbW9ic1xuICAgICAgICAgICAgdGhpcy5zdGFuZCA9IG5ldyBTcHJpdGVBbmltYXRpb24odGhpcy5sb2FkU3ByaXRlKycvc3RhbmRfPy5wbmcnLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3N0YW5kJ10sIDEwLCBcInN0YW5kXCIpOyAvL3N0YW5kaW5nIHNwcml0ZXM7IFxuICAgICAgICAgICAgdGhpcy53YWxrID0gbmV3IFNwcml0ZUFuaW1hdGlvbih0aGlzLmxvYWRTcHJpdGUrJy9tb3ZlXz8ucG5nJywgdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd3YWxrJ10sIDEwLCBcIndhbGtcIik7IC8vd2Fsa2luZyBzcHJpdGVzOyBcbiAgICAgICAgICAgIHRoaXMuaGl0ID0gbmV3IFNwcml0ZUFuaW1hdGlvbih0aGlzLmxvYWRTcHJpdGUrJy9oaXQxXz8ucG5nJywwLCAxMCwgXCJoaXRcIik7XG4gICAgICAgICAgICB0aGlzLmRpZSA9IG5ldyBTcHJpdGVBbmltYXRpb24odGhpcy5sb2FkU3ByaXRlKycvZGllMV8/LnBuZycsIHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnZGllJ10sIDE1LCBcImRpZVwiLCB0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IFt0aGlzLnN0YW5kLCB0aGlzLndhbGssIHRoaXMuaGl0LCB0aGlzLmRpZV07IFxuICAgICAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnYW5ncnknXSl7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmdyeSA9IG5ldyBTcHJpdGVBbmltYXRpb24odGhpcy5sb2FkU3ByaXRlKycvYXR0YWNrMV8/LnBuZycsIHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnYW5ncnknXSwgMTAsIFwiYXR0YWNrXCIsIHRydWUpXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zLnB1c2godGhpcy5hbmdyeSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9ICAgICAgICAgICBcbiAgICAgICAgZWxzZSB7IFxuICAgICAgICAgICAgdGhpcy5zdGFuZCA9IG5ldyBTcHJpdGVBbmltYXRpb24odGhpcy5sb2FkU3ByaXRlICsnL3N0YW5kMV8/LnBuZycsIHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnc3RhbmQnXVt0aGlzLmZvcm1dLCAxMCwgXCJzdGFuZFwiKTsgLy9zdGFuZGluZyBzcHJpdGVzOyBcbiAgICAgICAgICAgIHRoaXMuYW5ncnkgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKHRoaXMubG9hZFNwcml0ZSArJy9hbmdyeV8/LnBuZycsIHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnYW5ncnknXVt0aGlzLmZvcm1dLCAxMCwgXCJhdHRhY2tcIiwgdHJ1ZSk7IC8vd2Fsa2luZyBzcHJpdGVzOyBcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IFt0aGlzLnN0YW5kLCB0aGlzLmFuZ3J5XTsgXG4gICAgICAgICAgICBsZXQgZW1vdGVzID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydlbW90ZSddW3RoaXMuZm9ybV07XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTxlbW90ZXMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGxldCBlbW90ZSA9IG5ldyBTcHJpdGVBbmltYXRpb24odGhpcy5sb2FkU3ByaXRlICsnLycrZW1vdGVzW2ldWzBdKydfPy5wbmcnLCBlbW90ZXNbaV1bMV0sIDEwLCBcImVtb3RlXCIrKDEraSkgKTsgLy9lbW90ZTsgXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zLnB1c2goZW1vdGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1vdGVMZW5ndGgucHVzaChlbW90ZXNbaV1bMl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmFuaW1hdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGV2b2x2ZSgpe1xuICAgICAgICB0aGlzLmZvcm0rKzsgXG4gICAgICAgIHRoaXMubG9hZFNwcml0ZSA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnc3ByaXRlVHlwZSddW3RoaXMuZm9ybV07IFxuICAgICAgICB0aGlzLmVtb3RlTGVuZ3RoID0gW107IFxuICAgICAgICB0aGlzLmNyZWF0ZUFuaW1hdGlvbnMoKTsgLy8gdXBkYXRlIHNwcml0ZXMgXG5cbiAgICB9XG4gICAgbGV2ZWxVcChwbGF5ZXIpeyBcbiAgICAgICAgbGV0IGNvc3QgPSBwbGF5ZXIudXBncmFkZUNvc3RbdGhpcy5sZXZlbC0xXTtcbiAgICAgICAgaWYgKHBsYXllci5tb25leT49Y29zdCl7XG4gICAgICAgICAgICB0aGlzLmxldmVsKys7ICBcbiAgICAgICAgICAgIHRoaXMubGFiZWwgPSAnTHZsLiAnICsgdGhpcy5sZXZlbDsgXG4gICAgICAgICAgICB0aGlzLnZhbHVlICs9IGNvc3Q7IFxuICAgICAgICAgICAgcGxheWVyLm1vbmV5IC09IGNvc3Q7IFxuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw9PTMpe3RoaXMuZXZvbHZlKCl9IFxuICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAncmVkRHJhZ29uJyl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw9PTIpe3RoaXMucHJvamVjdGlsZUFtb3VudCsrOyB0aGlzLmRhbWFnZU11bHRpKz0wLjI1fVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubGV2ZWw9PTMpe3RoaXMuYXJlYSArPSA2MDsgdGhpcy5kYW1hZ2VNdWx0aSs9MC4yNX1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmxldmVsPj00KXt0aGlzLmFyZWEgKz0gMzA7IHRoaXMucHJvamVjdGlsZUFtb3VudCArK307XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAodGhpcy50eXBlID09ICdibHVlRHJhZ29uJyl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw9PTIpe3RoaXMucHJvamVjdGlsZUFtb3VudCsrO31cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmxldmVsPT0zKXt0aGlzLmNoaWxsICs9IDAuMjsgdGhpcy5waWVyY2UgKz0gMX1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmxldmVsPj00KXt0aGlzLmNoaWxsICs9IDAuMTsgdGhpcy5wcm9qZWN0aWxlQW1vdW50ICsrfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAodGhpcy50eXBlID09ICdncmVlbkRyYWdvbicpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPT0yKXt0aGlzLnByb2plY3RpbGVBbW91bnQrKzt9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5sZXZlbD09Myl7dGhpcy5wb2lzb24gKz0gMC42OyB0aGlzLnBvaXNvbk1heCs9Njt0aGlzLnBpZXJjZSArPSAxfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubGV2ZWw+PTQgKXt0aGlzLnBvaXNvbiArPSAwLjY7IHRoaXMucG9pc29uTWF4Kz0zOyB0aGlzLnByb2plY3RpbGVBbW91bnQgKyt9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAnYmxhY2tEcmFnb24nKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sZXZlbD09Mil7dGhpcy5wcm9qZWN0aWxlQW1vdW50Kys7IHRoaXMuZGFtYWdlTXVsdGkrPTAuMn1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmxldmVsPT0zKXt0aGlzLmFyZWEgKz0yMDsgdGhpcy5jb2x1bW49MTt0aGlzLmRhbWFnZU11bHRpKz0wLjJ9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5sZXZlbD49NCl7dGhpcy5hcmVhICs9MjA7IHRoaXMucHJvamVjdGlsZUFtb3VudCArK31cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3RhdCB1cGRhdGVzIC5kYW1hZ2VNdWx0aVxuICAgIH1cblxuICAgIGVtb3RlKGdhbWUpe1xuICAgICAgICBsZXQgcmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwKTtcbiAgICAgICAgaWYgKHRoaXMuZW1vdGVDaGFuZ2Upe1xuICAgICAgICAgICAgaWYgKCFnYW1lLnBsYXllci5hbGl2ZSl7XG4gICAgICAgICAgICAgICAgLy90aGlzLnN0YXRlID0gJ2Vtb3RlNSc7XG4gICAgICAgICAgICAgICAgaWYocmFuZG9tPjUpe3RoaXMuc3RhdGUgPSAnZW1vdGU1Jzt9IC8vIGNyeVxuICAgICAgICAgICAgICAgIGVsc2Uge3RoaXMuc3RhdGUgPSAnZW1vdGUyJzt9IC8vIGJld2lsZGVyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChnYW1lLndhdmVGaW5pc2ggKXtcbiAgICAgICAgICAgICAgICAgICAgaWYocmFuZG9tPjUpe3RoaXMuc3RhdGUgPSAnZW1vdGUzJzt9IC8vIHNpdFxuICAgICAgICAgICAgICAgICAgICBlbHNlIHt0aGlzLnN0YXRlID0gJ2Vtb3RlNCc7fSAvLyBzbGVlcFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5lbW90ZVRpbWVyID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmVtb3RlQ2hhbmdlID0gZmFsc2U7IFxuICAgICAgICB9XG5cbiAgICAgICAgZWxzZSBpZiAoIXRoaXMuZW1vdGVDaGFuZ2UgJiYgIXRoaXMuZW1vdGVUaW1lcil7IFxuICAgICAgICAgICAgdGhpcy5lbW90ZVRpbWVyID0gdHJ1ZTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PiB7dGhpcy5lbW90ZUNoYW5nZSA9IHRydWV9LCBcIjUwMDBcIikgO31cblxuICAgIH1cblxuICAgIGF0dGFjaygpeyAvL3RyaWdnZXJzIGF0dGFjayBzdGF0ZSBcbiAgICAgICAgaWYgKHRoaXMuYXR0YWNrQ0QgPD0gMCAmJiB0aGlzLmhlYWx0aD4wKXtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAnYXR0YWNrJzsgXG4gICAgICAgIH0gICAgICAgICAgXG4gICAgfVxuXG4gICAgc3VtbW9uQXR0YWNrKCl7IC8vc3VtbW9uIGF0dGFja3MgXG4gICAgICAgIGlmICggIXRoaXMuYXR0YWNrZWQpe1xuICAgICAgICAgICAgaWYgKHRoaXMuYW5ncnkuZ2V0RnJhbWUoKT09Mil7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9qZWN0aWxlcy5wdXNoKCBuZXcgUHJvamVjdGlsZSh0aGlzLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3Byb2onXVt0aGlzLmZvcm1dLCB0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueS01MCkpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb2plY3RpbGVBbW91bnQ+MCl7IC8vZXh0cmEgcHJvamVjdGlsZXMgXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MTsgaTw9dGhpcy5wcm9qZWN0aWxlQW1vdW50OyBpKyspeyBcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCggKCk9PiB7dGhpcy5wcm9qZWN0aWxlcy5wdXNoKCBuZXcgUHJvamVjdGlsZSh0aGlzLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3Byb2onXVt0aGlzLmZvcm1dLCB0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueS01MCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTIwKmkpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tDRCA9IHRoaXMuYXR0YWNrU3BlZWQ7XG4gICAgICAgICAgICAgICAvLyB0aGlzLmFuZ3J5LnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbW90ZVRpbWUgPSAxMDArTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjUwMCk7IC8vcmVzZXQgcmFuZG9tIGVtb3RlIHRpbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vYkF0dGFjayhnYW1lKXtcbiAgICAgICAgaWYgKCF0aGlzLmF0dGFja2VkICYmIGdhbWUucGxheWVyLmFsaXZlICYmIHRoaXMuaGVhbHRoPjApe1xuICAgICAgICAgICAgaWYgKHRoaXMubG9hZFNwcml0ZT09J3N0dW1weScpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuZ3J5LmdldEZyYW1lKCkgPT0gOSl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdGlsZXMucHVzaCggbmV3IFByb2plY3RpbGUodGhpcywgdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydwcm9qJ10sIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLngtNDAsIHRoaXMucG9zaXRpb24ueSszMCkpOyAgICBcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tDRCA9IHRoaXMuYXR0YWNrU3BlZWQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5sb2FkU3ByaXRlPT0nZ2hvc3RTdHVtcCcpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuZ3J5LmdldEZyYW1lKCkgPT0gNCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdGlsZXMucHVzaCggbmV3IFByb2plY3RpbGUodGhpcywgdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydwcm9qJ10sIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLngtNDAsIHRoaXMucG9zaXRpb24ueS0yNykpOyAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrQ0QgPSB0aGlzLmF0dGFja1NwZWVkO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIGlmICh0aGlzLmxvYWRTcHJpdGU9PSdtdXNobW9tJyl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5ncnkuZ2V0RnJhbWUoKSA9PSA3KXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrQ0QgPSB0aGlzLmF0dGFja1NwZWVkO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmFuZ3J5LnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZ2FtZS5wbGF5ZXIuanVtcCAmJiBnYW1lLnBsYXllci5sYW5lID09IHRoaXMubGFuZSApe1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZS5wbGF5ZXIuaGVhbHRoIC09IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lLmtub2NrYmFjayhnYW1lLnBsYXllciwgMSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIH0gICBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXcoY3R4LCBwYXVzZSkge1xuICAgICAgICBjb25zdCBhbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZmluZCgoYW5pbWF0aW9uKT0+YW5pbWF0aW9uLmlzRm9yKHRoaXMuc3RhdGUpKVxuICAgICAgICAvL2lmICh0aGlzLmhpdGJveCl7IGN0eC5maWxsUmVjdCh0aGlzLmhpdGJveFswXSx0aGlzLmhpdGJveFsxXSwgdGhpcy5oaXRib3hbMl0sIHRoaXMuaGl0Ym94WzNdKTt9XG4gICAgICAgIC8vY3R4LmZpbGxSZWN0KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7IFxuICAgICAgICAvL2N0eC5maWxsUmVjdCh0aGlzLnBvc2l0aW9uLngtdGhpcy5yYW5nZSwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoKzIqdGhpcy5yYW5nZSwgdGhpcy5oZWlnaHQpOyAvL3JhbmdlXG4gICAgICAgIGlmICh0aGlzLnNpZGUgPT0gMCAmJiB0aGlzLmZvcm09PTEgJiYgdGhpcy5zdGF0ZT09J2F0dGFjaycpe3RoaXMueE9mZjIgPSAtNTF9IC8vYXR0YWNrIG9mZnNldFxuICAgICAgICBlbHNlIHRoaXMueE9mZjI9MDtcblxuICAgICAgICBpZiAoYW5pbWF0aW9uLnNob3VsZFN0b3AoKSl7XG4gICAgICAgICAgICBpZiAodGhpcy5zaWRlID09IDApe3RoaXMuc3RhdGUgPSAnc3RhbmQnOyB9IFxuICAgICAgICAgICAgZWxzZSB0aGlzLnN0YXRlPSd3YWxrJzt9XG5cbiAgICAgICAgaWYgKHRoaXMuaGVhbHRoPD0wICYmIHRoaXMuc2lkZSA9PTEpe1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICdkaWUnOyAgLy9kZWF0aCBhbmltYXRpb24gICBcbiAgICAgICAgICAgIGlmIChhbmltYXRpb24uc2hvdWxkU3RvcCgpKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mYWRlPjApIHRoaXMuZmFkZSAtPSAwLjAzOyAvL2ZhZGUgb24gZGVhdGggXG4gICAgICAgICAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gdGhpcy5mYWRlOyBcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge3RoaXMuZmFkZSA9IDB9LCBcIjQ1MFwiKSA7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvamVjdGlsZXMubGVuZ3RoID09IDApe1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge3RoaXMuYWxpdmUgPSBmYWxzZX0sIFwiNDUwXCIpIDt9IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfSAgXG4gICAgICAgIGlmICh0aGlzLnNpZGUgPT0gMSAmJiB0aGlzLnN0YXRlICE9J2RpZScpeyAvL2hlYWx0aCBiYXJcbiAgICAgICAgICAgIGlmICghdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydib3NzJ10pXG4gICAgICAgICAgICAgICAge2N0eC5maWxsU3R5bGUgPSBcIiMyYjJiMmJcIjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QodGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnkrNzAsIDYwLCAxMik7IC8vZW1wdHkgYm94XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzk5MGMwMlwiO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLnBvc2l0aW9uLngrMSwgdGhpcy5wb3NpdGlvbi55KzcxLCBNYXRoLmZsb29yKDU4KigxLSh0aGlzLm1heEhlYWx0aCAtIHRoaXMuaGVhbHRoKS90aGlzLm1heEhlYWx0aCkpLCAxMCk7IC8vIGxpZmUgYmFyXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgeyAvL2Jvc3MgaGVhbHRoIGJhclxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiMyYjJiMmJcIjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QodGhpcy5wb3NpdGlvbi54LTUsIHRoaXMucG9zaXRpb24ueSsxMzEsIDY1LCAxNik7IC8vZW1wdHkgYm94XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzk5MGMwMlwiO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLnBvc2l0aW9uLngtNCwgdGhpcy5wb3NpdGlvbi55KzEzMiwgTWF0aC5mbG9vcig2MyooMS0odGhpcy5tYXhIZWFsdGggLSB0aGlzLmhlYWx0aCkvdGhpcy5tYXhIZWFsdGgpKSwgMTQpOyAvL2VtcHR5IGJveFxuIFxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc2lkZSA9PSAwKXsgLy8gc3VtbW9uIG5hbWUgXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMC43OyBcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5yb3VuZFJlY3QodGhpcy5wb3NpdGlvbi54KzE1LCB0aGlzLnBvc2l0aW9uLnkrdGhpcy5oZWlnaHQrMTcsIDM1LCAxNSwgMik7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMS4wOyBcblxuICAgICAgICAgICAgY3R4LmZvbnQgPSBcIjExcHggYXJpYWxcIlxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSc7IFxuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInOyBcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0aGlzLmxhYmVsLCB0aGlzLnBvc2l0aW9uLngrMzIsIHRoaXMucG9zaXRpb24ueSt0aGlzLmhlaWdodCsyNykgOyAgICAgICAgICBcblxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGltYWdlID0gYW5pbWF0aW9uLmdldEltYWdlKHBhdXNlKTsgICAgICAgXG4gICAgICAgIC8vaW1hZ2UgPSBidWZmZXI7IFxuXG4gICAgICAgIGlmICghdGhpcy5sZWZ0KXsvL2ZsaXAgYmFzZWQgb24gc3ByaXRlIG9yaWVudGF0aW9uXG4gICAgICAgICAgICBjdHguc2NhbGUoLTEsMSk7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltYWdlLCAtdGhpcy5wb3NpdGlvbi54LXRoaXMud2lkdGgrdGhpcy54T2ZmK3RoaXMueE9mZjIsIHRoaXMucG9zaXRpb24ueSt0aGlzLnlPZmYgKTt9XG4gICAgICAgIGVsc2Uge2N0eC5kcmF3SW1hZ2UoaW1hZ2UsIHRoaXMucG9zaXRpb24ueCt0aGlzLnhPZmYrdGhpcy54T2ZmMiwgdGhpcy5wb3NpdGlvbi55K3RoaXMueU9mZik7IH1cbiAgICBcbiAgICAgICAgaWYgKHRoaXMuY2hpbGxBbW91bnQ+MCl7XG4gICAgICAgICAgICBjb25zdCBidWZmZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTsgLy8gSW1hZ2UgdGludGluZ1xuICAgICAgICAgICAgYnVmZmVyLndpZHRoID0gMjAwOy8vaW1hZ2Uud2lkdGg7XG4gICAgICAgICAgICBidWZmZXIuaGVpZ2h0ID0gNDAwOy8vaW1hZ2UuaGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgYnR4ID0gYnVmZmVyLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgICAgICBidHguZHJhd0ltYWdlKGltYWdlLCAwLDApO1xuICAgICAgICAgICAgYnR4LmZpbGxTdHlsZSA9IFwiIzJjNjhkY1wiO1xuICAgICAgICAgICAgYnR4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdtdWx0aXBseSc7XG4gICAgICAgICAgICBidHguZmlsbFJlY3QoMCwwLGJ1ZmZlci53aWR0aCwgYnVmZmVyLmhlaWdodCk7XG4gICAgICAgICAgICBidHguZ2xvYmFsQWxwaGEgPSAwLjg7XG4gICAgICAgICAgICBidHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJkZXN0aW5hdGlvbi1pblwiO1xuICAgICAgICAgICAgYnR4LmRyYXdJbWFnZShpbWFnZSwwLDApOyBcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmxlZnQpe1xuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoYnVmZmVyLCAtdGhpcy5wb3NpdGlvbi54LXRoaXMud2lkdGgrdGhpcy54T2ZmLCB0aGlzLnBvc2l0aW9uLnkrdGhpcy55T2ZmKX1cbiAgICAgICAgICAgIGVsc2Uge2N0eC5kcmF3SW1hZ2UoYnVmZmVyLCB0aGlzLnBvc2l0aW9uLngrdGhpcy54T2ZmLCB0aGlzLnBvc2l0aW9uLnkrdGhpcy55T2ZmKX1cbiAgICAgICAgfVxuICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAxO1xuICAgICAgICBjdHguc2V0VHJhbnNmb3JtKDEsMCwwLDEsMCwwKTsgXG5cbiAgICAgICAgaWYgKHRoaXMucG9pc29uQW1vdW50PjAgJiYgdGhpcy5oZWFsdGg+MCl7XG4gICAgICAgICAgICBpZiAoIXRoaXMucG9pc29uTG9hZGVkKXtcbiAgICAgICAgICAgICAgICB0aGlzLnBvaXNvbkdyYXBoaWMgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKCdwb2lzb25FZmZlY3QvcG9pc29uPy5wbmcnLCA0LCAxMCwgXCJwb2lzb25cIik7XG4gICAgICAgICAgICAgICAgdGhpcy5wb2lzb25Mb2FkZWQgPSB0cnVlOyB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvaXNvblNwcml0ZUltYWdlID0gdGhpcy5wb2lzb25HcmFwaGljLmdldEltYWdlKHBhdXNlKTsgXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmJvc3MpIHtjdHguZHJhd0ltYWdlKHBvaXNvblNwcml0ZUltYWdlLHRoaXMucG9zaXRpb24ueC0xMCx0aGlzLnBvc2l0aW9uLnktdGhpcy5oZWlnaHQrNzUpfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGN0eC5kcmF3SW1hZ2UocG9pc29uU3ByaXRlSW1hZ2UsdGhpcy5wb3NpdGlvbi54LTEwLHRoaXMucG9zaXRpb24ueS10aGlzLmhlaWdodCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gICBcbiAgICBcbiAgICBkcmF3UHJvaihjdHgsIHBhdXNlKXtcbiAgICAgICAgICAgIHRoaXMucHJvamVjdGlsZXMuZm9yRWFjaCggKG9iamVjdCk9Pm9iamVjdC5kcmF3KGN0eCwgcGF1c2UpICkgLy9kcmF3IHByb2plY3RpbGVzIFxuICAgICAgICB9ICAgIFxuICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICB1cGRhdGUoZ2FtZSl7XG4gICAgICAgIGlmICh0aGlzLnNpZGUgPT09IDEpeyAgLy8gTW9iIFxuICAgICAgICAgICAgaWYgKHRoaXMuaGVhbHRoPjApeyAgICAgXG4gICAgICAgICAgICAgICAgbGV0IGNoaWxsRGlyZWN0ID0gMTsgIFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNwZWVkWDwwKShjaGlsbERpcmVjdD0gLTEpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3BlZWRYLXRoaXMuY2hpbGxBbW91bnQqY2hpbGxEaXJlY3Q+PTAuNCl7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlICE9J2F0dGFjaycpIHRoaXMuc3RhdGUgPSAnd2Fsayc7IC8vY2FuY2VscyBhdHRhY2sgXG4gICAgICAgICAgICAgICAgfSAgXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5hdHRhY2tDRD4wKSB0aGlzLnN0YXRlID09ICdoaXQnOyBcbiAgICAgICAgICAgICAgICBlbHNlIHRoaXMuc3RhdGUgPSAnd2Fsayc7XG5cbiAgICAgICAgICAgICAgICAvLyBpZiAodGhpcy5wb3NpdGlvbi54PC10aGlzLndpZHRoKjIpIHt0aGlzLnBvc2l0aW9uLnggPSAtdGhpcy53aWR0aCoyfTsgLy9sZWZ0IGJvcmRlclxuICAgICAgICAgICAgICAgIC8vIGlmICh0aGlzLnBvc2l0aW9uLng+dGhpcy5nYW1lV2lkdGgtdGhpcy53aWR0aCkge3RoaXMucG9zaXRpb24ueCA9IHRoaXMuZ2FtZVdpZHRoLXRoaXMud2lkdGg7fSAvL3JpZ2h0IGJvcmRlclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLndlaXJkKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdhbWUuZ2FtZVRpbWVSZWFsLXRoaXMud2VpcmRTdGFydD4gdGhpcy53ZWlyZFRpbWUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53ZWlyZFN0YXJ0ID0gZ2FtZS5nYW1lVGltZVJlYWw7IFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53ZWlyZFRpbWUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMjAwMCkrNTAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGVlZFggID0gLXRoaXMuc3BlZWRYO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3BlZWRYPjApIHt0aGlzLndlaXJkVGltZSs9NzAwfTsgLy9iaWFzIG1vdmluZyBmb3J3YXJkXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3BlZWRYPDAgJiYgdGhpcy5wb3NpdGlvbi54PnRoaXMuZ2FtZVdpZHRoKSB0aGlzLnNwZWVkWCA9IGFicyh0aGlzLnNwZWVkWCk7IFxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5yb2FtID0gdHJ1ZTsgXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5yb2FtVGltZSA9IDUwMDA7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5yb2FtWSA9IHRoaXMubGFuZSpnYW1lLnJvd0hlaWdodDsgXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5yb2FtTGltaXRzID0gWzAsIGdhbWUucm93SGVpZ2h0LCBnYW1lLnJvd0hlaWdodCoyXTsgLy8wLDEsMlxuICAgICAgICAgICAgLy8gICAgIHRoaXMuZGVzdGluYXRpb24gPSAwO1xuICAgICAgICAgICAgLy8gIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvYW0pe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvYW1UaW1lLS07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvYW1UaW1lID09IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSozKTsgLy9yYW5kb20gMCwxLDJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm9hbVRpbWUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMjUwKSsxMDAwO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHNwZWVkWSA9IDM7Ly9cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3BlZWRYLXRoaXMuY2hpbGxBbW91bnQqY2hpbGxEaXJlY3Q8PTEpIHtzcGVlZFk9MX1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zcGVlZFgtdGhpcy5jaGlsbEFtb3VudCpjaGlsbERpcmVjdDw9Mikge3NwZWVkWT0yfTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucm9hbVk+IHRoaXMucm9hbUxpbWl0c1t0aGlzLmRlc3RpbmF0aW9uXSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkrPXNwZWVkWSA7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvYW1ZLT1zcGVlZFkgO1xuICAgIFxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucm9hbVk8dGhpcy5yb2FtTGltaXRzW3RoaXMuZGVzdGluYXRpb25dKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueS09c3BlZWRZIDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm9hbVkrPXNwZWVkWTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvYW1ZKzI+IHRoaXMucm9hbUxpbWl0c1t0aGlzLmRlc3RpbmF0aW9uXSAmJiB0aGlzLnJvYW1ZLTI8dGhpcy5yb2FtTGltaXRzW3RoaXMuZGVzdGluYXRpb25dKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSAtPSAodGhpcy5yb2FtWS10aGlzLnJvYW1MaW1pdHNbdGhpcy5kZXN0aW5hdGlvbl0pOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm9hbVkgPSB0aGlzLnJvYW1MaW1pdHNbdGhpcy5kZXN0aW5hdGlvbl07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yb2FtWSA9PSB0aGlzLnJvYW1MaW1pdHNbdGhpcy5kZXN0aW5hdGlvbl0pe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYW5lID0gdGhpcy5yb2FtTGltaXRzLmluZGV4T2YodGhpcy5yb2FtWSl9OyAvL3VwZGF0ZSBsYW5lIGR1cmluZyBtb3ZlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wb2lzb25UaW1lPjApeyAvLy9QT0lTT05cbiAgICAgICAgICAgICAgICAgICAgaWYgKGdhbWUuZ2FtZVRpbWVSZWFsLXRoaXMucG9pc29uVGljaz49MTAwMCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhbHRoIC09IHRoaXMucG9pc29uQW1vdW50O1xuICAgICAgICAgICAgICAgICAgICBnYW1lLnBvaXNvbkRhbWFnZSArPSB0aGlzLnBvaXNvbkFtb3VudDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb2lzb25UaW1lIC09IDE7ICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb2lzb25UaWNrID0gZ2FtZS5nYW1lVGltZVJlYWw7IC8vdXBkYXRlIHRpY2sgdGltZSBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIGlmICh0aGlzLnBvaXNvblRpbWUgPT0gMCl7dGhpcy5wb2lzb25BbW91bnQgPSAwOyAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9pc29uU3RhY2sgPSAwOyB9Ly9kcm9wIHBvaXNvbiBzdGFja3NcblxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGxBbW91bnQ+MCl7dGhpcy5jaGlsbEFtb3VudC09MC4wMDV9IC8vQ0hJTEwgXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5jaGlsbEFtb3VudDwwKXt0aGlzLmNoaWxsQW1vdW50PTB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKGdhbWUuZ2FtZVRpbWVSZWFsLXRoaXMua25vY2tiYWNrVGltZSA+MTAwMCl7dGhpcy5rbm9ja2JhY2tGb3JjZT0wfSAvL21heCAyc1xuXG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMua25vY2tiYWNrRm9yY2UpPjApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICdoaXQnXG4gICAgICAgICAgICAgICAgICAgIHRoaXMua25vY2tiYWNrUmVzaXN0Kz0wLjAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnggKz0gdGhpcy5rbm9ja2JhY2tGb3JjZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMua25vY2tiYWNrRm9yY2U+MCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmtub2NrYmFja0ZvcmNlLT10aGlzLmtub2NrYmFja1Jlc2lzdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBvc2l0aW9uLng+dGhpcy5nYW1lV2lkdGgrNTApe3RoaXMucG9zaXRpb24ueD10aGlzLmdhbWVXaWR0aCs1MH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmtub2NrYmFja0ZvcmNlPDApIHRoaXMua25vY2tiYWNrRm9yY2UgPSAwXG4gICAgICAgICAgICAgICAgICAgICAgICB9IC8vYmFja3dhcmRzXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMua25vY2tiYWNrRm9yY2U8MCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmtub2NrYmFja0ZvcmNlKz10aGlzLmtub2NrYmFja1Jlc2lzdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmtub2NrYmFja0ZvcmNlPjApIHRoaXMua25vY2tiYWNrRm9yY2UgPSAwXG4gICAgICAgICAgICAgICAgICAgIH07IC8vZm9yd2FyZHMgXG5cbiAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlICE9J2F0dGFjaycpe3RoaXMucG9zaXRpb24ueCAtPSAodGhpcy5zcGVlZFgtdGhpcy5jaGlsbEFtb3VudCpjaGlsbERpcmVjdCl9XG4gICAgICAgICAgICAgICAgfVxuIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSAtPSB0aGlzLnNwZWVkWTsgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3BlZWRZPjApe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwZWVkWS09MC41OyBcbiAgICAgICAgICAgICAgICB9ICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5qdW1wKXsgLy9ncmF2aXR5XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSArPSAxKnRoaXMuZ3Jhdml0eVRpbWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3Jhdml0eVRpbWUrPTAuNTsgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGlmICh0aGlzLnBvc2l0aW9uLnkgPiB0aGlzLmdhbWVIZWlnaHQtMTEwICl7IC8vYm90dG9tIGJvcmRlciAodXBkYXRlIGZvciBwbGF0Zm9ybXMpXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMucG9zaXRpb24ueSA9IHRoaXMuZ2FtZUhlaWdodC0xMTA7XG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuc3BlZWRZID0gMDtcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5qdW1wID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuZ3Jhdml0eVRpbWUgPSAxOyBcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5zdGF0ZSA9ICdzdGFuZCc7XG4gICAgICAgICAgICAgICAgLy8gfSBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZT09J3N0YW5kJyl7ICAgLy9lbW90ZXMgZm9yIHN1bW1vbnNcbiAgICAgICAgICAgIGlmICh0aGlzLmVtb3RlVGltZSA9PSAwICl7XG4gICAgICAgICAgICAgICAgbGV0IHJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMCk7IC8vMTogc2xlZXAsIDI6IGlnbm9yZVxuICAgICAgICAgICAgICAgIGxldCB0aW1lID0gMDsgXG4gICAgICAgICAgICAgICAgaWYgKHJhbmRvbSA8NSl7dGhpcy5zdGF0ZSA9ICdlbW90ZTEnOyB0aW1lID0gdGhpcy5lbW90ZUxlbmd0aFswXTt9XG4gICAgICAgICAgICAgICAgZWxzZSB7dGhpcy5zdGF0ZSA9ICdlbW90ZTYnO3RpbWUgPSB0aGlzLmVtb3RlTGVuZ3RoWzVdIH07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5lbW90ZVRpbWVPdXQgPSBzZXRUaW1lb3V0KCgpPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtb3RlVGltZSA9IDYwMCtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqNTAwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICdzdGFuZCd9LCB0aW1lKSA7Ly9ob3cgbG9uZyB0byBydW4gYW5pbWF0aW9uXG4gICAgICAgICAgICAgICAgLy8gaWYgKGdhbWUucGF1c2Upe2NsZWFyVGltZW91dCh0aGlzLmVtb3RlVGltZU91dCl9OyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgdGhpcy5lbW90ZVRpbWUtLTsgXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG5cbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlcy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LnVwZGF0ZSgpICk7IFxuICAgICAgICB0aGlzLnByb2plY3RpbGVzID0gdGhpcy5wcm9qZWN0aWxlcy5maWx0ZXIoICAvL2RlbGV0ZXMgcHJvamVjdGlsZXNcbiAgICAgICAgICAgIGZ1bmN0aW9uIChvYmplY3Qpe3JldHVybiBvYmplY3QuZGVsZXRlICE9PSB0cnVlOyBcbiAgICAgICAgfSk7XG4gICAgICAgLy8gY29uc29sZS5sb2codGhpcy5wcm9qZWN0aWxlcyk7IFxuICAgICBcblxuICAgICAgICBpZiAodGhpcy5hdHRhY2tDRCA+MCl7dGhpcy5hdHRhY2tDRC0tfVxuICAgICAgICBpZiAodGhpcy5hdHRhY2tDRD09MCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYXR0YWNrZWQpe1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFuZ3J5LnJlc2V0KCk7IFxuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oaXRib3ggPSBbdGhpcy5wb3NpdGlvbi54K3RoaXMud2lkdGgyLzIsIHRoaXMucG9zaXRpb24ueSt0aGlzLmhlaWdodDIsIFxuICAgICAgICAgICAgICAgIHRoaXMud2lkdGgtdGhpcy53aWR0aDIsIHRoaXMuaGVpZ2h0XTsgXG4gICAgICAgIFxuXG5cblxuXG4gICAgfVxuXG59IiwiaW1wb3J0IFNwcml0ZUFuaW1hdGlvbiBmcm9tICcuL1Nwcml0ZUFuaW1hdGlvbic7IFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb25leXtcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCBvYmosIHZhbHVlLCBzcGVlZFggPSAwKXtcbiAgICAgICAgdGhpcy55T2ZmID0gMCA7XG4gICAgICAgIGlmIChvYmouYm9zcyl7IHRoaXMueU9mZiArPTcwfVxuICAgICAgICB0aGlzLnBvc2l0aW9uID0geyAgLy9wb3NpdGlvbiBcbiAgICAgICAgICAgIHg6IChvYmoucG9zaXRpb24ueCkrb2JqLndpZHRoLzIsIFxuICAgICAgICAgICAgeTogb2JqLnBvc2l0aW9uLnkrNDArdGhpcy55T2ZmfVxuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbi54PmdhbWUuZ2FtZVdpZHRoLTEwKXt0aGlzLnBvc2l0aW9uLnggPSBnYW1lLmdhbWVXaWR0aC0zMDt9IC8va2lsbGluZyBvZmYtc2NyZWVuIChyaWdodClcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wb3NpdGlvbi54PDEwKXt0aGlzLnBvc2l0aW9uLng9MzB9O1xuICAgICAgICB0aGlzLndpZHRoID0gMzU7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMzU7IFxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7IFxuICAgICAgICB0aGlzLnNwYXduVGltZSA9ICBnYW1lLmdhbWVUaW1lUmVhbDsgXG4gICAgICAgIHRoaXMucG9wVXAgPSAyNTsgXG4gICAgICAgIHRoaXMuZHJvcERvd24gPSAyMztcbiAgICAgICAgdGhpcy5zcGVlZFggPSBzcGVlZFg7IFxuICAgICAgICB0aGlzLnNwZWVkWSA9IDE7IFxuICAgICAgICB0aGlzLmFjY2VsVXAgPSAwO1xuICAgICAgICB0aGlzLmFjY2VsRG93biA9IDA7XG4gICAgICAgIHRoaXMuZGVsZXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZmFkZSA9IDE7IFxuICAgICAgICB0aGlzLnN0YXJ0RmFkZSA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5mbG9hdCA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5sb3N0ID0gZmFsc2U7IFxuXG4gICAgICAgIHRoaXMuaGl0Ym94ID0gW3RoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LTI1LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodF07IFxuICAgICAgICBpZiAodGhpcy52YWx1ZT49MTAwKXt0aGlzLnR5cGUgPSAnNCc7fSBcbiAgICAgICAgZWxzZSBpZiAodGhpcy52YWx1ZT49NTApe3RoaXMudHlwZSA9ICczJzt9IFxuICAgICAgICBlbHNlIGlmICh0aGlzLnZhbHVlPj0xMCl7dGhpcy50eXBlID0gJzInO30gXG4gICAgICAgIGVsc2UgdGhpcy50eXBlID0gJzEnOyBcbiAgICAgICAgdGhpcy5jcmVhdGVBbmltYXRpb25zKCk7IFxuICAgIH1cbiAgICBcbiAgICBjcmVhdGVBbmltYXRpb25zKCl7XG4gICAgICAgIHRoaXMuc3RhbmQgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKCdjb2luL0NvaW4nK3RoaXMudHlwZSsnXz8ucG5nJywgMywgNiwgXCJzdGFuZFwiKTtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0gW3RoaXMuc3RhbmRdXG4gICAgfVxuXG4gICAgZHJhdyhjdHgsIHBhdXNlKSB7XG4gICAgICAgIC8vY3R4LmZpbGxSZWN0KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0RmFkZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZmxvYXQpe3RoaXMuZmFkZSAtPSAwLjAxNTt9IC8vc2xvd2VyIGZhZGUgd2hlbiBwaWNrdXBcbiAgICAgICAgICAgIGVsc2UgdGhpcy5mYWRlIC09IDAuMDM7XG4gICAgICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSB0aGlzLmZhZGU7IFxuICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHt0aGlzLmRlbGV0ZT0gdHJ1ZX0sIFwiNDUwXCIpIDtcbiAgICAgICAgfSBcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5maW5kKChhbmltYXRpb24pPT5hbmltYXRpb24uaXNGb3IoJ3N0YW5kJykpOyBcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBhbmltYXRpb24uZ2V0SW1hZ2UocGF1c2UpOyBcblxuXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55KTtcbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMTtcblxuICAgIH1cblxuICAgIHVwZGF0ZShnYW1lKXtcbiAgICAgICAgaWYgKHRoaXMucG9wVXA+MCl7XG4gICAgICAgICAgICB0aGlzLmFjY2VsVXArPTAuMTtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSAtPSAoNC41LXRoaXMuYWNjZWxVcCk7IFxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54IC09dGhpcy5zcGVlZFg7IFxuICAgICAgICAgICAgdGhpcy5wb3BVcCAtPSAxOyBcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRyb3BEb3duPjApe1xuICAgICAgICAgICAgdGhpcy5hY2NlbERvd24rPTAuMTtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSArPSAoMit0aGlzLmFjY2VsRG93bik7XG4gICAgICAgICAgICB0aGlzLmRyb3BEb3duIC09IDE7IFxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54IC09dGhpcy5zcGVlZFg7IFxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmZsb2F0KXtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueS09MTsgXG4gICAgICAgICAgICBpZiAoZ2FtZS5wbGF5ZXIucG9zaXRpb24ueCtnYW1lLnBsYXllci53aWR0aDx0aGlzLnBvc2l0aW9uLngpe3RoaXMucG9zaXRpb24ueC09MC44ICB9XG4gICAgICAgICAgICBlbHNlIGlmIChnYW1lLnBsYXllci5wb3NpdGlvbi54PnRoaXMucG9zaXRpb24ueCkgdGhpcy5wb3NpdGlvbi54Kz0wLjg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZ2FtZS5nYW1lVGltZVJlYWwtdGhpcy5zcGF3blRpbWU+PTIwMDAwKXsgLy8xOCBzIFxuICAgICAgICAgICAgdGhpcy5zdGFydEZhZGU9dHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubG9zdCA9IHRydWU7IFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oaXRib3ggPSBbdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0XTsgXG5cbiAgICB9XG5cbiAgICBcbn1cbiIsImltcG9ydCBQcm9qZWN0aWxlIGZyb20gJy4vcHJvamVjdGlsZSc7IFxuaW1wb3J0IFNwcml0ZUFuaW1hdGlvbiBmcm9tICcuL1Nwcml0ZUFuaW1hdGlvbic7IFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKGdhbWUpe1xuICAgICAgICB0aGlzLmdhbWVXaWR0aCA9IGdhbWUuZ2FtZVdpZHRoO1xuICAgICAgICB0aGlzLmdhbWVIZWlnaHQgPSBnYW1lLmdhbWVIZWlnaHQ7XG4gICAgICAgIHRoaXMud2lkdGggPSA0MDsgLy9zcHJpdGUgc2l6ZSBcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA4MDsgXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB7ICAvL3Bvc2l0aW9uIFxuICAgICAgICAgICAgeDogdGhpcy53aWR0aC8yLCBcbiAgICAgICAgICAgIHk6IHRoaXMuZ2FtZUhlaWdodCAtIDQ1IC0gMipnYW1lLnJvd0hlaWdodCxcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBsYXllclggPSB0aGlzLnBvc2l0aW9uLnggLSB0aGlzLndpZHRoLzIgKzE4OyBcbiAgICAgICAgdGhpcy5lbGVQb3NpdGlvbnMgPSBbIFt0aGlzLnBsYXllclggLTYwLCB0aGlzLnBvc2l0aW9uLnldLCBbdGhpcy5wbGF5ZXJYIC00MCwgdGhpcy5wb3NpdGlvbi55LTQwXSxcbiAgICAgICAgICAgIFt0aGlzLnBsYXllclggLCB0aGlzLnBvc2l0aW9uLnktNTVdLCBbdGhpcy5wbGF5ZXJYICs0MCwgdGhpcy5wb3NpdGlvbi55LTQwXSwgXG4gICAgICAgICAgICBbdGhpcy5wbGF5ZXJYICs2MCwgdGhpcy5wb3NpdGlvbi55XSBdO1xuICAgICAgICB0aGlzLnJvd0hlaWdodCA9IGdhbWUucm93SGVpZ2h0O1xuICAgICAgICB0aGlzLmxhbmUgPSAxOyBcbiAgICAgICAgdGhpcy5mbG9vciA9ICB0aGlzLmdhbWVIZWlnaHQgLSA0NSAtICgxK3RoaXMubGFuZSkqdGhpcy5yb3dIZWlnaHRcbiAgICAgICAgdGhpcy5zcGVlZCA9IDMuNTtcbiAgICAgICAgdGhpcy5rbm9ja2JhY2tGb3JjZSA9IDA7IFxuICAgICAgICB0aGlzLmxlZnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaWRlID0wO1xuICAgICAgICB0aGlzLnNwZWVkWCA9IDA7XG4gICAgICAgIHRoaXMuc3BlZWRZID0gMDsgXG4gICAgICAgIHRoaXMuanVtcCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmdyYXZpdHlUaW1lID0gMTsgXG4gICAgICAgIHRoaXMucHJvamVjdGlsZXMgPSBbXTtcbiAgICAgICAgdGhpcy5uYW1lID0gJ1dpeic7XG4gICAgICAgIHRoaXMuaGVhbHRoID0gNTA7IFxuICAgICAgICB0aGlzLmRhbWFnZSA9IDE7IFxuICAgICAgICB0aGlzLmRhbWFnZURlYWx0ID0gMDsgXG4gICAgICAgIHRoaXMuaW52dWxuVGltZSA9ICAwOyBcbiAgICAgICAgdGhpcy5pbnZ1bG5EYXJrID0gZmFsc2U7IFxuICAgICAgICB0aGlzLmludnVsbkRhcmtUaW1lID0gMDtcbiAgICAgICAgdGhpcy5rbm9ja2JhY2tUaHJlc2ggPSAxOyBcbiAgICAgICAgdGhpcy5rbm9ja2JhY2tTdW0gPSAwXG4gICAgICAgIHRoaXMuYXJtb3IgPSAwOyBcbiAgICAgICAgdGhpcy50b3VjaEhpdCA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5hdHRhY2tTcGVlZCA9IDM1OyBcbiAgICAgICAgdGhpcy5hdHRhY2tDRCA9IDA7IFxuICAgICAgICB0aGlzLmFsaXZlID0gdHJ1ZTsgXG4gICAgICAgIHRoaXMuc3RhdGUgPSAnc3RhbmQnOyBcbiAgICAgICAgdGhpcy5jdXJUaWxlID0gMDtcbiAgICAgICAgdGhpcy5lbGVtZW50TGlzdD0gW107IC8vYWRkIHNwcml0ZXMgaGVyZSBcbiAgICAgICAgLy8gdGhpcy5lbGVtZW50TGlzdCA9IFsnQmxhemUnLCdEYXduJywnTmlnaHQnLCdUaHVuZGVyJywnV2luZCddO1xuICAgICAgICB0aGlzLmVsZW1lbnRTcHJpdGVzID0ge307XG4gICAgICAgIHRoaXMuZWxlbWVudExvYWRlZFNwcml0ZSA9IHt9IDsgXG4gICAgICAgIHRoaXMuZWxlbWVudEluZm8gPSB7ICdCbGF6ZSc6IHsnc3RhbmQnOjcsICdtb3ZlJzogNywgJ2F0dGFjayc6IDgsICdwcm9qJzoncmVkQmFsbCcgfSxcbiAgICAgICAgICAgICdEYXduJzogeydzdGFuZCc6IDE1LCAnbW92ZSc6MTUsICdhdHRhY2snOiA4LCAncHJvaic6J3llbGxvd0JhbGwnfSxcbiAgICAgICAgICAgICdOaWdodCc6IHsnc3RhbmQnOjcsICdtb3ZlJzo3LCAnYXR0YWNrJzogOCwgJ3Byb2onOidwdXJwbGVCYWxsJ30sXG4gICAgICAgICAgICAnVGh1bmRlcic6IHsnc3RhbmQnOiA3LCAnbW92ZSc6NywgJ2F0dGFjayc6IDgsICdwcm9qJzonZ3JlZW5CYWxsJyx9LCBcbiAgICAgICAgICAgICdXaW5kJzogeydzdGFuZCc6IDcsICdtb3ZlJzo3LCAnYXR0YWNrJzogOCwgJ3Byb2onOidibHVlQmFsbCcsfSB9XG4gICAgICAgIHRoaXMuZWxlbWVudFN0YXRlID0gWydzdGFuZCcsJ3N0YW5kJywnc3RhbmQnLCdzdGFuZCcsJ3N0YW5kJ107IFxuICAgICAgICB0aGlzLnJlY2FsbExpc3QgPSBbJ3JlZERyYWdvbjAnLCAncmVkRHJhZ29uMScsICdibHVlRHJhZ29uMCcsICdibHVlRHJhZ29uMScsIFxuICAgICAgICAnZ3JlZW5EcmFnb24wJywnZ3JlZW5EcmFnb24xJywnYmxhY2tEcmFnb24wJywgJ2JsYWNrRHJhZ29uMSddIDtcbiAgICAgICAgdGhpcy5yZWNhbGxJbWFnZXMgPXt9O1xuICAgICAgICB0aGlzLmNyZWF0ZUFuaW1hdGlvbnMoKTsgXG4gICAgICAgIHRoaXMuZWxlbWVudGFscygpO1xuXG4gICAgICAgIHRoaXMuc3VtbW9uQ291bnQgPSAwOyBcbiAgICAgICAgdGhpcy5tb25leSA9IDUwOyAgLy81MFxuICAgICAgICBpZiAoZ2FtZS5sZXZlbCA9PSAyKSB7dGhpcy5tb25leSA9IDEyMDB9IC8vc3RhcnRpbmcgbW9uZXkgYmFzZWQgb24gbGV2ZWw7XG4gICAgICAgIGVsc2UgaWYgKGdhbWUubGV2ZWwgPT0gMykge3RoaXMubW9uZXkgPSA1MDAwfVxuICAgICAgICB0aGlzLnN1bW1vbkNvc3QgPSBbNTAsIDEwMCwgMTUwLCAyMDAsIDY0MF07XG4gICAgICAgIHRoaXMudXBncmFkZUNvc3QgPSBbMjAwLCA0MDAsIDgwMCwgMTYwMCwgMzIwMF07IFxuICAgICAgICB0aGlzLmVsZW1lbnRDb3N0ID0gWzUwLCAxMDAsIDIwMCwgNDAwLCA4MDBdOyBcblxuICAgICAgICB0aGlzLmRhbWFnZVRha2VuID0gMDsgXG4gICAgICAgIFxuICAgICAgICB0aGlzLmZsb2F0ID0gMjA7XG4gICAgICAgIHRoaXMuZmxvYXREaXJlY3QgPSAxOyBcbiAgICAgICAgdGhpcy5ncmF2ZVNwYXduID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ3JhdmVYID0gMCA7XG4gICAgICAgIHRoaXMuZ3JhdmVZID0gLTIwOyBcbiAgICAgICAgdGhpcy5ncmF2ZVN0YXRlID0gJ21vdmUnXG4gICAgICAgIC8vdXBncmFkZXNcbiAgICAgICAgdGhpcy5kYW1hZ2VNdWx0aSA9IDE7IFxuICAgICAgICB0aGlzLmxvb3RNdWx0aSA9IDE7XG4gICAgICAgIHRoaXMua25vY2tiYWNrTXVsdGkgPSAxO1xuICAgICAgICB0aGlzLnNwZWVkTXVsdGkgPSAxOyBcbiAgICAgICAgdGhpcy5waWVyY2UgPSAwOyBcblxuICAgICAgICB0aGlzLmNoaWxsID0gMDtcbiAgICAgICAgdGhpcy5hcmVhID0gMDsgXG4gICAgICAgIHRoaXMucG9pc29uID0gMjsgXG4gICAgICAgIHRoaXMuZXhwbG9kZURhbWFnZURlYWx0ID0gMCBcblxuXG5cbiAgICB9XG4gICAgZWxlbWVudGFscygpeyBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8dGhpcy5lbGVtZW50TGlzdC5sZW5ndGg7IGkrKyl7IC8vIExvYWQgZWxlbWVudGFsIHNwcml0ZXMgXG4gICAgICAgICAgICBpZiAoIXRoaXMuZWxlbWVudFNwcml0ZXNbdGhpcy5lbGVtZW50TGlzdFtpXV0pe1xuICAgICAgICAgICAgICAgIGxldCBlbGVUeXBlID0gdGhpcy5lbGVtZW50TGlzdFtpXTsgXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFuZEVsZSA9IG5ldyBTcHJpdGVBbmltYXRpb24oZWxlVHlwZStcIi9zdGFuZF8/LnBuZ1wiLCB0aGlzLmVsZW1lbnRJbmZvW2VsZVR5cGVdWydzdGFuZCddLCA2LCBcInN0YW5kXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZUVsZSA9IG5ldyBTcHJpdGVBbmltYXRpb24oZWxlVHlwZStcIi9tb3ZlXz8ucG5nXCIsIHRoaXMuZWxlbWVudEluZm9bZWxlVHlwZV1bJ21vdmUnXSwgNiwgXCJ3YWxrXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrRWxlID0gbmV3IFNwcml0ZUFuaW1hdGlvbihlbGVUeXBlK1wiL2F0dGFjazFfPy5wbmdcIiwgdGhpcy5lbGVtZW50SW5mb1tlbGVUeXBlXVsnYXR0YWNrJ10sIDYsIFwic3dpbmcxXCIsIHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudFNwcml0ZXNbZWxlVHlwZV0gPSBbdGhpcy5zdGFuZEVsZSwgdGhpcy5tb3ZlRWxlLCB0aGlzLmF0dGFja0VsZV07IFxuICAgICAgICAgICAgICAgIC8veydzdGFuZCc6IHRoaXMuc3RhbmRFbGUsICdtb3ZlJzogdGhpcy5tb3ZlRWxlLCAnYXR0YWNrJzogdGhpcy5hdHRhY2tFbGV9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVBbmltYXRpb25zKCl7XG4gICAgICAgIHRoaXMuZnJhbWVzID0gMTU7IFxuICAgICAgICB0aGlzLnN0YW5kID0gbmV3IFNwcml0ZUFuaW1hdGlvbihcIndpemFyZC9hbGVydF8/LnBuZ1wiLCAzLCB0aGlzLmZyYW1lcywgXCJzdGFuZFwiKTsgLy9jb21iYXQgc3ByaXRlczsgXG4gICAgICAgIHRoaXMud2FsayA9IG5ldyBTcHJpdGVBbmltYXRpb24oXCJ3aXphcmQvd2FsazFfPy5wbmdcIiwgMywgMTAsIFwid2Fsa1wiKTsgLy93YWxraW5nIHNwcml0ZXM7IFxuICAgICAgICB0aGlzLmp1bXAgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKFwid2l6YXJkL2p1bXBfPy5wbmdcIiwgMSwgMTAsIFwianVtcFwiKTsgLy9qdW1wIHNwcml0ZXM7XG4gICAgICAgIHRoaXMucmVsYXggPSBuZXcgU3ByaXRlQW5pbWF0aW9uKFwid2l6YXJkL3N0YW5kMV8/LnBuZ1wiLCAzLCAzMCwgXCJyZWxheFwiKTsgLy8gaWRsZSBwb3NlIFxuICAgICAgICB0aGlzLmNhc3QgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKFwid2l6YXJkL2FsZXJ0Xz8ucG5nXCIsIDMsIDEwLCBcInN0YW5kXCIpOyBcbiAgICAgICAgdGhpcy5zd2luZzEgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKFwid2l6YXJkL3N3aW5nTzFfPy5wbmdcIiwgMywgMTIsIFwic3dpbmcxXCIsIHRydWUpOyAvL2F0dGFjayBzcHJpdGVzO1xuICAgICAgICB0aGlzLnN3aW5nMiA9IG5ldyBTcHJpdGVBbmltYXRpb24oXCJ3aXphcmQvc3dpbmdPMl8/LnBuZ1wiLCAzLCAxMiwgXCJzd2luZzJcIiwgdHJ1ZSk7IFxuICAgICAgICB0aGlzLnN3aW5nMyA9IG5ldyBTcHJpdGVBbmltYXRpb24oXCJ3aXphcmQvc3dpbmdPM18/LnBuZ1wiLCAzLCAxMiwgXCJzd2luZzNcIiwgdHJ1ZSk7IFxuICAgICAgICB0aGlzLmRlYWQgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKFwid2l6YXJkL2RlYWRfPy5wbmdcIiwgMywgMjAwLCBcImRlYWRcIik7IFxuICAgICAgICB0aGlzLmF0dGFja0FuaW0gPSBbJ3N3aW5nMScsICdzd2luZzInLCAnc3dpbmczJ107IFxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSBbdGhpcy5zdGFuZCwgdGhpcy53YWxrLCB0aGlzLmp1bXAsIHRoaXMuc3dpbmcxLCB0aGlzLnN3aW5nMiwgdGhpcy5zd2luZzMsIHRoaXMuY2FzdCwgdGhpcy5kZWFkLCB0aGlzLnJlbGF4IF07IFxuICAgICAgICB0aGlzLmdyYXZlTW92ZSA9IG5ldyBTcHJpdGVBbmltYXRpb24oXCJncmF2ZS9tb3ZlXz8ucG5nXCIsIDAsIDMwMCwgXCJtb3ZlXCIpOyBcbiAgICAgICAgdGhpcy5ncmF2ZUxhbmQgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKFwiZ3JhdmUvc3RhbmRfPy5wbmdcIiwgNSwgMTIsIFwibGFuZFwiLCB0cnVlICk7IFxuICAgICAgICB0aGlzLmdyYXZlQW5pbWF0aW9ucyA9IFt0aGlzLmdyYXZlTW92ZSwgdGhpcy5ncmF2ZUxhbmRdO1xuXG4gICAgICAgIC8vIHRoaXMucmVjYWxsSW1hZ2VzID0gWydyZWREcmFnb24wJywgJ3JlZERyYWdvbjEnLCAnYmx1ZURyYWdvbjAnLCAnYmx1ZURyYWdvbjEnLCBcbiAgICAgICAgLy8gJ2dyZWVuRHJhZ29uMCcsJ2dyZWVuRHJhZ29uMScsJ2JsYWNrRHJhZ29uMCcsICdibGFja0RyYWdvbjEnXSA7XG4gICAgICAgIGZvciAobGV0IGkgPTA7aTx0aGlzLnJlY2FsbExpc3QubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICBsZXQgaW1hZ2UgID0gbmV3IEltYWdlKCk7IFxuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gJ2ltYWdlcy9yZWNhbGwvJyt0aGlzLnJlY2FsbExpc3RbaV0rJy5wbmcnOyBcbiAgICAgICAgICAgIHRoaXMucmVjYWxsSW1hZ2VzW3RoaXMucmVjYWxsTGlzdFtpXV0gPSBpbWFnZTsgXG4gICAgICAgIH1cbiAgICAgICAgXG5cblxuICAgIH1cbiAgICBlbW90ZShnYW1lKXtcbiAgICAgICAgaWYgKGdhbWUud2F2ZUZpbmlzaCl7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PSdzdGFuZCcpe3RoaXMuc3RhdGUgPSAncmVsYXgnO30gXG4gICAgfX0gXG5cbiAgICBhdHRhY2socGF1c2Upe1xuICAgICAgICBpZiAodGhpcy5hdHRhY2tDRCA8PSAwICYmIHRoaXMuYWxpdmUgJiYgIXBhdXNlICl7XG4gICAgICAgICAgICBsZXQgeCA9IHRoaXMucG9zaXRpb24ueC0yNTsgXG4gICAgICAgICAgICBpZiAodGhpcy5sZWZ0KXt4ICs9NTA7fVxuICAgICAgICAgICAgdGhpcy5wcm9qID0gbmV3IFByb2plY3RpbGUodGhpcywgJ2xpZ2h0bmluZ2JhbGwnLHgsIHRoaXMucG9zaXRpb24ueSk7XG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuYXR0YWNrQW5pbS5zaGlmdCgpOyBcbiAgICAgICAgICAgIHRoaXMuYXR0YWNrQW5pbS5wdXNoKHRoaXMuc3RhdGUpOyBcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucy5maW5kKChhbmltYXRpb24pPT5hbmltYXRpb24uaXNGb3IodGhpcy5zdGF0ZSkpLnJlc2V0KCk7IFxuICAgICAgICAgICAgdGhpcy5hdHRhY2tDRCA9IHRoaXMuYXR0YWNrU3BlZWQ7XG4gICAgICAgICAgICB0aGlzLnByb2plY3RpbGVzLnB1c2godGhpcy5wcm9qKTtcbiAgICAgICAgICAgIC8vc2V0VGltZW91dCgoKT0+IHt0aGlzLnByb2plY3RpbGVzLnB1c2godGhpcy5wcm9qKX0sIFwiMjAwXCIpOyAvL3NsaWdodCBkZWxheSBmb3IgYW5pbWF0aW9uXG5cbiAgICAgICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLmVsZW1lbnRMaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgeCA9IHRoaXMuZWxlUG9zaXRpb25zW2ldWzBdOy8vZmFjaW5nIGxlZnRcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sZWZ0KXt4ICs9MjB9O1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMucHJvaiA9IG5ldyBQcm9qZWN0aWxlKHRoaXMsIHRoaXMuZWxlbWVudEluZm9bdGhpcy5lbGVtZW50TGlzdFtpXV1bJ3Byb2onXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHgsIHRoaXMuZWxlUG9zaXRpb25zW2ldWzFdKzE4ICk7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9qZWN0aWxlcy5wdXNoKHRoaXMucHJvaik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWNhbGxJY29uKGN0eCwgZ2FtZSl7XG4gICAgICAgIGlmIChnYW1lLnJlY2FsbFN0b3JhZ2Upe1xuICAgICAgICAgICAgbGV0IGltYWdlVHlwZSA9IGdhbWUucmVjYWxsU3RvcmFnZS50eXBlICsgZ2FtZS5yZWNhbGxTdG9yYWdlLmZvcm07XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMucmVjYWxsSW1hZ2VzW2ltYWdlVHlwZV0sIHRoaXMucG9zaXRpb24ueCsyMiwgdGhpcy5wb3NpdGlvbi55LTUpOyBcblxuICAgICAgICAgIC8vICB0aGlzLnJlY2FsbEltYWdlc1tnYW1lLnJlY2FsbFN0b3JhZ2UudHlwZV1cbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHN1bW1vbkF0dGFjaygpe307IFxuICAgIGRyYXcoY3R4LCBwYXVzZSl7XG4gICAgICAgIGxldCBhbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZmluZCgoYW5pbWF0aW9uKT0+YW5pbWF0aW9uLmlzRm9yKHRoaXMuc3RhdGUpKVxuICAgICAgICBsZXQgaW1hZ2UgPSBhbmltYXRpb24uZ2V0SW1hZ2UocGF1c2UpOyAgIC8vZ2V0IHNwcml0ZVxuXG4gICAgICAgIC8vIGlmICh0aGlzLmludnVsblRpbWUlND49MSAmJiB0aGlzLmludnVsblRpbWU+MCAmJiB0aGlzLmFsaXZlKSB7Y3R4Lmdsb2JhbEFscGhhID0gMC4yfTtcbiAgICAgICAgLy9pZiAodGhpcy5oaXRib3gpeyBjdHguZmlsbFJlY3QodGhpcy5oaXRib3hbMF0sdGhpcy5oaXRib3hbMV0sIHRoaXMuaGl0Ym94WzJdLCB0aGlzLmhpdGJveFszXSk7fVxuICAgICAgICAvL2N0eC5maWxsUmVjdCh0aGlzLmN1clRpbGUqODAsIHRoaXMucG9zaXRpb24ueSwgODAsIDgwKTsgLy9zZWxlY3RlZCB0aWxlXG4gICAgICAgIC8vIGN0eC5maWxsUmVjdCh0aGlzLmhpdGJveFswXS0oNzUqKC0xK3RoaXMubG9vdE11bHRpKSksIHRoaXMucG9zaXRpb24ueSwgdGhpcy53aWR0aCwgODApOyAvL2xvb3QgcmFuZ2VcbiAgICAgICAgLy8gY3R4LmZpbGxSZWN0KHRoaXMuaGl0Ym94WzBdLCB0aGlzLnBvc2l0aW9uLnksIHRoaXMud2lkdGgrNzUqKC0xK3RoaXMubG9vdE11bHRpKSwgODApOyAvL2xvb3QgcmFuZ2VcblxuICAgICAgICBpZiAodGhpcy5sZWZ0KXtcbiAgICAgICAgICAgIGN0eC5zY2FsZSgtMSwxKTtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIC10aGlzLnBvc2l0aW9uLngtMS41KnRoaXMud2lkdGgtMTUsIHRoaXMucG9zaXRpb24ueSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7Y3R4LmRyYXdJbWFnZShpbWFnZSwgdGhpcy5wb3NpdGlvbi54LTUsIHRoaXMucG9zaXRpb24ueSk7IH1cbiAgICAgICAgXG4gICAgICAgIGN0eC5zZXRUcmFuc2Zvcm0oMSwwLDAsMSwwLDApO1xuXG4gICAgICAgIGlmICh0aGlzLmludnVsbkRhcmsgJiYgdGhpcy5hbGl2ZSl7XG4gICAgICAgICAgICBjb25zdCBidWZmZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTsgLy8gSW1hZ2UgdGludGluZ1xuICAgICAgICAgICAgYnVmZmVyLndpZHRoID0gMjAwOy8vaW1hZ2Uud2lkdGg7XG4gICAgICAgICAgICBidWZmZXIuaGVpZ2h0ID0gMjAwOy8vaW1hZ2UuaGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgYnR4ID0gYnVmZmVyLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgICAgICBidHguZHJhd0ltYWdlKGltYWdlLCAwLDApO1xuICAgICAgICAgICAgYnR4LmZpbGxTdHlsZSA9IFwiIzAwMDAwMFwiO1xuICAgICAgICAgICAgYnR4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdtdWx0aXBseSc7XG4gICAgICAgICAgICBidHguZmlsbFJlY3QoMCwwLGJ1ZmZlci53aWR0aCwgYnVmZmVyLmhlaWdodCk7XG4gICAgICAgICAgICBidHguZ2xvYmFsQWxwaGEgPSAwLjY7XG4gICAgICAgICAgICBidHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJkZXN0aW5hdGlvbi1pblwiO1xuICAgICAgICAgICAgYnR4LmRyYXdJbWFnZShpbWFnZSwwLDApOyBcblxuICAgICAgICAgICAgaWYgKHRoaXMubGVmdCl7XG4gICAgICAgICAgICAgICAgY3R4LnNjYWxlKC0xLDEpO1xuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoYnVmZmVyLCAtdGhpcy5wb3NpdGlvbi54LTEuNSp0aGlzLndpZHRoLTEwLCB0aGlzLnBvc2l0aW9uLnkpO1xuICAgICAgICAgICAgICAgIGN0eC5zZXRUcmFuc2Zvcm0oMSwwLDAsMSwwLDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7Y3R4LmRyYXdJbWFnZShidWZmZXIsIHRoaXMucG9zaXRpb24ueC01LCB0aGlzLnBvc2l0aW9uLnkpOyB9XG4gICAgICAgIH1cbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMTtcblxuICAgICAgICBcbiAgICAgICAgaWYgKGFuaW1hdGlvbi5zaG91bGRTdG9wKCkpeyAvL3Jlc2V0cyBcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAnc3RhbmQnO30gXG5cbiAgICAgICAgLy9lbGVtZW50YWxzIFxuICAgICAgICB0aGlzLnBsYXllclggPSB0aGlzLnBvc2l0aW9uLnggLSB0aGlzLndpZHRoLzIgKzE4OyBcbiAgICAgICAgdGhpcy5lbGVQb3NpdGlvbnMgPSBbIFt0aGlzLnBsYXllclggLTYwLCB0aGlzLnBvc2l0aW9uLnkrNV0sIFt0aGlzLnBsYXllclggLTQwLCB0aGlzLnBvc2l0aW9uLnktMzVdLFxuICAgICAgICAgICAgW3RoaXMucGxheWVyWCAsIHRoaXMucG9zaXRpb24ueS01NV0sIFt0aGlzLnBsYXllclggKzQwLCB0aGlzLnBvc2l0aW9uLnktMzVdLCBbdGhpcy5wbGF5ZXJYICs2MCwgdGhpcy5wb3NpdGlvbi55KzVdIF07XG4gICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8dGhpcy5lbGVtZW50TGlzdC5sZW5ndGg7IGkrKyl7IC8vIExvYWQgZWxlbWVudGFsIHNwcml0ZXMgXG4gICAgICAgICAgICAgICAgbGV0IGVsZVR5cGUgPSB0aGlzLmVsZW1lbnRMaXN0W2ldOyBcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZWxlbWVudExvYWRlZFNwcml0ZVtlbGVUeXBlXSl7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmICh0aGlzLmVsZW1lbnRTdGF0ZVtpXSA9ICdzdGFuZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuZWxlbWVudFN0YXRlW2ldID0gJ3N0YW5kJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlID09ICdzd2luZzInIHx8dGhpcy5zdGF0ZSA9PSAnc3dpbmczJyl7dGhpcy5lbGVtZW50U3RhdGVbaV09J3N3aW5nMSd9XG4gICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFuaW1hdGlvbiA9IHRoaXMuZWxlbWVudFNwcml0ZXNbZWxlVHlwZV0uZmluZCgoYW5pbWF0aW9uKT0+YW5pbWF0aW9uLmlzRm9yKHRoaXMuZWxlbWVudFN0YXRlW2ldKSkgLy8gY29waWVzIHBsYXllciBzdGF0ZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRMb2FkZWRTcHJpdGVbZWxlVHlwZV0gPSBhbmltYXRpb24uZ2V0SW1hZ2UocGF1c2UpOyAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFuaW1hdGlvbi5zaG91bGRTdG9wKCkpeyAvL3Jlc2V0cyBBdHRhY2sgYW5pbWF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRTdGF0ZVtpXT0gJ3N0YW5kJztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudFNwcml0ZXNbZWxlVHlwZV1bMl0ucmVzZXQoKSAvL3Jlc2V0IFxuICAgICAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5sZWZ0KXtcbiAgICAgICAgICAgICAgICAgICAgY3R4LnNjYWxlKC0xLDEpO1xuICAgICAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuZWxlbWVudExvYWRlZFNwcml0ZVtlbGVUeXBlXSwgLXRoaXMuZWxlUG9zaXRpb25zW2ldWzBdLXRoaXMud2lkdGgtNDUsIHRoaXMuZWxlUG9zaXRpb25zW2ldWzFdKTsgXG4gICAgICAgICAgICAgICAgICAgIGN0eC5zZXRUcmFuc2Zvcm0oMSwwLDAsMSwwLDApO31cbiAgICAgICAgICAgICAgICBlbHNlIChjdHguZHJhd0ltYWdlKHRoaXMuZWxlbWVudExvYWRlZFNwcml0ZVtlbGVUeXBlXSwgdGhpcy5lbGVQb3NpdGlvbnNbaV1bMF0tMjAsIHRoaXMuZWxlUG9zaXRpb25zW2ldWzFdKSk7IFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZWxlbWVudExvYWRlZFNwcml0ZSA9IHt9IC8vY2xlYXIgbG9hZGVkIHNwcml0ZXNcblxuICAgICAgICBpZiAodGhpcy5ncmF2ZVNwYXduKSB7IFxuICAgICAgICAgICAgaWYgKHRoaXMuZ3JhdmVZID49IHRoaXMuZmxvb3IrMzUpe3RoaXMuZ3JhdmVTdGF0ZSA9J2xhbmQnfVxuICAgICAgICAgICAgZWxzZSB7dGhpcy5ncmF2ZVkgKz0gOH07IFxuXG4gICAgICAgICAgICBsZXQgZ3JhdmVBbmltYXRpb24gPSB0aGlzLmdyYXZlQW5pbWF0aW9ucy5maW5kKChhbmltYXRpb24pPT5hbmltYXRpb24uaXNGb3IodGhpcy5ncmF2ZVN0YXRlKSlcbiAgICAgICAgICAgIGxldCBncmF2ZUltYWdlID0gZ3JhdmVBbmltYXRpb24uZ2V0SW1hZ2UocGF1c2UpO1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShncmF2ZUltYWdlLCB0aGlzLmdyYXZlWCwgdGhpcy5ncmF2ZVkpO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3UHJvaihjdHgsIHBhdXNlKXtcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlcy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LmRyYXcoY3R4LCBwYXVzZSkgKSAvL2RyYXcgcHJvamVjdGlsZXMgXG4gICAgfVxuXG4gICAgdGVsZXBvcnQoZGlyZWN0aW9uKXtcbiAgICAgICAgaWYgKHRoaXMubGFuZSAtIDEqZGlyZWN0aW9uPi0xICYmIHRoaXMubGFuZSAtIDEqZGlyZWN0aW9uPDMgJiYgdGhpcy5hbGl2ZSl7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgKz0gdGhpcy5yb3dIZWlnaHQqZGlyZWN0aW9uOzJcbiAgICAgICAgICAgIHRoaXMubGFuZSArPSAtMSpkaXJlY3Rpb247IFxuICAgICAgICAgICAgdGhpcy5mbG9vciA9ICB0aGlzLmdhbWVIZWlnaHQgLSA0NSAtICgxK3RoaXMubGFuZSkqdGhpcy5yb3dIZWlnaHR9XG4gICAgfVxuICAgIHVwZGF0ZSgpe1xuICAgICAgICBpZiAodGhpcy5pbnZ1bG5UaW1lPjApe1xuICAgICAgICAgICAgdGhpcy5pbnZ1bG5UaW1lLS1cbiAgICAgICAgICAgIGlmICh0aGlzLmludnVsblRpbWU+MCl7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnZ1bG5EYXJrVGltZSArK1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW52dWxuRGFya1RpbWU+NSkge3RoaXMuaW52dWxuRGFyayA9IGZhbHNlOyB0aGlzLmludnVsbkRhcmtUaW1lID0gLTN9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5pbnZ1bG5EYXJrVGltZT4wKXt0aGlzLmludnVsbkRhcmsgPXRydWV9O1xuICAgICAgICAgICAgfSBlbHNlIHt0aGlzLmludnVsbkRhcmsgPSBmYWxzZX07XG4gICAgICAgIFxuICAgICAgICB9OyBcbiAgICAgICAgaWYgKHRoaXMuYXR0YWNrQ0QgPjApe3RoaXMuYXR0YWNrQ0QtPSAoMSp0aGlzLnNwZWVkTXVsdGkpfTtcbiAgICAgICAgaWYgKHRoaXMuaGVhbHRoPD0wKXt0aGlzLnN0YXRlID0gJ2RlYWQnOyBcbiAgICAgICAgICAgICAgICB0aGlzLmFsaXZlPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmdyYXZlU3Bhd24gPSB0cnVlXG4gICAgICAgICAgICAgICAgdGhpcy5ncmF2ZVggPSB0aGlzLnBvc2l0aW9uLngrMjA7IFxuICAgICAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnByb2plY3RpbGVzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QudXBkYXRlKCkgKTsgXG4gICAgICAgIHRoaXMucHJvamVjdGlsZXMgPSB0aGlzLnByb2plY3RpbGVzLmZpbHRlciggIC8vZGVsZXRlcyBwcm9qZWN0aWxlc1xuICAgICAgICAgICAgZnVuY3Rpb24gKG9iamVjdCl7cmV0dXJuIG9iamVjdC5kZWxldGUgIT09IHRydWU7IFxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmFsaXZlKXtcbiAgICAgICAgICAgIGlmICh0aGlzLnNwZWVkWCE9MCAmJiAhdGhpcy5hdHRhY2tBbmltLmluY2x1ZGVzKHRoaXMuc3RhdGUpKXtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gJ3dhbGsnOyBcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZSA9PSAnd2FsaycpIHRoaXMuc3RhdGUgPSAnc3RhbmQnOyBcblxuICAgICAgICAgICAgaWYgKHRoaXMucG9zaXRpb24ueDwtMzApIHt0aGlzLnBvc2l0aW9uLnggPSAtMzB9OyAvL2xlZnQgYm9yZGVyXG4gICAgICAgICAgICBpZiAodGhpcy5wb3NpdGlvbi54PnRoaXMuZ2FtZVdpZHRoLXRoaXMud2lkdGgpIHt0aGlzLnBvc2l0aW9uLnggPSB0aGlzLmdhbWVXaWR0aC10aGlzLndpZHRoO30gLy9yaWdodCBib3JkZXJcbiAgICAgICAgICAgIHRoaXMuY3VyVGlsZSA9IE1hdGguZmxvb3IoICh0aGlzLndpZHRoLzIgK3RoaXMucG9zaXRpb24ueCkvODApO1xuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMua25vY2tiYWNrRm9yY2UpPjApIHtzZXRUaW1lb3V0KCgpPT57dGhpcy5rbm9ja2JhY2tGb3JjZT0wfSwgMTAwMCl9OyAgLy9EUiBcbiAgICAgICAgICAgIGlmICh0aGlzLmtub2NrYmFja0ZvcmNlPjApe3RoaXMua25vY2tiYWNrRm9yY2UtPTAuNTt9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmtub2NrYmFja0ZvcmNlPDApe3RoaXMua25vY2tiYWNrRm9yY2UrPTAuNTt9XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnggKz0gKHRoaXMuc3BlZWRYKnRoaXMuc3BlZWRNdWx0aSk7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnggKz0gdGhpcy5rbm9ja2JhY2tGb3JjZTtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSAtPSB0aGlzLnNwZWVkWTsgXG5cbiAgICAgICAgfSBlbHNlIHsgICAgICBcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mbG9hdD4wKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55IC09MC4xKnRoaXMuZmxvYXREaXJlY3Q7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmxvYXQgLS07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHt0aGlzLmZsb2F0ID0gMjA7IFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mbG9hdERpcmVjdCA9IC10aGlzLmZsb2F0RGlyZWN0fVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfTtcblxuXG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uLnkgPiB0aGlzLmZsb29yKXsgLy9ib3R0b20gYm9yZGVyICh1cGRhdGUgZm9yIHBsYXRmb3JtcylcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSA9IHRoaXMuZmxvb3I7XG4gICAgICAgICAgICB0aGlzLnNwZWVkWSA9IDA7XG4gICAgICAgICAgICB0aGlzLmp1bXAgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZ3Jhdml0eVRpbWUgPSAxOyBcbiAgICAgICAgICAgIGlmICh0aGlzLmFsaXZlICYmICF0aGlzLmF0dGFja0FuaW0uaW5jbHVkZXModGhpcy5zdGF0ZSkpIHRoaXMuc3RhdGUgPSAnc3RhbmQnO1xuICAgICAgICB9IFxuICAgICAgICBpZiAodGhpcy5zcGVlZFk+MCl7XG4gICAgICAgICAgICB0aGlzLnNwZWVkWS09MC41OyBcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5qdW1wKXsgLy9ncmF2aXR5XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgKz0gMSp0aGlzLmdyYXZpdHlUaW1lO1xuICAgICAgICAgICAgdGhpcy5ncmF2aXR5VGltZSs9MC41OyBcbiAgICAgICAgICAgIGlmICghdGhpcy5hdHRhY2tBbmltLmluY2x1ZGVzKHRoaXMuc3RhdGUpKSB0aGlzLnN0YXRlID0gJ2p1bXAnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGl0Ym94ID0gW3RoaXMucG9zaXRpb24ueCsxNSwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodF07IFxuXG5cbiAgICAgICAgLy90aGlzLnBvc2l0aW9uLngrPSA1IC8gZGVsdGFUaW1lOyBcbiAgICB9XG59IiwiaW1wb3J0IFNwcml0ZUFuaW1hdGlvbiBmcm9tICcuL1Nwcml0ZUFuaW1hdGlvbic7IFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0aWxle1xuICAgIGNvbnN0cnVjdG9yKHBsYXllciwgdHlwZT0nZW5lcmd5YmFsbCcseCA9IDAsIHk9MCwgZGlyZWN0aW9uID0gMSApe1xuICAgICAgICB0aGlzLnR5cGVJbmZvID0geyAnZW5lcmd5YmFsbCc6IHsnc3BlZWQnOiAxMCwgJ3RyYXZlbCc6MiwgJ2V4cGxvZGUnOjUsICd4T2ZmJzogOTB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3llbGxvd0JhbGwnOiB7J3NwZWVkJzogMTAsICd0cmF2ZWwnOjIsICdleHBsb2RlJzo1LCAneE9mZic6IDUwLCd5T2ZmJzozNX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAncHVycGxlQmFsbCc6IHsnc3BlZWQnOiAxMCwgJ3RyYXZlbCc6MiwgJ2V4cGxvZGUnOjUsICd4T2ZmJzogNTAsJ3lPZmYnOjM1fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdyZWRCYWxsJzogeydzcGVlZCc6IDEwLCAndHJhdmVsJzoyLCAnZXhwbG9kZSc6NSwgJ3hPZmYnOiA1MCwneU9mZic6MzV9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2dyZWVuQmFsbCc6IHsnc3BlZWQnOiAxMCwgJ3RyYXZlbCc6MiwgJ2V4cGxvZGUnOjUsICd4T2ZmJzogNTAsJ3lPZmYnOjM1fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdibHVlQmFsbCc6IHsnc3BlZWQnOiAxMCwgJ3RyYXZlbCc6MiwgJ2V4cGxvZGUnOjUsICd4T2ZmJzogNTAsJ3lPZmYnOjM1fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdmaXJlYmFsbCc6IHsnc3BlZWQnOiAzLCAndHJhdmVsJzoxLCAnZXhwbG9kZSc6MiwgJ3hPZmYnOiA3MCwgJ3lPZmYnOi0xMCB9LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICdiYXRiYWxsJzogeydzcGVlZCc6IDYsICd0cmF2ZWwnOjMsICdleHBsb2RlJzo0LCAneE9mZic6IDEwNX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnZmlyZWJhbGwyJzogeydzcGVlZCc6IDEyLCAndHJhdmVsJzoxLCAnZXhwbG9kZSc6MywgJ3hPZmYnOiA5NSwgJ3lPZmYnOi0xMCB9LCAgLy8tMTUsICsyMFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3BvaXNvbmJhbGwnOiB7J3NwZWVkJzogNywgJ3RyYXZlbCc6MSwgJ2V4cGxvZGUnOjUsICd4T2ZmJzo4NSwgICd5T2ZmJzotNSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2ljZWJhbGwnOiB7J3NwZWVkJzogOCwgJ3RyYXZlbCc6MiwgJ2V4cGxvZGUnOjQsICd4T2ZmJzo5NSwgICd5T2ZmJzotNSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2xpZ2h0bmluZ2JhbGwnOiB7J3NwZWVkJzogMTAsICd0cmF2ZWwnOjIsICdleHBsb2RlJzo3LCAneE9mZic6ODB9LCAvL3BsYXllciBiYWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAndGh1bmRlcmJhbGwnOiB7J3NwZWVkJzogMTIsICd0cmF2ZWwnOjIsICdleHBsb2RlJzo3LCAneE9mZic6ODAsJ3lPZmYnOi0xMCB9IH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZ2FtZVdpZHRoID0gcGxheWVyLmdhbWVXaWR0aDtcbiAgICAgICAgdGhpcy5nYW1lSGVpZ2h0ID0gcGxheWVyLmdhbWVIZWlnaHQ7XG4gICAgICAgIHRoaXMud2lkdGggPSAyMDsgLy9zcHJpdGUgc2l6ZSBcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAyMDsgXG4gICAgICAgIHRoaXMuZXhwbG9kZSA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5kZWxldGUgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMucHJvamVjdGlsZSA9IHRydWU7XG4gICAgICAgIHRoaXMudG91Y2hIaXQ9IHRydWU7XG4gICAgICAgIHRoaXMucGllcmNlID0gcGxheWVyLnBpZXJjZTtcbiAgICAgICAgdGhpcy5vd25lciA9IHBsYXllcjtcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSBwbGF5ZXIuZGFtYWdlICogcGxheWVyLmRhbWFnZU11bHRpOyBcbiAgICAgICAgdGhpcy5oZWFsdGggPTE7IFxuICAgICAgICB0aGlzLnNpZGUgPSAwOyBcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTsgXG4gICAgICAgIHRoaXMuaGl0TGlzdCA9IFtdOyBcbiAgICAgICAgdGhpcy5sYW5lID0gcGxheWVyLmxhbmU7XG4gICAgICAgIHRoaXMuc3RhdGUgPSAndHJhdmVsJzsgXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uOyBcbiAgICAgICAgXG5cbiAgICAgICAgdGhpcy5jaGlsbCA9IHBsYXllci5jaGlsbDtcbiAgICAgICAgdGhpcy5hcmVhID0gcGxheWVyLmFyZWE7IFxuICAgICAgICB0aGlzLnBvaXNvbiA9IHBsYXllci5wb2lzb247IFxuICAgICAgICB0aGlzLnBvaXNvbk1heCA9IHBsYXllci5wb2lzb25NYXg7XG5cbiAgICAgICAgdGhpcy54T2ZmID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd4T2ZmJ107XG4gICAgICAgIGlmICh0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3lPZmYnXSl7dGhpcy55T2ZmID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd5T2ZmJ119XG4gICAgICAgIGVsc2UgdGhpcy55T2ZmID0wO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlQW5pbWF0aW9ucygpXG4gICAgICAgIFxuICAgICAgICB0aGlzLmxlZnQgPSBwbGF5ZXIubGVmdDsgLy8gc2hvb3QgbGVmdFxuICAgICAgICBpZiAoeCA9PSAwICYmIHkgPT0gMCl7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0geyAgLy9wb3NpdGlvbiBcbiAgICAgICAgICAgICAgICB4OiBwbGF5ZXIucG9zaXRpb24ueCwgXG4gICAgICAgICAgICAgICAgeTogcGxheWVyLnBvc2l0aW9uLnkrNDVcbiAgICAgICAgICAgIH19XG4gICAgICAgIGVsc2UgeyB0aGlzLnBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgIHg6IHgrMzUsXG4gICAgICAgICAgICAgICAgeTogeSs2NX1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3BlZWQgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3NwZWVkJ107XG4gICAgICAgIHRoaXMuaGl0Ym94ID0gW3RoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodF07IFxuXG5cbiAgICB9XG5cbiAgICBjcmVhdGVBbmltYXRpb25zKCl7XG4gICAgICAgIHRoaXMuZnJhbWVzID0gNjsgXG4gICAgICAgIHRoaXMudHJhdmVsID0gbmV3IFNwcml0ZUFuaW1hdGlvbih0aGlzLnR5cGUrJy90cmF2ZWxfPy5wbmcnLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3RyYXZlbCddLCB0aGlzLmZyYW1lcywgXCJ0cmF2ZWxcIik7IC8vc3RhbmRpbmcgc3ByaXRlczsgXG4gICAgICAgIHRoaXMuYnVyc3QgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKHRoaXMudHlwZSsnL2V4cGxvZGVfPy5wbmcnLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2V4cGxvZGUnXSwgdGhpcy5mcmFtZXMsIFwiYnVyc3RcIiwgdHJ1ZSk7IC8vd2Fsa2luZyBzcHJpdGVzOyBcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0gW3RoaXMudHJhdmVsLCB0aGlzLmJ1cnN0XTsgXG5cbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAndGh1bmRlcmJhbGwnKXtcbiAgICAgICAgICAgIHRoaXMuYm9sdCA9IG5ldyBTcHJpdGVBbmltYXRpb24oJ3RodW5kZXJib2x0L2V4cGxvZGVfPy5wbmcnLCA1LCB0aGlzLmZyYW1lcywgXCJleHBsb2RlXCIsIHRydWUpOyAvLyAgIFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhdyhjdHgsIHBhdXNlKSB7XG4gICAgICAgIC8vY3R4LmZpbGxSZWN0KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7IC8vIGhpdGJveFxuICAgICAgICBpZiAodGhpcy50eXBlICE9IFwiTm9uZVwiKXsgXG4gICAgICAgICAgICBjb25zdCBhbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZmluZCgoYW5pbWF0aW9uKT0+YW5pbWF0aW9uLmlzRm9yKHRoaXMuc3RhdGUpKVxuICAgICAgICAgICAgY29uc3QgaW1hZ2UgPSBhbmltYXRpb24uZ2V0SW1hZ2UocGF1c2UpOyAgICAgICBcbiAgICAgICAgICAgIGlmICh0aGlzLmV4cGxvZGUpe1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAnYnVyc3QnXG4gICAgICAgICAgICAgICAgaWYodGhpcy50eXBlID09J3RodW5kZXJiYWxsJyl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBib2x0SW1hZ2UgPSB0aGlzLmJvbHQuZ2V0SW1hZ2UocGF1c2UpOyBcbiAgICAgICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShib2x0SW1hZ2UsIHRoaXMucG9zaXRpb24ueCwgMjQwKVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9OyBcbiAgICAgICAgICAgIGlmIChhbmltYXRpb24uc2hvdWxkU3RvcCgpKXt0aGlzLmRlbGV0ZSA9IHRydWU7fVxuICAgIFxuICAgICAgICAgICAgaWYgKHRoaXMudHlwZT09J2ljZWJhbGwnICYgdGhpcy5zdGF0ZT09J2J1cnN0Jyl7dGhpcy54T2ZmPTEwMH07XG4gICAgICAgICAgICBpZiAoIXRoaXMubGVmdCl7Ly9mbGlwIGJhc2VkIG9uIHNwcml0ZSBvcmllbnRhdGlvblxuICAgICAgICAgICAgICAgIGN0eC5zY2FsZSgtMSwxKTtcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltYWdlLCAtdGhpcy5wb3NpdGlvbi54LSB0aGlzLnhPZmYrMTUsIHRoaXMucG9zaXRpb24ueS02MCt0aGlzLnlPZmYpO31cbiAgICAgICAgICAgIGVsc2Uge2N0eC5kcmF3SW1hZ2UoaW1hZ2UsIHRoaXMucG9zaXRpb24ueC10aGlzLnhPZmYrMzUsIHRoaXMucG9zaXRpb24ueS02MCt0aGlzLnlPZmYpOyB9XG5cbiAgICAgICAgICAgIGN0eC5zZXRUcmFuc2Zvcm0oMSwwLDAsMSwwLDApOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuc3ByaXRlLCB0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSsyNSk7IC8vZHJhdyBtb2IgKHgsIHksIGhlaWdodCwgd2lkdGgpXG4gICAgICAgICAgICBpZiAodGhpcy5leHBsb2RlKXt0aGlzLmRlbGV0ZSA9IHRydWV9OyBcbiAgICAgICAgfVxuXG4gICAgfSBcblxuXG4gICAgdXBkYXRlKCl7XG4gICAgICAgIGlmICghdGhpcy5leHBsb2RlKXtcbiAgICAgICAgICAgIGlmICh0aGlzLmxlZnQpe3RoaXMucG9zaXRpb24ueCAtPSB0aGlzLnNwZWVkO30gLy8gZGlyZWN0aW9uXG4gICAgICAgICAgICBlbHNlIHRoaXMucG9zaXRpb24ueCArPSB0aGlzLnNwZWVkO1xuICAgICAgICB9XG5cbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uLng8LXRoaXMud2lkdGgtMTAwKSB7dGhpcy5kZWxldGUgPSB0cnVlIH07XG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uLng+dGhpcy5nYW1lV2lkdGgtdGhpcy53aWR0aCkge3RoaXMuZGVsZXRlID0gdHJ1ZX07XG5cbiAgICAgICAgdGhpcy5oaXRib3ggPSBbdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnkrNSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHRdOyBcblxuXG5cblxuICAgIH1cblxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHJlc3RhcnRTY3JlZW57XG4gICAgY29uc3RydWN0b3IoZ2FtZSl7XG4gICAgICAgIHRoaXMuZ2FtZVdpZHRoID0gZ2FtZS5nYW1lV2lkdGg7XG4gICAgICAgIHRoaXMuZ2FtZUhlaWdodCA9IGdhbWUuZ2FtZUhlaWdodDtcbiAgICAgICAgdGhpcy53aWR0aCA9ICA2MDA7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMTcwOyAvLyBnYW1lLmdhbWVIZWlnaHQgLSAzKjkwOyBcbiAgICAgICAgdGhpcy54ID0gKGdhbWUuZ2FtZVdpZHRoLXRoaXMud2lkdGgpLzI7IFxuICAgICAgICB0aGlzLnkgPSAzOy8vKHRoaXMuaGVpZ2h0KVxuICAgICAgICB0aGlzLnBhZGRpbmcgPSAyNTsgXG4gICAgICAgIHRoaXMuZm9udCA9IFwiMTZweCBhcmlhbFwiO1xuICAgICAgICB0aGlzLmZvbnQyID0gXCIyNHB4IGFyaWFsXCI7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IGZhbHNlIDsgXG4gICAgICAgIHRoaXMuYnV0dG9uMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjEudGV4dENvbnRlbnQgPSAnUmV0dXJuIHRvIE1haW4nO1xuICAgICAgICB0aGlzLmJ1dHRvblgxID0gdGhpcy5nYW1lV2lkdGgvMjtcbiAgICAgICAgdGhpcy5idXR0b25XaWR0aCA9IDI1MDtcbiAgICAgICAgdGhpcy5idXR0b25IZWlnaHQgPSA1MDsgXG4gICAgICAgIFxuICAgICAgICB0aGlzLmJ1dHRvblBvc2l0aW9ucyA9IFsgW3RoaXMueCsodGhpcy53aWR0aC10aGlzLmJ1dHRvbldpZHRoKS8yLCB0aGlzLmhlaWdodC10aGlzLmJ1dHRvbkhlaWdodC10aGlzLnBhZGRpbmddXSBcbiAgICAgICAgdGhpcy5idXR0b25zTGlzdCA9IFt0aGlzLmJ1dHRvbjFdXG4gICAgICAgIH1cblxuICAgICAgICBpbml0aWFsaXplKGdhbWUpe1xuICAgICAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVTY3JlZW4nKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIGVsZW0gPSB0aGlzO1xuICAgICAgICAgICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7ZWxlbS5oYW5kbGVDbGljayhlLCBnYW1lKSB9LCBmYWxzZSk7ICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICByZWRyYXcoY3R4KXtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpPHRoaXMuYnV0dG9uc0xpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgIHRoaXMuZHJhd0J1dHRvbih0aGlzLmJ1dHRvbnNMaXN0W2ldLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVswXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMV0sIGN0eClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3RhcnRGdW5jdGlvbnMoZ2FtZSl7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkgPSBmYWxzZTsgXG4gICAgICAgICAgICBnYW1lLmZhZGVPdXQgPSB0cnVlO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHtnYW1lLnRpdGxlRGlzcGxheSA9IHRydWV9LCBcIjIwMDBcIikgLy8gZmFkZSBvdXQgdHJhbnNpdGlvblxuICAgICAgICAgICBcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaGFuZGxlQ2xpY2soZSwgZ2FtZSl7XG4gICAgICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZVNjcmVlbicpO1xuICAgICAgICAgICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpOyBcbiAgICAgICAgICAgIGNvbnN0IHggPSBlLmNsaWVudFggLSBjYW52YXMub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBlLmNsaWVudFkgLSBjYW52YXMub2Zmc2V0VG9wO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTx0aGlzLmJ1dHRvbnNMaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgIC8vIHRoaXMuZHJhd0J1dHRvbih0aGlzLmJ1dHRvbnNMaXN0W2ldLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVswXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMV0sIGN0eClcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5ICYmIGN0eC5pc1BvaW50SW5QYXRoKHgseSkpIHsgLy9idXR0b24gY2xpY2sgKG9ubHkgd2hlbiBkaXNwbGF5ZWQpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdGFydEZ1bmN0aW9ucyhnYW1lLCBpKTsgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSAgICAgIFxuICAgICAgICB9XG5cblxuICAgICAgICBkcmF3QnV0dG9uKGUxLCB4LCB5LCBjdHgpeyAgIFxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdzdGVlbGJsdWUnOyAvL2RyYXcgYm9yZGVyXG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7IC8vc2V0cyBhcmVhIGZvciBjb2xsaXNpb24gKGlzUG9pbnRJblBhdGgpXG4gICAgICAgICAgICBjdHgucm91bmRSZWN0KHgseSx0aGlzLmJ1dHRvbldpZHRoLCB0aGlzLmJ1dHRvbkhlaWdodCwgMik7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAgICAgICBjdHguZm9udCA9IHRoaXMuZm9udDI7IC8vZHJhdyB0ZXh0IFxuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQoZTEudGV4dENvbnRlbnQsIHgrdGhpcy5idXR0b25XaWR0aC8yLCB5K3RoaXMuYnV0dG9uSGVpZ2h0LzIpOyBcblxuXG5cbiAgICAgICAgfVxuXG4gICAgIFxuICAgICAgICBkaXNwbGF5TWVudShjdHgsIGdhbWUpeyAvL3VwZ3JhZGUgd2luZG93IGJhY2tncm91bmRcbiAgICAgICAgICAgIGlmICh0aGlzLmRpc3BsYXkpe1xuICAgICAgICAgICAgICAgIC8vIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgICAgICAgICAgICAgLy8gY3R4LnN0cm9rZVN0eWxlID0gXCJibGFja1wiO1xuICAgICAgICAgICAgICAgIC8vIGN0eC5saW5lV2lkdGggPSBcIjVcIjsgXG4gICAgICAgICAgICAgICAgLy8gY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIC8vIGN0eC5yb3VuZFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAyKTtcbiAgICAgICAgICAgICAgICAvLyBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgLy8gY3R4LmZpbGwoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVkcmF3KGN0eCk7XG5cbiAgICAgICAgICAgICAgICBjdHguZm9udCA9IHRoaXMuZm9udDI7IC8vZGVmZWF0IFxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAncmVkJztcbiAgICAgICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7IFxuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCgnR2FtZSBPdmVyIScsIHRoaXMuZ2FtZVdpZHRoLzIsIHRoaXMueSArIDI1KSAvL3ZpY3Rvcnkgb3IgZGVmZWF0XG4gICAgICAgICAgICB9XG5cblxuICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgXG5cblxuICAgIFxuICAgICAgICBcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBzdGFydFNjcmVlbntcbiAgICBjb25zdHJ1Y3RvcihnYW1lKXtcbiAgICAgICAgdGhpcy5nYW1lV2lkdGggPSBnYW1lLmdhbWVXaWR0aDtcbiAgICAgICAgdGhpcy5nYW1lSGVpZ2h0ID0gZ2FtZS5nYW1lSGVpZ2h0O1xuICAgICAgICB0aGlzLndpZHRoID0gIDYwMDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAxMjA7IC8vIGdhbWUuZ2FtZUhlaWdodCAtIDMqOTA7IFxuICAgICAgICB0aGlzLnggPSAoZ2FtZS5nYW1lV2lkdGgtdGhpcy53aWR0aCkvMjsgXG4gICAgICAgIHRoaXMueSA9IDM7Ly8odGhpcy5oZWlnaHQpXG4gICAgICAgIHRoaXMucGFkZGluZyA9IDE1OyBcbiAgICAgICAgdGhpcy5mb250ID0gXCIxNnB4IGFyaWFsXCI7XG4gICAgICAgIHRoaXMuZm9udDIgPSBcIjI0cHggYXJpYWxcIjtcbiAgICAgICAgdGhpcy5mb250MyA9IFwiMjBweCBhcmlhbFwiO1xuICAgICAgICB0aGlzLmRpc3BsYXkgPSB0cnVlOyBcbiAgICAgICAgdGhpcy5jb250cm9scyA9IFtcIlN0b3AgdGhlIG1vbnN0ZXJzIGZyb20gYWR2YW5jaW5nIVwiLFwiIC0gVXNlIChXQVNEKSB0byBtb3ZlLCAoSikgdG8ganVtcCwgYW5kIChLKSB0byBzaG9vdC4gVXNlIChQKSB0byBvcGVuIHNob3AuIFwiLCBcbiAgICAgICAgICAgIFwiIC0gQ29sbGVjdCB0aGUgY29pbnMgbW9uc3RlcnMgZHJvcCBiZWZvcmUgdGhleSBleHBpcmVcIiwgXG4gICAgICAgICAgICBcIiAtIFNwZW5kIG1lc29zIG9uIHVwZ3JhZGVzICYgc3VtbW9ucyB0byBib2xzdGVyIHlvdXIgZGVmZW5zZVwiLCBcbiAgICAgICAgICAgIFwiIC0gTG9zZSBsaXZlcyB3aGVuIG1vbnN0ZXJzIGVzY2FwZSBvciB0b3VjaCB5b3VcIiwgXCIgLSBHYW1lIG92ZXIgd2hlbiBhbGwgbGl2ZXMgbG9zdCFcIl07XG4gICAgICAgIHRoaXMua2V5Ym9hcmQgPSBuZXcgSW1hZ2UoKTsgXG4gICAgICAgIHRoaXMua2V5Ym9hcmQuc3JjID0gJ2ltYWdlcy9iZy9rZXlib2FyZC5wbmcnO1xuICAgICAgICB0aGlzLmJ1dHRvbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b24xLnRleHRDb250ZW50ID0gJ1N0YXJ0ISc7XG4gICAgICAgIHRoaXMuYnV0dG9uWDEgPSB0aGlzLmdhbWVXaWR0aC8yO1xuICAgICAgICB0aGlzLmJ1dHRvbldpZHRoID0gNjU7XG4gICAgICAgIHRoaXMuYnV0dG9uSGVpZ2h0ID0gMzU7IFxuICAgICAgICBcbiAgICAgICAgdGhpcy5idXR0b25Qb3NpdGlvbnMgPSBbIFt0aGlzLngrdGhpcy53aWR0aC0gdGhpcy5idXR0b25XaWR0aC10aGlzLnBhZGRpbmcsIHRoaXMuaGVpZ2h0LXRoaXMuYnV0dG9uSGVpZ2h0LXRoaXMucGFkZGluZ11dIFxuICAgICAgICB0aGlzLmJ1dHRvbnNMaXN0ID0gW3RoaXMuYnV0dG9uMV1cbiAgICAgICAgfVxuXG4gICAgICAgIGluaXRpYWxpemUoZ2FtZSl7XG4gICAgICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZVNjcmVlbicpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgZWxlbSA9IHRoaXM7XG4gICAgICAgICAgICAvL2NhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe2VsZW0uaGFuZGxlQ2xpY2soZSwgZ2FtZSkgfSwgZmFsc2UpOyAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgcmVkcmF3KGN0eCl7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTx0aGlzLmJ1dHRvbnNMaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICB0aGlzLmRyYXdCdXR0b24odGhpcy5idXR0b25zTGlzdFtpXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMF0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzFdLCBjdHgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzdGFydEZ1bmN0aW9ucyhnYW1lKXtcbiAgICAgICAgICAgIGdhbWUubmV4dFdhdmUgPSB0cnVlOyBcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheSA9IGZhbHNlOyBcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaGFuZGxlQ2xpY2soZSwgZ2FtZSl7XG4gICAgICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZVNjcmVlbicpO1xuICAgICAgICAgICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpOyBcbiAgICAgICAgICAgIGNvbnN0IHggPSBlLmNsaWVudFggLSBjYW52YXMub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBlLmNsaWVudFkgLSBjYW52YXMub2Zmc2V0VG9wO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTx0aGlzLmJ1dHRvbnNMaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdCdXR0b24odGhpcy5idXR0b25zTGlzdFtpXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMF0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzFdLCBjdHgpXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlzcGxheSAmJiBjdHguaXNQb2ludEluUGF0aCh4LHkpKSB7IC8vYnV0dG9uIGNsaWNrIChvbmx5IHdoZW4gZGlzcGxheWVkKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0RnVuY3Rpb25zKGdhbWUsIGkpOyBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICBkcmF3QnV0dG9uKGUxLCB4LCB5LCBjdHgpeyAgIFxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdzdGVlbGJsdWUnOyAvL2RyYXcgYm9yZGVyXG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoeCx5LHRoaXMuYnV0dG9uV2lkdGgsdGhpcy5idXR0b25IZWlnaHQpOyBcblxuICAgICAgICAgICAgY3R4LmZvbnQgPSB0aGlzLmZvbnQyOyAvL2RyYXcgdGV4dCBcbiAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAnbWlkZGxlJztcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGUxLnRleHRDb250ZW50LCB4K3RoaXMuYnV0dG9uV2lkdGgvMiwgeSt0aGlzLmJ1dHRvbkhlaWdodC8yKTsgXG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7IC8vc2V0cyBhcmVhIGZvciBjb2xsaXNpb24gKGlzUG9pbnRJblBhdGgpXG4gICAgICAgICAgICBjdHgucmVjdCh4LHksdGhpcy5idXR0b25XaWR0aCwgdGhpcy5idXR0b25IZWlnaHQpOyAgICAgICBcbiAgICAgICAgfVxuXG4gICAgIFxuICAgICAgICBkaXNwbGF5TWVudShjdHgsIGdhbWUpeyAvL3VwZ3JhZGUgd2luZG93IGJhY2tncm91bmRcbiAgICAgICAgICAgIGlmICh0aGlzLmRpc3BsYXkgfHwgZ2FtZS53YXZlRmluaXNoIHx8IGdhbWUubGV2ZWxGaW5pc2gpe1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJibGFja1wiO1xuICAgICAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSBcIjVcIjsgXG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGN0eC5yb3VuZFJlY3QodGhpcy54KzAuMyp0aGlzLndpZHRoLCB0aGlzLmhlaWdodCsyMCwgMC40KnRoaXMud2lkdGgsIDI1LCAyKTtcbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICAgICAgICAgIGN0eC5mb250ID0gdGhpcy5mb250OyBcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgICAgICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7IFxuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCgnUHJlc3MgW0FdIGZvciB1cGdyYWRlcycsIHRoaXMuZ2FtZVdpZHRoLzIsIHRoaXMuaGVpZ2h0KzM1KSBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGdhbWUubGV2ZWxOb3RlIT0nJyl7XG4gICAgICAgICAgICAgICAgaWYgKGdhbWUuZ2FtZVRpbWVSZWFsIC0gZ2FtZS5ub3RlVGltZTw0NTAwKXtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICAgICAgICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJibGFja1wiO1xuICAgICAgICAgICAgICAgICAgICBjdHgubGluZVdpZHRoID0gXCI1XCI7IFxuICAgICAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5yb3VuZFJlY3QodGhpcy54KzE1LCB0aGlzLmhlaWdodCowLjUsIHRoaXMud2lkdGgtMzAsIDUwLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGN0eC5mb250ID0gdGhpcy5mb250MzsgXG4gICAgICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xuICAgICAgICAgICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7IFxuICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoZ2FtZS5sZXZlbE5vdGUsIHRoaXMuZ2FtZVdpZHRoLzIsIHRoaXMuaGVpZ2h0LzIrMzApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuZGlzcGxheSB8fCAoZ2FtZS5wYXVzZSAmJiAhZ2FtZS51cGdyYWRlLmRpcGxheSkpe1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJibGFja1wiO1xuICAgICAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSBcIjVcIjsgXG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGN0eC5yb3VuZFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAyKTtcbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgICAgICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ3N0YXJ0JzsgXG4gICAgICAgICAgICAgICAgY3R4LmZvbnQgPSB0aGlzLmZvbnQ7XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmtleWJvYXJkLCAxODAsMCk7XG4gICAgICAgICAgICAgICAgLy8gZm9yIChsZXQgaT0wOyBpPHRoaXMuY29udHJvbHMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyAgICAgY3R4LmZpbGxUZXh0KHRoaXMuY29udHJvbHNbaV0sIHRoaXMueCt0aGlzLnBhZGRpbmcsIHRoaXMueSt0aGlzLnBhZGRpbmcqKDEraSksIHRoaXMud2lkdGgpOyBcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5yZWRyYXcoY3R4KTsgLy9kcmF3IHN0YXJ0IGJ1dHRvblxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICB9ICAgXG4gICAgICAgICAgICAvLyBpZiAoZ2FtZS5zdG9yYWdlLmxlbmd0aD4wKXtcbiAgICAgICAgICAgIC8vICAgICBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgICAgICAgICAgLy8gICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgICAgICAgIC8vICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAvLyAgICAgY3R4LnJvdW5kUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIDIpO1xuICAgICAgICAgICAgLy8gICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgIC8vICAgICBjdHguZmlsbCgpO1xuICAgICAgICAgICAgLy8gICAgIGN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xuICAgICAgICAgICAgLy8gICAgIGN0eC50ZXh0QWxpZ24gPSAnc3RhcnQnOyBcbiAgICAgICAgICAgIC8vICAgICBjdHguZm9udCA9IHRoaXMuZm9udDI7XG4gICAgICAgICAgICAvLyAgICAgY3R4LmZpbGxUZXh0KCdSZXN1bW1vbiBEcmFnb25zIGZyb20gc2hvcCEnLCB0aGlzLngrdGhpcy5wYWRkaW5nLCB0aGlzLnkrdGhpcy5wYWRkaW5nKSBcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIC8vIGVsc2Uge2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydCcpLmlubmVySFRNTD1cIlwiO31cbiAgICAgICAgICAgIFxuICAgIFxuICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgXG5cblxuICAgIFxuICAgICAgICBcbn0iLCJpbXBvcnQgaW1nIGZyb20gJy4vaW1nJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHRpdGxlU2NyZWVue1xuICAgIGNvbnN0cnVjdG9yKGdhbWUpe1xuICAgICAgICB0aGlzLmdhbWVXaWR0aCA9IGdhbWUuZ2FtZVdpZHRoO1xuICAgICAgICB0aGlzLmdhbWVIZWlnaHQgPSBnYW1lLmdhbWVIZWlnaHQ7XG4gICAgICAgIHRoaXMud2lkdGggPSAgNjAwO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDE3MDsgLy8gZ2FtZS5nYW1lSGVpZ2h0IC0gMyo5MDsgXG4gICAgICAgIHRoaXMuYmdBcnQgPSBpbWcoJ2JnL2JnVGl0bGUucG5nJyk7XG4gICAgICAgIHRoaXMueCA9IChnYW1lLmdhbWVXaWR0aC10aGlzLndpZHRoKS8yOyBcbiAgICAgICAgdGhpcy55ID0gMzsvLyh0aGlzLmhlaWdodClcbiAgICAgICAgdGhpcy5wYWRkaW5nID0gMjU7IFxuICAgICAgICB0aGlzLmZvbnRUaXRsZSA9IFwiNDhweCBhcmlhbFwiO1xuICAgICAgICB0aGlzLmZvbnQgPSBcIjE4cHggYXJpYWxcIjtcbiAgICAgICAgdGhpcy5mb250MiA9IFwiMjhweCBhcmlhbFwiO1xuICAgICAgICB0aGlzLmZvbnQzID0gXCIyNHB4IGFyaWFsXCI7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IHRydWU7IFxuICAgICAgICB0aGlzLnRpdGxlTG9nbyA9IFwiTWFwbGVURFwiOyBcbiAgICAgICAgdGhpcy5idXR0b24xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uMS50ZXh0Q29udGVudCA9ICdQbGF5JztcbiAgICAgICAgdGhpcy5idXR0b24yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uMi50ZXh0Q29udGVudCA9ICdMZXZlbCBTZWxlY3QnO1xuICAgICAgICB0aGlzLmJ1dHRvbjMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b24zLnRleHRDb250ZW50ID0gJzwnOyAgIFxuXG4gICAgICAgIHRoaXMuYnV0dG9uNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjQudGV4dENvbnRlbnQgPSAnPic7ICBcblxuICAgICAgICB0aGlzLnNlbGVjdGlvblkgPSAxO1xuXG4gICAgICAgIHRoaXMuYWJvdXRUZXh0ID0gW1wiVW5vZmZpY2lhbCBmYW4gZ2FtZSBkZXZlbG9wZWQgYnkgQ2hyaXN0b3BoZXIgTGVlIChzaXJoY2xlZUBnbWFpbC5jb20pXCIsXG4gICAgICAgICAgICAgICAgIFwiQWxsIE1hcGxlU3RvcnkgYXNzZXRzIHVzZWQgYXJlIGNvcHlyaWdodGVkIG1hdGVyaWFscyAmIGludGVsbGVjdHVhbCBwcm9wZXJ0eSBiZWxvbmdpbmcgdG8gTkVYT05cIl07XG4gICAgICAgIHRoaXMuYnV0dG9uV2lkdGggPSAxNzU7XG4gICAgICAgIHRoaXMuYnV0dG9uSGVpZ2h0ID0gMzU7IFxuICAgICAgICB0aGlzLmJ1dHRvblgxID0gdGhpcy5nYW1lV2lkdGgvMi0odGhpcy5idXR0b25XaWR0aC8yKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYnV0dG9uUG9zaXRpb25zID0gWyBbdGhpcy5idXR0b25YMSwgdGhpcy5wYWRkaW5nK3RoaXMuYnV0dG9uSGVpZ2h0ICsgMip0aGlzLmdhbWVIZWlnaHQvMy00NV0sIFxuICAgICAgICAgICAgW3RoaXMuYnV0dG9uWDEsIHRoaXMucGFkZGluZyt0aGlzLmJ1dHRvbkhlaWdodCArIDIqdGhpcy5nYW1lSGVpZ2h0LzMtMjVdXSBcbiAgICAgICAgdGhpcy5idXR0b25zTGlzdCA9IFt0aGlzLmJ1dHRvbjJdXG5cbiAgICAgICAgdGhpcy5sZXZlbEJ1dHRvbnMgPSBbIHRoaXMuYnV0dG9uMywgdGhpcy5idXR0b240XTsgXG4gICAgICAgIHRoaXMubGV2ZWxCdXR0b25XaWR0aCA9IDUwOyBcbiAgICAgICAgdGhpcy5sZXZlbEJ1dHRvbkhlaWdodCA9IDMwOyBcbiAgICAgICAgdGhpcy5sZXZlbEJ1dHRvbkNlbnRlciA9IDcwOyAgLy8gbWlkZGxlIG51bWJlciBcbiAgICAgICAgdGhpcy5sZXZlbEJ1dHRvblBvc2l0aW9ucyA9IFsgW3RoaXMuZ2FtZVdpZHRoLzItdGhpcy5sZXZlbEJ1dHRvbkNlbnRlci8yLXRoaXMubGV2ZWxCdXR0b25XaWR0aCwgdGhpcy5idXR0b25Qb3NpdGlvbnNbMV1bMV0rNDBdLCBcbiAgICAgICAgW3RoaXMuZ2FtZVdpZHRoLzIrdGhpcy5sZXZlbEJ1dHRvbkNlbnRlci8yLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1sxXVsxXSs0MF1dOyBcblxuICAgICAgICB0aGlzLmZhZGUgPSAxO1xuICAgICAgICB0aGlzLmZhZGVEaXJlY3QgPS0xO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5pdGlhbGl6ZShnYW1lKXtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lU2NyZWVuJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBlbGVtID0gdGhpcztcbiAgICAgICAgICAgIC8vY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7ZWxlbS5oYW5kbGVDbGljayhlLCBnYW1lKSB9LCBmYWxzZSk7ICAgICAgICAgICAgXG4gICAgICAgICAgICAvL2NhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBmdW5jdGlvbihlKXtlbGVtLmhhbmRsZUhvdmVyKGUpIH0sIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZHJhdyhjdHgpe1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8dGhpcy5idXR0b25zTGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgdGhpcy5kcmF3QnV0dG9uKHRoaXMuYnV0dG9uc0xpc3RbaV0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzBdLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVsxXSwgY3R4KVxuICAgICAgICAgICAgfSAvLyAgICAgICAgdGhpcy5sZXZlbEJ1dHRvbnMgPSBbIHRoaXMuYnV0dG9uMywgdGhpcy5idXR0b240XTsgXG4gICAgICAgICAgICAvL3RoaXMubGV2ZWxCdXR0b25Qb3NpdGlvbnMgPSBbIFsxMCwgdGhpcy5idXR0b25Qb3NpdGlvbnNbMV1bMV0rMTBdLCBbMTAsIHRoaXMuYnV0dG9uUG9zaXRpb25zWzFdWzFdKzIwXV07IFxuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTx0aGlzLmxldmVsQnV0dG9ucy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3QnV0dG9uKHRoaXMubGV2ZWxCdXR0b25zW2ldLCB0aGlzLmxldmVsQnV0dG9uUG9zaXRpb25zW2ldWzBdLCB0aGlzLmxldmVsQnV0dG9uUG9zaXRpb25zW2ldWzFdLCBjdHgpXG4gICAgICAgICAgICAgICB9ICAgICAgICAgIFxuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgaGFuZGxlQ2xpY2soZSwgZ2FtZSl7XG4gICAgICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZVNjcmVlbicpO1xuICAgICAgICAgICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpOyBcbiAgICAgICAgICAgIGNvbnN0IHggPSBlLmNsaWVudFggLSBjYW52YXMub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBlLmNsaWVudFkgLSBjYW52YXMub2Zmc2V0VG9wO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTx0aGlzLmJ1dHRvbnNMaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdCdXR0b24odGhpcy5idXR0b25zTGlzdFtpXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMF0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzFdLCBjdHgpXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlzcGxheSAmJiBjdHguaXNQb2ludEluUGF0aCh4LHkpKSB7IC8vYnV0dG9uIGNsaWNrIChvbmx5IHdoZW4gZGlzcGxheWVkKVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5idXR0b25zTGlzdFtpXS50ZXh0Q29udGVudCA9PSBcIlBsYXlcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lLmZhZGVPdXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntnYW1lLnRpdGxlRGlzcGxheSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhbWUucmVzZXRFdmVyeXRoaW5nKCk7IFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCl9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSAgICBcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8dGhpcy5sZXZlbEJ1dHRvbnMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0J1dHRvbih0aGlzLmxldmVsQnV0dG9uc1tpXSwgdGhpcy5sZXZlbEJ1dHRvblBvc2l0aW9uc1tpXVswXSwgdGhpcy5sZXZlbEJ1dHRvblBvc2l0aW9uc1tpXVsxXSwgY3R4KVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpc3BsYXkgJiYgY3R4LmlzUG9pbnRJblBhdGgoeCx5KSkgeyAvL2J1dHRvbiBjbGljayAob25seSB3aGVuIGRpc3BsYXllZClcbiAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxldmVsQnV0dG9uc1tpXS50ZXh0Q29udGVudCA9PSBcIjxcIil7IC8vIHJlbG9hZCBiZyBhcnQgYW5kIGxldmVsIGxvYWRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnYW1lLmxldmVsPjEpe2dhbWUubGV2ZWwtLX1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmxldmVsQnV0dG9uc1tpXS50ZXh0Q29udGVudCA9PSBcIj5cIil7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2FtZS5sZXZlbDxnYW1lLmZpbmFsTGV2ZWwpe2dhbWUubGV2ZWwrK31cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gICAgICAgICAgIFxuICAgICAgICAgICAgXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZHJhd0J1dHRvbihlMSwgeCwgeSwgY3R4KXsgICBcbiAgICAgICAgICAgIGxldCBidXR0b25XaWR0aCA9IHRoaXMuYnV0dG9uV2lkdGg7XG4gICAgICAgICAgICBsZXQgYnV0dG9uSGVpZ2h0ID0gdGhpcy5idXR0b25IZWlnaHQ7XG4gICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gJ21pZGRsZSc7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3N0ZWVsYmx1ZSc7XG4gICAgICAgICAgICBpZiAoZTEudGV4dENvbnRlbnQ9PSdQbGF5Jyl7XG4gICAgICAgICAgICAgICAgY3R4LmZvbnQgPSB0aGlzLmZvbnQyO31cbiAgICAgICAgICAgIGVsc2UgaWYgKGUxLnRleHRDb250ZW50PT0nTGV2ZWwgU2VsZWN0Jyl7XG4gICAgICAgICAgICAgICAgY3R4LmZvbnQgPSB0aGlzLmZvbnQzO1xuICAgICAgICAgICAgICAgIC8vYnV0dG9uSGVpZ2h0IC09MTE7XG4gICAgICAgICAgICAgICAgeSs9MTBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge2N0eC5mb250ID0gdGhpcy5mb250MztcbiAgICAgICAgICAgICAgICBidXR0b25XaWR0aCA9IHRoaXMubGV2ZWxCdXR0b25XaWR0aDtcbiAgICAgICAgICAgICAgICBidXR0b25IZWlnaHQgPSB0aGlzLmxldmVsQnV0dG9uSGVpZ2h0IDt9XG4gICAgICAgICAgICAgICAgLy9kcmF3IHRleHQgXG4gICAgICAgIFxuXG5cbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5yb3VuZFJlY3QoeCx5LCBidXR0b25XaWR0aCxidXR0b25IZWlnaHQsIDMpIDtcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGUxLnRleHRDb250ZW50LCB4K2J1dHRvbldpZHRoLzIsIHkrYnV0dG9uSGVpZ2h0LzIpOyBcbiAgICBcbiAgICAgICAgfVxuXG4gICAgIFxuICAgICAgICBkaXNwbGF5TWVudShjdHgsIGdhbWUpeyAvL3VwZ3JhZGUgd2luZG93IGJhY2tncm91bmRcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuYmdBcnQsIDAsMCk7IFxuICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGU9ICd3aGl0ZSc7XG4gICAgICAgICAgICAgICAgY3R4LnJvdW5kUmVjdCh0aGlzLmxldmVsQnV0dG9uUG9zaXRpb25zWzBdWzBdKyAxMCsgdGhpcy5sZXZlbEJ1dHRvbldpZHRoLHRoaXMubGV2ZWxCdXR0b25Qb3NpdGlvbnNbMF1bMV0sXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxCdXR0b25XaWR0aCwgdGhpcy5sZXZlbEJ1dHRvbkhlaWdodCwgMykgO1xuICAgICAgICAgICAgICAgIC8vIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlPSAnYmxhY2snO1xuICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGdhbWUubGV2ZWwsICB0aGlzLmxldmVsQnV0dG9uUG9zaXRpb25zWzBdWzBdK3RoaXMubGV2ZWxCdXR0b25DZW50ZXIrMTUsICB0aGlzLmxldmVsQnV0dG9uUG9zaXRpb25zWzBdWzFdKzE4KTsgXG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZHJhdyhjdHgpOyAvL2RyYXcgc3RhcnQgYnV0dG9uXG5cbiAgICAgICAgICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICAgICAgICAgIGN0eC5zaGFkb3dPZmZzZXRYPTE7XG4gICAgICAgICAgICAgICAgY3R4LnNoYWRvd09mZnNldFk9MTtcbiAgICAgICAgICAgICAgICBjdHguc2hhZG93Q29sb3I9XCJibGFja1wiO1xuICAgICAgICAgICAgICAgIGN0eC5zaGFkb3dCbHVyPSA0OyBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgICAgICAgICAgY3R4LmZvbnQgPSAgdGhpcy5mb250VGl0bGU7IFxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGU9ICd3aGl0ZSc7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRoaXMudGl0bGVMb2dvLCB0aGlzLmdhbWVXaWR0aC8yLCB0aGlzLmdhbWVIZWlnaHQvMyk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZVNjcmVlbicpO1xuXG4gICAgICAgICAgICAgICAgY3R4LmZvbnQgPSAgdGhpcy5mb250OyAvL2Fib3V0XG4gICAgICAgICAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gdGhpcy5mYWRlOyBcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoJ1VzZSBhcnJvdyBrZXlzIHRvIHNlbGVjdCBsZXZlbCcsIHRoaXMuZ2FtZVdpZHRoLzIsdGhpcy5nYW1lSGVpZ2h0LzIrNTUpOyBcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoJ1ByZXNzIGFueSBvdGhlciBrZXkgdG8gc3RhcnQnLCB0aGlzLmdhbWVXaWR0aC8yLHRoaXMuZ2FtZUhlaWdodC8yKzc1KTsgXG4gICAgICAgICAgICAgICAgdGhpcy5mYWRlLT0wLjAxNSp0aGlzLmZhZGVEaXJlY3QgO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZhZGU8MC41IHx8IHRoaXMuZmFkZT4xKXt0aGlzLmZhZGVEaXJlY3QgPSAtdGhpcy5mYWRlRGlyZWN0IH1cbiAgICAgICAgICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAxO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMuYWJvdXRUZXh0Lmxlbmd0aDsgaSsrKXsgXG4gICAgICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0aGlzLmFib3V0VGV4dFtpXSwgdGhpcy5nYW1lV2lkdGgvMix0aGlzLmdhbWVIZWlnaHQtMzUrMTUqaSk7IFxuICAgICAgICAgICAgICAgICAgICAvL2N0eC5zdHJva2VUZXh0KHRoaXMuYWJvdXRUZXh0W2ldLHRoaXMuZ2FtZVdpZHRoLzIsdGhpcy5nYW1lSGVpZ2h0LTM1KzE1KmkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XG5cbiAgICBcbiAgICAgICAgICAgICAgICAvL2N0eC5zdHJva2VTdHlsZSA9XCJibGFja1wiOyBcbiAgICAgICAgICAgICAgICAvLyBjdHgubGluZVdpZHRoPTU7XG4gICAgICAgICAgICAgICAgLy8gY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIC8vIGN0eC5yb3VuZFJlY3QodGhpcy5idXR0b25Qb3NpdGlvbnNbMF1bMF0sIHRoaXMuYnV0dG9uUG9zaXRpb25zWzBdWzFdLCB0aGlzLmJ1dHRvbldpZHRoLCB0aGlzLmJ1dHRvbkhlaWdodCwgMykgO1xuICAgICAgICAgICAgICAgIC8vIGN0eC5zdHJva2UoKTtcblxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBlbHNlIHtkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQnKS5pbm5lckhUTUw9XCJcIjt9XG4gICAgICAgICAgICBcbiAgICBcbiAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIFxuXG5cbiAgICBcbiAgICAgICAgXG59IiwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVcGdyYWRle1xuICAgIGNvbnN0cnVjdG9yKGdhbWUpe1xuICAgICAgICB0aGlzLmdhbWVXaWR0aCA9IGdhbWUuZ2FtZVdpZHRoO1xuICAgICAgICB0aGlzLmdhbWVIZWlnaHQgPSBnYW1lLmdhbWVIZWlnaHQ7XG4gICAgICAgIHRoaXMud2lkdGggPSAgNjUwO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDIzMDsgLy8gZ2FtZS5nYW1lSGVpZ2h0IC0gMyo5MDtcbiAgICAgICAgdGhpcy54ID0gKGdhbWUuZ2FtZVdpZHRoLXRoaXMud2lkdGgpLzI7IFxuICAgICAgICB0aGlzLnkgPSAzOy8vKHRoaXMuaGVpZ2h0KVxuICAgICAgICB0aGlzLmRpc3BsYXkgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMucGFkZGluZyA9IDE1OyBcbiAgICAgICAgdGhpcy5wYWRkaW5nWSA9IDQ7XG4gICAgICAgIHRoaXMuYnV0dG9uV2lkdGggPSAxNzA7XG4gICAgICAgIHRoaXMuYnV0dG9uSGVpZ2h0ID0gMzY7XG4gICAgICAgIHRoaXMuZm9udCA9IFwiMTNweCBhcmlhbFwiOyAgICAgICAgICAgICAgXG4gICAgICAgIHRoaXMuZm9udDIgPSBcIjE0cHggYXJpYWxcIjsgIFxuXG4gICAgICAgIHRoaXMuYnV0dG9uMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjEudGV4dENvbnRlbnQgPSAnU3VtbW9uIFJlZCBEcmFnb24nO1xuICAgICAgICB0aGlzLmJ1dHRvbjEudmFsdWUgPSAncmVkRHJhZ29uJztcbiAgICAgICAgdGhpcy5idXR0b24yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uMi50ZXh0Q29udGVudCA9ICdTdW1tb24gQmx1ZSBEcmFnb24nO1xuICAgICAgICB0aGlzLmJ1dHRvbjIudmFsdWUgPSAnYmx1ZURyYWdvbic7XG4gICAgICAgIHRoaXMuYnV0dG9uMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjMudGV4dENvbnRlbnQgPSAnU3VtbW9uIEdyZWVuIERyYWdvbic7XG4gICAgICAgIHRoaXMuYnV0dG9uMy52YWx1ZSA9ICdncmVlbkRyYWdvbic7XG4gICAgICAgIHRoaXMuYnV0dG9uNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjQudGV4dENvbnRlbnQgPSAnU3VtbW9uIEJsYWNrIERyYWdvbic7XG4gICAgICAgIHRoaXMuYnV0dG9uNC52YWx1ZSA9ICdibGFja0RyYWdvbic7XG4gICAgICAgIHRoaXMuYnV0dG9uMTAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b24xMC50ZXh0Q29udGVudCA9ICdXSVAnO1xuICAgICAgICB0aGlzLmJ1dHRvbjEwLnZhbHVlID0gJ211c2hyb29tS25pZ2h0JztcbiAgICAgICAgdGhpcy5idXR0b25YMSA9IHRoaXMueCArIHRoaXMucGFkZGluZzsgXG4gICAgICAgIHRoaXMubmFtZUhhc2ggPSB7J3JlZERyYWdvbic6J1JlZCBEcmFnb24nLCAnYmx1ZURyYWdvbic6J0JsdWUgRHJhZ29uJyxcbiAgICAgICAgJ2dyZWVuRHJhZ29uJzonR3JlZW4gRHJhZ29uJywgJ2JsYWNrRHJhZ29uJzonQmxhY2sgRHJhZ29uJywgJ211c2hyb29tS25pZ2h0JzogJ011c2hyb29tIEtuaWdodCd9O1xuICAgICAgICB0aGlzLnN1bW1vbkxpc3QgPSBbJ3JlZERyYWdvbicsICdibHVlRHJhZ29uJywnZ3JlZW5EcmFnb24nLCdibGFja0RyYWdvbiddO1xuICAgICAgICB0aGlzLmVsZW1lbnRMaXN0ID0gWydCbGF6ZScsJ0Rhd24nLCdOaWdodCcsJ1dpbmQnLCdUaHVuZGVyJ107XG5cbiAgICAgICAgdGhpcy5idXR0b241ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uNS50ZXh0Q29udGVudCA9ICdCbGF6ZSBTcHJpdGUnOyAvL0JsYXplIC0gRmxhbWUgXG4gICAgICAgIHRoaXMuYnV0dG9uNS52YWx1ZSA9IFwiQmxhemVcIjtcbiAgICAgICAgdGhpcy5idXR0b242ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uNi50ZXh0Q29udGVudCA9ICdEYXduIFNwcml0ZSAnOyAvL0Rhd24gLSBMaWdodCBcbiAgICAgICAgdGhpcy5idXR0b242LnZhbHVlID0gXCJEYXduXCI7XG4gICAgICAgIHRoaXMuYnV0dG9uNyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpOyBcbiAgICAgICAgdGhpcy5idXR0b243LnRleHRDb250ZW50ID0gJ05pZ2h0IFNwcml0ZSc7IC8vTmlnaHQgLSBEYXJrXG4gICAgICAgIHRoaXMuYnV0dG9uNy52YWx1ZSA9IFwiTmlnaHRcIjtcbiAgICAgICAgdGhpcy5idXR0b244ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uOC50ZXh0Q29udGVudCA9ICdXaW5kIFNwcml0ZSAnOyAgLy9XaW5kIC0gU3Rvcm1cbiAgICAgICAgdGhpcy5idXR0b244LnZhbHVlID0gXCJXaW5kXCI7XG4gICAgICAgIHRoaXMuYnV0dG9uOSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpOyBcbiAgICAgICAgdGhpcy5idXR0b245LnRleHRDb250ZW50ID0gJ1RodW5kZXIgU3ByaXRlJzsgLy9UaHVuZGVyIC0gTGlnaHRuaW5nICAgICAgIFxuICAgICAgICB0aGlzLmJ1dHRvbjkudmFsdWUgPSBcIlRodW5kZXJcIjsgXG4gICAgICAgIHRoaXMuYnV0dG9uWDIgPSAgdGhpcy5idXR0b25YMSArIHRoaXMuYnV0dG9uV2lkdGgrIHRoaXMucGFkZGluZyA7IFxuICAgICAgICB0aGlzLmJ1dHRvblBvc2l0aW9ucyA9IFsgW3RoaXMuYnV0dG9uWDEsIDBdLCBbdGhpcy5idXR0b25YMSwxXSwgW3RoaXMuYnV0dG9uWDEsMl0sIFt0aGlzLmJ1dHRvblgxLDNdLCAgW3RoaXMuYnV0dG9uWDEsNF0sIFxuICAgICAgICAgICAgICAgICBbdGhpcy5idXR0b25YMiwwXSwgW3RoaXMuYnV0dG9uWDIsMV0sIFt0aGlzLmJ1dHRvblgyLDJdLCBbdGhpcy5idXR0b25YMiwzXSwgW3RoaXMuYnV0dG9uWDIsNF0gIF07IFxuICAgICAgICB0aGlzLmJ1dHRvbnNMaXN0ID0gW3RoaXMuYnV0dG9uMSwgdGhpcy5idXR0b24yLCB0aGlzLmJ1dHRvbjMsIHRoaXMuYnV0dG9uNCwgdGhpcy5idXR0b24xMCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b241LCB0aGlzLmJ1dHRvbjYsIHRoaXMuYnV0dG9uNywgdGhpcy5idXR0b244LCB0aGlzLmJ1dHRvbjldOyBcbiAgICAgICB0aGlzLm5vdGUgPSBcIlByZXNzIFtTXSB0byBidXksIFtBXSB0byBjbG9zZSBtZW51XCI7IFxuICAgICAgIFxuXG4gICAgICAgIHRoaXMuY29zdFBvc2l0aW9uID0gdGhpcy5idXR0b25YMiArIHRoaXMuYnV0dG9uV2lkdGgrIDIuNSp0aGlzLnBhZGRpbmc7IFxuICAgICAgICB0aGlzLmNvc3RIZWlnaHQgPSAyMDsgXG4gICAgICAgIHRoaXMuY29zdFdpZHRoID0gMjc1OyBcbiAgICAgICAgdGhpcy5jb3N0UGFkZGluZyA9IDQ7IFxuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uWCA9IDE7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uWSA9IDE7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb25UZXh0ID0gW107XG4gICAgICAgIHRoaXMucHVyY2hhc2VEZXNjcmlwdGlvbiA9IHJlcXVpcmUoJy4vcHVyY2hhc2UuanNvbicpOyBcblxuICAgICAgICBcbiAgICB9XG5cbiAgICBpbml0aWFsaXplKGdhbWUpe1xuICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZVNjcmVlbicpO1xuICAgICAgICBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7IFxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMucmVkcmF3KGN0eCksIHRydWUpOyBcbiAgICAgICAgdmFyIGVsZW0gPSB0aGlzO1xuICAgICAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtlbGVtLmhhbmRsZUNsaWNrKGUsIGdhbWUpIH0sIGZhbHNlKTtcbiAgICB9XG5cbiAgICByZWRyYXcoY3R4LCBnYW1lICl7XG4gICAgICAgIGxldCBidXR0b25EcmF3ID0gdGhpcy5idXR0b25zTGlzdC5sZW5ndGg7IFxuICAgICAgIGZvciAobGV0IGkgPSAwOyBpPGJ1dHRvbkRyYXcgOyBpKyspe1xuICAgICAgICB0aGlzLmRyYXdCdXR0b24odGhpcy5idXR0b25zTGlzdFtpXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMF0sIDIqdGhpcy5wYWRkaW5nWSsodGhpcy5idXR0b25IZWlnaHQrdGhpcy5wYWRkaW5nWSkqdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMV0sIGN0eCwgZ2FtZSlcbiAgICAgICB9XG4gICAgfVxuXG4gICAgdXBncmFkZUZ1bmN0aW9ucyhnYW1lLCBidXR0b24pe1xuICAgICAgICAvL3Jlc3VtbW9uO1xuICAgICAgICBpZiAoZ2FtZS5zdG9yYWdlLmZpbmQob2JqPT4gKG9iai50eXBlID09PSBidXR0b24udmFsdWUpKSl7XG4gICAgICAgICAgICBnYW1lLnJlc3VtbW9uKGJ1dHRvbi52YWx1ZSk7XG4gICAgICAgICAgICBsZXQgdW5pdCA9IGdhbWUucGxheWVyT2JqZWN0cy5maW5kKG9iaj0+IChvYmoudHlwZSA9PT0gYnV0dG9uLnZhbHVlKSk7XG4gICAgICAgICAgICBidXR0b24udGV4dENvbnRlbnQgPSAgJ1VwZ3JhZGUgJyt0aGlzLm5hbWVIYXNoW2J1dHRvbi52YWx1ZV0rICcgKEx2bCAnK3VuaXQubGV2ZWwrJyknO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGdhbWUucGxheWVyT2JqZWN0cy5maW5kKG9iaj0+IChvYmoudHlwZSA9PT0gYnV0dG9uLnZhbHVlKSkpeyAvL3VwZ3JhZGUgc3VtbW9ucyBcbiAgICAgICAgICAgIGxldCB1bml0ID0gZ2FtZS5wbGF5ZXJPYmplY3RzLmZpbmQob2JqPT4gKG9iai50eXBlID09PSBidXR0b24udmFsdWUpKTtcbiAgICAgICAgICAgIHVuaXQubGV2ZWxVcChnYW1lLnBsYXllcik7IC8vYWRkIGNvc3QgXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh1bml0LmxldmVsKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHVuaXQubGV2ZWw8NSl7XG4gICAgICAgICAgICBidXR0b24udGV4dENvbnRlbnQgPSAgJ1VwZ3JhZGUgJyt0aGlzLm5hbWVIYXNoW2J1dHRvbi52YWx1ZV0rICcgKEx2bCAnK3VuaXQubGV2ZWwrJyknO31cbiAgICAgICAgICAgIGVsc2Uge2J1dHRvbi50ZXh0Q29udGVudCA9ICB0aGlzLm5hbWVIYXNoW2J1dHRvbi52YWx1ZV0rICcgKEx2bCAnK3VuaXQubGV2ZWwrJyknIH1cbiAgICAgICAgfSBcblxuICAgICAgICBlbHNlIGlmICh0aGlzLnN1bW1vbkxpc3QuaW5jbHVkZXMoYnV0dG9uLnZhbHVlKSl7XG4gICAgICAgICAgICBpZiAoYnV0dG9uLnZhbHVlICE9J211c2hyb29tS25pZ2h0Jyl7XG4gICAgICAgICAgICAgICAgZ2FtZS5jcmVhdGVNb2IoZ2FtZS5wbGF5ZXIsIGJ1dHRvbi52YWx1ZSwgMCwgZ2FtZSk7IC8vc3VtbW9ucyA7XG4gICAgICAgICAgICAgICAgaWYgKGdhbWUucGxheWVyT2JqZWN0cy5maW5kKG9iaj0+IChvYmoudHlwZSA9PT0gYnV0dG9uLnZhbHVlKSkpeyAvL2NoZWNrcyBpZiBjcmVhdGVkIHN1Y2Nlc3NmdWxseSBcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gJ1VwZ3JhZGUgJyt0aGlzLm5hbWVIYXNoW2J1dHRvbi52YWx1ZV0rICcgKEx2bCAxKSc7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5lbGVtZW50TGlzdC5pbmNsdWRlcyhidXR0b24udmFsdWUpKXtcbiAgICAgICAgICAgICAgICBnYW1lLmFkZEVsZW1lbnQoYnV0dG9uLnZhbHVlKTsgLy9lbGVtZW50c1xuICAgICAgICAgICAgfSAgIFxuICAgICAgICAvLyBlbHNlIGlmIChidXR0b24udGV4dENvbnRlbnQ9PSdOZXh0IFdhdmUhJykgZ2FtZS5uZXh0V2F2ZSA9IHRydWU7IC8vbmV4dCB3YXZlIGJ1dHRvblxuXG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soZSwgZ2FtZSl7XG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lU2NyZWVuJyk7XG4gICAgICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTsgXG4gICAgICAgIGNvbnN0IHggPSBlLmNsaWVudFggLSBjYW52YXMub2Zmc2V0TGVmdDtcbiAgICAgICAgY29uc3QgeSA9IGUuY2xpZW50WSAtIGNhbnZhcy5vZmZzZXRUb3A7XG4gICAgXG4gICAgICAgIGxldCBidXR0b25EcmF3ID0gdGhpcy5idXR0b25zTGlzdC5sZW5ndGg7IFxuICAgICAgICBpZiAoIWdhbWUud2F2ZUZpbmlzaCl7YnV0dG9uRHJhdy09MX07IFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaTxidXR0b25EcmF3IDsgaSsrKXtcbiAgICAgICAgICAgIC8vIHRoaXMuZHJhd0J1dHRvbih0aGlzLmJ1dHRvbnNMaXN0W2ldLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVswXSwgdGhpcy5wYWRkaW5nWSsodGhpcy5idXR0b25IZWlnaHQrdGhpcy5wYWRkaW5nWSkqdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMV0sIGN0eCwgZ2FtZSlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHRoaXMuZGlzcGxheSAmJiBjdHguaXNQb2ludEluUGF0aCh4LHkpKSB7IC8vYnV0dG9uIGNsaWNrIChvbmx5IHdoZW4gZGlzcGxheWVkKVxuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uc0xpc3RbaV0uZm9jdXMoKTsgXG4gICAgICAgICAgICAgICAgdGhpcy51cGdyYWRlRnVuY3Rpb25zKGdhbWUsIHRoaXMuYnV0dG9uc0xpc3RbaV0pOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIFxuICAgIH1cblxuXG4gICAgZHJhd0J1dHRvbihlMSwgeCwgeSwgY3R4LCBnYW1lKXsgICBcbiAgICAgICAgbGV0IGJ1dHRvbkNvbG9yID0nc3RlZWxibHVlJztcbiAgICAgICAgbGV0IHRleHRDb2xvciA9J3doaXRlJztcbiAgICAgICAgbGV0IGNvc3QgPSAwOyBcbiAgICAgICAgaWYgKGdhbWUpe1xuICAgICAgICAgICAgaWYgKHRoaXMuYnV0dG9uWDE9PXgpIHsgLy9zdW1tb24gYnV0dG9ucyAvL2NoZWNrIGNvc3QgKGlmIGZpcnN0IG9yIHVwZ3JhZGUpXG4gICAgICAgICAgICAgICAgaWYgKGdhbWUucGxheWVyT2JqZWN0cy5maW5kKG9iaj0+IChvYmoudHlwZSA9PT0gZTEudmFsdWUpKSl7XG4gICAgICAgICAgICAgICAgICAgIGxldCB1bml0ID0gZ2FtZS5wbGF5ZXJPYmplY3RzLmZpbmQob2JqPT4gKG9iai50eXBlID09PSBlMS52YWx1ZSkpO1xuICAgICAgICAgICAgICAgICAgICBjb3N0ID0gZ2FtZS5wbGF5ZXIudXBncmFkZUNvc3RbdW5pdC5sZXZlbF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgKCBjb3N0ID0gZ2FtZS5wbGF5ZXIuc3VtbW9uQ29zdFtnYW1lLnBsYXllci5zdW1tb25Db3VudF0pO1xuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGdhbWUucGxheWVyLm1vbmV5PCBjb3N0KXtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbkNvbG9yID0gJ2xpZ2h0Z3JleSc7XG4gICAgICAgICAgICAgICAgICAgIHRleHRDb2xvciA9ICdkYXJrZ3JleSc7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuYnV0dG9uWDI9PXgpeyAvL2VsZW1lbnRzXG4gICAgICAgICAgICAgICAgY29zdCA9IGdhbWUucGxheWVyLmVsZW1lbnRDb3N0W2dhbWUucGxheWVyLmVsZW1lbnRMaXN0Lmxlbmd0aF07XG4gICAgICAgICAgICAgICAgaWYgKGdhbWUucGxheWVyLm1vbmV5PGdhbWUucGxheWVyLmVsZW1lbnRDb3N0W2dhbWUucGxheWVyLmVsZW1lbnRMaXN0Lmxlbmd0aF0gfHwgXG4gICAgICAgICAgICAgICAgICAgIGdhbWUucGxheWVyLmVsZW1lbnRMaXN0Lmxlbmd0aCA+PTUpe1xuICAgICAgICAgICAgICAgICAgICBidXR0b25Db2xvciA9ICdsaWdodGdyZXknO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0Q29sb3IgPSAnZGFya2dyZXknOyBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGJ1dHRvbkNvbG9yOyAgLy9idXR0b24gYmFja2dyb3VuZFxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICd3aGl0ZSc7XG4gICAgICAgIGN0eC5yb3VuZFJlY3QoeCx5LHRoaXMuYnV0dG9uV2lkdGgsIHRoaXMuYnV0dG9uSGVpZ2h0LCAzKTsgXG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICBcbiAgICAgICAgY3R4LmZvbnQgPSAgdGhpcy5mb250OyBcbiAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInOyAvL2J1dHRvbiB0ZXh0IFxuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGV4dENvbG9yO1xuICAgICAgICBpZiAoZ2FtZSl7XG4gICAgICAgICAgICAgaWYgKGdhbWUuc3RvcmFnZS5sZW5ndGg+MCl7XG5cbiAgICAgICAgICAgICAgICBsZXQgdGVzdCA9IGdhbWUuc3RvcmFnZS5maW5kKG9iaj0+IG9iai50eXBlPT1lMS52YWx1ZSk7IFxuICAgICAgICAgICAgICAgIGlmICh0ZXN0KXsgXG4gICAgICAgICAgICAgICAgICAgIGUxLnRleHRDb250ZW50ID0gJ1Jlc3VtbW9uIEx2bCAnK3Rlc3QubGV2ZWwrJyAnK3RoaXMubmFtZUhhc2hbZTEudmFsdWVdOyBcbiAgICAgICAgICAgICAgICAgICAgY29zdCA9IDA7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICBjdHguZmlsbFRleHQoZTEudGV4dENvbnRlbnQsIHgrdGhpcy5idXR0b25XaWR0aC8yLCB5K3RoaXMuYnV0dG9uSGVpZ2h0LzMpOyBcbiAgICAgICAgaWYgKGNvc3QgJiYgZTEudmFsdWUhPSdtdXNocm9vbUtuaWdodCcpe1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCcoJytjb3N0KycgbWVzb3MpJywgeCt0aGlzLmJ1dHRvbldpZHRoLzIsIHkrMip0aGlzLmJ1dHRvbkhlaWdodC8zKTt9XG4gICAgICAgIC8vZWxzZSB7IGN0eC5maWxsVGV4dCgnTUFYJywgeCt0aGlzLmJ1dHRvbldpZHRoLzIsIHkrMip0aGlzLmJ1dHRvbkhlaWdodC8zKTt9XG5cbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpOyAvL2NvbGxpc2lvbiBwYXRoIFxuICAgICAgICBjdHgucmVjdCh4LHksIHRoaXMuYnV0dG9uV2lkdGgsIHRoaXMuYnV0dG9uSGVpZ2h0KTsgXG4gICAgICAgIFxuICAgIH1cblxuICAgIHRvZ2dsZU1lbnUoZ2FtZSl7IFxuICAgICAgICB0aGlzLmRpc3BsYXkgPSAhdGhpcy5kaXNwbGF5OyBcbiAgICAgICAgaWYgKHRoaXMuZGlzcGxheSl7Z2FtZS5wYXVzZSA9IHRydWV9XG4gICAgICAgIGVsc2UgZ2FtZS5wYXVzZSA9IGZhbHNlXG4gICAgfVxuXG4gICAgcHVyY2hhc2UoZ2FtZSl7XG4gICAgICAgIGxldCBpID0gKHRoaXMuc2VsZWN0aW9uWC0xKSo1ICsgKHRoaXMuc2VsZWN0aW9uWS0xKTtcbiAgICAgICAgdGhpcy51cGdyYWRlRnVuY3Rpb25zKGdhbWUsIHRoaXMuYnV0dG9uc0xpc3RbaV0pOyBcbiAgICB9XG5cbiAgICBzZWxlY3RlZERlc2NyaXAoKXtcbiAgICAgICAgbGV0IGkgPSAodGhpcy5zZWxlY3Rpb25YLTEpKjUgKyAodGhpcy5zZWxlY3Rpb25ZLTEpO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uVGV4dCA9IHRoaXMucHVyY2hhc2VEZXNjcmlwdGlvblt0aGlzLmJ1dHRvbnNMaXN0W2ldLnZhbHVlXTsgXG4gICAgfVxuXG4gICAgZGlzcGxheU1lbnUoY3R4LCBnYW1lKXsgLy91cGdyYWRlIHdpbmRvdyBiYWNrZ3JvdW5kXG4gICAgICAgIGlmICh0aGlzLmRpc3BsYXkpe1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5yb3VuZFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAzKTsgLy93aGl0ZSB3aW5kb3dcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICB0aGlzLnJlZHJhdyhjdHgsIGdhbWUpOyAvL2RyYXcgYnV0dG9uXG5cbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiMyODI4MjhcIjtcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5yb3VuZFJlY3QodGhpcy5jb3N0UG9zaXRpb24tMip0aGlzLnBhZGRpbmcsIDIqdGhpcy5wYWRkaW5nWSwgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29zdFdpZHRoLCB0aGlzLmNvc3RIZWlnaHQqMTEsIDMpO1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG4gICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7IFxuICAgICAgICAgICAgY3R4LmZvbnQgPSAgdGhpcy5mb250MjsgXG5cbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTsgLy9zZWxlY3Rpb24gXG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgICAgICBjdHgubGluZVdpZHRoID0gXCI1XCI7IFxuICAgICAgICAgICAgY3R4LnJvdW5kUmVjdCh0aGlzLmJ1dHRvblgxICsgKHRoaXMuc2VsZWN0aW9uWC0xKSoodGhpcy5idXR0b25XaWR0aCsgdGhpcy5wYWRkaW5nKSwgXG4gICAgICAgICAgICAgICAgMip0aGlzLnBhZGRpbmdZKyh0aGlzLmJ1dHRvbkhlaWdodCt0aGlzLnBhZGRpbmdZKSoodGhpcy5zZWxlY3Rpb25ZLTEpLCBcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbldpZHRoLHRoaXMuYnV0dG9uSGVpZ2h0LCAzKTtcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERlc2NyaXAoKTsgLy9zaG93cyBzZWxlY3RlZCBzdW1tb24gZGV0YWlsIFxuICAgICAgICAgICAgY3R4LmZvbnQgPSAgdGhpcy5mb250MjsgXG4gICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2xlZnQnO1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMuZGVzY3JpcHRpb25UZXh0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQodGhpcy5kZXNjcmlwdGlvblRleHRbaV0sIHRoaXMuY29zdFBvc2l0aW9uLTI1LFxuICAgICAgICAgICAgICAgIDYqdGhpcy5wYWRkaW5nWSsodGhpcy5jb3N0UGFkZGluZyt0aGlzLmNvc3RIZWlnaHQpKmkpOyBcbiAgICAgICAgICAgIH0gXG5cbiAgICAgICAgICAgIC8vc3RhdHMgICAgICAgICAgdGhpcy5kYW1hZ2VNdWx0aSA9IDE7IFxuICAgICAgICAvLyB0aGlzLnBpY2t1cE11dGxpID0gMTtcbiAgICAgICAgLy8gdGhpcy5rbm9ja2JhY2tNdWx0aSA9IDE7XG4gICAgICAgIC8vIHRoaXMuc3BlZWRNdWx0aSA9IDE7IFxuICAgICAgICAvLyB0aGlzLnBpZXJjZSA9IDA7IFxuXG4gICAgICAgICAgICBjdHguZm9udCA9ICB0aGlzLmZvbnQyOyBcbiAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnbGVmdCc7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQoJ0RhbWFnZTogeCcrZ2FtZS5wbGF5ZXIuZGFtYWdlTXVsdGkudG9GaXhlZCgxKSwgdGhpcy5jb3N0UG9zaXRpb24tMjUsIDYqdGhpcy5wYWRkaW5nWSsodGhpcy5jb3N0UGFkZGluZyt0aGlzLmNvc3RIZWlnaHQpKjcpOyAgICAgICBcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCgnU3BlZWQ6IHgnK2dhbWUucGxheWVyLnNwZWVkTXVsdGkudG9GaXhlZCgxKSwgdGhpcy5jb3N0UG9zaXRpb24tMjUsIDYqdGhpcy5wYWRkaW5nWSsodGhpcy5jb3N0UGFkZGluZyt0aGlzLmNvc3RIZWlnaHQpKjcuNik7IFxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCdLbm9ja2JhY2s6IHgnK2dhbWUucGxheWVyLmtub2NrYmFja011bHRpLnRvRml4ZWQoMSksIHRoaXMuY29zdFBvc2l0aW9uLTI1LCA2KnRoaXMucGFkZGluZ1krKHRoaXMuY29zdFBhZGRpbmcrdGhpcy5jb3N0SGVpZ2h0KSo4LjIpOyBcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCgnUGllcmNlOiAnK2dhbWUucGxheWVyLnBpZXJjZSwgdGhpcy5jb3N0UG9zaXRpb24rMTAwLCA2KnRoaXMucGFkZGluZ1krKHRoaXMuY29zdFBhZGRpbmcrdGhpcy5jb3N0SGVpZ2h0KSo3KTsgXG4gICAgICAgICAgICBjdHguZmlsbFRleHQoJ0xvb3QgUmFkaXVzOiB4JytnYW1lLnBsYXllci5sb290TXVsdGkudG9GaXhlZCgxKSwgdGhpcy5jb3N0UG9zaXRpb24rMTAwLCA2KnRoaXMucGFkZGluZ1krKHRoaXMuY29zdFBhZGRpbmcrdGhpcy5jb3N0SGVpZ2h0KSo3LjYpOyBcblxuXG4gICAgICAgICAgICAgICAgXG5cblxuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdsZWZ0JztcbiAgICAgICAgICAgIGN0eC5mb250ID0gIHRoaXMuZm9udDI7IFxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZT0gJ2JsYWNrJztcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0aGlzLm5vdGUsIHRoaXMuYnV0dG9uWDErMTAsIHRoaXMuaGVpZ2h0LTEwKTtcblxuICAgICAgICAgICAgaWYgKGdhbWUuZXJyb3Ipe1xuICAgICAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnbGVmdCc7XG4gICAgICAgICAgICAgICAgY3R4LmZvbnQgPSAgdGhpcy5mb250MjsgXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZT0gJ3JlZCc7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCdTcGFjZSBvY2N1cGllZCEnLCB0aGlzLndpZHRoLTIyMCwgdGhpcy5oZWlnaHQtMTApOyBcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge2dhbWUuZXJyb3I9ZmFsc2U7fSwgXCIzMDAwXCIpIDtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbnUnKS5pbm5lckhUTUw9XCJcIjt9XG4gICAgICAgIFxuXG5cbiAgICAgICAgICAgIFxuICAgIH1cblxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9nYW1lJztcblxuXG5sZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lU2NyZWVuXCIpOyAvLyBnZXRzIGNhbnZhcyBlbGVtZW50XG5sZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7IC8vY3JlYXRlcyAyRCByZW5kZXJpbmcgb2JqZWN0XG5cbmNvbnN0IGdhbWVXaWR0aCA9IDEwMDA7XG5jb25zdCBnYW1lSGVpZ2h0ID0gNTAwO1xuXG5sZXQgZ2FtZSA9IG5ldyBHYW1lKGdhbWVXaWR0aCwgZ2FtZUhlaWdodCk7IFxuZ2FtZS5zdGFydCgpOyAvL2NyZWF0ZXMgZ2FtZSBvYmplY3RzO1xuXG5mdW5jdGlvbiBnYW1lTG9vcCh0aW1lc3RhbXApe1xuICAgIFxuICAgIHNldFRpbWVvdXQoKCk9PiB7XG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwwLCBnYW1lV2lkdGgsIGdhbWVIZWlnaHQpOyAvL3JlZnJlc2ggc2NyZWVuXG4gICAgICAgIC8vY29uc29sZS5sb2codGltZXN0YW1wKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChnYW1lLnRpdGxlRGlzcGxheSl7XG4gICAgICAgICAgICBnYW1lLnRpdGxlTWVudShjdHgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBpZiAoIWdhbWUucGF1c2UgKXsgZ2FtZS51cGRhdGUodGltZXN0YW1wKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdhbWUubmV4dFdhdmVMb2FkZXIoKTsgLy9sb2FkcyB3YXZlIGxpc3RcbiAgICAgICAgICAgIGdhbWUud2F2ZUxvYWRlcigpOyAvLyBsb2FkcyBlYWNoIG1vYiBmcm9tIHdhdmUgbGlzdFxuICAgICAgICAgICAgLy9nYW1lLnBhdXNlSGFuZGxlcigpIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBnYW1lLmRyYXcoY3R4KTsgXG4gICAgICAgICAgICBnYW1lLndhdmVDbGVhcihjdHgpO1xuICAgICAgICAgICAgZ2FtZS5wYXVzZUhhbmRsZXIodGltZXN0YW1wLCBjdHgpOyBcbiAgICAgICAgICAgIGdhbWUudXBncmFkZU1lbnUoY3R4KTtcbiAgICAgICAgICAgIGdhbWUubmV4dExldmVsTG9hZGVyKGN0eCk7IC8vaWYgd2F2ZSBsaXN0IGVtcHR5LCBtb3ZlIHRvIG5leHQgbGV2ZWxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZ2FtZS5yZWNhbGxDaGVjaygpO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICBnYW1lLnNjcmVlblRyYW5zaXRpb24oY3R4KTtcblxuICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTt9LCAxMCAgKTsgIC8vZml4IGZyYW10ZXMgXG4gICAvLzUgdG9vIGZhc3RcbiAgIC8vIDEwIGEgbGl0dGxlIHRvbyBzbG93XG4gICAvLzYwIHRvbyBzbG93XG5cbn1cblxucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTsgXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=