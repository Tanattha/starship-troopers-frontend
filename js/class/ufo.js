class Ufo extends Starship{

    setup() {
        const { w, h } = config.game;
        super.setup('ufo');
        this.y = random(0, h-this.h);
    }

   update() {
    this.move();
    super.update();
 }
}
