import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from "./Login.js"
import App from './App'
import { AuthProvider } from './AuthContext.js'
import Admin from './Admin'
import PrivateRoute from "./PrivateRoute"
import Header from './Header.js'

export default function Routing() {
    return (
        <Router forceRefresh={true}>
            <AuthProvider>
                <Header />
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute exact path="/admin" component={Admin} />
                </Switch>
            </AuthProvider>
        </Router>
    )
}
