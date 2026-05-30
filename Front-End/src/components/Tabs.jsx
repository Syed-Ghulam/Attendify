function Tabs(props){
     
    return(
      
        <div
          className="flex items-center gap-8 border-b border-[var(--color-border-light)]  px-5"
        >
            {
                props.tabs.map((tab,index) =>(

                    <button 
                       key={index}
                       onClick={() => props.setActiveTab(tab)}
                       className={`relative py-3 text-sm font-medium transition-all cursor-pointer
                          ${props.activeTab === tab ? "text-[var(--color-heading)]" : "text-gray-400"}`}
                    >
                        {tab}

                        {
                            props.activeTab === tab && (

                                <div className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[var(--color-chip-text)]"/>

                            )
                        }
                    </button>
                ))
            }
        </div>
    )
}

export default Tabs