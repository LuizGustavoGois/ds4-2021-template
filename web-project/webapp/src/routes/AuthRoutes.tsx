import { Route, Switch } from "react-router";
import { NotFound } from "../pages/NotFound";
import { SignIn } from "../pages/Signin";
import { SignUp } from "../pages/SignUp";

export function AuthRoutes() {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route component={NotFound} />
        </Switch>
    )
}