
import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import logo from '../../assets/logo.png'
import share from '../../assets/share-icon.png'
import './permalink.scss'
import axios from 'axios'


// const API_URL = 'https://73d5-23-227-186-130.ngrok.io/api'
const API_URL = 'http://localhost:8080/api'

const Permalinked = ({ match } : { match:any }) => {
  const dispatch = useDispatch()

  const displayName = match.params.displayname
  
  const [isLoading, setIsLoading] = useState(true);
  const [nfts, setNfts] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
       const { data } = await axios.post(`${API_URL}/get-onenft`, {
         displayName: displayName
       })
       setNfts(data.data as any);
       setIsLoading(false);
    }
  
    fetchData();
  }, []);

  return (
    <>
        <div className="header" style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} className="logo" alt="logo" />
          <span className="header-address">{nfts.contractAddress} / {nfts.tokenId}</span>
        </div>
        <div className="container-client">
          <img src={nfts.imgUrl} />
          <h3>{match.params.displayname} # {nfts.tokenId}</h3>
        </div>
        <div className="share-btn">
          <img src={share} alt="share" />
        </div>
    </>
    )
}

export default Permalinked;
