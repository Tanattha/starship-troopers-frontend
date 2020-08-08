const res = (() => {
    
    let o = {};

    let _images = null;
    let _audios = null;


    let call = (callback) => {
        if (_images && _audios) {
            callback();
            o.loop('bg');
        }
    };

    o.imageBy = (key) => {
        return _images[key];
    }

    o.play = (key)=>{
        setTimeout(()=>{
            _audios[key].play();
        },50);
    }

    o.loop = (key)=>{
        _audios[key].loop = true;
    }
  
    o.end = (key)=>{
        _audios[key].currentTime = 0;
        _audios[key].pause();  
    };

    o.replay = (key)=>{
        o.end(key);
        o.play(key);
    }

    o.loadAssets = callback => {
        loadImages(config.images, images => {
            _images = images;
            call(callback);
        });
        loadAudios(config.audios, audios => {
            _audios = audios;
            call(callback);
        });
    };

    return o;

})();