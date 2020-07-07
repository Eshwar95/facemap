import React from 'react';

const RegisterForm= ({onRouteChange}) => {
	return (
		<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw7 shadow-6 center">
			<main className="pa4 black-80">
			  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0 ">
				      <legend className="f1 fw6 ph0 mh0 ">Register</legend>
				       <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="firstName">First Name</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 border" type="text" name="firstName"  id="firstName" />
				      </div> <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="lastName ">Last Name</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 border" type="text" name="lastName"  id="lastName" />
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address ">Email</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 border" type="email" name="email-address"  id="email-address" />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password ">Password</label>
				        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 border" type="password" name="password"  id="password" />
				      </div>
				    </fieldset>
				    <div className="">
				      <input onClick={()=> onRouteChange('Home')} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
				    </div>
			  </div>
			</main>
		</article>
	);
}

export default RegisterForm;