import React from 'react';
import { render, cleanup, fireEvent, queryByPlaceholderText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { UserSignupPage } from './UserSignupPage';
import { act } from 'react-dom/test-utils';

beforeEach(cleanup);

describe('UserSignupPage', () => {
    describe('Layout', () => {
        it('has header of signup', () => {
            const { container } = render(<UserSignupPage />)
            const header = container.querySelector('h1');
            expect(header).toHaveTextContent('Sign up');
        })
        it('has input for display name', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />)
            const displayNameInput = queryByPlaceholderText('Display name');
            expect(displayNameInput).toBeInTheDocument();
        })
        it('has input for username', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />)
            const usernameInput = queryByPlaceholderText('Username');
            expect(usernameInput).toBeInTheDocument();
        })
        it('has input for password', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />)
            const passwordInput = queryByPlaceholderText('Password');
            expect(passwordInput).toBeInTheDocument();
        })
        it('has password type for password input', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />)
            const passwordInput = queryByPlaceholderText('Password');
            expect(passwordInput.type).toBe('password');
        })
        it('has input for password', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />)
            const passwordInput = queryByPlaceholderText('Verify your password');
            expect(passwordInput).toBeInTheDocument();
        })
        it('has password type for password verify input', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />)
            const passwordInput = queryByPlaceholderText('Verify your password');
            expect(passwordInput.type).toBe('password');
        })
        it('has submit button', () => {
            const { container } = render(<UserSignupPage />)
            const button = container.querySelector('button');
            expect(button).toBeInTheDocument();
        })
    })
    describe('Interections', () => {
        const changeEvent = (content) => {
            return {
                target: {
                    value: content
                }
            }
        }

        let button, displayNameInput, usernameInput, passwordInput, passwordVerify;
        const setupForSubmit = (props) => {
            const rendered = render(
                <UserSignupPage {...props} />
            )
            const { container, queryByPlaceholderText } = rendered

            displayNameInput = queryByPlaceholderText('Display name')
            usernameInput = queryByPlaceholderText('Username')
            passwordInput = queryByPlaceholderText('Password')
            passwordVerify = queryByPlaceholderText('Verify your password')

            fireEvent.change(displayNameInput, changeEvent('my-display-name'))
            fireEvent.change(usernameInput, changeEvent('my-user-name'))
            fireEvent.change(passwordInput, changeEvent('P4ssword'))
            fireEvent.change(passwordVerify, changeEvent('P4ssword'))

            button = container.querySelector('button')
            return rendered
        }
        it('sets the displayName value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />)
            const displayNameInput = queryByPlaceholderText('Display name');


            fireEvent.change(displayNameInput, changeEvent('my-display-name'));

            expect(displayNameInput).toHaveValue('my-display-name')
        })
        it('sets the username value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />)
            const usernameInput = queryByPlaceholderText('Username');


            fireEvent.change(usernameInput, changeEvent('my-user-name'));

            expect(usernameInput).toHaveValue('my-user-name')
        })
        it('sets the password value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />)
            const passwordInput = queryByPlaceholderText('Password');


            fireEvent.change(passwordInput, changeEvent('P4ssword'));

            expect(passwordInput).toHaveValue('P4ssword')
        })
        it('sets the password verify value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />)
            const passwordVerify = queryByPlaceholderText('Verify your password');


            fireEvent.change(passwordVerify, changeEvent('P4ssword'));

            expect(passwordVerify).toHaveValue('P4ssword')
        })
        it('calls postSignup when the fields are valid and the actions are provided in props', () => {
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({})
            }
            setupForSubmit({ actions })
            fireEvent.click(button)
            expect(actions.postSignup).toHaveBeenCalledTimes(1)
        })
        it('does not throw exception when clicking the button when actions not provided in props', () => {

            setupForSubmit()
            expect(() => fireEvent.click(button)).not.toThrow()

        })
        it('calls post with user body when the fields are valid', () => {
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({})
            }
            setupForSubmit({ actions })
            fireEvent.click(button)
            const expectedUserObject = {
                username: 'my-user-name',
                displayName: 'my-display-name',
                password: 'P4ssword'
            }
            expect(actions.postSignup).toHaveBeenCalledWith(expectedUserObject)
        })
    })
})