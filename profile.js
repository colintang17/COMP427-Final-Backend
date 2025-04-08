const { Profile } = require("./auth");
const uploadImage = require('./uploadCloudinary');


const getHeadline = (req, res) => {
    Profile.findOne({ username: req.user.username }).exec().then(profile => {
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
          res.send({
            username: profile.username,
            headline: profile.status
          });
        });
}

const getUserHeadline = (req, res) => {
    Profile.findOne({ username: req.params.user }).exec().then(profile => {
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
          res.send({
            username: profile.username,
            headline: profile.status
          });
        });
}

const updateHeadline = (req, res) => {
    Profile.findOne({ username: req.user.username }).exec().then(profile => {
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        profile.status = req.body.headline
        profile.save().then(updatedProfile => {
            res.send({ 
                username: updatedProfile.username,
                headline: updatedProfile.status 
            });
          })
          .catch(error => {
            console.error(error);
            res.sendStatus(500); // Internal Server Error
          });
        });
}

const getFollowing = (req, res) => {
    Profile.findOne({ username: req.user.username }).exec().then(profile => {
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
          res.send({
            username: profile.username,
            following: profile.following
          });
        });
}

const getUserFollowing = (req, res) => {
    Profile.findOne({ username: req.params.user }).exec().then(profile => {
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
          res.send({
            username: profile.username,
            following: profile.following
          });
        });
}

const followUser = (req, res) => {
    Profile.findOne({ username: req.user.username }).exec().then(profile => {
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        Profile.findOne({username: req.params.user}).exec().then(followProfile => {
            if (!followProfile) {
                return res.status(404).json({ error: 'Profile not found' });
            }
            if (!profile.following.includes(req.params.user)) {
                profile.following = [...profile.following, req.params.user];
            }
            profile.save().then(updatedProfile => {
            res.send({ 
                username: updatedProfile.username,
                following: updatedProfile.following 
            });
          })
          .catch(error => {
            console.error(error);
            res.sendStatus(500); // Internal Server Error
          });
        });
        
        });
}

const unfollowUser = (req, res) => {

    Profile.findOne({ username: req.user.username }).exec().then(profile => {
        if (!profile) {
             return res.status(404).json({ error: 'Profile not found' });
        }
        const index = profile.following.indexOf(req.params.user);
    if (index == -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    profile.following.splice(index, 1);
    profile.save();
          res.send({
            username: profile.username,
            following: profile.following
          });
        });

    
}

const getEmail = (req, res) => {
    Profile.findOne({ username: req.user.username }).exec().then(profile => {
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
          res.send({
            username: profile.username,
            email: profile.email
          });
        });
}

const getUserEmail = (req, res) => {
    Profile.findOne({ username: req.params.user }).exec().then(profile => {
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
          res.send({
            username: profile.username,
            email: profile.email
          });
        });
}

const updateEmail = (req, res) => {
    Profile.findOne({ username: req.user.username }).exec().then(profile => {
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        profile.email = req.body.email
        profile.save().then(updatedProfile => {
            res.send({ 
                username: updatedProfile.username,
                email: updatedProfile.email 
            });
          })
          .catch(error => {
            console.error(error);
            res.sendStatus(500); // Internal Server Error
          });
        });
}

const getZip = (req, res) => {
    Profile.findOne({ username: req.user.username }).exec().then(profile => {
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
          res.send({
            username: profile.username,
            zipcode: profile.zipcode
          });
        });
}

const getUserZip= (req, res) => {
    Profile.findOne({ username: req.params.user }).exec().then(profile => {
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
          res.send({
            username: profile.username,
            zipcode: profile.zipcode
          });
        });
}

const updateZip = (req, res) => {
    Profile.findOne({ username: req.user.username }).exec().then(profile => {
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        profile.zipcode = req.body.zipcode
        profile.save().then(updatedProfile => {
            res.send({ 
                username: updatedProfile.username,
                zipcode: updatedProfile.zipcode 
            });
          })
          .catch(error => {
            console.error(error);
            res.sendStatus(500); // Internal Server Error
          });
        });
}

const getDOB = (req, res) => {
    Profile.findOne({ username: req.user.username }).exec().then(profile => {
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
          res.send({
            username: profile.username,
            dob: profile.dob
          });
        });
}

const getUserDOB= (req, res) => {
    Profile.findOne({ username: req.params.user }).exec().then(profile => {
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
          res.send({
            username: profile.username,
            dob: profile.dob
          });
        });
}

const getPhone = (req, res) => {
    Profile.findOne({ username: req.user.username }).exec().then(profile => {
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
          res.send({
            username: profile.username,
            phone: profile.phone
          });
        });
}

const getUserPhone= (req, res) => {
    Profile.findOne({ username: req.params.user }).exec().then(profile => {
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
          res.send({
            username: profile.username,
            phone: profile.phone
          });
        });
}

const updatePhone = (req, res) => {
    Profile.findOne({ username: req.user.username }).exec().then(profile => {
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        profile.phone = req.body.phone
        profile.save().then(updatedProfile => {
            res.send({ 
                username: updatedProfile.username,
                phone: updatedProfile.phone 
            });
          })
          .catch(error => {
            console.error(error);
            res.sendStatus(500); // Internal Server Error
          });
        });
}

const getAvatar = (req, res) => {
    Profile.findOne({ username: req.user.username }).exec().then(profile => {
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
          res.send({
            username: profile.username,
            avatar: profile.avatar
          });
        });
}

const getUserAvatar= (req, res) => {
    Profile.findOne({ username: req.params.user }).exec().then(profile => {
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
          res.send({
            username: profile.username,
            avatar: profile.avatar
          });
        });
}

const updateAvatar= (req, res) => {
    //uploadImage(req.user.username);
    console.log("hiiii" + req.method);
    Profile.findOne({ username: req.user.username }).exec().then(profile => {
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        profile.avatar = req.fileurl;
        profile.save().then(updatedProfile => {
            res.send({ 
                username: updatedProfile.username,
                avatar: updatedProfile.avatar 
            });
          })
          .catch(error => {
            console.error(error);
            res.sendStatus(500); // Internal Server Error
          });
        });
}
     

module.exports = (app) => {
    app.get('/headline', getHeadline);
    app.get('/headline/:user', getUserHeadline);
    app.put('/headline', updateHeadline);
    app.get('/following', getFollowing);
    app.get('/following/:user', getUserFollowing);
    app.put('/following/:user', followUser);
    app.delete('/following/:user', unfollowUser);
    app.get('/email', getEmail);
    app.get('/email/:user', getUserEmail);
    app.put('/email', updateEmail);
    app.get('/zipcode', getZip);
    app.get('/zipcode/:user', getUserZip);
    app.put('/zipcode', updateZip);
    app.get('/dob', getDOB);
    app.get('/dob/:user', getUserDOB);
    app.get('/phone', getPhone);
    app.get('/phone/:user', getUserPhone);
    app.put('/phone', updatePhone);
    app.get('/avatar', getAvatar);
    app.get('/avatar/:user', getUserAvatar);
    
    app.put('/avatar', uploadImage('avatar'), updateAvatar);
}
