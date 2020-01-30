import React, {useState, useEffect, useContext} from "react";
import Axios from "axios"
import {CityContext} from "../../contexts/CityContext"
import recommend from './recommend-pin.svg'

const Recommendations = ({city}) => {
    const {getCity} = useContext(CityContext)
    let [cultureRec, setCultureRec] = useState("");
    let [housingRec, setHousingRec] = useState("");
    let [industryRec, setIndustryRec] = useState({city: "", id: ""});
    let housingURL = "https://api.citrics.io/jkekal6d6e5si3i2ld66d4dl/recommend/housing/"
    let cultureURL = "https://api.citrics.io/jkekal6d6e5si3i2ld66d4dl/recommend/culture/"
    let industryURL = "https://api.citrics.io/jkekal6d6e5si3i2ld66d4dl/recommend/industry/"
    //get recommendations when component mounts

    const randomKey = obj => {
        const keys = Object.keys(obj)
        const randomIndex = keys.length * Math.random() << 0;
        return obj[keys[randomIndex]].id !== city._id ? keys[randomIndex] : randomKey(obj);
    };

    useEffect( _ => {
            Axios.get(`${housingURL}${city._id}`)
            .then(res=> {
                let recName = randomKey(res.data);
                
                setHousingRec({city: recName, ID: res.data[recName].id})
            })
            Axios.get(`${cultureURL}${city._id}`)
            .then(res=> {
                let recName = randomKey(res.data);
                setCultureRec({city: recName, ID: res.data[recName].id})
            })
            Axios.get(`${industryURL}${city._id}`)
            .then(res=> {
                let recName = randomKey(res.data);
                setIndustryRec({city: recName, ID: res.data[recName].id})
            })
            
        
        
    },[])

    return (
        <div className="recommendation-grid">
            {housingRec.city && cultureRec.city && industryRec.city 
            ?
            <div className="recommendation-container">
                <div className="recommendation-title">Here are some recommendations based on your search.</div>
                <div className="recommendation" onClick={_ => getCity(housingRec)}><p className="recommendation-subtitle">Similar housing</p> <br /> <p className="recommendation-cities"><img alt="pinpoint" src={recommend}/>{housingRec.city}</p> </div>
                <div className="recommendation" onClick={_ => getCity(cultureRec)}><p className="recommendation-subtitle">Similar culture</p><br /> <p className="recommendation-cities"><img alt="pinpoint" src={recommend}/>{cultureRec.city}</p></div>
                <div className="recommendation" onClick={_ => getCity(industryRec)}><p className="recommendation-subtitle">Similar industries</p> <br /><p className="recommendation-cities"><img alt="pinpoint" src={recommend}/>{industryRec.city}</p></div>
            </div>
            : null}
        </div>
    )

}
export default Recommendations;