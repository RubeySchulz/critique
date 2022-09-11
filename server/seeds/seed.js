const {faker} = require('@faker-js/faker');

const db = require('../config/connection');
const { Day, User, Review } = require('../models');

db.once('open', async () => {

    const user = { username: 'seed user', email: 'seeing@gmail.com', password: 'password' };

    const userData = await User.findOne({ username: user.username })

    console.log(userData)

    const dayOne = '63146789c4ad5be957ffc7e5';
    const dayTwo = '6315950c92c6fd4a7b44364b';

    // create reviews day one
    for(let i = 0; i < 20; i++){
        const body = faker.lorem.sentence();
        const starRating = Math.floor(Math.random() * (5 - 1 + 1) + 1);
        const data = { body, starRating, user: userData._id, day: dayOne }

        const review = await Review.create(data);
        console.log(review)
        const day = await Day.findOneAndUpdate(
            { _id: dayOne },
            { $addToSet: { reviews: review._id } },
            { new: true }
        );
        console.log(day)

        const user = await User.findOneAndUpdate(
            { _id: userData._id },
            { $addToSet: { reviews: review._id } },
            { new: true }
        );
        console.log(user)
    }

    // create reviews day two
    for(let i = 0; i < 20; i++){
        const body = faker.lorem.sentence();
        const starRating = Math.floor(Math.random() * (5 - 1 + 1) + 1);
        const data = { body, starRating, user: userData._id, day: dayTwo }

        const review = await Review.create(data);
        console.log(review)
        const day = await Day.findOneAndUpdate(
            { _id: dayTwo },
            { $addToSet: { reviews: review._id } },
            { new: true }
        );
        console.log(day)

        const user = await User.findOneAndUpdate(
            { _id: userData._id },
            { $addToSet: { reviews: review._id } },
            { new: true }
        );
        console.log(user)
    };

    console.log('all done!')
    process.exit(0);
})