import chai from 'chai';
import chaHttp from 'chai-http';
import app from '../app';

chai.should();
chai.use(chaHttp);

describe('Testing app', () => {
    it('return base url', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});
