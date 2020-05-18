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
        it.skip(`given new user valid if added in database should return status 200`, ()=>{
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
        // TC 2.1 if all Users stored in database then return status 200
        it(`given method get all users if get all users should return status 200 and in Array Form`, ()=>{
            chai.request(server)
                .get("/allusers")
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array')
                })
        })
        // TC 2.2 if didnt get all Users stored in database then return status 404
        it(`given method get all user if didnt get all users should return status 404`, ()=>{
            chai.request(server)
                .get("/alluser")
                .end((err, res)=>{
                    res.should.have.status(404);
                })
        })
    })
    // Test Cases For Login With User Details
    describe(`POST /login/`,()=>
    {
        // TC 3.1 if User details correct then login and return status 200 
        it(`given new user details for login when valid should return status 200`, ()=>{
            let newUser={
                email:"dd@gmail.com", password:"d@123456"
            }
            chai.request(server)
                .post("/login")
                .send(newUser)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                })
            })
        // TC 3.2 if User email incorrect then login failed and return status 200 
        it(`given user email for login when invalid should return error with status 200`, ()=>{
            let newUser={
                email:"@gmail.com", password:"e@123456"
            }
            chai.request(server)
                .post("/login")
                .send(newUser)
                .end((err, res)=>{
                    res.should.have.status(200);
                    chai.expect(res.body.message).to.equal("Sorry..User Not Found")
                })
            })
    })
})