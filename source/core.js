const top = (typeof window === 'object')  ?  window  :  global;

const wait = top.requestIdleCallback || top.requestAnimationFrame ||
    top.setImmediate || setTimeout;

export const _callback_ = new WeakMap();



export function end(type, result) {

    if (this.state > -1)  return;

    this.state = type;

    this.result = result;

    wait(() => {

        var func, callback = _callback_.get( this );

        while (func = callback.shift())  func[type]( result );
    });
}


export function follow(value, resolve, reject) {

    if ((value || '').then  instanceof  Function)
        value.then(resolve, reject);
    else
        (this.state ? reject : resolve)( value );
}


export function wrap(callback, resolve, reject) {

    return  result => {

        if (callback instanceof Function)  try {

            result = callback( result );

        } catch (error) {  reject( error );  }

        follow.call(this, result, resolve, reject);
    };
}
