export const getWord = () => fetch('https://random-word-form.herokuapp.com/random/noun');

export const getImage = (word) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6baae7b932mshdb82ed0d81b2e18p1da744jsnb702d72cc093',
            'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
        }
    };
    
    return fetch(`https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q=${word}&pageNumber=1&pageSize=1`, options)
    
}
