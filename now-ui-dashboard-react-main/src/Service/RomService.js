import axios from "axios";
export const getRom = async (res) => {
           res=await axios.get("http://localhost:8080/product/roms",
          {
            headers: {
              'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("token")).token
            }
                    })
          
          return res.data;
}