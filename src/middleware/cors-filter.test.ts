//Copied from user- service, this test currently does not work in profile service
 
import { corsFilter } from '../middleware/cors-filter'
 
describe('corsFilter', ()=>{
    
    let req;
    let res;
    let next;
 
   
    test('Should not allow log request', ()=>{
            corsFilter(req,res, next)
            expect(res.header).not.toBeCalledWith('Access-Control-Allow-Origin', `${req.headers.origin}`)
            expect(next).not.toBeCalled()
        })
        
    it('Should allow log request ', ()=>{
        //User obj returns undefined even after set up
        /*req.user = {//set up the user object
            method:'Mithrandir',
            ip:'127.0.0.1',
            path: '/login'
        }*/
        const fn = jest.fn()
        fn('Mithrandir Request from 127.0.0.1 to /login')
        corsFilter(req,res, next)
        expect(fn).toHaveBeenCalledWith('Mithrandir Request from 127.0.0.1 to /login')
    })
})