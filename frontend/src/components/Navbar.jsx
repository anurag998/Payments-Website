export default function Navbar(){
    return (
      <>
      <div className="flex justify-between shadow-md p-2">
        <div className="m-1 text-3xl font-bold" > Payment Wallet App </div>
        <div className="flex"> 
            <div className="m-1 text-xl"> Hello User </div>
              <div className="m-1"> 
                {/* <img> </img> */}
              <div className="text-xl" > Image </div>
            </div>      
        </div>
      </div>
      </>
    )
  }