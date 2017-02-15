import express from 'express';
import User from '../models/user';

const router = express.Router();

// Select User All
router.get('/', (req, res) => {
    User.find((err, users) => {
        if (err)
            return res.status(500).json({
                error : 'Database Failuer',
                code : 1
            });

        res.json(users);
    });
});

// Select User
router.get('/:userName', (req, res) => {
    User.findOne({username : req.params.userName}, (err, user) => {
        if (err)
            return res.status(500).json({
                error : err
            });

        if (!user) return res.status(404).json({
            error : 'User not found',
        });

        res.json(user);
    });
});

// Insert User
router.post('/', (req, res) => {
    // CHECK USERNAME FORMAT
    let usernameRegex = /^[a-z0-9]+$/;

    if(!usernameRegex.test(req.body.username)) {
        return res.status(400).json({
            error: "BAD USERNAME",
            code: 1
        });
    }

    // CHECK PASS LENGTH
    if(req.body.password.length < 4 || typeof req.body.password !== "string") {
        return res.status(400).json({
            error: "BAD PASSWORD",
            code: 2
        });
    }

    // CHECK USER EXISTANCE
    User.findOne({ username: req.body.username }, (err, exists) => {
        if (err) res.status(500).json({error : 'failed to find'});
        if(exists){
            return res.status(409).json({
                error: "USERNAME EXISTS",
                code: 3
            });
        }

        // CREATE ACCOUNT
        let user = new User({
            username: req.body.username,
            password: req.body.password
        });

        user.password = user.generateHash(user.password);

        // SAVE IN THE DATABASE
        user.save( err => {
            if(err) res.status(500).json({error : 'failed to insert'});
            res.json({ success: true });
        });

    });
});

// Update User
router.put('/:userName', function(req, res){
    User.findOne({username : req.params.userName}, (err, user) => {
        if (err) return res.status(500).json({error : err});
        if (!user) return res.status(404).json({error : 'User not found'});

        if (req.body.username) user.username = req.body.username;
        if (req.body.password) user.password = user.generateHash(req.body.password);

        user.save( err => {
            if(err) res.status(500).json({error: 'failed to update'});
            res.json({message: 'book updated'});
        });
    });
});

// Delete User
router.delete('/:userName', function(req, res){
    User.remove({username : req.params.userName}, (err, output) => {
        if (err) return res.status(500).json({error : err});

        res.status(204).end();
    });
});


export default router;
