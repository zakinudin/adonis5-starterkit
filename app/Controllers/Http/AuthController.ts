// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {

    public async getLogin({ view }) {
        return view.render('login')
    }

    public async postLogin({ auth, request, response }) {
        // return request.all()
        const { email, password } = request.all()
        try {
            await auth.attempt(email, password)
            return auth.use('web').isLoggedIn
            response.redirect('/home')
        } catch (error) {
            return error.message
        }
        console.log(request.body)
    }

    public async getRegister({ view }) {
        return view.render('register')
    }

    public async postRegister({ auth, request, response }) {
        console.log(request.body)
    }

}
