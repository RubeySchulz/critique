export const getWord = () => fetch('https://random-word-form.herokuapp.com/random/noun');

export const getImage = () => 
    fetch('https://serpapi.com/search.json?q=Apple&tbm=isch&ijn=0', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Credentials" : true 
        },
        mode: 'no-cors'
    });
