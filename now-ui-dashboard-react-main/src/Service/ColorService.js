import axios from "axios";
export const getColor = async (res) => {
           res=await axios.get("http://localhost:8080/product/colors",
          {
            headers: {
              'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("token")).token
            }
                    })
          
          return res.data;
}

