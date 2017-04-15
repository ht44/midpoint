'use strict';

process.env.PORT = 2999;
process.env.NODE_ENV = 'test';

const mocha = require('mocha');
const chai = require('chai');
const request = require('supertest');
const app = require('../../server');
const expect = chai.expect;

describe('Integration Test:', () => {

  it ('should connect to the server', () => {
    return request(app).get('/').then((res) => {
      expect(res.status).to.equal(200);
    });
  });

  it ('should listen on an alternative port', () => {
    expect(process.env.PORT).to.not.equal('3000');
    expect(process.env.PORT).to.not.equal(undefined);
  });

  it ('should run in the test environment', () => {
    expect(process.env.NODE_ENV).to.equal('test');
  });

});
