import { act, render, waitFor } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

test('renders app', () => {
  const view = render(<App />);

  // ensure the app wrapper is present
  const appWrapper = view.container.querySelector(".appWrapper");

  expect(appWrapper).toBeInTheDocument()
});

test('renders task creator', () => {
  const view = render(<App />);

  // ensure the task creator is present
  const taskCreator = view.container.querySelector(".taskCreator");

  expect(taskCreator).toBeInTheDocument()
});

test('typing a new task name causes the submit button to appear', async () => {
  const view = render(<App />)

  const newTaskTextField = view.container.querySelector("#new-task");
  const testText = "test";

  // type test into the box and hit submit
  //@ts-ignore
  userEvent.type(newTaskTextField, testText)

  await waitFor(() => {
    expect(newTaskTextField).toHaveValue(testText);
  });

  const newTaskSubmitButton = view.container.querySelector("#submit-new-task");

  expect(newTaskSubmitButton).toBeInTheDocument()
})

test('new tasks appear in the document', async () => {
  const view = render(<App />)

  const newTaskTextField = view.container.querySelector("#new-task");
  const testText = "test";

  // type test into the box and hit submit
  //@ts-ignore
  userEvent.type(newTaskTextField, testText)

  await waitFor(() => {
    expect(newTaskTextField).toHaveValue(testText);
  });

  const newTaskSubmitButton = view.container.querySelector("#submit-new-task");

  act(() => {
    //@ts-ignore
    userEvent.click(newTaskSubmitButton);
  });

  const taskCard = view.container.querySelector(".taskCard");

  await waitFor(() => {
    //@ts-ignore
    expect(taskCard).toBeInTheDocument()
  });
})
