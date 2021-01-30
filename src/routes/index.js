import accountRoutes from './account-routes'
import payRoutes from './pay-routes'

export default (app) => {
    app.use('/account/', accountRoutes)
    app.use('/pay/', payRoutes)
}
