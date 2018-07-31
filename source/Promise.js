import { _callback_, end, follow, wrap } from './core';



export default  class Promise {

    constructor(main) {

        this.result = null, this.state = -1;

        _callback_.set(this, [ ]);

        main(end.bind(this, 0),  end.bind(this, 1));
    }

    then(resolve, reject) {

        return  new Promise((_resolve_, _reject_) => {

            const callback = [
                wrap.call(this, resolve, _resolve_, _reject_),
                wrap.call(this, reject, _resolve_, _reject_)
            ];

            if (this.state < 0)
                _callback_.get( this ).push( callback );
            else
                callback[this.state]( this.result );
        });
    }

    catch(reject) {  return  this.then(null, reject);  }

    finally(done) {  return  this.then(done, done);  }

    static resolve(value) {

        return  (value instanceof Promise)  ?
            value  :  new Promise(follow.bind({state: 0}, value));
    }

    static reject(error) {

        return  new Promise((resolve, reject) => reject( error ));
    }
}
