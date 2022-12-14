export const getWord = () => fetch('https://random-word-form.herokuapp.com/random/noun');

export const getImage = async (word, count) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6baae7b932mshdb82ed0d81b2e18p1da744jsnb702d72cc093',
            'X-RapidAPI-Host': 'bing-image-search1.p.rapidapi.com'
        }
    };
    let image;

    await fetch(`https://bing-image-search1.p.rapidapi.com/images/search?q=${word}&mkt=en-US&count=${count}`, options)
    .then(response => response.json())
    .then(response => {
        const i = count - 1; 
        image =  response.value[i].contentUrl
    })
	.catch(err => console.error(err));
    
    return image;
}
