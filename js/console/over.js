
class Over extends Scene{
    setup() {
        this.game.data.end = true;
        this.updateView();
        this.event();
        $("#logo").classList.remove('play-status');
        $('#name').value = '';
       
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

                    fetch(`${BASE_URL}/users`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"  
                        },
                        body: JSON.stringify(data)
                    })
                      .then(response => response.json())
                      .then(response => console.log(response))
                      .catch((error) => {console.error('Error:', error)})
                    

                    fetch(`${BASE_URL}/topten`)
                    .then(response => response.json())
                    .then(response => console.log(response))
                    .catch((error) => {console.error('Error:', error)})
                }
                this.game.rank()
        })
       
    }   
}