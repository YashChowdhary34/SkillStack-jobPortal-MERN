import Navbar from "../shared/navbar";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";

const Login = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const changeEventHandler = (e) => {
    setInput((input) => {
      return { ...input, [e.target.name]: e.target.value };
    });
  };
  const changeFileHandler = (e) => {
    setInput((input) => {
      return { ...input, file: e.target.files?.[0] };
    });
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          action=""
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>

          <div>
            <Label>Email</Label>
            <Input type="email" placeholder="Enter your email" />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" placeholder="Enter your password" />
          </div>
          <div className="flex items-center justify-between ">
            <RadioGroup
              className="flex items-center gap-4 my-5"
              defaultValue="comfortable"
            >
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <Button type="submit" className="w-full my-4">
            Login
          </Button>
          <span className="text-sm">
            Don't have an Account?{" "}
            <Link to="/signup" className="text-blue-600">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};
export default Login;
