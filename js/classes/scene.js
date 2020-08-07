class Scene{
    constructor(el,game) {
        this.el = $(el);
        this.game = game;
    }
    
    created(){
    }
    setup() {
    }
    end(){
    }
    show() {
        this.el.classList.add('action');
    }
    hidden() {
        this.el.classList.remove('action');
    }
}