function Tabs(props){
     
    return(
      
        <div
          className="flex items-center gap-8 border-b border-[#dcdcec]  px-5"
        >
            {
                props.tabs.map((tab,index) =>(

                    <button 
                       key={index}
                       onClick={() => props.setActiveTab(tab)}
                       className={`relative py-3 text-sm font-medium transition-all cursor-pointer
                          ${props.activeTab === tab ? "text-[#1c1c4d]" : "text-gray-400"}`}
                    >
                        {tab}

                        {
                            props.activeTab === tab && (

                                <div className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#4f46c8]"/>

                            )
                        }
                    </button>
                ))
            }
        </div>
    )
}

export default Tabs