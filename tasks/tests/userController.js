const useControllerTest = `
import chai from 'chai';
import chaHttp from 'chai-http';
import app from '../../src';
import databaseScripts from '../../src/scripts';

chai.should();
chai.use(chaHttp);

const expect = chai.expect;

describe('Testing app', () => {

    before(async () => {
        // create and drop database before
        await databaseScripts.dropdb
        await databaseScripts.createdb
    })

    after(async () => {
        // drop database after all tests
        await databaseScripts.dropdb
    })

    beforeEach(async () => {
        // create tables before each test.
        await databaseScripts.dropdb
        await databaseScripts.createdb
    })

    afterEach(async () => {
        // drop tables after each test.
        await databaseScripts.dropdb
    })

    const userData = {
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@email.com",
        password: "secretpassword"
    }

    const blankUserData = {};

    it('return base url', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('should return 404 when route not available', (done) => {
        chai.request(app)
            .get('/notfound')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    it('should create a new user', (done) => {
        chai.request(app)
            .post('/user')
            .send(userData)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                done();
            });
    });

    it('should not create a new user and return 400 err', (done) => {
        chai.request(app)
            .post('/user')
            .send(blankUserData)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            })
    });

    it('should return all users', (done) => {
        /**
         * make sure user is created 
         * and inserted into the database
         */
        chai.request(app)
            .post('/user')
            .send(userData)
            .end()

        chai.request(app)
            .get('/user')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it('should return a single user', (done) => {
        chai.request(app)
            .post('/user')
            .send(userData)
            .end()

        chai.request(app)
            .get('/user/2')
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                done();
            });
    });

    it('should not return a user (Not Found)', (done) => {
        chai.request(app)
            .get('/user/99992233')
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(404)
                done();
            });
    });

    it('should update user details', (done) => {
        const updatedUserData = {
            firstName: "Updated",
            email: "updated@email.com",
            password: "secretpassword"
        }

        chai.request(app)
            .put('/user/3')
            .send(updatedUserData)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it('should not be able to update user details', (done) => {

        chai.request(app)
            .put('/user/9090990')
            .send(userData)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(404);
                done();
            });
    });

    it('should return delete a user', (done) => {
        chai.request(app)
            .delete('/user/1')
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                done();
            });
    });
});    
`;
exports = module.exports = useControllerTest;
