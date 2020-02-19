const useControllerTest = `import chai from 'chai';
import chaHttp from 'chai-http';
import app from '../../src';

chai.should();
chai.use(chaHttp);

const expect = chai.expect;

describe('Testing app', () => {
    it('return base url', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('should return all users', (done) => {
        chai.request(app)
            .get('/user')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
    it('should create a new user', (done) => {
        const userData = {
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@email.com",
            password: "secretpassword"
        }
        chai.request(app)
            .post('/user')
            .send(userData)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                done();
            });
    });
    it('should return a single user', (done) => {
        chai.request(app)
            .get('/user/1')
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                done();
            });
    });

    it('should update user details', (done) => {
        const userData = {
            firstName: "John1",
            email: "johndoe1@email.com",
            password: "secretpassword"
        }
        chai.request(app)
            .put('/user/1')
            .send(userData)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    /**
     * Always delete is the last test to be done
     * In the near future, we will work on making sure we have beforeEach and afterEach hooks
     */
    it('should return delete a user', (done) => {
        chai.request(app)
            .delete('/user/1')
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
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
});    
`;
exports = module.exports = useControllerTest;
