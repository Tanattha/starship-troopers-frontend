
class Over extends Scene{
    setup() {
        this.game.data.end = true;
        this.updateView()
        this.event();
        $("#logo").classList.remove('play-status');
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
        const getScore = $('#over .score');
        on(
            btn,
            'click',
            ()=>{
            
                let configObj = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"  
                },
          body: JSON.stringify({username: name.value, num: getScore.innerText})
            }
            fetch(`${BASE_URL}/users`, configObj)
            .then(response => response.json())
            .catch((error) => {console.error('Error:', error)});

           fetch(`${BASE_URL}/topten`), function(json) {
                JSON.stringify(json);            
                location.reload();
            }
           
            this.game.rank()
        })
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