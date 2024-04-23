
class EmailMessageCreator {
    deleteProfile() {
        const subject = "Удаление аккаунта Calculaizer"
        const text = "Ваш аккаунт был удален... Спасибо, что были с нами! Пожалуйста, напишите в ответном письме, почему Вы решили удалить аккаунт."
        return {subject, text}
    }

    deleteProfileByAdmin () {
        const subject = "Удаление аккаунта Calculaizer"
        const text = "Ваш аккаунт был удален администратором. "
        return {subject, text}
    }

    recoveryPassword (password) {
        const subject = 'Восстановление пароля Calculaizer'
        const text = `Ваш новый пароль для входа в систему: ${password}`
        return {subject, text}
    }

    confirmEmail (code) {
        const subject = 'Calculaizer Подтверждение email'
        const text = `Ваш код подтверждения: ${code}.\n\nКод действителен в течение 15 минут!`
        return {subject, text}
    }

    setVip () {
        const subject = "Изменение VIP статуса"
        const text = "Поздравляем! Теперь у Вас VIP статус в нашем приложении! Вам доступны дополнительные возможности!"
        return {subject, text}
    }

    unsetVip () {
        const subject = "Изменение VIP статуса"
        const text = "К сожалению, Ваш VIP статус в нашем приложении отменен!"
        return {subject, text}
    }
}

module.exports = new EmailMessageCreator()