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
        // TC 1.1 if new User added to added to database then it return status 200 
        it(`given new user if added in database should return status 200`, ()=>{
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
    })
})