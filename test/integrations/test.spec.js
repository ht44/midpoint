'use strict';

process.env.PORT = 2999;
process.env.NODE_ENV = 'test';

const mocha = require('mocha');
const chai = require('chai');
const request = require('supertest');
const app = require('../../server');
const expect = chai.expect;

describe('Test:', () => {
  it ('should connect to server', () => {
    return request(app).get('/').then((res) => {
      expect(res.status).to.equal(200);
    });
  });
  it ('should run on different port', () => {
    expect(process.env.PORT).to.not.equal(undefined);
    expect(process.env.PORT).to.not.equal('3000');
  });
  it ('should run in test environment', () => {
    expect(process.env.NODE_ENV).to.equal('test');
  });
});
