const {Chapter, Subsection, Content} = require("../../../models/infoSection")
const ErrorService = require("../../../service/errorsService")
const { s3SaveFile, s3RemoveImg } = require("../../../service/yandexS3")

const deleteContentImagesFromS3 = async (findConditional) => {
    try {
        const content = await Content.find(findConditional)
       content.map(async (el)=> await s3RemoveImg(el.img))
    } catch {}
}


/* Получение контента подраздела */
const getSubsectionContent = async (req, res) => {
    try {
        const {id} = req.query
        const content = await Content.find({subsection: id})
        res.status(200).json({content})
    } catch  (e) {
        ErrorService(e, res)
    }
}

/* Создание нового раздела */
const createNewChapterController = async (req, res) => {
    try {
        const {text} = req.body
        let order
        const chapters = await Chapter.find({})
        if (chapters.length === 0) {
            order = 1
        } else {
            const lastChapter = chapters.sort((a, b)=> b.order - a.order)
            order = lastChapter[0].order + 1
        }
        
        await Chapter.create({name: text, order})
        res.status(201).json({message: 'success'})
        
    } catch (e) {
        ErrorService(e, res)
    }
}

/* Создание нового подраздела */
const createNewSubsectionController = async (req, res) => {
    try {
        const {text, id} = req.body
        let order
        const subsections = await Subsection.find({chapter: id})
        if (subsections.length === 0) {
            order = 1
        } else {
            const lastSubsection =  subsections.sort((a, b) => b.order - a.order)
            order = lastSubsection[0].order + 1
        }
        await Subsection.create({name: text, chapter: id, order})
        res.status(201).json({message: 'success'})
    } catch (e) {
        ErrorService(e, res)
    }
}

/* Создание нового блока контента в подразделе */
const createNewContentController = async (req, res) => {
    try {
        const {text, sectionId} = req.body
        const file = req.file
        let order, chapterId
        const location = await s3SaveFile(file.buffer)
        const content = await Content.find({subsection: sectionId})
        if (content.length === 0) {
            order = 1
            const section = await Subsection.findById(sectionId, {chapter: 1, _id: 0})
            chapterId = section.chapter
        } else {
            const lastContent = content.sort((a,b)=>b.order-a.order)
            order = lastContent[0].order + 1
            chapterId = lastContent[0].chapter
        }

        const description = text.split('\n')

        await Content.create({chapter: chapterId, subsection: sectionId, order, img: location, description})
        res.status(201).json({message: 'success'})
    } catch (e) {
        ErrorService(e, res)
    }
}

/* Редактирование контента */
const updateContentController = async (req,res) => {
    try {
        const {contentId, text} = req.body
        const file = req.file
        if (file) {
            await deleteContentImagesFromS3({_id: contentId})
            const location = await s3SaveFile(file.buffer)
            await Content.findByIdAndUpdate(contentId, {img: location})
        }
        if (text) {
            const description = text.split('\n')
            await Content.findByIdAndUpdate(contentId, {description})
        }
        res.status(201).json({message: 'success'})
    } catch (e) {
        ErrorService(e, res)
    }
}

/* Изменение загловка раздела или подраздела */
const newTitleController = async (req, res) => {
    try {
        const {id, name, newTitle} = req.body
        if (name === 'chapter' ) {
            await Chapter.findByIdAndUpdate(id, {name: newTitle})
        } else if (name === 'subsection')  {
            await Subsection.findByIdAndUpdate(id, {name: newTitle})
        } else {
            return res.status(400).json({message: 'Ошибка обновления заголовка!'})
        }
      res.status(201).json({message: 'success'})
    } catch (e) {
        ErrorService(e, res)
    }
}

/* Удаление раздела со всем содержимым */
const deleteChapterController = async (req, res) => {
    try {
       const {id} = req.query
       await Chapter.findByIdAndDelete(id)
       await Subsection.deleteMany({chapter: id})
       await deleteContentImagesFromS3({chapter: id})
       await Content.deleteMany({chapter: id})
    res.status(201).json({message: 'success'})
    } catch (e) {
        ErrorService(e, res)
    }
    
}

/* Удаление подраздела и относящегося к немуу контента */
const deleteSubsectionController = async (req, res) => {
    try {
        const {id} = req.query
        await Subsection.findByIdAndDelete(id)
        await deleteContentImagesFromS3({subsection: id})
        await Content.deleteMany({subsection: id})
        res.status(201).json({message: 'success'})
    } catch (e) {
        ErrorService(e, res)
    }
}

/* Удаление части контента */
const deleteContentController = async (req, res) => {
    try {
        const {id} = req.query
        await deleteContentImagesFromS3({_id: id})
        await Content.findByIdAndDelete(id)
        res.status(201).json({message: 'success'})
    } catch (e) {
        ErrorService(e, res)
    }
}



module.exports = {getSubsectionContent ,createNewChapterController , createNewSubsectionController, createNewContentController, updateContentController, deleteChapterController, deleteSubsectionController, deleteContentController, newTitleController}