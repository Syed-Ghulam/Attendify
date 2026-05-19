import { useState } from "react"
import DateInput from "./components/DateInput"
import TextArea from "./components/TextArea"
import Select from "./components/Select"
import Button from "./components/Button"
import Toggle from "./components/Toggle"

function Home(){

    const [date, setDate] = useState("");
    const [message, setMessage] = useState("");
    const [city, setCity] = useState("");
    const [isOn, setIsOn] = useState(false);
    const [hobby, setHobby] = useState([]);

    const cities = [
        "Chennai",
        "Bangalore",
        "Hyderabad",
        "Cuddalore"
    ];

    const hobbies = [
        "Reading",
        "Writing",
        "Singing",
        "Playing"
    ];

    const handleChange = (e) => {

        const values = Array.from(
            e.target.selectedOptions,
            option => option.value
        );

        setHobby(values);
    };

    return(
        <div className="min-h-screen bg-[#EDF1F7] flex items-center justify-center px-5 py-10">

            <div className="w-full max-w-[700px] bg-white rounded-2xl shadow-lg p-8">

                <h1 className="text-4xl font-bold text-[#212529] mb-2">
                    User Details
                </h1>

                <p className="text-gray-500 mb-8">
                    Fill all the details below
                </p>

                <div className="space-y-6">

                    <DateInput 
                        label="Select Date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}

                        className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"

                        labelClassName="block mb-2 text-sm font-medium text-gray-700"
                    />

                    {/* <h2 className="text-sm text-blue-600 font-medium">
                        {date}
                    </h2> */}

                    <TextArea 
                        label="Message"
                        placeholder="Enter your Message"

                        value={message}

                        onChange={(e)=> setMessage(e.target.value)}

                        className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none outline-none focus:border-blue-500"

                        labelClassName="block mb-2 text-sm font-medium text-gray-700"
                    />

                    <Select 
                        label="Location"

                        options={cities}

                        value={city}

                        onChange={(e)=> setCity(e.target.value)}

                        className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 bg-white"

                        labelClassName="block mb-2 text-sm font-medium text-gray-700"
                    />

                    {/* <h2 className="text-sm text-green-600 font-medium">
                        {city}
                    </h2> */}

                    <Select 
                        multiple

                        label="Hobbies"

                        options={hobbies}

                        value={hobby}

                        onChange={handleChange}

                        className="w-full h-36 p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"

                        labelClassName="block mb-2 text-sm font-medium text-gray-700"
                    />

                    <h2 className="text-sm text-purple-600 font-medium">
                        {hobby.join(", ")}
                    </h2>

                    <Toggle 
                        isOn={isOn}
                        onClick = {() => setIsOn(!isOn)}
                    />

                    <h2>
                        {isOn ? "Done":"Not Done"}
                    </h2>

                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-3 rounded-lg font-medium cursor-pointer"
                      text = "Submit"
                    />

                </div>

            </div>

        </div>
    )
}

export default Home