import accountRoutes from './account-routes'

export default (app) => {
    app.use('/account/', accountRoutes)
}
