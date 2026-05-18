import Input from './components/Input';
import Button from './components/Button';


function App(){
  return(
    <>
    
    <nav className="navbar">
      <h2>Attendify</h2>
    </nav>
    
    <div className="container">
     <div className='Left-div'>
      <h2> Attendence <br /><span>for your business</span> </h2>
       <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos quidem, perferendis sint necessitatibus excepturi eum, animi id aperiam consequuntur accusamus eveniet minus sapiente, neque fuga itaque est enim ab atque.</p>
           </div>

    <div className='input-container'>

     <label>UserName</label>
     
    <Input />

      <label >Password</label>
    
    <Input />
        <div className='remember-box'>
        <input type="checkbox" id='remember'/>
        <label htmlFor="remember"> Remember me</label>
        </div>
        
       <Button />
       <br />
       <br />
    <a href="">Forget password?</a>
    <h4> Don't have an account? <a href=""className='register'>Register here</a></h4>
    
    </div>
    </div>
    </>
  )
}
export default App