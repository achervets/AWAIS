export default function AuthForm({ type }) {
  const isLogin = type === 'login';

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
      
      <form className="auth-form">
        <input type="email" placeholder="Email Address" />
        <input type="password" placeholder="Password" />
        
        {!isLogin && (
          <input type="password" placeholder="Confirm Password" />
        )}
        
        <button type="submit">
          {isLogin ? 'Log In' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}