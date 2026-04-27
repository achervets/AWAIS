export default function RegistrationPage() {
  return (
    <div className="auth-container">
      <h2>Create an Account</h2>
      
      <form className="auth-form">

        <input type="email" placeholder="Email Address" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        
        <button type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}