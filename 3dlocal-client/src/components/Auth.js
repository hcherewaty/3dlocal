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
            profileImageUrl: '',
            availability: '',
            machineType: '',
            machineMaterial: '',
            bedSizeL: 0,
            bedSizeW: 0,
            bedSizeD: 0,
            hoursMin: 0,
            hoursMax: 0,
            price: 0,
            details: '',
            projectImgs: '',
            accountType: false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const authType = this.props.signUp ? 'signup' : 'signin';
        this.props.auth(authType, this.state)
        .then( () => {
            this.props.history.push('/');
        })
        .catch( () => {
            return;
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        if(e.target.type === 'radio' && (e.target.value === 'Maker' || e.target.value === 'Both')){
            this.accountType = true;
        }
        if (this.accountType === true && e.target.type === 'radio' && e.target.value === 'Seeker') {  
            this.accountType = false;
            this.handleFieldReset();
        }
        console.log('Target: ', e.target, 'Type: ', e.target.type, 'Value: ', e.target.value, 'Name: ', e.target.name);
        console.log('Availability state: ', this.state.availability, 'All of state: ', this.state);
        }

        handleFieldReset = () => {
            this.setState({availability: '', machineType: '', machineMaterial: '', bedSizeL: 0, bedSizeW: 0, bedSizeD: 0, hoursMin: 0, hoursMax: 0, price: 0, details: '', projectImgs: ''});
        }

    render() {

        const { signUp, button, heading, errors, removeErr, history } = this.props;
        const { firstName, lastName, username, zipcode, phone, bio, userType, email, password, profileImageUrl, availability, machineType, machineMaterial, bedSizeL, bedSizeW, bedSizeD, hoursMin, hoursMax, price, details, projectImgs } = this.state;

        //listen for any change in the route:
        history.listen( () => {
            removeErr();
        });

        return(
            <div>
                <div className='row justify-content-md-center text-center'>
                    <div className='col-md-4'>
                        <form onSubmit={this.handleSubmit}>
                            <h2>{heading}</h2>
                            {errors.message && (
                                <div className='alert alert-danger'>{errors.message}</div>
                            )}
                            
                            <label htmlFor='email'>Email <span>*</span></label>
                            <input
                                className='form-control'
                                id='email'
                                name='email'
                                placeholder='Email'
                                onChange={this.handleChange}
                                value={email}
                                type='text'
                                // required 
                            />
                            <label htmlFor='password'>Password <span>*</span></label>
                            <input
                                className='form-control'
                                id='password'
                                name='password'
                                placeholder='Password'
                                onChange={this.handleChange}
                                type='password'
                                // required 
                            />
                            {signUp && 
                                (
                                    <div>
                                        <hr />
                                        <h5>Profile Details</h5> 
                                        <label htmlFor='first-name'>First Name <span>*</span></label>
                                        <input
                                            className='form-control'
                                            id='first-name'
                                            name='firstName'
                                            placeholder='First Name'
                                            onChange={this.handleChange}
                                            value={firstName}
                                            type='text'
                                            // required 
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
                                            // required 
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
                                            // required 
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
                                            // required 
                                        />
                                        <div class='custom-control custom-radio'>
                                            <label>I want to: <span>*</span></label>
                                                <div className='radio-select'>
                                                    <input type='radio' className='custom-control-input' id='user-type-maker' name='userType' value='Maker'onChange={this.handleChange}/>
                                                    <label htmlFor='user-type-maker' className='custom-control-label' name='userType' value='Maker'>Find 3D printing/modeling gigs.</label>
                                                </div>
                                                <div className='radio-select'>
                                                    <input type='radio' className='custom-control-input' id='user-type-seeker' name='userType' value='Seeker'onChange={this.handleChange}/>
                                                    <label htmlFor='user-type-seeker' className='custom-control-label' name='userType' value='Seeker'>Post a 3D printing/modeling gig.</label>
                                                </div>
                                                <div className='radio-select'>
                                                    <input type='radio' className='custom-control-input' id='user-type-both' name='userType' value='Both'onChange={this.handleChange}/>
                                                    <label htmlFor='user-type-both' className='custom-control-label' name='userType' value='Both'>Both!</label>
                                                </div>
                                            </div>
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
                                            maxLength='200'
                                            rows='5' 
                                        />
                                        {this.accountType &&
                                            (    
                                                <div>
                                                    <hr />
                                                    <h5>Maker Details</h5>
                                                    <label>I'm available to: <span>*</span></label>
                                                    {/* <div class='custom-control custom-radio'>
                                                        <div className='radio-select'>
                                                            <input type='radio' className='custom-control-input' id='availability-3dprint' name='availability' value='3D Print Only'onChange={this.handleChange}/>
                                                            <label htmlFor='availability-3dprint' className='custom-control-label' name='availability' value='3D Print Only'>3D Print Only.</label>
                                                        </div>
                                                        <div className='radio-select'>
                                                            <input type='radio' className='custom-control-input' id='availability-3dmodeling' name='availability' value='3D Modeling Only'onChange={this.handleChange}/>
                                                            <label htmlFor='availability-3dmodeling' className='custom-control-label' name='availability' value='3D Modeling Only'>3D Modeling Only.</label>
                                                        </div>
                                                        <div className='radio-select'>
                                                            <input type='radio' className='custom-control-input' id='availability-both' name='availability' value='Both'onChange={this.handleChange}/>
                                                            <label htmlFor='availability-both' className='custom-control-label' name='availability' value='Both'>Both!</label>
                                                        </div> */}
                                                    <select className='custom-select' id='availability' name='availability' onChange={this.handleChange}>
                                                        <option id='availability' name='availability' value='' defaultValue>- Choose option -</option>
                                                        <option id='availability' name='availability' value='3D Printing Only'>3D Printing Only</option>
                                                        <option id='availability' name='availability' value='3D Modeling Only'>3D Modeling Only</option>
                                                        <option id='availability' name='availability' value='Both'>Both</option>
                                                    </select>
                                                    </div>
                                                // </div>
                                            )}
                                        <input type='checkbox' className='form-check-input checkbox' id='consent'/>
                                        <label htmlFor='consent'><span>*</span> I agree to 3DLocal's Community Guidelines, Privacy Policy, and Terms of Service.<span>*</span></label>
                                    </div>
                                )
                            }
                            <button type='submit' className='btn btn-primary btn-block btn-lg' onChange={this.handleChange}>{button}</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}