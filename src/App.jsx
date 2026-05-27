import Input from './components/Input';
import Button from './components/Button';
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  return (
    <>

      <nav className="px-[40px] py-[15px]">
        <h2 className="m-0 text-[28px] text-[#012970]">
          Attendify
        </h2>
      </nav>

      <div className="flex min-h-[90vh] bg-[#EDF1F7] px-[100px] gap-[50px] justify-between items-center max-[768px]:flex-col max-[768px]:px-[20px] max-[768px]:py-[40px] max-[768px]:gap-[40px]">

        <div className="max-w-[550px] max-[768px]:text-center">

          <h2 className="mb-[25px] text-[64px] font-normal leading-[1.2] text-[#212529] max-[768px]:text-[42px]">
            Attendance <br />

            <span className="text-[#4154F1]">
              for your business
            </span>

          </h2>

          <p className="text-[#757F8E] leading-[1.8] text-[16px]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos quidem, perferendis sint necessitatibus excepturi eum,
            animi id aperiam consequuntur accusamus eveniet minus sapiente,
            neque fuga itaque est enim ab atque.
          </p>

        </div>

        <div className="w-[420px] p-[45px] bg-white rounded-[4px] max-[768px]:w-full">

          <Input
            label="UserName"
            type="email"
            placeHolder="Enter your Email"  
          />

          <Input
            label="Password"
            type="password"
            placeHolder="Enter your Password"
          />

          <div className="flex items-center gap-[8px] mb-[22px]">

            <input
              type="checkbox"
              id="remember"
              className="w-[15px] h-[15px] m-0"
            />

            <label
              htmlFor="remember"
              className="m-0 text-[14px]"
            >
              Remember me
            </label>

          </div>

          <Button
            onClick = {()=>navigate("/home")}
            text="Sign in"
            className="w-[80px] h-[40px] rounded-[4px] border-0 bg-[#4154F1] cursor-pointer text-white mb-[18px]"
          />

          <br />
          <br />

          <a
            href=""
            className="no-underline text-[#6C757D] text-[14px]"
          >
            Forget password?
          </a>

          <p className="mt-[20px] text-[16px]">

            Don't have an account?

            <a
              href=""
              className="no-underline text-[#0DCAF0]"
            >
              Register here
            </a>

          </p>

        </div>

      </div>

    </>
  )
}

export default App;