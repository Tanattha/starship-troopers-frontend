class Play extends Scene {
    constructor(el,game){
        super(el,game);
        this.created();
    }
    created(){
        this.raf_id = 'play_update';
        this.initCanvas();
    }
    setup() {
        this.muteFlag = false;
        this.initData();
        this.initPlayer();
        this.updateScore();
        $("#logo").classList.add('play-status');
        this.event();
        this.start();
    }

    start() {
        this.pauseFlag = false;
        raf.reg(this.raf_id, this.update.bind(this));
        res.play('bg');
        $('#game-pause-btn').classList.add('active');
    }
    pause() {
        this.pauseFlag = true;
        raf.remove(this.raf_id);
        res.pause('bg');
        $('#game-pause-btn').classList.remove('active');
    }

    uninstall() {
        raf.remove(this.raf_id);
        res.end('bg');
        $("#logo").classList.remove('play-status');
        hotkey.clearAll();
    }

    initData() {

        this.pauseFlag = false;
        this.timeCooldown = new Cooldown(fps, true);
        this.playerBullets = [];
        this.alienBullets = [];
        this.allAliens = [];

        this.aliens = {
            arr: this.allAliens,
            elem: Alien,
            cooldown: new Cooldown(config.game.appendAlienCooldown),
        };
        this.ufos = {
            arr: this.allAliens,
            elem: Ufo,
            cooldown: new Cooldown(config.game.appendAlienCooldown),
        };
        this.stars = {
            arr: [],
            elem: Star,
            cooldown: new Cooldown(config.game.appendStarCooldown),
        };
    }

    
    collision(a, b, callback) {
        if (!a.run || !b.run) {
            return;
        }
        var yCoolision = (a, b) => {
            return a.y > b.y && a.y < b.y + b.h;
        };
        var xCoolision = (a, b) => {
            return a.x > b.x && a.x < b.x + b.w;
        };
        if (yCoolision(a, b) || yCoolision(b, a)) {
            if (xCoolision(a, b) || xCoolision(b, a)) {
                callback(a, b);
            }
        }
    }

    bulletCollision(bullet, arr, callback) {
        arr.forEach(el => {
            this.collision(bullet, el, (a, b) => {
                a.reduceLife();
                b.reduceLife();
                if (!b.run) {
                    callback(b);
                }
              
              
            });
        });
    }

    playerCollision(el) {
        this.collision(this.player, el, () => {
            //callback(el);
            el.death();
            this.game.over();
        });
    }

    factory(elem) {
        const o = new elem(this);
        o.setup();
        return o;
    }

    append(obj) {
        obj.cooldown.update().active(() => {
            obj.arr.push(
                this.factory(obj.elem)
            )
        });
    }

    appendElement() {
        this.append(this.aliens);
        this.append(this.ufos);
        this.append(this.stars);
    }

    updateing(arr, callback) {
        const len = arr.length;
        for (let i = len - 1; i >= 0; i--) {
            const el = arr[i];
            if (el.isDeath) {
                arr.splice(i, 1);
                continue;
            }
            el.update();
            callback && callback(el);
        }
    }
    
    updateBullets() {
        const {
            shootAlien,
            shootUfo,
        } = config.scoreConfig;
       
       this.updateing(this.playerBullets, bullet => {
            this.bulletCollision(bullet, this.alienBullets, (el) => {
                el.death();
            });
            
            this.bulletCollision(bullet, this.aliens.arr, (el) => {
                this.updateScore(
                    el instanceof Ufo ?
                    shootUfo : shootAlien
                );
                this.updateshoot();
                this.shoot();
            });
        });
      
    }

    updateAliens() {
        const {
            shootAlien,
            shootUfo,
        } = config.scoreConfig;
      
        this.updateing(this.aliens.arr, alien => {
            this.playerCollision(alien, () => {
                this.updateScore(
                    alien instanceof Ufo ?
                    shootUfo : shootAlien
                );
                this.updateshoot();
                this.shoot();
            })
        });
    }

    updateStars() {
        this.updateing(this.stars.arr);
    }

    updateElements() {
        this.updateStars();
        this.player.update();
        this.updateAliens();
        this.updateBullets();
    }

    update() {
        this.ctx.clearRect(0, 0, config.game.w, config.game.h);
        this.appendElement();
        this.updateElements();
    }
/*
    updateTime() {
        const game = this.game;
        $('#time').innerHTML = numberFormat(game.data.time);
    }
    */
    updateScore(num = 0) {
        const game = this.game;
        const call = () => {
            $('#score').innerHTML = numberFormat(game.data.score);
        }
        if (num === 0) {
            return call();
        }
        const start = game.data.score;
        const end = start + num;
        incrementAnimation(start, end, current => {
            game.data.score = current;
            call();
        })
    }

    updateshoot() {
        const game = this.game;
        game.data.shoot++;
        $('#shoot').innerHTML = numberFormat(game.data.shoot);
    }

    initCanvas() {
        this.canvas = $('#canvas');
        this.canvas.width = config.game.w;
        this.canvas.height = config.game.h;

        this.ctx = this.canvas.getContext('2d');
    }

    initPlayer() {
        this.player = this.factory(Player);
    }

    draw(data) {
        this.ctx.drawImage.apply(this.ctx, data);
    }

    rotateDraw(conf) {
        this.ctx.save();
        this.ctx.translate(conf.x, conf.y);
        this.ctx.rotate(conf.deg * Math.PI / 180);
        this.draw(conf.data);
        this.ctx.restore();
    }

    setFontStyle(font = "20px Arial", yellow = "yellow") {
        this.ctx.font = font;
        this.ctx.fillStyle = yellow;
    }

    drawText(data) {
        this.ctx.fillText(data.text, data.x, data.y);
    }

    event() {
        const togglePause = ()=>{
            this.pauseFlag ? this.start() : this.pause();
        }
      
        hotkey.reg('p', () => {
            togglePause();
        }, true);
        
      
        on(
            $('#game-pause-btn'),
            'click',
            ()=>{
                togglePause()
            }
        )
    }

    shoot() {
        res.replay('destroyed');
    }
}