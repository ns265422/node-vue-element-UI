// @login & register
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const keys = require('../../config/keys')
const passport = require('passport')
const User = require('../../models/User')

// 註冊
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json('郵箱已被註冊!')
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      })

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
        identity: req.body.identity
      })

      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err

          newUser.password = hash

          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
        })
      })
    }
  })
})

// 登入
router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json('用户不存在!')
    }

    // 密碼匹配
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const rule = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          identity: user.identity
        }
        jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err
          res.json({
            success: true,
            token: 'Bearer ' + token
          })
        })
      } else {
        return res.status(400).json('密碼錯誤!')
      }
    })
  })
})

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      identity: req.user.identity
    })
  }
)

module.exports = router
