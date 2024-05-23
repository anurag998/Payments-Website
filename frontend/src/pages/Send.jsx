export default function Send(){

    const friendName = "Anurag Shukla"

    return (
      <>
      <section className="bg-gray-100">
      <div className="flex flex-col justify-center items-center mx-auto md:h-screen lg:py-0">
      <div className="inline-block bg-white rounded-lg px-6 py-8 mx-auto  shadow-lg">
      
      <div className="flex flex-col justify-center items-center ">
        <h1 className="text-3xl font-bold mb-5" > Send Money</h1>
      </div>

        <div className="block m-2 mb-5 text-m font-medium text-gray-900"> Sending money to: {friendName}</div>
        
        <div className="block m-2 text-m font-medium text-gray-900"> Amount </div>
        <div className="mb-2"> <input className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 m-1"></input></div>

        <div> <button className="m-1 w-full text-white bg-gray-700 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"> Send </button> </div>
        </div>
         </div>
         </section>
      </>
    )
  }