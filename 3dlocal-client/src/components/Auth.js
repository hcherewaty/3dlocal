import React, { Component } from 'react';

export default class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            profileImageUrl: ''
        }
    }

    render() {

        function handleSubmit(){};
        function handleChange(){};

        const { button, heading } = this.props;
        const { username, email, password, profileImageUrl } = this.state;

        return(
            <div>
                <div className='row justify-content-md-center text-center'>
                    <div className='col-md-6'>
                        <form onSubmit={this.handleSubmit}>
                            <h2>{heading}</h2>
                            <label htmlFor='email'>Email</label>
                            <input
                                className='form-control'
                                id='email'
                                name='email'
                                onChange={this.handleChange}
                                value={email}
                                type='text' 
                            />
                            <label htmlFor='password'>Password</label>
                            <input
                                className='form-control'
                                id='password'
                                name='password'
                                onChange={this.handleChange}
                                type='password' 
                            />
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}