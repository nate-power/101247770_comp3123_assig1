let express = require('express');
let app = express();
let router = express.Router();
let fs = require('fs');
let users = JSON.parse(fs.readFileSync('users.json'));


// Examples: 
//  correct one - http://localhost:8081/user?uid=1
//  incorrect one - http://localhost:8081/user?uid=11
router.get('/user', (req, res) => {
    let uid = req.query.uid;
    let user_response;

    for (let user of users) {
        if (uid == user['id']) {
            let address = `${user['address']['street']}, ${user['address']['city']}, ${user['address']['zipcode']}`;
            user_response = {
                'id': user['id'],
                'name': user['name'],
                'email': user['email'],
                'address': address, 
                'phone': user['phone'],
            };
            break;
        };
    };
    if (user_response == null) {
        user_response = {
            'message': 'No user found'
        };
    };
    res.send(user_response);
});


// http://localhost:8081/users/all
router.get('/users/all', (req,res) => {
    // sorting function below  
    res.send(users.sort(sort_objects));
});

// sorting function
sort_objects = (a, b) => {
    if (a.username < b.username){
        return -1;
    };
    if (a.username > b.username){
        return 1;
    };
    return 0;
}; 


app.use('/', router);
app.listen(process.env.port || 8081);
console.log('Web Server is listening at port ' + (process.env.port || 8081));