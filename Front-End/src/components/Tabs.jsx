function Tabs(props){
     
    return(
      
        <div
          className="flex items-center gap-8 border-b border-[var(--neutral-200)]  px-5"
        >
            {
                props.tabs.map((tab,index) =>(

                    <button 
                       key={index}
                       onClick={() => props.setActiveTab(tab)}
                       className={`relative py-3 text-sm font-medium transition-all cursor-pointer
                          ${props.activeTab === tab ? "text-[var(--primary-900)]" : "text-[var(--neutral-500)]"}`}
                    >
                        {tab}

                        {
                            props.activeTab === tab && (

                                <div className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[var(--primary-700)]"/>

                            )
                        }
                    </button>
                ))
            }
        </div>
    )
}

export default Tabs