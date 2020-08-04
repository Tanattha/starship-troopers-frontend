class Over extends Scene{
    setup() {
        
        this.game.data.end = true;

        this.updateView()

        this.event();
    }

    updateView(){
        const {
            score,
            shoot,
        } = this.game.data;
        $('#over .shoot').innerHTML = numberFormat(shoot);
        $('#over .score').innerHTML = numberFormat(score);
    }

    event(){
        const btn = $('#submit-btn');
        const name = $('#name');
        on(
            btn,
            'click',
            ()=>{
                this.game.data.name = name.value;
                this.game.rank();
            }
        );

        on(
            name,
            'input',
            ()=>{
                const empty = name.value === '';
                const attr = empty ? 'setAttribute' : 'removeAttribute';
                btn[attr]('disabled','disabled');
            }
        )
    }
}