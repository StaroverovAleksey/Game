export default {
    /***
     * @param {string} mail - Почта пользователя для регистрации.
     * @param {string} name - Имя создаваемого персонажа.
     * @param {string} password - Пароль пользователя для регистрации.
     * @param {string} passwordRepeat - Повтор пароля пользователя для регистрации.
     ***/
    REGISTRATION1({mail, name, password, passwordRepeat}) {
        this.send('auth', {mail, name, password, passwordRepeat});
    },
    /***
     * @param {string} mail - Почта пользователя для авторизации.
     * @param {string} password - Пароль пользователя для авторизации.
     ***/
    AUTHORIZATION1({mail, password}) {
        this.send('auth', {mail, password});
    }
}