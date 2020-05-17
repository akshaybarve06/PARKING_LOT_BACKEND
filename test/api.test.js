let chai=require("chai")
let chaiHttp=require("chai-http")
let server=require("../server")

chai.should();
chai.use(chaiHttp);

describe(`API Test Cases..`, ()=>
{
    // Test Cases For Checking Possibilities of Post Users
    describe(`POST /register/`,()=>
    {
        // TC 1.1 if new User added to database then it return status 200 
        it(`given new user valid if added in database should return status 200`, ()=>{
            let newUser={
                name:"D", phone:"1234567890",
                email:"dd@gmail.com", password:"d@123456"
            }
            chai.request(server)
                .post("/register")
                .send(newUser)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                })
        })
        // TC 1.2 if new User email is invalid then it not added to database return error 
        it(`given user email invalid if not added in database should return error`, ()=>{
            let newUser={
                name:"E", phone:"1234567890",
                email:"", password:"e@1234565"
            }
            chai.request(server)
                .post("/register")
                .send(newUser)
                .end((err, res)=>{
                    res.should.have.status(400);
                    chai.expect(res.body.message).to.equal("Please Enter Valid Details")
                })
        })
        // TC 1.3 if new User password is not valid then not added to database and return error
        it(`given new user password invalid if not added in database should return error`, ()=>{
            let newUser={
                name:"F", phone:"1234567890",
                email:"ff@gmail.com", password:"ffff"
            }
            chai.request(server)
                .post("/register")
                .send(newUser)
                .end((err, res)=>{
                    res.should.have.status(400);
                    chai.expect(res.body.message).to.equal("Please Enter Valid Details")
                })
        })

    })
    // Test Cases For Get User Details
    describe(`GET /allusers/`,()=>
    {
        // TC 2.1 if all Users stored in database then treurn status 200
        it.only(`given method get all users if get all users should return status 200 and in Array Form`, ()=>{
            chai.request(server)
                .get("/allusers")
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array')
                })
        })
    })
})