class Adapter {
    constructor() {
       //this.BASE_URL = 'http://127.0.0.1:3000';
       this.BASE_URL = = 'https://starship-troopers.herokuapp.com';
    }
  
    createUser(data) {
      return fetch(`${this.BASE_URL}/users`, {
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
    }

    getRanks() {
        return fetch(`${this.BASE_URL}/topten`)
        .then(response => response.json())
    }
   
}