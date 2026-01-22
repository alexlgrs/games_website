import Login from "../Login/Login";

function Auth() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center pt-[8vh]">
      
      <img src="../../assets/logo/navbar_logo_amiko.png" className="w-[18vw] md:w-[12vw] h-auto mb-10" />

      <Login />
      
    </div>
  );
}

export default Auth;