const { getWord, getImage } = require('./API');
const dateFormat = require('./dateFormat');



export const checkDay = async () => {
    const currentDay = dateFormat(Date.now());
    const getData = JSON.stringify({
        query: `query Day($date: String!) {
            day(date: $date) {
                _id
                date
                item
                image
                reviews {
                    _id
                    body
                    starRating
                    createdAt
                    user {
                        _id
                        username
                        title
                    }
                }
            }
        }`,
        variables: `{
            "date": "${currentDay}"
        }`,
    });

    
    
    try{
        const data = await fetch(
            '/graphql',
            {
                method: 'post',
                body: getData,
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': getData.length
                }
            }
        ).then(response => response.json()).then(json => json.data); 
        
        if(data.day){
            return data.day;

        } else {
            let info = await getWord().then(response => response.json()).then(async data => {
                let word = data[0];
                word = word.charAt(0).toUpperCase() + word.slice(1)
                let image = await getImage(word, 1);
                return {word, image};
            });

            // !! uncomment for API testing mock data !!
            // let info = {word: 'gerbil', image: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Meriones_unguiculatus_(wild).jpg'};

            const postData = JSON.stringify({
                query: `mutation AddDay($date: String!, $item: String!, $image: String!) {
                    addDay(date: $date, item: $item, image: $image) {
                        _id
                        date
                        item
                        image
                        reviews {
                            _id
                            body
                            starRating
                            createdAt
                            user {
                                _id
                                username
                            }
                        }

                    }
                }`,
                variables: `{
                    "date": "${currentDay}",
                    "item": "${info.word}",
                    "image": "${info.image}"
                }`
            });
            
            const newData = await fetch(
                '/graphql',
                {
                    method: 'post',
                    body: postData,
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': postData.length
                    }
                }
            ).then(postResponse => postResponse.json()).then(postJson => postJson); 
            
            return newData.data.addDay;
        }
    } catch(e){
        console.error(e);
    }
};

export const fixImg = async (word, dayId) => {
    const img = await getImage(word, 2)

    const fixData = JSON.stringify({
        query: `mutation UpdateDay($dayId: ID!, $image: String!, $item: String!) {
            updateDay(dayId: $dayId, image: $image, item: $item) {
                _id
                item
                image
            }
        }`,
        variables: `{
            "dayId": "${dayId}",
            "item": "${word}",
            "image": "${img}"
        }`
    });


    try {
        await fetch(
            '/graphql',
            {
                method: 'post',
                body: fixData,
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': fixData.length
                }
            }
        ).then(postResponse => postResponse.json()).then(postJson => postJson);
    } catch (e){
        console.error(e)
    }
    
    return img;
}

export const getDayNumber = async (id) => {
    const getDays = JSON.stringify({
        query: `query Days {
            days {
                _id
            }
        }`
    });

    try {
        const data = await fetch(
            '/graphql',
            {
                method: 'post',
                body: getDays,
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': getDays.length
                }
            }
        ).then(response => response.json()).then(json => json.data); 
        
        if(data){
            let number;
            data.days.forEach((day, i) => {
                if(day._id === id){
                    number =  i + 1;
                }
            })
            return number;    
            
        }
    } catch(e) {
        console.error(e);
    }
}