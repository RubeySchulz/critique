export const get_follow_info = async (username) => {
    const query = JSON.stringify({
        query: `query User($username: String!) {
            user(username: $username) {
                _id
                following {
                    _id
                    username
                }
                followers {
                    _id
                    username
                }
            }
        }`,
        variables: `{
            "username": "${username}"
        }`,
    });

    try {
        const data = await fetch(
            '/graphql',
            {
                method: 'post',
                body: query,
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': query.length
                }
            }
        ).then(response => response.json()).then(json => json.data.user);

        return data;
    } catch(e) {
        console.error(e);
    }
}