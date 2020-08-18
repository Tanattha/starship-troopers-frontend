class Rank extends Scene {
    setup() {
        super.setup();
        this.event();
        this.rank();

    }
 
    rank() {
        const getrank = new Adapter();
        getrank.getRanks()
        .then((data) => {
            data.forEach(e => {
            let html = `
             <tr>
                <td>${e.rank}</td>
                 <td>${e.username}</td>
                 <td>${e.num}</td>
             </tr>
            `
            $('#rank table tbody').innerHTML += html;
       
            });
        })
        .catch((error) => {console.error('Error:', error)});
    }

    event() {
        on(
            $('#restart-btn'),
            'click',
            () => {
                location.reload()
                this.game.start()
            }
        )
    }
}
