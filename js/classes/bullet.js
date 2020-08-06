class Bullet extends Element{

    update() {
        if (this.run) {
            this.move();
        }
        super.update();
    }

    move() {
        this.x += this.speed;
    }

}