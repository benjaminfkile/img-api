const express = require('express')
const imgService = require('./ImageService')
const imgRouter = express.Router()
const jsonParser = express.json()


imgRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    imgService.getAllImages(knexInstance)
      .then(images => {
        res.json(images)
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { id, url } = req.body
    const newImage = { id, url }

    for (const [key, value] of Object.entries(newImage))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

    imgService.insertImage(
      req.app.get('db'),
      newImage
    )
      .then(Image => {
        res.json(Image)
      })
      .catch(next)
  })
  
/********************************************************************************/

imgRouter
  .route('/:id')
  .all((req, res, next) => {
    imgService.getImageById(
      req.app.get('db'),
      req.params.id
    )
      .then(Image => {
        if (!Image) {
          return res.status(404).json({
            error: { message: `Image doesn't exist` }
          })
        }
        res.Image = Image
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(res.Image)
  })
  .delete((req, res, next) => {
    imgService.deleteImage(
      req.app.get('db'),
      req.params.id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = imgRouter