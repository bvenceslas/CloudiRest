const router = require('express').Router();
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
const User = require('../model/user.model');

// test the api
router.get('/', async (req, res) => {
    await res.json('API works properly ...');
});

// save a user
router.post('/users', upload.single('photo'), async (req, res) => {
    try {
        const result = cloudinary.uploader.upload(req.file.path);
        const newUser = new User({
            firstname:req.body.firstname,
            lastname: req.body.lastname,
            avatar: (await result).secure_url,
            cloudId: (await result).public_id
        });
        const saveUser = await newUser.save();
        return res.json(saveUser);
    } catch (error) {
        console.log({errorMessage: error})
    }
    
});

// find users
router.get('/users', async(req, res) => {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (error) {
        console.log({errorMessage: error})
    }    
});

// delete user with picture
router.delete('/users/:id', async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        // remove image from cloudinary
        await cloudinary.uploader.destroy(user.cloudId);
        await user.remove();
        return res.json('User removed successfuly');
    } catch (error) {
        console.log({errorMessage: error})
    }
});

// edit a user
router.put('/users/:id', upload.single('photo'),  async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        // remove image from cloudinary
        await cloudinary.uploader.destroy(user.cloudId);

        // update user data
        const result = cloudinary.uploader.upload(req.file.path);
        const userData = {
            firstname:req.body.firstname || user.firstname,
            lastname: req.body.lastname || user.lastname,
            avatar: (await result).secure_url || user.avatar,
            cloudId: (await result).public_id || user.cloudId
        };

        // update the user
        const updateUser = await User.findByIdAndUpdate(req.params.id, userData, {new: true});
        return res.json(updateUser);
    } catch (error) {
        console.log({errorMessage: error})
    }
})

module.exports = router;