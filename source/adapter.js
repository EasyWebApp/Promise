import Promise from './Promise';


export default Promise;

export const resolved = Promise.resolve;

export const rejected = Promise.reject;


export function deferred() {

    var resolve, reject;

    const promise = new Promise(
        (done, fail)  =>  (resolve = done, reject = fail)
    );

    return  {promise, resolve, reject};
}
