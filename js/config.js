const config = {};
const fps = 60;

<<<<<<< HEAD
=======
//const BASE_URL = 'http://127.0.0.1:3000';
const BASE_URL = 'https://starship-troopers.herokuapp.com';

>>>>>>> bd382cc775d431ce1012b53aa21cb45f8ceb0a65

(() => {

    const starship = (callback=false) => {
        const obj = {
            w: 100,
            h: 70,
            x: 0,
            y: 0,
            img : 'player',
            speed: 4,
        }
        if (!callback) {
            return obj;
        }
        const data = callback(obj);
        for (let key of Object.keys(data)){
            obj[key] = data[key]
        }
        return obj;
    }

    const bullet = (() => {
        return {
            w: 40,
            h: 20,
            speed : 5,
        };
    })

    const batchAdd = (url, name, count,ext) => {
        let images = {};
        for (let i = 1; i <= count; i++){
            images[name + i] = url + name + i +'.'+ ext;
        }
        return images;
    }

    const batchImport = (name, count) => {
        let images = [];
        for (let i = 1; i <= count; i++){
            images.push(name + i);
        }
        return images;
    };

    config.game = {
        w: 1280,
        h: 750,
        
        appendAlienCooldown: [1 * fps, 1 * fps],
        appendUfoCooldown: [2 * fps, 2 * fps],
        appendStarCooldown : [2 * fps,2 * fps],
    }

    config.scoreConfig = {
        shootAlien: 5,
        shootUfo: 10,
    }

    config.player = (() => {
        const { h } = config.game;
        const obj = starship (() => {
            return {
                y: h / 2,
                bulletCooldown: 0.3 * fps,
            }
        });
        return obj;
    })();

    config.alien = (() => {
        const { w } = config.game;
        const obj = starship (() => {
            return {
                w: 80,
                h: 80,
                x: w,
                speed: -7,
                img : batchImport('alien_', 5),
                life : 1
            }
        });
        return obj;
    })();

    config.ufo = (() => {
        const { w } = config.game;
        const o = starship (() => {
            return {
                w: 180,
                h: 120,
                x: w,   
                speed: -5,
                img : batchImport('ufo_', 3),
                life : 2,
            }
        })
        return o;
    })();

    config.star = (() => {
        const o = {};
        o.img = batchImport('star_', 10);
        return o;
    })();


    config.playerBullet = (() => {
        let o = bullet();
        o.img = 'playerBullet';
        return o;
    })();

    config.data = ()=>{
        return {
            score: 0,
            shoot: 0,
            name : '',
        }
    }
   
    config.starshipDeathAnimation = {
        img: 'boom',
        loop : false,
        row: 4,
        col: 4,
        cooldown: 0.05 * fps,
    }

    config.images = (() => {
        const path = './src/';
        let images = {
            boom: path + 'boom.png',
            player: path + 'user.png',
            playerBullet: path + 'bullet.png',
        };

        return Object.assign(
            batchAdd(path+'/aliens/','alien_',5,'png'),
            batchAdd(path+'/star/','star_',10,'png'),
            batchAdd(path+'/ufos/','ufo_',3,'png'),
            images,
        )

    })();

    config.audios = (()=>{
        const path = './src/sfx/';
        return {
            bg : path + 'ost.mp3',
            killed : path + 'killed.mp3',
            shoot : path + 'shoot.mp3',
        }
    })();

})();
