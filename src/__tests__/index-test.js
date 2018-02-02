import React from 'react';
import ReactDOM from 'react-dom';
import WidgetBase from '../';
import { mount } from 'enzyme';
import pym from 'pym.js';

jest.mock('pym.js');

describe('pym init', () => {
  let onMessageMock = jest.fn();
  let sendMessageMock = jest.fn();
  let removeMock = jest.fn();

  pym.Child.mockImplementation(() => {
    return {
      onMessage: onMessageMock,
      sendMessage: sendMessageMock,
      remove: removeMock
    }
  });

  afterEach(() => {
    onMessageMock.mockReset();
    sendMessageMock.mockReset();
    removeMock.mockReset();
  });

  it('sets up a listener for the `incoming` message', () => {
    mount(<WidgetBase />);
    expect(onMessageMock).toHaveBeenCalled();
  });

  it('it sends the `mounted` message when the component mounts', () => {
    mount(<WidgetBase />);
    expect(sendMessageMock).toHaveBeenCalled();
  });
});
