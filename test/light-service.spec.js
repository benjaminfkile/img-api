require('dotenv').config()
const imageService = require('../src/Images/ImageService')
const { expect } = require('chai')
const knex = require('knex')
const chai = require('chai');
const assertArrays = require('chai-arrays');
chai.use(assertArrays);

describe(`ImageService object`, function () {

    let db

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.DATABASE_URL,
        })
    })

    after(() => db.destroy())

    describe(`getAllImages()`, () => {

        it(`resolves all images from 'images' table`, () => {

            return imageService.getAllImages(db)
                .then(actual => {
                    expect(actual).to.be.array();
                })
        })
    })
})