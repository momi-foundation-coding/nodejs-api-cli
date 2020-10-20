const useControllerTest = (db) => {
  let dbScriptRequired = "";
  let idNotFound = "";
  let userIdFound = "";
  let deleteWithId = "";
  let hooksScript = "";

  if (db.toLowerCase() === "mongodb") {
    idNotFound = "5099803df3f4948bd2f98391";
    userIdFound = "5e6f2879673986f55e4745f3";
    deleteWithId = "5e6f2879673986f55e4745f2";
  } else {
    dbScriptRequired = `import databaseScripts from '../../src/scripts';`;
    idNotFound = "9089";
    userIdFound = "3";
    deleteWithId = "1";
    hooksScript = `before(async () => {
      // create and drop database before
      await databaseScripts.dropTables
      await databaseScripts.createTables
    })
  
    after(async () => {
      // drop database after all tests
      await databaseScripts.dropTables
    })
  
    beforeEach(async () => {
      // create tables before each test.
      await databaseScripts.dropTables
      await databaseScripts.createTables
    })
  
    afterEach(async () => {
      // drop tables after each test.
      await databaseScripts.dropTables
    })`;
  }
  return `import chai, { expect } from 'chai';
    import chaHttp from 'chai-http';
    import app from '../../src';
    ${dbScriptRequired}

    chai.use(chaHttp);

    describe('Testing app', () => {
      
      ${hooksScript}

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
            expect(res).to.have.status(200);
            done();
          });
      });
    
      it('should return 404 when route not available', (done) => {
        chai.request(app)
          .get('/notfound')
          .end((err, res) => {
            expect(res).to.have.status(404);
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
          .get('/user/${userIdFound}')
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            done();
          });
      });
    
      it('should not return a user (Not Found)', (done) => {
        chai.request(app)
          .get('/user/${idNotFound}')
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
          .put('/user/${userIdFound}')
          .send(updatedUserData)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
          });
      });
    
      it('should not be able to update user details', (done) => {
    
        chai.request(app)
          .put('/user/${idNotFound}')
          .send(userData)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(404);
            done();
          });
      });
    
      it('should return delete a user', (done) => {
        chai.request(app)
          .delete('/user/${deleteWithId}')
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            done();
          });
      });
    });`;
};

module.exports = useControllerTest;
