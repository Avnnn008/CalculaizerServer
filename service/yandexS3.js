const EasyYandexS3 = require('easy-yandex-s3').default
require('dotenv').config()

const s3 = new EasyYandexS3({
    auth: {
      accessKeyId: process.env.YANDEXS3_ID,
      secretAccessKey: process.env.YANDEXS3_KEY,
    },
    Bucket: 'calculaizer-backet',
    debug: false,
  });

  const s3SaveFromURL = async (url, name) => {
    try {
      let blob = await fetch(url).then(r=>r.blob())
    const arrayBuffer = await blob.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    let upload = await s3.Upload({
        buffer,
        name: `${name}.png`
    },
    '/imgGenerator/')
    return upload.Location
    } catch (e) {
      throw e
    }
    
  }

  const s3SaveFile = async (file) => {
    try {
      let upload = await s3.Upload({
      buffer: file,
      name: `${Date.now()}.png`
    },
    '/About/')
    return upload.Location
    } catch (e) {
      throw e
    }
    
  }

  const s3RemoveImg = async (url) => {
    try {
      let folder
    if (/imgGenerator/.test(url)) {
      folder = 'imgGenerator'
    } else if (/About/.test(url)) {
      folder = 'About'
    }
let path = url.split(`/${folder}/`)[1]
    await s3.Remove(`/${folder}/${path}`)
    } catch (e) {
      throw e
    }
    
  }

  module.exports = {s3SaveFromURL, s3RemoveImg, s3SaveFile}