import { ApolloLink, from } from 'apollo-link';
export const authMiddleware = new ApolloLink((op, next) => {
const lol = localStorage.getItem('firebase:host:nomad-pit-stops.firebaseio.comi')
console.log('lol', lol);
    op.setContext((headers:any) => ({
        headers: {
            ...headers,
            lol:'lol'
        }
    }));
    return next(op);

});
