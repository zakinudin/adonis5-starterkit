// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

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

    public async postRegister({ request, response, session }) {

        const newUserRegister = schema.create({
            username: schema.string(),
            email: schema.string([
                rules.email()
            ]),
            password: schema.string([
                rules.minLength(4)
            ])
        })

        const validation = await request.validate({
            schema: newUserRegister
        })

        if (validation.fails()) {
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }

        return 'register success'

    }

}
