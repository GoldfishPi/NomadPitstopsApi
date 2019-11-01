import { ApolloLink } from 'apollo-link';
export const authMiddleware = new ApolloLink((op, next) => {
    const lol = localStorage.getItem('firebase:host:nomad-pit-stops.firebaseio.comi');
    console.log('lol', lol);
    op.setContext((headers) => ({
        headers: Object.assign({}, headers, { lol: 'lol' })
    }));
    return next(op);
});
//# sourceMappingURL=auth.js.map