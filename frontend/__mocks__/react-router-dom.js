import React from 'react';
const actualReactRouterDom = jest.requireActual('react-router-dom');

module.exports = {
  ...actualReactRouterDom,
  BrowserRouter: ({ children }) => <div>{children}</div>,
};