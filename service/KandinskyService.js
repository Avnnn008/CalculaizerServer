const axios = require('axios')
const FormData = require('form-data')
const base64url = require('base64url')
require('dotenv').config()

class KandinskyService {
    constructor () {
        this.url = 'https://api-key.fusionbrain.ai/'
        this.AUTH_HEADERS = {
            'X-Key': `Key ${process.env.KANDINSKY_API_KEY}`,
            'X-Secret': `Secret ${process.env.KANDINSKY_SECRET}`
        }
    }

    async getModels() {
        const response = await axios.get(`${this.url}key/api/v1/models`, {headers: this.AUTH_HEADERS})
        return response.data[0].id
    }

    async generate(prompt, model, width=1024, height=1024, style=3) {
        const styles = ['KANDINSKY', 'UHD', 'ANIME', 'DEFAULT']
        const params = {
            type: 'GENERATE',
            numImages: 1,
            width,
            height,
            style: styles[style],
            generateParams: {
                query: prompt
            }
        }
       const formData = new FormData()
       const modelData = { value: model, options: {contentType: null}}
       const paramsData = { value: JSON.stringify(params), options: { contentType: 'application/json'}}
       formData.append('model_id', modelData.value, modelData.options)
       formData.append('params', paramsData.value, paramsData.options)
       const response = await axios.post(`${this.url}key/api/v1/text2image/run`, formData, {headers : {
        ...formData.getHeaders(), 
        ...this.AUTH_HEADERS
       },
       'Content-Type' : 'multipart/form-data'
    })
    const data = response.data
    return data.uuid
    }

    async checkGeneration(requestId, attempts = 10, delay = 10) {
        while (attempts > 0) {
            try {
                const response = await axios.get(`${this.url}key/api/v1/text2image/status/${requestId}`, {headers: this.AUTH_HEADERS})
                const data = response.data
                console.log(data)
                if (data.status === 'DONE') {
                    return data.images
                }
                if (!!data.censored) {
                    throw new Error('censored')
                }
            } catch (e) {
                throw new Error(e)
            }
            attempts--
            await new Promise(resolve=>setTimeout(resolve, delay*1000))
        }
    }

}

const startGeneration = async (prompt, size) => {
     const api = new KandinskyService()
        const modelId = await api.getModels()
        const widthAndHeight = parseInt(size.split('x')[0])
        const reqId = await api.generate(prompt, modelId, widthAndHeight, widthAndHeight)
        const images = await api.checkGeneration(reqId)
        return `data:image/jpg;base64, ${images[0]}`
}

module.exports = startGeneration

