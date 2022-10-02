const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
});

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
});

let mailOptions = {
    from: 'bottlename@gmail.com',
    to: 'bottlename@gmail.com',
    subject: 'Nodemailer Project',
    text: 'Hi from your nodemailer project'
}
transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
        console.log("Error " + err);
    } else {
        console.log("Email sent successfully");
    }
});

// Task scheduling
cron.schedule('* * * * *', function() {
    
})

// if the app is in production, send state files from the build directory
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../client/build')));
};
// catch-all if a page doesnt exist, send the user to index.html
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

// Create new instance of Apollo
const startApolloServer = async (typeDefs, resolvers) => {
    // Waits for server to fully boot up
    await server.start();

    // integrate the server with the express application as middleware (const app)
    server.applyMiddleware({ app });

    //start instance of MongoDB server at PORT
    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        });
    })
};

// call function to start server
startApolloServer(typeDefs, resolvers);