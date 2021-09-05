import React, {  useEffect } from 'react';
import Cookies from 'js-cookie';
import { useHistory, Route } from 'react-router-dom';

const ProtectedRoute = ({component: Component, ...restOfprops}) => {
    const history = useHistory();

    useEffect(() => {
        if (Cookies.get('jwt') === "") {
              history.push('/login');
        }
      }, []);

    return (
        <Route
            //spread the children
            {...restOfprops}
            render = {(props) => <Component {...props} />}
        />
    )
}

export default ProtectedRoute
