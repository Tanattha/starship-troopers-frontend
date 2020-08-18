class Over extends Scene{
    setup() {
        this.game.data.end = true;
        this.updateView();
        this.event();
        $("#logo").classList.remove('play-status');
        $('#name').value = '';
        this.adapter = new Adapter();
       
    }

    updateView(){
        const {
            score,
            shoot
        } = this.game.data;
        $('#over .shoot').innerHTML = numberFormat(shoot);
        $('#over .score').innerHTML = numberFormat(score);
        
    }

    event(){
        const btn = $('#submit-btn');
        const name = $('#name');
        const getScore = $('#over .score');
        on(
            btn,
            'click',
            ()=>{
                if (name.value != "") {
                   
                    const data = {username: name.value, num: getScore.innerText}
                    this.adapter.createUser(data)
                    this.adapter.getRanks()
                    
                }
                    this.game.rank()
                     })
       
    }   
}
