// setup file
var enzyme = require("enzyme");
var Adapter = require("enzyme-adapter-react-16");

enzyme.configure({ adapter: new Adapter() });

global.___loader = {
  enqueue: jest.fn(),
};
