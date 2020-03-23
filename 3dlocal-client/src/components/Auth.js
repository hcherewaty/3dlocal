import React, { Component } from 'react';

export default class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            zipcode: '',
            phone: '',
            bio:'', 
            userType: '',
            email: '',
            password: '',
            profileImageUrl: ''
        }
    }

    handleSubmit = (e) => {}
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {

        const { SignUp, button, heading } = this.props;
        const { firstName, lastName, username, zipcode, phone, bio, userType, email, password, profileImageUrl } = this.state;

        return(
            <div>
                <div className='row justify-content-md-center text-center'>
                    <div className='col-md-4'>
                        <form onSubmit={this.handleSubmit}>
                            <h2>{heading}</h2>
                            <label htmlFor='email'>Email <span>*</span></label>
                            <input
                                className='form-control'
                                id='email'
                                name='email'
                                placeholder='Email'
                                onChange={this.handleChange}
                                value={email}
                                type='text'
                                required 
                            />
                            <label htmlFor='password'>Password <span>*</span></label>
                            <input
                                className='form-control'
                                id='password'
                                name='password'
                                placeholder='Password'
                                onChange={this.handleChange}
                                type='password'
                                required 
                            />
                            {SignUp && 
                                (
                                    <div>
                                        <hr />
                                        <label htmlFor='first-name'>First Name <span>*</span></label>
                                        <input
                                            className='form-control'
                                            id='first-name'
                                            name='firstName'
                                            placeholder='First Name'
                                            onChange={this.handleChange}
                                            value={firstName}
                                            type='text'
                                            required 
                                        />
                                        <label htmlFor='last-name'>Last Name <span className='required'>*</span></label>
                                        <input
                                            className='form-control'
                                            id='last-name'
                                            name='lastName'
                                            placeholder='Last Name'
                                            onChange={this.handleChange}
                                            value={lastName}
                                            type='text'
                                            required 
                                        />
                                        <label htmlFor='username'>Username <span>*</span></label>
                                        <input
                                            autoComplete='off'    
                                            className='form-control'
                                            id='username'
                                            name='username'
                                            placeholder='Choose a username'
                                            onChange={this.handleChange}
                                            value={username}
                                            type='text'
                                            required 
                                        />
                                        <label htmlFor='zipcode'>Zip Code <span>*</span></label>
                                        <input
                                            autoComplete='off'
                                            className='form-control'
                                            id='zipcode'
                                            name='zipcode'
                                            placeholder='Zip Code'
                                            onChange={this.handleChange}
                                            value={zipcode}
                                            type='number'
                                            required 
                                        />
                                        <label htmlFor='user-type'>I want to: <span>*</span></label>
                                        <select className='form-control' id='user-type'name='userType'onChange={this.handleChange} required>
                                            <option value='Seeker'>Post a 3D printing/modeling gig.</option>
                                            <option value='Maker'>Find 3D printing/modeling gigs.</option>
                                            <option value='Both'>Both!</option>
                                        </select>
                                        <label htmlFor='phone'>Phone number (optional)</label>
                                        <input
                                            autoComplete='off'
                                            className='form-control'
                                            id='phone'
                                            name='phone'
                                            placeholder='123-456-7890'
                                            onChange={this.handleChange}
                                            value={phone}
                                            type='tel'
                                            pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' 
                                        />
                                        <label htmlFor='img-url'>Profile Image (optional)</label>
                                        <input
                                            autoComplete='off'
                                            className='form-control'
                                            id='img-url'
                                            name='profileImageUrl'
                                            placeholder='Profile Image URL'
                                            onChange={this.handleChange}
                                            value={profileImageUrl}
                                            type='text' 
                                        />
                                        <label htmlFor='bio'>Bio (optional)</label>
                                        <textarea
                                            autoComplete='off'
                                            className='form-control bio'
                                            id='bio'
                                            name='bio'
                                            placeholder='Amateur 3D modeler. I love to 3D print miniatures of muppets... (200 character limit).'
                                            onChange={this.handleChange}
                                            value={bio}
                                            type='text'
                                            maxlength='200'
                                            rows='5' 
                                        />
                                        <input type='checkbox' className='form-check-input checkbox' id='consent' required/>
                                        <label htmlFor='consent'><span>*</span> I agree to 3DLocal's Community Guidelines, Privacy Policy, and Terms of Service.<span>*</span></label>
                                    </div>
                                )
                            }
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}